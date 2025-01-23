import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid2, Button } from '@mui/material';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';
import {PersonalDetailsSchema} from '../../schemas/PersonalDetailsSchema';

export default function PersonalDetails() {
  const personalDetails = useResumeStore((state) => state.resume.personalDetails);
  const editSimpleField = useResumeStore((state) => state.editSimpleField);

  const [errors, setErrors] = useState({});

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

  const handleSave = async () => {
    const { firstName, lastName, phoneNumber, email, linkedIn } = localPersonalDetails;

    // if (!firstName || !lastName || !phoneNumber || !email || !linkedIn) {
    //   toast.error("Please fill all mandatory fields (marked as required) to save details.", ToastTheme);
    //   return;
    // }

    // if (phoneNumber.length !== 10) {
    //   toast.error("Phone number should be 10 digits.", ToastTheme);
    //   return;
    // }

    // if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    //   toast.error("Enter a valid email address.", ToastTheme);
    //   return;
    // }
    // PersonalDetailsSchema.cast(localPersonalDetails);
    try{
      await PersonalDetailsSchema.validate(localPersonalDetails,{abortEarly:false});
      editSimpleField('personalDetails', localPersonalDetails);
      toast.success("Details saved successfully", ToastTheme);
    }
    catch(err){
      const newErrors={};
      err.inner.forEach((e)=>{
        newErrors[e.path]=e.message;
      })
      console.log(newErrors);
      setErrors(newErrors);
    } 
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            error={errors.firstName?true:false}
            helperText={errors.firstName}
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
            error={errors.lastName?true:false}
            helperText={errors.lastName}
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
            error={errors.phoneNumber?true:false}
            helperText={errors.phoneNumber}
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
            helperText={errors.email}
            error={errors.email?true:false}
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
            error={errors.address?true:false}
            helperText={errors.address}
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
            helperText={errors.linkedIn}
            error={errors.linkedIn?true:false}
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
