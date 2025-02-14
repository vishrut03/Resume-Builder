"use client"

import { useState } from "react"
import { Box, Button, TextField, Typography, Link, InputAdornment, IconButton } from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import Signin from "./Signin"
import axios from "axios"
import CryptoJS from 'crypto-js';

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [current, setCurrent] = useState("signup")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!email.includes("@")) {
      newErrors.email = "Email must be a valid email address"
    }
    if (!password) newErrors.password = "Password is required"
    if (password && password.length < 8) newErrors.password = "Password must be at least 8 characters long"
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

 /*const encryptPassword = (password) => {
    const secretKey = import.meta.env.VITE_SECRET_CRYPTO || 'your_secret_key';      
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };*/

  // ✅ Step 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await axios.post("http://localhost:8000/auth/gmail/request-otp", { email })
        setOtpSent(true) // Show OTP field
      } catch (error) {
        console.error("OTP Request Error:", error)
        setErrors({ submit: "Failed to send OTP. Please try again." })
      }
    }
  }

  // ✅ Step 2: Verify OTP & Signup
  const handleVerifyOTP = async () => {
    try {
      //const encryptedPassword = encryptPassword(password)
      console.log(email,password,otp)
      const response = await axios.post("http://localhost:8000/auth/gmail/verify-otp", { email, password , otp })

      if (response.data.message === "Login successful") {
        setCurrent("signin") // Redirect to Signin page
      }
    } catch (error) {
      console.error("OTP Verification Error:", error)
      setErrors({ otp: "Invalid OTP. Please try again." })
    }
  }

  if (current === "signin") {
    return <Signin />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        padding: 4,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "primary.main" }}>
        Create Account
      </Typography>
      
      <Box component="form" onSubmit={handleRequestOTP} sx={{ mt: 1, width: "100%" }}>
        {/* Email Field */}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Field */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password Field */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errors.submit && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.submit}
          </Typography>
        )}

        {/* Signup Button (Request OTP) */}
        {!otpSent ? (
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            Sign Up
          </Button>
        ) : (
          <>
            {/* OTP Input Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={!!errors.otp}
              helperText={errors.otp}
            />

            {/* Verify OTP Button */}
            <Button onClick={handleVerifyOTP} fullWidth variant="contained" sx={{ mt: 2, mb: 2, py: 1.5 }}>
              Verify OTP
            </Button>
          </>
        )}

        <Box sx={{ textAlign: "center" }}>
          <Link onClick={() => setCurrent("signin")} variant="body2" sx={{ cursor: "pointer" }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Signup;
