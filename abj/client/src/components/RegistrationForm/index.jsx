import React, { useState, useEffect } from 'react';
import { commitMutation } from 'react-relay';
import environment1 from '../../network'; // Assuming this is your Relay environment setup
import graphql from 'babel-plugin-relay/macro'; // Keep if you use it for other mutations/queries
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

// Import Material-UI components for styling
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

// GraphQL mutation for registering a user
const mutation = graphql`
  mutation RegistrationFormMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Helper function to create the input object for the mutation
function createRegisterInput(username, email, password) {
  return {
    username: username,
    email: email,
    password: password,
  };
}

// RegistrationForm component
function RegistrationForm({ onSwitchToLogin }) { // Accept onSwitchToLogin prop
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state
    setShowAlert(false); // Hide previous alerts
    setAlertMessage('');
    setAlertSeverity('error');

    // Basic form validation
    if (!username || !email || !password) {
      setAlertMessage("Please fill in all fields.");
      setAlertSeverity('error');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    // Call the function to create the input object
    const registerInput = createRegisterInput(username, email, password);

    // Send the `registerInput` object to your server using the register mutation
    commitMutation(environment1, {
      mutation,
      variables: {
        input: registerInput,
      },
      onCompleted: (response, errors) => {
        setIsLoading(false); // Clear loading state
        if (errors && errors.length > 0) {
          console.error('Registration failed with errors:', errors);
          // Extract message from GraphQL errors
          const errorMessage = errors[0]?.message || 'Registration failed with an unknown error.';
          setAlertMessage(`Registration failed: ${errorMessage}`);
          setAlertSeverity('error');
          setShowAlert(true);
        } else if (response && response.register && response.register.token) {
          console.log('Registration successful:', response);
          setAlertMessage("Registration successful! Redirecting to login...");
          setAlertSeverity('success');
          setShowAlert(true);
          // Redirect to login page after successful registration
          setTimeout(() => {
            navigate('/login'); // Use navigate function
            // Or, if this component is toggled within LoginPage, just switch back:
            // onSwitchToLogin();
          }, 2000); // Wait 2 seconds before redirecting
        } else {
            console.error('Registration response is not defined or missing token:', response);
            setAlertMessage('Registration failed: Invalid response from server.');
            setAlertSeverity('error');
            setShowAlert(true);
        }
      },
      onError: (error) => {
        setIsLoading(false); // Clear loading state
        console.error('Registration failed:', error);
        setAlertMessage(`Registration failed: ${error.message || 'Network error'}`);
        setAlertSeverity('error');
        setShowAlert(true);
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Take full viewport height
        padding: '20px',
        backgroundColor: '#f0f2f5', // Light background
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px', // Space between form elements
          maxWidth: '400px', // Max width for the form
          width: '100%',
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 1, color: '#3f51b5', textAlign: 'center' }}>
          Register New Account
        </Typography>

        {showAlert && (
          <Alert
            severity={alertSeverity}
            onClose={() => setShowAlert(false)}
            sx={{ mb: 2 }}
          >
            {alertMessage}
          </Alert>
        )}

        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          variant="outlined" // Modern Material-UI look
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading} // Disable button while loading
          sx={{ mt: 2, py: 1.5, borderRadius: '8px' }} // Add some padding and rounded corners
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={onSwitchToLogin} // Button to switch back to login
          fullWidth
          sx={{ mt: 1 }}
        >
          Already have an account? Login!
        </Button>
      </Box>
    </Box>
  );
}

export default RegistrationForm;
