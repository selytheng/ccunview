import React, { useState, useEffect } from 'react';
import NavbarHomePage from '../../components/Navbar_HomePage';
import Sidebar from '../../components/Sidebar';
import ContentHeader from './ContentHeader';
import PartnerTable from './PartnerTable';
import PartnerDialog from './PartnerDialog';

const AdminPartner = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPartners = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost:8000/api/partners`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setPartners(data);
  };

  const handleDialogOpen = (partner = null) => {
    setSelectedPartner(partner);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedPartner(null);
    setIsDialogOpen(false);
    fetchPartners();
  };

  useEffect(() => {
    fetchPartners();
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
            Create Partner
          </button>
          <PartnerTable
            partners={partners}
            onEdit={(partner) => handleDialogOpen(partner)}
            onDelete={fetchPartners}
          />
        </div>
      </div>
      {isDialogOpen && (
        <PartnerDialog
          partner={selectedPartner}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default AdminPartner;
