import React from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import "./manageCombos.css";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";

const ManageCombosPageQuery = graphql`
  query ManageCombosPageQuery {
    combos {
        id
        title
        menuItems {
          id
          name
          ingredients
          calories
          price
          caption
          images
          
        }
  }
}
`;
export default function ManageCombosPage() {
  const data = useLazyLoadQuery(ManageCombosPageQuery, {});
  const mongoMenu = (data?.combos || []).filter(item => item !== null);  
  const comboColumns = [
    { label: "Combo Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Price", key: "price" },
    { label: "Calories", key: "calories" },
  ];
  console.log("Relay Data:", data);
  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="comboAdmin-paper-block">
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
