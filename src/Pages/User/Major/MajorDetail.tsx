import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Building2,
  GraduationCap,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import Navbar from "../../../components/Navbar.tsx";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";

const MajorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [major, setMajor] = useState(null);
  const [partner, setPartner] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const majorResponse = await axios.get(
          `${API_BASE_URL}/api/majors/${id}`
        );
        setMajor(majorResponse.data);

        if (majorResponse.data.partner_id) {
          const partnerResponse = await axios.get(
            `${API_BASE_URL}/api/partners/${majorResponse.data.partner_id}`
          );
          setPartner(partnerResponse.data);
        }

        const coursesResponse = await axios.get(
          `${API_BASE_URL}/api/majors/${id}/courses`
        );
        setCourses(coursesResponse.data);
      } catch (err) {
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-[110px] flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {/* Major Image */}
              {major.logo && (
                <div className="relative h-64 md:h-80">
                  <CardMedia
                    component="img"
                    className="w-full h-full object-cover"
                    image={`${API_BASE_URL}/${major.logo}`}
                    alt={major.name}
                  />
                </div>
              )}

              <div className="p-6">
                {/* Major and Partner Info in Blue Container */}
                <div className="mb-8 bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-4">
                    <Building2 size={24} />
                    <h3 className="font-semibold text-lg">Major Detail</h3>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Major and Partner Names */}
                    <div className="flex-grow">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {major.name}
                      </h1>
                      {partner && (
                        <div
                          className="flex items-center gap-2 text-gray-700 cursor-pointer"
                          onClick={() =>
                            navigate(`/partner/${major.partner_id}`)
                          }
                        >
                          <Building2 size={20} />
                          <span>{partner.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Partner Logo */}
                    {partner && partner.logo && (
                      <div
                        className="bg-white p-2 rounded-lg shadow-md cursor-pointer"
                        onClick={() => navigate(`/partner/${major.partner_id}`)}
                      >
                        <img
                          src={`${API_BASE_URL}/${partner.logo}`}
                          alt={partner.name}
                          className="w-20 h-20 object-contain rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">About this Major</h2>
                  <div className="text-gray-600 leading-relaxed">
                    {major.description}
                  </div>
                </div>

                {courses.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">
                      Available Courses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courses.map((course) => (
                        <Card
                          key={course.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/course/${course.id}`)}
                        >
                          <div className="flex items-start p-4">
                            {course.image && (
                              <img
                                src={`${API_BASE_URL}/${course.image}`}
                                alt={course.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="ml-4">
                              <h3 className="font-semibold text-lg">
                                {course.name}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {course.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default MajorDetail;
