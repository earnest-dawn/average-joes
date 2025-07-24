import './LogIn.css';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Link } from '@mui/material';
import { LOGIN } from '../../utils/mutations/mutations';
import { useMutation } from 'react-relay/hooks';
import { graphql } from 'babel-plugin-relay/macro';

import RegistrationForm from '../../components/RegistrationForm';
import Auth from '../../utils/auth';

export default function LoginPage() {
    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);

    const [commitMutation, isLoading, error] = useMutation(LOGIN);

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
                            username: userFormData.username, // Use userFormData here
                            password: userFormData.password, // Use userFormData here
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
                console.log(userFormData.username); // Use userFormData here
                console.log(userFormData.password); // Use userFormData here
            } else {
                console.error('Login response is not defined');
            }
        } catch (e) {
            console.error('login submit error');
            console.log(userFormData.username); // Use userFormData here
            console.log(userFormData.password); // Use userFormData here
            console.log(userFormData); // Use userFormData here
            setShowAlert(true);
        }

        // clear form values
        setUserFormData({
            username: '',
            password: '',
        });
    };


    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                id="body"
            >
                <Alert
                    onClose={() => setShowAlert(false)}
                    severity="error"
                    open={showAlert}
                >
                    Something went wrong with your login credentials!
                </Alert>
                <TextField
                    type="text"
                    placeholder="Your username"
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                />
                <TextField
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
                <Link
                    to="/signup"
                    className="btn-nav"
                    id="btn-login"
                >
                    Signup?
                </Link>
            </form>
            <form ></form>
        </>
    );
}
