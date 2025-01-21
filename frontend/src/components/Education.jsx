import React, { useState } from 'react';
import { Box, TextField, Button, Grid2 } from '@mui/material';
import EducationEntry from './EducationEntry';
import useResumeStore from '../app/ResumeStore';

export default function Education() {
  const education = useResumeStore((state) => state.education);
  const addEducation = useResumeStore((state) => state.addEducation);

  const [newEducation, setNewEducation] = useState({
    degreeName: '',
    institutionName: '',
    yearOfGraduation: '',
    cgpa: '',
  });

  const handleChange = (event) => {
    setNewEducation({
      ...newEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = () => {
    if(!newEducation.degreeName || !newEducation.institutionName || !newEducation.yearOfGraduation || !newEducation.cgpa) {
      alert('fill all fields will add toast/other UI later');
      return;
    }
    if(newEducation.yearOfGraduation < 1900 || newEducation.yearOfGraduation > new Date().getFullYear()+5) {
      alert('Invalid year of graduation');
      return;
    }
    if(newEducation.cgpa < 0 || newEducation.cgpa > 100) {
      alert('Invalid cgpa/percentage');
      return;
    }
    addEducation(newEducation);
    setNewEducation({ degreeName: '', institutionName: '', yearOfGraduation: '', cgpa: '' });
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Degree Name"
            name="degreeName"
            value={newEducation.degreeName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Institution Name"
            name="institutionName"
            value={newEducation.institutionName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year of Graduation"
            name="yearOfGraduation"
            type="number"
            value={newEducation.yearOfGraduation}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CGPA/Percentage"
            name="cgpa"
            value={newEducation.cgpa}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAdd}>
            Add Education
          </Button>
        </Grid2>
      </Grid2>

      {education.filter(edu => edu.degreeName && edu.institutionName && edu.yearOfGraduation && edu.cgpa) 
  .map((edu, index) => (
    <EducationEntry key={index} index={index} education={edu} />
  ))}

    </Box>
  );
}
