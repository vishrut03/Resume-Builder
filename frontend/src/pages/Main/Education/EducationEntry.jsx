import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { EducationSchema } from '../../../schemas/EducationSchema';
import { getToken } from '../../../utils/Axios/BackendRequest';

function EducationEntry({ education, index, refreshEducation }) {
  const [localEducation, setLocalEducation] = useState(education);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setLocalEducation({
      ...localEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await EducationSchema.validate(localEducation, { abortEarly: false });
      setErrors({});
      const token = getToken();
      await axios.put(`http://localhost:3001/resume/education/${index}`, localEducation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Education details updated successfully!", { ...ToastTheme, progress: undefined });
      setIsEditing(false);
      if (refreshEducation) refreshEducation();
    } catch (err) {
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          if (!newErrors[e.path]) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      toast.error("Failed to update education details", ToastTheme);
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/resume/education/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Education details deleted successfully!", { ...ToastTheme, progress: undefined });
      if (refreshEducation) refreshEducation();
    } catch (error) {
      console.error("Error deleting education details:", error.response?.data || error.message);
      toast.error("Failed to delete education details", ToastTheme);
    }
  };

  return (
    <Box mt={2}>
      {isEditing ? (
        <>
          <Box mb={2}>
            <TextField
              label="Degree Name"
              name="degreeName"
              error={!!errors.degreeName}
              helperText={errors.degreeName}
              value={localEducation.degreeName}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Institution Name"
              name="institutionName"
              error={!!errors.institutionName}
              helperText={errors.institutionName}
              value={localEducation.institutionName}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Start Date"
              name="startDate"
              error={!!errors.startDate}
              helperText={errors.startDate}
              value={localEducation.startDate}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="End Date"
              name="endDate"
              error={!!errors.endDate}
              helperText={errors.endDate}
              value={localEducation.endDate}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="CGPA/Percentage"
              name="cgpa"
              error={!!errors.cgpa}
              helperText={errors.cgpa}
              value={localEducation.cgpa}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">
            {education.degreeName} from {education.institutionName}
          </Typography>
          <Typography>
            Duration: {education.startDate} - {education.endDate}
          </Typography>
          <Typography>CGPA/Percentage: {education.cgpa}</Typography>
          <Button onClick={() => setIsEditing(true)} variant="outlined">
            Edit
          </Button>
        </>
      )}
    </Box>
  );
}

export default EducationEntry;
