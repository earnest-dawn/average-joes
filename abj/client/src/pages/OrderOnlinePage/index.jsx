import Auth from "../../utils/auth";
import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useMutation, useFragment } from "react-relay";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import "./OrderOnline.css";
import { AddToCartMutation } from "../../utils/mutations/mutations";
import MenuItemsFragment from "../../RelayFragments/MenuItemsFragment";
// 1. Fragment for the individual menu item to unmask data

const OrderOnlinePageQuery = graphql`
  query OrderOnlinePageQuery {
    menuItems {
      id
      ...MenuItemsFragment
      name
      ingredients
      calories
      price
      caption
      inStock
    }
  }
`;


function MenuCard({ item, loggedIn, onAdd }) {
  // Use fragment to ensure data is properly unmasked by Relay
  const data = useFragment(MenuItemsFragment, item);

  return (
    <Card
      sx={{
        width: 320,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: data.inStock ? "4px solid #d0f0c0" : "4px solid #f0c0c0",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={`https://picsum.photos/seed/${data.id}/400/300`}
          alt={data.name}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, maxWidth: "65%" }}>
              {data.name}
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 800 }}>
                ${data.price}
              </Typography>
              <Chip
                label={`${data.calories} Cal`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: "20px" }}
              />
            </Box>
          </Box>

          {loggedIn && (
            <Chip
              label={data.inStock ? "Available" : "Out of Stock"}
              size="small"
              color={data.inStock ? "success" : "error"}
              sx={{ mb: 1 }}
            />
          )}

          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1 }}>
            {data.caption || "No description available"}
          </Typography>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            <strong>Contains:</strong> {data.ingredients || "Not listed"}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button
        variant="contained"
        fullWidth
        disabled={!data.inStock && loggedIn}
        onClick={() => (loggedIn ? onAdd(data) : window.location.assign("/register"))}
        sx={{
          borderRadius: 0,
          py: 1.5,
          background: "#1a1a1a",
          color: "goldenrod",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        {loggedIn ? (data.inStock ? "ADD TO CART" : "OUT OF STOCK") : "REGISTER TO ORDER"}
      </Button>
    </Card>
  );
}

export default function OrderOnline() {
  const loggedIn = Auth.loggedIn();
  const data = useLazyLoadQuery(OrderOnlinePageQuery, {});
  const [commitAddToCart] = useMutation(AddToCartMutation);

  const handleAdd = (item) => {
    commitAddToCart({
      variables: {
        menuItemId: item.id,
        quantity: 1,
      },
      onCompleted: (res) => console.log("Added:", res),
      onError: (err) => console.error("Error adding to cart:", err),
    });
  };

  const menuItems = data?.menuItems || [];

  return (
    <Box sx={{ backgroundColor: "#004c4c", minHeight: "100vh", py: 4, px: 2 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ color: "white", fontWeight: 700, mb: 4, py: 2 }}
      >
        Menu
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <MenuCard 
            key={item.id} 
            item={item} 
            loggedIn={loggedIn} 
            onAdd={handleAdd} 
          />
        ))}
      </Box>
    </Box>
  );
}