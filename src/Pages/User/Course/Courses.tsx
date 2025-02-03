import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Navbar.tsx";
import "../../../assets/css/content.css";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";
import { BiArchive } from "react-icons/bi"; // Add the BiArchive icon

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // State for filters
  const [partnerId, setPartnerId] = useState("");
  const [majorId, setMajorId] = useState("");
  const [yearId, setYearId] = useState("");
  const [partners, setPartners] = useState([]);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/all"
        );
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPartners = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/partners");
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchCourses();
    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchMajors = async () => {
      if (!partnerId) {
        setMajors([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api/partners/${partnerId}/majors`
        );
        setMajors(response.data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };
    fetchMajors();
  }, [partnerId]);

  // Function to filter courses
  useEffect(() => {
    let filtered = courses;

    if (partnerId) {
      filtered = filtered.filter(
        (course) => course.partner_id === parseInt(partnerId)
      );
    }
    if (majorId) {
      filtered = filtered.filter(
        (course) => course.major_id === parseInt(majorId)
      );
    }
    if (yearId) {
      filtered = filtered.filter(
        (course) => course.year_id === parseInt(yearId)
      );
    }

    setFilteredCourses(filtered);
  }, [partnerId, majorId, yearId, courses]);

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
              Courses
            </h1>
            <div style={{ display: "flex", gap: "10px" }}>
              <FormControl variant="outlined" size="small">
                <InputLabel>Partner</InputLabel>
                <Select
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  label="Partner"
                >
                  <MenuItem value="">All</MenuItem>
                  {partners.map((partner) => (
                    <MenuItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                disabled={!partnerId}
              >
                <InputLabel>Major</InputLabel>
                <Select
                  value={majorId}
                  onChange={(e) => setMajorId(e.target.value)}
                  label="Major"
                >
                  <MenuItem value="">All</MenuItem>
                  {majors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={yearId}
                  onChange={(e) => setYearId(e.target.value)}
                  label="Year"
                >
                  <MenuItem value="">All</MenuItem>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <MenuItem key={year} value={year}>
                      Year {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="container mx-auto">
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
              ) : filteredCourses.length === 0 ? (
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
                    No Courses Available
                  </Typography>
                </div>
              ) : (
                <Grid container spacing={2}>
                  {filteredCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={3} key={course.id}>
                      <Card
                        sx={{
                          maxWidth: 345,
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.11)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {course.image && (
                          <CardMedia
                            sx={{ height: 170 }}
                            image={`http://localhost:8000/${course.image}`}
                            title={course.name}
                          />
                        )}
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            <Link
                              to={`/course/${course.id}`}
                              style={{ textDecoration: "none", color: "#000" }}
                            >
                              {course.name}
                            </Link>
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              overflow: "hidden",
                              WebkitLineClamp: 3,
                              textAlign: "justify",
                            }}
                          >
                            {course.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </div>
  );
};

export default Course;
