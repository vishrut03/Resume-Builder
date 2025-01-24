import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import useResumeStore from '../../../app/ResumeStore';
import EducationEntry from './EducationEntry';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { EducationSchema } from '../../../schemas/EducationSchema';

export default function Education() {
  const education = useResumeStore((state) => state.resume.education);
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry);

  const [currentEducation, setCurrentEducation] = useState({
    degreeName: '',
    institutionName: '',
    startDate: '',
    endDate: '',
    cgpa: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setCurrentEducation({
      ...currentEducation,
      [event.target.name]: event.target.value,
    });
  };

  const checkOverlap = (newEducation) => {
    return education.some(edu => {
      const existingStart = new Date(edu.startDate);
      const existingEnd = edu.endDate ? new Date(edu.endDate) : new Date();
      const newStart = new Date(newEducation.startDate);
      const newEnd = newEducation.endDate ? new Date(newEducation.endDate) : new Date();

      return (newStart <= existingEnd && newEnd >= existingStart);
    });
  };

  const handleAdd = async () => {
    try {
      await EducationSchema.validate(currentEducation, { abortEarly: false });
      if (currentEducation.endDate && currentEducation.startDate > currentEducation.endDate) {
        throw new Error("End date cannot be before start date");
      }
      if (checkOverlap(currentEducation)) {
        throw new Error("Education duration overlaps with an existing entry");
      }
      setErrors({});
      addResumeEntry('education', currentEducation);
      setCurrentEducation({
        degreeName: '',
        institutionName: '',
        startDate: '',
        endDate: '',
        cgpa: '',
      });
      toast.success("Education added successfully!", { ...ToastTheme, progress: undefined });
    } catch (err) {
      const newErrors = {};
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
        });
      }
      if (currentEducation.startDate && currentEducation.endDate && currentEducation.startDate > currentEducation.endDate) {
        newErrors.endDate = "End date cannot be before start date";
      }
      if (err.message === "Education duration overlaps with an existing entry") {
        toast.error(err.message, { ...ToastTheme, progress: undefined });
      }
      setErrors(newErrors);
    }
  };

  return (
    <>
    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2, textAlign: 'center' }}>
        Education
      </Typography>
      <Box>
        <TextField
          required
          error={!!errors.degreeName}
          helperText={errors.degreeName}
          fullWidth
          label="Degree Name"
          name="degreeName"
          value={currentEducation.degreeName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Box>
        <TextField
          required
          error={!!errors.institutionName}
          helperText={errors.institutionName}
          fullWidth
          label="Institution Name"
          name="institutionName"
          value={currentEducation.institutionName}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Box display="flex" gap={2}>
        <Box flex={1}>
          <TextField
            fullWidth
            error={!!errors.startDate}
            helperText={errors.startDate}
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentEducation.startDate}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box flex={1}>
          <TextField
            fullWidth
            error={!!errors.endDate}
            helperText={errors.endDate}
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentEducation.endDate}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
      </Box>
      <Box>
        <TextField
          fullWidth
          error={!!errors.cgpa}
          helperText={errors.cgpa}
          label="CGPA"
          name="cgpa"
          value={currentEducation.cgpa}
          onChange={handleChange}
          sx={{ marginBottom: 2 }}
        />
      </Box>
      <Box textAlign="center">
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
          onClick={handleAdd}
        >
          Add Education
        </Button>
      </Box>
    </Box>  

    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-xl font-bold text-center mb-4">Previously added Education Details</h1>
      <Box className="mt-8 space-y-6">
        {education
          .filter((edu) => edu.degreeName && edu.institutionName && edu.startDate && edu.endDate && edu.cgpa)
          .map((edu, index) => (
            <EducationEntry key={`${edu.degreeName}-${edu.institutionName}-${index}`} index={index} education={edu} />
          ))}
      </Box>
    </Box>
    </>
  );
}