import React, { useState } from 'react';
import { Box, Button, Grid2, TextField } from '@mui/material'; 
import useResumeStore from '../app/ResumeStore';
import WorkExperienceEntry from './WorkExperienceEntry';

export default function WorkExperience() {
  const workExperience = useResumeStore((state) => state.workExperience);
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);

  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  });

  const handleChange = (event) => {
    setCurrentExperience({
      ...currentExperience,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    if (currentExperience.jobTitle && currentExperience.companyName) {
      addWorkExperience(currentExperience);
      setCurrentExperience({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
      });
      alert('Work experience saved!');
    } else {
      alert('Please fill in the required fields.');
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={currentExperience.jobTitle}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={currentExperience.companyName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentExperience.startDate}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentExperience.endDate}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Responsibilities"
            name="responsibilities"
            multiline
            rows={4}
            value={currentExperience.responsibilities}
            onChange={handleChange}
            placeholder="Enter responsibilities (separated by new lines)"
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleSave}>
            Add experience
          </Button>
        </Grid2>
      </Grid2>
      <Box mt={4}>
        {workExperience.filter(exp => exp.jobTitle && exp.companyName).map((exp, index) => (
          <WorkExperienceEntry
            key={index}
            experience={exp}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
}
