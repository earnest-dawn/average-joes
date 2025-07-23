import React, { useEffect, useRef, useState } from 'react'; // Removed forwardRef
import Layout from '../../components/Layout';
import { Box, Typography, Button, Paper } from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import './AboutPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ContactPage from '../ContactPage';

/**
 * Custom hook to add 'animate-in' class to an element after it mounts.
 * This is a general-purpose hook for animating elements on component load.
 * @param {React.RefObject<HTMLElement>} ref - A ref object attached to the element to animate.
 */
const useElementAnimateIn = (ref) => {
    useEffect(() => {
        if (ref.current) {
            const timer = setTimeout(() => {
                ref.current.classList.add('animate-in');
            }, 50);

            return () => {
                clearTimeout(timer);
                if (ref.current) {
                    ref.current.classList.remove('animate-in');
                }
            };
        }
    }, [ref]);
};

/**
 * About Component displays information about the restaurant/chef.
 * It now navigates using React Router.
 */
export default function About() { // Removed onBack and ref props
    const navigate = useNavigate(); // Initialize navigate hook

    // Refs for elements that will animate in (internal to About component)
    const title1Ref = useRef(null);
    const image1Ref = useRef(null);
    const caption1Ref = useRef(null);
    const title2Ref = useRef(null);
    const caption2Ref = useRef(null);
    const wholeAboutRef = useRef(null); // Ref for the root div of AboutPage

    // State to control the fade-out animation for this specific About component instance
    const [isFadingOut, setIsFadingOut] = useState(false);

    // Function to initiate the fade-out animation
    const triggerFadeOut = () => {
        if (isFadingOut) return; // Prevent multiple fade-out triggers
        setIsFadingOut(true); // Set state to true to apply 'fade-out' class
    };

    // Effect to handle the fade-out animation completion and navigate
    useEffect(() => {
        if (isFadingOut && wholeAboutRef.current) {
            const handleAnimationEnd = (event) => {
                // Ensure it's the 'fadeOut' animation on the root element that finished
                if (event.animationName === 'fadeOut') {
                    navigate('/'); // Navigate back to the HomePage route
                }
            };

            // Attach the animationend listener to the root element of About
            wholeAboutRef.current.addEventListener('animationend', handleAnimationEnd);

            // Cleanup: Remove the event listener when the effect re-runs or component unmounts
            return () => {
                if (wholeAboutRef.current) {
                    wholeAboutRef.current.removeEventListener('animationend', handleAnimationEnd);
                }
            };
        }
    }, [isFadingOut, navigate]); // Dependencies: re-run if these values change

    // Effect to handle scrolling to the top to trigger fade-out
    useEffect(() => {
        const handleScroll = () => {
            // Check if at the very top of the page (scroll position is 0)
            if (window.scrollY === 0) {
                triggerFadeOut(); // Trigger the fade-out animation
            }
        };

        // Attach the scroll event listener to the window
        window.addEventListener("scroll", handleScroll);

        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array: runs once on mount

    // Apply the animation hook to each ref for internal elements (staggered fade-in)
    useElementAnimateIn(title1Ref);
    useElementAnimateIn(image1Ref);
    useElementAnimateIn(caption1Ref);
    useElementAnimateIn(title2Ref);
    useElementAnimateIn(caption2Ref);

    return (
        // Apply the ref to the root div for animationend listener
        <div
            id="wholeAbout"
            ref={wholeAboutRef} // Attach ref for the root div
            className={isFadingOut ? 'fade-out' : 'fade-in'} // Apply 'fade-out' or 'fade-in' class
        >
            <Layout>
                <Box className="about-content-container">
                    <Paper className="about-paper-block">
                        {/* Back button, now calls local triggerFadeOut */}
                        <Button
                            variant="contained"
                            onClick={triggerFadeOut} // Call the local function to start fade-out
                            className="about-back-button"
                        >
                            Go Back
                        </Button>

                        {/* Welcome Section */}
                        <Typography
                            variant="h4"
                            component="h2"
                            className="aboutTitles"
                            ref={title1Ref}
                        >
                            Welcome To My Office <FoodBankIcon fontSize="large" sx={{ verticalAlign: 'middle', ml: 1 }} />
                        </Typography>
                        <Box className="about-section-spacing">
                            <img
                                src={denzelSuit}
                                alt="Denzel Washington in a suit"
                                className="about-image"
                                ref={image1Ref}
                            />
                            <Typography
                                variant="body1"
                                className="aboutCaptions"
                                ref={caption1Ref}
                            >
                         <Paper className="about-paper-caption">
                           Lorem ipsum dolor, sit amet consectetur adipisicing
                                elit. Fugiat quod, suscipit, aperiam totam autem culpa
                                cum eveniet dolorum quasi est perspiciatis laborum. Nam
                                recusandae nihil quia odio voluptatibus facere omnis
                                facilis rerum? Ab eum beatae nobis reiciendis, qui
                                temporibus aliquid, nesciunt velit sed quam recusandae
                                necessitatibus, tempora maxime. Repellendus incidunt,
                                maxime labore dolorum eos aperiam unde? At veritatis
                                nesciunt eos quas cupiditate blanditiis est quam
                                maiores, amet, soluta exercitationem voluptatum, veniam
                                assumenda? Ratione perferendis officiis deserunt nostrum
                                aspernatur sed asperiores! Earum sunt placeat ducimus
                                sint, deleniti amet esse saepe voluptatem commodi
                                laudantium quibusdam repellat nobis libero at
                                consectetur adipisci ipsa.
                                </Paper>
                            </Typography>
                        </Box>

                        {/* Culinary Journey Section */}
                        
                        <ContactPage/>
                    </Paper>
                </Box>
            </Layout>
        </div>
    );
}
