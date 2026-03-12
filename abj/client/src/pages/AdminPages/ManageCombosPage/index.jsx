import React from "react";
import { Box, Paper } from "@mui/material";
import "./manageCombos.css";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";

const ManageCombosPageQuery = graphql`
  query ManageCombosPageQuery {
    combos {
      id
      title
      price
      # Including these in case your AdminPageOptions needs them for the rows
      menuItems {
        id
        name
        calories
      }
    }
  }
`;

export default function ManageCombosPage() {
  const data = useLazyLoadQuery(ManageCombosPageQuery, {});
  
  // 1. Clean the data (Filter nulls)
  // 2. Map 'title' to 'name' so your table columns find the data
  const mongoMenu = (data?.combos || [])
    .filter(item => item !== null)
    .map(combo => ({
      ...combo,
      name: combo.title // This bridges the gap between your query and column key
    }));

  const comboColumns = [
    { label: "Combo Name", key: "name" }, // Matches the mapped 'name' above
    { label: "Price", key: "price" },
    // Category/Calories might need to come from the first menuItem if not on the combo itself
    { label: "Calories", key: "calories" }, 
  ];

  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block">
          <AdminPageOptions
            title="Combo Management"
            data={mongoMenu}
            columns={comboColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}