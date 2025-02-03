import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar.tsx";
import "../assets/css/content.css";

const Partner = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/partners');
                setPartners(response.data); // Assuming response.data is an array of partners
            } catch (error) {
                console.error("Error fetching partners:", error);
                setError("Failed to load partners. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="mt-[130px] mb-[70px]">
                <div className="mb-3 px-4 sm:px-8">
                    <div className="event-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>Partners</h1>
                    </div>
                    <div className="container mx-auto">
                        <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="dashboard">
                                <div className="dashboard-content-home">
                                    {loading ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                            <CircularProgress />
                                        </div>
                                    ) : error ? (
                                        <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
                                            {error}
                                        </div>
                                    ) : (
                                        <Grid container spacing={2} className="mt-4">
                                            {partners.map((partner) => (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={partner.id}>
                                                    <Card className="bg-amber-500 mb-4 w-[330px] mr-[500px]"
                                                          sx={{
                                                              transition: 'transform 0.3s, box-shadow 0.3s',
                                                              '&:hover': {
                                                                  transform: 'scale(1.07)',
                                                                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                              },
                                                          }}
                                                    >
                                                        {partner.logo && (
                                                            <CardMedia
                                                                sx={{ height: 170 }}
                                                                image={`http://localhost:8000/${partner.logo}`} // Ensure this URL is correct
                                                                title={partner.name}
                                                            />
                                                        )}
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                <Link to={`/user/partners/${partner.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                                                    {partner.name}
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
                                                                {partner.description} {/* Directly use the description here */}
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
            </section>
            {/*<FooterComponent />*/}
        </div>
    );
};

export default Partner;