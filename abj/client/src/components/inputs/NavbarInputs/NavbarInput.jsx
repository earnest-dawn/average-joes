import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import TemporaryDrawer from "./DrawerInputs";
import averageLogo from "../../../assets/images/averageLogo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": { width: "20ch" },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("id_token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setMobileOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Admin", path: "/admin", icon: <WorkOutlineIcon /> },
    {
      text: isLoggedIn ? "Order Online" : "Menu",
      path: "/orderOnline",
      icon: <FastfoodIcon />,
    },
  ];

  const handleDrawerNavLinkClick = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const drawerContent = (
    <Box
      sx={{
        textAlign: "center",
        width: 250,
        bgcolor: "black",
        color: "goldenrod",
        height: "100%",
      }}
      role="presentation"
    >
      <NavLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={averageLogo}
          alt="logo"
          height={"70"}
          width="auto"
          display="flex"
          id="averageLogo"
        />{" "}
      </NavLink>
      <Divider sx={{ bgcolor: "goldenrod" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleDrawerNavLinkClick(item.path)}>
              <ListItemIcon sx={{ color: "goldenrod" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {isLoggedIn ? (
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "goldenrod" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => handleDrawerNavLinkClick("/login")}>
              <ListItemIcon sx={{ color: "goldenrod" }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: "white" }} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              color: "goldenrod",
            }}
          >
            <NavLink
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={averageLogo}
                alt="logo"
                height={"70"}
                width="auto"
                display="flex"
                id="averageLogo"
              />{" "}
            </NavLink>
          </Typography>

          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box
              component="ul"
              sx={{
                display: "flex",
                listStyle: "none",
                m: 0,
                p: 0,
                alignItems: "center",
              }}
            >
              <Box component="li" sx={{ ml: 3 }}>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "goldenrod" : "white",
                    textDecoration: "none",
                  })}
                >
                  Home
                </NavLink>
              </Box>
              {isLoggedIn ? (
                <Box component="li" sx={{ ml: 3 }}>
                  <NavLink
                    to="/admin"
                    style={({ isActive }) => ({
                      color: isActive ? "goldenrod" : "white",
                      textDecoration: "none",
                    })}
                  >
                    Admin
                  </NavLink>
                </Box>
              ) : (
                <></>
              )}
              <Box component="li" sx={{ ml: 3 }}>
                <NavLink
                  to="/orderOnline"
                  style={({ isActive }) => ({
                    color: isActive ? "goldenrod" : "white",
                    textDecoration: "none",
                  })}
                >
                  {isLoggedIn ? "Order Online" : "Menu"}
                </NavLink>
              </Box>
              <Box component="li" sx={{ ml: 3 }}>
                {isLoggedIn ? (
                  <Button
                    onClick={handleLogout}
                    sx={{ color: "goldenrod", textTransform: "none" }}
                  >
                    Logout
                  </Button>
                ) : (
                  <NavLink
                    to="/login"
                    style={({ isActive }) => ({
                      color: isActive ? "goldenrod" : "white",
                      textDecoration: "none",
                    })}
                  >
                    Login
                  </NavLink>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <TemporaryDrawer
        state={{ left: mobileOpen }}
        toggleDrawer={toggleDrawer}
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer("left", false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            boxSizing: "border-box",
            width: 250,
            bgcolor: "black",
            color: "goldenrod",
          },
        }}
      >
        {drawerContent}
      </TemporaryDrawer>{" "}
    </Box>
  );
}
