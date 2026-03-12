import React from "react";
import { Box, Paper, Button} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { ToggleStockStatusMutation } from "../../../utils/mutations/mutations";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";
import "./manageMenu.css"; // Reusing the same CSS for consistent layout

const ManageMenuPageQuery = graphql`
  query ManageMenuPageQuery {
    menuItems {
      id
      name
      price
      inStock
      category
    }
  }
`;


export default function ManageMenuPage() {
  const data = useLazyLoadQuery(ManageMenuPageQuery, {});
  const [commitToggle] = useMutation(ToggleStockStatusMutation);

  const menuItems = (data?.menuItems || []).filter(item => item !== null);

  const handleToggle = (id, currentStatus) => {
    commitToggle({
      variables: {
        input: { 
          id: String(id), 
          inStock: !currentStatus, 
          clientMutationId: `toggle-${id}` 
        },
      },
      // Relay will automatically update the UI if the id and inStock fields 
      // are returned in the mutation response
    });
  };

  const menuColumns = [
  { label: "Item Name", key: "name" },
  { label: "Price", key: "price" },
  { label: "Category", key: "category" },
  { 
    label: "Status", 
    key: "inStock", // Use the actual data key here
    render: (rowData) => (
      <Button
        variant="contained"
        size="small"
        color={rowData.inStock ? "success" : "error"}
        onClick={() => handleToggle(rowData.id, rowData.inStock)}
        sx={{ textTransform: 'none', minWidth: '120px' }}
      >
        {rowData.inStock ? "In Stock" : "Out of Stock"}
      </Button>
    )
  },
];

  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block">
          <AdminPageOptions
            title="Menu Management"
            data={menuItems}
            columns={menuColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}