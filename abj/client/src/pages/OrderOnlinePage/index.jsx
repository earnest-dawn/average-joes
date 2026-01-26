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
  Alert, Button, Paper
} from "@mui/material";
import "./OrderOnline.css";
import {TOGGLE_STOCK_STATUS} from "../../utils/mutations/mutations.js";
import { useMutation } from "react-relay";

const OrderOnlinePageQuery=graphql`
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
     
    
  }`;



export default function OrderOnline() {
  const data = useLazyLoadQuery(OrderOnlinePageQuery, {});
const [setToggleStock, isToggleStockInFlight] = useMutation(TOGGLE_STOCK_STATUS);
const mongoMenu = (data?.menuItems || []).filter(item => item !== null);  
  
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
  
  return (
    <div style={{ backgroundColor: "#004c4c" }}>
      
        <Box
          sx={{display: "flow-root", backgroundColor: "#00", minHeight: "100vh", py: 4, px: 2 }}
        >
          <Paper sx={{ mb: 4, p: 2, background: "var(--col9)" }}>
            <Typography
            variant="h3"
            align="center"
            sx={{ color: "var(--col7)", mb: 2, mt: 0, fontWeight: 700,  }}
          >
            Menu
          </Typography>
          </Paper> 

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {mongoMenu.filter(item => item !== null).map((item) => (
              <Card
                key={item.id}
                sx={{
                  
                  "&:hover": { transform: "scale(1.02)" },
                }}
                className={item.inStock ? "inStock" : "outOfStock"}
              >
                <CardActionArea >
                  <CardMedia
                    component="img"
                    height="200"
                    
                    image={`https://picsum.photos/seed/${item.name}/400/300`}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 800 }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        onClick={() => toggleStockStatus(item.id, item.inStock)}
                        label={`${item.inStock ? "Available" : "Out of Stock"}`}
                        size="small"
                        variant="outlined"
                        key={item.id}
                        item={item}
                        onToggle={toggleStockStatus}
                        className={[
                          item.inStock ? "in-stock" : "out-of-stock",
                          "toggleStock",
                        ].join(" ")}
                      />
                      <Chip
                        label={`${item.calories} Cal`}
                        size="small"
                        color="secondary"
                        variant="soft"
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Powerful essence with a caption score of {item.caption}.
                    </Typography>
                    <Typography
                      variant="body3"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Contains: {item.ingredients}.
                    </Typography>
                  </CardContent>
                  <Button variant="contained" color="primary" fullWidth disabled={!item.inStock} onClick={handleAdd}
      sx={{ mb: 2 }}>

      {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
    </div>
  );
}
