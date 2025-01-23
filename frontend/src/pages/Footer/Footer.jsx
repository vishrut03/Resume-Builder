import React from "react"
import { Box, Typography, Link, Container, Grid2 } from "@mui/material"
import Logo from '../Logo/Logo'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        p: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={4} justifyContent="space-evenly">
          <Grid2 item xs={12} sm={4}>
            <Box className="flex items-center mb-4">
              <Logo size={24} />
              <Typography variant="h6" color="text.primary" className="ml-2">
                ResumeBuilder
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Create professional resumes with ease.
            </Typography>
          </Grid2>
          <Grid2 item xs={6} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" display="block">
              Templates
            </Link>
            <Link href="#" color="inherit" display="block">
              About
            </Link>
            <Link href="#" color="inherit" display="block">
              Contact
            </Link>
          </Grid2>
          <Grid2 item xs={6} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" display="block">
              Terms of Service
            </Link>
          </Grid2>
        </Grid2>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://resumebuilder.com/">
              ResumeBuilder
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer


