import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Container,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ReceiptLong as OrdersIcon,
  RestaurantMenu as MenuIcon,
  LocationOn as MapIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  CheckCircleOutline,
  Timer as TimerIcon,
  LocalShipping,
} from "@mui/icons-material";
import "./manageOrders.css";

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

  const mongoMenu = (data?.menuItems || []).filter((item) => item !== null);
  const [orders, setOrders] = useState(mongoMenu);

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
    <div id="wholeAbout">
      <Box sx={{ m: 0 }}>
        <Paper className="menuAdmin-paper-block ">
          <Paper>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}
            >
              <Toolbar />
              <Container maxWidth="lg">
                {/* Header Section */}
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ fontWeight: 800 }}
                    >
                      Active Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage incoming kitchen requests and pickup status.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<LocalShipping />}
                    size="large"
                  >
                    Go Live at New Spot
                  </Button>
                </Box>

                {/* Orders Grid */}
                <Grid container spacing={3}>
                  {orders.map((order) => (
                    <Grid item xs={12} md={6} lg={4} key={order.id}>
                      <Card
                        elevation={0}
                        sx={{
                          border: "1px solid #e0e0e0",
                          position: "relative",
                        }}
                      >
                        {order.priority === "high" && (
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: "error.main",
                              width: "100%",
                            }}
                          />
                        )}
                        <CardHeader
                          action={
                            <IconButton aria-label="settings">
                              <MoreIcon />
                            </IconButton>
                          }
                          title={
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 700 }}
                            >
                              {order.id}
                            </Typography>
                          }
                          subheader={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              <TimerIcon sx={{ fontSize: 14 }} />
                              <Typography variant="caption">
                                {order.time}
                              </Typography>
                            </Box>
                          }
                        />
                        <CardContent sx={{ pt: 0 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Customer: <strong>{order.customer}</strong>
                          </Typography>
                          <Paper
                            variant="outlined"
                            sx={{ p: 1.5, bgcolor: "#fafafa", mt: 1 }}
                          >
                            <List dense disablePadding>
                              {order.items.map((item, idx) => (
                                <ListItem key={idx} disablePadding>
                                  <ListItemText
                                    primary={item}
                                    primaryTypographyProps={{
                                      variant: "body2",
                                      fontWeight: 500,
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: 700 }}
                            >
                              {order.total}
                            </Typography>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status)}
                              size="small"
                              sx={{ fontWeight: 700 }}
                            />
                          </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="inherit"
                          >
                            Details
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color={
                              order.status === "Ready" ? "success" : "primary"
                            }
                            startIcon={<CheckCircleOutline />}
                          >
                            {order.status === "Ready"
                              ? "Complete"
                              : "Mark Ready"}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </Paper>
        </Paper>
      </Box>
    </div>
  );
}
