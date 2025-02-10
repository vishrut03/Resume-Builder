import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { ProjectSchema } from '../../../schemas/ProjectSchema';
import { getToken } from '../../../utils/Axios/BackendRequest';

const ProjectEntry = ({ project, index, refreshProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localProject, setLocalProject] = useState(project);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setLocalProject({
      ...localProject,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      await ProjectSchema.validate(localProject, { abortEarly: false });
      setErrors({});
      const token = getToken();
      await axios.put(`http://localhost:3001/resume/projects/${index}`, localProject, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Project updated successfully!", ToastTheme);
      setIsEditing(false);
      if (refreshProjects) refreshProjects();
    } catch (err) {
      const newErrors = {};
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      toast.error("Failed to update project", ToastTheme);
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/resume/projects/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Project deleted successfully!", ToastTheme);
      if (refreshProjects) refreshProjects();
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message);
      toast.error("Failed to delete project", ToastTheme);
    }
  };

  return (
    <Box mt={2} border={1} p={2} borderRadius={2}>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            error={!!errors.projectName}
            helperText={errors.projectName}
            label="Project Name"
            value={localProject.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
            label="Description"
            multiline
            rows={3}
            value={localProject.description}
            onChange={(e) => handleChange('description', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            error={!!errors.technologiesUsed}
            helperText={errors.technologiesUsed}
            label="Technologies"
            value={localProject.technologiesUsed}
            onChange={(e) => handleChange('technologiesUsed', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            fullWidth
            error={!!errors.link}
            helperText={errors.link}
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
