"use client"

import { useEffect, useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import useResumeStore from "../../store/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import { PersonalDetailsSchema } from "../../schemas/PersonalDetailsSchema"
import PersonIcon from "@mui/icons-material/Person"
import BriefDescription from "./BriefDescription"
import Review from "./Review"
import Home from "./Home"
import ProgressBar from "../../components/ProgressBar"
import { addDetails, getDetails } from "../../utils/Axios/BackendRequest"

export default function PersonalDetails({ fromReview }) {
  const editSimpleField = useResumeStore((state) => state.editSimpleField)

  const [errors, setErrors] = useState({})
  const [localPersonalDetails, setLocalPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    linkedIn: "",
  })
  const [currentStep, setCurrentStep] = useState("PersonalDetails")

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const details = await getDetails("personalDetails")
        if (details) {
          setLocalPersonalDetails(details)
        }
      } catch (error) {
        console.error("Error fetching personal details:", error)
      }
    }

    fetchPersonalDetails()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setLocalPersonalDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    try {
      await PersonalDetailsSchema.validate(localPersonalDetails, { abortEarly: false })
      setErrors({})
      await addDetails("personalDetails", localPersonalDetails)
      if (id !== 1) toast.success("Details saved successfully", ToastTheme)
      return true
    } catch (err) {
      const newErrors = {}
      err.inner.forEach((e) => {
        if (newErrors[e.path] === undefined) newErrors[e.path] = e.message
      })
      setErrors(newErrors)
      return false
    }
  }

  const handleNext = async () => {
    const isValid = await handleSave(1)
    if (isValid) {
      setCurrentStep("BriefDescription")
    } else {
      toast.error("Please fill all required fields correctly", ToastTheme)
    }
  }

  const handleGoBackToReview = () => {
    setCurrentStep("Review")
  }

  if (currentStep === "BriefDescription") {
    return <BriefDescription />
  }

  if (currentStep === "Review") {
    return <Review />
  }
  if (currentStep === "Home") {
    return <Home />
  }
  
  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <ProgressBar step="PersonalDetails" />
      <Box className="max-w-xl w-full p-6 space-y-6 bg-white rounded-lg shadow-md mb-6">
        <div className="flex justify-center items-center mb-4">
          <PersonIcon className="mr-2" />
          <h1 className="text-2xl font-bold text-center">Personal Details</h1>
        </div>
        <TextField
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          label="First Name"
          name="firstName"
          value={localPersonalDetails.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          label="Last Name"
          name="lastName"
          value={localPersonalDetails.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={localPersonalDetails.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          required
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={localPersonalDetails.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          error={!!errors.address}
          helperText={errors.address}
          label="Address"
          name="address"
          value={localPersonalDetails.address}
          onChange={handleChange}
        />
        <TextField
          error={!!errors.linkedIn}
          helperText={errors.linkedIn}
          fullWidth
          label="LinkedIn Profile"
          name="linkedIn"
          value={localPersonalDetails.linkedIn}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
          Save Details
        </Button>
      </Box>
      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Home")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        {fromReview && (
          <button
            onClick={handleGoBackToReview}
            className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105 shadow-md"
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
