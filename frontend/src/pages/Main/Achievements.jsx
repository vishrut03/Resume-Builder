import React, { useState, useEffect } from "react"
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import Certificates from "./Certificates"
import Skills from "./Skills"
import Review from "./Review"

export default function Achievements({ fromReview }) {
  const [currentAchievement, setCurrentAchievement] = useState("")
  const achievementsStore = useResumeStore((state) => state.resume.achievements) || []
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry)
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry)
  const [error, setError] = useState(undefined)
  const [currentStep, setCurrentStep] = useState("Achievements")
  const handleAddAchievement = () => {
    if (currentAchievement === "") {
      setError("Please enter a valid skill!")
      return
    }
    setError(undefined)
    if (currentAchievement.trim() !== "") {
      addResumeEntry("achievements", currentAchievement.trim())
      toast.success("Achievement added successfully!", ToastTheme)
      setCurrentAchievement("")
    } else {
      toast.error("Please enter a valid achievement!", ToastTheme)
    }
  }

  const handleDeleteAchievement = (index) => {
    deleteResumeEntry("achievements", index)
    toast.success("Achievement deleted successfully!", ToastTheme)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddAchievement()
    }
  }

  if (currentStep === "Skills") {
    return <Skills />
  }
  if (currentStep === "Certificates") {
    return <Certificates />
  }
  if (currentStep === "Review") {
    return <Review />
  }
  return (
    <>
      <Box>
        <EmojiEventsIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Achievements</h1>
        <TextField
          fullWidth
          label="Add Achievement"
          error={error === undefined ? false : true}
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
          {achievementsStore
            .filter((achievement) => achievement && achievement.trim()) // Filter out empty or falsy achievements
            .map((achievement, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAchievement(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={achievement.achievement || achievement} /> {/* Access the correct field */}
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
        <button
          onClick={() => (fromReview ? setCurrentStep("Review") : setCurrentStep("Certificates"))}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </>
  )
}

