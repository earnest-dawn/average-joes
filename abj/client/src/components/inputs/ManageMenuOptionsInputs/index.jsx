import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Example Data (Replace this with your Relay fragment data later)
const rows = [
  { id: 1, name: 'Burger Launch', category: 'Main', price: '$12.00' },
  { id: 2, name: 'Admin User', category: 'Staff', price: 'N/A' },
  { id: 3, name: 'Special Sauce', category: 'Inventory', price: '$0.50' },
];

export default function AdminPageOptions() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'goldenrod' }}>
        Admin Dashboard Options
      </Typography>
      
      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow sx={{ bgcolor: '#333' }}>
              <TableCell sx={{ color: 'goldenrod', fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ color: 'goldenrod', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'goldenrod', fontWeight: 'bold' }}>Price/Status</TableCell>
              <TableCell sx={{ color: 'goldenrod', fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'white' }}>{row.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.category}</TableCell>
                <TableCell sx={{ color: 'white' }}>{row.price}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" sx={{ color: 'goldenrod', borderColor: 'goldenrod' }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}