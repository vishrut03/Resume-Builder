import React from "react"
import { Box, Typography, Paper, Stack, Divider, List, ListItem, ListItemText, Chip } from "@mui/material"
import useResumeStore from "../app/ResumeStore"

const Resume = () => {
  const resumeData = useResumeStore()

  const Section = ({ title, children }) => (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Divider />
      <Box mt={2}>{children}</Box>
    </Box>
  )

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {resumeData.personalDetails.email} | {resumeData.personalDetails.phoneNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {resumeData.personalDetails.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          LinkedIn: {resumeData.personalDetails.linkedIn}
        </Typography>
      </Box>

      <Section title="Professional Summary">
        <Typography variant="body1">{resumeData.briefDescription}</Typography>
      </Section>

      <Section title="Work Experience">
        {resumeData.workExperience.map((exp, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {exp.jobTitle} at {exp.companyName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {exp.startDate} - {exp.endDate}
            </Typography>
            <Typography variant="body2">{exp.responsibilities}</Typography>
          </Box>
        ))}
      </Section>

      <Section title="Education">
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
      </Section>

      <Section title="Projects">
        {resumeData.projects.map((project, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {project.projectName}
            </Typography>
            <Typography variant="body2">{project.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              Technologies: {project.technologiesUsed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Link: {project.link}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section title="Skills">
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {resumeData.skills.map((skill, index) => (
            <Chip key={index} label={skill} variant="outlined" />
          ))}
        </Stack>
      </Section>

      <Section title="Achievements">
        <List disablePadding>
          {resumeData.achievements.map((achievement, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={achievement} />
            </ListItem>
          ))}
        </List>
      </Section>

      <Section title="Certificates">
        {resumeData.certificates.map((cert, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              {cert.certificateName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Issued by: {cert.organization}, Date: {cert.date}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section title="Coding Profiles">
        {resumeData.codingProfiles.map((profile, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              {profile.platform}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Link: {profile.profileLink}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section title="Extra Curricular Activities">
        {resumeData.extracurricularActivities.map((activity, index) => (
          <Box key={index} mb={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              {activity.activityName}
            </Typography>
            <Typography variant="body2">{activity.achievements}</Typography>
          </Box>
        ))}
      </Section>
    </Paper>
  )
}

export default Resume

