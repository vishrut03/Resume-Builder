import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid2, Button } from '@mui/material';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersonalDetails() {
  const personalDetails = useResumeStore((state) => state.resume.personalDetails);
  const editSimpleField = useResumeStore((state) => state.editSimpleField);

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
      toast.error("Please fill all mandatory fields (marked as required) to save details.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    if (phoneNumber.length !== 10) {
      toast.error("Phone number should be 10 digits.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      toast.error("Enter a valid email address.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    editSimpleField('personalDetails', localPersonalDetails);

    toast.success("Details saved successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
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
