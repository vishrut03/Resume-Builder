import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useResumeStore from '../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BriefDescription() {
  const descriptionFromStore = useResumeStore((state) => state.briefDescription);
  const setDescriptionInStore = useResumeStore((state) => state.setBriefDescription);

  const [description, setDescription] = useState('');

  useEffect(() => {
    setDescription(descriptionFromStore);
  }, [descriptionFromStore]);

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSave = () => {
    setDescriptionInStore(description);
    toast.success("Description saved!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Brief Description"
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
