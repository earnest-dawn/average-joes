import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff0000',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function CustomizedRating() {
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">What would you rate it?</Typography>
            <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value: number) =>
                    `${value} Flame${value !== 1 ? 's' : ''}`
                }
                precision={0.1}
                icon={<WhatshotIcon fontSize="inherit" />}
                emptyIcon={<WhatshotIcon fontSize="inherit" />}
            />
        </Box>
    );
}
