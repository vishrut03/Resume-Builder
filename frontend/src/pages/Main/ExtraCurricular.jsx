import React, { useState } from "react"
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import Custom from "./Custom"
import Review from "./Review"

export default function ExtraCurricular({ fromReview }) {
  const [currentActivity, setCurrentActivity] = useState({
    activityName: "",
    description: "",
    achievements: "",
  })

  const extracurricularActivities = useResumeStore((state) => state.resume.extracurricularActivities) || []
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry)
  const deleteResumeEntry = useResumeStore((state) => state.deleteResumeEntry)
  const [error, setError] = useState(undefined)
  const [currentStep, setCurrentStep] = useState("ExtraCurricular")

  const handleChange = (event) => {
    const { name, value } = event.target
    setCurrentActivity((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddActivity = () => {
    if (currentActivity.activityName.trim() === "") {
      setError("Activity Name cannot be empty")
      return
    }
    setError(undefined)
    addResumeEntry("extracurricularActivities", currentActivity)
    toast.success("Activity added successfully!", ToastTheme)
    setCurrentActivity({
      activityName: "",
      description: "",
      achievements: "",
    })
  }

  const handleDeleteActivity = (index) => {
    deleteResumeEntry("extracurricularActivities", index)
    toast.success("Activity deleted successfully!", ToastTheme)
  }

  if (currentStep === "Custom") {
    return <Custom />
  }
  if(currentStep === "Review") {
    return <Review />
  }
  return (
    <>
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
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
          {extracurricularActivities
            .filter((activity) => activity.activityName.trim() !== "")
            .map((activity, index) => (
              <ListItem
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteActivity(index)}>
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
                      <br />
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
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Custom")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep("Review")}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </>
  )
}

