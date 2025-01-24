import React, { useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useResumeStore from "../../app/ResumeStore";

export default function Review({ setActiveStep, setPreviousStep }) {
  const { resume } = useResumeStore();

  useEffect(() => {
    console.log(resume);
  }, [resume]);

  const Section = ({ title, children, editIndex }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2, position: "relative" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => {
          setActiveStep(editIndex);
          setPreviousStep(11);
        }}
      >
        <EditIcon />
      </IconButton>
    </Paper>
  );

  const isNotEmpty = (entry) => Object.values(entry).some((value) => value);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume Review
      </Typography>

      {resume.personalDetails && (
        <Section title="Personal Details" editIndex={0}>
          {resume.personalDetails.firstName && resume.personalDetails.lastName && (
            <Typography>
              <strong>Name:</strong> {`${resume.personalDetails.firstName} ${resume.personalDetails.lastName}`}
            </Typography>
          )}
          {resume.personalDetails.phoneNumber && (
            <Typography>
              <strong>Phone:</strong> {resume.personalDetails.phoneNumber}
            </Typography>
          )}
          {resume.personalDetails.email && (
            <Typography>
              <strong>Email:</strong> {resume.personalDetails.email}
            </Typography>
          )}
          {resume.personalDetails.linkedIn && (
            <Typography>
              <strong>LinkedIn:</strong> {resume.personalDetails.linkedIn}
            </Typography>
          )}
        </Section>
      )}

      {resume.briefDescription && (
        <Section title="Brief Description" editIndex={1}>
          <Typography>{resume.briefDescription}</Typography>
        </Section>
      )}

      {resume.workExperience?.filter(isNotEmpty).length > 0 && (
        <Section title="Work Experience" editIndex={2}>
          {resume.workExperience.filter(isNotEmpty).map((exp, index) => (
            <Box key={index} mb={2}>
              {exp.jobTitle && exp.companyName && (
                <Typography variant="subtitle1">
                  {exp.jobTitle} at {exp.companyName}
                </Typography>
              )}
              {exp.startDate && exp.endDate && (
                <Typography variant="body2">
                  {exp.startDate} - {exp.endDate}
                </Typography>
              )}
              {exp.responsibilities && <Typography variant="body2">{exp.responsibilities}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {resume.education?.filter(isNotEmpty).length > 0 && (
        <Section title="Education" editIndex={3}>
          {resume.education.filter(isNotEmpty).map((edu, index) => (
            <Box key={index} mb={2}>
              {edu.degreeName && edu.institutionName && (
                <Typography variant="subtitle1">
                  {edu.degreeName} from {edu.institutionName}
                </Typography>
              )}
              {edu.yearOfGraduation && (
                <Typography variant="body2">Graduated: {edu.yearOfGraduation}</Typography>
              )}
              {edu.cgpa && <Typography variant="body2">CGPA: {edu.cgpa}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {resume.projects?.filter(isNotEmpty).length > 0 && (
        <Section title="Projects" editIndex={4}>
          {resume.projects.filter(isNotEmpty).map((project, index) => (
            <Box key={index} mb={2}>
              {project.projectName && <Typography variant="subtitle1">{project.projectName}</Typography>}
              {project.description && <Typography variant="body2">{project.description}</Typography>}
              {project.technologiesUsed && (
                <Typography variant="body2">Technologies: {project.technologiesUsed}</Typography>
              )}
              {project.link && <Typography variant="body2">Link: {project.link}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {resume.skills?.length > 0 && (
        <Section title="Skills" editIndex={5}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {resume.skills.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
          </Box>
        </Section>
      )}

      {resume.achievements?.filter(Boolean).length > 0 && (
        <Section title="Achievements" editIndex={6}>
          <List>
            {resume.achievements.filter(Boolean).map((achievement, index) => (
              <ListItem key={index}>
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
          </List>
        </Section>
      )}

      {resume.certificates?.filter(isNotEmpty).length > 0 && (
        <Section title="Certificates" editIndex={7}>
          {resume.certificates.filter(isNotEmpty).map((cert, index) => (
            <Box key={index} mb={1}>
              {cert.certificateName && <Typography variant="subtitle2">{cert.certificateName}</Typography>}
              {cert.organization && cert.date && (
                <Typography variant="body2">
                  Issued by: {cert.organization}, Date: {cert.date}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {resume.codingProfiles?.filter(isNotEmpty).length > 0 && (
        <Section title="Coding Profiles" editIndex={8}>
          {resume.codingProfiles.filter(isNotEmpty).map((profile, index) => (
            <Box key={index} mb={1}>
              {profile.platform && <Typography variant="subtitle2">{profile.platform}</Typography>}
              {profile.profileLink && <Typography variant="body2">Link: {profile.profileLink}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {resume.extracurricularActivities?.filter(isNotEmpty).length > 0 && (
        <Section title="Extra Curricular Activities" editIndex={10}>
          {resume.extracurricularActivities.filter(isNotEmpty).map((activity, index) => (
            <Box key={index} mb={1}>
              {activity.activityName && <Typography variant="subtitle2">{activity.activityName}</Typography>}
              {activity.description && <Typography variant="body2">{activity.description}</Typography>}
              {activity.achievements && <Typography variant="body2">{activity.achievements}</Typography>}
            </Box>
          ))}
        </Section>
      )}
    </Box>
  );
}
