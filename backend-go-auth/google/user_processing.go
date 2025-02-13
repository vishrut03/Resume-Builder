package google

import (
	"context"
	"net/http"
	"time"

	"oauth-app/database"
	"oauth-app/models"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProcessUserAndGenerateJWT extracts user details from Google data,
// stores (or fetches) the user from the users_oauth collection,
// generates a JWT, and returns a JSON response with the token.
// The front-end (localhost:5173) is responsible for setting the cookie.

func ProcessUserAndGenerateJWT(c echo.Context, userData map[string]interface{}) error {
	// Extract details
	email, _ := userData["email"].(string)
	name, _ := userData["name"].(string)
	googleID, _ := userData["id"].(string)
	picture, _ := userData["picture"].(string)

	// Create a user object
	newUser := models.UserOAuth{
		Email:     email,
		Name:      name,
		GoogleID:  googleID,
		Picture:   picture,
		CreatedAt: time.Now().Unix(),
	}

	// Reference the users_oauth collection
	collection := database.DB.Collection("users_oauth")

	// Check if the user already exists
	var existingUser models.UserOAuth
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&existingUser)
	if err == mongo.ErrNoDocuments {
		// User does not exist, insert new user
		res, err := collection.InsertOne(context.Background(), newUser)
		if err != nil {
			return c.String(http.StatusInternalServerError, "Failed to store user in DB")
		}
		// Assign the inserted ID to newUser.ID (must be ObjectID)
		newUser.ID = res.InsertedID.(primitive.ObjectID)
		existingUser = newUser
	} else if err != nil {
		return c.String(http.StatusInternalServerError, "Error checking user in DB")
	}

	// Generate JWT using the existing user data
	jwtToken, err := GenerateJWT(existingUser)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to generate JWT")
	}

	// Instead of setting the cookie from the backend, we return the token in the JSON response.
	// The front-end at localhost:5173 should set the cookie (using js-cookie or document.cookie) as needed.
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user":    existingUser,
		"token":   jwtToken,
	})
}
