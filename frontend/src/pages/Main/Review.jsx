import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
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
        // console.log("Token:", token);
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
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => setIndex(editIndex)}
      >
        <EditIcon />
      </IconButton>
    </Paper>
  );

  // Returns true if at least one property of the entry has a value
  const isNotEmpty = (entry) => Object.values(entry).some((value) => value);

  if (currentStep === "ExtraCurricular") return <ExtraCurricular />;
  if (currentStep === "Resume") return <Resume />;
  if (index !== -1) return getStepContent(index);
  if (!resume) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4, position: "static" }}>
      <VisibilityIcon />
      <Typography variant="h4" gutterBottom>
        Resume Review
      </Typography>

      {/* Personal Details */}
      {resume.personalDetails && (
        <Section title="Personal Details" editIndex={0}>
          {resume.personalDetails.firstName && resume.personalDetails.lastName && (
            <Typography>
              <strong>Name:</strong> {`${resume.personalDetails.firstName} ${resume.personalDetails.lastName}`}
            </Typography>
          )}
          {resume.personalDetails.email && (
            <Typography>
              <strong>Email:</strong> {resume.personalDetails.email}
            </Typography>
          )}
          {resume.personalDetails.phoneNumber && (
            <Typography>
              <strong>Phone:</strong> {resume.personalDetails.phoneNumber}
            </Typography>
          )}
          {resume.personalDetails.address && (
            <Typography>
              <strong>Address:</strong> {resume.personalDetails.address}
            </Typography>
          )}
          {resume.personalDetails.linkedIn && (
            <Typography>
              <strong>LinkedIn:</strong> {resume.personalDetails.linkedIn}
            </Typography>
          )}
        </Section>
      )}

      {/* Brief Description */}
      {resume.briefDescription && (
        <Section title="Brief Description" editIndex={1}>
          <Typography>{resume.briefDescription}</Typography>
        </Section>
      )}

      {/* Work Experience */}
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
              {exp.responsibilities && (
                <Typography variant="body2">
                  {exp.responsibilities}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Education */}
      {resume.education?.filter(isNotEmpty).length > 0 && (
        <Section title="Education" editIndex={3}>
          {resume.education.filter(isNotEmpty).map((edu, index) => (
            <Box key={index} mb={2}>
              {edu.degreeName && edu.institutionName && (
                <Typography variant="subtitle1">
                  {edu.degreeName} from {edu.institutionName}
                </Typography>
              )}
              {edu.startDate && edu.endDate && (
                <Typography variant="body2">
                  {edu.startDate} - {edu.endDate}
                </Typography>
              )}
              {edu.cgpa && (
                <Typography variant="body2">
                  <strong>CGPA:</strong> {edu.cgpa}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Projects */}
      {resume.projects?.filter(isNotEmpty).length > 0 && (
        <Section title="Projects" editIndex={4}>
          {resume.projects.filter(isNotEmpty).map((proj, index) => (
            <Box key={index} mb={2}>
              {proj.projectName && (
                <Typography variant="subtitle1">
                  <strong>Project Name:</strong> {proj.projectName}
                </Typography>
              )}
              {proj.description && (
                <Typography variant="body2">
                  {proj.description}
                </Typography>
              )}
              {proj.technologiesUsed && (
                <Typography variant="body2">
                  <strong>Technologies Used:</strong> {proj.technologiesUsed}
                </Typography>
              )}
              {proj.link && (
                <Typography variant="body2">
                  <strong>Link:</strong> {proj.link}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <Section title="Skills" editIndex={5}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {resume.skills.map((skill, index) => (
              <Typography key={index} variant="body2">
                {skill}
              </Typography>
            ))}
          </Box>
        </Section>
      )}

      {/* Achievements */}
      {resume.achievements?.length > 0 && (
        <Section title="Achievements" editIndex={6}>
          {resume.achievements.map((ach, index) => (
            <Box key={index} mb={2}>
              <Typography variant="body2">{ach}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {/* Certificates */}
      {resume.certificates?.filter(isNotEmpty).length > 0 && (
        <Section title="Certificates" editIndex={7}>
          {resume.certificates.filter(isNotEmpty).map((cert, index) => (
            <Box key={index} mb={2}>
              {cert.certificateName && (
                <Typography variant="subtitle1">
                  <strong>Certificate Name:</strong> {cert.certificateName}
                </Typography>
              )}
              {cert.organisation && (
                <Typography variant="body2">
                  <strong>Organisation:</strong> {cert.organisation}
                </Typography>
              )}
              {cert.date && (
                <Typography variant="body2">
                  <strong>Date:</strong> {cert.date}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Coding Profiles */}
      {resume.codingProfiles?.filter(isNotEmpty).length > 0 && (
        <Section title="Coding Profiles" editIndex={8}>
          {resume.codingProfiles.filter(isNotEmpty).map((profile, index) => (
            <Box key={index} mb={2}>
              {profile.platform && (
                <Typography variant="subtitle1">
                  <strong>Platform:</strong> {profile.platform}
                </Typography>
              )}
              {profile.profileLink && (
                <Typography variant="body2">
                  <strong>Profile Link:</strong> {profile.profileLink}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Custom Section */}
      {resume.customSection && (
        <Section title={resume.customSection.heading || "Custom Section"} editIndex={9}>
          {resume.customSection.description && (
            <Typography variant="body2">
              {resume.customSection.description}
            </Typography>
          )}
        </Section>
      )}

      {/* Extra Curricular Activities */}
      {resume.extraCurricularActivities?.filter(isNotEmpty).length > 0 && (
        <Section title="Extra Curricular Activities" editIndex={10}>
          {resume.extraCurricularActivities.filter(isNotEmpty).map((activity, index) => (
            <Box key={index} mb={2}>
              {activity.activityName && (
                <Typography variant="subtitle1">
                  <strong>Activity Name:</strong> {activity.activityName}
                </Typography>
              )}
              {activity.achievements && (
                <Typography variant="body2">
                  <strong>Achievements:</strong> {activity.achievements}
                </Typography>
              )}
              {activity.description && (
                <Typography variant="body2">
                  <strong>Description:</strong> {activity.description}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <button
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md mb-4"
          onClick={() => setCurrentStep("ExtraCurricular")}
        >
          Back
        </button>
        <button
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu mb-4"
          onClick={() => setCurrentStep("Resume")}
        >
          Next
        </button>
      </Box>
    </Box>
  );
}
