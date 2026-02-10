import { useEffect, useRef, useState } from 'react';

/**
 * Custom React Hook to apply a scroll-dependent transformation effect
 * (stretching/scaling) to a target element and its text content.
 * The effect activates within a defined scroll zone relative to the top or bottom of the page.
 *
 * @param {string} targetElementId - The ID of the main element to apply transformations to (e.g., the button).
 * @param {string} textElementId - The ID of the inner element whose text will scale (e.g., the span inside the button).
 * @param {object} options - Configuration options for the effect.
 * @param {'up' | 'down'} [options.direction='up'] - The scroll direction that triggers the effect.
 * - 'up': Effect is active when scrolling towards the top (scrollY approaches 0).
 * - 'down': Effect is active when scrolling towards the bottom (scrollY approaches maxScrollY).
 * @param {number} [options.thresholdOffset=200] - The scroll distance (in pixels) from the relevant edge
 * (top for 'up', bottom for 'down') over which the effect occurs.
 * @param {number} [options.initialHeight=60] - Element height when outside the active scroll zone.
 * @param {number} [options.finalHeight=100] - Element height when at the very edge (scrollY=0 for 'up', maxScrollY for 'down').
 * @param {number} [options.initialFontSize=1.2] - Element font size (rem) when outside the active scroll zone.
 * @param {number} [options.finalFontSize=2.0] - Element font size (rem) when at the very edge.
 * @param {number} [options.initialTextScale=1] - Text scale (inside span) when outside the active scroll zone.
 * @param {number} [options.finalTextScale=1.2] - Text scale (inside span) when at the very edge.
 * @param {number} [options.initialWidth=90] - Element width (%) when outside the active scroll zone.
 * @param {number} [options.finalWidth=100] - Element width (%) when at the very edge.
 * @param {'linear' | 'easeInCubic'} [options.easing='linear'] - The easing function to apply to the scroll progress.
 * @returns {boolean} isEffectActive - True if the transformation effect is currently active within its scroll zone.
 */
const useScrollTransformEffect = (targetElementId, textElementId, options = {}) => {
    const {
        direction = 'up',
        thresholdOffset = 200,
        initialHeight = 60,
        finalHeight = 100,
        initialFontSize = 1.2,
        finalFontSize = 2.0,
        initialTextScale = 1,
        finalTextScale = 1.2,
        initialWidth = 90,
        finalWidth = 100,
        easing = 'linear',
    } = options;

    const targetElementRef = useRef(null);
    const textElementRef = useRef(null);

    const [isEffectActive, setIsEffectActive] = useState(false);

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
        targetElementRef.current = document.getElementById(targetElementId);
        textElementRef.current = document.getElementById(textElementId);

        if (!targetElementRef.current || !textElementRef.current) {
            console.warn(`useScrollTransformEffect: Could not find elements with IDs '${targetElementId}' or '${textElementId}'.`);
            return;
        }

        const updateElementsOnScroll = () => {
            const targetElement = targetElementRef.current;
            const textElement = textElementRef.current;

            if (!targetElement || !textElement) return;

            const scrollY = window.scrollY;
            let linearProgress = 0;
            let shouldBeActive = false;

            if (direction === 'up') {
                shouldBeActive = scrollY < thresholdOffset;
                linearProgress = 1 - Math.min(1, Math.max(0, scrollY / thresholdOffset));
            } else if (direction === 'down') {
                const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
                const startScrollY = Math.max(0, maxScrollY - thresholdOffset);

                shouldBeActive = scrollY > startScrollY;
                linearProgress = Math.min(1, Math.max(0, (scrollY - startScrollY) / thresholdOffset));
            }

            setIsEffectActive(shouldBeActive);

            const progress = getEasedProgress(linearProgress, easing);

            targetElement.style.height = `${initialHeight + (finalHeight - initialHeight) * progress}px`;
            targetElement.style.width = `${initialWidth + (finalWidth - initialWidth) * progress}%`;
            targetElement.style.fontSize = `${initialFontSize + (finalFontSize - initialFontSize) * progress}rem`;
            textElement.style.transform = `scale(${initialTextScale + (finalTextScale - initialTextScale) * progress})`;
        };

        window.addEventListener('scroll', updateElementsOnScroll);
        updateElementsOnScroll();

        return () => {
            window.removeEventListener('scroll', updateElementsOnScroll);
        };
    }, [
        targetElementId, textElementId, direction, thresholdOffset, easing,
        initialHeight, finalHeight, initialFontSize, finalFontSize,
        initialTextScale, finalTextScale, initialWidth, finalWidth
    ]);

    return isEffectActive;
};

export default useScrollTransformEffect;
