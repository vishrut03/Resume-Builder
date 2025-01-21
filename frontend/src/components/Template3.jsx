import React from "react"
import { Box, Typography, Paper, Grid2, Divider, Chip } from "@mui/material"
import useResumeStore from "../app/ResumeStore"

const Template3 = () => {
  const resumeData = useResumeStore()

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4, backgroundColor: "#e8f5e9" }}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <Typography variant="h3" gutterBottom color="primary">
            {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {resumeData.personalDetails.email} | {resumeData.personalDetails.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {resumeData.personalDetails.address}
          </Typography>
        </Grid2>
        <Grid2 item xs={12}>
          <Divider />
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="primary">
            Professional Summary
          </Typography>
          <Typography variant="body1">{resumeData.briefDescription}</Typography>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Typography variant="h6" gutterBottom color="primary">
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {resumeData.skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" variant="outlined" />
            ))}
          </Box>
        </Grid2>
        <Grid2 item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Work Experience
          </Typography>
          {resumeData.workExperience.map((exp, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.jobTitle} - {exp.companyName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.startDate} - {exp.endDate}
              </Typography>
              <Typography variant="body2">{exp.responsibilities}</Typography>
            </Box>
          ))}
        </Grid2>
        <Grid2 item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Education
          </Typography>
          {resumeData.education.map((edu, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.degreeName} - {edu.institutionName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Graduated: {edu.yearOfGraduation} | CGPA: {edu.cgpa}
              </Typography>
            </Box>
          ))}
        </Grid2>
      </Grid2>
    </Paper>
  )
}

export default Template3

