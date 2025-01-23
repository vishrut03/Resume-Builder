import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import useResumeStore from '../../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';

const ProjectEntry = ({ project, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProject, setLocalProject] = useState(project);
  const editArrayField = useResumeStore((state) => state.editArrayField);
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry);

  const handleChange = (field, value) => {
    setLocalProject({
      ...localProject,
      [field]: value,
    });
  };

  const handleSave = () => {
    Object.entries(localProject).forEach(([fieldKey, value]) => {
      editArrayField("projects", index, fieldKey, value);
    });
    
    toast.success("Project updated successfully!", ToastTheme);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteResumeEntry("projects", index);
    toast.success("Project deleted successfully!", ToastTheme);
  };

  return (
    <Box mt={2} border={1} p={2} borderRadius={2}>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="Project Name"
            value={localProject.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={localProject.description}
            onChange={(e) => handleChange('description', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Technologies"
            value={localProject.technologiesUsed}
            onChange={(e) => handleChange('technologiesUsed', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            label="Link"
            value={localProject.link}
            onChange={(e) => handleChange('link', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" onClick={handleSave} style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">{project.projectName}</Typography>
          <Typography>Description: {project.description}</Typography>
          <Typography>Technologies: {project.technologiesUsed}</Typography>
          <Typography>Link: {project.link}</Typography>
          <Button variant="contained" onClick={() => setIsEditing(true)} style={{ marginTop: '10px' }}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export default ProjectEntry;
