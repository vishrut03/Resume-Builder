import React, { useState, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Certificates from "./Certificates";
import Skills from "./Skills";
import Review from "./Review";
import ProgressBar from "../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../utils/Axios/BackendRequest";

export default function Achievements({ fromReview }) {
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState(undefined);
  const [currentStep, setCurrentStep] = useState("Achievements");

  // Fetch achievements on mount.
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/achievements", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Expect the GET endpoint to return an array of achievements.
        setAchievements(res.data || []);
      } catch (err) {
        console.error("Error fetching achievements:", err.response?.data || err.message);
        toast.error("Failed to fetch achievements", ToastTheme);
      }
    };
    fetchAchievements();
  }, []);

  const handleAddAchievement = async () => {
    if (currentAchievement === "") {
      setError("Please enter a valid achievement!");
      return;
    }
    setError(undefined);
    if (currentAchievement.trim() !== "") {
      // Create the updated achievements array.
      const updatedAchievements = [...achievements, currentAchievement.trim()];
      try {
        const token = getToken();
        // POST the updated achievements array to update the resume.
        await axios.post("http://localhost:3001/resume/achievements", updatedAchievements, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAchievements(updatedAchievements);
        toast.success("Achievement added successfully!", ToastTheme);
        setCurrentAchievement("");
      } catch (err) {
        console.error("Error adding achievement:", err.response?.data || err.message);
        toast.error("Failed to add achievement", ToastTheme);
      }
    } else {
      toast.error("Please enter a valid achievement!", ToastTheme);
    }
  };

  const handleDeleteAchievement = async (index) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/resume/achievements/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted achievement from local state.
      const updatedAchievements = achievements.filter((_, i) => i !== index);
      setAchievements(updatedAchievements);
      toast.success("Achievement deleted successfully!", ToastTheme);
    } catch (err) {
      console.error("Error deleting achievement:", err.response?.data || err.message);
      toast.error("Failed to delete achievement", ToastTheme);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddAchievement();
    }
  };

  if (currentStep === "Skills") {
    return <Skills />;
  }
  if (currentStep === "Certificates") {
    return <Certificates />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }
  return (
    <div className="mt-8">
      <ProgressBar step="Achievements" />
      <Box className="mt-8 mb-8 max-w-4xl mx-auto">
        <EmojiEventsIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Achievements</h1>
        <TextField
          fullWidth
          label="Add Achievement"
          error={!!error}
          helperText={error}
          value={currentAchievement}
          onChange={(e) => setCurrentAchievement(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddAchievement}>
          Add Achievement
        </Button>
        <List sx={{ mt: 2 }}>
          {achievements
            .filter((achievement) => achievement && achievement.trim())
            .map((achievement, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAchievement(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
        </List>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Skills")}
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
          onClick={() => (fromReview ? setCurrentStep("Review") : setCurrentStep("Certificates"))}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </div>
  );
}
