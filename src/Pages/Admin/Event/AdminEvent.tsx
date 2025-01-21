import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, Alert, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { BiArchive, BiSearch } from "react-icons/bi";
import { AddOutlined } from "@mui/icons-material";
import AdminEventAdd from "./AdminEventAdd"; // Import the AdminEventAdd component
import { Event } from "../../../types/interface"; // Ensure Event is typed properly

const AdminEvent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const partnerId = localStorage.getItem("partner_id");

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/partners/${partnerId}/events`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting an event
  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    const access_token = localStorage.getItem('access_token');
    const eventId = selectedEvent?.id;

    if (eventId) {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage('Event deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchEvents(); // Reload events
      } else {
        alert('Failed to delete event');
      }
    }

    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  // Handle opening the event creation dialog
  const handleDialogOpen = (event: Event | null = null) => {
    setSelectedEvent(event);
    setOpenCreateDialog(true);
  };

  // Handle closing the event creation dialog
  const handleDialogClose = () => {
    setSelectedEvent(null);
    setOpenCreateDialog(false);
    fetchEvents(); // Reload events to show the newly created event
  };

  // Handle event creation success
  const handleEventCreationSuccess = (action: 'create' | 'update') => {
    if (action === 'create') {
      setSuccessMessage('Event created successfully!');
    } else if (action === 'update') {
      setSuccessMessage('Event updated successfully!');
    }
    setTimeout(() => setSuccessMessage(''), 3000);
    fetchEvents(); // Reload events after creation
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, events]);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="course-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Events</h1>
            <div className="header-activity" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: '15px', fontSize: '16px', color: '#526d82' }}>
                Total Events: {filteredEvents.length}
              </Typography>
              <div className="search-box" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search events..."
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

          {error && (
            <Alert severity="error" style={{ marginBottom: 20 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <CircularProgress />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "50px" }}>
              <BiArchive size={50} />
              <Typography variant="h6" style={{ marginTop: "20px", textAlign: "center" }}>
                No Events Available
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3}>
              {filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} md={3} key={event.id}>
                  <Card sx={{ maxWidth: 345, transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "scale(1.01)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}} onClick={() => navigate(`/admin/events/${event.id}`)}>
                    {event.image && (
                      <CardMedia sx={{ height: 170 }} image={`http://localhost:8000/${event.image}`} title={event.title} />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: 2, textAlign: "justify", minHeight: "3.2em", lineHeight: "1.5em" }}>
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* AdminEventAdd Dialog Component */}
          <AdminEventAdd open={openCreateDialog} onClose={handleDialogClose} onSubmit={handleEventCreationSuccess} />

        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default AdminEvent;
