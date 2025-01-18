import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography } from '@mui/material';

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    institution: '',
    graduationYear: '',
    cgpa: '',
    achievements: '',
  });

  const handleChange = (event) => {
    setCurrentEducation({
      ...currentEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddEducation = () => {
    setEducations([...educations, currentEducation]);
    setCurrentEducation({
      degree: '',
      institution: '',
      graduationYear: '',
      cgpa: '',
      achievements: '',
    });
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Degree Name"
            name="degree"
            value={currentEducation.degree}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Institution Name"
            name="institution"
            value={currentEducation.institution}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year of Graduation"
            name="graduationYear"
            type="number"
            value={currentEducation.graduationYear}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CGPA/Percentage"
            name="cgpa"
            value={currentEducation.cgpa}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Achievements (Optional)"
            name="achievements"
            multiline
            rows={2}
            value={currentEducation.achievements}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddEducation}>
            Add Education
          </Button>
        </Grid2>
      </Grid2>
      {educations.map((edu, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6">{edu.degree} from {edu.institution}</Typography>
          <Typography>Graduated: {edu.graduationYear}</Typography>
          <Typography>CGPA/Percentage: {edu.cgpa}</Typography>
          {edu.achievements && <Typography>Achievements: {edu.achievements}</Typography>}
        </Box>
      ))}
    </Box>
  );
}

