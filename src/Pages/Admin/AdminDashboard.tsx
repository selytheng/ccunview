import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './ContentHeader';
import TotalCard from './TotalCard';

const AdminDashboard: React.FC = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalMajors, setTotalMajors] = useState(0);  

  const fetchTotalCourses = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/courses`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalCourses(data.length);
  };

  const fetchTotalPartners = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/api/partners', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalPartners(data.length);
  };

  const fetchTotalMajors = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/majors`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalMajors(data.length); 
  };

  useEffect(() => {
    fetchTotalCourses();
    fetchTotalPartners();
    fetchTotalMajors();  
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content" style={{ padding: 2, backgroundColor: '' }}>
          <ContentHeader />
          <div className="box-container" style={{ padding: 2, backgroundColor: 'red', marginTop: '-10px' }}>
            <div className="total">
              <div className="total-card">
                <TotalCard totalCourses={totalCourses} totalPartners={totalPartners} totalMajors={totalMajors} />
              </div>
              <div className="chart-box"></div>
            </div>
            <div className="calendar-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
