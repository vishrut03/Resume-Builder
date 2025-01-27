import React, { useState, useEffect } from "react"
import { TextField, Button, Box, Typography } from "@mui/material"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import CategoryIcon from "@mui/icons-material/Category"
import CodingProfiles from "./CodingProfiles"
import ExtraCurricular from "./ExtraCurricular"
import Review from "./Review" 
import ProgressBar from "../../components/ProgressBar"

const Custom = ({ fromReview }) => {
  const customDetails = useResumeStore((state) => state.resume.customDetails)
  const editObjectField = useResumeStore((state) => state.editObjectField)
  const [headingError, setHeadingError] = useState("")
  const [descError, setDescError] = useState("")
  const [currentStep, setCurrentStep] = useState("Custom")
  const customFields = {
    heading: "",
    description: "",
  }

  const [customSection, setCustomSection] = useState(customFields)

  useEffect(() => {
    setCustomSection(customDetails)
  }, [customDetails])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomSection({ ...customSection, [name]: value })
  }

  const handleSave = () => {
    const { heading, description } = customSection
    let hasError = false

    if (heading.trim() === "") {
      setHeadingError("Heading cannot be empty")
      hasError = true
    } else {
      setHeadingError("")
    }

    if (description.trim() === "") {
      setDescError("Description cannot be empty")
      hasError = true
    } else {
      setDescError("")
    }

    if (hasError) return

    setDescError("")
    setHeadingError("")
    const modifiedObject = { heading, description }
    editObjectField("customDetails", modifiedObject)
    toast.success("Custom section details saved successfully!", ToastTheme)
  }

  if (currentStep === "CodingProfiles") {
    return <CodingProfiles />
  }
  if (currentStep === "ExtraCurricular") {
    return <ExtraCurricular />
  }
  if (currentStep === "Review") {
    return <Review />
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
            onClick={handleGoBackToPreview}
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
  )
}

export default Custom

