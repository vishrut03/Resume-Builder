import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useResumeStore from '../../app/ResumeStore'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';

export default function ExtraCurricular() {
  
  const [currentActivity, setCurrentActivity] = useState({
    activityName: '',
    description: '',
    achievements: '',
  });

  const extracurricularActivities = useResumeStore(state=>state.extracurricularActivities);
  const addExtracurricularActivity = useResumeStore(state=>state.addExtracurricularActivity);
  const deleteExtracurricularActivity = useResumeStore(state=>state.deleteExtracurricularActivity);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddActivity = () => {
    if (currentActivity.activityName.trim() !== '') {
      addExtracurricularActivity(currentActivity);
      toast.success("Activity added successfully!", ToastTheme);
      setCurrentActivity({
        activityName: '',
        description: '',
        achievements: '',
      });
    }

    else
    {
      toast.error("Please enter correct activity details!", ToastTheme);
    }
  };

  const handleDeleteActivity = (index) => {
    deleteExtracurricularActivity(index);
    toast.success("Activity deleted successfully!", ToastTheme);
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
            name="activityName"
            value={currentActivity.activityName}
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
        {extracurricularActivities.map((activity, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteActivity(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={activity.activityName}
              secondary={
                <>
                  {activity.description && (
                    <Typography component="span" variant="body2" color="text.primary">
                      {activity.description}
                    </Typography>
                  )}
                  <br/>
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
