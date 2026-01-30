import denzelAward from "../../assets/images/denzelAward.jpg";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import denzelLogoBackground from "../../assets/images/denzelLogoBackground.png";
import "./HomePage.css";
import "../ContactPage";
import StretchingHeader from "../../components/StretchingHeader";
import StretchingFooter from "../../components/StretchingFooter";
import Auth from "../../utils/auth";
import ContactPage from "../ContactPage";
import { Box } from "@mui/material";

export default function HomePage() {
  const [animateButton, setAnimateButton] = useState(false);
  const hasNavigatedToAbout = useRef(false); 
  const navigate = useNavigate(); 
  const [isExiting, setIsExiting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(Auth.loggedIn()); 
const [registrationForm, setRegistrationForm] = useState(false);

    const [userFormData, setUserFormData] = useState({
        username: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');
const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };
    

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setShowAlert(false); 
        setAlertMessage('');
        setAlertSeverity('error');

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setAlertMessage("Please fill in all required fields.");
            setShowAlert(true);
            return;
        }}
  
  useEffect(() => {
    setAnimateButton(true);
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold;

      if (isAtBottom && !hasNavigatedToAbout.current) {
        hasNavigatedToAbout.current = true;
        setIsExiting(true); 

        
        setTimeout(() => {
          navigate("/about");
          window.scrollTo(0, 130);
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]); 

  
    
    if (isLoggedIn) {
      return (<>
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
     <Box>
  <ContactPage />
</Box>
        <StretchingFooter pageName="About"/>

        <div></div>
      </div>
      </>);
    }
    return (<>
      <div id="wholeHome" className={isExiting ? "home-fade-out" : ""}>
        <div className="home">
          <div className="headerContainer">
            <div className="orderLink">
              
                <button
                  className={`orderNowButton${
                    animateButton ? " animate-in" : ""
                  }`}
                  onClick={() => navigate("/register")}
                >
                  <span className="buttonText">Register To Order!</span>
                </button>
            </div>
          </div>
        </div>
<Box >
  <ContactPage />
</Box>
        <StretchingFooter pageName="About" onClick={() => navigate("/about")}/>

        <div></div>
      </div>
      </>);
    
      
    
 
}
