import React from "react";
import { Box, Typography, Paper, Button, Link, Grid } from "@mui/material";
import {
  Mail,
  Phone,
  LinkedIn,
  GitHub,
  DownloadForOffline,
} from "@mui/icons-material";
import html2pdf from "html2pdf.js";
import useResumeStore from "../../app/ResumeStore";

const Template4 = () => {
  const data = useResumeStore().resume;

  const handleDownload = () => {
    const element = document.getElementById("template4");
    html2pdf(element, { filename: "resume.pdf" });
  };

  const filterEmptySections = (section) =>
    section?.filter(
      (item) =>
        Object.values(item).some((value) => value && value.trim() !== "")
    );

  return (
    <>
      {/* Download Button */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          endIcon={<DownloadForOffline />}
          sx={{ mt: 2 }}
        >
          Download
        </Button>
      </Box>

      {/* Resume Template */}
      <Paper id="template4" elevation={3} sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header Section */}
        <Box
          sx={{
            bgcolor: "#1e2a3a",
            color: "white",
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {data.personalDetails.firstName} {data.personalDetails.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: "#cbd5e1" }}>
                {data.briefDescription}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  alignItems: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail sx={{ color: "#94a3b8" }} />
                  <Typography>{data.personalDetails.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ color: "#94a3b8" }} />
                  <Typography>{data.personalDetails.phoneNumber}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LinkedIn sx={{ color: "#94a3b8" }} />
                  <Link
                    href={data.personalDetails.linkedIn}
                    target="_blank"
                    color="inherit"
                    underline="hover"
                  >
                    LinkedIn
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Content Section */}
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              {/* Education */}
              {filterEmptySections(data.education).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    EDUCATION
                  </Typography>
                  {filterEmptySections(data.education).map((edu, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6">{edu.degreeName}</Typography>
                      <Typography variant="subtitle1" sx={{ color: "#64748b" }}>
                        {edu.institutionName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        {edu.yearOfGraduation} | CGPA: {edu.cgpa}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}


              {/* Work Experience */}
              {filterEmptySections(data.workExperience).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    WORK EXPERIENCE
                  </Typography>
                  {filterEmptySections(data.workExperience).map((exp, index) => (
                    <Box key={index} sx={{ mb: 4, pl: 4 }}>
                      <Typography variant="h6" sx={{ color: "#1e2a3a" }}>
                        {exp.jobTitle}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "#64748b", mb: 1 }}>
                        {exp.companyName} | {exp.startDate} - {exp.endDate}
                      </Typography>
                      <Typography variant="body1">{exp.responsibilities}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Projects */}
              {filterEmptySections(data.projects).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    PROJECTS
                  </Typography>
                  {filterEmptySections(data.projects).map((project, index) => (
                    <Box key={index} sx={{ mb: 4, pl: 4 }}>
                      <Typography variant="h6">{project.projectName}</Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>{project.description}</Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Technologies: {project.technologiesUsed}
                      </Typography>
                      {project.link && (
                        <Link href={project.link} target="_blank" sx={{ mt: 0.5, display: "block" }}>
                          Project Link
                        </Link>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* Coding Profiles */}
              {/* Coding Profiles */}
            {data.codingProfiles && data.codingProfiles.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    pb: 1,
                    borderBottom: "2px solid #1e2a3a",
                  }}
                >
                  CODING PROFILES
                </Typography>
                {data.codingProfiles.map((profile, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bold",
                        color: "#1e2a3a",
                      }}
                    >
                      {profile.platform}
                    </Typography>
                    <Link
                      href={profile.profileLink}
                      target="_blank"
                      underline="hover"
                      sx={{
                        fontSize: "0.875rem",
                        color: "#64748b",
                        wordBreak: "break-word",
                      }}
                    >
                      {profile.profileLink}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}

            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Skills */}
              {data.skills.length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    SKILLS
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {data.skills.map((skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          bgcolor: "#f1f5f9",
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          fontSize: "0.875rem",
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Custom Section */}
              {data.customDetails.heading && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    {data.customDetails.heading}
                  </Typography>
                  <Typography variant="body1" sx={{ pl: 4 }}>
                    {data.customDetails.description}
                  </Typography>
                </Box>
              )}

              {/* Extracurricular Activities */}
              {filterEmptySections(data.extracurricularActivities).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, pb: 1, borderBottom: "2px solid #1e2a3a" }}>
                    EXTRACURRICULAR ACTIVITIES
                  </Typography>
                  {filterEmptySections(data.extracurricularActivities).map((activity, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6">{activity.activityName}</Typography>
                      <Typography variant="body1">{activity.description}</Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        {activity.achievements}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Certificates */}
              {filterEmptySections(data.certificates).length > 0 && (
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      pb: 1,
                      borderBottom: "2px solid #1e2a3a",
                    }}
                  >
                    CERTIFICATES
                  </Typography>
                  {filterEmptySections(data.certificates).map((certificate, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6">{certificate.certificateName}</Typography>
                      <Typography variant="subtitle1" sx={{ color: "#64748b" }}>
                        {certificate.organization}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        {certificate.date}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Template4;
