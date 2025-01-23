import React, { useState } from "react"
import { Box, Button, Chip, Autocomplete, TextField } from "@mui/material"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import popularSkills from "../../utils/popularSkills"

export default function Skills() {
  const [currentSkill, setCurrentSkill] = useState("")
  const [inputValue, setInputValue] = useState("")
  const skillsStore = useResumeStore((state) => state.resume.skills)
  const addSkillStore = useResumeStore((state) => state.addResumeEntry)
  const deleteSkillStore = useResumeStore((state) => state.deleteResumeEntry)
  const [error, setError] = useState(undefined);

  const handleAddSkill = (skill) => {
    // console.log(skill);
    if(skill===""){
      setError("Please enter a valid skill!")
      return;
    }
    setError(undefined);
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
  }

  const handleDeleteSkill = (index) => {
    deleteSkillStore("skills", index)
    toast.success("Skill deleted successfully!", ToastTheme)
  }

  return (
    <Box>
      <h1 className="text-2xl font-bold text-center mb-4">Skills</h1>
      <Autocomplete
        freeSolo
        options={popularSkills}
        renderInput={(params) => <TextField {...params} label="Add Skill" fullWidth error={error===undefined?false:true} helperText={error}/>}
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
  )
}

