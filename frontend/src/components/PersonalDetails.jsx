import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid2, Button } from '@mui/material';
import useResumeStore from '../app/ResumeStore';

export default function PersonalDetails() {
  const personalDetails = useResumeStore((state) => state.personalDetails);
  const setPersonalDetails = useResumeStore((state) => state.setPersonalDetails);

  const [localPersonalDetails, setLocalPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedIn: '',
  });

  useEffect(() => {
    setLocalPersonalDetails(personalDetails);
  }, [personalDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const { firstName, lastName, phoneNumber, email, linkedIn } = localPersonalDetails;

    if (!firstName || !lastName || !phoneNumber || !email || !linkedIn) {
      alert('Please fill all mandatory fields (marked as required) to save details.');
      return;
    }
    if (phoneNumber.length !== 10) {
      alert('Phone number should be 10 digits.');
      return;
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      alert('Enter a valid email address.');
      return;
    }
    for (const [key, value] of Object.entries(localPersonalDetails)) {
      setPersonalDetails(key, value);
    }
    alert('Details saved!');
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={localPersonalDetails.firstName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={localPersonalDetails.lastName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={localPersonalDetails.phoneNumber}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={localPersonalDetails.email}
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
            value={localPersonalDetails.address}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            required
            fullWidth
            label="LinkedIn Profile"
            name="linkedIn"
            value={localPersonalDetails.linkedIn}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save details
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
