import React, { useState } from 'react';
import { Box, Button, Grid2, TextField } from '@mui/material'; 
import useResumeStore from '../../../app/ResumeStore';
import WorkExperienceEntry from './WorkExperienceEntry';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { WorkExperienceSchema } from '../../../schemas/WorkExperienceSchema';

export default function WorkExperience() {
  const workExperience = useResumeStore((state) => state.resume.workExperience);
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry);

  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (event) => {
    setCurrentExperience({
      ...currentExperience,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {


    try {
      // WorkExperienceSchema.cast(currentExperience);
      await WorkExperienceSchema.validate(currentExperience,{abortEarly:false});
      if(currentExperience.endDate && currentExperience.startDate>currentExperience.endDate){
        throw new Error("End date cannot be before start date");
      }
      setErrors({});
      addResumeEntry('workExperience', currentExperience); 
      setCurrentExperience({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
      });
      toast.success("Experience added successfully!", {...ToastTheme,progress: undefined});

    } catch (err) {
      const newErrors={};
      if(err.inner!==undefined){
        err.inner.forEach((e)=>{
          if(newErrors[e.path]===undefined) newErrors[e.path]=e.message;
        })
      }  
      if(currentExperience.startDate && currentExperience.endDate && currentExperience.startDate>currentExperience.endDate){
        newErrors.endDate="End date cannot be before start date";
      }
      // console.log(newErrors);
      setErrors(newErrors);
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            error={errors.jobTitle?true:false}
            helperText={errors.jobTitle}
            label="Job Title*"
            name="jobTitle"
            value={currentExperience.jobTitle}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            error={errors.companyName?true:false}
            helperText={errors.companyName}
            label="Company Name*"
            name="companyName"
            value={currentExperience.companyName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            error={errors.startDate?true:false}
            helperText={errors.startDate}
            label="Start Date*"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentExperience.startDate}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12} sm={6}>
          <TextField
            fullWidth
            error={errors.endDate?true:false}
            helperText={errors.endDate}
            label="End Date*"
            name="endDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentExperience.endDate}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={errors.responsibilities?true:false}
            helperText={errors.responsibilities}
            label="Responsibilities"
            name="responsibilities"
            multiline
            rows={4}
            value={currentExperience.responsibilities}
            onChange={handleChange}
            placeholder="Enter responsibilities (separated by new lines)"
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleSave}>
            Add experience
          </Button>
        </Grid2>
      </Grid2>
      <Box mt={4}>
      {workExperience
      .filter((exp) => exp.jobTitle.trim() !== '' && exp.companyName.trim() !== '')
      .map((exp, index) => (
        <WorkExperienceEntry
          key={`${exp.jobTitle}-${exp.companyName}-${index}`}
          experience={exp}
          index={index} 
        />
      ))}
      </Box>
    </Box>
  );
}
