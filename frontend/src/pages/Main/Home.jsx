import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  Paper,
  Fade,
  Grow,
  Grid,
} from "@mui/material";
import { CheckCircleOutline, FormatListBulleted, GetApp, KeyboardArrowDown } from "@mui/icons-material";
import PersonalDetails from "./PersonalDetails";
import temp1 from "../../assets/template-1.svg";
import temp2 from "../../assets/ats-friendly-Combined-Resume-Template.png";
import temp3 from "../../assets/temp3.webp";
import temp4 from "../../assets/template-2.png";

const Home = () => {
  const [currentStep, setCurrentStep] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const templates = [
    {
      id: 1,
      name: "Classic",
      imageUrl: temp1,
    },
    {
      id: 2,
      name: "Professional",
      imageUrl: temp2,
    },
    {
      id: 3,
      name: "Creative",
      imageUrl: temp3,
    },
    {
      id: 4,
      name: "Modern",
      imageUrl: temp4,
    },
  ];

  const handleCreateResume = () => {
    setCurrentStep("Step1");
  };

  const scrollToSteps = () => {
    const stepsSection = document.getElementById('steps-section');
    if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {currentStep === "Step1" ? (
        <PersonalDetails />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              textAlign: "center",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              padding: 4,
            }}
          >
            <Fade in={true} timeout={1000}>
              <Typography variant="h3" fontWeight="bold" mb={2}>
                Create Your Professional Resume
              </Typography>
            </Fade>
            <Fade in={true} timeout={1500}>
              <Typography variant="h5" mb={4}>
                Stand out from the crowd with a beautifully crafted resume
              </Typography>
            </Fade>
            <Grow in={true} timeout={2000}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateResume}
                sx={{
                  paddingX: 4,
                  paddingY: 2,
                  fontSize: "1.2rem",
                  borderRadius: "10px",
                  backgroundColor: "#4CAF50",
                  '&:hover': {
                    backgroundColor: "#45a049",
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                Create Resume Now
              </Button>
            </Grow>
            <Box sx={{ mt: 4, cursor: "pointer" }} onClick={scrollToSteps}>
              <Typography variant="body1" mb={1}>
                Discover Our 3-Step Process
              </Typography>
              <KeyboardArrowDown sx={{ fontSize: 40, animation: 'bounce 2s infinite' }} />
            </Box>
          </Box>

          <Box
            id="steps-section"
            sx={{
              width: "100%",
              maxWidth: "800px",
              margin: "2rem auto",
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Fade in={scrolled} timeout={1000}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
                Follow 3 Easy Steps:
              </Typography>
            </Fade>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Step 1 */}
              <Grow in={scrolled} timeout={1500}>
                <Card
                  sx={{
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <FormatListBulleted sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }} />
                  <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
                    Step 1
                  </Typography>
                  <Typography variant="body1">
                    Provide the following details to create your resume:
                  </Typography>
                  <ul style={{ marginTop: "1rem", textAlign: "left", paddingLeft: "1.5rem" }}>
                    <li>Personal Details</li>
                    <li>Brief Description</li>
                    <li>Work Experience</li>
                    <li>Education</li>
                    <li>Projects</li>
                    <li>Skills</li>
                    <li>Achievements & Certificates</li>
                    <li>Extra-Curricular Activities</li>
                  </ul>
                </Card>
              </Grow>

              {/* Step 2 */}
              <Grow in={scrolled} timeout={2000}>
                <Card
                  sx={{
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CheckCircleOutline sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }} />
                  <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
                    Step 2
                  </Typography>
                  <Typography variant="body1">
                    Pick from our wide variety of visually appealing templates below:
                  </Typography>
                  <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    {templates.map((template) => (
                      <Grid item xs={12} sm={6} key={template.id}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "100%",
                            boxShadow: 3,
                            borderRadius: "10px",
                            transition: "all 0.3s ease-in-out",
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: 6,
                            },
                          }}
                        >
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.name}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: 8,
                              marginBottom: 2,
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, marginBottom: 1 }}
                          >
                            {template.name}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grow>

              {/* Step 3 */}
              <Grow in={scrolled} timeout={2500}>
                <Card
                  sx={{
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    transition: "all 0.3s ease-in-out",
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <GetApp sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }} />
                  <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
                    Step 3
                  </Typography>
                  <Typography variant="body1">
                    Once your resume is ready, download it as a PDF or share a direct link with
                    employers or friends.
                  </Typography>
                </Card>
              </Grow>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;