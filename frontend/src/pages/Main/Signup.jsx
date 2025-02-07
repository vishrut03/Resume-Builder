'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const Signup = ({ onSignIn, onSuccessfulSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Implement sign-up logic here
    console.log('Sign up with:', email, password);
    // If sign-up is successful, call onSuccessfulSignUp
    onSuccessfulSignUp();
  };

  const handleGoogleSignUp = () => {
    // Implement Google sign-up logic here
    console.log('Sign up with Google');
    // If sign-up is successful, call onSuccessfulSignUp
    onSuccessfulSignUp();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Create Account
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1, width: '100%' }}>
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
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignUp}
          sx={{ mb: 2 }}
        >
          Sign up with Google
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="#" variant="body2" onClick={onSignIn}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
