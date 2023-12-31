import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import denzelLogoBackground from '../../assets/images/denzelLogoBackground.png';
import denzelAward from '../../assets/images/denzelAward.jpg';
import './HomePage.css';
import insideFooTruck from '../../assets/images/insideFooTruck.jpg';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function HomePage() {
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
                            <button>ORDER NOW</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
