import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import useResumeStore from "../../app/ResumeStore";
import temp1 from '../../assets/template-1.svg';
import temp2 from '../../assets/template-2.png';
import temp3 from '../../assets/temp3.webp';
import temp4 from '../../assets/ats-friendly-Combined-Resume-Template.png';
import Review
 from "./Review";
function Resume() {
  const resume = useResumeStore().resume;

  const templates = [
    {
      id: 1,
      name: "Classic",
      imageUrl: temp1,
    },
    {
      id: 2,
      name: "Professional",
      imageUrl: temp4,
    },
    {
      id: 3,
      name: "Creative",
      imageUrl: temp3,
    },
    {
      id: 4,
      name: "Modern",
      imageUrl: temp2,
    },
  ];

  const handleTemplateClick = (templateName) => {
    const fullName = resume.personalDetails.firstName + resume.personalDetails.lastName;
    const url = `http://localhost:5173/${fullName}/template/${templateName}`;
    window.open(url, "_blank");
  };

  const [currentStep,setCurrentStep]=useState("Resume")

  if(currentStep==="Review") return <Review/>
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 4, marginTop: 2 }}>
        Choose a template
      </Typography>
      {/* First Row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
        {templates.slice(0, 2).map((template) => (
          <Paper
            key={template.id}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&:hover img': {
                filter: 'blur(3px)',
                transition: 'filter 0.3s',
              },
              '&:hover .hoverButton': {
                opacity: 1,
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <img
              src={template.imageUrl}
              alt={template.name}
              style={{
                width: '350px',
                height: '450px',
                borderRadius: 8,
                marginBottom: 2,
              }}
            />
            <Button
              variant="contained"
              className="hoverButton"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -40%)',
                opacity: 0,
                transition: 'opacity 0.3s, transform 0.3s',
              }}
              onClick={() => handleTemplateClick(template.name)}
            >
              Use this template
            </Button>
            <Typography variant="body1" sx={{ fontWeight: 600, marginTop: 2 }}>
              {template.name}
            </Typography>
          </Paper>
        ))}
      </Box>
      {/* Second Row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
        {templates.slice(2).map((template) => (
          <Paper
            key={template.id}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&:hover img': {
                filter: 'blur(3px)',
                transition: 'filter 0.3s',
              },
              '&:hover .hoverButton': {
                opacity: 1,
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <img
              src={template.imageUrl}
              alt={template.name}
              style={{
                width: '350px',
                height: '450px',
                borderRadius: 8,
                marginBottom: 2,
              }}
            />
            <Button
              variant="contained"
              className="hoverButton"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -40%)',
                opacity: 0,
                transition: 'opacity 0.3s, transform 0.3s',
              }}
              onClick={() => handleTemplateClick(template.name)}
            >
              Use this template
            </Button>
            <Typography variant="body1" sx={{ fontWeight: 600, marginTop: 2 }}>
              {template.name}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
    <div className="w-full max-w-xl flex justify-between mt-4">
        <button
          onClick={()=>setCurrentStep("Review")}
          className="py-3 px-8 rounded-lg text-sm font-medium transition-transform transform-gpu bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 shadow-md"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default Resume;
