import React from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import './manageMenu.css'
export default function ManageMenuPage() {
    return (
        <div id="wholeAbout">
            <Box sx={{
                       }}>
                <Paper className="about-paper-block">
                    <Typography variant="h4" className="aboutHeadings">
                        Manage Menu Page
                    </Typography>
                    <Paper className="about-paper-caption">
                        <ListItem>
                            <Typography variant="body1" className="aboutCaptions">
                                This is where admin users can manage combo options.
                            </Typography>
                        </ListItem>
                        </Paper>
                    </Paper>
                    </Box>
            
        </div>
    );
}