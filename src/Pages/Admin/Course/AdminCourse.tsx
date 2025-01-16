import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CourseCreate from './CourseCreate';

const AdminCourse: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchCourses = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost:8000/api/courses`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="course-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Courses</h1>
            <Button variant="contained" startIcon={<AddOutlined />} onClick={() => setIsDialogOpen(true)}>
              Create
            </Button>
          </div>

          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={3} key={course.id}>
                <Link to={`/admin/course/${course.id}`} style={{ textDecoration: 'none' }}>
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
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {course.name}
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
                        {course.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      {/* Course Create Dialog */}
      <CourseCreate open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={fetchCourses} />
    </div>
  );
};

export default AdminCourse;
