import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
// import useResumeStore from "../../../store/ResumeStore"  // zustand logic commented out
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { WorkExperienceSchema } from '../../../schemas/WorkExperienceSchema'; // work experience schema for validation
import { getToken } from '../../../utils/Axios/BackendRequest'; // ensure you have this utility

const WorkExperienceEntry = ({ experience, index, refreshWorkExperience }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [localExperience, setLocalExperience] = useState(experience);
  // const editArrayField = useResumeStore((state) => state.editArrayField);
  // const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry);
  const [errors, setErrors] = useState({});
  
  const handleChange = (field, value) => {
    setLocalExperience({
      ...localExperience,
      [field]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Validate using your schema
      await WorkExperienceSchema.validate(localExperience, { abortEarly: false });
      if (localExperience.endDate && localExperience.startDate > localExperience.endDate) {
        throw new Error("End date cannot be before start date");
      }
      setErrors({});
      
      const token = getToken();
      // Send PUT request to update the work experience entry at the given index
      await axios.put(`http://localhost:3001/resume/workExperience/${index}`, localExperience, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      toast.success("Work experience updated!", { ...ToastTheme, progress: undefined });
      setIsEditing(false);
      // Optionally refresh the work experience list from the backend if provided
      if (refreshWorkExperience) refreshWorkExperience();
    } catch (err) {
      const newErrors = {};
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
        });
      }
      if (localExperience.startDate && localExperience.endDate && localExperience.startDate > localExperience.endDate) {
        newErrors.endDate = "End date cannot be before start date";
      }
      setErrors(newErrors);
      toast.error("Failed to update work experience", { ...ToastTheme, progress: undefined });
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      // Send DELETE request to delete the work experience entry at the given index
      await axios.delete(`http://localhost:3001/resume/workExperience/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success("Work experience deleted!", { ...ToastTheme, progress: undefined });
      if (refreshWorkExperience) refreshWorkExperience();
    } catch (error) {
      console.error("Error deleting work experience:", error.response?.data || error.message);
      toast.error("Failed to delete work experience", ToastTheme);
    }
  };

  return (
    <Box mt={4} border={1} p={3} borderRadius={2} style={{ marginBottom: '24px' }}>
      {isEditing ? (
        <>
          <Typography variant="h6" gutterBottom>
            <TextField
              fullWidth
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
              label="Job Title"
              value={localExperience.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              fullWidth
              label="Company Name"
              error={!!errors.companyName}
              helperText={errors.companyName}
              value={localExperience.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              fullWidth
              error={!!errors.startDate}
              helperText={errors.startDate}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={localExperience.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            {' '}–{' '}
            <TextField
              fullWidth
              label="End Date"
              type="date"
              error={!!errors.endDate}
              helperText={errors.endDate}
              InputLabelProps={{ shrink: true }}
              value={localExperience.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography>
            <TextField
              fullWidth
              error={!!errors.responsibilities}
              helperText={errors.responsibilities}  
              label="Responsibilities"
              multiline
              rows={3}
              value={localExperience.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Button variant="contained" onClick={handleSave} style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">{experience.jobTitle}</Typography>
          <Typography>{experience.companyName}</Typography>
          <Typography>
            {experience.startDate} – {experience.endDate}
          </Typography>
          <Typography>{experience.responsibilities}</Typography>
          <Button variant="contained" onClick={handleEditToggle} style={{ marginTop: '10px' }}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export default WorkExperienceEntry;
