import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useResumeStore from '../../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { EducationSchema } from '../../../schemas/EducationSchema';

function EducationEntry({ education, index }) {
  const editArrayField = useResumeStore((state) => state.editArrayField);
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry);
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
      Object.entries(localEducation).forEach(([fieldKey, value]) => {
        editArrayField("education", index, fieldKey, value);
      });
      toast.success("Education details updated successfully!", ToastTheme);
      setIsEditing(false);
    } catch (err) {
      const newErrors = {};
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
    }
  };

  const handleDelete = () => {
    deleteResumeEntry("education", index);
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