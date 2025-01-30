import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import '../../../assets/css/content.css';
import { BiSearch, BiArchive } from "react-icons/bi";
import { Button, Card, CardContent, Typography, Grid, CircularProgress, CardMedia, Alert } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import AdminWorkshopAdd from "./AdminWorkshopAdd";

const AdminWorkshop: React.FC = () => {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false); 
  const navigate = useNavigate(); 
  const access_token = localStorage.getItem("access_token");
  const partnerId = localStorage.getItem("partner_id");

  const fetchWorkshops = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/partners/${partnerId}/workshops`,
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
      setWorkshops(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch workshops.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleWorkshopCreate = () => {
    fetchWorkshops();  
    setSuccessAlertVisible(true);  
    setTimeout(() => {
      setSuccessAlertVisible(false);
      handleCloseCreateDialog();  
    }, 2000);
  };

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="workshop-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 20, color: '#526d82' }}>Workshops</h1>
            <div className="header-activity" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ marginLeft: '15px', fontSize: '16px', color: '#526d82' }}>
                Total Workshops: {filteredWorkshops.length} 
              </Typography>
              <div className="search-box" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search workshops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <BiSearch className="icon" />
              </div>
              <Button variant="contained" startIcon={<AddOutlined />} onClick={handleOpenCreateDialog}>
                Create
              </Button>
            </div>
          </div>

          {/* Success Alert */}
          {successAlertVisible && (
            <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
              Workshop created successfully!
            </Alert>
          )}

          {/* Loading indicator */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <CircularProgress />
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
              <BiArchive size={50} />
              <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
                No workshops available
              </Typography>
            </div>
          ) : (
            <Grid container spacing={3}>
              {filteredWorkshops.map((workshop) => (
                <Grid item xs={12} sm={6} md={3} key={workshop.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.01)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                    onClick={() => navigate(`/admin/workshops/${workshop.id}`)} 
                  >
                    {workshop.image && (
                      <CardMedia
                        sx={{ height: 170 }}
                        image={`http://localhost:8000/${workshop.image}`}
                        title={workshop.title}
                      />
                    )}

                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {workshop.title}
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
                        {workshop.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <AdminWorkshopAdd
            open={openCreateDialog}
            onClose={handleCloseCreateDialog}
            onSubmit={handleWorkshopCreate} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminWorkshop;
