import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Building2,
  BookOpen,
  Calendar,
  GraduationCap,
  Hammer,
  Book,
} from "lucide-react";
import Navbar from "../../../components/Navbar.tsx";
import FooterComponent from "../../../components/HomeComponent/FooterComponent.tsx";

const PartnerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [contactPreview, setContactPreview] = useState(null); // New state for contact details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnerResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}`
        );
        setPartner(partnerResponse.data);

        // Fetch majors, courses, events, trainings, workshops
        const majorsResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}/majors`
        );
        setMajors(majorsResponse.data);

        const coursesResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}/courses`
        );
        setCourses(coursesResponse.data);

        const eventsResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}/events`
        );
        setEvents(eventsResponse.data);

        const trainingsResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}/trainings`
        );
        setTrainings(trainingsResponse.data);

        const workshopsResponse = await axios.get(
          `${API_BASE_URL}/api/partners/${id}/workshops`
        );
        setWorkshops(workshopsResponse.data);

        // Fetch contact details
        const contactResponse = await axios.get(
          `${API_BASE_URL}/api/contacts/partner/${id}`
        );
        setContactPreview(contactResponse.data);
      } catch (err) {
        setError("Failed to fetch partner details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderPhoneNumbers = (phones) => {
    if (!phones)
      return <p className="text-gray-500">No phone numbers available</p>;
    if (typeof phones === "string")
      return (
        <p className="text-gray-900">
          <a
            href={`tel:${phones.replace(/\D/g, "")}`}
            className="hover:text-blue-600"
          >
            {phones}
          </a>
        </p>
      );
    if (Array.isArray(phones) && phones.length > 0) {
      return phones.map((phone, index) => (
        <p key={index} className="text-gray-900">
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="hover:text-blue-600"
          >
            {phone}
          </a>
        </p>
      ));
    }
    return <p className="text-gray-500">No phone numbers available</p>;
  };

  const renderEmails = (emails) => {
    if (!emails)
      return <p className="text-gray-500">No email addresses available</p>;
    if (typeof emails === "string")
      return (
        <p className="text-gray-900 break-all">
          <a href={`mailto:${emails}`} className="hover:text-blue-600">
            {emails}
          </a>
        </p>
      );
    if (Array.isArray(emails) && emails.length > 0) {
      return emails.map((email, index) => (
        <p key={index} className="text-gray-900 break-all">
          <a href={`mailto:${email}`} className="hover:text-blue-600">
            {email}
          </a>
        </p>
      ));
    }
    return <p className="text-gray-500">No email addresses available</p>;
  };

  const renderWebsiteLink = (website) => {
    if (!website) return <p className="text-gray-500">No website available</p>;
    const url = website.startsWith("http") ? website : `https://${website}`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        Website →
      </a>
    );
  };

  const renderMoodleLink = (moodleLink) => {
    if (!moodleLink)
      return <p className="text-gray-500">No Moodle portal available</p>;
    const url = moodleLink.startsWith("http")
      ? moodleLink
      : `https://${moodleLink}`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        Moodle Portal →
      </a>
    );
  };

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
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              {partner.logo && (
                <div className="relative flex flex-col md:flex-row">
                  {/* Image on the left side */}
                  <div className="w-full md:w-1/3 relative">
                    <img
                      src={`${API_BASE_URL}/${partner.logo}`}
                      alt={partner.name}
                      className="w-56 h-56 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    />
                  </div>
                  {/* Content on the right */}
                  <div className="w-full md:w-2/3 p-6">
                    <h1 className="text-3xl font-bold mb-2">{partner.name}</h1>
                    <div className="flex items-center gap-2">
                      <Building2 size={20} />
                      <span>Partner Institution</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Cards */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <BookOpen size={24} />
                      <h3 className="font-semibold">Majors</h3>
                    </div>
                    <p className="text-gray-600">{majors.length} Programs</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <Book size={24} />
                      <h3 className="font-semibold">Courses</h3>
                    </div>
                    <p className="text-gray-600">{courses.length} Courses</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                      <Calendar size={24} />
                      <h3 className="font-semibold">Events</h3>
                    </div>
                    <p className="text-gray-600">{events.length} Events</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                      <Hammer size={24} />
                      <h3 className="font-semibold">Workshops</h3>
                    </div>
                    <p className="text-gray-600">
                      {workshops.length} Workshops
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <GraduationCap size={24} />
                      <h3 className="font-semibold">Trainings</h3>
                    </div>
                    <p className="text-gray-600">
                      {trainings.length} Trainings
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">
                    About {partner.name}
                  </h2>
                  <div className="text-gray-600 leading-relaxed">
                    {partner.description}
                  </div>
                </div>

                {/* Associated Majors */}
                {majors.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-xl font-bold mb-4">
                      Available Programs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {majors.map((major) => (
                        <Card
                          key={major.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => navigate(`/major/${major.id}`)}
                        >
                          <div className="flex items-start p-4">
                            {major.logo && (
                              <img
                                src={`${API_BASE_URL}/${major.logo}`}
                                alt={major.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div className="ml-4">
                              <h3 className="font-semibold text-lg">
                                {major.name}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {major.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Details */}
              {contactPreview && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">
                          Phone Numbers
                        </h4>
                        {renderPhoneNumbers(contactPreview.phone_number)}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">
                          Email Addresses
                        </h4>
                        {renderEmails(contactPreview.email)}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">
                          Address
                        </h4>
                        <p className="text-gray-900">
                          {contactPreview.address || (
                            <span className="text-gray-500">
                              No address available
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">
                          Links
                        </h4>
                        <div className="space-y-2">
                          {renderWebsiteLink(contactPreview.website)}
                          {renderMoodleLink(contactPreview.moodle_link)}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">
                          Location
                        </h4>
                        <div className="mt-2 rounded-lg overflow-hidden">
                          {contactPreview.location_link ? (
                            <iframe
                              src={contactPreview.location_link}
                              title="Partner Location"
                              className="w-full h-64 rounded-lg shadow-sm"
                              frameBorder="0"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center">
                              <p className="text-gray-500">
                                No location map available
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default PartnerDetail;
