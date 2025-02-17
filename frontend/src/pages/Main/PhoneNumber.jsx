"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box, Container, InputAdornment } from "@mui/material"
import { Phone,Lock } from "@mui/icons-material"
import Signin from "./Signin"

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [current, setCurrent] = useState("phoneNumber")

  const validatePhoneNumber = () => {
    const newErrors = {}
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (validatePhoneNumber()) {
      try {
        // Replace this with your actual API call to send OTP
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
        setOtpSent(true)
      } catch (error) {
        console.error("Error sending OTP:", error)
        setErrors({ submit: "Failed to send OTP. Please try again." })
      }
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp) {
      try {
        // Replace this with your actual API call to verify OTP
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
        // After successful verification, you can redirect to the personal details page
        // setCurrent('personaldetails');
        console.log("OTP verified successfully")
      } catch (error) {
        console.error("Error verifying OTP:", error)
        setErrors({ otp: "Invalid OTP. Please try again." })
      }
    } else {
      setErrors({ otp: "OTP is required" })
    }
  }

  if (current === "signin") {
    return <Signin />
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: "primary.main" }}>
          Sign In with Phone
        </Typography>
        <Box
          component="form"
          onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="tel"
            autoFocus
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            disabled={otpSent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
          {otpSent && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={!!errors.otp}
              helperText={errors.otp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          {errors.submit && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.submit}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            {otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link onClick={() => setCurrent("signin")} variant="body2" sx={{ cursor: "pointer" }}>
              Back to Sign In options
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default PhoneNumber

