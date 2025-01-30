import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar.tsx";
import "../assets/css/content.css";
import FooterComponent from '../components/HomeComponent/FooterComponent.tsx';

const Course = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/courses/all'); // Adjust the URL as needed
                console.log(response.data); // Log the response to check the structure
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                alert("Failed to load courses. Please try again later."); // Optional: alert user
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="mt-[130px] mb-[70px]">
                <div className="mb-3 px-4 sm:px-8">
                    <div
                        className="event-header"
                        style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                    >
                        <h1 style={{fontWeight: "bold", fontSize: 20, color: "#526d82"}}>Courses</h1>
                    </div>
                    <div className="container mx-auto">
                        <div
                            className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="dashboard ">
                                <div className="dashboard-content-home ">
                                    {loading ? (
                                        <div className=""
                                             style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                                            <CircularProgress/>
                                        </div>
                                    ) : (
                                        <Grid container spacing={0} className="">
                                            {courses.map((course) => (
                                                <Grid item xs={12} sm={6} md={3} key={course.id}>
                                                    <Card className="w-[330px] bg-amber-500 mr-[500px] mb-[30px] "
                                                          sx={{
                                                              maxWidth: 345,
                                                              transition: 'transform 0.3s, box-shadow 0.3s',
                                                              '&:hover': {
                                                                  transform: 'scale(1.11)',
                                                                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                              },
                                                          }}
                                                    >
                                                        {course.image && (
                                                            <CardMedia
                                                                sx={{height: 170}}
                                                                image={`http://localhost:8000/${course.image}`} // Ensure this URL is correct
                                                                title={course.name} // Use title for accessibility
                                                            />
                                                        )}
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                <Link to={`/user/course/${course.id}`}
                                                                      style={{textDecoration: 'none', color: '#000'}}>
                                                                    <div className="course-title" style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: '1.2rem'
                                                                    }}>
                                                                        {course.name} {/* Ensure title is displayed */}
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
                                                                <div
                                                                    className="course-description">{course.description}</div>
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
            <FooterComponent/>
        </div>
    );
};

export default Course;