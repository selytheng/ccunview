import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../assets/css/admin.css";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import {
  Button,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Chip,
} from "@mui/material";
import { BiBookOpen, BiCalendar, BiPencil, BiSitemap, BiSolidMapPin, BiTrash } from "react-icons/bi";
import AdminEventEdit from "./AdminEventEdit"; // Assuming the dialog component is in the same folder

const AdminEventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for Edit dialog

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const eventResponse = await fetch(
          `http://localhost:8000/api/events/${id}`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );

        if (!eventResponse.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:8000/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        alert("Event deleted successfully!");
        window.location.href = "/admin/events"; // Redirect after deletion
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error occurred while deleting the event:", error);
      alert("An error occurred while deleting the event.");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true); // Open the Edit dialog
  };

  if (loading) {
    return (
      <div>
        <NavbarHomePage />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
              }}
            >
              <CircularProgress />
            </Box>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarHomePage />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard-content">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="breadcrumb" style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", backgroundColor: '' }}>
              <Link to="/admin/events" style={{ textDecoration: 'none', color: '#526d82', fontWeight: 'bold', display: 'flex' }}>
                <BiCalendar className="icon" style={{ fontSize: 16, marginTop: 4, marginRight: 3 }} /> Events
              </Link>{' '}{' /  '}<span> {event.title}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<BiPencil style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
                style={{ marginRight: "10px" }}
                onClick={handleEditClick} // Open Edit Dialog on click
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'rgb(220 38 38)' }}
                startIcon={<BiTrash style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
          </div>

          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
              padding: "0px 0 0 8px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Typography component="div" variant="h5" style={{ marginBottom: 13 }}>
                    {event.title}
                  </Typography>
                  <Chip label={event.status} style={{ fontSize: 14, backgroundColor: '#AAB7B7', marginTop: 3, display: 'flex', padding: 2 }} />
                </div>
                
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.secondary", marginBottom: 3,   }}
                >
                  {event.description}
                </Typography>
                <p 
                  style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181", display: 'flex'}}>
                  <BiSolidMapPin style={{ marginTop: 3, marginRight: 5 }} />Location: {event.location}
                </p>
                <p 
                  style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181", display: 'flex'}}>
                  <BiCalendar style={{ marginTop: 3, marginRight: 5 }} />Date: {event.start_date} - {event.end_date}
                </p>
                <p 
                  style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181", display: 'flex'}}>
                  <BiSitemap style={{ marginTop: 3, marginRight: 5 }} />Host: {event.partner.name} 
                </p>
              </CardContent>
            </Box>
            {event.image && (
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:8000/${event.image}`}
                alt={event.title}
                style={{ width: 500, height: 350 }}
              />
            )}
          </Card>

          {/* Gallery with horizontal scroll */}
          {event.gallery && (
            <div
              style={{
                display: "flex",
                overflowX: "scroll",
                padding: "10px 0",
              }}
            >
              {event.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={`http://localhost:8000/${image}`}
                  alt={`gallery-image-${index}`}
                  style={{ width: 150, height: 100, marginRight: 10 }}
                />
              ))}
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>
              Are you sure you want to delete this event?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                sx={{ backgroundColor: "rgb(220, 38, 38)" }}
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Admin Event Edit Dialog */}
          {event && (
            <AdminEventEdit
              open={openEditDialog}
              onClose={() => setOpenEditDialog(false)}
              eventId={id}
              eventData={event}
              onSubmit={() => {
                setOpenEditDialog(false); 
                window.location.reload(); 
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetail;
