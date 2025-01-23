import React, { useState } from "react";
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useResumeStore from "../../app/ResumeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";

export default function Certificates() {
  const [currentCertificate, setCurrentCertificate] = useState({
    certificateName: "",
    organization: "",
    date: "",
  });

  const certificates = useResumeStore((state) => state.resume.certificates);
  const addCertificate = useResumeStore((state) => state.addResumeEntry);
  const deleteCertificate = useResumeStore((state) => state.deleteResumeEntry);

  const [nameError, setNameError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleChange = (event) => {
    setCurrentCertificate({
      ...currentCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCertificate = () => {

    let hasError = false;

    // Validate Certificate Name
    if (currentCertificate.certificateName.trim() === "") {
      setNameError("Certificate Name is required");
      hasError = true;
    } else {
      setNameError(""); // Clear the error if valid
    }

    // Validate Organization
    if (currentCertificate.organization.trim() === "") {
      setOrganizationError("Organization is required");
      hasError = true;
    } else {
      setOrganizationError(""); // Clear the error if valid
    }

    // Validate Date (if provided)
    if (currentCertificate.date && new Date(currentCertificate.date) > new Date()) {
      setDateError("Date cannot be in the future");
      hasError = true;
    } else {
      setDateError(""); // Clear the error if valid
    }

    // Stop execution if any error exists
    if (hasError) return;

    addCertificate("certificates", currentCertificate);
    toast.success("Certificate added successfully!", ToastTheme);

    setCurrentCertificate({
      certificateName: "",
      organization: "",
      date: "",
    });
  };

  const handleDeleteCertificate = (index) => {
    deleteCertificate("certificates", index);
    toast.success("Certificate deleted successfully!", ToastTheme);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Certificates
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={nameError !== ""?true:false} 
            helperText={nameError}
            label="Certificate Name"
            name="certificateName"
            value={currentCertificate.certificateName}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={organizationError !== ""?true:false}
            helperText={organizationError}
            label="Organization"
            name="organization"
            value={currentCertificate.organization}
            onChange={handleChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            error={dateError !== ""?true:false} 
            helperText={dateError}
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
      <List sx={{ mt: 2 }}>
        {certificates
          .filter((cert) => cert.certificateName.trim() !== "" && cert.organization.trim() !== "")
          .map((cert, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCertificate(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={cert.certificateName}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Organization: {cert.organization}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary">
                      Date: {cert.date}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
}
