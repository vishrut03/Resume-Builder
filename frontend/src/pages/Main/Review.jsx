import React, { useEffect } from "react";
import { Box, Typography, Paper, Grid2, List, ListItem, ListItemText, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useResumeStore from "../../app/ResumeStore";

export default function Review({ onEdit }) {
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
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={() => onEdit(editIndex)}>
        <EditIcon />
      </IconButton>
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resume Review
      </Typography>

      <Section title="Personal Details" editIndex={0}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Name:</strong>
              {resume.personalDetails?.firstName && resume.personalDetails?.lastName
                ? `${resume.personalDetails.firstName} ${resume.personalDetails.lastName}`
                : "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Phone:</strong> {resume.personalDetails?.phoneNumber || "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Email:</strong> {resume.personalDetails?.email || "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>LinkedIn:</strong> {resume.personalDetails?.linkedIn || "Not Provided"}
            </Typography>
          </Grid2>
        </Grid2>
      </Section>

      {resume.briefDescription && (
        <Section title="Brief Description" editIndex={1}>
          <Typography>{resume.briefDescription || "Not Provided"}</Typography>
        </Section>
      )}

      {resume.workExperience?.length > 0 && (
        <Section title="Work Experience" editIndex={2}>
          {resume.workExperience.map((exp, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1">
                {exp.jobTitle} at {exp.companyName}
              </Typography>
              <Typography variant="body2">
                {exp.startDate} - {exp.endDate}
              </Typography>
              <Typography variant="body2">{exp.responsibilities || "Not Provided"}</Typography>
            </Box>
          ))}
        </Section>
      )}

      <Section title="Education" editIndex={3}>
        {resume.education?.map((edu, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">
              {edu.degreeName} from {edu.institutionName}
            </Typography>
            <Typography variant="body2">Graduated: {edu.yearOfGraduation || "Not Provided"}</Typography>
            <Typography variant="body2">CGPA: {edu.cgpa || "Not Provided"}</Typography>
          </Box>
        ))}
      </Section>

      {resume.projects?.length > 0 && (
        <Section title="Projects" editIndex={4}>
          {resume.projects.map((project, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1">{project.projectName}</Typography>
              <Typography variant="body2">{project.description || "Not Provided"}</Typography>
              <Typography variant="body2">Technologies: {project.technologiesUsed || "Not Provided"}</Typography>
              <Typography variant="body2">Link: {project.link || "Not Provided"}</Typography>
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

      {resume.achievements?.length > 0 && (
        <Section title="Achievements" editIndex={6}>
          <List>
            {resume.achievements.map((achievement, index) => (
              <ListItem key={index}>
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
          </List>
        </Section>
      )}

      {resume.certificates?.length > 0 && (
        <Section title="Certificates" editIndex={7}>
          {resume.certificates.map((cert, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2">{cert.certificateName}</Typography>
              <Typography variant="body2">
                Issued by: {cert.organization}, Date: {cert.date || "Not Provided"}
              </Typography>
            </Box>
          ))}
        </Section>
      )}

      {resume.codingProfiles?.length > 0 && (
        <Section title="Coding Profiles" editIndex={8}>
          {resume.codingProfiles.map((profile, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2">{profile.platform}</Typography>
              <Typography variant="body2">Link: {profile.profileLink || "Not Provided"}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {resume.customDetails?.heading && resume.customDetails?.description && (
        <Section title="Custom Details" editIndex={9}>
          <Typography variant="h6">{resume.customDetails.heading}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {resume.customDetails.description || "Not Provided"}
          </Typography>
        </Section>
      )}

      {resume.extracurricularActivities?.length > 0 && (
        <Section title="Extra Curricular Activities" editIndex={10}>
          {resume.extracurricularActivities.map((activity, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2">{activity.activityName}</Typography>
              <Typography variant="body2">{activity.description || "Not Provided"}</Typography>
              <Typography variant="body2">{activity.achievements || "Not Provided"}</Typography>
            </Box>
          ))}
        </Section>
      )}
    </Box>
  );
}
