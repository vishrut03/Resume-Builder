import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import useResumeStore from "../../../store/ResumeStore"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../../utils/ToastTheme';
import { WorkExperienceSchema } from '../../../schemas/WorkExperienceSchema';

const WorkExperienceEntry = ({ experience, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localExperience, setLocalExperience] = useState(experience);
  const editArrayField = useResumeStore((state) => state.editArrayField);
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry);
  const [errors, setErrors] = useState({});
  
  const handleChange = (field, value) => {
    setLocalExperience({
      ...localExperience,
      [field]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async() => {

    try {
      await WorkExperienceSchema.validate(localExperience,{abortEarly:false});
      if(localExperience.endDate && localExperience.startDate>localExperience.endDate){
        throw new Error("End date cannot be before start date");
      }
      setErrors({});
      Object.keys(localExperience).forEach((fieldKey) => {
        editArrayField('workExperience', index, fieldKey, localExperience[fieldKey]);
      });
      toast.success("Work experience updated!", {...ToastTheme,progress: undefined});
      setIsEditing(false);
    } catch (err) {
      const newErrors={};
      if(err.inner!==undefined){
        err.inner.forEach((e)=>{
          if(newErrors[e.path]===undefined) newErrors[e.path]=e.message;
        })
      }  
      if(localExperience.startDate && localExperience.endDate && localExperience.startDate>localExperience.endDate){
        newErrors.endDate="End date cannot be before start date";
      }
      setErrors(newErrors);
    }
  };

  const handleDelete = () => {
    deleteResumeEntry('workExperience', index);
    toast.success("Work experience deleted!", {...ToastTheme,progress: undefined});
  };

  return (
    <Box mt={4} border={1} p={3} borderRadius={2} style={{ marginBottom: '24px' }}>
      {isEditing ? (
        <>
          <Typography variant="h6" gutterBottom>
            <TextField
              fullWidth
              error={errors.jobTitle?true:false}
              helperText={errors.jobTitle}
              label="Job Title"
              value={localExperience.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              fullWidth
              label="Company Name"
              error={errors.companyName?true:false}
              helperText={errors.companyName}
              value={localExperience.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              fullWidth
              error={errors.startDate?true:false}
              helperText={errors.startDate}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={localExperience.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            {' '}–{' '}
            <TextField
              fullWidth
              label="End Date"
              type="date"
              error={errors.endDate?true:false}
              helperText={errors.endDate}
              InputLabelProps={{ shrink: true }}
              value={localExperience.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Typography>
            <TextField
              fullWidth
              error={errors.responsibilities?true:false}
              helperText={errors.responsibilities}  
              label="Responsibilities"
              multiline
              rows={3}
              value={localExperience.responsibilities}
              onChange={(e) => handleChange('responsibilities', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Typography>
          <Button variant="contained" onClick={handleSave} style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">{experience.jobTitle}</Typography>
          <Typography>{experience.companyName}</Typography>
          <Typography>
            {experience.startDate} – {experience.endDate}
          </Typography>
          <Typography>{experience.responsibilities}</Typography>
          <Button variant="contained" onClick={handleEditToggle} style={{ marginTop: '10px' }}>
            Edit
          </Button>
        </>
      )}
    </Box>
  );
};

export default WorkExperienceEntry;
