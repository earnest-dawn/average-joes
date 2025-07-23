import denzelAward from '../../assets/images/denzelAward.jpg';
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import denzelLogoBackground from '../../assets/images/denzelLogoBackground.png';
import './HomePage.css';
import '../ContactPage'
export default function HomePage() {
    const [animateButton, setAnimateButton] = useState(false);
    const hasNavigatedToAbout = useRef(false); // Ref to prevent multiple navigations
    const navigate = useNavigate(); // Initialize navigate hook

    // Effect for the button animation
    useEffect(() => {
        setAnimateButton(true);
    }, []);

    // Effect for scroll detection to navigate to About page
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 100;
            const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - scrollThreshold);

            if (isAtBottom && !hasNavigatedToAbout.current) {
                hasNavigatedToAbout.current = true; // Mark as navigated
                navigate('/about'); // Navigate to the About page route
                
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navigate]); // Add navigate to dependencies

    return (
        <>
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
                            <button className={`orderNowButton${animateButton ? " animate-in" : ""}`}><span className="buttonText">ORDER NOW</span></button>
                        </Link>
                    </div>
                </div>
                <div id="contentDiv" >
                  <img
                                                  src={denzelAward}
                                                  alt="Denzel Washington holding an award"
                                               
                                              />
                    <h1>Scroll down to find out more about the Chef</h1>
                </div>
            </div>
        </>
    );
}
