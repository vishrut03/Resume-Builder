import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';
import DescriptionIcon from "@mui/icons-material/Description";
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience/WorkExperience'

export default function BriefDescription() {
  const briefDescription = useResumeStore((state) => state.resume.briefDescription);
  const editSimpleField = useResumeStore((state) => state.editSimpleField);

  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(undefined);
  const [currentStep, setCurrentStep] = useState("");

  useEffect(() => {
    setDescription(briefDescription);
  }, [briefDescription]);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {
    if (description.trim() === '') {
      setErrors("Description cannot be empty");
      return;
    } else if (description.length > 500) {
      setErrors("Description cannot exceed 500 characters");
      return;
    } else if (description.length < 10) {
      setErrors("Description should be at least 10 characters long");
      return;
    }
    setErrors(undefined);
    editSimpleField('briefDescription', description);
    toast.success("Description saved!", ToastTheme);
  };

  if(currentStep === "PersonalDetails") {
    return <PersonalDetails />
  }
  if(currentStep === "WorkExperience") {
    return <WorkExperience />
  }
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <DescriptionIcon />
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 4 }}>
        Brief Description
      </Typography>

      <TextField
        fullWidth
        label="Brief Description"
        error={errors !== undefined ? true : false}
        helperText={errors}
        multiline
        rows={4}
        value={description}
        onChange={handleChange}
        placeholder="Motivated software engineer with a passion for developing scalable solutions."
        sx={{ marginBottom: 2, maxWidth: 600 }}
      />
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSave} 
        sx={{ width: 200, fontSize: '16px', textTransform: 'none' }}
      >
        Save Description
      </Button>

      <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
        Ensure your description is clear and concise.
      </Typography>
    </Box>
    <div className="w-full max-w-xl flex justify-between mt-4">
        <button
          onClick={()=>setCurrentStep("PersonalDetails")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        <button
          onClick={()=>setCurrentStep("WorkExperience")}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </>
  );
}
