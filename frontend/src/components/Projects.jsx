import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid2 } from '@mui/material';
import useResumeStore from '../app/ResumeStore';
import ProjectEntry from './ProjectEntry';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Projects() {
  const projectsStore = useResumeStore((state) => state.projects);
  const addProjectStore = useResumeStore((state) => state.addProject);
  const [currentProject, setCurrentProject] = useState({
    projectName: '',
    description: '',
    technologiesUsed: '',
    link: '',
  });

  const handleChange = (event) => {
    setCurrentProject({
      ...currentProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProject = () => {
    if (currentProject.projectName && currentProject.link && currentProject.description) {
      addProjectStore(currentProject);
      toast.success("Project added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCurrentProject({
        projectName: '',
        description: '',
        technologiesUsed: '',
        link: '',
      });
    } else {
      toast.error("Please fill all mandatory fields (marked as required).", {
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

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Project Name*"
            name="projectName"
            value={currentProject.projectName}
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
            name="technologiesUsed"
            value={currentProject.technologiesUsed}
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
        .filter((project) => project.projectName && project.link)
        .map((project, index) => (
          <ProjectEntry key={index} project={project} index={index} />
        ))}
    </Box>
  );
}
