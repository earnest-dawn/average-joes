import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import { useNavigate } from "react-router-dom";
import rootShouldForwardProp from "@mui/material/styles/rootShouldForwardProp";

const AdminOptions = [
  {
    title: "Manage Menu Options",
    description: "Add, edit, or remove menu items, categories, and prices.",
    icon: <FoodBankIcon sx={{ fontSize: 40, color: 'goldenrod' }} />,
    path: "/manageMenu",
  },
  {
    title: "Manage Combos",
    description: "Add, edit, or remove combo options.",
    icon: <FoodBankIcon sx={{ fontSize: 40, color: 'goldenrod' }} />,
    path: "/manageCombos",
  },
  {
    title: "Manage Restaurants",
    description: "Add, edit, or remove restaurants.",
    icon: <FoodBankIcon sx={{ fontSize: 40, color: 'goldenrod' }} />,
    path: "/manageRestaurants",
  }
];

export default function About() {
  return (
    <div id="wholeAbout">
      <Box className="about-content-container">
        <Paper className="about-paper-block">
          {AdminOptions.map((option) => (
            <Box className="about-section-spacing">
            <Paper className="about-paper-caption">
              <ListItem>
                <Typography variant="body1" className="aboutCaptions">
                  {option.icon}
                  <strong>{option.title}</strong>
                  <br />
                  {option.description}
                  {option.path && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={option.path}
                    >
                      Manage
                    </Button> )}
                </Typography>
              </ListItem>
            </Paper>
          </Box>
          ))}
          
        </Paper>
      </Box>
    </div>
  );
}
