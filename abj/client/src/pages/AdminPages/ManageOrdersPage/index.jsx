import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Container,
  Paper,
  CardMedia,
  Stack
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  CheckCircleOutline,
  Timer as TimerIcon,
  Refresh as RefreshIcon,
  Inventory as InventoryIcon
} from "@mui/icons-material";
import "./manageOrders.css";
import Auth from "../../../utils/auth"


const ManageOrdersPageQuery = graphql`
  query ManageOrdersPageQuery {
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
      ...MenuItemsFragment
    }
    users {
      id
      username
    }
  }
`;

export default function ManageOrdersPage() {
  const data = useLazyLoadQuery(ManageOrdersPageQuery, {});
  const loggedIn = Auth.loggedIn();
  const [loading, setLoading] = useState(false);

  const mongoMenu = (data?.menuItems || []).filter((item) => item !== null);
  const [orders, setOrders] = useState(mongoMenu);
const handleAdd = (menuItem) => {
    console.log("Adding to cart:", menuItem.name);
    // Add logic here for actual cart management
  };
  const toggleStockStatus = (id) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, inStock: !order.inStock } : order
      )
    );
  };
  const handleMarkReady = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "success";
      case "In Prep":
        return "warning";
      case "Pending":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f4f7f6", minHeight: "100vh", pb: 10 }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              backgroundColor: "#1a2027",
              color: "#ffffff",
              fontWeight: 700,
              py: 3,
              borderRadius: 1,
              position: 'relative'
            }}
          >
            Order Management
          </Typography>
        </Box>
a
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            
          </Stack>

          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={3}>
              {orders.length === 0 ? (
                <Grid item xs={12}>
                  <Box sx={{ p: 8, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      All caught up!
                    </Typography>
                    <Typography color="text.disabled">No active orders to manage.</Typography>
                  </Box>
                </Grid>
              ) : (
                orders.map((order) => (
                  <Grid item xs={12} md={6} lg={4} key={order.id}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        border: "1px solid #e0e0e0", 
                        borderRadius: 3,
                        transition: '0.3s',
                        '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
                      }}
                    >
                      <CardHeader
                        action={<IconButton><MoreIcon /></IconButton>}
                        title={
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            Order ID: {order.id.slice(-6).toUpperCase()}
                          </Typography>
                        }
                        subheader={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                            <TimerIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{order.category}</Typography>
                          </Box>
                        }
                      />
                      
                      <CardMedia
                        component="img"
                        height="160"
                        image={`https://picsum.photos/seed/${order.id}/400/300`}
                        alt={order.name}
                      />

                      <CardContent sx={{ pt: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                          {order.name}
                        </Typography>
                        
                        <Paper 
                          variant="outlined" 
                          sx={{ 
                            p: 1.5, 
                            bgcolor: "#fafafa", 
                            mt: 1, 
                            borderRadius: 2,
                            borderStyle: 'dashed' 
                          }}
                        >
                          <Typography variant="caption" display="block" sx={{ mb: 0.5, fontWeight: 700, color: 'text.secondary' }}>
                            Ingredients:
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem', minHeight: '3em' }}>
                            {order.ingredients}
                          </Typography>
                        </Paper>

                        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                            ${order.price.toFixed(2)}
                          </Typography>
                          <Chip
                            label={order.inStock ? "In Stock" : "Out of Stock"}
                            color={order.inStock ? "success" : "error"}
                            onClick={() => toggleStockStatus(order.id)}
                            size="small"
                            sx={{ fontWeight: 700, borderRadius: 1, cursor: 'pointer' }}
                          />
                        </Box>
                      </CardContent>
                      
                      <Divider />
                      
                      <CardActions sx={{ justifyContent: "space-between", p: 2, bgcolor: '#fcfcfc' }}>
                        <Button
                          size="small"
                          startIcon={<InventoryIcon />}
                          onClick={() => toggleStockStatus(order.id)}
                          sx={{ textTransform: 'none' }}
                        >
                          Toggle Stock
                        </Button>
                        <Button 
                          size="small" 
                          variant="contained" 
                          color="success"
                          onClick={() => handleMarkReady(order.id)}
                          startIcon={<CheckCircleOutline />}
                          sx={{ borderRadius: 1.5, textTransform: 'none', fontWeight: 600 }}
                        >
                          Mark Ready
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}