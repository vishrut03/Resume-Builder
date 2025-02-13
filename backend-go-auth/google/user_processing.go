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

// processUserAndGenerateJWT extracts user details from Google data,
// stores (or fetches) the user from the users_oauth collection,
// generates a JWT, sets it as an HTTP-only cookie, and returns a JSON response.
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

	// Set JWT token in an HTTP-only cookie
	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    jwtToken,
		Path:     "/",
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
	})

	// Return response with user info and token
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user":    existingUser,
		"token":   jwtToken,
	})
}
