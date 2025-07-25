import './LogIn.css';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Link, Box } from '@mui/material';
import { useMutation } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';

import RegistrationForm from '../../components/RegistrationForm';
import Auth from '../../utils/auth';

// Helper function to safely get error message from Relay errors array
const getRelayErrorMessage = (errors) => {
    if (!errors || errors.length === 0) {
        return "An unknown error occurred (no error details provided).";
    }

    // Prioritize the message from the first error object
    if (errors[0] && typeof errors[0].message === 'string' && errors[0].message.trim() !== '') {
        return errors[0].message;
    }

    // Fallback if the first error doesn't have a clear message
    return "An unexpected error occurred (could not extract specific message).";
};

export default function LoginPage() {
    const [registrationForm, setRegistrationForm] = useState(false);

    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const [commitMutation, isLoading] = useMutation(graphql`
        mutation LoginPageLoginMutation($input: LoginInput!) {
            login(input: $input) {
                token
                user {
                    id
                    username
                }
            }
        }
    `);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setShowAlert(false); // Hide any previous alerts
        setAlertMessage('');
        setAlertSeverity('error');

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setAlertMessage("Please fill in all required fields.");
            setShowAlert(true);
            return;
        }

        try {
            commitMutation({
                variables: {
                    input: {
                        username: userFormData.username,
                        password: userFormData.password,
                    },
                },
                onCompleted: (response, errors) => {
                    if (errors && errors.length > 0) {
                        console.error('Login GraphQL errors (full object):', errors);
                        const extractedMessage = getRelayErrorMessage(errors);
                        console.log('Extracted Alert Message:', extractedMessage);
                        setAlertMessage(extractedMessage);
                        setAlertSeverity('error');
                        setShowAlert(true); // Show alert on error
                    } else if (response && response.login && response.login.token) {
                        Auth.login(response.login.token);
                        console.log('Login successful for user:', response.login.user.username);
                        setAlertMessage("Login successful!");
                        setAlertSeverity('success');
                        setShowAlert(true); // Show alert on success (optional, or redirect)
                        // Redirect or update UI as needed
                    } else {
                        console.error('Login response is not defined or missing token:', response);
                        setAlertMessage('Login failed: Invalid response from server or missing token.');
                        setAlertSeverity('error');
                        setShowAlert(true);
                    }
                },
                onError: (err) => {
                    console.error('Login network or unexpected error:', err);
                    setAlertMessage(`Login failed: ${err.message || 'Network error'}`);
                    setAlertSeverity('error');
                    setShowAlert(true);
                },
            });

        } catch (e) {
            console.error('Unexpected error during login process setup:', e);
            setAlertMessage(`An unexpected error occurred: ${e.message}`);
            setAlertSeverity('error');
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <Box className="login-page-container">
            {registrationForm ? (
                <RegistrationForm onSwitchToLogin={() => setRegistrationForm(false)} />
            ) : (
                <form
                    onSubmit={handleFormSubmit}
                    id="login-form"
                    className="login-form"
                >
                    {/* Conditional rendering of the Alert */}
                    {showAlert && (
                        <Alert
                            onClose={() => setShowAlert(false)}
                            severity={alertSeverity}
                            // NEW: Aggressive styling to force visibility
                            sx={{
                                mb: 2,
                                width: '100%', // Ensure it takes full width
                                position: 'relative', // Ensure z-index works
                                zIndex: 1000, // High z-index to be on top
                                backgroundColor: alertSeverity === 'error' ? '#ffebee' : '#e8f5e9', // Light red/green background
                                border: `2px solid ${alertSeverity === 'error' ? '#ef9a9a' : '#a5d6a7'}`, // Clear border
                                color: alertSeverity === 'error' ? '#d32f2f' : '#2e7d32', // Darker text color
                                fontWeight: 'bold',
                                opacity: 1, // Ensure full opacity
                                display: 'flex', // Ensure it's a flex container
                                alignItems: 'center', // Vertically center content
                                justifyContent: 'space-between', // Space out content and close button
                                padding: '12px 16px', // Standard padding
                                borderRadius: '4px', // Standard border radius
                                animation: 'fadeIn 0.5s ease-out forwards', // Add a fade-in animation
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 0, transform: 'translateY(-10px)' },
                                    '100%': { opacity: 1, transform: 'translateY(0)' },
                                },
                            }}
                        >
                            {alertMessage}
                        </Alert>
                    )}

                    <TextField
                        label="Username"
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        fullWidth
                        sx={{ mt: 2, mb: 1 }}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </Button>
                    <Button
                        type='button'
                        onClick={() => setRegistrationForm(true)}
                        variant="text"
                        color="secondary"
                        fullWidth
                    >
                        Don't have an account? Sign Up!
                    </Button>
                </form>
            )}
        </Box>
    );
}
