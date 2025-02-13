package github

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

// oauthConf holds the GitHub OAuth configuration.
var oauthConf *oauth2.Config

// A random string for OAuth2 API calls to protect against CSRF attacks.
// In production, you should generate this dynamically and store it in session.
var oauthStateString = "randomstatestring"

// InitGitHubOAuth initializes the GitHub OAuth configuration.
func InitGitHubOAuth() {
	oauthConf = &oauth2.Config{
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URL"),
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		Scopes:       []string{"user:email", "offline_access"},
		Endpoint:     github.Endpoint,
	}
}

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

	fmt.Println("GitHub Access Token:", token.AccessToken)
	// fmt.Println("GitHub Refresh Token:", token.RefreshToken) // Refresh token might be empty
	fmt.Println("GitHub User Info:", userInfo)

	return c.JSON(http.StatusOK, map[string]interface{}{
		"access_token": token.AccessToken,
		"token_type":   token.TokenType,
		"expiry":       token.Expiry,
		"user":         userInfo,
	})
}
