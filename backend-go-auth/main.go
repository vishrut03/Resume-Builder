// main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"oauth-app/database"
	"oauth-app/github"
	"oauth-app/gmail"
	gmailauth "oauth-app/gmailsignin"
	"oauth-app/google"
	"oauth-app/phoneNumber"
	"oauth-app/usernamepassword"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: No .env file found")
	}

	// Connect to MongoDB and ensure unique index
	database.ConnectDB()

	// Initialize OAuth configurations
	google.InitGoogleOAuth()
	github.InitGitHubOAuth()

	e := echo.New()

	// Middleware
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Register Routes
	google.RegisterGoogleRoutes(e)
	github.RegisterGitHubRoutes(e)
	phoneNumber.RegisterOTPRoutes(e)
	usernamepassword.RegisterUsernamePasswordRoutes(e)
	gmail.RegisterRoutes(e)
	gmailauth.RegisterRoutes(e)

	// Basic test route
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	fmt.Println("✅ Server starting at port:", port)
	log.Fatal(e.Start(":" + port))
}
