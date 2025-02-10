import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import PersonalDetails from './PersonalDetails';
import { Style } from '@mui/icons-material';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [current, setCurrent] = useState('signin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signin logic here
    console.log('Signin attempt with:', { email, password });
    // On successful signin, navigate to personal details page
    setCurrent('personaldetails');
  };

  if(current === 'signup') {
    return <Signup/>
  }  

  if(current === 'personaldetails') {
    return <PersonalDetails/>
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Link onClick={() => setCurrent('signup')} variant="body2" sx={{ cursor: "pointer" }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;