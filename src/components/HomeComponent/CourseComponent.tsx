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
import "../../assets/css/content.css";
import API_BASE_URL from "../API_BASE_URL";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [majors, setMajors] = useState([]);
  const [partnerId, setPartnerId] = useState("");
  const [majorId, setMajorId] = useState("");
  const [yearId, setYearId] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/all`);
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
        const response = await axios.get(`${API_BASE_URL}/api/partners`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchCourses();
    fetchPartners();
  }, []);

  useEffect(() => {
    if (partnerId) {
      axios
        .get(`${API_BASE_URL}/api/partners/${partnerId}/majors`)
        .then((response) => setMajors(response.data))
        .catch((error) => console.error("Error fetching majors:", error));
    } else {
      setMajors([]);
    }
  }, [partnerId]);

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
      <section className="">
        <div className="mb-3 px-4 sm:px-8">
          <div className="container mx-auto">
            <div className="mb-4 flex gap-4">
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Partner</InputLabel>
                <Select
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {partners.map((partner) => (
                    <MenuItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Major</InputLabel>
                <Select
                  value={majorId}
                  onChange={(e) => setMajorId(e.target.value)}
                  disabled={!partnerId}
                >
                  <MenuItem value="">All</MenuItem>
                  {majors.map((major) => (
                    <MenuItem key={major.id} value={major.id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={yearId}
                  onChange={(e) => setYearId(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {[1, 2, 3, 4, 5].map((year) => (
                    <MenuItem
                      key={year}
                      value={year}
                    >{`Year ${year}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
                      {filteredCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={3} key={course.id}>
                          <Card
                            className="w-[330px] mr-[120px]"
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
                                image={`${API_BASE_URL}/${course.image}`}
                                title={course.name}
                              />
                            )}
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                <Link
                                  to={`/course/${course.id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
                                  }}
                                >
                                  <div
                                    className="course-title"
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    {course.name}
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
                                <div className="course-description">
                                  {course.description}
                                </div>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Course;
