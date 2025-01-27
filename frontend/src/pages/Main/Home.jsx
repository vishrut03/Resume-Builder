import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
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
    <>
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
          maxWidth: "800px",
          margin: "2rem auto",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
          Follow 3 Easy Steps:
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Step 1 */}
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
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

          {/* Step 2 */}
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: 60, color: "#4caf50", marginBottom: 1 }} />
            <Typography variant="h5" fontWeight="bold" color="secondary" mb={1}>
              Step 2
            </Typography>
            <Typography variant="body1">
              Pick from our wide variety of visually appealing templates below:
            </Typography>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {templates.map((template) => (
                <Paper
                  key={template.id}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "300px",
                    boxShadow: 3,
                    borderRadius: "10px",
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
                  <Button variant="contained" color="primary">
                    Use this Template
                  </Button>
                </Paper>
              ))}
            </Box>
          </Card>

          {/* Step 3 */}
          <Card
            sx={{
              padding: 3,
              boxShadow: 3,
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              textAlign: "center",
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
        </Box>
      </Box>
    </>
  );
};

export default Home;