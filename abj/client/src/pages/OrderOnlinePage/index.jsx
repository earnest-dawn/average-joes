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
  const [setToggleStock] = useMutation(TOGGLE_STOCK_STATUS);
  const mongoMenu = (data?.menuItems || []).filter((item) => item !== null);
  const [loading, setLoading] = React.useState(false);
  
  const [commitAddToCart] = useMutation(ADD_TO_CART);

  const handleAdd = (item) => {
    const inputVariables = {
    input: {
      id: String(item.id),
      itemType: item.title ? "combo" : "menuitem",
      clientMutationId: `add-${item.id}-${Date.now()}`,
    },
  };

commitAddToCart({
    variables: inputVariables,
    onCompleted: (response, errors) => {
      if (errors) {
        console.error("GraphQL Errors:", errors);
        return;
      }

      if (!response.addToCart) {
        console.error(
          "Mutation returned null. This usually means the resolver failed on the server. " +
          "Check if the ID exists in the database and the enum value is valid."
        );
        return;
      }

      console.log("Success:", response.addToCart);
    },
    onError: (err) => {
      console.error("Critical Mutation Error:", err);
    },
  });
};

  const toggleStockStatus = (id, currentInStock) => {
    setToggleStock({
      variables: {
        input: {
          id: id,
          inStock: !currentInStock,
          clientMutationId: "toggle-" + id,
        },
      },
      optimisticResponse: {
        toggleStockStatus: {
          code: "200",
          success: true,
          message: "Optimistic update",
          menuItem: {
            id: id,
            inStock: !currentInStock,
          },
        },
      },
      onCompleted: (response) => {
        console.log("Status successfully toggled:", response);
      },
      onError: (err) => {
        console.error("Mutation failed:", err);
      },
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
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://picsum.photos/seed/${item.name}/400/300`}
          alt={item.name}
        />
        <CardContent>
          {/* MAIN HEADER BOX */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: "60%",
              }}
            >
              {item.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 0.5,
              }}
            >
              <Typography
                variant="subtitle1"
                color="primary"
                sx={{ fontWeight: 800, lineHeight: 1 }}
              >
                ${item.price}
              </Typography>
              <Chip
                label={`${item.calories} Cal`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: "20px" }}
              />
            </Box>
          </Box>

          {loggedIn ? (
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                label={item.inStock ? "Available" : "Out of Stock"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleStockStatus(item.id, item.inStock);
                }}
                size="small"
                color={item.inStock ? "success" : "error"}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          ) : (
            <div></div>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic", mb: 1 }}
          >
            {item.caption}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Contains: {item.ingredients}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button
        className="plsRegister"
        variant="contained"
        fullWidth
        disabled={!item.inStock && loggedIn}
        onClick={
          loggedIn
            ? () => handleAdd(item)
            : () => window.location.assign("/register")
        }
        sx={{
          borderRadius: 0,
          py: 1.5,
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
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: "#004c4c", minHeight: "100vh", py: 4, px: 2 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          background: "var(--col8)",
          color: "var(--col7)",
          fontWeight: 700,
          mb: 4,
          py: 2,
        }}
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
