import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import Projects from "./Project/Projects";
import Skills from "./Skills";
import Education from "./Education/Education";
import WorkExperience from './WorkExperience/WorkExperience';
import Review from "./Review";
import ExtraCurricular from "./ExtraCurricular";
import CodingProfiles from "./CodingProfiles";
import Certificates from "./Certificates";
import Achievements from "./Achievements";
import BriefDescription from "./BriefDescription";
import Resume from "./Resume";
import Custom from "./Custom";


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
      return <Custom />;  
    case 10:
      return <ExtraCurricular />;  
    default:
      return "Unknown step";
  }
}


const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [previousStep, setPreviousStep] = useState(null)

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleBack = () => {
    setPreviousStep(0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if(previousStep === 11) {
      setActiveStep(11);
      setPreviousStep(10);
    }
    else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  if(activeStep === 11) {
    return (
    <>
    <Review/>
    {/* <div className="flex justify-between ml-10"> 
      <button
        onClick={handleBack}
        disabled={activeStep === 0}
        className={`py-3 px-8 mb-6 ml-96 rounded-lg text-sm font-medium transition-transform transform-gpu ${
          activeStep === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
        } shadow-md`}
      >
        Back
      </button>
      <div>
        <button
          onClick={handleNext}
          className="py-3 px-8 mb-6 mr-96 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </div> */}
    </>)
  }

  return activeStep === 12 ? (
    <Resume />
  ) : (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg p-6 mb-4">{getStepContent(activeStep)}</div> 

    {/* <div className="flex justify-between ml-10"> 
      <button
        onClick={handleBack}
        disabled={activeStep === 0}
        className={`py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu ${
          activeStep === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
        } shadow-md`}
      >
        Back
      </button>
      <div>
        <button
          onClick={handleNext}
          className="py-3 px-8 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 shadow-md transition-transform transform-gpu"
        >
          Next
        </button>
      </div>
    </div> */}
    </div>
  );
};

export default Form;
