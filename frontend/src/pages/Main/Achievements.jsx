import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Achievements() {
  const [currentAchievement, setCurrentAchievement] = useState('');
  let achievementsStore = useResumeStore((state) => state.resume.achievements) || []; 
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry); 
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry); 
  const [error, setError] = useState(undefined);

  const handleAddAchievement = () => {

    if(currentAchievement===""){
      setError("Please enter a valid skill!")
      return;
    }
    setError(undefined);
    if (currentAchievement.trim() !== '') {
      addResumeEntry("achievements", currentAchievement.trim());
      toast.success("Achievement added successfully!", ToastTheme);
      setCurrentAchievement('');
    }
    else {
      toast.error("Please enter a valid achievement!", ToastTheme); 
    }
  };

  const handleDeleteAchievement = (index) => {
    deleteResumeEntry("achievements", index);    
    toast.success("Achievement deleted successfully!", ToastTheme);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddAchievement();
    }
  };

  return (
    <Box>
      <EmojiEventsIcon/>
      <h1 className="text-2xl font-bold text-center mb-4">Achievements</h1>
      <TextField
        fullWidth
        label="Add Achievement"
        error={error===undefined?false:true}
        helperText={error}
        value={currentAchievement}
        onChange={(e) => setCurrentAchievement(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddAchievement}>
        Add Achievement
      </Button>
      <List sx={{ mt: 2 }}>
        {achievementsStore
          .filter((achievement) => achievement && achievement.trim())  // Filter out empty or falsy achievements
          .map((achievement, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAchievement(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={achievement.achievement || achievement} />  {/* Access the correct field */}
            </ListItem>
          ))}
      </List>


    </Box>
  );
}
