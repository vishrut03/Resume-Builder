import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography } from '@mui/material';

export default function WorkExperience() {
  const [experiences, setExperiences] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: '',
    company: '',
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

  const handleAddExperience = () => {
    setExperiences([...experiences, currentExperience]);
    setCurrentExperience({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    });
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
            name="company"
            value={currentExperience.company}
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
          <Button variant="contained" onClick={handleAddExperience}>
            Add Experience
          </Button>
        </Grid2>
      </Grid2>
      {experiences.map((exp, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6">{exp.jobTitle} at {exp.company}</Typography>
          <Typography>{exp.startDate} - {exp.endDate}</Typography>
          <Typography>{exp.responsibilities}</Typography>
        </Box>
      ))}
    </Box>
  );
}

