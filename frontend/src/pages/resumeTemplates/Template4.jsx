import React from 'react';
import { Box, Typography, Paper, Grid2, Button, Link } from '@mui/material';
import { 
  Mail, 
  Phone, 
  LocationOn, 
  LinkedIn, 
  GitHub 
} from '@mui/icons-material';
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

      <Paper id="template4" elevation={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header Section */}
        <Box sx={{ 
          bgcolor: '#1e2a3a', 
          color: 'white', 
          p: 4, 
          position: 'relative' 
        }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} md={8}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {data.personalDetails.firstName} {data.personalDetails.lastName}
              </Typography>
              <Typography variant="h5" sx={{ color: '#94a3b8', mb: 3 }}>
                {data.briefDescription?.split(' ').slice(0, 3).join(' ')}
              </Typography>
              <Typography variant="body1" sx={{ color: '#cbd5e1' }}>
                {data.briefDescription}
              </Typography>
            </Grid2>
            <Grid2 item xs={12} md={4}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5,
                alignItems: { xs: 'flex-start', md: 'flex-end' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail sx={{ color: '#94a3b8' }} />
                  <Typography>{data.personalDetails.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ color: '#94a3b8' }} />
                  <Typography>{data.personalDetails.phoneNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ color: '#94a3b8' }} />
                  <Typography>{data.personalDetails.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinkedIn sx={{ color: '#94a3b8' }} />
                  <Link href={data.personalDetails.linkedIn} color="inherit" underline="hover">
                    LinkedIn
                  </Link>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid2 container spacing={4}>
            {/* Left Column */}
            <Grid2 item xs={12} md={8}>
              {/* Work Experience */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  pb: 1, 
                  borderBottom: '2px solid #1e2a3a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  WORK EXPERIENCE
                </Typography>
                {data.workExperience.map((exp, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mb: 4,
                      pl: 4,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        bgcolor: '#1e2a3a'
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#1e2a3a' }}>
                      {exp.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#64748b', mb: 1 }}>
                      {exp.companyName} | {exp.startDate} - {exp.endDate}
                    </Typography>
                    <Typography variant="body1">
                      {exp.responsibilities}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Projects */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  pb: 1, 
                  borderBottom: '2px solid #1e2a3a' 
                }}>
                  PROJECTS
                </Typography>
                {data.projects.map((project, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      mb: 3,
                      pl: 4,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        bgcolor: '#1e2a3a'
                      }
                    }}
                  >
                    <Typography variant="h6">{project.projectName}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {project.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Technologies: {project.technologiesUsed}
                    </Typography>
                    {project.link && (
                      <Link href={project.link} target="_blank" sx={{ mt: 0.5, display: 'block' }}>
                        View Project
                      </Link>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid2>

            {/* Right Column */}
            <Grid2 item xs={12} md={4}>
              {/* Areas of Expertise */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  pb: 1, 
                  borderBottom: '2px solid #1e2a3a' 
                }}>
                  AREAS OF EXPERTISE
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1 
                }}>
                  {data.skills.map((skill, index) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: '#f1f5f9',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontSize: '0.875rem'
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Education */}
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" sx={{ 
                  mb: 3, 
                  pb: 1, 
                  borderBottom: '2px solid #1e2a3a' 
                }}>
                  EDUCATION
                </Typography>
                {data.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="h6">{edu.degreeName}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#64748b' }}>
                      {edu.institutionName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {edu.yearOfGraduation} | CGPA: {edu.cgpa}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Certificates */}
              {data.certificates.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ 
                    mb: 3, 
                    pb: 1, 
                    borderBottom: '2px solid #1e2a3a' 
                  }}>
                    CERTIFICATES
                  </Typography>
                  {data.certificates.map((cert, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">{cert.certificateName}</Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {cert.organization} - {cert.date}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Achievements */}
              {data.achievements.length > 0 && (
                <Box>
                  <Typography variant="h5" sx={{ 
                    mb: 3, 
                    pb: 1, 
                    borderBottom: '2px solid #1e2a3a' 
                  }}>
                    ACHIEVEMENTS
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {data.achievements.map((achievement, index) => (
                      <Box component="li" key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          {achievement}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </>
  );
};

export default Template4;