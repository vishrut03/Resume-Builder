import React, { useState } from 'react';
import { Box, TextField, Grid2 } from '@mui/material';

export default function PersonalDetails() {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedIn: '',
  });

  const handleChange = (event) => {
    setPersonalDetails({
      ...personalDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={personalDetails.firstName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={personalDetails.lastName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={personalDetails.phoneNumber}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={personalDetails.email}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={2}
            value={personalDetails.address}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            name="linkedIn"
            value={personalDetails.linkedIn}
            onChange={handleChange}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

