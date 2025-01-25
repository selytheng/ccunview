import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import "../assets/css/content.css";
import Navbar from "../components/Navbar.tsx";

interface Course {
    id: number;
    title: string;
    image: string;
}

const courses: Course[] = [
    {
        id: 1,
        title: "GIC",
        image: "/public/web-design.png",
    },
    {
        id: 2,
        title: "GCA",
        image: "/public/Telecommunication.jpg",
    },
    {
        id: 3,
        title: "GCI",
        image: "/public/cyber-security.jpeg",
    },
    {
        id: 4,
        title: "AMS",
        image: "/public/AI.jpg",
    },
    {
        id: 5,
        title: "GRU",
        image: "/public/AI.jpg",
    },
    {
        id: 6,
        title: "GGG",
        image: "/public/AI.jpg",
    },
    {
        id: 7,
        title: "GEE",
        image: "/public/AI.jpg",
    },
];

const Major: React.FC = () => {
    return (
        <div>
            <Navbar />
            <section className="mt-[130px]">
                <div className="mb-3 px-4 sm:px-8">
                    <div className="container mx-auto">
                        <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="dashboard">
                                <div className="dashboard-content-home">
                                    <Grid container spacing={3}>
                                        {courses.map((course) => (
                                            <Grid item xs={12} sm={6} md={3} key={course.id}>
                                                <Card className="w-[330px] mr-[120px]"
                                                      sx={{
                                                          maxWidth: 345,
                                                          transition: 'transform 0.3s, box-shadow 0.3s',
                                                          '&:hover': {
                                                              transform: 'scale(1.01)',
                                                              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                          },
                                                      }}
                                                >
                                                    <CardMedia sx={{ height: 170 }} image={course.image} title={course.title} />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            <Link to={`/user/course/${course.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                                                <div className="course-title">{course.title}</div>
                                                            </Link>
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Major;