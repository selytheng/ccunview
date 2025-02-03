import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../assets/css/admin.css";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";
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
  DialogContent,
  Chip,
} from "@mui/material";
import {
  BiCalendar,
  BiPencil,
  BiSitemap,
  BiSolidMapPin,
  BiTrash,
  BiImageAdd,
} from "react-icons/bi";

import AdminEventDeleteGallery from "./AdminEventDeleteGallery.tsx";
import AdminEventAddGallery from "./AdminEventAddGallery";
import AdminEventEdit from "./AdminEventEdit";
import moment from "moment";

const AdminEventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditGalleryDialog, setOpenEditGalleryDialog] = useState(false);
  const [openAddGalleryDialog, setOpenAddGalleryDialog] = useState(false);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openAllImagesModal, setOpenAllImagesModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const eventResponse = await fetch(`${API_BASE_URL}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

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
      const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        alert("Event deleted successfully!");
        window.location.href = "/admin/events";
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

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleEditGalleryClick = () => {
    setOpenEditGalleryDialog(true);
  };

  const handleAddGalleryClick = () => {
    setOpenAddGalleryDialog(true);
  };

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isSame(end, "day")) {
      return `${start.format("MMM Do YYYY, h:mm A")} - ${end.format("h:mm A")}`;
    } else {
      return `${start.format("MMM Do YYYY, h:mm A")} - ${end.format(
        "MMM Do YYYY, h:mm A"
      )}`;
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < event.gallery.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleViewAllImagesClick = () => {
    setOpenAllImagesModal(true);
  };

  const handleCloseAllImagesModal = () => {
    setOpenAllImagesModal(false);
  };

  const handleAllImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
    setOpenAllImagesModal(false);
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
          <div
            className="breadcrumb"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", backgroundColor: "" }}>
              <Link
                to="/admin/events"
                style={{
                  textDecoration: "none",
                  color: "#526d82",
                  fontWeight: "bold",
                  display: "flex",
                }}
              >
                <BiCalendar
                  className="icon"
                  style={{ fontSize: 16, marginTop: 4, marginRight: 3 }}
                />
                Events
              </Link>{" "}
              {" /  "}
              <span> {event.title}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<BiPencil style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
                style={{ marginRight: "10px" }}
                onClick={handleEditClick}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(220 38 38)",
                  marginRight: "10px",
                }}
                startIcon={<BiSitemap style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                onClick={handleEditGalleryClick}
              >
                Delete Gallery
              </Button>
              <Button
                variant="contained"
                startIcon={<BiImageAdd style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-purple-500 hover:bg-purple-400 rounded"
                style={{ marginRight: "10px" }}
                onClick={handleAddGalleryClick}
              >
                Add Images
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "rgb(220 38 38)" }}
                startIcon={<BiTrash style={{ fontSize: 18 }} />}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                onClick={handleDelete}
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
                <div style={{ display: "flex", gap: 10 }}>
                  <Typography
                    component="div"
                    variant="h5"
                    style={{ marginBottom: 13 }}
                  >
                    {event.title}
                  </Typography>
                  <Chip
                    label={event.status}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#AAB7B7",
                      marginTop: 3,
                      display: "flex",
                      padding: 2,
                    }}
                  />
                </div>

                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.secondary", marginBottom: 3 }}
                >
                  {event.description}
                </Typography>
                <p
                  style={{
                    marginBottom: 10,
                    fontFamily: "Arial",
                    fontSize: 15,
                    color: "#868181",
                    display: "flex",
                  }}
                >
                  <BiSolidMapPin style={{ marginTop: 3, marginRight: 5 }} />
                  Location: {event.location}
                </p>
                <p
                  style={{
                    marginBottom: 10,
                    fontFamily: "Arial",
                    fontSize: 15,
                    color: "#868181",
                    display: "flex",
                  }}
                >
                  <BiCalendar style={{ marginTop: 3, marginRight: 5 }} />
                  Date: {formatEventDate(event.start_date, event.end_date)}
                </p>
                <p
                  style={{
                    marginBottom: 10,
                    fontFamily: "Arial",
                    fontSize: 15,
                    color: "#868181",
                    display: "flex",
                  }}
                >
                  <BiSitemap style={{ marginTop: 3, marginRight: 5 }} />
                  Host: {event.partner.name}
                </p>
              </CardContent>
            </Box>
            {event.image && (
              <CardMedia
                component="img"
                height="140"
                image={`${API_BASE_URL}/${event.image}`}
                alt={event.title}
                style={{ width: 500, height: 350 }}
              />
            )}
          </Card>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 20,
            }}
          >
            <Button
              variant="text"
              onClick={handleViewAllImagesClick}
              style={{ color: "#007bff" }}
            >
              View All Images
            </Button>
          </div>

          {event.gallery && (
            <div
              style={{
                display: "flex",
                overflowX: "scroll",
                padding: "10px 0",
                marginTop: "-20px",
              }}
            >
              {event.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={`${API_BASE_URL}/${image}`}
                  alt={`gallery-image-${index}`}
                  style={{ height: 150, marginRight: 10, cursor: "pointer" }}
                  onClick={() => handleImageClick(index)} // Open modal when image is clicked
                />
              ))}
            </div>
          )}

          {/* All Images Modal */}
          <Dialog
            open={openAllImagesModal}
            onClose={handleCloseAllImagesModal}
            maxWidth="md"
            fullWidth
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <DialogTitle>All Images</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseAllImagesModal} color="secondary">
                  Close
                </Button>
              </DialogActions>
            </div>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {event.gallery.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}/${image}`}
                    alt={`gallery-image-${index}`}
                    style={{ height: 100, margin: 10, cursor: "pointer" }}
                    onClick={() => handleAllImageClick(index)} // View detail when image clicked
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Preview Modal */}
          <Dialog
            open={openImageModal}
            onClose={handleCloseModal}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${API_BASE_URL}/${event.gallery[currentImageIndex]}`}
                  alt={`gallery-image-${currentImageIndex}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextImage}
                disabled={currentImageIndex === event.gallery.length - 1}
              >
                Next
              </Button>
              <Button onClick={handleCloseModal} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

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

          {event && (
            <AdminEventDeleteGallery
              open={openEditGalleryDialog}
              onClose={() => setOpenEditGalleryDialog(false)}
              eventId={id}
              eventData={event}
              onSubmit={() => {
                setOpenAddGalleryDialog(false);
                window.location.reload();
              }}
            />
          )}

          {event && (
            <AdminEventAddGallery
              open={openAddGalleryDialog}
              onClose={() => setOpenAddGalleryDialog(false)}
              eventId={id}
              eventData={event}
              onSubmit={() => {
                setOpenAddGalleryDialog(false);
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
