import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
} from '@mui/material';
import useResumeStore from '../../app/ResumeStore';


const Template4 = () => {
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
  } = useResumeStore().resume;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {personalDetails.firstName} {personalDetails.lastName}
        </Typography>
        <Typography variant="body1">{personalDetails.address}</Typography>
        <Typography variant="body1">Phone: {personalDetails.phoneNumber}</Typography>
        <Typography variant="body1">Email: {personalDetails.email}</Typography>
        <Typography variant="body1">LinkedIn: {personalDetails.linkedIn}</Typography>
      </Box>

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
          {workExperience.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Work Experience</Typography>
                <Divider sx={{ marginY: 2 }} />
                {workExperience.map((experience, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">
                      {experience.jobTitle} at {experience.companyName}
                    </Typography>
                    <Typography variant="body2">
                      {experience.startDate} - {experience.endDate}
                    </Typography>
                    <Typography variant="body2">{experience.responsibilities}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Projects */}
          {projects.length > 0 && (
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
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Project Link
                      </a>
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Coding Profiles */}
          {codingProfiles.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Coding Profiles</Typography>
                <Divider sx={{ marginY: 2 }} />
                {codingProfiles.map((profile, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{profile.platform}</Typography>
                    <Typography variant="body2">
                      <a href={profile.profileLink} target="_blank" rel="noopener noreferrer">
                        {profile.profileLink}
                      </a>
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Stack>

        {/* Right Column */}
        <Stack spacing={4} flex={1}>
          {/* Education */}
          {education.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Education</Typography>
                <Divider sx={{ marginY: 2 }} />
                {education.map((edu, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{edu.degreeName}</Typography>
                    <Typography variant="body2">{edu.institutionName}</Typography>
                    <Typography variant="body2">
                      Graduation Year: {edu.yearOfGraduation} | CGPA: {edu.cgpa}
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
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        backgroundColor: '#e0e0e0',
                        padding: '4px 8px',
                        borderRadius: 2,
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
          {certificates.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Certificates</Typography>
                <Divider sx={{ marginY: 2 }} />
                {certificates.map((cert, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{cert.certificateName}</Typography>
                    <Typography variant="body2">{cert.organization}</Typography>
                    <Typography variant="body2">Date: {cert.date}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Extra Curricular Activities */}
          {extracurricularActivities.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6">Extra Curricular Activities</Typography>
                <Divider sx={{ marginY: 2 }} />
                {extracurricularActivities.map((activity, index) => (
                  <Box key={index} marginBottom={2}>
                    <Typography variant="subtitle1">{activity.activityName}</Typography>
                    <Typography variant="body2">{activity.description}</Typography>
                    <Typography variant="body2">{activity.achievements}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Template4;
