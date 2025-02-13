package github

import (
	"context"
	"net/http"
	"time"

	"oauth-app/database"
	"oauth-app/google"
	"oauth-app/models"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProcessGitHubUserAndGenerateJWT extracts user details from GitHub data,
// stores (or fetches) the user in the users_oauth collection,
// generates a JWT, and returns a JSON response with the token.
func ProcessGitHubUserAndGenerateJWT(c echo.Context, userData map[string]interface{}) error {
	// Extract details from GitHub user data.
	// GitHub's /user endpoint returns fields like "email", "login" (username) and "name"
	email, _ := userData["email"].(string)
	name, _ := userData["name"].(string)
	// You can also extract the username if needed:
	// username, _ := userData["login"].(string)

	if email == "" {
		return c.String(http.StatusBadRequest, "Email not provided in GitHub user data")
	}

	// Create a user object; adjust fields as defined in your models.UserOAuth.
	newUser := models.UserOAuth{
		Email:     email,
		Name:      name,
		CreatedAt: time.Now().Unix(),
	}

	// Reference the users_oauth collection from your database.
	collection := database.DB.Collection("users_oauth")

	// Check if the user already exists.
	var existingUser models.UserOAuth
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&existingUser)
	if err == mongo.ErrNoDocuments {
		// User does not exist; insert new user.
		res, err := collection.InsertOne(context.Background(), newUser)
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to store user in DB")
		}
		newUser.ID = res.InsertedID.(primitive.ObjectID)
		existingUser = newUser
	} else if err != nil {
		return c.String(http.StatusInternalServerError, "Error checking user in DB")
	}

	// Generate JWT using the user data.
	jwtToken, err := google.GenerateJWT(existingUser)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to generate JWT")
	}

	// Return a JSON response with the token and user details.
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user":    existingUser,
		"token":   jwtToken,
	})
}
