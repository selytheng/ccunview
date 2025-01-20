import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './ContentHeader';
import TotalCard from './TotalCard';
import Barchart from './Barchart';
import Piechart from './Piechart';

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

  // Fetch partner courses data
  const fetchPartnerCoursesData = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/api/partners', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const partners: Partner[] = await response.json();

    // Fetch the number of courses for each partner
    const partnerData = await Promise.all(partners.map(async (partner: Partner) => {
      const coursesResponse = await fetch(`http://localhost:8000/api/partners/${partner.id}/courses`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const courses = await coursesResponse.json();
      return { name: partner.name, courseCount: courses.length };
    }));

    setPartnerData(partnerData);
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchTotalCourses();
    fetchTotalPartners();
    fetchTotalMajors();
    fetchPartnerCoursesData();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content" style={{ padding: 2 }}>
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
                <Piechart totalCourses={totalCourses} totalPartners={totalPartners} totalMajors={totalMajors} /> {/* Pass total values to Piechart */}
              </div>
            </div>
            <div className="calendar-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
