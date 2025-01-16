import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [partnerName, setPartnerName] = useState('');
  const [roleName, setRoleName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);

          setRoleName(data.role_id === 1 ? 'Super Admin' : 'Partner Admin');

          const partnerResponse = await fetch('http://localhost:8000/api/partners', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });

          if (partnerResponse.ok) {
            const partners = await partnerResponse.json();
            const partner = partners.find((p) => p.id === data.partner_id);
            setPartnerName(partner ? partner.name : 'Unknown Partner');
          } else {
            console.error('Failed to fetch partner data');
          }
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('access_token'); // Clear token from local storage
        navigate('/login'); // Redirect to login page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <div>
      <div>
        <NavbarHomePage />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <div className="p-6">
              {profile ? (
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
                  <div className="p-6">
                    <h1 className="text-2xl font-semibold text-center mb-4">Admin Profile</h1>
                    <div className="space-y-4">
                      <p>
                        <strong>Name:</strong> {profile.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {profile.email}
                      </p>
                      <p>
                        <strong>Role:</strong> {roleName}
                      </p>
                      <p>
                        <strong>Partner:</strong> {partnerName}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center gap-4">
                      <Link to="/admin/edit-profile">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                          Edit Profile
                        </button>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">Loading profile...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
