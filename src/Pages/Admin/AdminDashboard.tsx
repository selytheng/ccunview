import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './ContentHeader';
import TotalCard from './TotalCard';
import Barchart from './Barchart';
import Piechart from './Piechart';
import Calendar from './Calendar'; // Import the Calendar component
import { Card } from '@mui/material';

// Define Partner type
interface Partner {
  id: number;
  name: string;
}

const AdminDashboard: React.FC = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPartners, setTotalPartners] = useState(0);
  const [totalMajors, setTotalMajors] = useState(0);
  const [partnerData, setPartnerData] = useState<{ name: string; courseCount: number }[]>([]);

  // Fetch total courses data
  const fetchTotalCourses = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/courses`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalCourses(data.length);
  };

  // Fetch total partners data
  const fetchTotalPartners = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/api/partners', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalPartners(data.length);
  };

  // Fetch total majors data
  const fetchTotalMajors = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/majors`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalMajors(data.length);
  };
  const fetchPartnerCoursesData = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/api/partners', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const partners: Partner[] = await response.json();

    const partnerData = await Promise.all(partners.map(async (partner: Partner) => {
      const coursesResponse = await fetch(`http://localhost:8000/api/partners/${partner.id}/courses`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const courses = await coursesResponse.json();
      return { name: partner.name, courseCount: courses.length };
    }));

    setPartnerData(partnerData);
  };

  useEffect(() => {
    fetchTotalCourses();
    fetchTotalPartners();
    fetchTotalMajors();
    fetchPartnerCoursesData();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard" style={{padding: '5px 0 0 0 '}}>
        <Sidebar />
        <div className="dashboard-content" style={{ padding: 2, backgroundColor: '#F8FAFC' }}>
          <ContentHeader />
          <div className="box-container" style={{ padding: '2px 2px 2px 10px', marginTop: '-10px', backgroundColor: '' }}>
            <div className="total">
              <div className="total-card">
                <TotalCard 
                  totalCourses={totalCourses} 
                  totalPartners={totalPartners} 
                  totalMajors={totalMajors} 
                />
              </div>
              <div className="chart-box" style={{ display: 'flex', gap: '20px' }}>
                <Barchart partnerData={partnerData} />
                <Piechart totalCourses={totalCourses} totalPartners={totalPartners} totalMajors={totalMajors} />
              </div>
            </div>
            <Card className="calendar-box">
              <Calendar /> 
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
