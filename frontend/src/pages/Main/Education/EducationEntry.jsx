import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useResumeStore from '../../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';

function EducationEntry({ education, index }) {
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const deleteEducation = useResumeStore((state) => state.deleteEducation); 
  const [localEducation, setLocalEducation] = useState(education);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    setLocalEducation({
      ...localEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    updateEducation(index, localEducation);  
    toast.success("Education details updated successfully!", ToastTheme);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteEducation(index); 
    toast.success("Education details deleted successfully!", ToastTheme);
  };

  return (
    <Box mt={2}>
      {isEditing ? (
        <>
          <Box mb={2}>
            <TextField
              label="Degree Name"
              name="degreeName"
              value={localEducation.degreeName}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Institution Name"
              name="institutionName"
              value={localEducation.institutionName}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Year of Graduation"
              name="yearOfGraduation"
              value={localEducation.yearOfGraduation}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="CGPA/Percentage"
              name="cgpa"
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
          <Typography>Graduated: {education.yearOfGraduation}</Typography>
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
