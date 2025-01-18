import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Grid2 } from '@mui/material';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '') {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Add Skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill();
              }
            }}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
          />
        ))}
      </Box>
    </Box>
  );
}

