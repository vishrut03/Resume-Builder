import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Template1 from '../resumeTemplates/Template1';
import Template2 from '../resumeTemplates/Template2';
import Template3 from '../resumeTemplates/Template3';
import Template4 from '../resumeTemplates/Template4';
import useResumeStore from '../../app/ResumeStore';

const Resume = () => {
  const [expandedPanel, setExpandedPanel] = useState(false);
  const resumeData = useResumeStore();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const templates = [
    { name: "Classic Template", component: <Template1 data={resumeData} /> },
    { name: "Modern Template", component: <Template2 data={resumeData} /> },
    { name: "Creative Template", component: <Template3 data={resumeData} /> },
    { name: "Professional Template", component: <Template4 data={resumeData} /> },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Choose Your Resume Template
      </Typography>
      {templates.map((template, index) => (
        <Accordion key={index} expanded={expandedPanel === `panel${index}`} onChange={handleChange(`panel${index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography>{template.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>{template.component}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Resume;
