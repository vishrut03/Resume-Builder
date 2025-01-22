import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import useResumeStore from '../app/ResumeStore';

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
    alert('Description saved!');
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
