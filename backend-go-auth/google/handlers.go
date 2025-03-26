package google

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
)

// RegisterGoogleRoutes registers Google OAuth routes in Echo
func RegisterGoogleRoutes(e *echo.Echo) {
	e.GET("/auth/google", handleGoogleLogin)
	e.GET("/auth/google/callback", handleGoogleCallback)
}

// Redirects user to Google login
func handleGoogleLogin(c echo.Context) error {
	url := GoogleOAuthConfig.AuthCodeURL("randomstate", oauth2.AccessTypeOffline, oauth2.ApprovalForce)
	return c.Redirect(http.StatusSeeOther, url)
}

// Handles Google OAuth callback, fetches user info, and processes the user
func handleGoogleCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.String(http.StatusBadRequest, "Authorization code not found")
	}

	// Exchange authorization code for access token
	token, err := GoogleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to get access token")
	}

	fmt.Println("Google token:", token.AccessToken)
	fmt.Println("Google refresh token:", token.RefreshToken)
	// Fetch user info
	client := GoogleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to get user info")
	}
	defer resp.Body.Close()

	var user map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return c.String(http.StatusInternalServerError, "Failed to decode user info")
	}

	// Process user details, store in DB, generate JWT and set cookie
	jwtToken, err := ProcessUserAndGenerateJWT(user)

	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to process user data")
	}
	// return c.JSON(http.StatusOK, map[string]string{
	// 	"token": jwtToken,
	// });

	fmt.Println("JWT token:", jwtToken) // Ab yahan actual token print hoga

	// Ab popup ke liye HTML response with postMessage
	htmlResponse := fmt.Sprintf(`
      <html>
      <head>
        <script>
          window.opener.postMessage({ token: "%s" }, "https://resume-builder-eagleview.vercel.app");
          window.close();
        </script>
      </head>
      <body>
        Authentication successful. You can close this window.
      </body>
      </html>
    `, jwtToken)

	return c.HTML(http.StatusOK, htmlResponse)
}
