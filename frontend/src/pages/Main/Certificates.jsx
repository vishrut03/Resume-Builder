import React, { useState } from "react";
import { Box, TextField, Button, Grid2, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useResumeStore from "../../app/ResumeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Certificates() {
  const [currentCertificate, setCurrentCertificate] = useState({
    name: "",
    organization: "",
    date: "",
  });

  const certificates = useResumeStore((state) => state.certificates);
  const addCertificate = useResumeStore((state) => state.addCertificate);
  const deleteCertificate = useResumeStore((state) => state.deleteCertificate);

  const handleChange = (event) => {
    setCurrentCertificate({
      ...currentCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCertificate = () => {
    if (currentCertificate.name.trim() !== "" && currentCertificate.organization.trim() !== "") {
      addCertificate(currentCertificate);
      toast.success("Certificate added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setCurrentCertificate({
        name: "",
        organization: "",
        date: "",
      });
    }

    else
    {
      toast.error("Please enter valid certificate details!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteCertificate = (index) => {
    deleteCertificate(index);
    toast.success("Certificate deleted successfully!", {
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
      <Typography variant="h6" gutterBottom>
        Certificates
      </Typography>
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
      <List sx={{ mt: 2 }}>
        {certificates
          .filter((cert) => cert.name.trim() !== "" && cert.organization.trim() !== "")
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
                primary={cert.name}
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
