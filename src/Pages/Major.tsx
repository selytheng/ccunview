import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar.tsx";
import "../assets/css/content.css";
import FooterComponent from '../components/HomeComponent/FooterComponent.tsx';

const Major = () => {
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/majors'); // Adjust the URL as needed
                console.log(response.data); // Log the response to check the structure
                setMajors(response.data);
            } catch (error) {
                console.error("Error fetching majors:", error);
                alert("Failed to load majors. Please try again later."); // Optional: alert user
            } finally {
                setLoading(false);
            }
        };

        fetchMajors();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="mt-[130px] mb-[70px]">
                <div className="mb-3 px-4 sm:px-8">
                    <div
                        className="event-header"
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>Majors</h1>
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
                                            {majors.map((major) => (
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
                                                                image={`http://localhost:8000/${major.logo}`} // Ensure this URL is correct
                                                                title={major.name} // Use title for accessibility
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
                                                                        {major.name} {/* Ensure title is displayed */}
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




// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import "../assets/css/content.css";
// import Navbar from "../components/Navbar.tsx";

// interface Course {
//     id: number;
//     title: string;
//     logo: string;
// }

// const courses: Course[] = [
//     {
//         id: 1,
//         title: "GIC",
//         image: "/public/web-design.png",
//     },
//     {
//         id: 2,
//         title: "GCA",
//         image: "/public/Telecommunication.jpg",
//     },
//     {
//         id: 3,
//         title: "GCI",
//         image: "/public/cyber-security.jpeg",
//     },
//     {
//         id: 4,
//         title: "AMS",
//         image: "/public/AI.jpg",
//     },
//     {
//         id: 5,
//         title: "GRU",
//         image: "/public/AI.jpg",
//     },
//     {
//         id: 6,
//         title: "GGG",
//         image: "/public/AI.jpg",
//     },
//     {
//         id: 7,
//         title: "GEE",
//         image: "/public/AI.jpg",
//     },
// ];

// const Major: React.FC = () => {
//     return (
//         <div>
//             <Navbar />
//             <section className="mt-[130px]">
//                 <div className="mb-3 px-4 sm:px-8">
//                     <div className="container mx-auto">
//                         <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
//                             <div className="dashboard">
//                                 <div className="dashboard-content-home">
//                                     <Grid container spacing={3}>
//                                         {courses.map((course) => (
//                                             <Grid item xs={12} sm={6} md={3} key={course.id}>
//                                                 <Card className="w-[330px] mr-[120px]"
//                                                       sx={{
//                                                           maxWidth: 345,
//                                                           transition: 'transform 0.3s, box-shadow 0.3s',
//                                                           '&:hover': {
//                                                               transform: 'scale(1.01)',
//                                                               boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//                                                           },
//                                                       }}
//                                                 >
//                                                     <CardMedia sx={{ height: 170 }} image={course.image} title={course.title} />
//                                                     <CardContent>
//                                                         <Typography gutterBottom variant="h6" component="div">
//                                                             <Link to={`/user/course/${course.id}`} style={{ textDecoration: 'none', color: '#000' }}>
//                                                                 <div className="course-title">{course.title}</div>
//                                                             </Link>
//                                                         </Typography>
//                                                     </CardContent>
//                                                 </Card>
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Major;