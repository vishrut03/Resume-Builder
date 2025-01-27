import React, { useState } from "react"
import { Box, Button, Chip, Autocomplete, TextField } from "@mui/material"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import popularSkills from "../../utils/popularSkills"
import BuildIcon from "@mui/icons-material/Build"
import Projects from "./Project/Projects"
import Achievements from "./Achievements"
import Review from "./Review"
import ProgressBar from "../../components/ProgressBar"

export default function Skills({ fromReview }) {
  const [currentSkill, setCurrentSkill] = useState("")
  const [inputValue, setInputValue] = useState("")
  const skillsStore = useResumeStore((state) => state.resume.skills)
  const addSkillStore = useResumeStore((state) => state.addResumeEntry)
  const deleteSkillStore = useResumeStore((state) => state.deleteResumeEntry)
  const [error, setError] = useState(undefined)
  const [currentStep, setCurrentStep] = useState("Skills")
  const handleAddSkill = (skill) => {
    // console.log(skill);
    if (skill === "") {
      setError("Please enter a valid skill!")
      return false
    }
    setError(undefined)
    if (skill && skill.trim() !== "" && skillsStore.length < 10) {
      addSkillStore("skills", skill.trim())
      toast.success("Skill added successfully!", ToastTheme)
      setCurrentSkill("")
      setInputValue("")
    } else if (skillsStore.length >= 10) {
      toast.error("You can add a maximum of 10 skills!", ToastTheme)
    } else {
      toast.error("Please enter a valid skill!", ToastTheme)
    }
    return true
  }

  const handleDeleteSkill = (index) => {
    deleteSkillStore("skills", index)
    toast.success("Skill deleted successfully!", ToastTheme)
  }
  const handleNext = () => {
      setCurrentStep("Achievements")
  }

  if (currentStep === "Projects") {
    return <Projects />
  }
  if (currentStep === "Achievements") {
    return <Achievements />
  }
  if (currentStep === "Review") {
    return <Review />
  }
  return (
    <div className="mt-8">
      <ProgressBar step="Skills"/>
      <Box className="mt-8 mb-8 max-w-4xl mx-auto">
        <BuildIcon />
        <h1 className="text-2xl font-bold text-center mb-4">Skills</h1>
        <Autocomplete
          freeSolo
          options={popularSkills}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add Skill"
              fullWidth
              error={error === undefined ? false : true}
              helperText={error}
            />
          )}
          value={currentSkill}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          onChange={(event, newValue) => {
            if (newValue) {
              handleAddSkill(newValue)
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            handleAddSkill(inputValue)
          }}
          sx={{ mt: 2 }}
        >
          Add Skill
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
          {skillsStore.map((skill, index) => (
            <Chip key={index} label={skill} onDelete={() => handleDeleteSkill(index)} />
          ))}
        </Box>
      </Box>

      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("Projects")}
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

