import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import html2pdf from 'html2pdf.js';
import useResumeStore from "../../store/ResumeStore"
import Download from './Download';

const Template1 = () => {
  const handleDownload = () => {
    const element = document.getElementById('template1');
    html2pdf(element);
  };

  const data = useResumeStore().resume;

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
    <>
      <Download handleDownload={handleDownload} />
      <Paper
        id="template1"
        elevation={3}
        sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}
      >
        {/* Personal Details */}
        {isNonEmpty(data.personalDetails) && (
          <Box mb={4} textAlign="center">
            <Typography variant="h4" gutterBottom>
              {data.personalDetails.firstName} {data.personalDetails.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.personalDetails.email} | {data.personalDetails.phoneNumber} |{' '}
              <Link
                href={data.personalDetails.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                LinkedIn
              </Link>
            </Typography>
          </Box>
        )}


        {/* Professional Summary */}
        {isNonEmpty(data.briefDescription) && (
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

        {/* Work Experience */}
        {isNonEmpty(data.workExperience) && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Work Experience
            </Typography>
            <Divider />
            <Box mt={2}>
              {data.workExperience.map((exp, index) => (
                isNonEmpty(exp) && (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {exp.jobTitle} at {exp.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.startDate} - {exp.endDate?exp.endDate:"Present"}
                    </Typography>
                    <Typography variant="body2">{exp.responsibilities}</Typography>
                  </Box>
                )
              ))}
            </Box>
          </Box>
        )}

        {/* Education */}
        {isNonEmpty(data.education) && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Education
            </Typography>
            <Divider />
            <Box mt={2}>
              {data.education.map((edu, index) => (
                isNonEmpty(edu) && (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {edu.degreeName} - {edu.institutionName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.startDate} - {edu.endDate?edu.endDate:'Present'} | CGPA: {edu.cgpa}
                    </Typography>
                  </Box>
                )
              ))}
            </Box>
          </Box>
        )}

                {/* Projects */}
          {isNonEmpty(data.projects) && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Projects
            </Typography>
            <Divider />
            <Box mt={2}>
              {data.projects.map((project, index) => (
                isNonEmpty(project) && (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {project.projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technologies: {project.technologiesUsed}
                    </Typography>
                    <br />
                    <Typography variant="body2">{project.description}</Typography>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                    >
                      Project Link
                    </Link>
                  </Box>
                )
              ))}
            </Box>
          </Box>
        )}

        {/* Skills */}
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

        {/* Achievements */}
        {data.achievements.filter((ach) => ach).length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Achievements
            </Typography>
            <Divider />
            <List>
              {data.achievements
                .filter((ach) => ach)
                .map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
            </List>
          </Box>
        )}

        {/* Certificates */}
        {isNonEmpty(data.certificates) && (
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

        {/* Coding Profiles */}
        {isNonEmpty(data.codingProfiles) && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Coding Profiles
            </Typography>
            <Divider />
            <Box mt={2}>
              {data.codingProfiles.map((profile, index) => (
                <Box key={index} mb={2}>
                  <Link
                    href={profile.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="primary"
                  >
                    {profile.platform}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Custom Details */}
        {data.customDetails.heading && data.customDetails.description && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              {data.customDetails.heading}
            </Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {data.customDetails.description}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Extra Curricular Activities */}
        {isNonEmpty(data.extracurricularActivities) && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom color="primary">
              Extra Curricular Activities
            </Typography>
            <Divider />
            <Box mt={2}>
              {data.extracurricularActivities
                .map((activity, index) => (
                  isNonEmpty(activity) && (
                  <Box key={index} mb={2}>
                    {activity.activityName && (
                      <Typography variant="subtitle1" fontWeight="bold">
                        {activity.activityName}
                      </Typography>
                    )}
                    {activity.description && (
                      <Typography variant="body2">{activity.description}</Typography>
                    )}
                    {activity.achievements && (
                      <Typography variant="body2" color="text.secondary">
                        Achievements: {activity.achievements}
                      </Typography>
                    )}
                  </Box>)
                ))}
            </Box>
          </Box>
        )}

      </Paper>
    </>
  );
};

export default Template1;
