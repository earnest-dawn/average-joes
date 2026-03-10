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
      
    }
  }
`;


function MenuCard({ item, loggedIn, onAdd }) {
  const data = useFragment(MenuItemsFragment, item);

  if (!data) return null;

  return (
    <Card
      // Change the border logic to avoid using a class name that matches 'inStock'
      sx={{
        width: 320,
        minHeight: 450, // Force a minimum height
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white", // Force white background
        border: data.inStock ? "4px solid #d0f0c0" : "4px solid #f0c0c0",
        m: 1
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`https://picsum.photos/seed/${data.id}/400/300`}
          alt={data.name}
        />
        <CardContent sx={{ color: "black !important" }}>
          {/* Using standard h2/p tags inside Typography to bypass CSS collisions */}
          <Typography component="div" variant="h6" sx={{ fontWeight: 700, color: "black" }}>
            {data.name}
          </Typography>
          
          <Typography component="div" variant="subtitle1" sx={{ color: "green", fontWeight: "bold" }}>
            ${data.price}
          </Typography>

          <Typography component="div" variant="body2" sx={{ mt: 1, fontStyle: "italic", color: "#333" }}>
            {data.caption || "Description here"}
          </Typography>

          <Typography component="div" variant="caption" sx={{ display: 'block', mt: 2, color: "#666" }}>
            <strong>Ingredients:</strong> {data.ingredients}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box sx={{ mt: 'auto', p: 1 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAdd(data)}
          sx={{
            background: "#1a1a1a",
            color: "goldenrod",
            "&:hover": { background: "#333" }
          }}
        >
          {data.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </Button>
      </Box>
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