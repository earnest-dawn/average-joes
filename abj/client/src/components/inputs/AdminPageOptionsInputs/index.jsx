import * as React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, Typography, Box 
} from '@mui/material';

export default function AdminPageOptions({ data = [], columns = [], title }) {
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'goldenrod' }}>
        {title || "Admin Dashboard"}
      </Typography>
      
      <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a', color: 'white' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#333' }}>
              {/* 2. Map through columns to create headers dynamically */}
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ color: 'goldenrod', fontWeight: 'bold' }}>
                  {col.label}
                </TableCell>
              ))}
              <TableCell sx={{ color: 'goldenrod', fontWeight: 'bold' }} align="right"><Button>Create</Button></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* 3. Use the 'data' prop here instead of the old 'rows' variable */}
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ color: 'white' }}>
                      {/* Access the value using the key (e.g., row['name']) */}
                      {row[col.key]}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <Button size="small" variant="outlined" sx={{ color: 'goldenrod', borderColor: 'goldenrod' }}>
                      Edit
                    </Button>
                    <Button size="small" variant="outlined" sx={{ color: 'goldenrod', borderColor: 'goldenrod' }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              /* This is what you're seeing now because 'data' is undefined or empty inside this component */
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ color: 'gray', py: 3 }}>
                  No inventory found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}