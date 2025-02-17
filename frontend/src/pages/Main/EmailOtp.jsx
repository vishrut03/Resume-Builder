"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box, Container, InputAdornment } from "@mui/material"
import { Email, Lock } from "@mui/icons-material"
import Signin from "./Signin"

const EmailOtp = () => {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [current, setCurrent] = useState("email")

  const validateEmail = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (validateEmail()) {
      try {
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
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
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
          Sign In with Email
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            disabled={otpSent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
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

export default EmailOtp
