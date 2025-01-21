import React from "react"
import { Box, Typography, Paper, Grid2, Divider, List, ListItem, ListItemText } from "@mui/material"
import useResumeStore from "../app/ResumeStore"

const Template4 = () => {
  const resumeData = useResumeStore()

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4, backgroundColor: "#e3f2fd" }}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12}>
          <Typography variant="h2" align="center" gutterBottom color="primary">
            {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary">
            {resumeData.personalDetails.email} | {resumeData.personalDetails.phoneNumber}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary">
            {resumeData.personalDetails.address}
          </Typography>
        </Grid2>
        <Grid2 item xs={12}>
          <Divider />
        </Grid2>
        <Grid2 item xs={12}>
          <Typography variant="h5" gutterBottom color="primary">
            Professional Summary
          </Typography>
          <Typography variant="body1">{resumeData.briefDescription}</Typography>
        </Grid2>
        <Grid2 item xs={12}>
          <Typography variant="h5" gutterBottom color="primary">
            Work Experience
          </Typography>
          <List>
            {resumeData.workExperience.map((exp, index) => (
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
            {resumeData.education.map((edu, index) => (
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
            Skills
          </Typography>
          <Typography variant="body1">{resumeData.skills.join(", ")}</Typography>
        </Grid2>
      </Grid2>
    </Paper>
  )
}

export default Template4

