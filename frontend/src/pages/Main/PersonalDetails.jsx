import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import useResumeStore from "../../app/ResumeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import { PersonalDetailsSchema } from "../../schemas/PersonalDetailsSchema";
import PersonIcon from "@mui/icons-material/Person";

export default function PersonalDetails() {
  const personalDetails = useResumeStore((state) => state.resume.personalDetails);
  const editSimpleField = useResumeStore((state) => state.editSimpleField);

  const [errors, setErrors] = useState({});
  const [localPersonalDetails, setLocalPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    linkedIn: "",
  });

  useEffect(() => {
    setLocalPersonalDetails(personalDetails);
  }, [personalDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalPersonalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await PersonalDetailsSchema.validate(localPersonalDetails, { abortEarly: false });
      setErrors({});
      editSimpleField("personalDetails", localPersonalDetails);
      toast.success("Details saved successfully", ToastTheme);
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
      <PersonIcon/>
      <h1 className="text-2xl font-bold text-center mb-4">Personal Details</h1>
      <TextField
        required
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth
        label="First Name"
        name="firstName"
        value={localPersonalDetails.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        error={!!errors.lastName}
        helperText={errors.lastName}
        fullWidth
        label="Last Name"
        name="lastName"
        value={localPersonalDetails.lastName}
        onChange={handleChange}
      />
      <TextField
        required
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={localPersonalDetails.phoneNumber}
        onChange={handleChange}
      />
      <TextField
        required
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={localPersonalDetails.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        error={!!errors.address}
        helperText={errors.address}
        label="Address"
        name="address"
        value={localPersonalDetails.address}
        onChange={handleChange}
      />
      <TextField
        required
        error={!!errors.linkedIn}
        helperText={errors.linkedIn}
        fullWidth
        label="LinkedIn Profile"
        name="linkedIn"
        value={localPersonalDetails.linkedIn}
        onChange={handleChange}
      />
      <Button
      variant="contained"
      color="primary"
      sx={{
        width: '50%', 
        margin: '0 auto',
        display: 'block', 
        marginTop: 2, 
        padding: '10px 20px',
        borderRadius: '8px', 
      }}
      onClick={handleSave}
    >
      Save Details
    </Button>

    </Box>
  );
}
