import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import EducationEntry from "./EducationEntry";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../../utils/ToastTheme";
import { EducationSchema } from "../../../schemas/EducationSchema";
import SchoolIcon from "@mui/icons-material/School";
import WorkExperience from "../WorkExperience/WorkExperience";
import Projects from "../Project/Projects";
import Review from "../Review";
import ProgressBar from "../../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../../utils/Axios/BackendRequest";

export default function Education({ fromReview }) {
  // Use local state for the education list instead of zustand.
  const [education, setEducation] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    degreeName: "",
    institutionName: "",
    startDate: "",
    endDate: "",
    cgpa: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState("Education");

  // Fetch education entries on mount.
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/education", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Expect the GET endpoint to return an array
        setEducation(res.data || []);
      } catch (error) {
        console.error("Error fetching education details:", error.response?.data || error.message);
        toast.error("Failed to fetch education details", ToastTheme);
      }
    };
    fetchEducation();
  }, []);

  const handleChange = (event) => {
    setCurrentEducation({
      ...currentEducation,
      [event.target.name]: event.target.value,
    });
  };

  // Next/Back buttons are preserved as in your original component.
  const handleNext = async () => {
    if (education.length >= 1) {
      setCurrentStep("Projects");
    } else {
      toast.error("Please add at least 1 education entry", { ...ToastTheme, progress: undefined });
    }
  };

  const handleGoToReview = () => {
    setCurrentStep("Review");
  };

  const checkOverlap = (newEducation) => {
    return education.some((edu) => {
      const existingStart = new Date(edu.startDate);
      const existingEnd = edu.endDate ? new Date(edu.endDate) : new Date();
      const newStart = new Date(newEducation.startDate);
      const newEnd = newEducation.endDate ? new Date(newEducation.endDate) : new Date();
      return newStart <= existingEnd && newEnd >= existingStart;
    });
  };

  const handleAdd = async () => {
    try {
      await EducationSchema.validate(currentEducation, { abortEarly: false });
      if (currentEducation.endDate && currentEducation.startDate > currentEducation.endDate) {
        throw new Error("End date cannot be before start date");
      }
      if (checkOverlap(currentEducation)) {
        throw new Error("Education duration overlaps with an existing entry");
      }
      setErrors({});
      const token = getToken();
      // Append the new entry locally.
      const updatedEducation = [...education, currentEducation];
      // POST the updated education array to update the resume.
      await axios.post("http://localhost:3001/resume/education", updatedEducation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setEducation(updatedEducation);
      setCurrentEducation({
        degreeName: "",
        institutionName: "",
        startDate: "",
        endDate: "",
        cgpa: "",
      });
      toast.success("Education added successfully!", { ...ToastTheme, progress: undefined });
      return true;
    } catch (err) {
      const newErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          if (!newErrors[e.path]) newErrors[e.path] = e.message;
        });
      }
      if (
        currentEducation.startDate &&
        currentEducation.endDate &&
        currentEducation.startDate > currentEducation.endDate
      ) {
        newErrors.endDate = "End date cannot be before start date";
      }
      if (err.message === "Education duration overlaps with an existing entry") {
        toast.error(err.message, { ...ToastTheme, progress: undefined });
      }
      setErrors(newErrors);
      return false;
    }
  };

  // Preserve navigation by conditionally rendering other components.
  if (currentStep === "WorkExperience") {
    return <WorkExperience />;
  }
  if (currentStep === "Projects") {
    return <Projects />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }

  return (
    <div className="mt-8">
      <ProgressBar step="Education" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8">
        <SchoolIcon />
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2, textAlign: "center" }}>
          Education
        </Typography>
        <Box>
          <TextField
            required
            error={!!errors.degreeName}
            helperText={errors.degreeName}
            fullWidth
            label="Degree Name"
            name="degreeName"
            value={currentEducation.degreeName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>

        <Box>
          <TextField
            required
            error={!!errors.institutionName}
            helperText={errors.institutionName}
            fullWidth
            label="Institution Name"
            name="institutionName"
            value={currentEducation.institutionName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Box flex={1}>
            <TextField
              fullWidth
              error={!!errors.startDate}
              helperText={errors.startDate}
              label="Start Date"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentEducation.startDate}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Box flex={1}>
            <TextField
              fullWidth
              error={!!errors.endDate}
              helperText={errors.endDate}
              label="End Date"
              name="endDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentEducation.endDate}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <TextField
            fullWidth
            error={!!errors.cgpa}
            helperText={errors.cgpa}
            label="CGPA"
            name="cgpa"
            value={currentEducation.cgpa}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box textAlign="center">
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
            onClick={handleAdd}
          >
            Add Education
          </Button>
        </Box>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-xl font-bold text-center mb-4">Previously added Education Details</h1>
        <Box className="mt-8 space-y-6">
          {education
            .filter((edu) => edu.degreeName && edu.institutionName && edu.startDate && edu.endDate && edu.cgpa)
            .map((edu, idx) => (
              <EducationEntry
                key={`${edu.degreeName}-${edu.institutionName}-${idx}`}
                index={idx}
                education={edu}
                refreshEducation={async () => {
                  try {
                    const token = getToken();
                    const res = await axios.get("http://localhost:3001/resume/education", {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setEducation(res.data || []);
                  } catch (error) {
                    console.error("Error refreshing education details:", error.response?.data || error.message);
                    toast.error("Failed to refresh education details", ToastTheme);
                  }
                }}
              />
            ))}
        </Box>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4 mb-4">
        <button
          onClick={() => setCurrentStep("WorkExperience")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        <div className="flex gap-4">
          {fromReview && (
            <button
              onClick={() => setCurrentStep("Review")}
              className="py-3 px-8 mr-16 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 hover:scale-105 shadow-md transition-transform transform-gpu"
            >
              Go Back to Review
            </button>
          )}
          <button
            onClick={handleNext}
            className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
