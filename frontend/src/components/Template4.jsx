import React from "react"
import { Box, Typography, Paper, Grid2, Divider, List, ListItem, ListItemText, Button, Chip } from "@mui/material"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import html2pdf from "html2pdf.js"

const Template4 = ({ data }) => {
  const handleDownload = () => {
    const element = document.getElementById("template4")
    html2pdf(element)
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload} endIcon={<DownloadForOfflineIcon />}>
        Download
      </Button>
      <Paper id="template4" elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4, backgroundColor: "#e3f2fd" }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Typography variant="h2" align="center" gutterBottom color="primary">
              {data.personalDetails.firstName} {data.personalDetails.lastName}
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary">
              {data.personalDetails.email} | {data.personalDetails.phoneNumber}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              {data.personalDetails.address}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              LinkedIn: {data.personalDetails.linkedIn}
            </Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Professional Summary
            </Typography>
            <Typography variant="body1">{data.briefDescription}</Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Work Experience
            </Typography>
            <List>
              {data.workExperience.map((exp, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={`${exp.jobTitle} at ${exp.companyName}`}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          {exp.startDate} - {exp.endDate}
                        </Typography>
                        {` — ${exp.responsibilities}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Education
            </Typography>
            <List>
              {data.education.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${edu.degreeName} - ${edu.institutionName}`}
                    secondary={`Graduated: ${edu.yearOfGraduation} | CGPA: ${edu.cgpa}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Projects
            </Typography>
            <List>
              {data.projects.map((project, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={project.projectName}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2">{project.description}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Technologies: {project.technologiesUsed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Link: {project.link}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {data.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" variant="outlined" />
              ))}
            </Box>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
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
            <Typography variant="h5" gutterBottom color="primary">
              Certificates
            </Typography>
            <List>
              {data.certificates.map((cert, index) => (
                <ListItem key={index}>
                  <ListItemText primary={cert.certificateName} secondary={`${cert.organization} - ${cert.date}`} />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Coding Profiles
            </Typography>
            <List>
              {data.codingProfiles.map((profile, index) => (
                <ListItem key={index}>
                  <ListItemText primary={profile.platform} secondary={profile.profileLink} />
                </ListItem>
              ))}
            </List>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h5" gutterBottom color="primary">
              Extra Curricular Activities
            </Typography>
            <List>
              {data.extracurricularActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={activity.activityName}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2">{activity.description}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Achievements: {activity.achievements}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  )
}

export default Template4

