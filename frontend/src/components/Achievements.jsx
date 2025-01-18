import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState('');

  const handleAddAchievement = () => {
    if (currentAchievement.trim() !== '') {
      setAchievements([...achievements, currentAchievement.trim()]);
      setCurrentAchievement('');
    }
  };

  const handleDeleteAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
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
        {achievements.map((achievement, index) => (
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

