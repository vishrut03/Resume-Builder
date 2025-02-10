import React, { useState, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Achievements from "./Achievements";
import CodingProfiles from "./CodingProfiles";
import Review from "./Review";
import ProgressBar from "../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../utils/Axios/BackendRequest";

export default function Certificates({ fromReview }) {
  const [currentCertificate, setCurrentCertificate] = useState({
    certificateName: "",
    organization: "",
    date: "",
  });
  const [certificates, setCertificates] = useState([]);
  const [currentStep, setCurrentStep] = useState("Certificates");
  const [nameError, setNameError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [dateError, setDateError] = useState("");

  // Fetch certificates on component mount.
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/certificates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCertificates(res.data || []);
      } catch (err) {
        console.error("Error fetching certificates:", err.response?.data || err.message);
        toast.error("Failed to fetch certificates", ToastTheme);
      }
    };
    fetchCertificates();
  }, []);

  const handleChange = (event) => {
    setCurrentCertificate({
      ...currentCertificate,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCertificate = async () => {
    let hasError = false;

    if (currentCertificate.certificateName.trim() === "") {
      setNameError("Certificate Name is required");
      hasError = true;
    } else {
      setNameError("");
    }

    if (currentCertificate.organization.trim() === "") {
      setOrganizationError("Organization is required");
      hasError = true;
    } else {
      setOrganizationError("");
    }

    if (currentCertificate.date.trim() === "" || new Date(currentCertificate.date) > new Date()) {
      setDateError("Date is required");
      hasError = true;
    } else {
      setDateError("");
    }

    if (hasError) return;

    try {
      const token = getToken();
      // Map the UI field "organization" to the backend's expected "organisation"
      const certificateToAdd = {
        certificateName: currentCertificate.certificateName,
        organisation: currentCertificate.organization,
        date: currentCertificate.date,
      };

      // Append new certificate to the current array.
      const updatedCertificates = [...certificates, certificateToAdd];

      // POST the updated certificates array to the resume.
      await axios.post("http://localhost:3001/resume/certificates", updatedCertificates, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCertificates(updatedCertificates);
      toast.success("Certificate added successfully!", ToastTheme);
      setCurrentCertificate({
        certificateName: "",
        organization: "",
        date: "",
      });
    } catch (err) {
      console.error("Error adding certificate:", err.response?.data || err.message);
      toast.error("Failed to add certificate", ToastTheme);
    }
  };

  const handleDeleteCertificate = async (index) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/resume/certificates/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCertificates = certificates.filter((_, i) => i !== index);
      setCertificates(updatedCertificates);
      toast.success("Certificate deleted successfully!", ToastTheme);
    } catch (err) {
      console.error("Error deleting certificate:", err.response?.data || err.message);
      toast.error("Failed to delete certificate", ToastTheme);
    }
  };

  if (currentStep === "Achievements") {
    return <Achievements />;
  }
  if (currentStep === "CodingProfiles") {
    return <CodingProfiles />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }
  return (
    <div className="mt-8">
      <ProgressBar step="Certificates" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8">
        <CardMembershipIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Certificates</h1>
        <TextField
          fullWidth
          error={!!nameError}
          helperText={nameError}
          label="Certificate Name"
          name="certificateName"
          value={currentCertificate.certificateName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!organizationError}
          helperText={organizationError}
          label="Organization"
          name="organization"
          value={currentCertificate.organization}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!dateError}
          helperText={dateError}
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={currentCertificate.date}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "50%",
            margin: "0 auto",
            display: "block",
            marginTop: 2,
            padding: "10px 20px",
            borderRadius: "8px",
          }}
          onClick={handleAddCertificate}
        >
          Add Certificate
        </Button>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-xl font-bold text-center mb-4 mt-6">Previously added certificates</h1>
        <List className="mt-8 space-y-4">
          {certificates
            .filter((cert) => cert.certificateName.trim() !== "" && cert.organisation.trim() !== "")
            .map((cert, index) => (
              <ListItem
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCertificate(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold">
                      {cert.certificateName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Organization: {cert.organisation}
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
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Achievements")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md mb-4"
        >
          Back
        </button>
        {fromReview && (
          <button
            onClick={() => setCurrentStep("Review")}
            className="py-3 px-8 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 hover:scale-105 shadow-md transition-transform transform-gpu ml-4"
          >
            Go Back to Review
          </button>
        )}
        <button
          onClick={() => setCurrentStep("CodingProfiles")}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu mb-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}
