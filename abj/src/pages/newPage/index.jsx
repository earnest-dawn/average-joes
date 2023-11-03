import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import './HomePage.css';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import denzelAward from '../../assets/images/denzelAward.jpg';

export default function BasicGrid() {
    return (
        <Box
            width={700}
            display={'flex'}
            alignItems={'center'}
            height="100vh"
            id="about"
        >
            <h1>Average Joe's Burgers</h1>
            <div>
                <section>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <img
                                id="aboutDenzel"
                                src={denzelSuit}
                                alt="The Chef Himself"
                                className="homeImages"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <p className="captions">
                                Roti Rolls was established in 2010 by Cory
                                Burke, and was one the first food trucks in
                                Charleston to roam the streets. Roti Rolls has
                                been voted Charleston's Best Food Truck every
                                year since! In 2016 Cory partnered up with Alton
                                Ankersen. Since that glorious day Roti has
                                expanded to Atlanta! Not only can you get our
                                delicious eats on the streets, we offer
                                speciality catering in Charleston and catering
                                in Atlanta for weddings, corporate events,
                                birthdays and pop ups. Do you like music? We do
                                too! You can also find the truck traveling the
                                Country slinging roti at Music & Art Festivals.
                            </p>
                        </Grid>
                    </Grid>
                </section>

                <section>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <p className="captions">
                                Roti Rolls was established in 2010 by Cory
                                Burke, and was one the first food trucks in
                                Charleston to roam the streets. Roti Rolls has
                                been voted Charleston's Best Food Truck every
                                year since! In 2016 Cory partnered up with Alton
                                Ankersen. Since that glorious day Roti has
                                expanded to Atlanta! Not only can you get our
                                delicious eats on the streets, we offer
                                speciality catering in Charleston and catering
                                in Atlanta for weddings, corporate events,
                                birthdays and pop ups. Do you like music? We do
                                too! You can also find the truck traveling the
                                Country slinging roti at Music & Art Festivals.
                            </p>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <img
                                id="denzelAccolades"
                                src={denzelAward}
                                alt="Accolades"
                                className="homeImages"
                            />
                        </Grid>
                    </Grid>
                </section>
            </div>
        </Box>
    );
}
