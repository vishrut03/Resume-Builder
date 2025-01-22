import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import useResumeStore from "../app/ResumeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Custom = () => {
  const customDetails = useResumeStore((state) => state.customDetails); 
  const setCustomDetails = useResumeStore((state) => state.setCustomDetails); 

  const customFields={
    heading: "",
    description: ""
  }
  const [customSection, setCustomSection] = useState(customFields); 

  useEffect(() => {
    setCustomSection(customDetails); 
  }, [customDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomSection({ ...customSection, [name]: value });
  };

  const handleSave = () => {
    const { heading, description } = customSection;
    if (!heading || !description) {
        toast.error("Please fill both the heading and description.", {
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
    setCustomDetails("heading", heading);
    setCustomDetails("description", description);
    setCustomSection({ heading: "", description: "" });
    toast.success("Custom section details saved successfully!", {
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
