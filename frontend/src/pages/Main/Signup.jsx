"use client"

import { useState } from "react"
import { Box, Button, TextField, Typography, Link, Divider, InputAdornment, IconButton } from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import PersonalDetails from "./PersonalDetails"
import Signin from "./Signin"
import axios from "axios"
import CryptoJS from 'crypto-js';


const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
  const encryptPassword = (password) => {
    const secretKey = import.meta.env.VITE_SECRET_CRYPTO || 'your_secret_key';      
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const encryptedPassword = encryptPassword(password);
        const response = await axios.post("http://localhost:3001/auth/signup", { email, password:encryptedPassword })
        if (response.data.message === "Signup successful") setCurrent("signin")
      } catch (error) {
        console.error("Signup error:", error)
        setErrors({ submit: "Failed to sign up. Please try again." })
      }
    }
  }

  if (current === "signin") {
    return <Signin />
  }

  if (current === "personaldetails") {
    return <PersonalDetails />
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
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1, width: "100%" }}>
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
          Sign Up
        </Button>
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
