import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, List, ListItem, 
  ListItemText, IconButton, Typography 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Custom from "./Custom";
import Review from "./Review";
import ProgressBar from "../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../utils/Axios/BackendRequest";

export default function ExtraCurricular({ fromReview }) {
  const [currentActivity, setCurrentActivity] = useState({
    activityName: "",
    description: "",
    achievements: "",
  });
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState("ExtraCurricular");

  // Fetch extraCurricularActivities on mount.
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = getToken();
        const res = await axios.get(
          "http://localhost:3001/resume/extraCurricularActivities",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Ensure we have an array.
        setActivities(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching activities:", err.response?.data || err.message);
        toast.error("Failed to fetch activities", ToastTheme);
      }
    };
    fetchActivities();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = async () => {
    const trimmedActivityName = currentActivity.activityName.trim();
    const trimmedAchievements = currentActivity.achievements.trim();
    const trimmedDescription = currentActivity.description.trim();

    if (trimmedActivityName === "") {
      setError("Activity Name cannot be empty");
      return;
    }
    setError("");

    // Construct the object as required by your schema.
    // If achievements is empty, fallback to description; if both are empty, use a default value.
   
    const activityToAdd = {
      activityName: trimmedActivityName,
      achievements: trimmedAchievements,
    };

    try {
      const token = getToken();
      const updatedActivities = [...activities, activityToAdd];
      // Send the updated array to the backend.
      await axios.post(
        "http://localhost:3001/resume/extraCurricularActivities",
        updatedActivities,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setActivities(updatedActivities);
      toast.success("Activity added successfully!", ToastTheme);
      setCurrentActivity({ activityName: "", description: "", achievements: "" });
    } catch (err) {
      console.error("Error adding activity:", err.response?.data || err.message);
      toast.error("Failed to add activity", ToastTheme);
    }
  };

  const handleDeleteActivity = async (index) => {
    try {
      const token = getToken();
      await axios.delete(
        `http://localhost:3001/resume/extraCurricularActivities/${index}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedActivities = activities.filter((_, i) => i !== index);
      setActivities(updatedActivities);
      toast.success("Activity deleted successfully!", ToastTheme);
    } catch (err) {
      console.error("Error deleting activity:", err.response?.data || err.message);
      toast.error("Failed to delete activity", ToastTheme);
    }
  };

  const handleGoBackToPreview = () => {
    setCurrentStep("Review");
  };

  if (currentStep === "Custom") {
    return <Custom />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }

  return (
    <div className="mt-8">
      <ProgressBar step="ExtraCurricularActivities" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8">
        <SportsEsportsIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Extra-Curricular Activities</h1>
        <TextField
          fullWidth
          error={!!error}
          helperText={error}
          label="Activity Name"
          name="activityName"
          value={currentActivity.activityName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description (Optional)"
          name="description"
          multiline
          rows={2}
          value={currentActivity.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Achievements/Recognition (Optional)"
          name="achievements"
          multiline
          rows={2}
          value={currentActivity.achievements}
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
          onClick={handleAddActivity}
        >
          Add Activity
        </Button>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-xl font-bold text-center mb-4 mt-6">Previously Added Activities</h1>
        <List className="mt-8 space-y-4">
          {activities
            .filter((activity) => activity.activityName.trim() !== "")
            .map((activity, index) => (
              <ListItem
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteActivity(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold">
                      {activity.activityName}
                    </Typography>
                  }
                  secondary={
                    <>
                      {activity.description && (
                        <Typography component="span" variant="body2" color="text.primary">
                          {activity.description}
                        </Typography>
                      )}
                      {activity.description && activity.achievements && <br />}
                      {activity.achievements && (
                        <Typography component="span" variant="body2" color="text.secondary">
                          Achievements: {activity.achievements}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4 mb-4">
        <button
          onClick={() => setCurrentStep("Custom")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md mb-4"
        >
          Back
        </button>
        {fromReview && (
          <button
            onClick={handleGoBackToPreview}
            className="py-3 px-8 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 hover:scale-105 shadow-md transition-transform transform-gpu"
          >
            Go Back to Preview
          </button>
        )}
        <button
          onClick={() => setCurrentStep("Review")}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu mb-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}
