package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"oauth-app/database"
	"oauth-app/google"

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

	// Connect to MongoDB
	database.ConnectDB()

	// Initialize Google OAuth configuration (assume you have an InitGoogleOAuth() function)
	google.InitGoogleOAuth()

	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Register Google OAuth routes
	google.RegisterGoogleRoutes(e)

	// Basic test route
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	fmt.Println("✅ Server starting at port:", port)
	log.Fatal(e.Start(":" + port))
}
