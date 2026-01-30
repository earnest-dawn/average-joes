import React, { useState, useEffect } from 'react';
import { commitMutation } from 'react-relay';
import environment from '../../network'; 
import graphql from 'babel-plugin-relay/macro'; 
import { useNavigate } from 'react-router-dom'; 
import { TextField, Button, Box, Typography, Alert } from '@mui/material';


const mutation = graphql`
  mutation RegistrationPageMutation($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        username
        email
      }
    }
  }
`;


function createRegisterInput(username, email, password) {
  return {
    username: username,
    email: email,
    password: password,
  };
}


function RegistrationPage({ onSwitchToLogin }) { 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    setShowAlert(false); 
    setAlertMessage('');
    setAlertSeverity('error');

    
    if (!username || !email || !password) {
      setAlertMessage("Please fill in all fields.");
      setAlertSeverity('error');
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    
    const registerInput = createRegisterInput(username, email, password);

    
    commitMutation(environment, {
      mutation,
      variables: {
        input: registerInput,
      },
      onCompleted: (response, errors) => {
        setIsLoading(false); 
        if (errors && errors.length > 0) {
          console.error('Registration failed with errors:', errors);
          
          const errorMessage = errors[0]?.message || 'Registration failed with an unknown error.';
          setAlertMessage(`Registration failed: ${errorMessage}`);
          setAlertSeverity('error');
          setShowAlert(true);
        } else if (response && response.register && response.register.token) {
          console.log('Registration successful:', response);
          setAlertMessage("Registration successful! Redirecting to login...");
          setAlertSeverity('success');
          setShowAlert(true);
          
          setTimeout(() => {
            navigate('/login'); 
            
            
          }, 2000); 
        } else {
            console.error('Registration response is not defined or missing token:', response);
            setAlertMessage('Registration failed: Invalid response from server.');
            setAlertSeverity('error');
            setShowAlert(true);
        }
      },
      onError: (error) => {
        setIsLoading(false); 
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
        minHeight: '100vh', 
        padding: '20px',
        backgroundColor: '#f0f2f5', 
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
          gap: '20px', 
          maxWidth: '400px', 
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
          variant="outlined" 
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
          disabled={isLoading} 
          sx={{ mt: 2, py: 1.5, borderRadius: '8px' }} 
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate('/login')} // Fixed: Navigates to login page
          fullWidth
          sx={{ mt: 1 }}
        >
          Already have an account? Login!
        </Button>
      </Box>
    </Box>
  );
}

export default RegistrationPage;
