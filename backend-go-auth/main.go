package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
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

	e := echo.New()

	// Define a basic route
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	fmt.Println("Server starting at port:", port)

	// Start the server
	if err := e.Start(":" + port); err != nil {
		log.Fatal("Error starting server:", err)
	}
}
