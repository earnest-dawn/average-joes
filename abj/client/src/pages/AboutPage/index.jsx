import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { Box, Typography, Button, Paper } from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import denzelAward from '../../assets/images/denzelAward.jpg';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import './AboutPage.css';
import { useNavigate } from 'react-router-dom';
import ContactPage from '../ContactPage';
import StretchingHeader from '../../components/StretchingHeader';

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
export default function About() {
    
    const navigate = useNavigate();
    const [animateButton, setAnimateButton] = useState(false);
    const title1Ref = useRef(null);
    const image1Ref = useRef(null);
    const caption1Ref = useRef(null);
    const title2Ref = useRef(null);
    const image2Ref = useRef(null);
    const caption2Ref = useRef(null);
    const wholeAboutRef = useRef(null);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const triggerFadeOut = () => {
        if (isFadingOut) return;
        setIsFadingOut(true);
    };


    useEffect(() => {
        setAnimateButton(true);
    }, []);

    useEffect(() => {
        if (isFadingOut && wholeAboutRef.current) {
            const handleAnimationEnd = (event) => {
                if (event.animationName === 'fadeOut') {
                    navigate('/');
                }
            };
            wholeAboutRef.current.addEventListener('animationend', handleAnimationEnd);
            return () => {
                if (wholeAboutRef.current) {
                    wholeAboutRef.current.removeEventListener('animationend', handleAnimationEnd);
                }
            };
        }
    }, [isFadingOut, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                triggerFadeOut();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useElementAnimateIn(title1Ref);
    useElementAnimateIn(image1Ref);
    useElementAnimateIn(caption1Ref);
    useElementAnimateIn(title2Ref);
    useElementAnimateIn(image2Ref);
    useElementAnimateIn(caption2Ref);

    return (
        <div
            id="wholeAbout"
            ref={wholeAboutRef}
            className={isFadingOut ? 'fade-out' : 'fade-in'}

        >
            <Layout>
                <Box className="about-content-container" >
                    <Paper className="about-paper-block">
                        
                        <StretchingHeader onClick={triggerFadeOut}/>
                        

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
                            {/* RE-INTRODUCED NESTED PAPER HERE */}
                            <Paper className="about-paper-caption">
                                <Typography
                                    variant="body1"
                                    className="aboutCaptions"
                                    ref={caption1Ref}
                                >
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
                                </Typography>
                            </Paper>
                        </Box>

                        {/* This is the only line changed to fix whitespace */}
                        <ContactPage sx={{ mt: 0, ml: { xs: 0, md: 10 } }} />
                    </Paper>
                </Box>
            </Layout>
        </div>

    );
}
