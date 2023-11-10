import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './LogIn.css';

export default function LogInPage() {
    return (
        <>
            <div id="login">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    id="loginLayout"
                >
                    <section id="fieldBox">
                        <h1 id="adminTitle">Admin Login</h1>
                        <TextField
                            id="filled-basic"
                            label="Username?"
                            variant="filled"
                            className="loginField"
                        />
                        <TextField
                            className="loginField"
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                        />
                    </section>
                </Box>
            </div>
        </>
    );
}
