import React, { useState } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import useResumeStore from "../../../app/ResumeStore"
import ProjectEntry from "./ProjectEntry"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../../utils/ToastTheme"
import { ProjectSchema } from "../../../schemas/ProjectSchema"
import CodeIcon from "@mui/icons-material/Code";

export default function Projects() {
  const projectsStore = useResumeStore((state) => state.resume.projects)
  const addResumeEntry = useResumeStore((state) => state.addResumeEntry)
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    description: "",
    technologiesUsed: "",
    link: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setCurrentProject({
      ...currentProject,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddProject = async () => {
    try {
      await ProjectSchema.validate(currentProject, { abortEarly: false })
      setErrors({})
      addResumeEntry("projects", { ...currentProject })
      toast.success("Project added successfully!", ToastTheme)
      setCurrentProject({
        projectName: "",
        description: "",
        technologiesUsed: "",
        link: "",
      })
    } catch (err) {
      const newErrors = {}
      if (err.inner !== undefined) {
        err.inner.forEach((e) => {
          if (newErrors[e.path] === undefined) newErrors[e.path] = e.message
        })
      }
      setErrors(newErrors)
    }
  }

  return (
    <>
    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
      <CodeIcon/>
      <h1 className="text-2xl font-bold text-center mb-4">Projects</h1>
      <TextField
        fullWidth
        error={!!errors.projectName}
        helperText={errors.projectName}
        label="Project Name*"
        name="projectName"
        value={currentProject.projectName}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        error={!!errors.description}
        helperText={errors.description}
        label="Description*"
        name="description"
        multiline
        rows={3}
        value={currentProject.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        error={!!errors.technologiesUsed}
        helperText={errors.technologiesUsed}
        label="Technologies Used"
        name="technologiesUsed"
        value={currentProject.technologiesUsed}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        error={!!errors.link}
        helperText={errors.link}
        label="Link (GitHub/Deployed)*"
        name="link"
        value={currentProject.link}
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
        onClick={handleAddProject}
      >
        Add Project
      </Button>
    </Box>

    <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-xl font-bold text-center mb-4">Previosuly added projects</h1>
        {projectsStore
          .filter((project) => project.projectName && project.link)
          .map((project, index) => (
            <ProjectEntry key={`${project.projectName}-${project.link}-${index}`} project={project} index={index} />
          ))}
    </Box>
    </>
  )
}

