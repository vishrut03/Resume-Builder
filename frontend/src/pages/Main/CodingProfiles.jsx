import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastTheme from "../../utils/ToastTheme";
import ComputerIcon from "@mui/icons-material/Computer";
import Certificates from "./Certificates";
import Custom from "./Custom";
import Review from "./Review";
import ProgressBar from "../../components/ProgressBar";
import axios from "axios";
import { getToken } from "../../utils/Axios/BackendRequest";

export default function CodingProfiles({ fromReview }) {
  const [currentProfile, setCurrentProfile] = useState({
    platform: "",
    profileLink: "",
  });
  const [codingProfiles, setCodingProfiles] = useState([]);
  const [platformError, setPlatformError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [currentStep, setCurrentStep] = useState("CodingProfiles");

  // Fetch coding profiles on mount.
  useEffect(() => {
    const fetchCodingProfiles = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:3001/resume/codingProfiles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCodingProfiles(res.data || []);
      } catch (error) {
        console.error("Error fetching coding profiles:", error.response?.data || error.message);
        toast.error("Failed to fetch coding profiles", ToastTheme);
      }
    };
    fetchCodingProfiles();
  }, []);

  const handleChange = (event) => {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProfile = async () => {
    if (currentProfile.platform.trim() === "") {
      setPlatformError("Platform cannot be empty");
      return;
    } else {
      setPlatformError("");
    }
    if (currentProfile.profileLink.trim() === "") {
      setLinkError("Profile link cannot be empty");
      return;
    } else {
      setLinkError("");
    }
    try {
      const token = getToken();
      const updatedProfiles = [...codingProfiles, currentProfile];
      await axios.post("http://localhost:3001/resume/codingProfiles", updatedProfiles, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCodingProfiles(updatedProfiles);
      toast.success("Coding Profile added successfully!", ToastTheme);
      setCurrentProfile({
        platform: "",
        profileLink: "",
      });
    } catch (error) {
      console.error("Error adding coding profile:", error.response?.data || error.message);
      toast.error("Failed to add coding profile", ToastTheme);
    }
  };

  const handleDeleteProfile = async (index) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:3001/resume/codingProfiles/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedProfiles = codingProfiles.filter((_, i) => i !== index);
      setCodingProfiles(updatedProfiles);
      toast.success("Coding Profile deleted successfully!", ToastTheme);
    } catch (error) {
      console.error("Error deleting coding profile:", error.response?.data || error.message);
      toast.error("Failed to delete coding profile", ToastTheme);
    }
  };

  if (currentStep === "Certificates") {
    return <Certificates />;
  }
  if (currentStep === "Custom") {
    return <Custom />;
  }
  if (currentStep === "Review") {
    return <Review />;
  }

  return (
    <div className="mt-8">
      <ProgressBar step="CodingProfiles" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8 mb-8">
        <ComputerIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Coding Profiles</h1>
        <TextField
          fullWidth
          error={!!platformError}
          helperText={platformError}
          label="Platform (e.g., LeetCode, GitHub)*"
          name="platform"
          value={currentProfile.platform}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!linkError}
          helperText={linkError}
          label="Profile Link"
          name="profileLink"
          value={currentProfile.profileLink}
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
          onClick={handleAddProfile}
        >
          Add Profile
        </Button>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-xl font-bold text-center mb-4 mt-6">Previously added coding profiles</h1>
        <List className="mt-8 space-y-4">
          {codingProfiles
            .filter((profile) => profile.platform.trim() !== "" && profile.profileLink.trim() !== "")
            .map((profile, index) => (
              <ListItem
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProfile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold">
                      {profile.platform}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      Link: {profile.profileLink}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Certificates")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md mb-4"
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
          onClick={() => (fromReview ? setCurrentStep("Review") : setCurrentStep("Custom"))}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu mb-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}
