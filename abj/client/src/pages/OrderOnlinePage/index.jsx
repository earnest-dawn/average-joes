import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
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
} from "@mui/material";

export default function OrderOnline() {
  const [menuItems, setMenuItems] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
     
        const menuUrl = new URL("/MenuItemsSeeds.json", window.location.origin)
          .href;
        const combosUrl = new URL("/CombosSeeds.json", window.location.origin)
          .href;

        const [menuResult, combosResult] = await Promise.allSettled([
          fetch(menuUrl).then(async (res) => {
            if (!res.ok)
              throw new Error(
                `Status ${res.status}: MenuItemsSeeds.json not found.`
              );
            return res.json();
          }),
          fetch(combosUrl).then(async (res) => {
            if (!res.ok)
              throw new Error(
                `Status ${res.status}: CombosSeeds.json not found.`
              );
            return res.json();
          }),
        ]);

        let combinedErrorMessage = "";

        // Process Menu Items result
        if (menuResult.status === "fulfilled") {
          setMenuItems(menuResult.value);
        } else {
          console.error("Menu Items Error:", menuResult.reason.message);
          combinedErrorMessage += "Menu Items failed to load. ";
        }

        // Process Combos result
        if (combosResult.status === "fulfilled") {
          setCombos(combosResult.value);
        } else {
          console.error("Combos Error:", combosResult.reason.message);
          combinedErrorMessage += "Combos failed to load. ";
        }

        if (
          menuResult.status === "rejected" &&
          combosResult.status === "rejected"
        ) {
          setError(
            "Total Load Failure: Check if symlinks exist in 'client/public'."
          );
        } else if (combinedErrorMessage) {
          setError(combinedErrorMessage);
        }
      } catch (err) {
        console.error("General Error:", err);
        setError("Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#004c4c",
        }}
      >
        <CircularProgress color="inherit" sx={{ color: "white" }} />
      </Box>
    );
  return (
    <div style={{ backgroundColor: "#004c4c" }}>
      <Layout>
        <Box
          sx={{ backgroundColor: "#004c4c", minHeight: "100vh", py: 4, px: 2 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ color: "white", mb: 4, fontWeight: 700 }}
          >
            Elemental Menu
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
              <Card
                key={item._id}
                sx={{
                  width: "320px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    // Placeholder image since JSON doesn't have image URLs
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
                        label={item.ingredients}
                        size="small"
                        variant="outlined"
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
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
