// import React, { useState } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Template1 from '../resumeTemplates/Template1';
// import Template2 from '../resumeTemplates/Template2';
// import Template3 from '../resumeTemplates/Template3';
// import Template4 from '../resumeTemplates/Template4';
// import useResumeStore from '../../app/ResumeStore';

// const Resume = () => {
//   const [expandedPanel, setExpandedPanel] = useState(false);
//   const resumeData = useResumeStore();

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpandedPanel(isExpanded ? panel : false);
//   };

//   const templates = [
//     { name: "Classic Template", component: <Template1 data={resumeData} /> },
//     { name: "Modern Template", component: <Template2 data={resumeData} /> },
//     { name: "Creative Template", component: <Template3 data={resumeData} /> },
//     { name: "Professional Template", component: <Template4 data={resumeData} /> },
//   ];

//   return (
//     <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
//       <Typography variant="h4" gutterBottom align="center">
//         Choose Your Resume Template
//       </Typography>
//       {templates.map((template, index) => (
//         <Accordion key={index} expanded={expandedPanel === `panel${index}`} onChange={handleChange(`panel${index}`)}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel${index}bh-content`}
//             id={`panel${index}bh-header`}
//           >
//             <Typography>{template.name}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>{template.component}</AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// };

// export default Resume;


import React from 'react';
import { Box, Typography, Button, Stack, Paper,Grid2 } from '@mui/material';
import Template1 from '../resumeTemplates/Template1';
import Template2 from '../resumeTemplates/Template2';
import Template3 from '../resumeTemplates/Template3';
import Template4 from '../resumeTemplates/Template4';
import useResumeStore from '../../app/ResumeStore';
import image from "../../assets/favicon.png"

const ResumeTemplates = () => {
  const resumeData = useResumeStore();
  const fnln = resumeData.resume.personalDetails.firstName + resumeData.resume.personalDetails.lastName;

  const templates = [
    {
      name: 'Classic Template',
      component: <Template1 data={resumeData.resume}/>,
      url: `http://localhost:5137/${fnln}/template1`,
      image: '../../assets/favicon.png'
    },
    // {
    //   name: 'Modern Template',
    //   component: <Template2 data={resumeData.resume}/>,
    //   url: `http://localhost:5137/${fnln}/template1`,
    //   image: '../../../favicon.png'

    // },
    // {
    //   name: 'Creative Template',
    //   component: <Template3 data={resumeData.resume}/>,
    //   url: `http://localhost:5137/${fnln}/template3`,
    //   image: '../../../../favicon.png'
    // },
    // {
    //   name: 'Professional Template',
    //   component: <Template4 data={resumeData.resume}/>,
    //   url: `http://localhost:5137/${fnln}/template4`,
    //   image: '../../../../favicon.png'
    // }
  ];
  return (
    <img src={image} alt="hhhhello"/>
  )
}  
//   return (
//     // <Box maxWidth="lg" mx="auto" my={8}>
//     <img src="../../assets/favicon.png/> )

//     // <Typography variant="h4" align="center" gutterBottom>
//       {/* // Choose Your Resume Template */}
//     {/* // </Typography> */}
//     {/* // <Grid2 container spacing={4}> */}
//       {/* {templates.slice(0, 2).map((template, index) => (
//         <Grid2 item xs={6} key={index}>
//           <Paper
//             elevation={3}
//             sx={{
//               position: 'relative',
//               overflow: 'hidden',
//               '&:hover .template-button': {
//                 opacity: 1
//               }
//             }}
//           >
//             <img src={template.image} alt={template.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
//             <Box
//               className="template-button"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                 color: 'white',
//                 padding: '1rem',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 opacity: 0,
//                 transition: 'opacity 0.3s ease-in-out'
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => window.open(template.url, '_blank')}
//                 fullWidth
//               >
//                 Use This Template
//               </Button>
//             </Box>
//           </Paper>
//         </Grid2>
//       ))}
//       {templates.slice(2).map((template, index) => (
//         <Grid2 item xs={6} key={index + 2}>
//           <Paper
//             elevation={3}
//             sx={{
//               position: 'relative',
//               overflow: 'hidden',
//               '&:hover .template-button': {
//                 opacity: 1
//               }
//             }}
//           >
//             <img src={template.image} alt={template.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
//             <Box
//               className="template-button"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                 color: 'white',
//                 padding: '1rem',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 opacity: 0,
//                 transition: 'opacity 0.3s ease-in-out'
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => window.open(template.url, '_blank')}
//                 fullWidth
//               >
//                 Use This Template
//               </Button>
//             </Box>
//           </Paper>
//         </Grid2>
//       ))} */}
//      {/* </Grid2> */}
//    {/* </Box> */}
//    {/* ) */}
// };

export default ResumeTemplates;
