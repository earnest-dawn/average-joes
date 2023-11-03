import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import './HomePage.css';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import denzelAward from '../../assets/images/denzelAward.jpg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                columns={2}
                gridAutoRows={2}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                id="about"
            >
                <section>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <p className="captions">
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
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <img
                            id="aboutDenzel"
                            src={denzelSuit}
                            alt="The Chef Himself"
                            className="homeImages"
                        />
                    </Grid>
                </section>

                <section>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <img
                            id="denzelAccolades"
                            src={denzelAward}
                            alt="Accolades"
                            className="homeImages"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <p className="captions">
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
                    </Grid>
                </section>
            </Grid>
        </Box>
    );
}
