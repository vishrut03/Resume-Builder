import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import useResumeStore from '../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkExperienceEntry = ({ experience, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localExperience, setLocalExperience] = useState(experience);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const deleteWorkExperience = useResumeStore((state) => state.deleteWorkExperience); // Access delete function

  const handleChange = (field, value) => {
    setLocalExperience({
      ...localExperience,
      [field]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateWorkExperience(index, localExperience);
    toast.success("Work experience updated!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteWorkExperience(index); 
    toast.success("Work experience deleted!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box mt={4} border={1} p={3} borderRadius={2} style={{ marginBottom: '24px' }}>
      {isEditing ? (
        <>
          <Typography variant="h6" gutterBottom>
            <TextField
              fullWidth
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
              value={localExperience.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              fullWidth
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
              InputLabelProps={{ shrink: true }}
              value={localExperience.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography>
            <TextField
              fullWidth
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
