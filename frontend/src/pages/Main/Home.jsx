"use client"

import { useState, useEffect } from "react"
import { Button, Typography, Box, Fade, Grow, Modal } from "@mui/material"
import { FormatListBulleted, KeyboardArrowDown } from "@mui/icons-material"
import PersonalDetails from "./PersonalDetails"
import Signin from "./Signin"
import Signup from './Signup'
import temp1 from "../../assets/template-1.svg"
import temp2 from "../../assets/ats-friendly-Combined-Resume-Template.png"
import temp3 from "../../assets/temp3.webp"
import temp4 from "../../assets/template-2.png"

const Home = () => {
  const [currentStep, setCurrentStep] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("signin")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const templates = [
    { id: 1, name: "Classic", imageUrl: temp1 },
    { id: 2, name: "Professional", imageUrl: temp2 },
    { id: 3, name: "Creative", imageUrl: temp3 },
    { id: 4, name: "Modern", imageUrl: temp4 },
  ]

  const handleCreateResume = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleSuccessfulAuth = () => {
    setIsAuthModalOpen(false)
    setCurrentStep("Step1")
  }

  const toggleAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const scrollToSteps = () => {
    const stepsSection = document.getElementById("steps-section")
    if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              backgroundColor: "#f0f4f8",
              color: "#1976D2",
              padding: 4,
            }}
          >
            <Fade in={true} timeout={1000}>
              <Typography variant="h2" fontWeight="bold" mb={3}>
                Create Your Professional Resume
              </Typography>
            </Fade>
            <Fade in={true} timeout={1500}>
              <Typography variant="h5" mb={5} color="#37474f">
                Stand out from the crowd with a beautifully crafted resume
              </Typography>
            </Fade>
            <Grow in={true} timeout={2200}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateResume}
                sx={{
                  paddingX: 6,
                  paddingY: 2,
                  fontSize: "1.2rem",
                  borderRadius: "50px",
                  backgroundColor: "#1976D2",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#1565C0",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                Create Resume Now
              </Button>
            </Grow>
            <Box sx={{ mt: 6, cursor: "pointer" }} onClick={scrollToSteps}>
              <Typography variant="body1" mb={2} color="#37474f">
                Discover Our 3-Step Process
              </Typography>
              <KeyboardArrowDown
                sx={{
                  fontSize: 40,
                  color: "#1976D2",
                  animation: "bounce 2s infinite",
                  "@keyframes bounce": {
                    "0%, 20%, 50%, 80%, 100%": {
                      transform: "translateY(0)",
                    },
                    "40%": {
                      transform: "translateY(-20px)",
                    },
                    "60%": {
                      transform: "translateY(-10px)",
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            id="steps-section"
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "4rem auto 0",
              padding: 4,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Fade in={scrolled} timeout={1000}>
              <Typography variant="h3" sx={{ mb: 6, fontWeight: "bold", textAlign: "center", color: "#1976D2" }}>
                Follow 3 Easy Steps:
              </Typography>
            </Fade>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, flexGrow: 1 }}>
              <Grow in={scrolled} timeout={1500}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#1976D2" mb={2}>
                    Step 1: Provide Details
                  </Typography>
                  <Typography variant="body1" color="#37474f">
                    Fill in your information to create your resume:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                    {[
                      "Personal Details",
                      "Brief Description",
                      "Work Experience",
                      "Education",
                      "Projects",
                      "Skills",
                      "Achievements",
                      "Certificates",
                      "Extra-Curricular Activities",
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: "#E3F2FD",
                          color: "#1976D2",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <FormatListBulleted fontSize="small" />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grow>

              <Grow in={scrolled} timeout={2000}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="#1976D2" mb={2}>
                    Step 2: Choose Template
                  </Typography>
                  <Typography variant="body1" color="#37474f" mb={2}>
                    Pick from our wide variety of visually appealing templates:
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {templates.slice(0, 2).map((template) => (
                        <Box
                          key={template.id}
                          sx={{
                            flex: 1,
                            p: 2,
                            bgcolor: "white",
                            borderRadius: 2,
                            boxShadow: 1,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.03)", boxShadow: 3 },
                          }}
                        >
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.name}
                            style={{ width: "100%", height: "auto", borderRadius: 8, marginBottom: 8 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#37474f", textAlign: "center" }}>
                            {template.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {templates.slice(2, 4).map((template) => (
                        <Box
                          key={template.id}
                          sx={{
                            flex: 1,
                            p: 2,
                            bgcolor: "white",
                            borderRadius: 2,
                            boxShadow: 1,
                            transition: "all 0.3s ease-in-out",
                            "&:hover": { transform: "scale(1.03)", boxShadow: 3 },
                          }}
                        >
                          <img
                            src={template.imageUrl || "/placeholder.svg"}
                            alt={template.name}
                            style={{ width: "100%", height: "auto", borderRadius: 8, marginBottom: 8 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#37474f", textAlign: "center" }}>
                            {template.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grow>

              <Grow in={scrolled} timeout={2500}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" fontWeight="bold" color="#1976D2" mb={2}>
                    Step 3: Download & Share
                  </Typography>
                  <Typography variant="body1" color="#37474f">
                    Once your resume is ready, download it as a PDF or share a direct link with employers or friends.
                  </Typography>
                </Box>
              </Grow>
            </Box>
          </Box>

          <Modal
            open={isAuthModalOpen}
            onClose={handleCloseAuthModal}
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              {authMode === "signin" ? (
                <Signin onSignUp={toggleAuthMode} onSuccessfulSignIn={handleSuccessfulAuth} />
              ) : (
                <Signup onSignIn={toggleAuthMode} onSuccessfulSignUp={handleSuccessfulAuth} />
              )}
            </Box>
          </Modal>
        </>
      )}
    </Box>
  )
}

export default Home

