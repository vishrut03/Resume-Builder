import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useResumeStore from '../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CodingProfiles() {
  const [currentProfile, setCurrentProfile] = useState({
    platform: '',
    profileLink: '',
  });

  const codingProfiles = useResumeStore((state) => state.codingProfiles);
  const addCodingProfile = useResumeStore((state) => state.addCodingProfile);
  const deleteCodingProfile = useResumeStore((state) => state.deleteCodingProfile);

  const handleChange = (event) => {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProfile = () => {
    if (currentProfile.platform.trim() !== '' && currentProfile.profileLink.trim() !== '') {
      addCodingProfile(currentProfile);
      toast.success("Coding Profile added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCurrentProfile({
        platform: '',
        profileLink: '',
      });
    }

    else
    {
      toast.error("Please enter all details!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteProfile = (index) => {
    deleteCodingProfile(index);
    toast.success("Coding Profile deleted successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
        {codingProfiles.map((profile, index) => (
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
