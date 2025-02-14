import {React, useState} from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useTheme,
  Button,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Logo from '../../pages/Logo/Logo'
import Cookie from "js-cookie"

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export default function Header() {
  const theme = useTheme()
  const [token, setToken] = useState(Cookie.get("token"));

  const handleSignOut = () => {
    Cookie.remove("token");
    localStorage.removeItem("currentStep");
    setToken(null);
    window.location.reload()
  }

  return (
    <StyledAppBar position="static">
      <Toolbar className="flex justify-between items-center px-4 py-2">
        <Box className="flex items-center">
          <Logo size={32} color={theme.palette.primary.contrastText} />
          <Typography variant="h6" component="div" className="ml-2 font-bold">
            ResumeBuilder
          </Typography>
        </Box>
        {token && (
          <Button
            onClick={handleSignOut}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              padding: "6px 16px",
              "&:hover": {
                background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
              },
            }}
          >
            Sign Out
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}
