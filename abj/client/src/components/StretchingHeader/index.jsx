import React, { useState, useEffect } from 'react';
import useScrollTransformEffect from '../../hooks/useScrollTransformEffect'; // Updated import path and name
import { Box, Typography } from '@mui/material';

import './StretchingHeader.css';

const StretchingHeader = () => {
    const [buttonColor, setButtonColor] = useState(false);

    // Call the generalized hook for the header
    const isHeaderStretchingActive = useScrollTransformEffect('stretchingButton', 'buttonTextSpan', {
        direction: 'up', // Specify 'up' for header
        thresholdOffset: 300,
        initialHeight: 60,
        finalHeight: 180,
        initialFontSize: 1.2,
        finalFontSize: 2.5,
        initialTextScale: 1,
        finalTextScale: 1.3,
        easing: 'easeInCubic',
    });

    // This useEffect is for the button color change based on scrollY
    useEffect(() => {
        const buttonColorChange = () => {
            const scrollY = window.scrollY;
            if (scrollY <= 50) {
                setButtonColor(true); // Applies 'topScrollComplete' class
            } else {
                setButtonColor(false); // Applies 'stretchingButtonDefault' class
            }
        };

        window.addEventListener('scroll', buttonColorChange);
        buttonColorChange();

        return () => {
            window.removeEventListener('scroll', buttonColorChange);
        };
    }, []);

    // Determine if the idle animation should be active for the header button
    const showHeaderIdleAnimation = !isHeaderStretchingActive;

    return (
        <>
            <div className="sticky-header-wrapper">
                <button
                    id="stretchingButton"
                    className={`${buttonColor ? 'topScrollComplete' : 'stretchingButtonDefault'} ${showHeaderIdleAnimation ? 'idle-grow-shrink' : ''}`}
                >
                    <span id="buttonTextSpan">Scroll Up To View Home</span>
                </button>
            </div>
        </>
    );
};

export default StretchingHeader;
