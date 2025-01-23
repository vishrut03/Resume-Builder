import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useResumeStore from '../../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from '../../utils/ToastTheme';

export default function BriefDescription() {
  const briefDescription = useResumeStore((state) => state.resume.briefDescription);
  const editSimpleField = useResumeStore((state) => state.editSimpleField);

  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(undefined);

  useEffect(() => {
    setDescription(briefDescription);
  }, [briefDescription]);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = async () => {

    if(description.trim()===''){
      setErrors("Description cannot be empty");
      return;
    }
    else if(description.length>200){
      setErrors("Description cannot exceed 200 characters");
      return;
    }
    else if(description.length<10){
      setErrors("Description should be atleast 10 characters long");
      return;
    }
    editSimpleField('briefDescription', description); 
    toast.success("Description saved!", ToastTheme);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Brief Description"
        error={errors!==undefined?true:false}
        helperText={errors}
        multiline
        rows={4}
        value={description}
        onChange={handleChange}
        placeholder="Motivated software engineer with a passion for developing scalable solutions."
      />
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
        Save Description
      </Button>
    </Box>
  );
}
