import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';

export default function CodingProfiles() {
  const [currentProfile, setCurrentProfile] = useState({
    platform: '',
    profileLink: '',
  });

  const codingProfiles = useResumeStore((state) => state.resume.codingProfiles);
  const addCodingProfile = useResumeStore((state) => state.addResumeEntry);
  const deleteCodingProfile = useResumeStore((state) => state.deleteResumeEntry);

  const handleChange = (event) => {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProfile = () => {
    if (currentProfile.platform.trim() !== '' && currentProfile.profileLink.trim() !== '') {
      addCodingProfile("codingProfiles", currentProfile);
      toast.success("Coding Profile added successfully!", ToastTheme);
      setCurrentProfile({
        platform: '',
        profileLink: '',
      });
    } else {
      toast.error("Please enter all details!", ToastTheme);
    }
  };

  const handleDeleteProfile = (index) => {
    deleteCodingProfile("codingProfiles", index);
    toast.success("Coding Profile deleted successfully!", ToastTheme);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Coding Profiles
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Platform (e.g., LeetCode, GitHub)*"
            name="platform"
            value={currentProfile.platform}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Profile Link"
            name="profileLink"
            value={currentProfile.profileLink}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddProfile}>
            Add Profile
          </Button>
        </Grid2>
      </Grid2>
      <List sx={{ mt: 2 }}>
      {codingProfiles
        .filter((profile) => profile.platform.trim() !== "" && profile.profileLink.trim() !== "")  
        .map((profile, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProfile(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={profile.platform}
              secondary={`Link: ${profile.profileLink}`}
            />
          </ListItem>
        ))}
    </List>
    </Box>
  );
}
