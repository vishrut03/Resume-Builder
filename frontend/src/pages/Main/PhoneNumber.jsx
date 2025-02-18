"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box, Container, InputAdornment } from "@mui/material"
import { Phone, Lock } from "@mui/icons-material"
import Cookies from "js-cookie"
import axios from "axios"
import Signin from "./Signin"
import ToastTheme from "../../utils/ToastTheme";
import { toast } from "react-toastify";

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
        const { data } = await axios.post("http://localhost:8000/otp/request", new URLSearchParams({ phone: `+91${phoneNumber}` }), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        setOtpSent(true)
      } catch (error) {
        setErrors({ submit: error.response?.data?.error || "Failed to send OTP. Please try again." })
      }
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/otp/verify",
        new URLSearchParams({ phone: `+91${phoneNumber}`, otp }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      Cookies.set("token", data.token, { expires: 1 });
  
      if (data.message === "OTP verified successfully") {
        localStorage.setItem("currentStep", "personaldetails");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Invalid OTP. Please try again.";
  
      if (errorMessage === "OTP expired") {
        toast.error("OTP expired. Please request a new one.", ToastTheme);
        setOtpSent(false); // Allow user to request a new OTP
      } else {
        setErrors({ otp: errorMessage });
      }
    }
  };


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
