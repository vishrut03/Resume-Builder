import React, { useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import useResumeStore from "../../../store/ResumeStore"
import WorkExperienceEntry from "./WorkExperienceEntry"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../../utils/ToastTheme"
import { WorkExperienceSchema } from "../../../schemas/WorkExperienceSchema"
import WorkIcon from "@mui/icons-material/Work"
import BriefDescription from "../BriefDescription"
import Education from "../Education/Education"
import Review from "../Review"
import ProgressBar from '../../../components/ProgressBar'


export default function WorkExperience({ fromReview }) {
  const workExperience = useResumeStore((state) => state.resume.workExperience)
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry)

  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  })

  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState("WorkExperience")

  const handleChange = (event) => {
    setCurrentExperience({
      ...currentExperience,
      [event.target.name]: event.target.value,
    })
  }

  const handleNext = () => {
    setCurrentStep("Education")
  }

  const handleGoBackToReview = () => {
    setCurrentStep("Review")
  }

  const checkOverlap = (newExperience) => {
    return workExperience.some((exp) => {
      const existingStart = new Date(exp.startDate)
      const existingEnd = exp.endDate ? new Date(exp.endDate) : new Date()
      const newStart = new Date(newExperience.startDate)
      const newEnd = newExperience.endDate ? new Date(newExperience.endDate) : new Date()

      return newStart <= existingEnd && newEnd >= existingStart
    })
  }

  const handleSave = async () => {
    try {
      await WorkExperienceSchema.validate(currentExperience, { abortEarly: false })
      if (currentExperience.endDate && currentExperience.startDate > currentExperience.endDate) {
        throw new Error("End date cannot be before start date")
      }
      if (checkOverlap(currentExperience)) {
        throw new Error("Work experience duration overlaps with an existing entry")
      }
      setErrors({})
      addResumeEntry("workExperience", currentExperience)
      setCurrentExperience({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      })
      toast.success("Experience added successfully!", { ...ToastTheme, progress: undefined })
      return true
    } catch (err) {
      const newErrors = {}
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message
        })
      }
      if (
        currentExperience.startDate &&
        currentExperience.endDate &&
        currentExperience.startDate > currentExperience.endDate
      ) {
        newErrors.endDate = "End date cannot be before start date"
      }
      if (err.message === "Work experience duration overlaps with an existing entry") {
        toast.error(err.message, { ...ToastTheme, progress: undefined })
      }
      setErrors(newErrors)
      return false
    }
  }

  if (currentStep === "BriefDescription") {
    return <BriefDescription />
  }
  if (currentStep === "Education") {
    return <Education />
  }
  if (currentStep === "Review") {
    return <Review />
  }

  return (
    <div className="mt-8">
      <ProgressBar step="WorkExperience" />
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-8 mb-8">
        <WorkIcon />
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 2, textAlign: "center" }}>
          Work Experience
        </Typography>
        <Box>
          <TextField
            required
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
            fullWidth
            label="Job Title"
            name="jobTitle"
            value={currentExperience.jobTitle}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>

        <Box>
          <TextField
            required
            error={!!errors.companyName}
            helperText={errors.companyName}
            fullWidth
            label="Company Name"
            name="companyName"
            value={currentExperience.companyName}
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
              value={currentExperience.startDate}
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
              value={currentExperience.endDate}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </Box>
        </Box>
        <Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            error={!!errors.responsibilities}
            helperText={errors.responsibilities}
            label="Responsibilities"
            name="responsibilities"
            value={currentExperience.responsibilities}
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
            onClick={handleSave}
          >
            Add Experience
          </Button>
        </Box>
      </Box>

      <Box mt={4} className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
          Previously Added Work Experiences
        </Typography>
        {workExperience
          .filter((exp) => exp.jobTitle.trim() !== "" && exp.companyName.trim() !== "")
          .map((exp, index) => (
            <WorkExperienceEntry key={`${exp.jobTitle}-${exp.companyName}-${index}`} experience={exp} index={index} />
          ))}
      </Box>

      <div className="w-full max-w-xl mx-auto flex justify-between items-center mt-8 mb-8">
        <button
          onClick={() => setCurrentStep("BriefDescription")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>

        {fromReview && (
          <button
            onClick={handleGoBackToReview}
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
