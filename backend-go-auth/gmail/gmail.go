package gmail

import (
	"crypto/rand"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"sync"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

// Store OTP in memory (cache)
var otpCache = sync.Map{}

var jwtSecret = os.Getenv("JWT_SECRET")

// Generate 6-digit OTP
func generateOTP() string {
	b := make([]byte, 4)
	_, _ = rand.Read(b)
	return fmt.Sprintf("%06d", b[0])
}

// Send OTP via Gmail
func sendEmail(email, otp string) error {
	from := os.Getenv("GMAIL_USER")
	password := os.Getenv("GMAIL_PASSWORD")

	to := []string{email}
	smtpServer := "smtp.gmail.com"
	auth := smtp.PlainAuth("", from, password, smtpServer)

	msg := []byte("Subject: Your OTP Code\n\nYour OTP code is: " + otp)
	err := smtp.SendMail(smtpServer+":587", auth, from, to, msg)
	if err != nil {
		log.Println("Failed to send email:", err)
		return err
	}
	return nil
}

// Request OTP API
func RequestOTP(c echo.Context) error {
	var request struct {
		Email string `json:"email"`
	}
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	otp := generateOTP()
	otpCache.Store(request.Email, otp)

	go func() {
		if err := sendEmail(request.Email, otp); err != nil {
			log.Println("Failed to send OTP:", err)
		}
	}()

	return c.JSON(http.StatusOK, echo.Map{"message": "OTP sent"})
}

// Generate JWT Token
func generateTokens(email string) (string, string, error) {
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Minute * 15).Unix(),
	})
	accessTokenString, err := accessToken.SignedString(jwtSecret)
	if err != nil {
		return "", "", err
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24 * 7).Unix(),
	})
	refreshTokenString, err := refreshToken.SignedString(jwtSecret)
	return accessTokenString, refreshTokenString, err
}

// Verify OTP API
func VerifyOTP(c echo.Context) error {
	var request struct {
		Email string `json:"email"`
		OTP   string `json:"otp"`
	}
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	storedOTP, exists := otpCache.Load(request.Email)
	if !exists || storedOTP.(string) != request.OTP {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Invalid OTP"})
	}

	otpCache.Delete(request.Email)

	accessToken, refreshToken, err := generateTokens(request.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Token generation failed"})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})
}
