import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/admin.css';
import { BiStats, BiBookOpen, BiClipboard, BiCategory, BiCalendar, BiGroup, BiSidebar, BiCommentDetail } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa'; // Icon for user logo

const Sidebar = () => {
  const [partnerName, setPartnerName] = useState(null); // State to store partner name

  // Fetch user data and partner name
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('http://localhost:8000/api/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const partnerId = userData.partner_id;

          // Fetch partner name using partner ID
          const partnersResponse = await fetch('http://localhost:8000/api/partners', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          if (partnersResponse.ok) {
            const partnersData = await partnersResponse.json();
            const partner = partnersData.find(p => p.id === partnerId);
            setPartnerName(partner ? partner.name : 'Unknown Partner');
          } else {
            console.error('Failed to fetch partners data');
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='menu'>
        <div className='menu-list'>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCategory className="icon" />
                Dashboard
            </NavLink>
            <NavLink
              to="/admin/course"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiBookOpen className="icon" />
                Courses
            </NavLink>
            <NavLink
              to="/admin/major"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiClipboard className='icon'/>
                Majors
            </NavLink>
            <NavLink
              to="/admin/training"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiStats className='icon'/>
                Trainings
            </NavLink>
            <NavLink
              to="/admin/workshop"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiSidebar className='icon'/>
                Workshops
            </NavLink>
            <NavLink
              to="/admin/event"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCalendar className='icon'/>
                Events
            </NavLink>
            <NavLink
              to="/admin/partner"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiGroup className='icon'/>
                Partner
            </NavLink>
            <NavLink
              to="/admin/feedback"
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCommentDetail className='icon'/>
                Feedback
            </NavLink>
        </div>
        {/* User logo with partner name */}
        <div className="user-info">
          <NavLink to="/admin/profile" className="profile-link">
            <FaUserCircle className="user-icon" />
            {partnerName !== null ? (
              <span className="partner-name">Partner: {partnerName}</span>
            ) : (
              <span className="loading">Loading...</span>
            )}
          </NavLink>
        </div>
    </div>
  );
}

export default Sidebar;
