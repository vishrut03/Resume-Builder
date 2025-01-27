import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid2,
  Paper,
} from "@mui/material";
import { CheckCircleOutline, FormatListBulleted, GetApp } from "@mui/icons-material";
import PersonalDetails from "./PersonalDetails";
import temp1 from "../../assets/template-1.svg";
import temp2 from "../../assets/ats-friendly-Combined-Resume-Template.png";
import temp3 from "../../assets/temp3.webp";
import temp4 from "../../assets/template-2.png";

const Home = () => {
  const [currentStep, setCurrentStep] = useState("Home");
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

  return (
    <React.Fragment>
      {currentStep === "Step1" ? (
        <PersonalDetails />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            backgroundColor: "#f5f7fa",
            padding: 4,
          }}
        >
          <Typography variant="h3" fontWeight="bold" mb={2} color="primary">
            Create Your Professional Resume
          </Typography>
          <Typography variant="body1" mb={4}>
            Stand out from the crowd with a beautifully crafted resume
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={handleCreateResume}
            sx={{ paddingX: 4, paddingY: 2, fontSize: "1rem", borderRadius: "10px" }}
          >
            Create Resume
          </Button>
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Content inside the Box */}
      </Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
          Follow 3 Easy Steps:
        </Typography>

        {/* Step 1 */}
        <Card
          sx={{
            padding: 3,
            marginBottom: 3,
            boxShadow: 3,
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item xs={12} sm={3} textAlign="center">
              <FormatListBulleted
                sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }}
              />
              <Typography variant="h5" fontWeight="bold" color="secondary">
                Step 1
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={9}>
              <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
                Fill in Your Details
              </Typography>
              <Typography variant="body1">
                Provide the following details to create your resume:
              </Typography>
              <ul style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
                <li>Personal Details</li>
                <li>Brief Description</li>
                <li>Work Experience</li>
                <li>Education</li>
                <li>Projects</li>
                <li>Skills</li>
                <li>Achievements & Certificates</li>
                <li>Extra-Curricular Activities</li>
              </ul>
            </Grid2>
          </Grid2>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 4, marginTop: 2 }}>
          Choose a template
        </Typography>
        {/* Template rows */}
        {[templates.slice(0, 2), templates.slice(2)].map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            {row.map((template) => (
              <Paper
                key={template.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={template.imageUrl || "/placeholder.svg"}
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
        ))}

        {/* Step 3 */}
        <Card
          sx={{
            padding: 3,
            boxShadow: 3,
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item xs={12} sm={3} textAlign="center">
              <GetApp sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="secondary">
                Step 3
              </Typography>
            </Grid2>
            <Grid2 item xs={12} sm={9}>
              <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
                Download or Share
              </Typography>
              <Typography variant="body1">
                Once your resume is ready, download it as a PDF or share a direct link with
                employers or friends.
              </Typography>
            </Grid2>
          </Grid2>
        </Card>
      </Box>
      </React.Fragment>
    );
};

export default Home;