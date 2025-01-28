import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Logo from '../../pages/Logo/Logo'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}))


export default function Header() {

  const theme = useTheme()

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar className="flex justify-between items-center px-4 py-2">
          <Box className="flex items-center">
            <Logo size={32} color={theme.palette.primary.contrastText} />
            <Typography variant="h6" component="div" className="ml-2 font-bold">
              ResumeBuilder
            </Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}

