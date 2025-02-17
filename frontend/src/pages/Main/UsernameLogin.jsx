"use client"

import { useState } from "react"
import { TextField, Button, Typography, Link, Box, Container, InputAdornment, IconButton } from "@mui/material"
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import Signin from "./Signin"
import axios from "axios"
import Cookies from "js-cookie"
import PersonalDetails from "./PersonalDetails"
const UsernameLogin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [current, setCurrent] = useState("usernameLogin")

  const validateForm = () => {
    const newErrors = {}
    if (!username) newErrors.username = "Username is required"
    if (!password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8000/auth/username", {
          username,
          password,
        })
        console.log(response)
        if (response.data.token) {
          Cookies.set("token", response.data.token, { expires: 1 })
          // After successful login, you can redirect or change the current view.
          localStorage.setItem("currentStep", "personaldetails")
          window.location.reload()
          setCurrent("personaldetails")
        }
      } catch (error) {
        console.error("Login error:", error)
        setErrors({ submit: "Invalid username or password" })
      }
    }
  }

  if (current === "signin") {
    return <Signin />
  }
  if(current === "personaldetails") {
    return <PersonalDetails />
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
          Login with Username
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
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
            autoComplete="current-password"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            Login
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

export default UsernameLogin
