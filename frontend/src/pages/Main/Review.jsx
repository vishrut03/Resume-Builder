import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonalDetails from "./PersonalDetails";
import Projects from "./Project/Projects";
import Skills from "./Skills";
import Education from "./Education/Education";
import WorkExperience from "./WorkExperience/WorkExperience";
import ExtraCurricular from "./ExtraCurricular";
import CodingProfiles from "./CodingProfiles";
import Certificates from "./Certificates";
import Achievements from "./Achievements";
import BriefDescription from "./BriefDescription";
import Resume from "./Resume";
import Custom from "./Custom";
import Cookies from "js-cookie";

export default function Review({ setActiveStep, setPreviousStep }) {
  const [resume, setResume] = useState(null);
  const [currentStep, setCurrentStep] = useState("Review");
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Token:", token);
        const response = await axios.get("http://localhost:3001/resume/my-resume", {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        setResume(response.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails fromReview={true} />;
      case 1:
        return <BriefDescription fromReview={true} />;
      case 2:
        return <WorkExperience fromReview={true} />;
      case 3:
        return <Education fromReview={true} />;
      case 4:
        return <Projects fromReview={true} />;
      case 5:
        return <Skills fromReview={true} />;
      case 6:
        return <Achievements fromReview={true} />;
      case 7:
        return <Certificates fromReview={true} />;
      case 8:
        return <CodingProfiles fromReview={true} />;
      case 9:
        return <Custom fromReview={true} />;
      case 10:
        return <ExtraCurricular fromReview={true} />;
      default:
        return "Unknown step";
    }
  }

  const Section = ({ title, children, editIndex }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2, position: "relative" }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {children}
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={() => setIndex(editIndex)}>
        <EditIcon />
      </IconButton>
    </Paper>
  );

  const isNotEmpty = (entry) => Object.values(entry).some((value) => value);

  if (currentStep === "ExtraCurricular") return <ExtraCurricular />;
  if (currentStep === "Resume") return <Resume />;
  if (index !== -1) return getStepContent(index);
  if (!resume) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4, position: "static" }}>
      <VisibilityIcon />
      <Typography variant="h4" gutterBottom>Resume Review</Typography>

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
                <Typography variant="subtitle1">{exp.jobTitle} at {exp.companyName}</Typography>
              )}
              {exp.startDate && exp.endDate && (
                <Typography variant="body2">{exp.startDate} - {exp.endDate}</Typography>
              )}
              {exp.responsibilities && (
                <Typography variant="body2">{exp.responsibilities}</Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {resume.education?.filter(isNotEmpty).length > 0 && (
        <Section title="Education" editIndex={3}>
          {resume.education.filter(isNotEmpty).map((edu, index) => (
            <Box key={index} mb={2}>
              {edu.degreeName && edu.institutionName && (
                <Typography variant="subtitle1">{edu.degreeName} from {edu.institutionName}</Typography>
              )}
              {edu.yearOfGraduation && (
                <Typography variant="body2">Graduation Year: {edu.yearOfGraduation}</Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Additional sections can be added here similarly */}
    </Box>
  );
}