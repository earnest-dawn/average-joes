import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, CircularProgress, 
  Alert, Divider, Dialog, DialogContent, DialogTitle, TextField,
  IconButton
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentGateway = () => {
  const [isApiBlocked, setIsApiBlocked] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'processing', 'success'
  const [showSimulatedSheet, setShowSimulatedSheet] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  
  // State for messages - strictly using strings to avoid "Objects are not valid as a React child"
  const [errorMessage, setErrorMessage] = useState("");

  const priceData = {
    subtotal: 40.00,
    fee: 5.00,
    total: 45.00
  };

  useEffect(() => {
    /**
     * FIX: SecurityError prevention.
     * Constructing PaymentRequest often throws a SecurityError in restricted environments.
     */
    const detectSupport = async () => {
      if (typeof window.PaymentRequest === 'undefined') {
        setIsApiBlocked(true);
        return;
      }

      try {
        const methodData = [{ supportedMethods: "https://apple.com/apple-pay", data: { version: 12 } }];
        const details = { total: { label: 'Test', amount: { value: '0', currency: 'USD' } } };
        // Validating construction without showing UI
        new PaymentRequest(methodData, details);
      } catch (e) {
        // If an error occurs (like SecurityError), we fallback to our custom UI.
        console.warn("Payment API restricted by browser context:", e.message);
        setIsApiBlocked(true);
      }
    };

    detectSupport();
  }, []);

  const handlePaymentClick = async (method) => {
    setStatus('processing');
    setErrorMessage("");

    try {
      if (isApiBlocked) throw new Error("API_BLOCKED");

      const methodData = method === 'apple' 
        ? [{ supportedMethods: "https://apple.com/apple-pay", data: { version: 12 } }] 
        : [{ supportedMethods: "https://google.com/pay", data: { environment: "TEST" } }];
      
      const request = new PaymentRequest(methodData, { 
        total: { label: "Total", amount: { currency: "USD", value: "45.00" } } 
      });

      const response = await request.show();
      await response.complete("success");
      setStatus('success');
    } catch (e) {
      // Logic: If native UI fails or is blocked, open the simulated payment sheet
      console.log("Using simulated fallback payment UI.");
      setShowSimulatedSheet(true);
      setStatus('idle');
    }
  };

  const processSimulatedPayment = () => {
    setErrorMessage("");

    // Simple validation logic
    if (couponCode && couponCode.toUpperCase() !== "SAVE10") {
      setErrorMessage("Invalid coupon code.");
      return;
    }

    if (zipCode && zipCode.length < 5) {
      setErrorMessage("Please enter a valid zip code.");
      return;
    }

    setStatus('processing');
    setShowSimulatedSheet(false);
    
    // Simulate network latency
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const calculatedTotal = (priceData.total - (couponCode.toUpperCase() === "SAVE10" ? 10 : 0)).toFixed(2);

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={12} sx={{ p: 4, width: '100%', borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Checkout</Typography>
        <Typography color="textSecondary" variant="body2" sx={{ mb: 3 }}>
          Order #8293 — Secure Transaction
        </Typography>

        <Box sx={{ bgcolor: '#f1f5f9', p: 3, borderRadius: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Service Subtotal</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>${priceData.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Processing Fee</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>${priceData.fee.toFixed(2)}</Typography>
          </Box>
          {couponCode.toUpperCase() === "SAVE10" && (
             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'success.main' }}>
              <Typography variant="body2">Discount (SAVE10)</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>-$10.00</Typography>
           </Box>
          )}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0f172a', fontSize: '1.2rem' }}>
              ${calculatedTotal}
            </Typography>
          </Box>
        </Box>

        {status === 'idle' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              fullWidth variant="contained" 
              onClick={() => handlePaymentClick('apple')}
              startIcon={<AppleIcon />}
              sx={{ bgcolor: '#000', color: '#fff', py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#222' } }}
            >
              Pay with Apple Pay
            </Button>
            <Button 
              fullWidth variant="contained" 
              onClick={() => handlePaymentClick('google')}
              startIcon={<GoogleIcon />}
              sx={{ bgcolor: '#fff', color: '#3c4043', border: '1px solid #dadce0', py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#f8f9fa' } }}
            >
              Google Pay
            </Button>
            <Typography variant="caption" color="textSecondary" sx={{ px: 2 }}>
              Clicking above will open the secure payment sheet.
            </Typography>
          </Box>
        )}

        {status === 'processing' && (
          <Box sx={{ py: 4 }}>
            <CircularProgress size={40} thickness={5} sx={{ color: '#000' }} />
            <Typography sx={{ mt: 2, fontWeight: 600 }}>Authorizing Payment...</Typography>
          </Box>
        )}

        {status === 'success' && (
          <Box sx={{ py: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Payment Successful!</Typography>
            <Typography variant="body2" color="textSecondary">A receipt has been sent to your email.</Typography>
            <Button 
              variant="outlined"
              sx={{ mt: 3, textTransform: 'none' }} 
              onClick={() => { setStatus('idle'); setCouponCode(''); setZipCode(''); }}
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
        PaperProps={{ 
          sx: { 
            borderRadius: '24px 24px 0 0', 
            position: 'fixed', 
            bottom: 0, 
            m: 0,
            overflow: 'hidden'
          } 
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8f9fa' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AppleIcon /> <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>Pay</Typography>
          </Box>
          <IconButton onClick={() => setShowSimulatedSheet(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 700 }}>Card</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Apple Card •••• 4242
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField 
              fullWidth label="Coupon Code" 
              variant="standard" 
              placeholder="Try 'SAVE10'"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <TextField 
              fullWidth label="Shipping Zip Code" 
              variant="standard" 
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />

            {errorMessage && (
              <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>{errorMessage}</Alert>
            )}

            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">Pay Merchant</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>My Awesome Store</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">Total Amount</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>${calculatedTotal}</Typography>
                </Box>
            </Box>

            <Button 
              fullWidth variant="contained" 
              onClick={processSimulatedPayment}
              sx={{ bgcolor: '#000', color: '#fff', py: 2, borderRadius: 3, fontWeight: 700, fontSize: '1rem', textTransform: 'none' }}
            >
              Pay with Passcode
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PaymentGateway;