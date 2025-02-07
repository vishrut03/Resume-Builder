'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const Signin = ({ onSignUp, onSuccessfulSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Implement sign-in logic here
    console.log('Sign in with:', email, password);
    // If sign-in is successful, call onSuccessfulSignIn
    onSuccessfulSignIn();
  };

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log('Sign in with Google');
    // If sign-in is successful, call onSuccessfulSignIn
    onSuccessfulSignIn();
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
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1, width: '100%' }}>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mb: 2 }}
        >
          Sign in with Google
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="#" variant="body2" onClick={onSignUp}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
