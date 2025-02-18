package gmailauth

import (
	"context"
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"os"
	"time"

	"oauth-app/database"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/gomail.v2"
)

var otpCache = make(map[string]string)

type OTPRequest struct {
	Email string `json:"email"`
}

type OTPVerify struct {
	Email string `json:"email"`
	OTP   string `json:"otp"`
}

// User struct for MongoDB
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Email     string             `bson:"email"`
	CreatedAt time.Time          `bson:"created_at"`
}

// Generate a 6-digit OTP
func GenerateOTP() string {
	n, _ := rand.Int(rand.Reader, big.NewInt(899999))
	return fmt.Sprintf("%06d", n.Int64()+100000)
}

// Store OTP in cache
func StoreOTP(email, otp string) {
	otpCache[email] = otp
}

// Validate OTP
func ValidateOTP(email, otp string) bool {
	storedOTP, exists := otpCache[email]
	if !exists || storedOTP != otp {
		return false
	}
	delete(otpCache, email)
	return true
}

// Send OTP via Email
func SendOTP(email, otp string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("SMTP_EMAIL"))
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Your OTP Code")
	m.SetBody("text/plain", "Your OTP code is: "+otp)

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("SMTP_EMAIL"), os.Getenv("SMTP_PASSWORD"))

	if err := d.DialAndSend(m); err != nil {
		log.Println("Failed to send OTP:", err)
		return err
	}
	return nil
}

func GenerateToken(userID primitive.ObjectID, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID.Hex(),
		"email":   email,
		"exp":     jwt.NewNumericDate(time.Now().Add(time.Hour * 24)), // Token expires in 24 hours
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

// Request OTP Handler
func RequestOTP(c echo.Context) error {
	var req OTPRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	collection := database.DB.Collection("users")

	// Check if user exists
	var existingUser User
	err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		// Create a new user
		newUser := User{
			ID:        primitive.NewObjectID(),
			Email:     req.Email,
			CreatedAt: time.Now(),
		}

		_, err := collection.InsertOne(context.TODO(), newUser)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to create user"})
		}
		existingUser = newUser
	} else if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Database error"})
	}

	// Generate and send OTP
	otp := GenerateOTP()
	StoreOTP(req.Email, otp)

	if err := SendOTP(req.Email, otp); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to send OTP"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "OTP sent successfully"})
}

// Verify OTP & Authenticate User
func VerifyOTP(c echo.Context) error {
	var req OTPVerify
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	// Validate OTP
	if !ValidateOTP(req.Email, req.OTP) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid OTP"})
	}

	collection := database.DB.Collection("users")

	// Retrieve user
	var existingUser User
	err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "User does not exist. Please sign up."})
	} else if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Database error"})
	}

	// Generate JWT Token
	token, err := GenerateToken(existingUser.ID, existingUser.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user": map[string]interface{}{
			"id":    existingUser.ID.Hex(),
			"email": existingUser.Email,
		},
		"token": token,
	})
}

// Register Routes
func RegisterRoutes(e *echo.Echo) {
	e.POST("/auth/gmail/request-otp", RequestOTP)
	e.POST("/auth/gmail/verify-otp", VerifyOTP)
}
