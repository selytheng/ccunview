import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { BiArchive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar.tsx";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";

const Workshop = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery] = useState("");
  const [successAlertVisible] = useState(false);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  const fetchWorkshops = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/workshops`, // Update the endpoint to fetch workshops
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
      setWorkshops(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch workshops.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="dashboard mt-[110px] mb-[70px]">
        <div className="dashboard-content">
          <div
            className="event-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>
              Workshops
            </h1>
          </div>

          {/* Success Alert */}
          {successAlertVisible && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              Workshop created successfully!
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
          ) : filteredWorkshops.length === 0 ? (
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
                No Workshops Available
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3}>
              {filteredWorkshops.map((workshop) => (
                <Grid item xs={12} sm={6} md={3} key={workshop.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.11)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                    onClick={() => navigate(`/user/workshops/${workshop.id}`)} // Update the navigation path
                  >
                    {workshop.image && (
                      <CardMedia
                        sx={{ height: 170 }}
                        image={`${API_BASE_URL}/${workshop.image}`}
                        title={workshop.title}
                      />
                    )}

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {workshop.title}
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
                        {workshop.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Workshop;
