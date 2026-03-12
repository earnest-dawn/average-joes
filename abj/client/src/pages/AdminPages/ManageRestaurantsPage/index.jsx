import React from "react";
import { Box, Paper, Chip } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";
import "./manageRestaurants.css";

const ManageRestaurantsPageQuery = graphql`
  query ManageRestaurantsPageQuery {
    allRestaurants {
      id
      name
      category
      location
      isVerified
    }
  }
`;

export default function ManageRestaurantsPage() {
  const data = useLazyLoadQuery(ManageRestaurantsPageQuery, {});

  // Clean data and ensure it matches the 'allRestaurants' field name
  const restaurantList = (data?.allRestaurants || []).filter(res => res !== null);

  const restaurantColumns = [
    { label: "Restaurant Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Location", key: "location" },
    { 
      label: "Verification Status", 
      key: "isVerified",
      render: (row) => (
        <Chip 
          label={row.isVerified ? "Verified" : "Pending"} 
          color={row.isVerified ? "success" : "default"}
          variant="outlined"
          size="small"
        />
      )
    },
  ];

  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block">
          <AdminPageOptions
            title="Restaurant Management"
            data={restaurantList}
            columns={restaurantColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}