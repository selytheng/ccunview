import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { BiArchive } from "react-icons/bi";
import AdminEventAdd from "./AdminEventAdd"; // Import the AdminEventAdd component

const AdminEvent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // State to manage dialog visibility
  const navigate = useNavigate(); // Hook to navigate between routes
  const access_token = localStorage.getItem("access_token");
  const partnerId = localStorage.getItem("partner_id");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/partners/${partnerId}/events`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>
            Events
          </h1>

          {/* "Create" Button to open the dialog */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateDialog(true)}
            style={{ marginBottom: 20 }}
          >
            Create New Event
          </Button>

          {error && (
            <Alert severity="error" style={{ marginBottom: 20 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <CircularProgress />
            </div>
          ) : events.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px",
              }}
            >
              <BiArchive size={50} />
              <Typography
                variant="h6"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                No Events Available
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3}>
              {events.map((event) => (
                <Grid item xs={12} sm={6} md={3} key={event.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.01)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                    onClick={() => navigate(`/admin/events/${event.id}`)} // Navigate to the event details page
                  >
                    {event.image && (
                      <CardMedia
                        sx={{ height: 170 }}
                        image={`http://localhost:8000/${event.image}`}
                        title={event.title}
                      />
                    )}

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          WebkitLineClamp: 2,
                          textAlign: "justify",
                          minHeight: "3.2em",
                          lineHeight: "1.5em",
                        }}
                      >
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* AdminEventAdd Dialog Component */}
          <AdminEventAdd
            open={openCreateDialog}
            onClose={() => setOpenCreateDialog(false)}
            onSubmit={fetchEvents} // Refresh the event list after adding a new event
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEvent;
