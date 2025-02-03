import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Chip } from '@mui/material';
import { Building2, BookOpen, Globe, Mail } from 'lucide-react';
import Navbar from '../../../components/Navbar.tsx';
import FooterComponent from '../../../components/HomeComponent/FooterComponent.tsx';

const PartnerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [majors, setMajors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const partnerResponse = await axios.get(`http://localhost:8000/api/partners/${id}`);
                setPartner(partnerResponse.data);

                // Fetch majors associated with this partner
                const majorsResponse = await axios.get(`http://localhost:8000/api/partners/${id}/majors`);
                setMajors(majorsResponse.data);
                const coursesResponse = await axios.get(`http://localhost:8000/api/partners/${id}/courses`);
                setCourses(coursesResponse.data);
                const eventsResponse = await axios.get(`http://localhost:8000/api/partners/${id}/events`);
                setEvents(eventsResponse.data);
                const trainingsResponse = await axios.get(`http://localhost:8000/api/partners/${id}/trainings`);
                setTrainings(trainingsResponse.data);
                const workshopsResponse = await axios.get(`http://localhost:8000/api/partners/${id}/workshops`);
                setWorkshops(workshopsResponse.data);
            } catch (err) {
                setError('Failed to fetch partner details');
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
                        {/* Hero Section */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                            {partner.logo && (
                                <div className="relative flex flex-col md:flex-row">
                                    {/* Image on the left side */}
                                    <div className="w-full md:w-1/2 relative">
                                        <img
                                            src={`http://localhost:8000/${partner.logo}`}
                                            alt={partner.name}
                                            className="w-56 h-56 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                                        />
                                    </div>
                                    {/* Content on the right */}
                                    <div className="w-full md:w-1/2 p-6">
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
                                            <BookOpen size={24} />
                                            <h3 className="font-semibold">Courses</h3>
                                        </div>
                                        <p className="text-gray-600">{courses.length} Programs</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-purple-600 mb-2">
                                            <BookOpen size={24} />
                                            <h3 className="font-semibold">Events</h3>
                                        </div>
                                        <p className="text-gray-600">{events.length} Programs</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-orange-600 mb-2">
                                            <BookOpen size={24} />
                                            <h3 className="font-semibold">Workshops</h3>
                                        </div>
                                        <p className="text-gray-600">{workshops.length} Programs</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-red-600 mb-2">
                                            <BookOpen size={24} />
                                            <h3 className="font-semibold">Trainings</h3>
                                        </div>
                                        <p className="text-gray-600">{trainings.length} Programs</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-bold mb-4">About {partner.name}</h2>
                                    <div className="text-gray-600 leading-relaxed">
                                        {partner.description}
                                    </div>
                                </div>

                                {/* Associated Majors */}
                                {majors.length > 0 && (
                                    <div className="mt-8 pt-8 border-t">
                                        <h2 className="text-xl font-bold mb-4">Available Programs</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {majors.map((major) => (
                                                <Card
                                                    key={major.id}
                                                    className="hover:shadow-lg transition-shadow cursor-pointer"
                                                    onClick={() => navigate(`/user/major/${major.id}`)}
                                                >
                                                    <div className="flex items-start p-4">
                                                        {major.logo && (
                                                            <img
                                                                src={`http://localhost:8000/${major.logo}`}
                                                                alt={major.name}
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                        )}
                                                        <div className="ml-4">
                                                            <h3 className="font-semibold text-lg">{major.name}</h3>
                                                            <p className="text-gray-600 text-sm line-clamp-2">{major.description}</p>
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

export default PartnerDetail;
