import React, { useState } from "react"
import { Box, Typography, Paper, Grid2, List, ListItem, ListItemText, Button, Chip } from "@mui/material"
import useResumeStore from "../app/ResumeStore"
import Resume from "./Resume";

export default function Review() {
  const resumeData = useResumeStore()

  const Section = ({ title, children }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  )

  const handleSubmit = () => {
    console.log("Submitting resume data:", resumeData)
  }

  return ( 
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume Review
      </Typography>

      <Section title="Personal Details">
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Name:</strong> {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Phone:</strong> {resumeData.personalDetails.phoneNumber}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Email:</strong> {resumeData.personalDetails.email}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>LinkedIn:</strong> {resumeData.personalDetails.linkedIn}
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography>
              <strong>Address:</strong> {resumeData.personalDetails.address}
            </Typography>
          </Grid2>
        </Grid2>
      </Section>

      <Section title="Brief Description">
        <Typography>{resumeData.briefDescription}</Typography>
      </Section>

      <Section title="Work Experience">
        {resumeData.workExperience.map((exp, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">
              {exp.jobTitle} at {exp.companyName}
            </Typography>
            <Typography variant="body2">
              {exp.startDate} - {exp.endDate}
            </Typography>
            <Typography variant="body2">{exp.responsibilities}</Typography>
          </Box>
        ))}
      </Section>

      <Section title="Education">
        {resumeData.education.map((edu, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">
              {edu.degreeName} from {edu.institutionName}
            </Typography>
            <Typography variant="body2">Graduated: {edu.yearOfGraduation}</Typography>
            <Typography variant="body2">CGPA: {edu.cgpa}</Typography>
          </Box>
        ))}
      </Section>

      <Section title="Projects">
        {resumeData.projects.map((project, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">{project.projectName}</Typography>
            <Typography variant="body2">{project.description}</Typography>
            <Typography variant="body2">Technologies: {project.technologiesUsed}</Typography>
            <Typography variant="body2">Link: {project.link}</Typography>
          </Box>
        ))}
      </Section>

      <Section title="Skills">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {resumeData.skills.map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
        </Box>
      </Section>

      <Section title="Achievements">
        <List>
          {resumeData.achievements.map((achievement, index) => (
            <ListItem key={index}>
              <ListItemText primary={achievement} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Certificates">
        {resumeData.certificates.map((cert, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2">{cert.certificateName}</Typography>
            <Typography variant="body2">
              Issued by: {cert.organization}, Date: {cert.date}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section title="Coding Profiles">
        {resumeData.codingProfiles.map((profile, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2">{profile.platform}</Typography>
            <Typography variant="body2">Link: {profile.profileLink}</Typography>
          </Box>
        ))}
      </Section>

      <Section title="Extra Curricular Activities">
        {resumeData.extracurricularActivities.map((activity, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2">{activity.activityName}</Typography>
            <Typography variant="body2">{activity.achievements}</Typography>
          </Box>
        ))}
      </Section>
    </Box>
  )
}

