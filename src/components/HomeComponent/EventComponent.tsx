import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../API_BASE_URL";

const EventComponent: React.FC = () => {
  const [events, setEvents] = useState([]); // Change 'courses' to 'events'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/events`); // Corrected the URL
        console.log(response.data); // Log the response to check the structure
        setEvents(response.data); // Update state with events data
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events. Please try again later."); // Optional: alert user
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <div className="relative w-full h-96 ">
        <div className="absolute inset-0 h-4/6 w-full "></div>
        <div className="relative pt-2 text-center">
          <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text- mb-black 4 text-6xl lg:text-4xl mt-10">
            Events
          </h2>
        </div>
      </div>
      <div className="-mt-60 mb-8 px-4 sm:px-8">
        <div className="container mx-auto">
          <div className="py-10 flex flex-col sm:flex-row justify-start items-center rounded-xl border border-white bg-white shadow-black/5 saturate-200">
            <div className="flex flex-col justify-center w-full sm:w-auto">
              {/* Card */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 ">
                <div className="mb-3 px-4 sm:px-8 ">
                  <div className="container mx-auto ">
                    <div className="flex flex-col sm:flex-row justify-start rounded-xl border border-white bg-white shadow-black/5 saturate-200">
                      <div className="dashboard">
                        <div className="dashboard-content-home">
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
                          ) : (
                            <Grid container spacing={3}>
                              {events.map(
                                (
                                  event // Change 'courses' to 'events'
                                ) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={3}
                                    key={event.id}
                                  >
                                    <Card
                                      className="w-[330px] mr-[500px]"
                                      sx={{
                                        maxWidth: 345,
                                        transition:
                                          "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": {
                                          transform: "scale(1.06)",
                                          boxShadow:
                                            "0 4px 20px rgba(0,0,0,0.2)",
                                        },
                                      }}
                                    >
                                      {event.image && (
                                        <CardMedia
                                          sx={{ height: 170 }}
                                          image={`${API_BASE_URL}/${event.image}`} // Ensure this URL is correct
                                          title={event.title} // Use title for accessibility
                                        />
                                      )}
                                      <CardContent>
                                        <Typography
                                          gutterBottom
                                          variant="h6"
                                          component="div"
                                        >
                                          <Link
                                            to={`/event/${event.id}`} // Update the link to point to events
                                            style={{
                                              textDecoration: "none",
                                              color: "#000",
                                            }}
                                          >
                                            <div
                                              className="event-title" // Change class name to reflect events
                                              style={{
                                                fontWeight: "bold",
                                                fontSize: "1.2rem",
                                              }}
                                            >
                                              {event.title}{" "}
                                              {/* Ensure title is displayed */}
                                            </div>
                                          </Link>
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
                                          }}
                                        >
                                          <div className="event-description">
                                            {event.description}
                                          </div>{" "}
                                          {/* Change class name to reflect events */}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                )
                              )}
                            </Grid>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventComponent;
