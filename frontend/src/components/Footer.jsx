import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "absolute", // Keep the footer at the bottom
        bottom: 0,
        width: "100%", // Span the full width of the page
        textAlign: "center", // Center-align text
        backgroundColor: "#e0e0e0", // Light gray background
        color: "#000000", // Black text
        padding: "10px 0", // Padding for aesthetics
      }}
    >
      <Typography variant="body2">
        © 2025 Resume Builder | Contact Us
      </Typography>
    </Box>
  );
};

export default Footer;
