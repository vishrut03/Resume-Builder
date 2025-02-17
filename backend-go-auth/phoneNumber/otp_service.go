package phoneNumber

import (
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010" // ✅ Use "openapi" instead of "v2010"
)

// OTPService handles OTP generation and sending
type OTPService struct {
	twilioClient *twilio.RestClient
}

var otpStorage = make(map[string]string) // Store OTPs in-memory for simplicity

// NewOTPService initializes Twilio client
func NewOTPService() *OTPService {
	return &OTPService{
		twilioClient: twilio.NewRestClientWithParams(twilio.ClientParams{
			Username: os.Getenv("TWILIO_SID"),
			Password: os.Getenv("TWILIO_AUTH_TOKEN"),
		}),
	}
}

// GenerateOTP creates a 6-digit OTP
func (s *OTPService) GenerateOTP(phone string) string {
	rand.Seed(time.Now().UnixNano())
	otp := fmt.Sprintf("%06d", rand.Intn(1000000))
	fmt.Printf("Generated OTP %s for phone %s\n", otp, phone)
	otpStorage[phone] = otp
	return otp
}

// SendOTP sends the OTP to the user's phone via Twilio
func (s *OTPService) SendOTP(phone string) error {
	otp := s.GenerateOTP(phone)

	params := &openapi.CreateMessageParams{} // ✅ Use "openapi" instead of "v2010"
	params.SetTo(phone)
	params.SetFrom(os.Getenv("TWILIO_PHONE_NUMBER"))
	params.SetBody("Your OTP code is: " + otp)

	_, err := s.twilioClient.Api.CreateMessage(params)
	if err != nil {
		return err
	}
	return nil
}

// VerifyOTP checks if the entered OTP matches the stored one
func (s *OTPService) VerifyOTP(phone, otp string) bool {
	if val, exists := otpStorage[phone]; exists && val == otp {
		delete(otpStorage, phone) // OTP should be used only once
		return true
	}
	return false
}
