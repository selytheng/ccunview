import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './ContentHeader';
import MajorTable from './MajorTable';
import MajorDialog from './MajorDialog';

const AdminMajor = () => {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const partnerId = localStorage.getItem('partner_id');

  const fetchMajors = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(
      `http://localhost:8000/api/partners/${partnerId}/majors`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const data = await response.json();
    setMajors(data);
  };

  const handleDialogOpen = (major = null) => {
    setSelectedMajor(major);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedMajor(null);
    setIsDialogOpen(false);
    fetchMajors();
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <ContentHeader />
          <button
            onClick={() => handleDialogOpen()}
            className="mb-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            Create Major
          </button>
          <MajorTable
            majors={majors}
            onEdit={(major) => handleDialogOpen(major)}
            onDelete={fetchMajors}
          />
        </div>
      </div>
      {isDialogOpen && (
        <MajorDialog major={selectedMajor} onClose={handleDialogClose} />
      )}
    </div>
  );
};

export default AdminMajor;
