import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Grid2 } from '@mui/material';
import useResumeStore from '../app/ResumeStore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Skills() {

  const [currentSkill, setCurrentSkill] = useState('');
  const skillsStore = useResumeStore((state) => state.skills);
  const addSkillStore = useResumeStore((state) => state.addSkill);
  const deleteSkillStore = useResumeStore((state) => state.deleteSkill);

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '') {
      addSkillStore(currentSkill.trim());
      toast.success("Skill added successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setCurrentSkill('');
    }

    else
    {
      toast.error("Please enter a valid skill!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    deleteSkillStore(skillToDelete);
    toast.success("Skill deleted successfully!", {
      position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
  };

  return (
    <Box>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Add Skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill();
              }
            }}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button variant="contained" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
        {skillsStore.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(index)}
          />
        ))}
      </Box>
    </Box>
  );
}

