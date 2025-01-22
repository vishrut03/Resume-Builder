import React from "react"
import { Box, Typography, Paper, Grid2, Divider, Chip, Button, List, ListItem, ListItemText } from "@mui/material"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import html2pdf from "html2pdf.js"

const Template3 = ({ data }) => {
  const handleDownload = () => {
    const element = document.getElementById("template3")
    html2pdf(element)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload} endIcon={<DownloadForOfflineIcon />}>
        Download
      </Button>
      <Paper id="template3" elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4, backgroundColor: "#e8f5e9" }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Typography variant="h3" gutterBottom color="primary">
              {data.personalDetails.firstName} {data.personalDetails.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.personalDetails.email} | {data.personalDetails.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.personalDetails.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              LinkedIn: {data.personalDetails.linkedIn}
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Divider />
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Professional Summary
            </Typography>
            <Typography variant="body1">{data.briefDescription}</Typography>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {data.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" variant="outlined" />
              ))}
            </Box>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Work Experience
            </Typography>
            {data.workExperience.map((exp, index) => (
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
            {data.education.map((edu, index) => (
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
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Projects
            </Typography>
            {data.projects.map((project, index) => (
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
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Achievements
            </Typography>
            <List>
              {data.achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Certificates
            </Typography>
            {data.certificates.map((cert, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {cert.certificateName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cert.organization} - {cert.date}
                </Typography>
              </Box>
            ))}
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Coding Profiles
            </Typography>
            {data.codingProfiles.map((profile, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {profile.platform}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.profileLink}
                </Typography>
              </Box>
            ))}
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              Extra Curricular Activities
            </Typography>
            {data.extracurricularActivities.map((activity, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {activity.activityName}
                </Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Achievements: {activity.achievements}
                </Typography>
              </Box>
            ))}
          </Grid2>
        </Grid2>
      </Paper>
    </>
  )
}

export default Template3

