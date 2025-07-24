import './LogIn.css';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Link, Box } from '@mui/material'; // Added Box for layout
import { LOGIN } from '../../utils/mutations/mutations'; // Assuming this is a Relay mutation definition
import { useMutation } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro'; // Keep if you use it for other mutations/queries

import RegistrationForm from '../../components/RegistrationForm'; // Make sure this path is correct
import Auth from '../../utils/auth'; // Assuming Auth utility

export default function LoginPage() {
    // State to toggle between login and registration forms
    const [registrationForm, setRegistrationForm] = useState(false);

    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);

    // Assuming LOGIN is a Relay fragment or query defined with graphql`...`
    // If LOGIN is just a string, you might need to adjust useMutation usage
    const [commitMutation, isLoading, error] = useMutation(
        graphql`
            mutation LoginPageLoginMutation($input: LoginInput!) {
                login(input: $input) {
                    token
                    user {
                        id
                        username
                    }
                }
            }
        ` // Placeholder for your LOGIN mutation definition
    );

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const response = await new Promise((resolve, reject) => {
                commitMutation({
                    variables: {
                        input: {
                            username: userFormData.username,
                            password: userFormData.password,
                        },
                    },
                    onCompleted: (response, errors) => {
                        if (errors) {
                            reject(errors);
                        } else {
                            resolve(response);
                        }
                    },
                    onError: reject,
                });
            });

            if (response && response.login) {
                Auth.login(response.login.token);
                console.log(userFormData.username);
                console.log(userFormData.password);
                // Redirect or update UI after successful login
            } else {
                console.error('Login response is not defined');
            }
        } catch (e) {
            console.error('Login submit error:', e); // Log the actual error
            console.log(userFormData.username);
            console.log(userFormData.password);
            console.log(userFormData);
            setShowAlert(true);
        }

        // clear form values
        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <Box className="login-page-container"> {/* Use a container for styling */}
            {/* Conditionally render Login Form or Registration Form */}
            {registrationForm ? (
                // Render Registration Form
                <RegistrationForm onSwitchToLogin={() => setRegistrationForm(false)} />
            ) : (
                // Render Login Form
                <form
                    onSubmit={handleFormSubmit}
                    id="login-form" // Changed id from 'body' to 'login-form' for clarity
                    className="login-form" // Add a class for styling
                >
                    <Alert
                        onClose={() => setShowAlert(false)}
                        severity="error"
                        // The 'open' prop is not standard for Alert. You might mean 'hidden' or 'display' style.
                        // For Material-UI Alert, you typically control visibility with conditional rendering.
                        style={{ display: showAlert ? 'flex' : 'none', marginBottom: '16px' }}
                    >
                        Something went wrong with your login credentials!
                        {error && ` Error: ${error.message}`} {/* Display actual error message */}
                    </Alert>

                    <TextField
                        label="Username" // Added label for better UX
                        type="text"
                        placeholder="Your username"
                        name="username"
                        onChange={handleInputChange}
                        value={userFormData.username}
                        required
                        fullWidth // Makes TextField take full width
                        margin="normal" // Adds default margin
                    />
                    <TextField
                        label="Password" // Added label for better UX
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
                        disabled={isLoading} // Disable button while loading
                        fullWidth
                        sx={{ mt: 2, mb: 1 }} // Margin top and bottom using sx prop
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </Button>
                    <Button
                        type='button' // Changed to 'button' to prevent form submission
                        onClick={() => setRegistrationForm(true)}
                        variant="text" // Text button style
                        color="secondary" // Secondary color
                        fullWidth
                    >
                        Don't have an account? Sign Up!
                    </Button>
                </form>
            )}
        </Box>
    );
}
