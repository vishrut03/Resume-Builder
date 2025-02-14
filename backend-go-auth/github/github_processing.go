package github

import (
	"context"
	"fmt"
	"oauth-app/database"
	"oauth-app/google"
	"oauth-app/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProcessGitHubUserAndGenerateJWT processes user info and generates a JWT token.
func ProcessGitHubUserAndGenerateJWT(userData map[string]interface{}) (string, error) {
	email, _ := userData["email"].(string)
	name, _ := userData["name"].(string)

	if email == "" {
		return "", fmt.Errorf("email not provided in GitHub user data")
	}

	newUser := models.UserOAuth{
		Email:     email,
		Name:      name,
		CreatedAt: time.Now().Unix(),
	}

	collection := database.DB.Collection("users_oauth")

	var existingUser models.UserOAuth
	err := collection.FindOne(context.Background(), bson.M{"email": email}).Decode(&existingUser)
	if err == mongo.ErrNoDocuments {
		res, err := collection.InsertOne(context.Background(), newUser)
		if err != nil {
			return "", fmt.Errorf("failed to store user in DB")
		}
		newUser.ID = res.InsertedID.(primitive.ObjectID)
		existingUser = newUser
	} else if err != nil {
		return "", fmt.Errorf("error checking user in DB: %v", err)
	}

	jwtToken, err := google.GenerateJWT(existingUser)
	if err != nil {
		return "", fmt.Errorf("failed to generate JWT: %v", err)
	}

	return jwtToken, nil
}
