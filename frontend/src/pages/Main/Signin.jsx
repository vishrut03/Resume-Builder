'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Link, Box, Container, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import Signup from './Signup';
import PersonalDetails from './PersonalDetails';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    if (password && password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/auth/signin', { email, password });
        // console.log('Signin attempt with:', { email, password });
        // console.log(response.data.token);

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
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
