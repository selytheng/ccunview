import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../../assets/css/admin.css';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';
import CourseEdit from './CourseEdit';
import { Button } from '@mui/material';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [majors, setMajors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem('access_token');

        // Fetch course details
        const courseResponse = await fetch(`http://localhost:8000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!courseResponse.ok) {
          throw new Error('Failed to fetch course details');
        }
        const courseData = await courseResponse.json();

        // Fetch majors
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

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/admin/course" style={{ textDecoration: 'none', color: '#526d82' }}>Courses</Link> {' > '}
            <span>{course.name}</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button
              variant="contained"
              className="mr-2 px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded"
              style={{ marginRight: '10px' }}
              onClick={() => setEditDialogOpen(true)}
            >
              Edit
            </Button>
            <Button variant="contained" className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded" onClick={handleDelete}>
              Delete
            </Button>
          </div>

          <h1><strong>Course Name:</strong> {course.name}</h1>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Year:</strong> {getYearName(course.year_id)}</p>
          <p><strong>Major:</strong> {getMajorName(course.major_id)}</p>
          <p>
            <strong>Link:</strong>{' '}
            <a
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
          {course.image && (
              <div>
                <strong>Image:</strong>
                <img src={`http://localhost:8000/${course.image}`} alt={course.name}
                     style={{maxWidth: '100%', marginTop: '10px'}}/>
              </div>
          )}

          {/* Edit Dialog */}
          <CourseEdit
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            courseId={id as string}
            courseData={course}
            onSubmit={() => window.location.reload()} // Refresh page on update
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
