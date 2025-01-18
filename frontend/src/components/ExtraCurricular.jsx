import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExtraCurricular() {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState({
    name: '',
    description: '',
    achievements: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    if (currentActivity.name.trim() !== '') {
      setActivities((prev) => [...prev, currentActivity]);
      setCurrentActivity({
        name: '',
        description: '',
        achievements: '',
      });
    }
  };

  const handleDeleteActivity = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Extra-Curricular Activities
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Activity Name"
            name="name"
            value={currentActivity.name}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Description (Optional)"
            name="description"
            multiline
            rows={2}
            value={currentActivity.description}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Achievements/Recognition (Optional)"
            name="achievements"
            multiline
            rows={2}
            value={currentActivity.achievements}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddActivity}>
            Add Activity
          </Button>
        </Grid2>
      </Grid2>
      <List sx={{ mt: 2 }}>
        {activities.map((activity, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteActivity(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={activity.name}
              secondary={
                <>
                  {activity.description && (
                    <Typography component="span" variant="body2" color="text.primary">
                      {activity.description}
                    </Typography>
                  )}
                  {activity.achievements && (
                    <Typography component="span" variant="body2" color="text.secondary">
                      Achievements: {activity.achievements}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
