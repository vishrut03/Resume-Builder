import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { styled } from "@mui/material/styles"
import Logo from '../Logo/Logo'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

const DrawerList = styled(List)({
  width: 250,
})

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  const menuItems = ["Home", "Templates", "About", "Contact"]

  const list = () => (
    <DrawerList role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {menuItems.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </DrawerList>
  )

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
          {isMobile ? (
            <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              {menuItems.map((item) => (
                <Button key={item} color="inherit" className="mx-2">
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

