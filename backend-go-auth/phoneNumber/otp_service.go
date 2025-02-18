package phoneNumber

import (
	"fmt"
	"math/rand"
	"os"
	"sync"
	"time"

	"github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010"
)

// OTPData stores OTP and its expiry time
type OTPData struct {
	OTP     string
	Expires time.Time
}

// OTPService handles OTP generation and sending
type OTPService struct {
	twilioClient *twilio.RestClient
	mu           sync.Mutex // To prevent race conditions
}

var otpStorage = make(map[string]OTPData)

// NewOTPService initializes Twilio client
func NewOTPService() *OTPService {
	return &OTPService{
		twilioClient: twilio.NewRestClientWithParams(twilio.ClientParams{
			Username: os.Getenv("TWILIO_SID"),
			Password: os.Getenv("TWILIO_AUTH_TOKEN"),
		}),
	}
}

// GenerateOTP creates a 6-digit OTP and stores it with an expiry time
func (s *OTPService) GenerateOTP(phone string) string {
	rand.Seed(time.Now().UnixNano())
	otp := fmt.Sprintf("%06d", rand.Intn(1000000))

	s.mu.Lock()
	otpStorage[phone] = OTPData{
		OTP:     otp,
		Expires: time.Now().Add(5 * time.Minute), // OTP expires in 5 minutes
	}
	s.mu.Unlock()

	fmt.Printf("Generated OTP %s for phone %s\n", otp, phone)
	return otp
}

// SendOTP sends the OTP via Twilio
func (s *OTPService) SendOTP(phone string) error {
	otp := s.GenerateOTP(phone)

	params := &openapi.CreateMessageParams{}
	params.SetTo(phone)
	params.SetFrom(os.Getenv("TWILIO_PHONE_NUMBER"))
	params.SetBody("Your OTP code is: " + otp)

	_, err := s.twilioClient.Api.CreateMessage(params)
	fmt.Printf("Sent OTP %s to phone %s\n", otp, phone)
	if err != nil {
		return err
	}
	return nil
}

// VerifyOTP checks if the entered OTP is correct and not expired
func (s *OTPService) VerifyOTP(phone, otp string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, exists := otpStorage[phone]
	if !exists {
		return false // OTP not found
	}

	// Check if OTP has expired
	if time.Now().After(data.Expires) {
		delete(otpStorage, phone) // Remove expired OTP
		return false
	}

	// Validate OTP and remove it after use
	if data.OTP == otp {
		delete(otpStorage, phone)
		return true
	}
	return false
}
