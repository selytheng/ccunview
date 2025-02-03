import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../../assets/css/admin.css';
import { CircularProgress, Box, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { BiBookOpen, BiSolidMapPin, BiLibrary } from 'react-icons/bi';
import Navbar from "../../../components/Navbar.tsx";
import API_BASE_URL from "../../../components/API_BASE_URL.tsx";

const CourseDetailUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [partner, setPartner] = useState<any>(null);
    const [major, setMajor] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem('access_token');
                const courseResponse = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${access_token}` },
                });

                if (!courseResponse.ok) {
                    throw new Error('Failed to fetch course details');
                }
                const courseData = await courseResponse.json();

                const partnerResponse = await fetch(`${API_BASE_URL}/api/partners/${courseData.partner_id}`);
                if (!partnerResponse.ok) {
                    throw new Error('Failed to fetch partner');
                }
                const partnerData = await partnerResponse.json();

                const majorResponse = await fetch(`${API_BASE_URL}/api/majors/${courseData.major_id}`);
                if (!majorResponse.ok) {
                    throw new Error('Failed to fetch major');
                }
                const majorData = await majorResponse.json();

                setCourse(courseData);
                setPartner(partnerData);
                setMajor(majorData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getYearName = (yearId: number) => {
        const yearMapping: Record<number, string> = {
            1: 'Year 1',
            2: 'Year 2',
            3: 'Year 3',
            4: 'Year 4',
            5: 'Year 5',
        };
        return yearMapping[yearId] || 'Unknown Year';
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="dashboard">
                    <div className="dashboard-content">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
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
                    {/* Breadcrumb */}
                    <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            <Link to="/course" style={{ textDecoration: 'none', color: '#526d82', fontWeight: 'bold', display: 'flex' }}>
                                <BiBookOpen className="icon" style={{ fontSize: 16, marginTop: 4, marginRight: 3 }} /> Courses
                            </Link>{' '}{' /  '}<span> {course.name}</span>
                        </div>
                    </div>

                    <Card sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, padding: '0px 0 0 8px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Typography component="div" variant="h5" style={{ marginBottom: 13 }}>
                                    {course.name}
                                </Typography>
                                <div style={{ display: 'flex', gap: 50 }}>
                                    <p
                                        style={{
                                            marginBottom: 10,
                                            display: 'flex',
                                            gap: 5,
                                            fontFamily: 'Arial',
                                            fontSize: 15,
                                            color: '#868181',
                                        }}
                                    >
                                        <BiLibrary style={{ marginTop: 3 }} /> {getYearName(course.year_id)}
                                    </p>

                                    <p style={{
                                        marginBottom: 10, display: 'flex', gap: 5,
                                        textTransform: 'uppercase',
                                        fontFamily: 'Arial',
                                        fontSize: 15,
                                        color: '#868181',
                                        cursor: "pointer",
                                    }}
                                       onClick={() => navigate(`/partner/${course.partner_id}`)}
                                    >
                                        <BiSolidMapPin style={{ marginTop: 3 }} /> {partner ? partner.name : 'Unknown Partner'}
                                    </p>
                                    <p style={{
                                        marginBottom: 10, display: 'flex', gap: 5,
                                        textTransform: 'uppercase',
                                        fontFamily: 'Arial',
                                        fontSize: 15,
                                        color: '#868181',
                                        cursor: "pointer",
                                    }}
                                       onClick={() => navigate(`/major/${course.major_id}`)}
                                    >
                                        <BiBookOpen style={{ marginTop: 3 }} /> {major ? major.name : 'Unknown Major'}
                                    </p>
                                </div>
                                <Typography
                                    style={{
                                        width: 780,
                                        textAlign: 'justify',
                                        marginBottom: 13,
                                    }}
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {course.description}
                                </Typography>
                                <p style={{ fontSize: 14, fontFamily: 'Arial' }}>
                                    Link to CCUN course: &nbsp;
                                    <a
                                        className="link"
                                        href={
                                            course.link.startsWith('http://') || course.link.startsWith('https://')
                                                ? course.link
                                                : `http://${course.link}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {course.link}
                                    </a>
                                </p>
                            </CardContent>
                        </Box>
                        {course.image && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={`${API_BASE_URL}/${course.image}`}
                                alt={course.name}
                                style={{ width: 500, height: 350 }}
                            />
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailUser;
