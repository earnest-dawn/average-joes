import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { Box, Typography, Paper, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessContent = () => {
  const stripe = useStripe();
  const [status, setStatus] = useState("loading"); 
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!stripe) return;

    
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setStatus("error");
      return;
    }

    
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("succeeded");
          setAmount(paymentIntent.amount / 100); 
          break;
        case "processing":
          setStatus("processing");
          break;
        default:
          setStatus("error");
          break;
      }
    });
  }, [stripe]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', p: 3 }}>
      <Paper elevation={10} sx={{ p: 5, textAlign: 'center', borderRadius: 4, maxWidth: 400, bgcolor: 'var(--col6)', border: '1px solid var(--col5)' }}>
        {status === "loading" && <CircularProgress color="inherit" />}
        
        {status === "succeeded" && (
          <>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
            <Typography variant="h4" className="glow-text" sx={{ mb: 2 }}>Thank You!</Typography>
            <Typography variant="body1" sx={{ color: 'var(--col7)', mb: 3 }}>
              Your donation of <strong>${amount.toFixed(2)}</strong> was successful. 
              Your support helps "The Shift" continue its mission.
            </Typography>
          </>
        )}

        {status === "error" && (
          <Typography color="error">Something went wrong. Please check your email for confirmation.</Typography>
        )}

        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2, color: 'var(--col7)', borderColor: 'var(--col5)' }}>
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default SuccessContent;