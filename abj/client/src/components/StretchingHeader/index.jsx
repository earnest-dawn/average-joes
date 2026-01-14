import React, { useState, useEffect, useRef } from 'react';
import './StretchingHeader.css';
/**
 * CONFIGURATION
 * Control the min/max values and the scroll sensitivity here.
 */
const CONFIG = {
  initialHeight: 60,   // Height when scrolled away
  finalHeight: 180,    // Height when at the very top
  initialFontSize: 1.1,
  finalFontSize: 2.2,
  threshold: 300,      // Pixels from top where stretching begins
};

const StretchingHeader = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isStretching, setIsStretching] = useState(false);
  const btnRef = useRef(null);
  const txtRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!btnRef.current || !txtRef.current) return;

      const scrollY = window.scrollY;
      
      // Calculate progress (1 at top, 0 when scrolled past threshold)
      const progress = Math.max(0, 1 - (scrollY / CONFIG.threshold));
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      // UI State triggers
      setIsStretching(clampedProgress > 0.05);
      setIsAtTop(scrollY <= 10);

      // Direct DOM manipulation for high-performance style updates
      btnRef.current.style.height = `${CONFIG.initialHeight + (CONFIG.finalHeight - CONFIG.initialHeight) * clampedProgress}px`;
      txtRef.current.style.fontSize = `${CONFIG.initialFontSize + (CONFIG.finalFontSize - CONFIG.initialFontSize) * clampedProgress}rem`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="header-wrapper">
      <button
        ref={btnRef}
        className={`header-btn ${isAtTop ? 'active-state' : 'idle-state'} ${!isStretching ? 'jiggle-animation' : ''}`}
      >
        <span ref={txtRef} className="text-content">
          Scroll Up To View Home
        </span>
      </button>
    </div>
  );
};
export default StretchingHeader;