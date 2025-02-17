package phoneNumber

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
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// OTPHandler manages OTP requests
type OTPHandler struct {
	service *OTPService
}

// NewOTPHandler initializes OTP handler
func NewOTPHandler(service *OTPService) *OTPHandler {
	return &OTPHandler{service: service}
}

// RequestOTP handles OTP request API
func (h *OTPHandler) RequestOTP(c echo.Context) error {
	phone := c.FormValue("phone")
	if phone == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Phone number is required"})
	}

	err := h.service.SendOTP(phone)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to send OTP"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "OTP sent successfully"})
}

// VerifyOTP handles OTP verification API and returns a JWT on success
func (h *OTPHandler) VerifyOTP(c echo.Context) error {
	phone := c.FormValue("phone")
	otp := c.FormValue("otp")

	if phone == "" || otp == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Phone number and OTP are required"})
	}

	// Verify OTP
	if h.service.VerifyOTP(phone, otp) {
		// Create a new user
		user := models.UserPhone{
			ID:          primitive.NewObjectID(),
			PhoneNumber: phone,
			CreatedAt:   time.Now().Unix(),
		}

		// Insert user into the database
		collection := database.DB.Collection("user_ph")
		_, err := collection.InsertOne(context.Background(), user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save user to database"})
		}

		// Generate JWT for the user
		token, err := generateJWTForPhone(user)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate JWT"})
		}

		// Return success response with JWT and user details
		return c.JSON(http.StatusOK, map[string]interface{}{
			"message": "OTP verified successfully",
			"token":   token,
			"user": map[string]interface{}{
				"id":         user.ID.Hex(),
				"phone":      user.PhoneNumber,
				"created_at": user.CreatedAt,
			},
		})
	}

	return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid OTP"})
}

// RegisterOTPRoutes sets up OTP API endpoints on the given Echo instance.
func RegisterOTPRoutes(e *echo.Echo) {
	service := NewOTPService()
	handler := NewOTPHandler(service)

	e.POST("/otp/request", handler.RequestOTP)
	e.POST("/otp/verify", handler.VerifyOTP)
}

func generateJWTForPhone(user models.UserPhone) (string, error) {
	secret := strings.TrimSpace(os.Getenv("JWT_SECRET"))
	if secret == "" {
		secret = "defaultSecret"
	}
	claims := jwt.MapClaims{
		"sub":   user.ID.Hex(),
		"phone": user.PhoneNumber,
		"exp":   time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
