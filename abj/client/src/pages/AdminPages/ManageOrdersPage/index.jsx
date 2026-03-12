import React from "react";
import { Box, Paper, Chip } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import AdminPageOptions from "../../../components/inputs/AdminPageOptionsInputs/index.jsx";
import "./manageOrders.css"; 

const ManageOrdersPageQuery = graphql`
  query ManageOrdersPageQuery {
    myOrders {
      id
      status
      totalPrice
      customer {
        id
        username
      }
    }
  }
`;

export default function ManageOrdersPage() {
  const data = useLazyLoadQuery(ManageOrdersPageQuery, {});

  // Aligning with the 'myOrders' field from the query
  const orders = (data?.myOrders || []).filter(o => o !== null).map(o => ({
    ...o,
    customerName: o.customer?.username || 'Unknown'
  }));

  const orderColumns = [
    { label: "Customer", key: "customerName" },
    { label: "Total Price", key: "totalPrice", render: (row) => `$${row.totalPrice}` },
    { 
      label: "Status", 
      key: "status",
      render: (row) => (
        <Chip 
          label={row.status} 
          sx={{ 
            bgcolor: row.status === 'COMPLETED' ? 'success.main' : 'warning.main',
            color: 'white',
            fontWeight: 'bold'
          }} 
        />
      )
    },
  ];

  return (
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block">
          <AdminPageOptions
            title="Order Management"
            data={orders}
            columns={orderColumns}
          />
        </Paper>
      </Box>
    </div>
  );
}