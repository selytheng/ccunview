import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';
import { BiSearch, BiArchive } from 'react-icons/bi';
import { Button, Card, CardContent, Typography, Grid, CircularProgress, CardMedia, Alert } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CourseCreate from './CourseCreate';  
import { Course } from '../../../types/interface';

interface AdminCourseProps {
  setTotalCourses: (total: number) => void; // Prop to update the total courses count in the parent
}

const AdminCourse: React.FC<AdminCourseProps> = ({ setTotalCourses }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);

  const fetchCourses = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/courses`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setCourses(data);
    setLoading(false);

    // Update the total number of courses in the parent component
    setTotalCourses(data.length);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  const handleCourseCreate = () => {
    fetchCourses();  
    setSuccessAlertVisible(true);  
    setTimeout(() => {
      setSuccessAlertVisible(false);
      handleClose();  
    }, 2000);
  };

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="course-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Courses</h1>
            <div className="header-activity" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: '15px', fontSize: '16px', color: '#526d82' }}>
                Total Courses: {filteredCourses.length} {/* Displaying the filtered courses count */}
              </Typography>
              <div className="search-box" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search anything here...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <BiSearch className="icon" />
              </div>
              <Button variant="contained" startIcon={<AddOutlined />} onClick={handleOpen}>
                Create
              </Button>
            </div>
          </div>

          {/* Success Alert */}
          {successAlertVisible && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              Course created successfully!
            </Alert>
          )}

          {/* Loading indicator */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <CircularProgress />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
              <BiArchive size={50} />
              <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
                No Data Available
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map((course) => (
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
                      {course.image && (
                        <CardMedia
                          sx={{ height: 170 }}
                          image={`http://localhost:8000/${course.image}`}
                          title={course.name}
                        />
                      )}

                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <div className="course-title" style={{ display: '', justifyContent: 'space-between', gap: 20 }}>
                            {course.name}
                          </div>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                            textAlign: 'justify',
                            minHeight: '3.2em',
                            lineHeight: '1.5em',
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
          )}
        </div>
      </div>

      <CourseCreate open={isDialogOpen} onClose={handleClose} onSubmit={handleCourseCreate} />
    </div>
  );
};

export default AdminCourse;
