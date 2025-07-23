import React, { useEffect, useState, useRef, onBack } from "react";
import Layout from '../../components/Layout';
import { Box, Typography } from '@mui/material';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import denzelAward from '../../assets/images/denzelAward.jpg';
import denzelSuit from '../../assets/images/denzelSuit.jpg';
import insideFooTruck from '../../assets/images/insideFooTruck.jpg';
import './AboutPage.css';
export default function About({onBack}) {
    return (
        <div
            style={{
                backgroundColor: '#004c4c',
            }}
            id="wholeAbout"
        >
            <Layout>
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 2,
                        '& h4': {
                            fontWeight: 'bold',
                            my: 2,
                            fontSize: '2rem',
                        },
                        '& p': {
                            textAlign: 'justify',
                        },
                        '@media (max-width:600px)': {
                            mt: 0,
                            '& h4 ': {
                                fontSize: '1.5rem',
                            },
                        },
                    }}
                >
                    <button onClick={onBack}>Home</button>
                    <Typography
                        variant="h4"
                        className="aboutTitles"
                    >
                        Welcome To My Office <FoodBankIcon fontSize="medium" />
                    </Typography>
                    <img
                        src={denzelSuit}
                        alt="denzelSuit"
                        width={400}
                    />
                    <p className="aboutCaptions">
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
                    </p>
                    <br />
                    <Typography
                        variant="h4"
                        className="aboutTitles"
                    >
                        Welcome To My Office <FoodBankIcon fontSize="medium" />
                    </Typography>

                    <img
                        src={denzelAward}
                        alt="denzelAward"
                        width={400}
                    />
                    <p className="aboutCaptions">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Commodi, deserunt libero reprehenderit cum sint fugit
                        cumque temporibus modi facere eveniet amet obcaecati
                        ducimus harum velit maxime vel qui voluptatibus quam
                        odio corrupti saepe, voluptas dolorum quidem tempore?
                        Esse sapiente molestias minus enim quisquam dolorum eum
                        culpa ullam impedit velit quo, corporis ducimus numquam
                        dignissimos inventore maiores. Nam deleniti itaque
                        nostrum neque dolorum dolores, aliquam, voluptatum
                        sapiente doloribus laborum perspiciatis ipsam, quo ut
                        nisi distinctio sunt nihil est blanditiis perferendis
                        eveniet nesciunt! Nostrum, voluptatum eveniet repellat
                        vel officia deleniti tempore voluptatibus perferendis
                        esse eaque temporibus porro? Aspernatur beatae deleniti
                        illo autem!
                    </p>
                </Box>
            </Layout>
        </div>
    );
}
