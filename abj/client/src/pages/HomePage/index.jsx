import denzelAward from "../../assets/images/denzelAward.jpg";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import denzelLogoBackground from "../../assets/images/denzelLogoBackground.png";
import "./HomePage.css";
import "../ContactPage";
import StretchingHeader from "../../components/StretchingHeader";
import StretchingFooter from "../../components/StretchingFooter";

export default function HomePage() {
  const [animateButton, setAnimateButton] = useState(false);
  const hasNavigatedToAbout = useRef(false); // Ref to prevent multiple navigations
  const navigate = useNavigate(); // Initialize navigate hook
  const [isExiting, setIsExiting] = useState(false);

  // Effect for the button animation
  useEffect(() => {
    setAnimateButton(true);
  }, []);

  // Effect for scroll detection to navigate to About page
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold;

      if (isAtBottom && !hasNavigatedToAbout.current) {
        hasNavigatedToAbout.current = true;
        setIsExiting(true); // Trigger a local fade-out first

        // Small delay to allow the fade-out animation to start
        setTimeout(() => {
          navigate("/about");
          window.scrollTo(0, 200);
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]); // Add navigate to dependencies

  return (
    <>
      <div id="wholeHome" className={isExiting ? "home-fade-out" : ""}>
        <div className="home">
          <div className="headerContainer">
            <div className="orderLink">
              <Link to="/orderOnline">
                <button
                  className={`orderNowButton${
                    animateButton ? " animate-in" : ""
                  }`}
                >
                  <span className="buttonText">ORDER NOW</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
     
        <StretchingFooter pageName="About"/>

        <div></div>
      </div>
    </>
  );
}
