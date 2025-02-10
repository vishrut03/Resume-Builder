import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import CategoryIcon from "@mui/icons-material/Category";
import CodingProfiles from "./CodingProfiles";
import ExtraCurricular from "./ExtraCurricular";
import Review from "./Review"; 
import ProgressBar from "../../components/ProgressBar";
import { getToken } from "../../utils/Axios/BackendRequest";

const Custom = ({ fromReview }) => {
  const [customSection, setCustomSection] = useState({
    heading: "",
    description: "",
  });
  const [headingError, setHeadingError] = useState("");
  const [descError, setDescError] = useState("");
  const [currentStep, setCurrentStep] = useState("Custom");

  // On mount, fetch the current custom section details.
  useEffect(() => {
    const fetchCustomSection = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/customSection", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // If no custom section exists, use default values.
        setCustomSection(res.data || { heading: "", description: "" });
      } catch (err) {
        console.error("Error fetching custom section:", err.response?.data || err.message);
      }
    };
    fetchCustomSection();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomSection({ ...customSection, [name]: value });
  };

  const handleSave = async () => {
    const { heading, description } = customSection;
    let hasError = false;
    if (heading.trim() === "") {
      setHeadingError("Heading cannot be empty");
      hasError = true;
    } else {
      setHeadingError("");
    }
    if (description.trim() === "") {
      setDescError("Description cannot be empty");
      hasError = true;
    } else {
      setDescError("");
    }
    if (hasError) return;

    try {
      const token = getToken();
      await axios.post(
        "http://localhost:3001/resume/customSection",
        customSection,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Custom section details saved successfully!", ToastTheme);
    } catch (err) {
      console.error("Error saving custom section:", err.response?.data || err.message);
      toast.error("Failed to save custom section details", ToastTheme);
    }
  };

  // Navigation: render alternate components when currentStep changes.
  if (currentStep === "CodingProfiles") {
    return <CodingProfiles />;
  }
  if (currentStep === "ExtraCurricular") {
    return <ExtraCurricular />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }
  
  return (
    <div className="mt-8">
      <ProgressBar step="CustomSection" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
        <CategoryIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Custom Section</h1>
        <TextField
          label="Section Heading"
          name="heading"
          error={!!headingError}
          helperText={headingError}
          fullWidth
          value={customSection.heading}
          onChange={handleChange}
        />
        <TextField
          label="Section Description"
          name="description"
          error={!!descError}
          helperText={descError}
          fullWidth
          multiline
          rows={4}
          value={customSection.description}
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
          onClick={handleSave}
        >
          Save Details
        </Button>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("CodingProfiles")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        {fromReview && (
          <button
            onClick={() => setCurrentStep("Review")}
            className="py-3 px-8 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 hover:scale-105 shadow-md transition-transform transform-gpu"
          >
            Go Back to Preview
          </button>
        )}
        <button
          onClick={() => (fromReview ? setCurrentStep("Review") : setCurrentStep("ExtraCurricular"))}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Custom;
