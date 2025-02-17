package github

import (
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

// oauthConf holds the GitHub OAuth configuration.
var oauthConf *oauth2.Config

// A random string for OAuth2 API calls to protect against CSRF attacks.
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
