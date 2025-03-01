import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import ProjectEntry from "./ProjectEntry";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../../utils/ToastTheme";
import { ProjectSchema } from "../../../schemas/ProjectSchema";
import CodeIcon from "@mui/icons-material/Code";
import Education from "../Education/Education";
import Skills from "../Skills";
import Review from "../Review";
import ProgressBar from "../../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../../utils/Axios/BackendRequest";

export default function Projects({ fromReview }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    description: "",
    technologiesUsed: "",
    link: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState("Projects");

  // Fetch projects on mount.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
        toast.error("Failed to fetch projects", ToastTheme);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (event) => {
    setCurrentProject({
      ...currentProject,
      [event.target.name]: event.target.value,
    });
  };

  const handleNext = () => {
    if (!fromReview) {
      setCurrentStep("Skills");
    }
  };

  const handleGoBackToReview = () => {
    setCurrentStep("Review");
  };

  const handleAddProject = async () => {
    try {
      await ProjectSchema.validate(currentProject, { abortEarly: false });
      setErrors({});
      const token = getToken();
      // Append the new project to the current list.
      const updatedProjects = [...projects, { ...currentProject }];
      // POST the updated projects array to update the resume.
      await axios.post("http://localhost:3001/resume/projects", updatedProjects, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProjects(updatedProjects);
      toast.success("Project added successfully!", ToastTheme);
      setCurrentProject({
        projectName: "",
        description: "",
        technologiesUsed: "",
        link: "",
      });
      return true;
    } catch (err) {
      const newErrors = {};
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  if (currentStep === "Education") {
    return <Education />;
  }
  if (currentStep === "Skills") {
    return <Skills />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }

  return (
    <div className="mt-8">
      <ProgressBar step="Projects" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8">
        <CodeIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Projects</h1>
        <TextField
          fullWidth
          error={!!errors.projectName}
          helperText={errors.projectName}
          label="Project Name*"
          name="projectName"
          value={currentProject.projectName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
          label="Description*"
          name="description"
          multiline
          rows={3}
          value={currentProject.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!errors.technologiesUsed}
          helperText={errors.technologiesUsed}
          label="Technologies Used"
          name="technologiesUsed"
          value={currentProject.technologiesUsed}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!errors.link}
          helperText={errors.link}
          label="Link (GitHub/Deployed)*"
          name="link"
          value={currentProject.link}
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
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-xl font-bold text-center mb-4">Previously Added Projects</h1>
        {projects
          .filter((project) => project.projectName && project.link)
          .map((project, index) => (
            <ProjectEntry
              key={`${project.projectName}-${project.link}-${index}`}
              project={project}
              index={index}
              refreshProjects={async () => {
                try {
                  const token = getToken();
                  const res = await axios.get("http://localhost:3001/resume/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setProjects(res.data || []);
                } catch (error) {
                  console.error("Error refreshing projects:", error.response?.data || error.message);
                  toast.error("Failed to refresh projects", ToastTheme);
                }
              }}
            />
          ))}
      </Box>

      <div className="w-full max-w-xl mx-auto flex justify-between mt-4 mb-4">
        <button
          onClick={() => setCurrentStep("Education")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>

        {fromReview && (
          <button
            onClick={handleGoBackToReview}
            className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105 shadow-md"
          >
            Go Back to Preview
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
  );
}
