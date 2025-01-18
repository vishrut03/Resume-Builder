import React, { useState } from 'react';
import { Box, TextField, Button, Grid2, Typography } from '@mui/material';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [currentCertificate, setCurrentCertificate] = useState({
    name: '',
    organization: '',
    date: '',
  });

  const handleChange = (event) => {
    setCurrentCertificate({
      ...currentCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCertificate = () => {
    if (currentCertificate.name.trim() !== '') {
      setCertificates([...certificates, currentCertificate]);
      setCurrentCertificate({
        name: '',
        organization: '',
        date: '',
      });
    }
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Certificate Name"
            name="name"
            value={currentCertificate.name}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Organization"
            name="organization"
            value={currentCertificate.organization}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentCertificate.date}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddCertificate}>
            Add Certificate
          </Button>
        </Grid2>
      </Grid2>
      {certificates.map((cert, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6">{cert.name}</Typography>
          <Typography>Organization: {cert.organization}</Typography>
          <Typography>Date: {cert.date}</Typography>
        </Box>
      ))}
    </Box>
  );
}

