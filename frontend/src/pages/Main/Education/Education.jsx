import React, { useState } from "react"
import { Box, TextField, Button } from "@mui/material"
import EducationEntry from "./EducationEntry"
import useResumeStore from "../../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../../utils/ToastTheme"
import { EducationSchema } from "../../../schemas/EducationSchema"

export default function Education() {
  const education = useResumeStore((state) => state.resume.education)
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry)

  const [newEducation, setNewEducation] = useState({
    degreeName: "",
    institutionName: "",
    yearOfGraduation: "",
    cgpa: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setNewEducation({
      ...newEducation,
      [event.target.name]: event.target.value,
    })
  }

  const handleAdd = async () => {
    try {
      await EducationSchema.validate(newEducation, { abortEarly: false })
      setErrors({})
      addResumeEntry("education", { ...newEducation })
      toast.success("Education details added successfully!", ToastTheme)
      setNewEducation({ degreeName: "", institutionName: "", yearOfGraduation: "", cgpa: "" })
    } catch (err) {
      const newErrors = {}
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message
        })
      }
      console.log(newErrors)
      setErrors(newErrors)
    }
  }

  return (
    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Education</h1>
      <TextField
        required
        fullWidth
        error={!!errors.degreeName}
        helperText={errors.degreeName}
        label="Degree Name"
        name="degreeName"
        value={newEducation.degreeName}
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        error={!!errors.institutionName}
        helperText={errors.institutionName}
        label="Institution Name"
        name="institutionName"
        type="text"
        value={newEducation.institutionName}
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        error={!!errors.yearOfGraduation}
        helperText={errors.yearOfGraduation}
        label="Year of Graduation"
        name="yearOfGraduation"
        type="number"
        value={newEducation.yearOfGraduation}
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        error={!!errors.cgpa}
        helperText={errors.cgpa}
        label="CGPA/Percentage"
        name="cgpa"
        type="number"
        value={newEducation.cgpa}
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
        onClick={handleAdd}
      >
        Add Education
      </Button>

      <h1 className="text-xl font-bold text-center mb-4">Previously added Education Details</h1>

      <Box className="mt-8 space-y-6">
        {education
          .filter((edu) => edu.degreeName && edu.institutionName && edu.yearOfGraduation && edu.cgpa)
          .map((edu, index) => (
            <EducationEntry key={`${edu.degreeName}-${edu.institutionName}-${index}`} index={index} education={edu} />
          ))}
      </Box>
    </Box>
  )
}

