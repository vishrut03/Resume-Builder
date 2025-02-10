import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import popularSkills from "../../utils/PopularSkills";
import BuildIcon from "@mui/icons-material/Build";
import Projects from "./Project/Projects";
import Achievements from "./Achievements";
import Review from "./Review";
import ProgressBar from "../../components/ProgressBar";
import Cookies from "js-cookie";

export default function Skills({ fromReview }) {
  // Local state for skills, current input, and any errors.
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(undefined);
  const [currentStep, setCurrentStep] = useState("Skills");

  // Fetch skills from backend when component mounts.
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:3001/resume/skills", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // Expecting response.data to be either an object like { value: [...] } or directly an array.
        if (response.data && response.data.value) {
          setSkills(response.data.value);
        } else if (Array.isArray(response.data)) {
          setSkills(response.data);
        } else {
          setSkills([]);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        toast.error("Failed to fetch skills", ToastTheme);
      }
    };

    fetchSkills();
  }, []);

  // Add a skill by updating the backend and local state.
  const handleAddSkill = async (skill) => {
    if (skill === "") {
      setError("Please enter a valid skill!");
      return false;
    }
    setError(undefined);
    if (skill && skill.trim() !== "" && skills.length < 10) {
      const newSkill = skill.trim();
      const updatedSkills = [...skills, newSkill];
      try {
        const token = Cookies.get("token");
        // POST updated skills array to backend.
        await axios.post("http://localhost:3001/resume/skills", 
          { skills: updatedSkills },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        toast.success("Skill added successfully!", ToastTheme);
        setSkills(updatedSkills);
        setCurrentSkill("");
        setInputValue("");
      } catch (err) {
        console.error("Error adding skill:", err);
        toast.error("Failed to add skill", ToastTheme);
      }
    } else if (skills.length >= 10) {
      toast.error("You can add a maximum of 10 skills!", ToastTheme);
    } else {
      toast.error("Please enter a valid skill!", ToastTheme);
    }
    return true;
  };

  // Delete a skill by index.
  const handleDeleteSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    try {
      const token = Cookies.get("token");
      await axios.post("http://localhost:3001/resume/skills", 
        { skills: updatedSkills },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Skill deleted successfully!", ToastTheme);
      setSkills(updatedSkills);
    } catch (err) {
      console.error("Error deleting skill:", err);
      toast.error("Failed to delete skill", ToastTheme);
    }
  };

  const handleNext = () => {
    setCurrentStep("Achievements");
  };

  if (currentStep === "Projects") {
    return <Projects />;
  }
  if (currentStep === "Achievements") {
    return <Achievements />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }

  return (
    <div className="mt-8">
      <ProgressBar step="Skills" />
      <Box className="mt-8 mb-8 max-w-4xl mx-auto">
        <BuildIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Skills</h1>
        <Autocomplete
          freeSolo
          options={popularSkills}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Skill"
              fullWidth
              error={!!error}
              helperText={error}
            />
          )}
          value={currentSkill}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleAddSkill(newValue);
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleAddSkill(inputValue);
          }}
          sx={{ mt: 2 }}
        >
          Add Skill
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
          {skills.map((skill, index) => (
            <Chip key={index} label={skill} onDelete={() => handleDeleteSkill(index)} />
          ))}
        </Box>
      </Box>

      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Projects")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        {fromReview && (
          <button
            onClick={() => setCurrentStep("Review")}
            className="py-3 px-8 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 hover:scale-105 shadow-md transition-transform transform-gpu"
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
  );
}
