import { useEffect, useRef, useState } from 'react';

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
 * @returns {boolean} isStretchingActive - True if the stretching effect is currently active (within activationThreshold).
 */
const useStretchingHeader = (buttonId, textSpanId, options = {}) => {
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
        easing = 'linear',
    } = options;

    const buttonRef = useRef(null);
    const textSpanRef = useRef(null);

    const [isStretchingActive, setIsStretchingActive] = useState(false);

    const getEasedProgress = (p, easingType) => {
        switch (easingType) {
            case 'easeInCubic':
                return p * p * p;
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

            const shouldBeActive = scrollY < activationThreshold;
            setIsStretchingActive(shouldBeActive);

            const linearProgress = 1 - Math.min(1, Math.max(0, scrollY / activationThreshold));
            const progress = getEasedProgress(linearProgress, easing);

            stretchingButton.style.height = `${initialButtonHeight + (finalButtonHeight - initialButtonHeight) * progress}px`;
            stretchingButton.style.width = `${initialButtonWidth + (finalButtonWidth - initialButtonWidth) * progress}%`;
            stretchingButton.style.fontSize = `${initialFontSize + (finalFontSize - initialFontSize) * progress}rem`;
            buttonTextSpan.style.transform = `scale(${initialTextScale + (finalTextScale - initialTextScale) * progress})`;
        };

        window.addEventListener('scroll', updateButtonOnScroll);
        updateButtonOnScroll();

        return () => {
            window.removeEventListener('scroll', updateButtonOnScroll);
        };
    }, [
        buttonId, textSpanId, activationThreshold, easing,
        initialButtonHeight, finalButtonHeight,
        initialFontSize, finalFontSize,
        initialTextScale, finalTextScale,
        initialButtonWidth, finalButtonWidth
    ]);

    return isStretchingActive;
};

export default useStretchingHeader;
