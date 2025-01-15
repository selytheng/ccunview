import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../../assets/css/admin.css';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';

const CourseDetail = () => {
  const { id } = useParams(); 
  
  const course = {
    id,
    title: `${id}`,
    description: `This is the detailed page for course with ID: ${id}. More info goes here.`,
  };

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/admin/course" style={{ textDecoration: 'none', color: '#526d82' }}>Courses</Link> {' > '}
            <span>{course.title}</span>
          </div>
          
          <h1>Course Detail: {course.title}</h1>
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
