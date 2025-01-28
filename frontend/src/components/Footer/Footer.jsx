import React from "react";
import { Box, Typography, Link, Container, Grid2 } from "@mui/material";
import Logo from "../../pages/Logo/Logo";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        py: 2, // Further reduced vertical padding
        mt: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={1} justifyContent="space-between">
          {/* Logo and Description */}
          <Grid2 item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <Logo size={18} />
              <Typography
                variant="h6"
                color="text.primary"
                ml={1}
                sx={{ fontSize: "1rem" }} // Smaller font size
              >
                ResumeBuilder
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
              Create professional resumes with ease.
            </Typography>
          </Grid2>

          {/* Legal Section */}
          <Grid2 item xs={12} sm={6}>
            <Typography variant="h6" color="text.primary" sx={{ fontSize: "1rem" }} gutterBottom>
              Legal
            </Typography>
            {["Privacy Policy", "Terms of Service"].map((text, index) => (
              <Link key={index} href="#" color="inherit" display="block" sx={{ fontSize: "0.85rem" }}>
                {text}
              </Link>
            ))}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
