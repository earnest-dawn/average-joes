import { useEffect, useRef } from 'react';

/**
 * Custom React Hook to create a scroll-dependent stretching header effect.
 * The effect activates when the scroll position is above a certain threshold,
 * making a target element stretch and its content scale as the user scrolls towards the top.
 *
 * @param {string} buttonId - The ID of the button element to apply the effect to.
 * @param {string} textSpanId - The ID of the span element inside the button whose text will scale.
 * @param {object} options - Configuration options for the effect.
 * @param {number} [options.activationThreshold=200] - The scroll position (in pixels) where the effect begins to activate.
 * @param {number} [options.initialButtonHeight=60] - Button height when scrolled down (outside activation zone).
 * @param {number} [options.finalButtonHeight=100] - Button height when at the very top (scrollY === 0).
 * @param {number} [options.initialFontSize=1.2] - Button font size (rem) when scrolled down.
 * @param {number} [options.finalFontSize=2.0] - Button font size (rem) when at the very top.
 * @param {number} [options.initialTextScale=1] - Text scale (inside span) when scrolled down.
 * @param {number} [options.finalTextScale=1.2] - Text scale (inside span) when at the very top.
 * @param {number} [options.initialButtonWidth=90] - Button width (%) when scrolled down.
 * @param {number} [options.finalButtonWidth=100] - Button width (%) when at the very top.
 * @param {'linear' | 'easeInCubic'} [options.easing='linear'] - The easing function to apply to the scroll progress.
 */
const useStretchingHeader = (buttonId, textSpanId, options = {}) => {
    // Destructure options with default values
    const {
        activationThreshold = 200,
        initialButtonHeight = 60,
        finalButtonHeight = 100,
        initialFontSize = 1.2,
        finalFontSize = 2.0,
        initialTextScale = 1,
        finalTextScale = 1.2,
        initialButtonWidth = 90,
        finalButtonWidth = 100,
        easing = 'linear', // NEW: Easing option
    } = options;

    const buttonRef = useRef(null);
    const textSpanRef = useRef(null);

    // Helper function for easing
    const getEasedProgress = (p, easingType) => {
        switch (easingType) {
            case 'easeInCubic':
                return p * p * p; // Cubic ease-in
            case 'linear':
            default:
                return p;
        }
    };

    useEffect(() => {
        buttonRef.current = document.getElementById(buttonId);
        textSpanRef.current = document.getElementById(textSpanId);

        if (!buttonRef.current || !textSpanRef.current) {
            console.warn(`useStretchingHeader: Could not find elements with IDs '${buttonId}' or '${textSpanId}'.`);
            return;
        }

        const updateButtonOnScroll = () => {
            const stretchingButton = buttonRef.current;
            const buttonTextSpan = textSpanRef.current;

            if (!stretchingButton || !buttonTextSpan) return;

            const scrollY = window.scrollY;

            // Calculate linear progress (0 to 1, as scrollY goes from activationThreshold to 0)
            const linearProgress = 1 - Math.min(1, Math.max(0, scrollY / activationThreshold));

            // Apply easing function to the linear progress
            const progress = getEasedProgress(linearProgress, easing); // NEW: Apply easing

            // Interpolate button height
            const currentHeight = initialButtonHeight + (finalButtonHeight - initialButtonHeight) * progress;
            stretchingButton.style.height = `${currentHeight}px`;

            // Interpolate button width
            const currentWidth = initialButtonWidth + (finalButtonWidth - initialButtonWidth) * progress;
            stretchingButton.style.width = `${currentWidth}%`;

            // Interpolate font size
            const currentFontSize = initialFontSize + (finalFontSize - initialFontSize) * progress;
            stretchingButton.style.fontSize = `${currentFontSize}rem`;

            // Interpolate text scale (for the span inside)
            const currentTextScale = initialTextScale + (finalTextScale - initialTextScale) * progress;
            buttonTextSpan.style.transform = `scale(${currentTextScale})`;
        };

        window.addEventListener('scroll', updateButtonOnScroll);
        updateButtonOnScroll(); // Call once on mount

        return () => {
            window.removeEventListener('scroll', updateButtonOnScroll);
        };
    }, [
        buttonId, textSpanId, activationThreshold, easing, // Added easing to dependencies
        initialButtonHeight, finalButtonHeight,
        initialFontSize, finalFontSize,
        initialTextScale, finalTextScale,
        initialButtonWidth, finalButtonWidth
    ]);
};

export default useStretchingHeader;
