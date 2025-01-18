import React from 'react'
import PersonalDetails from "./PersonalDetails"
import Projects from "./Projects"
import Skills from "./Skills"
import Education from "./Education"
import WorkExperience from "./WorkExperience"
import Review from "./Review"
import ExtraCurricular from "./ExtraCurricular"
import CodingProfiles from "./CodingProfiles"
import Certificates from './Certificates'
import Achievements from './Achievements'
import BriefDescription from './BriefDescription'

import { Stepper } from "@mui/material";
import {Step} from "@mui/material";
import {StepButton} from "@mui/material";
import {Button} from "@mui/material";
import {Typography} from "@mui/material";

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDetails />;
    case 1:
      return <BriefDescription />;
    case 2:
      return <WorkExperience />;
    case 3:
      return <Education />;
    case 4:
      return <Projects />;
    case 5:
      return <Skills />;
    case 6:
      return <Achievements />;
    case 7:
      return <Certificates />;
    case 8:
      return <CodingProfiles />;
    case 9:
      return <ExtraCurricular />;
    case 10:
      return <Review />;
    default:
      return "Unknown step";
  }    
}

const steps = [
  "Personal Details",        // 0
  "Brief Description",       // 1
  "Work Experience",         // 2
  "Education",               // 3
  "Projects",                // 4
  "Skills",                  // 5
  "Achievements",            // 6
  "Certificates",            // 7
  "Coding Profiles",         // 8
  "Extra Curricular",        // 9
  "Review",                  // 10
];

const Form = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div>
    {/* // <div className={classes.root}> */}
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton
            color="secondary"
            onClick={handleStep(index)}
            completed={completed[index]}
          >
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
    <div>
      {/* {allStepsCompleted() ? (
        <div>
          <Typography className={classes.instructions}>
            All steps completed - your resume is ready!!
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleEdit}>Edit</Button>
          <Resume />
        </div>
      ) : ( */}
        <div>
        <Typography> 
          {/* <Typography className={classes.instructions}> */}
            {getStepContent(activeStep)}
          </Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              // onClick={handleBack}
              // className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              // onClick={handleNext}
              // className={classes.button}
            >
              Next
            </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={handleComplete}
                >
                  {/* {completedSteps() === totalSteps() - 1
                    ? "Finish"
                    : "Save and Continue"} */}
                </Button>
          </div>
        </div>
      {/* )} */}
    </div>
  </div>
  )
}

export default Form
