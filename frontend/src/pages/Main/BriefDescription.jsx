import React, { useEffect, useState } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import useResumeStore from "../../store/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import DescriptionIcon from "@mui/icons-material/Description"
import PersonalDetails from "./PersonalDetails"
import WorkExperience from "./WorkExperience/WorkExperience"
import Review from "./Review" 
import ProgressBar from "../../components/ProgressBar"
import { getDetails, addDetails, getToken } from "../../utils/Axios/BackendRequest"
import axios from "axios"

export default function BriefDescription({ fromReview }) {
  // const briefDescription = useResumeStore((state) => state.resume.briefDescription)
  // const editSimpleField = useResumeStore((state) => state.editSimpleField)

  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState(undefined)
  const [currentStep, setCurrentStep] = useState("BriefDescription")

  useEffect(() => {

    const fetchBriefDesc = async () => {
      try {
        const token = getToken(); // Assuming token is stored in localStorage
        const res = await axios.get("http://localhost:3001/resume/briefDescription", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        setDescription(res.data)
      } catch (error) {
        console.error("Error fetching brief description:", error);
        toast.error("Failed to fetch brief description", ToastTheme);
      }
    };
    fetchBriefDesc();
  }, []);
  

  const handleChange = (event) => {
    setDescription(event.target.value)
  }

  const handleNext = async () => {
    const isValid = await handleSave(1)
    if (isValid) {
      setCurrentStep("WorkExperience")
    }
  }

  const handleSave = async (id) => {
    console.log(description)
    if (description.trim() === "") {
      setErrors("Description cannot be empty")
      return false
    } else if (description.length > 500) {
      setErrors("Description cannot exceed 500 characters")
      return false
    } else if (description.length < 10) {
      setErrors("Description should be at least 10 characters long")
      return false
    }
    setErrors(undefined)
    addDetails("briefDescription", {description:description});
    // editSimpleField("briefDescription", description)
    if(id!==1) toast.success("Description saved!", ToastTheme)
    return true
  }

  if (currentStep === "PersonalDetails") {
    return <PersonalDetails />
  }
  if (currentStep === "WorkExperience") {
    return <WorkExperience />
  }
  if (currentStep === "Review") {
    return <Review />
  }

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <ProgressBar step="BriefDescription" />
      <Box className="max-w-xl w-full p-6 space-y-6 bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-center items-center mb-4">
          <DescriptionIcon className="mr-2" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Brief Description
          </Typography>
        </div>

        <TextField
          fullWidth
          required
          label="Brief Description"
          error={errors !== undefined}
          helperText={errors}
          multiline
          rows={4}
          value={description}
          onChange={handleChange}
          placeholder="Motivated software engineer with a passion for developing scalable solutions."
        />

        <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
          Save Description
        </Button>

        <Typography variant="caption" color="textSecondary" className="text-center block">
          Ensure your description is clear and concise.
        </Typography>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("PersonalDetails")}
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
  )
}
