import React, { useEffect, useState } from "react"
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Chip, IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import useResumeStore from "../../app/ResumeStore"
import VisibilityIcon from "@mui/icons-material/Visibility"
import PersonalDetails from "./PersonalDetails";
import Projects from "./Project/Projects";
import Skills from "./Skills";
import Education from "./Education/Education";
import WorkExperience from './WorkExperience/WorkExperience';
import ExtraCurricular from "./ExtraCurricular";
import CodingProfiles from "./CodingProfiles";
import Certificates from "./Certificates";
import Achievements from "./Achievements";
import BriefDescription from "./BriefDescription";
import Resume from "./Resume";
import Custom from "./Custom";

export default function Review({ setActiveStep, setPreviousStep }) {
  const { resume } = useResumeStore()
  const [currentStep, setCurrentStep] = useState("Review")
  const [index,setIndex] = useState(-1);
  useEffect(() => {
    // console.log(resume)
  }, [resume])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails fromReview={true}/>;
      case 1:
        return <BriefDescription fromReview={true}/>;
      case 2:
        return <WorkExperience fromReview={true}/>;
      case 3:
        return <Education fromReview={true}/>;
      case 4:
        return <Projects fromReview={true}/>;
      case 5:
        return <Skills fromReview={true}/>;
      case 6:
        return <Achievements fromReview={true}/>;
      case 7:
        return <Certificates fromReview={true}/>;
      case 8:
        return <CodingProfiles fromReview={true}/>;
      case 9:
        return <Custom fromReview={true}/>;  
      case 10:
        return <ExtraCurricular fromReview={true}/>;  
      default:
        return "Unknown step";
    }
  }

  const Section = ({ title, children, editIndex }) => (
    <Paper elevation={3} sx={{ p: 2, mb: 2, position: "relative" }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8 }}
        onClick={() => setIndex(editIndex)}  
      >
        <EditIcon />
      </IconButton>
    </Paper>
  )

  const isNotEmpty = (entry) => Object.values(entry).some((value) => value)

  if (currentStep === "ExtraCurricular") {
    return <ExtraCurricular />
  }
  if (currentStep === "Resume") {
    return <Resume />
  }

  if(index !== -1) {
    return getStepContent(index);
  } 
  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", my: 4, position: "static" }}>
        <VisibilityIcon />
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
                {edu.yearOfGraduation && <Typography variant="body2">Graduated: {edu.yearOfGraduation}</Typography>}
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

      <div className="w-full max-w-xl mx-auto flex justify-between mt-4">
        <button
          onClick={() => setCurrentStep("ExtraCurricular")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep("Resume")}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </>
  )
}

