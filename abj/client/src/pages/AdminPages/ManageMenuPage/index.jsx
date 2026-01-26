import React from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import "./manageMenu.css";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";

const ManageMenuPageQuery = graphql`
  query ManageMenuPageQuery {
    menuItems {
      id
      name
      ingredients
      calories
      price
      caption
      images
      category
      inStock
    }
  }
`;
export default function ManageMenuPage() {
  const data = useLazyLoadQuery(ManageMenuPageQuery, {});
  const mongoMenu = (data?.menuItems || []).filter(item => item !== null);  
  const menuColumns = [
    { label: "Item Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Price", key: "price" },
    { label: "Calories", key: "calories" },
  ];
  console.log("Relay Data:", data);
  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block">
          <AdminPageOptions
            title="Menu Management"
            data={mongoMenu}
            columns={menuColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}
