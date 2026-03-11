import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const DonationsGatewayInput = ({ 
  userInputAmount, 
  setUserInputAmount,
  selectedAccount,
  setSelectedAccount,
  platformFeePercent,
  connectedAccounts = []
}) => {
  const [isApiBlocked, setIsApiBlocked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [showSimulatedSheet, setShowSimulatedSheet] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect_status') === 'succeeded') {
      setStatus('success');
    } else if (params.get('redirect_status') === 'failed') {
      setErrorMessage('Payment failed. Please try again.');
      setStatus('idle');
    }
  }, []);
  const handleSubmit = async (event) => {
    if (event.preventDefault) event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Payment system not ready. Please refresh the page.");
      setStatus("idle");
      return;
    }

    setLoading(true);
    setStatus("processing");
    setErrorMessage("");

    try {
      
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donations`,
        },
      });

      
      if (result.error) {
        setLoading(false);
        setStatus("idle");
        setErrorMessage(result.error.message || "Payment failed. Please try again.");
      }
      
      
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("idle");
      setLoading(false);
    }
  };

  const handlePaymentClick = async () => {
    setStatus("processing");
    setErrorMessage("");

    const finalValue = parseFloat(userInputAmount).toFixed(2);
    if (isNaN(finalValue) || finalValue <= 0) {
      setErrorMessage("Please enter a valid amount.");
      setStatus("idle");
      return;
    }

    await handleSubmit({ preventDefault: () => {} });
  };

  const processSimulatedPayment = () => {
    setErrorMessage("");

    if (couponCode && couponCode.toUpperCase() !== "SAVE10") {
      setErrorMessage("Invalid coupon code.");
      return;
    }

    if (zipCode && zipCode.length < 5) {
      setErrorMessage("Please enter a valid zip code.");
      return;
    }

    setStatus("processing");
    setShowSimulatedSheet(false);

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 500,
        mx: "auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={12}
                className="container"

        sx={{
          p: 4,
          color: 'var(--col7)',
          width: "100%",
          borderRadius: 4,
          textAlign: "center",
          border: "2px solid var(--col10)",
          boxShadow: "0 0 30px var(--col11)",
          background: "linear-gradient(180deg, rgba(160, 17, 17, 0.02), rgba(0,0,0,0.04))",
        }}
      >
        <Typography variant="h5" className="glow-text" sx={{ fontWeight: 800, mb: 1 }}>
          Donate Today
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          Support a cause you care about — Secure Transaction
        </Typography>

        {/* Organization Selection */}
        {connectedAccounts.length > 0 && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Organization</InputLabel>
            <Select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              label="Select Organization"
              sx={{
                color: 'var(--col7)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--col11)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--col11)',
                },
              }}
            >
              {connectedAccounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box sx={{ mb: 3 }}>
          <TextField
  fullWidth
  label="Donation Amount"
  variant="outlined"
  type="number"
  value={userInputAmount}
  onChange={(e) => setUserInputAmount(e.target.value)}
  InputProps={{
    startAdornment: <Typography sx={{ mr: 1, color: 'var(--col7)' }}>$</Typography>,
  }}
  sx={{
    mb: 2,
    
    '& .MuiInputBase-input': {
      color: 'var(--col7)',
    },
    
    '& .MuiInputLabel-root': {
      color: 'var(--col7)',
    },
    
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'var(--col11)',
    },
    
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--col11)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--col11)',
      },
    },
  }}
  className="donations"
/>
          <Typography variant="caption" >
            Enter the amount you'd like to contribute.
          </Typography>
        </Box>

        {status === "idle" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ mb: 3 }}>
              <PaymentElement 
  options={{
    layout: "tabs",
    appearance: {
      theme: 'night', 
      variables: {
        colorPrimary: '#0099ff', 
        colorBackground: '#1a1a1a', 
        colorText: '#ffffff',       
        colorDanger: '#ff4444',
        fontFamily: 'Bungee, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Label': {
          color: '#ffffff', 
        }
      }
    }
  }}
/>
            </Box>

            {/* Donation Summary */}
            {platformFeePercent > 0 && (
              <Box sx={{ 
                bgcolor: 'rgba(0,0,0,0.2)', 
                p: 2, 
                borderRadius: 2, 
                mb: 2,
                textAlign: 'left'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Donation Amount:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>${parseFloat(userInputAmount || 0).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="textSecondary">Platform Fee ({platformFeePercent}%):</Typography>
                  <Typography variant="caption" color="textSecondary">${(parseFloat(userInputAmount || 0) * (platformFeePercent / 100)).toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Goes to Organization:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>${(parseFloat(userInputAmount || 0) * (1 - platformFeePercent / 100)).toFixed(2)}</Typography>
                </Box>
              </Box>
            )}

            {errorMessage && (
              <Alert severity="error" variant="filled" sx={{ borderRadius: 2, mb: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Button
            className="glow-text"
              fullWidth
              variant="contained"
              onClick={handlePaymentClick}
              disabled={!stripe || !elements}
              sx={{
                bgcolor: "var(--col11)",
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "var(--col10)" },
                "&:disabled": { opacity: 0.6 },
              }}
            >
              Complete Donation
            </Button>
            <Typography variant="caption"  sx={{ px: 2 }}>
              Your payment is secure and encrypted by Stripe.
            </Typography>
          </Box>
        )}

        {status === "processing" && (
            <Box sx={{ py: 4 }}>
            <CircularProgress size={40} thickness={5} sx={{ color: "var(--col7)" }} />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>
              Authorizing Payment...
            </Typography>
          </Box>
        )}

        {status === "success" && (
          <Box sx={{ py: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Payment Successful!
            </Typography>
            <Typography variant="body2" >
              A receipt has been sent to your email.
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 3, textTransform: "none" }}
              onClick={() => {
                setStatus("idle");
                setCouponCode("");
                setZipCode("");
              }}
            >
              Back to Store
            </Button>
          </Box>
        )}
      </Paper>

      {/* Simulated Bottom Sheet for Restricted Environments */}
      <Dialog
        open={showSimulatedSheet}
        onClose={() => setShowSimulatedSheet(false)}
        fullWidth
        maxWidth="xs"
          sx={{
            '& .MuiInput-underline:before': { borderBottomColor: 'var(--col7)' },
    '& .MuiInputBase-input': { color: 'var(--col7)' },
    '& .MuiInputLabel-root': { color: 'var(--col7)' },
    borderRadius: "24px 24px 0 0",
            position: "fixed",
            bottom: 0,
            m: 0,
            overflow: "hidden",
            borderTop: "2px solid var(--col5)",
            boxShadow: "0 -8px 24px rgba(0,153,255,0.06)",
          }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "var(--col7)",
            color: "var(--col6)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AppleIcon />{" "}
            <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
              Pay
            </Typography>
          </Box>
          <IconButton onClick={() => setShowSimulatedSheet(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 4, bgcolor: 'transparent' }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 700 }}>
            Card
          </Typography>
          <Typography variant="body2"  sx={{ mb: 3 }}>
            Apple Card •••• 4242
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              label="Coupon Code"
              variant="standard"
              placeholder="Try 'SAVE10'"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <TextField
              fullWidth
              label="Shipping Zip Code"
              variant="standard"
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              sx={{color: 'var(--col7)'}}
            />

            {errorMessage && (
              <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Box sx={{ mt: 1 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" >
                  Pay Merchant
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  My Awesome Store
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
                          className="glow-text"

              variant="contained"
              onClick={processSimulatedPayment}
              sx={{
                bgcolor: "#000",
                py: 2,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Pay with Passcode
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DonationsGatewayInput;
