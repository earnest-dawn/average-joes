import './LogIn.css';
import React, { useState } from 'react';
import { TextField, Button, Alert, Box, Typography } from '@mui/material';
import { useMutation } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';


const getRelayErrorMessage = (errors) => {
    if (!errors || errors.length === 0) {
        return "An unknown error occurred (no error details provided).";
    }

    
    if (errors[0] && typeof errors[0].message === 'string' && errors[0].message.trim() !== '') {
        return errors[0].message;
    }

    
    return "An unexpected error occurred (could not extract specific message).";
};

export default function LoginPage() {
    const navigate = useNavigate();
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
        setShowAlert(false);

        commitMutation({
            variables: {
                input: {
                    username: userFormData.username,
                    password: userFormData.password,
                },
            },
            onCompleted: (response, errors) => {
                if (errors && errors.length > 0) {
                    setAlertMessage(getRelayErrorMessage(errors));
                    setShowAlert(true);
                } else if (response?.login?.token) {
                    Auth.login(response.login.token);
                    navigate('/orderOnline');
                }
            },
            onError: (err) => {
                setAlertMessage(`Login failed: ${err.message}`);
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
                backgroundColor: '#f0f2f5',
            }}
        >
            <Box
                component="form"
                onSubmit={handleFormSubmit}
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
                <Typography variant="h5" sx={{ color: '#3f51b5', textAlign: 'center' }}>
                    Login to Your Account
                </Typography>

                {showAlert && (
                    <Alert severity={alertSeverity} onClose={() => setShowAlert(false)}>
                        {alertMessage}
                    </Alert>
                )}

                <TextField
                    label="Username"
                    name="username"
                    value={userFormData.username}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={userFormData.password}
                    onChange={handleInputChange}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ py: 1.5 }}
                >
                    {isLoading ? 'Logging In...' : 'Login'}
                </Button>

                <Button
                    variant="text"
                    color="secondary"
                    onClick={() => navigate('/register')} 
                >
                    Don't have an account? Sign Up!
                </Button>
            </Box>
        </Box>
    );
}