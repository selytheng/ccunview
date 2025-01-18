import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../../assets/css/admin.css';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';
import { Button, CircularProgress, Box, Card, CardContent, Typography, CardMedia, Alert } from '@mui/material';
import CourseEdit from './CourseEdit';
import { BiBookOpen, BiFlag, BiPencil, BiSignal1, BiSolidMapPin, BiSolidShareAlt, BiTrash } from 'react-icons/bi';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [majors, setMajors] = useState<any[]>([]);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false); // Add state for success alert

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');
        const courseResponse = await fetch(`http://localhost:8000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!courseResponse.ok) {
          throw new Error('Failed to fetch course details');
        }
        const courseData = await courseResponse.json();

        const partnerId = localStorage.getItem('partner_id');
        const majorsResponse = await fetch(`http://localhost:8000/api/partners/${partnerId}/majors`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!majorsResponse.ok) {
          throw new Error('Failed to fetch majors');
        }
        const majorsData = await majorsResponse.json();

        setCourse(courseData);
        setMajors(majorsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        alert('Course deleted successfully!');
        window.location.href = '/admin/course'; // Redirect to course list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error occurred while deleting the course:', error);
      alert('An error occurred while deleting the course.');
    }
  };

  const getMajorName = (majorId: number) => {
    const major = majors.find((m) => m.id === majorId);
    return major ? major.name : 'Unknown Major';
  };

  const getYearName = (yearId: number) => {
    const yearMapping = {
      1: 'Year 1',
      2: 'Year 2',
      3: 'Year 3',
      4: 'Year 4',
      5: 'Year 5',
    };
    return yearMapping[yearId] || 'Unknown Year';
  };

  const handleCourseUpdate = () => {
    setSuccessAlertVisible(true); // Show the success alert after the course update
    setTimeout(() => {
      setSuccessAlertVisible(false); // Hide the alert after 2 seconds
    }, 2000);
  };

  if (loading) {
    return (
      <div>
        <NavbarHomePage />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
              <CircularProgress />
            </Box>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarHomePage />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          {/* Breadcrumb */}
          <div className="breadcrumb" style={{ display: 'flex', backgroundColor: '', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <Link to="/admin/course" style={{ textDecoration: 'none', color: '#526d82', fontWeight: 'bold', display: 'flex' }}>
                <BiBookOpen className="icon" style={{ fontSize: 16, marginTop: 4, marginRight: 3 }} /> Courses
              </Link>{' '}
              {' /  '}
              <span> {course.name}</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0px' }}>
              <Button
                variant="contained"
                startIcon={<BiPencil style={{ fontSize: 18 }} />}
                className=" px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
                style={{ marginRight: '10px' }}
                onClick={() => setEditDialogOpen(true)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<BiTrash style={{ fontSize: 18, backgroundColor: '' }} />}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                style={{ backgroundColor: 'rgb(220 38 38)' }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Success Alert */}
          {successAlertVisible && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              Course updated successfully!
            </Alert>
          )}

          <Card sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, padding: '0px 0 0 8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '' }}>
              <CardContent sx={{}}>
                <Typography component="div" variant="h5" style={{ marginBottom: 13 }}>
                  {course.name}
                </Typography>
                <div style={{ display: 'flex', gap: 50 }}>
                  <p
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                      gap: 5,
                      fontFamily: 'Arial',
                      fontSize: 15,
                      color: '#868181',
                    }}
                  >
                    <BiSolidMapPin style={{ marginTop: 3 }} /> {getYearName(course.year_id)}
                  </p>

                  <p
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                      gap: 5,
                      textTransform: 'uppercase',
                      fontFamily: 'Arial',
                      fontSize: 15,
                      color: '#868181',
                    }}
                  >
                    <BiBookOpen style={{ marginTop: 3 }} /> {getMajorName(course.major_id)}
                  </p>
                </div>
                <Typography
                  style={{
                    backgroundColor: '',
                    width: 780,
                    textAlign: 'justify',
                    marginBottom: 13,
                  }}
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary' }}
                >
                  {course.description}
                </Typography>
                <p style={{ fontSize: 14, fontFamily: 'Arial' }}>
                  Link to CCUN course: &nbsp;
                  <a
                    className="link"
                    href={
                      course.link.startsWith('http://') || course.link.startsWith('https://')
                        ? course.link
                        : `http://${course.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {course.link}
                  </a>
                </p>
              </CardContent>
            </Box>
            {course.image && (
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:8000/${course.image}`}
                alt={course.name}
                style={{ width: 500, height: 350 }}
              />
            )}
          </Card>

          {/* Edit Dialog */}
          <CourseEdit
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            courseId={id as string}
            courseData={course}
            onSubmit={handleCourseUpdate} // Trigger success alert after update
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
