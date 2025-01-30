import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface Event {
    id: number;
    title: string;
    description: string;
    image?: string;
}

const News: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events');
                console.log(response.data);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Failed to load events. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="">
                <div className="relative w-full ">
                    <div className="absolute inset-0 h-96 w-full bg-gray-300"></div>
                    <div className="relative pt-28 text-center mt-[110px] ">
                        <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-blue-950 mb-4 text-3xl lg:text-4xl">
                            News
                        </h2>
                        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-blue-950 font-bold mb-9 opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum
                            mi nec, ultricies metus.
                        </p>
                    </div>
                </div>
                <div className="mt-20 mb-3 px-4 sm:px-8">
                    <div className="container mx-auto">
                        <div className="py-12 flex flex-col sm:flex-row justify-center rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="flex flex-col justify-center w-full sm:w-auto">
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 ">
                                    <div className="mb-3 px-4 sm:px-8 ">
                                        <div className="container mx-auto ">
                                            <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                                                <div className="dashboard">
                                                    <div className="dashboard-content-home">
                                                        {loading ? (
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                marginTop: '50px'
                                                            }}>
                                                                <CircularProgress />
                                                            </div>
                                                        ) : error ? (
                                                            <Typography variant="body1" color="error" align="center">
                                                                {error}
                                                            </Typography>
                                                        ) : (
                                                            <Grid container spacing={3}>
                                                                {events.map((event) => (
                                                                    <Grid item xs={12} sm={6} md={3} key={event.id}>
                                                                        <Card className="w-[330px] mr-[500px]"
                                                                              sx={{
                                                                                  maxWidth: 345,
                                                                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                                                                  '&:hover': {
                                                                                      transform: 'scale(1.01)',
                                                                                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                                                  },
                                                                              }}
                                                                        >
                                                                            {event.image && (
                                                                                <CardMedia
                                                                                    sx={{ height: 170 }}
                                                                                    image={`http://localhost:8000/${event.image}`}
                                                                                    title={event.title}
                                                                                />
                                                                            )}
                                                                            <CardContent>
                                                                                <Typography gutterBottom variant="h6" component="div">
                                                                                    <Link
                                                                                        to={`/user/events/${event.id}`}
                                                                                        style={{
                                                                                            textDecoration: 'none',
                                                                                            color: '#000'
                                                                                        }}>
                                                                                        <div
                                                                                            className="event-title"
                                                                                            style={{
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: '1.2rem'
                                                                                            }}>
                                                                                            {event.title}
                                                                                        </div>
                                                                                    </Link>
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        color: 'text.secondary',
                                                                                        display: '-webkit-box',
                                                                                        WebkitBoxOrient: 'vertical',
                                                                                        overflow: 'hidden',
                                                                                        WebkitLineClamp: 3,
                                                                                        textAlign: 'justify',
                                                                                    }}
                                                                                >
                                                                                    <div className="event-description">
                                                                                        {event.description}
                                                                                    </div>
                                                                                </Typography>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent />
        </div>
    );
};

export default News;