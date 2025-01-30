import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Alert } from "@mui/material";
import { BiArchive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AdminTrainingAdd from "../Pages/Admin/Trainings/AdminTrainingAdd";
import Navbar from "../components/Navbar.tsx";
import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";

const AdminTraining = () => {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery] = useState("");
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");
    const partnerId = localStorage.getItem("partner_id");

    const fetchTrainings = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/partners/${partnerId}/trainings`,
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
            setTrainings(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch trainings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const filteredTrainings = trainings.filter(
        (training) =>
            training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            training.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
    };

    const handleTrainingCreate = () => {
        fetchTrainings();
        setSuccessAlertVisible(true);
        setTimeout(() => {
            setSuccessAlertVisible(false);
            handleCloseCreateDialog();
        }, 2000);
    };

    return (
        <div>
            <Navbar />
            <div className="dashboard mt-[110px] mb-[70px]">
                <div className="dashboard-content">
                    <div
                        className="event-header"
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                        <h1 style={{ fontWeight: "bold", fontSize: 20, color: "#526d82" }}>Trainings</h1>
                    </div>

                    {/* Success Alert */}
                    {successAlertVisible && (
                        <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
                            Training created successfully!
                        </Alert>
                    )}

                    {/* Loading indicator */}
                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                            <CircularProgress />
                        </div>
                    ) : filteredTrainings.length === 0 ? (
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
                            <Typography variant="h6" style={{ marginTop: "20px", textAlign: "center" }}>
                                No Trainings Available
                            </Typography>
                        </div>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredTrainings.map((training) => (
                                <Grid item xs={12} sm={6} md={3} key={training.id}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.01)",
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                            },
                                        }}
                                        onClick={() => navigate(`/user/trainings/${training.id}`)}
                                    >
                                        {training.image && (
                                            <CardMedia
                                                sx={{ height: 170 }}
                                                image={`http://localhost:8000/${training.image}`}
                                                title={training.title}
                                            />
                                        )}

                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {training.title}
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
                                                {training.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Create Training Dialog */}
                    <AdminTrainingAdd
                        open={openCreateDialog}
                        onClose={handleCloseCreateDialog}
                        onSubmit={handleTrainingCreate}
                    />
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};

export default AdminTraining;




// import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
// import { Link } from 'react-router-dom';
// import "../assets/css/content.css"
// import Navbar from "../components/Navbar.tsx";
// import FooterComponent from "../components/HomeComponent/FooterComponent.tsx";
//
// const training = [
//     {
//         id: 1,
//         title: "Web Design",
//         description: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
//         image: "/public/web-design.png",
//     },
//     {
//         id: 2,
//         title: "Telecommunication",
//         description: "Master JavaScript with deep dives into ES6+ features, closures, promises, and more.",
//         image: "/public/Telecommunication.jpg",
//     },
//     {
//         id: 3,
//         title: "Cyber Security",
//         description: "Learn the fundamentals of web development using HTML and CSS, the building blocks of the web.",
//         image: "/public/cyber-security.jpeg",
//     },
//     {
//         id: 4,
//         title: "Artificial Intelligence",
//         description: "A comprehensive course on data structures and algorithms, essential for programming interviews.",
//         image: "/public/AI.jpg",
//     },
//     {
//         id: 5,
//         title: "Data Structures and Algorithms",
//         description: "A comprehensive course on data structures and algorithms, essential for programming interviews.",
//         image: "/public/AI.jpg",
//     },
// ];
//
// const Training = () => {
//     return (
//         <div>
//             <Navbar/>
//             {/*<div className="mt-[110px] "><NavbarLink/></div>*/}
//             <section className="">
//             <div className="relative w-full ">
//                     <div className="absolute inset-0 h-96 w-full bg-pink-950"></div>
//                     <div className="relative pt-28 text-center mt-[100px]">
//                         <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
//                            Training
//                         </h2>
//                         <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum
//                             mi nec, ultricies metus.
//                         </p>
//                     </div>
//                 </div>
//                 <div className="mt-20 mb-3 px-4 sm:px-8">
//                     <div className="container mx-auto">
//                         <div
//                             className="py-12 flex flex-col sm:flex-row justify-center rounded-xl border border-white bg-white shadow-black/5 saturate-200">
//                             <div className="dashboard">
//                                 <div className="dashboard-content-home">
//                                     <Grid container spacing={3}>
//                                         {training.map((train) => (
//                                             <Grid item xs={12} sm={6} md={3} key={train.id}>
//                                                 <Card
//                                                     sx={{
//                                                         maxWidth: 345,
//                                                         transition: 'transform 0.3s, box-shadow 0.3s',
//                                                         '&:hover': {
//                                                             transform: 'scale(1.01)',
//                                                             boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//                                                         },
//                                                     }}
//                                                 >
//                                                     <CardMedia sx={{height: 170}} image={train.image}
//                                                                title={train.title}/>
//                                                     <CardContent>
//                                                         <Typography gutterBottom variant="h6" component="div">
//                                                             {/* Link updated to use "/admin/course/:id" */}
//                                                             <Link to={`/admin/course/${train.id}`}
//                                                                   style={{textDecoration: 'none', color: '#000'}}>
//                                                                 <div className="course-title">{train.title}</div>
//                                                             </Link>
//                                                         </Typography>
//                                                         <Typography
//                                                             variant="body2"
//                                                             sx={{
//                                                                 color: 'text.secondary',
//                                                                 display: '-webkit-box',
//                                                                 WebkitBoxOrient: 'vertical',
//                                                                 overflow: 'hidden',
//                                                                 WebkitLineClamp: 3,
//                                                                 textAlign: 'justify',
//                                                             }}
//                                                         >
//                                                             <div
//                                                                 className="course-description">{train.description}</div>
//                                                         </Typography>
//                                                     </CardContent>
//                                                 </Card>
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <FooterComponent/>
//
//         </div>
//     );
// };
//
// export default Training;
