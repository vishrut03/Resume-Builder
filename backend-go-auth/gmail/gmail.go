package gmail

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
	"oauth-app/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/gomail.v2"
)

// OTP Cache (In-Memory)
var otpCache = make(map[string]string)

// Structs for OTP Handling
type OTPRequest struct {
	Email string `json:"email"`
}

type OTPVerify struct {
	Email string `json:"email"`
	OTP   string `json:"otp"`
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
	delete(otpCache, email) // Remove OTP after successful validation
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

// Generate JWT Token
func GenerateToken(user models.UserOAuth) (string, error) {
	claims := jwt.MapClaims{
		"user_id": user.ID.Hex(),
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
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

	// MongoDB User Collection
	collection := database.DB.Collection("users")

	// Check if user exists
	var existingUser models.UserOAuth
	err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&existingUser)

	if err == mongo.ErrNoDocuments {
		// If user does not exist, create a new user
		newUser := models.UserOAuth{
			ID:        primitive.NewObjectID(),
			Email:     req.Email,
			Name:      "", // You can fetch the name later if needed
			CreatedAt: time.Now().Unix(),
		}

		_, err := collection.InsertOne(context.TODO(), newUser)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to create user"})
		}
		existingUser = newUser
	} else if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Database error"})
	}

	// Generate JWT Token
	token, err := GenerateToken(existingUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
	}

	// Return Response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user": map[string]interface{}{
			"id":    existingUser.ID.Hex(),
			"email": existingUser.Email,
			"name":  existingUser.Name,
		},
		"token": token,
	})
}

// Register Routes
func RegisterRoutes(e *echo.Echo) {
	e.POST("/auth/gmail/request-otp", RequestOTP)
	e.POST("/auth/gmail/verify-otp", VerifyOTP)
}
