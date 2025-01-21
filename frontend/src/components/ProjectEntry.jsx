import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import useResumeStore from '../app/ResumeStore';

const ProjectEntry = ({ project, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProject, setLocalProject] = useState(project);
  const updateProject = useResumeStore((state) => state.updateProject);
  const deleteProject = useResumeStore((state) => state.deleteProject);

  const handleChange = (field, value) => {
    setLocalProject({
      ...localProject,
      [field]: value,
    });
  };

  const handleSave = () => {
    updateProject(index, localProject);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteProject(index);
  };

  return (
    <Box mt={2} border={1} p={2} borderRadius={2}>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            label="Project Name"
            value={localProject.name}
            onChange={(e) => handleChange('name', e.target.value)}
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
            value={localProject.technologies}
            onChange={(e) => handleChange('technologies', e.target.value)}
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
          <Typography variant="h6">{project.name}</Typography>
          <Typography>Description: {project.description}</Typography>
          <Typography>Technologies: {project.technologies}</Typography>
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
