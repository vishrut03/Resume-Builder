import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid2 } from '@mui/material';
import useResumeStore from '../app/ResumeStore';
import ProjectEntry from './ProjectEntry';

export default function Projects() {
  const projectsStore = useResumeStore((state) => state.projects);
  const addProjectStore = useResumeStore((state) => state.addProject);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
  });

  const handleChange = (event) => {
    setCurrentProject({
      ...currentProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProject = () => {
    if (currentProject.name && currentProject.link && currentProject.description) {
      addProjectStore(currentProject);
      setCurrentProject({
        name: '',
        description: '',
        technologies: '',
        link: '',
      });
    } else {
      alert('Please fill all the mandatory fields.');
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Project Name*"
            name="name"
            value={currentProject.name}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Description*"
            name="description"
            multiline
            rows={3}
            value={currentProject.description}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Technologies Used"
            name="technologies"
            value={currentProject.technologies}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Link (GitHub/Deployed)*"
            name="link"
            value={currentProject.link}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddProject}>
            Add Project
          </Button>
        </Grid2>
      </Grid2>
      {projectsStore
        .filter((project) => project.name && project.link)
        .map((project, index) => (
          <ProjectEntry key={index} project={project} index={index} />
        ))}
    </Box>
  );
}
