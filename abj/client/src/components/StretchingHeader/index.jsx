import React, { useState, useEffect } from 'react';
import useStretchingHeader from '../../hooks/useStretchBox'; // Corrected import path for the hook
import { Box, Typography } from '@mui/material'; // Keep Box, Typography if they are used elsewhere in your project

import './StretchingHeader.css'; // Assuming you have some styles for the header

const StretchingHeader = () => {
    const [buttonColor, setButtonColor] = useState(false);

    // Call the custom stretching hook and get its active state
    const isStretchingActive = useStretchingHeader('stretchingButton', 'buttonTextSpan', {
        activationThreshold: 300,
        finalButtonHeight: 180,
        finalFontSize: 2.5,
        finalTextScale: 1.3,
        easing: 'easeInCubic',
    });

    // This useEffect is for the button color change based on scrollY
    useEffect(() => {
        const buttonColorChange = () => {
            const scrollY = window.scrollY;
            if (scrollY <= 85) {
                setButtonColor(true); // Applies 'topScrollComplete' class
            } else {
                setButtonColor(false); // Applies 'stretchingButtonDefault' class
            }
        };

        window.addEventListener('scroll', buttonColorChange);
        buttonColorChange(); // Initial call to set the color based on current scroll position

        return () => {
            window.removeEventListener('scroll', buttonColorChange);
        };
    }, []); // Empty dependency array: runs once on mount

    // Determine if the idle animation should be active
    // It should be active ONLY when the stretching effect is NOT active
    const showIdleAnimation = !isStretchingActive;

    return (
        <>
            <div className="sticky-header-wrapper">
                <button
                    id="stretchingButton"
                    // Apply conditional classes: color-change class AND idle animation class
                    className={`${buttonColor ? 'topScrollComplete' : 'stretchingButtonDefault'} ${showIdleAnimation ? 'idle-grow-shrink' : ''}`}
                >
                    <span id="buttonTextSpan">Scroll Up To View Home</span>
                </button>
            </div>
        </>
    );
};

export default StretchingHeader;
