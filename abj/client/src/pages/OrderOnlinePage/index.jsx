import Auth from "../../utils/auth";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { ADD_TO_CART } from "../../utils/mutations/mutations.js";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Grid,
  CircularProgress,
  Divider,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import "./OrderOnline.css";
import { TOGGLE_STOCK_STATUS } from "../../utils/mutations/mutations.js";
import { useMutation } from "react-relay";
import { NavLink } from "react-router-dom";

const OrderOnlinePageQuery = graphql`
  query OrderOnlinePageQuery {
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
  }
`;

export default function OrderOnline() {
  const loggedIn = Auth.loggedIn();
  const data = useLazyLoadQuery(OrderOnlinePageQuery, {});
  const [setToggleStock, isToggleStockInFlight] = useMutation(TOGGLE_STOCK_STATUS);
  const mongoMenu = (data?.menuItems || []).filter((item) => item !== null);
  const [loading, setLoading] = React.useState(false);

  const [commitAddToCart] = useMutation(ADD_TO_CART);

  const handleAdd = (item) => {
    commitAddToCart({
      variables: {
        itemId: item.id,
        itemType: "MenuItem",
      },
      onCompleted: (response) => {
        console.log("Added to cart:", response);
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    console.log("Raw data from MongoDB:", data);
    console.log("Menu Items Array:", mongoMenu);
  }, [data, mongoMenu]);
  const toggleStockStatus = (id, currentStockStatus) => {
    setToggleStock({
      variables: {
        input: {
          id: id,
          inStock: !currentStockStatus,
        },
      },
      optimisticResponse: {
        toggleStockStatus: {
          menuItem: {
            id: id,
            inStock: !currentStockStatus,
          },
          code: 200,
          success: true,
          message: "Optimistic Update",
        },
      },
      onCompleted: (response) => {
        console.log("Stock toggled!");
      },
      onError: (err) => console.error(err),
    });
  };
  const renderMenuCard = (item) => (
    <Card
      key={item.id}
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: item.inStock ? "4px solid #d0f0c0" : "4px solid #f0c0c0",
        "&:hover": { transform: "scale(1.02)" },
        transition: "transform 0.2s",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`https://picsum.photos/seed/${item.name}/400/300`}
          alt={item.name}
        />
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {item.name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
              ${item.price}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip
              label={item.inStock ? "Available" : "Out of Stock"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleStockStatus(item.id);
              }}
              size="small"
              variant="outlined"
              color={item.inStock ? "success" : "error"}
              sx={{ cursor: "pointer" }}
            />
            <Chip
              label={`${item.calories} Cal`}
              size="small"
              variant="outlined"
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic", mb: 1 }}
          >
            {item.caption}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: "auto" }}
          >
            Contains: {item.ingredients}
          </Typography>
        </CardContent>

        <Button
        className="plsRegister"
          variant="contained"
          fullWidth
          disabled={!item.inStock && loggedIn}
          onClick={
            loggedIn
              ? (e) => handleAdd(e, item)
              : () => window.location.assign("/register")
          }
          sx={{
            borderRadius: 0,
            py: 1.5,
            mt: "auto",
            background: "var(--col9)",
            color: "goldenrod",
            fontWeight: "bold",
            "&:hover": { bgcolor: "var(--col8)" },
          }}
        >
          {loggedIn
            ? item.inStock
              ? "ADD TO CART"
              : "OUT OF STOCK"
            : "REGISTER TO ORDER"}
        </Button>
      </CardActionArea>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "#004c4c", minHeight: "100vh", py: 4, px: 2 }}>
      
        <Typography
          variant="h3"
          align="center"
          sx={{background: "var(--col8)", color: "var(--col7)", fontWeight: 700, mb: 4, py:2}}
        >
          Menu
        </Typography>
      

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {mongoMenu.map(renderMenuCard)}
        </Box>
      )}
    </Box>
  );
}
