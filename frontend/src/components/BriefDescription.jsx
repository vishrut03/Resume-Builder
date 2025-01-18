import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

export default function BriefDescription() {
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
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
    </Box>
  );
}

