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
import Resume from './Resume'

import { Stepper } from "@mui/material";
import {Step} from "@mui/material";
import {StepButton} from "@mui/material";
import {Button} from "@mui/material";
import {Typography} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { spacing } from '@mui/system'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: spacing(1),
    marginBottom: spacing(1)
  }
}));

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
  const classes = useStyles();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleBack=()=>{
    setActiveStep((prevActiveStep)=>prevActiveStep-1);
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  // const ValidatePersonalDetails = () => {
  //   if(!props.PersonalData){
  //     return false
  //   } 
  //   if(!props.PersonalData.Data.fname || !props.PersonalData.Data.lname || !props.PersonalData.Data.phone  ||  !props.PersonalData.Data.address ||  !props.PersonalData.Data.url ) {
  //     alert("Please fill all the data")
  //     return false
  //   }

  //   if(props.PersonalData.Data.fname.length < 1 || props.PersonalData.Data.lname.length < 1 || props.PersonalData.Data.address.length < 1  ||  props.PersonalData.Data.url.length < 1  ) {
  //     alert("Pleasej fill all the data. ")
  //     return false
  //   }

  //   if(props.PersonalData.Data.phone.length != 10 && props.PersonalData.Data.phone.length != 12 ){
  //     alert("Enter a valid phone number.")
  //     return false
  //   }
  //   return true
  // }


  // const validateEducationDetails= () => {
  //   if(!props.educationFormData) return false;
  //   const Data = props.educationFormData.Data;
  //   for(let i = 0 ; i < Data.length ; i++){
  //     const instance = Data[i]
  //     if(!instance.courseName || !instance.completionYear || !instance.college || !instance.percentage){
  //       alert("Please fill all the data")
  //       return false
  //     } 

  //     if(instance.courseName.length < 1 || instance.completionYear.length != 4 || instance.college.length < 1 || instance.percentage.length < 1){
  //       alert("Incomplete or invalid data")
  //       return false
  //     } 

  //   }

  //   return true
  // }

//   const validateProjectDetails= () => {
//     if(!props.projectFormData) return false;
//     const Data = props.projectFormData.Data;
//     for(let i = 0 ; i < Data.length ; i++){
//       const instance = Data[i]
//       if(!instance.projectName){
//         alert("Please enter the name of project")
//         return false
//       } 

//       if(instance.projectName.length < 1 ){
//         alert("Please enter the name of project")
//         return false
//       } 
//     }
//     return true
//   }


//   const validateSkills = () => {

//     console.log(props.SkillsFormData.Data.length)
//     if(props.SkillsFormData.Data.length < 1){
//       alert("Please enter your skill")
//       return false
//     };
//     for(let i = 0 ; i < props.SkillsFormData.Data.length ; i++){
//       console.log(props.SkillsFormData.Data[i])
//       if(!props.SkillsFormData.Data[i] || (props.SkillsFormData.Data[i] && props.SkillsFormData.Data[i].length < 1)) {
//         alert("Please fill all skills")
//         return false
//      }
//     }
//     return true
//   }


// const validateSocialLinks = () => {
//   if(props.SocialFormData.Data.length < 1) {
//     alert("Please enter your social url")
//     return false;
//   }
//     for(let i = 0 ; i < props.SocialFormData.Data.length ; i++){
//       if(!props.SocialFormData.Data[i] || (props.SocialFormData.Data[i] && props.SocialFormData.Data[i].length < 1)) {
//         alert("Please fill all urls")
//         return false
//       }
//     }
//   return true
//   }
  return activeStep===11?(<Resume/>):(
    <div className={classes.root}>
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
      {Object.keys(completed).length===steps.length? (
        <div className={classes.instructions}>
          <Typography >
            All steps completed - your resume is ready!!
          </Typography>
          <Button onClick={()=>window.location.reload(false)}>Reset</Button>
          <Button onClick={()=>{
            setCompleted({});
            setActiveStep(0)
          }}>Edit
          </Button>
          {/* <Resume /> */}
        </div>
      ) : (
        <div>
        <Typography className={classes.instructions}> 
            {getStepContent(activeStep)}
          </Typography>
          <div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={handleComplete}
                >
                  {Object.keys(completed).length === steps.length - 1
                    ? "Finish"
                    : "Save and Continue"}
                </Button>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default Form
