import { Box, Button, Grid2, Paper, Typography } from "@mui/material"
import useResumeStore from "../../app/ResumeStore"
import Image from '../../assets/favicon.png';
import temp1 from '../../assets/template-1.svg';

function Resume() {
  const templates = [
    {
      id: 1,
      name: "Classic",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%205.39.08%E2%80%AFPM-cQ2dm7UXWfTMN8ixcWicLjsh4HT8KE.png",
    },
    {
      id: 2,
      name: "Modern",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%205.39.01%E2%80%AFPM-UHnsnlYsbriAK9lVKCzs5brAe4LLOZ.png",
    },
    {
      id: 3,
      name: "Creative",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%205.39.08%E2%80%AFPM-cQ2dm7UXWfTMN8ixcWicLjsh4HT8KE.png", // Using first image as placeholder
    },
    {
      id: 4,
      name: "Proffesional",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-23%20at%205.39.01%E2%80%AFPM-UHnsnlYsbriAK9lVKCzs5brAe4LLOZ.png", // Using second image as placeholder
    },
  ]

  const handleTemplateClick = (templateId) => {
    const fullName=  useResumeStore().resume.personalDetails.firstName + useResumeStore().resume.personalDetails.lastName;
    const url = `http://localhost:5173/${fullName}/template${templateId}`;
    console.log(url);

    window.open(url, "_blank");
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 4 }}>
        Choose a template
      </Typography>
      <Grid2 container spacing={2} justifyContent="center" sx={{ textAlign: 'center' }}>
        {templates.map((template) => (
          <Grid2 item xs={12} sm={6} key={template.id}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&:hover img': {
                  filter: 'blur(3px)',
                  transition: 'filter 0.3s',
                },
                '&:hover .hoverButton': {
                  opacity: 1,
                  transform: 'translate(-50%, -50%)',
                },
              }}
            >
              <img
                src={temp1}
                alt={template.name}
                style={{ width: '100%', height: 'auto', borderRadius: 8, marginBottom: 2 }}
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
                onClick={()=>handleTemplateClick(template.id)}
              >
                Use this template
              </Button>
              <Typography variant="body1" sx={{ fontWeight: 600, marginTop: 2 }}>
                {template.name}
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default Resume;

