package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"oauth-app/google" // Import the google package

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

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000" // Default fallback port
	}

	// Initialize Google OAuth (AFTER loading .env)
	google.InitGoogleOAuth()

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())  // Logs requests
	e.Use(middleware.Recover()) // Recover from panics
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Register routes from google package
	google.RegisterGoogleRoutes(e)

	// Basic test route
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	fmt.Println("✅ Server starting at port:", port)

	// Start the server
	if err := e.Start(":" + port); err != nil {
		log.Fatal("Error starting server:", err)
	}
}
