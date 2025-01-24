import React from 'react';
import { Box, Typography, Paper, Grid2, Button } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import html2pdf from 'html2pdf.js';
import useResumeStore from '../../app/ResumeStore';

const Template4 = () => {
  const handleDownload = () => {
    const element = document.getElementById("template4");
    html2pdf(element);
  };

  const data = useResumeStore().resume;

  return (
    <>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDownload} 
        endIcon={<DownloadForOfflineIcon />}
        sx={{ mb: 2 }}
      >
        Download
      </Button>

      <Paper 
        id="template4" 
        elevation={3} 
        sx={{ 
          maxWidth: 1200, 
          mx: 'auto',
          overflow: 'hidden'
        }}
      >
        <Grid2 container>
          {/* Left Sidebar */}
          <Grid2 
            item 
            xs={12} 
            md={3.5} 
            sx={{ 
              bgcolor: '#1a237e',
              color: 'white',
              p: 4,
              minHeight: '100vh'
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {data.personalDetails.firstName}
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {data.personalDetails.lastName}
              </Typography>
              <Box 
                sx={{ 
                  width: '40px', 
                  height: '4px', 
                  bgcolor: 'white',
                  mx: 'auto',
                  mb: 3
                }} 
              />
              <Typography variant="h6" sx={{ mb: 3 }}>
                {data.briefDescription}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  borderBottom: '2px solid white',
                  pb: 1,
                  mb: 2
                }}
              >
                CONTACT
              </Typography>
              <Typography sx={{ mb: 1 }}>{data.personalDetails.email}</Typography>
              <Typography sx={{ mb: 1 }}>{data.personalDetails.phoneNumber}</Typography>
              <Typography sx={{ mb: 1 }}>{data.personalDetails.address}</Typography>
              <Typography>{data.personalDetails.linkedIn}</Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  borderBottom: '2px solid white',
                  pb: 1,
                  mb: 2
                }}
              >
                SKILLS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {data.skills.map((skill, index) => (
                  <Box 
                    key={index}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      p: 1,
                      borderRadius: 1
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  borderBottom: '2px solid white',
                  pb: 1,
                  mb: 2
                }}
              >
                EDUCATION
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.degreeName}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {edu.institutionName}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {edu.yearOfGraduation} | CGPA: {edu.cgpa}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid2>

          {/* Right Content Area */}
          <Grid2 item xs={12} md={8.5} sx={{ p: 4 }}>
            {/* Work Experience */}
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                  pb: 1,
                  mb: 3
                }}
              >
                WORK EXPERIENCE
              </Typography>
              {data.workExperience.map((exp, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 4,
                    position: 'relative',
                    pl: 4,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      bgcolor: '#1a237e'
                    }
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {exp.jobTitle}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {exp.companyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {exp.startDate} - {exp.endDate}
                  </Typography>
                  <Typography variant="body1">
                    {exp.responsibilities}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Projects */}
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                  pb: 1,
                  mb: 3
                }}
              >
                PROJECTS
              </Typography>
              {data.projects.map((project, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 3,
                    position: 'relative',
                    pl: 4,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      bgcolor: '#1a237e'
                    }
                  }}
                >
                  <Typography variant="h6">
                    {project.projectName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {project.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Technologies: {project.technologiesUsed}
                  </Typography>
                  {project.link && (
                    <Typography variant="body2" color="primary">
                      Link: {project.link}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            {/* Achievements */}
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                  pb: 1,
                  mb: 3
                }}
              >
                ACHIEVEMENTS
              </Typography>
              <Box 
                component="ul" 
                sx={{ 
                  pl: 4,
                  '& li': {
                    mb: 1
                  }
                }}
              >
                {data.achievements.map((achievement, index) => (
                  <Box component="li" key={index}>
                    <Typography variant="body1">
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Certificates */}
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#1a237e',
                  borderBottom: '2px solid #1a237e',
                  pb: 1,
                  mb: 3
                }}
              >
                CERTIFICATES
              </Typography>
              {data.certificates.map((cert, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2,
                    position: 'relative',
                    pl: 4,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      bgcolor: '#1a237e'
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {cert.certificateName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cert.organization} - {cert.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default Template4;