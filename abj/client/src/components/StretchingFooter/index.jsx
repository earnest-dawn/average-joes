import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StretchingFooter.css';

const CONFIG = {
  initialHeight: 60,   
  finalHeight: 180,    
  initialFontSize: 1.1,
  finalFontSize: 2.2,
  threshold: 300,      
};

const StretchingFooter = ({ onReachBottom, pageName }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isStretching, setIsStretching] = useState(false);
  const btnRef = useRef(null);
  const txtRef = useRef(null);
    const location = useLocation();

  const pageNames = {
    "/": "Home",
    "/about": "About",
    "/contact": "Contact",
    "/orderOnline": "Order Online",
     "/admin": "admin",
    "/manageMenu": "Manage Menu",
    "/manageCombos": "Manage Combos",
    "/manageRestaurant": "Manage Restaurant",

  };
    const currentPage = pageNames[location.pathname] || "Unknown Page";

  useEffect(() => {
    const handleScroll = () => {
      if (!btnRef.current || !txtRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      const distanceFromBottom = docHeight - (scrollY + windowHeight);
      
      const progress = Math.max(0, 1 - (distanceFromBottom / CONFIG.threshold));
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      setIsStretching(clampedProgress > 0.05);
      setIsAtBottom(distanceFromBottom <= 10);

      btnRef.current.style.height = `${CONFIG.initialHeight + (CONFIG.finalHeight - CONFIG.initialHeight) * clampedProgress}px`;
      txtRef.current.style.fontSize = `${CONFIG.initialFontSize + (CONFIG.finalFontSize - CONFIG.initialFontSize) * clampedProgress}rem`;

      if (distanceFromBottom < 5 && onReachBottom) onReachBottom();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [onReachBottom]);

  return (
    <div className="footer-sticky-container">
      <button
        ref={btnRef}
        className={`footer-button ${isAtBottom ? 'active-green' : 'idle-blue'} ${!isStretching ? 'idle-jiggle' : ''}`}
      >
        <span ref={txtRef} className="footer-text">
          Scroll to {pageName}
        </span>
      </button>
    </div>
  );
};

export default StretchingFooter;