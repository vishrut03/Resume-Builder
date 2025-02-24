"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { Email, Lock } from "@mui/icons-material"
import Signin from "./Signin"
import PersonalDetails from "./PersonalDetails"
import axios from "axios"
import Cookies from "js-cookie"
const API_BASE_URL = "http://localhost:8000/auth/gmail"

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
        const response = await axios.post(`${API_BASE_URL}/request-otp`, { email })
        console.log("OTP Sent:", response.data)
        setOtpSent(true)
      } catch (error) {
        console.error("Error sending OTP:", error)
        setErrors({ submit: error.response?.data?.message || "Failed to send OTP. Please try again." })
      }
    }
  }


  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp) {
      try {
        console.log("chal ja plz");
        const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp })
        console.log("chala");
        console.log("OTP Verified:", response.data)

        Cookies.set("token", response.data.token, { expires: 1 });
        console.log("Token set:", response.data.token)

        if (response.data.message === "Login successful") {
          localStorage.setItem("currentStep", "personaldetails");
          setCurrent("personaldetails");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error verifying OTP:", error)
        setErrors({ otp: error.response?.data?.message || "Invalid OTP. Please try again." })
      }
    } else {
      setErrors({ otp: "OTP is required" })
    }
  }

  if (current === "signin") return <Signin />
  if (current === "personaldetails") return <PersonalDetails />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <Box className="p-8">
          <Typography component="h1" variant="h4" className="text-4xl font-bold text-white mb-8 text-center">
            Sign In with Email
          </Typography>
          <Box component="form" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} noValidate className="mt-1 w-full">
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
                label="Enter OTP"
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
              <Typography color="error" variant="body2" className="mt-1">
                {errors.submit}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" className="mt-3 mb-2 py-3">
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
            <Box className="text-center mt-4">
              <Link onClick={() => setCurrent("signin")} variant="body2" className="cursor-pointer">
                Back to Sign In options
              </Link>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default EmailOtp
