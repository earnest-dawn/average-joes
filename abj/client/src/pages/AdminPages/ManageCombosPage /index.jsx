import React from "react";
import { Box, Typography, Button, Paper, ListItem } from "@mui/material";
import './manageCombos.css'
export default function ManageCombosPage() {
    return (
        <div id="wholeAbout">
        
                <Paper className="about-paper-block">
                    <Typography variant="h4" className="aboutHeadings">
                        Managing Combos
                    </Typography>
                    <Paper className="about-paper-caption">
                        <ListItem>
                            <Typography variant="body1" className="aboutCaptions">
                                This is where admin users can manage combo options.
                            </Typography>
                        </ListItem>
                        </Paper>
                    </Paper>
                  
            
        </div>
    );
}