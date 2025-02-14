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

	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"

	"golang.org/x/crypto/bcrypt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/gomail.v2"
)

// OTP Cache with Expiry
var otpCache = make(map[string]struct {
	OTP    string
	Expiry time.Time
})

// Structs
type OTPRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type OTPVerify struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	OTP      string `json:"otp"`
}

// User Model
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"password"`
	CreatedAt int64              `bson:"created_at" json:"created_at"`
}

// Generate Secure 6-digit OTP
func GenerateOTP() string {
	n, _ := rand.Int(rand.Reader, big.NewInt(900000))
	return fmt.Sprintf("%06d", n.Int64()+100000)
}

// Store OTP in cache with expiry
func StoreOTP(email, otp string) {
	otpCache[email] = struct {
		OTP    string
		Expiry time.Time
	}{OTP: otp, Expiry: time.Now().Add(5 * time.Minute)}

	// Automatically remove OTP after expiry
	go func(email string) {
		time.Sleep(5 * time.Minute)
		delete(otpCache, email)
	}(email)
}

// Validate OTP with expiry check
func ValidateOTP(email, otp string) bool {
	data, exists := otpCache[email]
	fmt.Print(data.OTP)
	fmt.Print(otp)
	fmt.Printf("var1 = %T\n", data.OTP)
	fmt.Printf("var1 = %T\n", otp)
	fmt.Print(exists)

	if !exists || data.Expiry.Before(time.Now()) || data.OTP != otp {
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
func GenerateToken(user User) (string, error) {
	claims := jwt.MapClaims{
		"user_id": user.ID.Hex(),
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

// Hash Password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// Compare Hashed Password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Request OTP Handler
func RequestOTP(c echo.Context) error {
	var req OTPRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	collection := database.DB.Collection("users")

	// Check if user already exists
	var existingUser User
	err := collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&existingUser)
	if err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"message": "User already exists"})
	}

	// Generate and send OTP
	otp := GenerateOTP()
	StoreOTP(req.Email, otp)

	if err := SendOTP(req.Email, otp); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to send OTP"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "OTP sent successfully"})
}

// Decrypt AES encrypted password
func DecryptPassword(encryptedPassword string) (string, error) {
	key := []byte(os.Getenv("VITE_SECRET_CRYPTO")) // Use the same key as frontend
	ciphertext, _ := base64.StdEncoding.DecodeString(encryptedPassword)

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	iv := ciphertext[:aes.BlockSize] // Extract IV
	ciphertext = ciphertext[aes.BlockSize:]

	mode := cipher.NewCBCDecrypter(block, iv)
	mode.CryptBlocks(ciphertext, ciphertext)

	// Remove padding
	ciphertext = PKCS5UnPadding(ciphertext)

	return string(ciphertext), nil
}

// Remove padding after decryption
func PKCS5UnPadding(src []byte) []byte {
	length := len(src)
	unpadding := int(src[length-1])
	return src[:(length - unpadding)]
}

// Verify OTP & Register User
// Verify OTP and Register User
func VerifyOTP(c echo.Context) error {
	var req OTPVerify
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "Invalid request"})
	}

	// Validate OTP
	if !ValidateOTP(req.Email, req.OTP) {
		return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid OTP"})
	}

	// Decrypt password
	fmt.Print(req.Password)
	/*decryptedPassword, err := DecryptPassword(req.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to decrypt password"})
	}
	fmt.Print(decryptedPassword)*/

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to hash password"})
	}
	fmt.Print(hashedPassword)

	// MongoDB User Collection
	collection := database.DB.Collection("users")

	// Check if user already exists
	var existingUser User
	err = collection.FindOne(context.TODO(), bson.M{"email": req.Email}).Decode(&existingUser)
	if err == nil {
		return c.JSON(http.StatusConflict, map[string]string{"message": "User already exists"})
	}

	// If user does not exist, create new user
	newUser := User{
		ID:        primitive.NewObjectID(),
		Email:     req.Email,
		Password:  string(hashedPassword), // Store hashed password
		CreatedAt: time.Now().Unix(),
	}

	_, err = collection.InsertOne(context.TODO(), newUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to create user"})
	}

	// Generate JWT Token
	token, err := GenerateToken(newUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"message": "Failed to generate token"})
	}

	// Return Response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Login successful",
		"user": map[string]interface{}{
			"id":    newUser.ID.Hex(),
			"email": newUser.Email,
		},
		"token": token,
	})
}

// Register Routes
func RegisterRoutes(e *echo.Echo) {
	e.POST("/auth/gmail/request-otp", RequestOTP)
	e.POST("/auth/gmail/verify-otp", VerifyOTP)
}
