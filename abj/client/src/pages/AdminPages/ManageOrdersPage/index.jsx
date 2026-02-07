import React, { useTransition } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
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
  Inventory as InventoryIcon,
  Fastfood as OrderIcon
} from "@mui/icons-material";
import "./manageOrders.css";
import {Auth} from "../../../utils/auth"
import { CREATE_ORDER } from "../../../utils/mutations/mutations.js";

const ManageOrdersPageQuery = graphql`
  query ManageOrdersPageQuery {
    myOrders {
      id
      totalPrice
      status
      # Using actual fields instead of undefined fragments
      items {
        itemReference {
          name
          ingredients
        }
      }
    }
  }
`;


export default function ManageOrdersPage() {
 const data = useLazyLoadQuery(ManageOrdersPageQuery, {});
  const [commitCreateOrder, isMutationInFlight] = useMutation(CREATE_ORDER);
  const [isPending, startTransition] = useTransition();

  const handleMarkReady = (orderId) => {
    startTransition(() => {
      commitCreateOrder({
        variables: {
          input: { orderId: orderId, status: "READY" }, 
        },
        onCompleted: (response, errors) => {
          if (errors) console.error("Error:", errors);
        },
      });
    });
  };
const orderInfo = data?.myOrders || [];
  return (
    <Box sx={{ backgroundColor: "#f4f7f6", minHeight: "100vh", pb: 10 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          
          {orderInfo.length > 0 ? (
            orderInfo.map((order) => (
              <Grid item xs={12} md={6} lg={4} key={order.id}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardHeader
                    avatar={<OrderIcon color="primary" />}
                    title={<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Ordo #{order.id.slice(-6)}</Typography>}
                    subheader={`Status: ${order.status}`}
                  />
                  <Divider />
                  <CardContent>
                    <Stack spacing={1}>
                      {order.items.map((item, idx) => (
                        <Box key={idx} sx={{ p: 1.5, bgcolor: "#fafafa", borderRadius: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.itemReference?.name || "Unknown Item"}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={() => handleMarkReady(order.id)}
                    >
                      Mark Ready
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            // 3. This renders if orderInfo.length is 0
            <Grid item xs={12}>
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h5" color="text.secondary">
                  No orders available at this time.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Check back later or refresh the page.
                </Typography>
              </Paper>
            </Grid>
          )}
          
        </Grid>
      </Container>
    </Box>
  );
}