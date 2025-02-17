package usernamepassword

import (
	"context"
	"net/http"
	"os"
	"strings"
	"time"

	"oauth-app/database"
	"oauth-app/models"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

// generateJWT creates a JWT for the given user.
func generateJWT(user models.UsernamePassword) (string, error) {
	secret := strings.TrimSpace(os.Getenv("JWT_SECRET"))
	if secret == "" {
		secret = "defaultSecret" // fallback secret
	}
	claims := jwt.MapClaims{
		"username": user.Username,
		"sub":      user.ID.Hex(),
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// UsernamePasswordHandler handles both sign-up and sign-in via username and password.
func UsernamePasswordHandler(c echo.Context) error {
	// Define the expected request body.
	type Request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	req := new(Request)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	collection := database.DB.Collection("username_password")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user models.UsernamePassword
	err := collection.FindOne(ctx, bson.M{"username": req.Username}).Decode(&user)
	if err != nil {
		// User does not exist, so create a new user.
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to hash password"})
		}

		newUser := models.UsernamePassword{
			Username:  req.Username,
			Password:  string(hashedPassword),
			CreatedAt: time.Now().Unix(),
			UpdatedAt: time.Now().Unix(),
		}

		res, err := collection.InsertOne(ctx, newUser)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create user"})
		}
		newUser.ID = res.InsertedID.(primitive.ObjectID)
		user = newUser
	} else {
		// User exists; validate the password.
		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
		}
		// Optionally update the "updated_at" field.
		user.UpdatedAt = time.Now().Unix()
		collection.UpdateOne(ctx, bson.M{"_id": user.ID}, bson.M{"$set": bson.M{"updated_at": user.UpdatedAt}})
	}

	// Generate JWT for the user.
	token, err := generateJWT(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate JWT"})
	}

	// Remove the password before returning the response.
	user.Password = ""
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user":    user,
		"token":   token,
	})
}

// RegisterUsernamePasswordRoutes registers the endpoint for username/password authentication.
func RegisterUsernamePasswordRoutes(e *echo.Echo) {
	e.POST("/auth/username", UsernamePasswordHandler)
}
