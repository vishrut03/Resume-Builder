import React from 'react';
import Header from './pages/Navbar/Header';
import Form from './pages/Main/Form';
import Footer from './pages/Footer/Footer'
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/resumeTemplates/Template'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
          <Header />
          <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "92.8vh"
          }}
          >
          <Box component="main" sx={{ flexGrow: 1 }}>
              <Form />
            </Box>
            <Footer />
          </Box>
        </>
        } />
      <Route path="/:name/template/:tname" element={<Template/>} />
      
      </Routes>
      <ToastContainer /> 
    </BrowserRouter>
  );
}
