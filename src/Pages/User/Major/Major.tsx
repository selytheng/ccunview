import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../../components/Navbar.tsx";
import "../../../assets/css/content.css";
import FooterComponent from '../../../components/HomeComponent/FooterComponent.tsx';

const Major = () => {
    const [majors, setMajors] = useState([]);
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/partners');
                setPartners(response.data);
            } catch (error) {
                console.error("Error fetching partners:", error);
            }
        };

        const fetchMajors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/majors');
                setMajors(response.data);
            } catch (error) {
                console.error("Error fetching majors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
        fetchMajors();
    }, []);

    const filteredMajors = selectedPartner
        ? majors.filter(major => major.partner_id === selectedPartner)
        : majors;

    return (
        <div>
            <Navbar />
            <section className="mt-[130px] mb-[70px]">
                <div className="mb-3 px-4 sm:px-8">
                    <div className="event-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>Majors</h1>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Filter by Partner</InputLabel>
                            <Select
                                value={selectedPartner}
                                onChange={(e) => setSelectedPartner(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">All Partners</MenuItem>
                                {partners.map((partner) => (
                                    <MenuItem key={partner.id} value={partner.id}>{partner.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="container mx-auto">
                        <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="dashboard">
                                <div className="dashboard-content-home">
                                    {loading ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                        <Grid container spacing={2} className="mt-4">
                                            {filteredMajors.map((major) => (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={major.id}>
                                                    <Card className="bg-amber-500 mb-4 w-[330px] mr-[130px]"
                                                          sx={{
                                                              maxWidth: 345,
                                                              transition: 'transform 0.3s, box-shadow 0.3s',
                                                              '&:hover': {
                                                                  transform: 'scale(1.11)',
                                                                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                              },
                                                          }}
                                                    >
                                                        {major.logo && (
                                                            <CardMedia
                                                                sx={{ height: 170 }}
                                                                image={`http://localhost:8000/${major.logo}`}
                                                                title={major.name}
                                                            />
                                                        )}
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                <Link to={`/user/majors/${major.id}`}
                                                                      style={{ textDecoration: 'none', color: '#000' }}>
                                                                    <div className="major-title" style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: '1.2rem'
                                                                    }}>
                                                                        {major.name}
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
                                                                <div className="major-description">{major.description}</div>
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
            <FooterComponent />
        </div>
    );
};

export default Major;