package phoneNumber

import (
	"net/http"

	"github.com/labstack/echo/v4"
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

// VerifyOTP handles OTP verification API
func (h *OTPHandler) VerifyOTP(c echo.Context) error {
	phone := c.FormValue("phone")
	otp := c.FormValue("otp")

	if phone == "" || otp == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Phone number and OTP are required"})
	}

	if h.service.VerifyOTP(phone, otp) {
		return c.JSON(http.StatusOK, map[string]string{"message": "OTP verified successfully"})
	}

	return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid OTP"})
}

// RegisterOTPRoutes sets up OTP API endpoints
func RegisterOTPRoutes(e *echo.Echo) {
	service := NewOTPService()
	handler := NewOTPHandler(service)

	e.POST("/otp/request", handler.RequestOTP)
	e.POST("/otp/verify", handler.VerifyOTP)
}
