import Auth from "../../utils/auth";
import React from "react";
import Layout from "../../components/Layout";
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
import { AddToCartMutation, ToggleStockStatusMutation } from "../../utils/mutations/mutations.js";
import MenuItemsFragment from "../../RelayFragments/MenuItemsFragment";

// 1. Query: We fetch the ID and spread the Fragment
const OrderOnlinePageQuery = graphql`
  query OrderOnlinePageQuery {
    menuItems {
      id
      ...MenuItemsFragment
    }
  }
`;

// 2. Fragment Component: This "unmasks" the data so React can read name, price, etc.
function MenuCard({ item, loggedIn, onAdd, onToggleStock }) {
  const data = useFragment(MenuItemsFragment, item);

  if (!data) return null;

  return (
    <Card
      key={data.id}
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
          image={`https://picsum.photos/seed/${data.name}/400/300`}
          alt={data.name}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, maxWidth: "60%" }}>
              {data.name}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5 }}>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 800, lineHeight: 1 }}>
                ${data.price}
              </Typography>
              <Chip
                label={`${data.calories || 0} Cal`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: "20px" }}
              />
            </Box>
          </Box>

          {loggedIn && (
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Chip
                label={data.inStock ? "Available" : "Out of Stock"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleStock(data.id, data.inStock);
                }}
                size="small"
                color={data.inStock ? "success" : "error"}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic", mb: 1 }}>
            {data.caption}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Contains: {data.ingredients}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Button
        className="plsRegister"
        variant="contained"
        fullWidth
        disabled={!data.inStock && loggedIn}
        onClick={
          loggedIn
            ? () => onAdd(data)
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
          ? data.inStock
            ? "ADD TO CART"
            : "OUT OF STOCK"
          : "REGISTER TO ORDER"}
      </Button>
    </Card>
  );
}

// 3. Main Page Component
export default function OrderOnline() {
  const loggedIn = Auth.loggedIn();
  const data = useLazyLoadQuery(OrderOnlinePageQuery, {});
  const [commitAddToCart] = useMutation(AddToCartMutation);
  const [commitToggleStock] = useMutation(ToggleStockStatusMutation);

  const handleAdd = (item) => {
    commitAddToCart({
      variables: {
        input: {
          id: String(item.id),
          itemType: item.title ? "combo" : "menuitem",
          clientMutationId: `add-${item.id}-${Date.now()}`,
        },
      },
      onCompleted: (res) => console.log("Added to cart:", res),
    });
  };

  const handleToggleStock = (id, currentInStock) => {
    commitToggleStock({
      variables: {
        input: {
          id: id,
          inStock: !currentInStock,
          clientMutationId: "toggle-" + id,
        },
      },
    });
  };

  const menuItems = data?.menuItems || [];

  return (
    <Layout>
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {menuItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              loggedIn={loggedIn}
              onAdd={handleAdd}
              onToggleStock={handleToggleStock}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
}