package github

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
)

// RegisterGitHubRoutes registers GitHub OAuth endpoints.
func RegisterGitHubRoutes(e *echo.Echo) {
	e.GET("/auth/github/login", handleGitHubLogin)
	e.GET("/auth/github/callback", handleGitHubCallback)
}

// handleGitHubLogin redirects the user to GitHub's OAuth 2.0 consent page.
func handleGitHubLogin(c echo.Context) error {
	// Request offline access and force consent to get a refresh token.
	url := oauthConf.AuthCodeURL(oauthStateString, oauth2.AccessTypeOffline, oauth2.SetAuthURLParam("prompt", "consent"))
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

// handleGitHubCallback handles the OAuth callback from GitHub.
// handleGitHubCallback handles the OAuth callback from GitHub.
// handleGitHubCallback handles the OAuth callback from GitHub.
func handleGitHubCallback(c echo.Context) error {
	state := c.QueryParam("state")
	if state != oauthStateString {
		return c.String(http.StatusBadRequest, "Invalid OAuth state")
	}

	code := c.QueryParam("code")
	token, err := oauthConf.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, fmt.Sprintf("Code exchange failed: %s", err.Error()))
	}

	// Fetch user details from GitHub API using the access token.
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to create request for user details")
	}
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	resp, err := client.Do(req)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to fetch user details: "+err.Error())
	}
	defer resp.Body.Close()

	var userInfo map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return c.String(http.StatusInternalServerError, "Failed to decode user details: "+err.Error())
	}

	// Fetch user's emails from GitHub API.
	reqEmails, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to create request for user emails")
	}
	reqEmails.Header.Set("Authorization", "Bearer "+token.AccessToken)
	reqEmails.Header.Set("Accept", "application/vnd.github.v3+json")
	respEmails, err := client.Do(reqEmails)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to fetch user emails: "+err.Error())
	}
	defer respEmails.Body.Close()

	// GitHub returns a list of emails.
	var emails []struct {
		Email    string `json:"email"`
		Primary  bool   `json:"primary"`
		Verified bool   `json:"verified"`
	}
	if err := json.NewDecoder(respEmails.Body).Decode(&emails); err != nil {
		return c.String(http.StatusInternalServerError, "Failed to decode user emails: "+err.Error())
	}

	// Find primary, verified email.
	primaryEmail := ""
	for _, e := range emails {
		if e.Primary && e.Verified {
			primaryEmail = e.Email
			break
		}
	}
	// Fallback: if no primary found, use the first email
	if primaryEmail == "" && len(emails) > 0 {
		primaryEmail = emails[0].Email
	}

	// Construct the response with only the desired fields.
	result := map[string]interface{}{
		"access_token": token.AccessToken,
		"username":     userInfo["login"],
		"name":         userInfo["name"],
		"email":        primaryEmail,
		"expiry":       token.Expiry,
	}

	return c.JSON(http.StatusOK, result)
}
