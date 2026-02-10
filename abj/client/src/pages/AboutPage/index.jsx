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
import StretchingFooter from '../../components/StretchingFooter';
/**
 * Custom hook to add 'animate-in' class to an element after it mounts.
 * This is a general-purpose hook for animating elements on component load.
 * @param {React.RefObject<HTMLElement>} ref - A ref object attached to the element to animate.
 */
const useElementAnimateIn = (ref) => {
    useEffect(() => {
        if (ref.current) {
            

            return () => {
                clearTimeout();
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
        const image2Ref = useRef(null);

    const caption1Ref = useRef(null);
    const title2Ref = useRef(null);
    const caption2Ref = useRef(null);
    const wholeAboutRef = useRef(null);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const hasNavigatedToHome = useRef(false);
    const [isExiting, setIsExiting] = useState(false);
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
                    window.scrollTo(0, 0);
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
          const scrollThreshold = 100;
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - scrollThreshold;
    
          if (isAtBottom && !hasNavigatedToHome.current) {
        hasNavigatedToHome.current = true;
                   setIsFadingOut(true);
                  

      }
    };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [navigate]);

    useElementAnimateIn(title1Ref);
    useElementAnimateIn(image1Ref);
        useElementAnimateIn(image2Ref);

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
                <Box className="about-content-container" >
                    <Paper className="about-paper-block">
                        
                        

                        <Typography
                            variant="h4"
                            component="h2"
                            className="aboutTitles"
                            ref={title1Ref}
                        >
                            Welcome To My Office <FoodBankIcon fontSize="large" sx={{ verticalAlign: 'middle', ml: 1 }} />
                        </Typography>
                        <Box className="about-section-spacing">
                           <Paper>
                            <img
                                src={denzelSuit}
                                alt="Denzel Washington in a suit"
                                className="about-image"
                                ref={image1Ref}
                            />
                            </Paper> 
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
<Box>
                            <Paper>
                                <img src={denzelAward} 
                                alt="my Accolade"
                                ref={image2Ref} 
                                className='about-image'/>
                            </Paper>
                        </Box>
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
                        
                    </Paper>
                    <StretchingFooter pageName="Home"/>
                </Box>

        </div>

    );
}
