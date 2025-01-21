import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import "../../assets/css/content.css"

const courses = [
    {
        id: 1,
        title: "Web Design",
        description: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
        image: "/public/web-design.png",
    },
    {
        id: 2,
        title: "Telecommunication",
        description: "Master JavaScript with deep dives into ES6+ features, closures, promises, and more.",
        image: "/public/Telecommunication.jpg",
    },
    {
        id: 3,
        title: "Cyber Security",
        description: "Learn the fundamentals of web development using HTML and CSS, the building blocks of the web.",
        image: "/public/cyber-security.jpeg",
    },
    {
        id: 4,
        title: "Artificial Intelligence",
        description: "A comprehensive course on data structures and algorithms, essential for programming interviews.",
        image: "/public/AI.jpg",
    },
    {
        id: 5,
        title: "Data Structures and Algorithms",
        description: "A comprehensive course on data structures and algorithms, essential for programming interviews.",
        image: "/public/AI.jpg",
    },
    {
        id: 6,
        title: "Data Structures and Algorithms",
        description: "A comprehensive course on data structures and algorithms, essential for programming interviews.",
        image: "/public/AI.jpg",
    },
];

const Course = () => {
    return (
        <div>
            <section className="">
                <div className="mb-3 px-4 sm:px-8">
                    <div className="container mx-auto">
                        <div
                            className=" flex flex-col sm:flex-row justify-center rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                            <div className="dashboard">
                                <div className="dashboard-content-home">
                                    <Grid container spacing={3}>
                                        {courses.map((courses) => (
                                            <Grid item xs={12} sm={6} md={3} key={courses.id}>
                                                <Card
                                                    sx={{
                                                        maxWidth: 345,
                                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                                        '&:hover': {
                                                            transform: 'scale(1.01)',
                                                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                        },
                                                    }}
                                                >
                                                    <CardMedia sx={{height: 170}} image={courses.image}
                                                               title={courses.title}/>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h6" component="div">
                                                            {/* Link updated to use "/admin/course/:id" */}
                                                            <Link to={`/user/course/${courses.id}`}
                                                                  style={{textDecoration: 'none', color: '#000'}}>
                                                                <div className="course-title">{courses.title}</div>
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
                                                                className="course-description">{courses.description}</div>
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

export default Course;
