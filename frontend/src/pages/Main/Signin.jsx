'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Container,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Signup from './Signup';
import PersonalDetails from './PersonalDetails';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Updated Google icon using the provided SVG and adjusted to 24x24
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="-3 0 262 262"
    preserveAspectRatio="xMidYMid"
  >
    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
  </svg>
);

// GitHub icon (kept as before)
const GithubIcon = () => (
  <svg viewBox="0 0 16 16" width="24" height="24" aria-hidden="true">
    <path
      fillRule="evenodd"
      fill="#181717"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
         0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
         1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
         0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 
         2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 
         0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 
         0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState('signin');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:3001/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.message === 'Token is valid') {
          setCurrent('personaldetails');
        } else {
          Cookies.remove('token'); // Remove invalid token
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        Cookies.remove('token'); // Remove expired or invalid token
      }
    };

    verifyToken();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must be a valid email address';
    }
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 8)
      newErrors.password = 'Password must be at least 8 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encryptPassword = (password) => {
    const secretKey = import.meta.env.VITE_SECRET_CRYPTO || 'your_secret_key';
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const encryptedPassword = encryptPassword(password);
        const response = await axios.post('http://localhost:3001/auth/signin', {
          email,
          password: encryptedPassword,
        });

        Cookies.set('token', response.data.token, { expires: 1, secure: true });
        if (response.data.message === 'Login successful') {
          setCurrent('personaldetails');
        }
      } catch (error) {
        console.error('Signin error:', error);
        setErrors({ submit: 'Invalid email or password' });
      }
    }
  };

  // Social sign-in handlers
  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleGithubSignIn = () => {
    window.location.href = 'http://localhost:3001/auth/github';
  };

  if (current === 'signup') {
    return <Signup />;
  }
  if (current === 'personaldetails') {
    return <PersonalDetails />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
            type={showPassword ? 'text' : 'password'}
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
          {errors.submit && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.submit}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 1, py: 1.5 }}
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2, py: 1.5 }}
            onClick={handleGithubSignIn}
            startIcon={<GithubIcon />}
          >
            Sign in with GitHub
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link onClick={() => setCurrent('signup')} variant="body2" sx={{ cursor: 'pointer' }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
