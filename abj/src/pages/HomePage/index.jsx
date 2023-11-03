import React from 'react';
import ComplexCard from '../../components/inputs/CardInputs/ComplexCard';
// import './HomePage.css';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import denzelAward from '../../assets/images/denzelAward.jpg';

export default function HomePage() {
    return (
        <div id="home">
            <title>Average Joe's Burgers</title>
            <div id="about">
                <section>
                    <div className="abouts">
                        <h1 className="title">The Chef Himself</h1>
                        <img
                            id="aboutDenzel"
                            src={denzelSuit}
                            alt="The Chef Himself"
                            className="homeImages"
                        />
                        <p>
                            Roti Rolls was established in 2010 by Cory Burke,
                            and was one the first food trucks in Charleston to
                            roam the streets. Roti Rolls has been voted
                            Charleston's Best Food Truck every year since! In
                            2016 Cory partnered up with Alton Ankersen. Since
                            that glorious day Roti has expanded to Atlanta! Not
                            only can you get our delicious eats on the streets,
                            we offer speciality catering in Charleston and
                            catering in Atlanta for weddings, corporate events
                            birthdays and pop ups. Do you like music? We do too!
                            You can also find the truck traveling the Country
                            slinging roti at Music & Art Festivals.
                        </p>
                    </div>
                </section>
                <div className="abouts">
                    <section>
                        <h1 className="title">Accolades</h1>
                        <img
                            id="accoladeDenzel"
                            src={denzelAward}
                            alt="Accolades"
                            className="homeImages"
                        />
                        <p className="captions">
                            Local farmers are what makes Roti Rolls so
                            incredibly delicious! Buying fresh and seasonally
                            also allows us to change our menu constantly. This
                            is where 'Farm to Truck' really comes into play.
                            Some of the farms we support - Abundant Seafood
                            Joseph Fields Farm Spade & Clover Carolina Heritage
                            Farms GrowFood Carolina Chucktown Chicken
                        </p>
                    </section>
                </div>
            </div>

            <section id="cards">
                <li>
                    <ComplexCard />
                </li>
                <li>
                    <ComplexCard />
                </li>
            </section>
        </div>
    );
}
