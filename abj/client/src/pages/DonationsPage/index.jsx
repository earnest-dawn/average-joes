import React, { useState, useEffect } from "react";
import DonationsGatewayInput from '../../components/inputs/DonationsGatewayInput'
import { Box, CircularProgress, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Alert } from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



// Prepare Stripe instance promise using publishable key
const publishableKey = (() => {
  try {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
  } catch (e) {
    console.warn("import.meta not available in this environment.");
    return '';
  }
})();

const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const DonationsPage = () => {
  const [userInputAmount, setUserInputAmount] = useState("10.00");
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [platformFeePercent, setPlatformFeePercent] = useState(5); 
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch connected accounts from server
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/connected-accounts");
        const data = await response.json();
        if (data.accounts && Array.isArray(data.accounts)) {
          setConnectedAccounts(data.accounts);
          if (data.accounts.length > 0) {
            setSelectedAccount(data.accounts[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch connected accounts:", err);
        setError("Unable to load donation organizations.");
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchSecret = async () => {
      if (!selectedAccount || !userInputAmount) return;
      
      setLoading(true);
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: userInputAmount,
            connected_account_id: selectedAccount,
            platform_fee_percent: platformFeePercent,
            description: `Donation to ${connectedAccounts.find(a => a.id === selectedAccount)?.name || 'Organization'}`
          }),
        });

        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setError(null);
        } else if (data.error) {
          setError(data.error);
          setClientSecret(null);
        }
      } catch (err) {
        console.error("Payment gateway error:", err);
        setError("Backend is unreachable. Check server status.");
        setClientSecret(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSecret();
  }, [userInputAmount, selectedAccount, platformFeePercent, connectedAccounts]);

  if (!publishableKey) {
    // show error if publishable key missing
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error">
          Stripe configuration is missing. Set VITE_STRIPE_PUBLISHABLE_KEY.
        </Alert>
      </Box>
    );
  }

  // show loading or input UI before we have a client secret
  if (error && !clientSecret) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Preparing Secure Gateway...</Typography>
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
        <TextField
          type="number"
          value={userInputAmount}
          onChange={(e) => setUserInputAmount(e.target.value)}
          label="Amount"
          sx={{ mt: 2 }}
        />
      </Box>
    );
  }

  if (!clientSecret) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Preparing Secure Gateway...</Typography>
        
        <FormControl sx={{ mt: 3, minWidth: 300 }}>
          <InputLabel>Select Organization</InputLabel>
          <Select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            label="Select Organization"
          >
            {connectedAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          value={userInputAmount}
          onChange={(e) => setUserInputAmount(e.target.value)}
          label="Donation Amount ($)"
          sx={{ mt: 2 }}
          inputProps={{ step: "0.01", min: "0.50" }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'flat' } }}>
        <DonationsGatewayInput 
          userInputAmount={userInputAmount} 
          setUserInputAmount={setUserInputAmount}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          platformFeePercent={platformFeePercent}
          connectedAccounts={connectedAccounts}
        />
      </Elements>
    </Box>
  );
};

export default DonationsPage;