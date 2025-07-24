import React from 'react';
import Layout from '../../components/Layout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

export default function ContactPage() {
    return (
        <div>
                <Box
                    sx={{
                        my: 5,
                        ml: 10,
                        '& h4': { fontWeight: 'bold', mb: 2 },
                    }}
                >
                </Box>
                <Box
                    sx={{
                        m: 3,
                        width: '600px',
                        ml: 10,
                        '@media (max-width:600px)': {
                            width: '300px',
                        },
                    }}
                >
                    <Typography variant="h4">Contact My Resturant</Typography>
<TableContainer component={Paper}>
                        <Table aria-label="contact table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            bgcolor: 'black',
                                            color: 'white',
                                        }}
                                        align="center"
                                    >
                                        Contact Details
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <SupportAgentIcon
                                            sx={{ color: 'red', pt: 1 }}
                                        />{' '}
                                        1800-00-0000 (tollfree)
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <MailIcon
                                            sx={{ color: 'skyblue', pt: 1 }}
                                        />{' '}
                                        help@myrest.com
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <CallIcon
                                            sx={{ color: 'green', pt: 1 }}
                                        />{' '}
                                        619-456-7890
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
        </div>
    );
}
