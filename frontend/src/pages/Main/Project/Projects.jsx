import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid2 } from '@mui/material';
import useResumeStore from '../../../app/ResumeStore';
import ProjectEntry from './ProjectEntry';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import {ProjectSchema} from '../../../schemas/ProjectSchema';

export default function Projects() {
  const projectsStore = useResumeStore((state) => state.resume.projects);
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry);
  const [currentProject, setCurrentProject] = useState({
    projectName: '',
    description: '',
    technologiesUsed: '',
    link: '',
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    setCurrentProject({
      ...currentProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProject = async() => {

    try {
      await ProjectSchema.validate(currentProject,{abortEarly:false});
      setErrors({});
      addResumeEntry("projects", {...currentProject});
      toast.success("Project added successfully!", ToastTheme);
      setCurrentProject({
        projectName: '',
        description: '',
        technologiesUsed: '',
        link: '',
      });
    } catch (err) {
      const newErrors={};
      if(err.inner!==undefined){
        err.inner.forEach((e)=>{
          if(newErrors[e.path]===undefined) newErrors[e.path]=e.message;
        })
      }  
      setErrors(newErrors);
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={errors.projectName?true:false}
            helperText={errors.projectName}
            label="Project Name*"
            name="projectName"
            value={currentProject.projectName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={errors.description?true:false}
            helperText={errors.description}
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
            error={errors.technologiesUsed?true:false}
            helperText={errors.technologiesUsed}
            label="Technologies Used"
            name="technologiesUsed"
            value={currentProject.technologiesUsed}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={errors.link?true:false}
            helperText={errors.link}
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
        <ProjectEntry 
          key={`${project.projectName}-${project.link}-${index}`}
          project={project} 
          index={index} 
        />
      ))}

    </Box>
  );
}
