import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button"; // For logout button
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

// Material-UI components specific to the TemporaryDrawer
import TemporaryDrawer from "./DrawerInputs.jsx"; // TemporaryDrawer component
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider"; // For drawer divider

// Material-UI Icons for TemporaryDrawer navigation
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink, useNavigate } from "react-router-dom"; 
import Auth from "../../../utils/auth"; 
import averageLogo from "../../../assets/images/averageLogo.png"; 

import "./Navbar.css"; 

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false); 
  const [isLoggedIn, setIsLoggedIn] = React.useState(Auth.loggedIn()); 

  
  React.useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(Auth.loggedIn());
    };
    
    checkLoginStatus();
  }, []);

  
  const handleLogout = () => {
    Auth.logout(); 
    setIsLoggedIn(false); 
    navigate("/"); 
  };

  
  const toggleDrawer = (anchor, open) => (event) => {
    
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileOpen(open); 
  };

  
  const navItems = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: 'Admin', path: '/admin', icon: <WorkOutlineIcon /> },
    { text: "Order Online", path: "/orderOnline", icon: <FastfoodIcon /> },
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
      {/* Logo and Title in TemporaryDrawer Header */}
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ my: 2 }}
      >
        <img
          src={averageLogo}
          alt="Logo"
          height={"70"}
          width="200"
          style={{ display: "block", margin: "0 auto" }}
        />
      </Typography>
      <Divider sx={{ bgcolor: "goldenrod" }} /> {/* Styled divider */}
      {/* Main Navigation List */}
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleDrawerNavLinkClick(item.path)}
              sx={{ "&:hover": { bgcolor: "#333" } }}
            >
              <ListItemIcon sx={{ color: "goldenrod" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Login/Logout Conditional Item in TemporaryDrawer */}
        <ListItem disablePadding>
          {isLoggedIn ? (
            <ListItemButton
              onClick={handleLogout}
              sx={{ "&:hover": { bgcolor: "#333" } }}
            >
              <ListItemIcon sx={{ color: "goldenrod" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => handleDrawerNavLinkClick("/login")}
              sx={{ "&:hover": { bgcolor: "#333" } }}
            >
              <ListItemIcon sx={{ color: "goldenrod" }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: "white" }} />
            </ListItemButton>
          )}
        </ListItem>
      </List>
      <Divider
        sx={{
          bgcolor: "goldenrod",
          height: "2px",
          opacity: 1,
          my: 2,
          flexShrink: 0,
        }}
      />{" "}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Toolbar>
          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={toggleDrawer("left", true)} 
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
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
                alt="Average Joe's Burger Joint Logo"
                height={"70"}
                width="auto"
                style={{ display: "block", marginRight: "8px" }}
                id="averageLogo"
              />
            </NavLink>
          </Typography>

          {/* Desktop Navigation, Search, and Logout Button */}
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {/* Search Bar */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            {/* Desktop Navigation Links */}
            <ul
              className="navigation-menu"
              style={{
                display: "flex",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ marginLeft: "20px" }}>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li style={{ marginLeft: "20px" }}>
                <NavLink
                  to={"/admin"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Admin
                </NavLink>
              </li>
              <li style={{ marginLeft: "20px" }}>
                <NavLink
                  to={"/orderOnline"}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Order Online
                </NavLink>
              </li>
              
              <li style={{ marginLeft: "20px" }}>
                {isLoggedIn ? (
                  <div> 
                    <NavLink>Cart ()</NavLink>
                    <Button
                    onClick={handleLogout}
                    sx={{
                      color: "goldenrod",
                      textTransform: "none",
                      minWidth: "auto",
                      padding: "6px 8px",
                    }}
                  >
                    Logout
                  </Button></div>
                 
                ) : (
                  <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Temporary TemporaryDrawer for Mobile (rendered directly here) */}
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
      </TemporaryDrawer>
    </Box>
  );
}
