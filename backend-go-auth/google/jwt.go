// google/jwt.go
package google

import (
	"os"
	"time"

	"oauth-app/models"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(user models.UserOAuth) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	claims := jwt.MapClaims{
		"email": user.Email,
		"sub":   user.ID.Hex(), // using Hex string of ObjectID
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
