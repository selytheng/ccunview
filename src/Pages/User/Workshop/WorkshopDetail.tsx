import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../assets/css/admin.css";
import { Button, CircularProgress, Box, Card, CardContent, Typography, CardMedia, Dialog, DialogActions, DialogTitle, DialogContent, Chip } from "@mui/material";
import { BiCalendar,BiSitemap, BiSolidMapPin} from "react-icons/bi";
import moment from "moment";
import Navbar from "../../../components/Navbar";

const WorkshopDetailUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openAllImagesModal, setOpenAllImagesModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const workshopResponse = await fetch(`http://localhost:8000/api/workshops/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!workshopResponse.ok) {
          throw new Error("Failed to fetch workshop details");
        }
        const workshopData = await workshopResponse.json();
        setWorkshop(workshopData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatWorkshopDate = (startDate: string, endDate: string) => {
    const start = moment(startDate);
    const end = moment(endDate);

    if (start.isSame(end, 'day')) {
      return `${start.format("MMM Do YYYY, h:mm A")} - ${end.format("h:mm A")}`;
    } else {
      return `${start.format("MMM Do YYYY, h:mm A")} - ${end.format("MMM Do YYYY, h:mm A")}`;
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
    if (currentImageIndex < workshop.gallery.length - 1) {
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
        <Navbar />
        <div className="dashboard ">
          <div className="dashboard-content">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
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
        <Navbar />
        <div className="dashboard">
          <div className="dashboard-content">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard mt-[110px]">
        <div className="dashboard-content">
          <div
            className="breadcrumb"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", backgroundColor: "" }}>
              <Link to="/workshop" style={{ textDecoration: "none", color: "#526d82", fontWeight: "bold", display: "flex" }}>
                <BiCalendar className="icon" style={{ fontSize: 16, marginTop: 4, marginRight: 3 }} />
                Workshops
              </Link>{" "}
              {" /  "}
              <span> {workshop.title}</span>
            </div>
          </div>

          <Card
            sx={{ display: "flex", justifyContent: "space-between", gap: 3, padding: "0px 0 0 8px" }} >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <div style={{ display: "flex", gap: 10 }}>
                  <Typography component="div" variant="h5" style={{ marginBottom: 13 }}>
                    {workshop.title}
                  </Typography>
                  <Chip
                    label={workshop.status}
                    style={{ fontSize: 14, backgroundColor: "#AAB7B7", marginTop: 3, display: "flex", padding: 2 }} />
                </div>

                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: "text.secondary", marginBottom: 3 }}
                >
                  {workshop.description}
                </Typography>
                <p style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181", display: "flex", }}>
                  <BiSolidMapPin style={{ marginTop: 3, marginRight: 5 }} />
                  Location: {workshop.location}
                </p>
                <p
                  style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181",  display: "flex", }}>
                  <BiCalendar style={{ marginTop: 3, marginRight: 5 }} />
                  Date: {formatWorkshopDate(workshop.start_date, workshop.end_date)}
                </p>
                <p style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 15, color: "#868181", display: "flex", }}>
                  <BiSitemap style={{ marginTop: 3, marginRight: 5 }} />Host: {workshop.partner.name}
                </p>
              </CardContent>
            </Box>
            {workshop.image && (
              <CardMedia component="img" height="140" image={`http://localhost:8000/${workshop.image}`} alt={workshop.title} style={{ width: 500, height: 350 }} />
            )}
          </Card>

          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }} >
            <Button variant="text" onClick={handleViewAllImagesClick} style={{ color: "#007bff" }}>
              View All Images
            </Button>
          </div>

          {workshop.gallery && (
            <div style={{ display: "flex", overflowX: "scroll", padding: "10px 0", marginTop: '-20px' }}>
              {workshop.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={`http://localhost:8000/${image}`}
                  alt={`gallery-image-${index}`}
                  style={{ height: 150, marginRight: 10, cursor: 'pointer' }}
                  onClick={() => handleImageClick(index)} 
                />
              ))}
            </div>
          )}

          {/* All Images Modal */}
          <Dialog open={openAllImagesModal} onClose={handleCloseAllImagesModal} maxWidth="md" fullWidth>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <DialogTitle>All Images</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseAllImagesModal} color="secondary">
                  Close
                </Button>
              </DialogActions>
            </div>
            <DialogContent>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {workshop.gallery.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/${image}`}
                    alt={`gallery-image-${index}`}
                    style={{ height: 100, margin: 10, cursor: 'pointer' }}
                    onClick={() => handleAllImageClick(index)} 
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Preview Modal */}
          <Dialog open={openImageModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  src={`http://localhost:8000/${workshop.gallery[currentImageIndex]}`}
                  alt={`gallery-image-${currentImageIndex}`}
                  style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                Previous
              </Button>
              <Button onClick={handleNextImage} disabled={currentImageIndex === workshop.gallery.length - 1}>
                Next
              </Button>
              <Button onClick={handleCloseModal} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetailUser;
