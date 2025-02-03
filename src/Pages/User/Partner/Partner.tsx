import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";
import Navbar from "../../../components/Navbar.tsx";
import "../../../assets/css/content.css";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/partners`);
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
        alert("Failed to load partners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-[#526d82]">Partners</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <CircularProgress />
                </div>
              ) : (
                <Grid container spacing={4}>
                  {partners.map((partner) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={partner.id}>
                      <Card
                        className="h-full"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        {partner.logo && (
                          <CardMedia
                            component="img"
                            sx={{
                              height: 200,
                              objectFit: "cover",
                            }}
                            image={`${API_BASE_URL}/${partner.logo}`}
                            alt={partner.name}
                          />
                        )}
                        <CardContent className="flex-grow">
                          <Link
                            to={`/partner/${partner.id}`}
                            className="no-underline"
                          >
                            <Typography
                              component="h2"
                              className="font-bold text-lg mb-2 text-gray-900 hover:text-blue-600"
                            >
                              {partner.name}
                            </Typography>
                          </Link>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                            sx={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              WebkitLineClamp: 3,
                              textAlign: "justify",
                            }}
                          >
                            {partner.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
};

export default Partner;
