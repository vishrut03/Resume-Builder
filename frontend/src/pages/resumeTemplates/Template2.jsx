import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import useResumeStore from "../../store/ResumeStore"
import html2pdf from 'html2pdf.js';
import Download from './Download';

const Template2 = () => {
  const {
    personalDetails,
    briefDescription,
    workExperience,
    education,
    projects,
    skills,
    achievements,
    certificates,
    codingProfiles,
    extracurricularActivities,
    customDetails, 
  } = useResumeStore().resume;

  const handleDownload = () => {
      const element = document.getElementById('template2');
      // console.log('hi',element)
      html2pdf(element);
  };

  const isNonEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.some((item) => isNonEmpty(item)); // At least one item is non-empty
    }
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some((val) => isNonEmpty(val)); // At least one property is non-empty
    }
    return value && value.trim && value.trim().length > 0; // Non-empty string
  };

  return (
    <Box
      id="resume-content"
      sx={{
        padding: 4,
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Download handleDownload={handleDownload} />
      <Box id="template2" sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2 }}>
      {/* Header Section */}
      {isNonEmpty(personalDetails) && (
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {personalDetails.firstName} {personalDetails.lastName}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ marginRight: '16px' }}>Phone: {personalDetails.phoneNumber}</span>
          <span style={{ marginRight: '16px' }}>
            Email: {personalDetails.email}
          </span>
          <a
            href={personalDetails.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b5998', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </Typography>
      </Box>)}

      {/* Two-Column Layout */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Left Column */}
        <Stack spacing={4} flex={1}>
          {/* Brief Description */}
          {briefDescription && (
            <Card>
              <CardContent>
                <Typography variant="h6">Brief Description</Typography>
                <Typography variant="body2">{briefDescription}</Typography>
              </CardContent>
            </Card>
          )}

          {/* Work Experience */}
          {isNonEmpty(workExperience) && (
            <Card>
              <CardContent>
                <Typography variant="h6">Work Experience</Typography>
                <Divider sx={{ marginY: 2 }} />
                {workExperience.map((experience, index) => 
                isNonEmpty(experience) && (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">
                      {experience.jobTitle} at {experience.companyName}
                    </Typography>
                    <Typography variant="body2">
                      {experience.startDate} - {experience.endDate? experience.endDate: 'Present'}
                    </Typography>
                    <Typography variant="body2">{experience.responsibilities}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {isNonEmpty(projects) && (
            <Card>
              <CardContent>
                <Typography variant="h6">Projects</Typography>
                <Divider sx={{ marginY: 2 }} />
                {projects.map((project, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{project.projectName}</Typography>
                    <Typography variant="body2">{project.description}</Typography>
                    <Typography variant="body2">Technologies: {project.technologiesUsed}</Typography>
                    <Typography variant="body2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#3b5998', textDecoration: 'none' }}
                      >
                        Project Link
                      </a>
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Coding Profiles */}
          {isNonEmpty(codingProfiles) && (
            <Card>
              <CardContent>
                <Typography variant="h6">Coding Profiles</Typography>
                <Divider sx={{ marginY: 2 }} />
                {codingProfiles.map((profile, index) => 
                isNonEmpty(profile) && (
                  <Box key={index} marginBottom={2}>
                    <a
                      href={profile.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3b5998', textDecoration: 'none' }}
                    >
                      {profile.platform}
                    </a>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Stack>

        {/* Right Column */}
        <Stack spacing={4} flex={1}>
          {/* Education */}
          {isNonEmpty(education) && (
            <Card>
              <CardContent>
                <Typography variant="h6">Education</Typography>
                <Divider sx={{ marginY: 2 }} />
                {education.map((edu, index) => 
                isNonEmpty(edu) && (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{edu.degreeName}</Typography>
                    <Typography variant="body2">{edu.institutionName}</Typography>
                    <Typography variant="body2">
                      Graduation Year: {edu.startDate} - {edu.endDate?edu.endDate:'Present'} | CGPA: {edu.cgpa}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Skills</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"  
                  sx={{ gap: 1, justifyContent: 'flex-start' }} 
                >
                  {skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        backgroundColor: '#e0e0e0',
                        padding: '4px 8px',
                        borderRadius: 2,
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis', 
                      }}
                    >
                      {skill}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Achievements</Typography>
                <Divider sx={{ marginY: 2 }} />
                <ul>
                  {achievements.map((achievement, index) => (
                    <li key={index}>
                      <Typography variant="body2">{achievement}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Certificates */}
          {isNonEmpty(certificates) && (
            <Card>
              <CardContent>
                <Typography variant="h6">Certificates</Typography>
                <Divider sx={{ marginY: 2 }} />
                {certificates.map((cert, index) => isNonEmpty(cert) && (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{cert.certificateName}</Typography>
                    <Typography variant="body2">{cert.organization}</Typography>
                    <Typography variant="body2">Date: {cert.date}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Custom Section */}
          {customDetails.heading && customDetails.description && (
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {customDetails.heading}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {customDetails.description}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Extra Curricular Activities */}
          {extracurricularActivities
            .filter((activity) => activity.activityName.trim() !== '')
            .length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Extra Curricular Activities</Typography>
                <Divider sx={{ marginY: 2 }} />
                {extracurricularActivities
                  .filter((activity) => activity.activityName.trim() !== '')
                  .map((activity, index) => (
                    <Box key={index} marginBottom={2}>
                      <Typography variant="subtitle1">{activity.activityName}</Typography>
                      {activity.description && (<Typography variant="body2">{activity.description}</Typography>)}
                      {activity.achievements && (<Typography variant="body2">{activity.achievements}</Typography>)}
                    </Box>
                  ))}
              </CardContent>
            </Card>
          )}

        </Stack>
      </Stack>
      </Box>
    </Box>
  );
};

export default Template2;