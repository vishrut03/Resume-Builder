import React, { useState } from "react"
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import useResumeStore from "../../app/ResumeStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ToastTheme from "../../utils/ToastTheme"
import ComputerIcon from "@mui/icons-material/Computer";

export default function CodingProfiles() {
  const [currentProfile, setCurrentProfile] = useState({
    platform: "",
    profileLink: "",
  })

  const codingProfiles = useResumeStore((state) => state.resume.codingProfiles)
  const addCodingProfile = useResumeStore((state) => state.addResumeEntry)
  const deleteCodingProfile = useResumeStore((state) => state.deleteResumeEntry)
  const [platformError, setPlatformError] = useState("")
  const [linkError, setLinkError] = useState("")

  const handleChange = (event) => {
    setCurrentProfile({
      ...currentProfile,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddProfile = () => {
    if (currentProfile.platform.trim() === "") {
      if (currentProfile.profileLink.trim() !== "") setLinkError("")
      setPlatformError("Platform cannot be empty")
      return
    }
    if (currentProfile.profileLink.trim() === "") {
      if (currentProfile.platform.trim() !== "") setPlatformError("")
      setLinkError("Profile link cannot be empty")
      return
    }
    if (currentProfile.platform.trim() !== "" && currentProfile.profileLink.trim() !== "") {
      setLinkError("")
      setPlatformError("")
      addCodingProfile("codingProfiles", currentProfile)
      toast.success("Coding Profile added successfully!", ToastTheme)
      setCurrentProfile({
        platform: "",
        profileLink: "",
      })
    }
  }

  const handleDeleteProfile = (index) => {
    deleteCodingProfile("codingProfiles", index)
    toast.success("Coding Profile deleted successfully!", ToastTheme)
  }

  return (
    <>
      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
        <ComputerIcon/>
        <h1 className="text-2xl font-bold text-center mb-4">Coding Profiles</h1>
        <TextField
          fullWidth
          error={!!platformError}
          helperText={platformError}
          label="Platform (e.g., LeetCode, GitHub)*"
          name="platform"
          value={currentProfile.platform}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          error={!!linkError}
          helperText={linkError}
          label="Profile Link"
          name="profileLink"
          value={currentProfile.profileLink}
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
          onClick={handleAddProfile}
        >
          Add Profile
        </Button>
      </Box>

      <Box className="max-w-xl mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-xl font-bold text-center mb-4 mt-6">Previously added coding profiles</h1>
        <List className="mt-8 space-y-4">
          {codingProfiles
            .filter((profile) => profile.platform.trim() !== "" && profile.profileLink.trim() !== "")
            .map((profile, index) => (
              <ListItem
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProfile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold">
                      {profile.platform}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      Link: {profile.profileLink}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  )
}

