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
];

const Course = () => {
    return (
        <div>
            <div className="dashboard">
                <div className="dashboard-content-home">
                    <Grid container spacing={3}>
                        {courses.map((course) => (
                            <Grid item xs={12} sm={6} md={3} key={course.id}>
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
                                    <CardMedia sx={{ height: 170 }} image={course.image} title={course.title} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {/* Link updated to use "/admin/course/:id" */}
                                            <Link to={`/user/course/${course.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                                                <div className="course-title">{course.title}</div>
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
                                            <div className="course-description">{course.description}</div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Course;
