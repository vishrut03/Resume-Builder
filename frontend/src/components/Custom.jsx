import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import useResumeStore from "../app/ResumeStore";

const Custom = () => {
  const customDetails = useResumeStore((state) => state.customDetails); 
  const setCustomDetails = useResumeStore((state) => state.setCustomDetails); 

  const [customSection, setCustomSection] = useState(customDetails); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomSection({ ...customSection, [name]: value });
  };

  const handleSave = () => {
    const { heading, description } = customSection;
    if (!heading || !description) {
      alert("Please fill both the heading and description.");
      return;
    }
    setCustomDetails("heading", heading);
    setCustomDetails("description", description);
    alert("Custom section saved!");
  };

  return (
    <Box>
      <TextField
        label="Section Heading"
        name="heading"
        fullWidth
        value={customSection.heading}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Section Description"
        name="description"
        fullWidth
        multiline
        rows={4}
        value={customSection.description}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Details
      </Button>

      <Box mt={4}>
    <Typography variant="h5">{customDetails.heading}</Typography>
    <Typography variant="body1" component="div">
        {customDetails.description.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
        ))}
    </Typography>
</Box>

    </Box>
  );
};

export default Custom;
