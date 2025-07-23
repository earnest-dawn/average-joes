import React, { useEffect, useState, useRef, onBack } from "react";
import { Link } from 'react-router-dom';
import denzelLogoBackground from '../../assets/images/denzelLogoBackground.png';
import denzelAward from '../../assets/images/denzelAward.jpg';
import './HomePage.css';
import insideFooTruck from '../../assets/images/insideFooTruck.jpg';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import About from '../AboutPage';


export default function HomePage() {
    const [animate, setAnimate] = useState(false);
    const [showAboutPage, setShowAboutPage] = useState(false);
    const hasLoadedAbout = useRef(false);

    useEffect(() => {
        setAnimate(true);
    }, []);
    const handleHome = () => {
        setShowAboutPage(false);
        hasLoadedAbout.current = false;
    }
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 0; // Load About page when within 100px of the bottom
            const pageBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - scrollThreshold);
            const top = window.scrollY== 0; // Check if at the top of the page
            if (top) {
                setShowAboutPage(false);
                hasLoadedAbout.current = false;
            }
            if (pageBottom && !hasLoadedAbout.current) {
                hasLoadedAbout.current = true;
                setShowAboutPage(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <>
        {!showAboutPage ? (
      <div id="wholeHome">
        <div
          className="home"
          style={{
            backgroundImage: `url(${denzelLogoBackground})`,
          }}
        >
          <div className="headerContainer">
            <h1>Average Joe's Burgers</h1>
            <p>Best Burgers on the West Coast!</p>
            <Link to="/orderOnline">
              <button className={`orderNowButton${animate ? " animate-in" : ""}`}>
                <span className="buttonText">ORDER NOW</span>
              </button>
            </Link>
          </div>
        </div>
        <div id="contentDiv">
          <h1>Scroll to find out more about the Chef</h1>
        </div>
      </div>
    ) : (
                <About onBack={handleHome} />
    )}
  </>
);
}
