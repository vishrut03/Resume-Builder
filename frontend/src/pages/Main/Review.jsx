import React from "react";
import { Box, Typography, Paper, Grid2, List, ListItem, ListItemText, Button, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useResumeStore from "../../app/ResumeStore";

export default function Review({ onEdit }) {
  const resumeData = useResumeStore();
  
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
              {resumeData.personalDetails?.firstName && resumeData.personalDetails?.lastName
                ? `${resumeData.personalDetails.firstName} ${resumeData.personalDetails.lastName}`
                : "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Phone:</strong> {resumeData.personalDetails?.phoneNumber || "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>Email:</strong> {resumeData.personalDetails?.email || "Not Provided"}
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <Typography>
              <strong>LinkedIn:</strong> {resumeData.personalDetails?.linkedIn || "Not Provided"}
            </Typography>
          </Grid2>
        </Grid2>
      </Section>

      {resumeData.briefDescription && (
        <Section title="Brief Description" editIndex={1}>
          <Typography>{resumeData.briefDescription || "Not Provided"}</Typography>
        </Section>
      )}

      {resumeData.workExperience?.length > 0 && (
        <Section title="Work Experience" editIndex={2}>
          {resumeData.workExperience.map((exp, index) => (
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
        {resumeData.education?.map((edu, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1">
              {edu.degreeName} from {edu.institutionName}
            </Typography>
            <Typography variant="body2">Graduated: {edu.yearOfGraduation || "Not Provided"}</Typography>
            <Typography variant="body2">CGPA: {edu.cgpa || "Not Provided"}</Typography>
          </Box>
        ))}
      </Section>

      {resumeData.projects?.length > 0 && (
        <Section title="Projects" editIndex={4}>
          {resumeData.projects.map((project, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1">{project.projectName}</Typography>
              <Typography variant="body2">{project.description || "Not Provided"}</Typography>
              <Typography variant="body2">Technologies: {project.technologiesUsed || "Not Provided"}</Typography>
              <Typography variant="body2">Link: {project.link || "Not Provided"}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {resumeData.skills?.length > 0 && (
        <Section title="Skills" editIndex={5}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {resumeData.skills.map((skill, index) => (
              <Chip key={index} label={skill} />
            ))}
          </Box>
        </Section>
      )}

      {resumeData.achievements?.length > 0 && (
        <Section title="Achievements" editIndex={6}>
          <List>
            {resumeData.achievements.map((achievement, index) => (
              <ListItem key={index}>
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
          </List>
        </Section>
      )}

      {resumeData.certificates?.length > 0 && (
        <Section title="Certificates" editIndex={7}>
          {resumeData.certificates.map((cert, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2">{cert.certificateName}</Typography>
              <Typography variant="body2">
                Issued by: {cert.organization}, Date: {cert.date || "Not Provided"}
              </Typography>
            </Box>
          ))}
        </Section>
      )}

      {resumeData.codingProfiles?.length > 0 && (
        <Section title="Coding Profiles" editIndex={8}>
          {resumeData.codingProfiles.map((profile, index) => (
            <Box key={index} mb={1}>
              <Typography variant="subtitle2">{profile.platform}</Typography>
              <Typography variant="body2">Link: {profile.profileLink || "Not Provided"}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {resumeData.customDetails?.heading && resumeData.customDetails?.description && (
        <Section title="Custom Details" editIndex={9}>
          <Typography variant="h6">{resumeData.customDetails.heading}</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {resumeData.customDetails.description || "Not Provided"}
          </Typography>
        </Section>
      )}

      {resumeData.extracurricularActivities?.length > 0 && (
        <Section title="Extra Curricular Activities" editIndex={10}>
          {resumeData.extracurricularActivities.map((activity, index) => (
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
