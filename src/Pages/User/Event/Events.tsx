import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar.tsx";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiArchive } from "react-icons/bi"; // Make sure to import BiArchive

interface Event {
  id: number;
  title: string;
  description: string;
  image?: string;
  partner_id: number;
}

interface Partner {
  id: number;
  name: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedPartner, setSelectedPartner] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/events`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/partners`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchEvents();
    fetchPartners();
  }, []);

  const handleFilterChange = (event: any) => {
    const value = event.target.value;
    setSelectedPartner(value);
    if (value) {
      setFilteredEvents(events.filter((e) => e.partner_id === Number(value)));
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="mt-[130px] mb-[70px]">
        <div className="mb-3 px-4 sm:px-8">
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
            <div style={{ display: "flex", gap: "10px" }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Partner</InputLabel>
                <Select
                  value={selectedPartner}
                  onChange={handleFilterChange}
                  displayEmpty
                  label="Filter by Partner"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <MenuItem value="">All Partners</MenuItem>
                  {partners.map((partner) => (
                    <MenuItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <Box sx={{ mt: 4 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
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
              <Grid container spacing={4}>
                {filteredEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "12px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                    >
                      {event.image && (
                        <CardMedia
                          sx={{ height: 200, borderRadius: "12px 12px 0 0" }}
                          image={`${API_BASE_URL}/${event.image}`}
                          title={event.title}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          <Link
                            to={`/event/${event.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {event.title}
                          </Link>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 3,
                            textAlign: "justify",
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
          </Box>
        </div>
      </section>
      <div className={"mt-[110px]"}></div>
      <FooterComponent />
    </div>
  );
};

export default Events;
