"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box, InputAdornment } from "@mui/material"
import { Phone, Lock } from "@mui/icons-material"
import Cookies from "js-cookie"
import axios from "axios"
import Signin from "./Signin"
import PersonalDetails from "./PersonalDetails"
import ToastTheme from "../../utils/ToastTheme"
import { toast } from "react-toastify"

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
        const { data } = await axios.post(
          "http://localhost:8000/otp/request",
          new URLSearchParams({ phone: `+91${phoneNumber}` }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        setOtpSent(true)
      } catch (error) {
        setErrors({ submit: error.response?.data?.error || "Failed to send OTP. Please try again." })
      }
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otp) {
      setErrors({ otp: "OTP is required" })
      return
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/otp/verify",
        new URLSearchParams({ phone: `+91${phoneNumber}`, otp }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      Cookies.set("token", data.token, { expires: 1 })
      if (data.message === "OTP verified successfully") {
        localStorage.setItem("currentStep", "personaldetails")
        setCurrent("personaldetails")
        window.location.reload()
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Invalid OTP. Please try again."
      if (errorMessage === "OTP expired") {
        toast.error("OTP expired. Please request a new one.", ToastTheme)
        setOtpSent(false)
      } else {
        setErrors({ otp: errorMessage })
      }
    }
  }

  if (current === "signin") return <Signin />
  if (current === "personaldetails") return <PersonalDetails />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <Box className="p-8">
          <Typography component="h1" variant="h4" className="text-4xl font-bold text-white mb-8 text-center">
            Sign In with Phone
          </Typography>
          <Box component="form" onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} noValidate className="mt-1 w-full">
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

export default PhoneNumber
