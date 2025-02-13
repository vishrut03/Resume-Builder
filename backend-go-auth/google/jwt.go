package google

import (
	"fmt"
	"os"
	"strings"
	"time"

	"oauth-app/models"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(user models.UserOAuth) (string, error) {
	// Retrieve and trim the secret
	secret := strings.TrimSpace(os.Getenv("JWT_SECRET"))
	fmt.Printf("Using secret: %s\n", secret)
	if secret == "" {
		secret = "defaultSecret" // same as in NestJS
	}
	fmt.Printf("Using secret: %s\n", secret)

	claims := jwt.MapClaims{
		"email": user.Email,
		"sub":   user.ID.Hex(), // using Hex string of ObjectID
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
