import React, { useState, useEffect } from 'react';
import { Button, Alert, Dialog, DialogActions, DialogTitle, CircularProgress, Typography } from '@mui/material';
import MajorTable from './MajorTable';
import MajorDialog from './MajorDialog';
import { BiSearch, BiArchive } from 'react-icons/bi';
import { AddOutlined } from '@mui/icons-material';
import { Major } from '../../../types/interface';
import NavbarHomePage from '../../../components/Navbar_HomePage';
import Sidebar from '../../../components/Sidebar';

const AdminMajor = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const partnerId = localStorage.getItem('partner_id');

  const fetchMajors = async () => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(
      `http://localhost:8000/api/partners/${partnerId}/majors`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const data = await response.json();
    setMajors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  const handleDialogOpen = (major: Major | null = null) => {
    setSelectedMajor(major);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedMajor(null);
    setIsDialogOpen(false);
    fetchMajors();
  };

  const handleMajorCreationSuccess = (action: 'create' | 'update') => {
    if (action === 'create') {
      setSuccessMessage('Major created successfully!');
    } else if (action === 'update') {
      setSuccessMessage('Major updated successfully!');
    }
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteClick = (major: Major) => {
    setSelectedMajor(major);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    const access_token = localStorage.getItem('access_token');
    const majorId = selectedMajor?.id;

    if (majorId) {
      const response = await fetch(`http://localhost:8000/api/majors/${majorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Major deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMajors();
      } else {
        alert('Failed to delete major');
      }
    }

    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const filteredMajors = majors.filter((major) =>
    major.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content" style={{padding: '5px 0 0 5px', backgroundColor: '#F8FAFC'}}>
          <div className="major-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Majors</h1>
            <div className="header-activity" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: '15px', fontSize: '16px', color: '#526d82' }}>
                Total Majors: {filteredMajors.length}
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
                style={{ marginLeft: '10px' }}
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

          {/* Loading Indicator or Table */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <CircularProgress />
            </div>
          ) : filteredMajors.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
              <BiArchive size={50} />
              <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
                No Data Available
              </Typography>
            </div>
          ) : (
            <MajorTable
              majors={filteredMajors}
              onEdit={(major: Major) => handleDialogOpen(major)}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this major?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Major Edit / Create Dialog */}
      {isDialogOpen && (
        <MajorDialog
          major={selectedMajor}
          onClose={handleDialogClose}
          onCreateSuccess={handleMajorCreationSuccess}
        />
      )}
    </div>
  );
};

export default AdminMajor;
