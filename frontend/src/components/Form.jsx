import React, { useState } from "react"
import PersonalDetails from "./PersonalDetails"
import Projects from "./Projects"
import Skills from "./Skills"
import Education from "./Education"
import WorkExperience from "./WorkExperience"
import Review from "./Review"
import ExtraCurricular from "./ExtraCurricular"
import CodingProfiles from "./CodingProfiles"
import Certificates from "./Certificates"
import Achievements from "./Achievements"
import BriefDescription from "./BriefDescription"
import Resume from "./Resume"

// Import MUI icons
import PersonIcon from "@mui/icons-material/Person"
import DescriptionIcon from "@mui/icons-material/Description"
import WorkIcon from "@mui/icons-material/Work"
import SchoolIcon from "@mui/icons-material/School"
import CodeIcon from "@mui/icons-material/Code"
import BuildIcon from "@mui/icons-material/Build"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import CardMembershipIcon from "@mui/icons-material/CardMembership"
import ComputerIcon from "@mui/icons-material/Computer"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import VisibilityIcon from "@mui/icons-material/Visibility"

const steps = [
  { label: "Personal Details", icon: <PersonIcon /> },
  { label: "Brief Description", icon: <DescriptionIcon /> },
  { label: "Work Experience", icon: <WorkIcon /> },
  { label: "Education", icon: <SchoolIcon /> },
  { label: "Projects", icon: <CodeIcon /> },
  { label: "Skills", icon: <BuildIcon /> },
  { label: "Achievements", icon: <EmojiEventsIcon /> },
  { label: "Certificates", icon: <CardMembershipIcon /> },
  { label: "Coding Profiles", icon: <ComputerIcon /> },
  { label: "Extra Curricular", icon: <SportsEsportsIcon /> },
  { label: "Review", icon: <VisibilityIcon /> },
]

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDetails />
    case 1:
      return <BriefDescription />
    case 2:
      return <WorkExperience />
    case 3:
      return <Education />
    case 4:
      return <Projects />
    case 5:
      return <Skills />
    case 6:
      return <Achievements />
    case 7:
      return <Certificates />
    case 8:
      return <CodingProfiles />
    case 9:
      return <ExtraCurricular />
    case 10:
      return <Review />
    default:
      return "Unknown step"
  }
}

const Form = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return activeStep === 11 ? (
    <Resume />
  ) : (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex flex-wrap -mx-2 overflow-hidden">
          {steps.map(({ label, icon }, index) => (
            <div key={label} className="my-2 px-2 w-1/2 overflow-hidden sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
              <button
                onClick={handleStep(index)}
                className={`w-full py-2 px-4 rounded-full text-sm font-medium transition-colors duration-150 flex items-center justify-center ${
                  activeStep === index
                    ? "bg-blue-500 text-white"
                    : completed[index]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <span className="mr-2">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">{getStepContent(activeStep)}</div>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className={`py-2 px-4 rounded-md text-sm font-medium ${
            activeStep === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Back
        </button>
        <div>
          <button
            onClick={handleNext}
            className="py-2 px-4 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 mr-2"
          >
            Next
          </button>
          <button className="py-2 px-4 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600">
            {Object.keys(completed).length === steps.length - 1 ? "Finish" : "Save and Continue"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form

