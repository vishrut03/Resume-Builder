import React from 'react';
import { Box, Typography, Paper, Stack, Divider, Chip, Button, List, ListItem, ListItemText } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import html2pdf from 'html2pdf.js';
import useResumeStore from '../../app/ResumeStore';

const Template1 = () => {
  const handleDownload = () => {
    const element = document.getElementById("template1");
    html2pdf(element);
  };
  const data=useResumeStore().resume;
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload} endIcon={<DownloadForOfflineIcon />}>
        Download
      </Button>
      <Paper id="template1" elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", my: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>
            {data.personalDetails.firstName} {data.personalDetails.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {data.personalDetails.email} | {data.personalDetails.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.personalDetails.linkedIn}
          </Typography>
        </Box>

        {data.briefDescription && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Professional Summary
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography variant="body1">{data.briefDescription}</Typography>
          </Box>
        </Box>
        )}

        {data.workExperience.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Work Experience
          </Typography>
          <Divider />
          <Box mt={2}>
            {data.workExperience.map((exp, index) => (
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
          </Box>
        </Box>
        )}

        {data.education.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Education
          </Typography>
          <Divider />
          <Box mt={2}>
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
          </Box>
        </Box>
        )}

        {data.projects.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Projects
          </Typography>
          <Divider />
          <Box mt={2}>
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
          </Box>
        </Box>
        )}

        {data.skills.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Skills
          </Typography>
          <Divider />
          <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
            {data.skills.map((skill, index) => (
              <Chip key={index} label={skill} variant="outlined" />
            ))}
          </Stack>
        </Box>
        )}

        {data.achievements.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Achievements
          </Typography>
          <Divider />
          <List>
            {data.achievements.map((achievement, index) => (
              <ListItem key={index}>
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
          </List>
        </Box>
        )}

        {data.certificates.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Certificates
          </Typography>
          <Divider />
          <Box mt={2}>
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
          </Box>
        </Box>
        )}

        {data.codingProfiles.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Coding Profiles
          </Typography>
          <Divider />
          <Box mt={2}>
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
          </Box>
        </Box>
        )}

      {data.customDetails.heading && data.customDetails.description && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
                {data.customDetails.heading}
          </Typography>
          <Divider />
          <Box mt={2}>
            <Typography 
              variant="body2"
              sx={{ whiteSpace: 'pre-line' }} 
            >
              {data.customDetails.description}
            </Typography>
          </Box>
        </Box>
      )}


        {data.extracurricularActivities.length > 0 && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom color="primary">
            Extra Curricular Activities
          </Typography>
          <Divider />
          <Box mt={2}>
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
          </Box>
        </Box>
        )}
      </Paper>
    </>
  );
};

export default Template1;
