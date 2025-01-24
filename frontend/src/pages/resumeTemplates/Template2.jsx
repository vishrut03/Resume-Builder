import React from 'react';
import { Box, Typography, Paper, Grid2, Divider, Button, Chip, List, ListItem, ListItemText } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import html2pdf from 'html2pdf.js';
import useResumeStore from '../../app/ResumeStore';

const Template2 = () => {
  const handleDownload = () => {
    const element = document.getElementById("template2");
    html2pdf(element);
  };
  const data=useResumeStore().resume;
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload} endIcon={<DownloadForOfflineIcon />}>
        Download
      </Button>
      <Paper id="template2" elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4, backgroundColor: "#f5f5f5" }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12}>
            <Typography variant="h3" align="center" gutterBottom>
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
            <Divider />
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom>
              Professional Summary
            </Typography>
            <Typography variant="body1">{data.briefDescription}</Typography>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {data.skills.map((skill, index) => (
                <Chip key={index} label={skill} variant="outlined" />
              ))}
            </Box>
          </Grid2>
          <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
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
            <Typography variant="h6" gutterBottom>
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
  );
};

export default Template2;