import React, { useState, useEffect } from 'react';
import { Button, Alert, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import PartnerTable from './PartnerTable';
import PartnerDialog from './PartnerDialog';
import { BiSearch } from 'react-icons/bi';
import { AddOutlined } from '@mui/icons-material';
import '../../Admin/TotalCard';
import '../../../types/interface';
import { Partner } from '../../../types/interface';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';

const AdminPartner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const fetchPartners = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch('http://localhost:8000/api/partners', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const data = await response.json();
    setPartners(data);
  };

  const handleDialogOpen = (partner: Partner | null = null) => {
    setSelectedPartner(partner);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedPartner(null);
    setIsDialogOpen(false);
    fetchPartners();
  };

  const handlePartnerCreationSuccess = (action: 'create' | 'update') => {
    if (action === 'create') {
      setSuccessMessage('Partner created successfully!');
    } else if (action === 'update') {
      setSuccessMessage('Partner updated successfully!');
    }
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    const access_token = localStorage.getItem('access_token');
    const partnerId = selectedPartner?.id;

    if (partnerId) {
      const response = await fetch(`http://localhost:8000/api/partners/${partnerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Partner deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchPartners();
      } else {
        alert('Failed to delete partner');
      }
    }

    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content" style={{padding: '5px 0 0 5px', backgroundColor: '#F8FAFC'}}>
          <div className="course-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Partners</h1>
            <div className="header-activity" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: '15px', fontSize: '16px', color: '#526d82' }}>
                Total Partners: {filteredPartners.length}
              </Typography>
              <div className="search-box" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search anything here...."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <BiSearch className="icon" />
              </div>
              <Button
                variant="contained"
                startIcon={<AddOutlined />}
                onClick={() => handleDialogOpen()}
              >
                Create
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              {successMessage}
            </Alert>
          )}

          <PartnerTable
            partners={filteredPartners}
            onEdit={(partner: Partner) => handleDialogOpen(partner)}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this partner?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Partner Edit Dialog */}
      {isDialogOpen && (
        <PartnerDialog
          partner={selectedPartner}
          onClose={handleDialogClose}
          onCreateSuccess={handlePartnerCreationSuccess}
        />
      )}
    </div>
  );
};

export default AdminPartner;
