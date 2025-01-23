import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import useResumeStore from "../../app/ResumeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";

const Custom = () => {
  const customDetails = useResumeStore((state) => state.resume.customDetails);
  const editObjectField = useResumeStore((state) => state.editObjectField);
  const [headingError,setHeadingError] = useState('');
  const [descError,setDescError] = useState('');

  const customFields = {
    heading: "",
    description: "",
  };

  const [customSection, setCustomSection] = useState(customFields);

  useEffect(() => {
    // console.log(customDetails);
    setCustomSection(customDetails); 
  }, [customDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomSection({ ...customSection, [name]: value });
  };

  const handleSave = () => {
    const { heading, description } = customSection;
    let hasError = false;

    // Validate Heading
    if (heading.trim() === "") {
      setHeadingError("Heading cannot be empty");
      hasError = true;
    } else {
      setHeadingError(""); // Clear the error if valid
    }
  
    // Validate Description
    if (description.trim() === "") {
      setDescError("Description cannot be empty");
      hasError = true;
    } else {
      setDescError(""); // Clear the error if valid
    }
  
    // If there are errors, stop execution
    if (hasError) return;

    setDescError('');
    setHeadingError('');
    const modifiedObject = { heading, description };
    editObjectField("customDetails", modifiedObject);
    toast.success("Custom section details saved successfully!", ToastTheme);
    customSection.heading = "";
    customSection.description="";
    
  };

  return (
    <Box>
      <TextField
        label="Section Heading"
        name="heading"
        error={headingError!==''?true:false}
        helperText={headingError}
        fullWidth
        value={customSection.heading}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Section Description"
        name="description"
        error={descError!==''?true:false}
        helperText={descError}
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
          {(customDetails.description || "").split("\n").map((line, index) => (
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
