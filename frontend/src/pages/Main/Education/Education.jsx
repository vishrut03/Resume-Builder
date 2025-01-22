import React, { useState } from 'react';
import { Box, TextField, Button, Grid2 } from '@mui/material';
import EducationEntry from './EducationEntry';
import useResumeStore from '../../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Education() {
  const education = useResumeStore((state) => state.education);
  const addEducation = useResumeStore((state) => state.addEducation);

  const [newEducation, setNewEducation] = useState({
    degreeName: '',
    institutionName: '',
    yearOfGraduation: '',
    cgpa: '',
  });

  const handleChange = (event) => {
    setNewEducation({
      ...newEducation,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = () => {
    if(!newEducation.degreeName || !newEducation.institutionName || !newEducation.yearOfGraduation || !newEducation.cgpa) {
      toast.error("Please fill all mandatory fields (marked as required) to save details.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      return;
    }
    if(newEducation.yearOfGraduation < 1900 || newEducation.yearOfGraduation > new Date().getFullYear()+5) {
      toast.error("Invalid year of graduation", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if(newEducation.cgpa < 0 || newEducation.cgpa > 100) {
      toast.error("Invalid CGPA/Percentage", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    addEducation(newEducation);
    toast.success("Education details added successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setNewEducation({ degreeName: '', institutionName: '', yearOfGraduation: '', cgpa: '' });
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Degree Name"
            name="degreeName"
            value={newEducation.degreeName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Institution Name"
            name="institutionName"
            type="text"
            value={newEducation.institutionName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Year of Graduation"
            name="yearOfGraduation"
            type="number"
            value={newEducation.yearOfGraduation}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="CGPA/Percentage"
            name="cgpa"
            type="number"
            value={newEducation.cgpa}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAdd}>
            Add Education
          </Button>
        </Grid2>
      </Grid2>

      {education.filter(edu => edu.degreeName && edu.institutionName && edu.yearOfGraduation && edu.cgpa) 
  .map((edu, index) => (
    <EducationEntry key={index} index={index} education={edu} />
  ))}

    </Box>
  );
}
