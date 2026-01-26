import React from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import "./manageRestaurants.css";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";

const ManageRestaurantsPageQuery = graphql`
  query ManageRestaurantsPageQuery {
    restaurants {
      id
      name
      category   
      location
      contactInfo
      hours
      images
      menuItems {
        id
        name
        price
        category
        inStock
      }
      combos {
        id
        title
        menuItems {
          id
          name
          price
        }
      }
      ratings {
        id
        emoji
        ratingText
        user {
          id
          username
        }
      }
    }
  }
`;
export default function ManageRestaurantsPage() {
  const data = useLazyLoadQuery(ManageRestaurantsPageQuery, {});
  const mongoMenu = (data?.restaurants || []).filter(item => item !== null);  
  const restaurantColumns = [
    { label: "Restaurant Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Location", key: "location" },
    { label: "Hours", key: "hours" },
  ];
  console.log("Relay Data:", data);
  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="restaurantAdmin-paper-block">
          <AdminPageOptions
            title="Restaurant Management"
            data={mongoMenu}
            columns={restaurantColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}
