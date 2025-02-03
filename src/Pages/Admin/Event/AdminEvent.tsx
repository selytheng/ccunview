import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import { BiSearch, BiArchive } from "react-icons/bi";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  CardMedia,
  Alert,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import AdminEventAdd from "./AdminEventAdd";
import API_BASE_URL from "../../../components/API_BASE_URL";

const AdminEvent: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const partnerId = localStorage.getItem("partner_id");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/partners/${partnerId}/events`,
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

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleEventCreate = () => {
    fetchEvents();
    setSuccessAlertVisible(true);
    setTimeout(() => {
      setSuccessAlertVisible(false);
      handleCloseCreateDialog();
    }, 2000);
  };

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div
          className="dashboard-content"
          style={{ padding: "5px 0 0 5px", backgroundColor: "#F8FAFC" }}
        >
          <div
            className="event-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>
              Events
            </h1>
            <div
              className="header-activity"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                variant="h6"
                sx={{ marginLeft: "15px", fontSize: "16px", color: "#526d82" }}
              >
                Total Events: {filteredEvents.length}
              </Typography>
              <div
                className="search-box"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <BiSearch className="icon" />
              </div>
              <Button
                variant="contained"
                startIcon={<AddOutlined />}
                onClick={handleOpenCreateDialog}
              >
                Create
              </Button>
            </div>
          </div>

          {/* Success Alert */}
          {successAlertVisible && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              Event created successfully!
            </Alert>
          )}

          {/* Loading indicator */}
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
          ) : filteredEvents.length === 0 ? (
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
              {filteredEvents.map((event) => (
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
                    onClick={() => navigate(`/admin/events/${event.id}`)}
                  >
                    {event.image && (
                      <CardMedia
                        sx={{ height: 170 }}
                        image={`${API_BASE_URL}/${event.image}`}
                        title={event.title}
                      />
                    )}

                    <CardContent className="event-title">
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
                          WebkitLineClamp: 3,
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

          <AdminEventAdd
            open={openCreateDialog}
            onClose={handleCloseCreateDialog}
            onSubmit={handleEventCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEvent;
