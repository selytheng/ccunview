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
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [totalWorkshops, setTotalWorkshops] = useState(0);
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

  // Fetch total events data
  const fetchTotalEvents = async () => {
    const partnerId = localStorage.getItem('partner_id'); // Fixed: changed from `localStorage.get()`
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/events`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalEvents(data.length);
  };

  // Fetch total workshops data
  const fetchTotalWorkshops = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/workshops`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalWorkshops(data.length);
  };

  const fetchTotalTrainings = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = localStorage.getItem('partner_id');
    const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/trainings`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setTotalTrainings(data.length);
  };

  // Fetch partner courses data
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
    fetchTotalEvents();
    fetchTotalWorkshops();
    fetchTotalTrainings();
    fetchPartnerCoursesData();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard" style={{ padding: '5px 0 0 0 ' }}>
        <Sidebar />
        <div className="dashboard-content" style={{ padding: 2, backgroundColor: '#F8FAFC' }}>
          <ContentHeader />
          <div className="box-container" style={{ padding: '2px 2px 2px 10px', marginTop: '-10px', backgroundColor: '' }}>
            <div className="total">
              <div className="total-card">
                <TotalCard 
                  totalCourses={totalCourses} 
                  totalEvents={totalEvents} 
                  totalWorkshops={totalWorkshops} 
                  totalTrainings={totalTrainings} 
                />
              </div>
              <div className="chart-box" style={{ display: 'flex', gap: '20px' }}>
                <Barchart partnerData={partnerData} />
                <Piechart totalEvents={totalEvents} totalWorkshops={totalWorkshops} totalTrainings={totalTrainings} />
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
