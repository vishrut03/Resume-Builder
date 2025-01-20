import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography } from '@mui/material';
import useResumeStore from '../app/ResumeStore';

export default function CodingProfiles() {
  
  const [currentProfile, setCurrentProfile] = useState({
    platform: '',
    link: '',
  });

  const codingProfiles = useResumeStore((state) => state.codingProfiles);
  const addCodingProfile = useResumeStore((state) => state.addCodingProfile);

  const handleChange = (event) => {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value,
    });
    console.log(event)
  };

  const handleAddProfile = () => {
    if (currentProfile.platform.trim() !== '' && currentProfile.link.trim() !== '') {
      addCodingProfile(currentProfile);
      setCurrentProfile({
        platform: '',
        link: '',
      });
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Platform (e.g., LeetCode, GitHub)"
            name="platform"
            value={currentProfile.platform}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Profile Link"
            name="link"
            value={currentProfile.link}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddProfile}>
            Add Profile
          </Button>
        </Grid2>
      </Grid2>
      {codingProfiles.map((profile, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6">{profile.platform}</Typography>
          <Typography>Link: {profile.link}</Typography>
        </Box>
      ))}
    </Box>
  );
}

