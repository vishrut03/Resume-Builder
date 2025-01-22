import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Grid2 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useResumeStore from '../app/ResumeStore';


export default function Achievements() {

  const [currentAchievement, setCurrentAchievement] = useState('');
  let achievementsStore = useResumeStore((state) => state.achievements);
  const addAchievementStore = useResumeStore((state) => state.addAchievement); 
  const deleteAchievementStore = useResumeStore((state) => state.deleteAchievement); 

  const handleAddAchievement = () => {
    if (currentAchievement.trim() !== '') {
      addAchievementStore(currentAchievement.trim());
      setCurrentAchievement('');
    }
  };

  const handleDeleteAchievement = (index) => {
    deleteAchievementStore(index);    
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddAchievement();
    }
  };


  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Achievements
      </Typography>
      <TextField
        fullWidth
        label="Add Achievement"
        value={currentAchievement}
        onChange={(e) => setCurrentAchievement(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddAchievement}>
        Add Achievement
      </Button>
      <List sx={{ mt: 2 }}>
        {achievementsStore.map((achievement, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAchievement(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={achievement} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

