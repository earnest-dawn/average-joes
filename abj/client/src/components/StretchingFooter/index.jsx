import React from 'react';
import useScrollTransformEffect from '../../hooks/useStretchBox'; // Import the generalized hook
import { Box, Typography } from '@mui/material';

import './StretchingFooter.css'; // Create a new CSS file for footer specific styles

const StretchingFooter = () => {
    // Call the generalized hook for the footer
    const isFooterStretchingActive = useScrollTransformEffect('stretchingFooterButton', 'footerTextSpan', {
        direction: 'down', // Specify 'down' for footer
        thresholdOffset: 250, // Effect starts 250px from the bottom of the page
        initialHeight: 50,
        finalHeight: 120,
        initialFontSize: 1.0,
        finalFontSize: 2.2,
        initialTextScale: 1,
        finalTextScale: 1.1,
        easing: 'easeInCubic',
    });

    // You can add conditional styling for the footer button too, similar to the header
    // For simplicity, I'm just applying a base class here.
    const footerButtonClass = isFooterStretchingActive ? 'footer-stretching-active' : 'footer-stretching-default';

    return (
        <div className="sticky-footer-wrapper">
            <button
                id="stretchingFooterButton"
                className={`footer-button ${footerButtonClass}`}
            >
                <span id="footerTextSpan">Reach the Bottom for More!</span>
            </button>
        </div>
    );
};

export default StretchingFooter;
