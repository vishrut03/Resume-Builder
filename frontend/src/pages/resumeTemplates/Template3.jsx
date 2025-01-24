import React from "react"
import { Box, Typography, Paper, Grid2, Divider, Button } from "@mui/material"
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import html2pdf from "html2pdf.js"
import useResumeStore from "../../app/ResumeStore"

const Template3 = () => {
  const handleDownload = () => {
    const element = document.getElementById("template3")
    html2pdf(element)
  }

  const data = useResumeStore().resume

  const isNonEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.some((item) => isNonEmpty(item))
    }
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((val) => isNonEmpty(val))
    }
    return value && value.trim && value.trim().length > 0
  }

  return (
    <>
      <Button
      variant="contained"
      color="primary"
      onClick={handleDownload}
      endIcon={<DownloadForOfflineIcon />}
      sx={{
        mb: 2,
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      Download
    </Button>


      <Paper
        id="template3"
        elevation={3}
        sx={{
          maxWidth: 1200,
          mx: "auto",
          bgcolor: "#f8f9fa",
          overflow: "hidden",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            bgcolor: "#2c3e50",
            color: "white",
            p: 4,
            mb: 4,
          }}
        >
          <Typography variant="h3" gutterBottom>
            {data.personalDetails.firstName} {data.personalDetails.lastName}
          </Typography>
          <Typography variant="h5" sx={{ color: "#ecf0f1" }}>
            {data.briefDescription}
          </Typography>
          <Box sx={{ mt: 2, color: "#bdc3c7" }}>
            <Typography>{data.personalDetails.email}</Typography>
            <Typography>{data.personalDetails.phoneNumber}</Typography>
            <Typography>{data.personalDetails.linkedIn}</Typography>
          </Box>
        </Box>

        <Grid2 container spacing={4} sx={{ px: 4, pb: 4 }}>
          {/* Left Column */}
          <Grid2 item xs={12} md={4}>
            <Box
              sx={{
                borderRight: { md: "2px solid #e0e0e0" },
                pr: { md: 3 },
              }}
            >
              {/* Education Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    bgcolor: "#34495e",
                    color: "white",
                    p: 1,
                    mb: 2,
                  }}
                >
                  EDUCATION
                </Typography>
                {isNonEmpty(data.education) && data.education.map((edu, index) => (
                  isNonEmpty(edu) && (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {edu.degreeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.institutionName}
                    </Typography>
                    <Typography variant="body2">
                      {edu.startDate} - {edu.endDate?edu.endDate:'Present'} | CGPA: {edu.cgpa}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>)
                ))}
              </Box>

              {/* Work Experience Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: "2px solid #34495e",
                    pb: 1,
                    mb: 3,
                  }}
                >
                  WORK EXPERIENCE
                </Typography>
                {isNonEmpty(data.workExperience) && data.workExperience.map((exp, index) => (
                  isNonEmpty(exp) && (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography variant="h6" color="primary">
                      {exp.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "#7f8c8d", mb: 1 }}>
                      {exp.companyName} | {exp.startDate} - {exp.endDate}
                    </Typography>
                    <Typography variant="body1">{exp.responsibilities}</Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>)
                ))}
              </Box>

              {/* Skills Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    bgcolor: "#34495e",
                    color: "white",
                    p: 1,
                    mb: 2,
                  }}
                >
                  SKILLS
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  {data.skills.length>0 && data.skills.map((skill, index) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: "#ecf0f1",
                        p: 1,
                        borderRadius: 1,
                        fontSize: "0.875rem",
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Projects Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: "2px solid #34495e",
                    pb: 1,
                    mb: 3,
                  }}
                >
                  PROJECTS
                </Typography>
                {isNonEmpty(data.projects) && data.projects.map((project, index) => (
                  isNonEmpty(project) && (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {project.projectName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {project.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technologies: {project.technologiesUsed}
                    </Typography>
                    {project.link && (
                      <Typography variant="body2" color="primary">
                        Link: {project.link}
                      </Typography>
                    )}
                    <Divider sx={{ mt: 2 }} />
                  </Box>)
                ))}
              </Box>
            </Box>
          </Grid2>

          {/* Right Column */}
          <Grid2 item xs={12} md={8}>
            {/* Achievements Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  borderBottom: "2px solid #34495e",
                  pb: 1,
                  mb: 3,
                }}
              >
                ACHIEVEMENTS
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {data.achievements.length>0 && data.achievements.map((achievement, index) => (
                  <Box component="li" key={index} sx={{ mb: 1 }}>
                    <Typography variant="body1">{achievement}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Certificates Section */}
            {isNonEmpty(data.certificates) && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  bgcolor: "#34495e",
                  color: "white",
                  p: 1,
                  mb: 2,
                }}
              >
                CERTIFICATES
              </Typography>
              {data.certificates.map((cert, index) => (
                isNonEmpty(cert) && (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {cert.certificateName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cert.organization} - {cert.date}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>)
              ))}
            </Box>)}

            {/* Custom Profile Section */}
            {data.customDetails && data.customDetails.heading && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    bgcolor: "#34495e",
                    color: "white",
                    p: 1,
                    mb: 2,
                  }}
                >
                  {data.customDetails.heading}
                </Typography>
                <Typography variant="body2">{data.customDetails.description}</Typography>
              </Box>
            )}

            {/* Coding Profiles Section */}
            {isNonEmpty(data.codingProfiles) && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: "2px solid #34495e",
                    pb: 1,
                    mb: 3,
                  }}
                >
                  CODING PROFILES
                </Typography>
                {data.codingProfiles.map((profile, index) => (
                  isNonEmpty(profile) && (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {profile.platform}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profile.profileLink}
                    </Typography>
                  </Box>)
                ))}
              </Box>
            )}

            {/* Extracurricular Activities Section */}
            {isNonEmpty(data.extracurricularActivities) && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    borderBottom: "2px solid #34495e",
                    pb: 1,
                    mb: 3,
                  }}
                >
                  EXTRACURRICULAR ACTIVITIES
                </Typography>
                {data.extracurricularActivities.map((activity, index) => (
                  isNonEmpty(activity) && (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {activity.activityName}
                    </Typography>
                    {activity.description && <Typography variant="body2">{activity.description}</Typography>}
                    {activity.achievements && (<Typography variant="body2" color="text.secondary">
                      Achievements: {activity.achievements}
                    </Typography>)}
                    <Divider sx={{ mt: 2 }} />
                  </Box>)
                ))}
              </Box>
            )}
          </Grid2>
        </Grid2>
      </Paper>
    </>
  )
}

export default Template3
