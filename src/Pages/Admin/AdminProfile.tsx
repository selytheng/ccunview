import React, { useState, useEffect } from "react";
import NavbarHomePage from "../../components/Navbar_HomePage";
import Sidebar from "../../components/Sidebar";
import AdminEditInfo from "./AdminEditInfo";
import AdminEditPassword from "./AdminEditPassword";
import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [isEditInfoOpen, setEditInfoOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("access_token");
            navigate("/login"); // Redirect if unauthorized
          }
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);

        // Fetch partner name
        const partnerResponse = await fetch(
          "http://localhost:8000/api/partners",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const partnersData = await partnerResponse.json();
        const partner = partnersData.find(
          (partner) => partner.id === data.partner_id
        );
        setPartnerName(partner ? partner.name : "");

        // Set role name based on role_id
        if (data.role_id === 1) {
          setRoleName("Super Admin");
        } else if (data.role_id === 2) {
          setRoleName("Partner");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("access_token"); // Clear token from local storage
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="p-6">
            {profile ? (
              <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
                <div className="p-6">
                  <h1 className="text-2xl font-semibold text-center mb-4">
                    Admin Profile
                  </h1>
                  <div className="space-y-4">
                    <p>
                      <strong>Name:</strong> {profile.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {roleName}
                    </p>
                    <p>
                      <strong>Partner:</strong> {partnerName}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      onClick={() => setEditInfoOpen(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                    >
                      Edit Info
                    </button>
                    <button
                      onClick={() => setEditPasswordOpen(true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                    >
                      Edit Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading profile...</p>
            )}
          </div>
        </div>
      </div>

      {/* Dialog Components */}
      {profile && (
        <AdminEditInfo
          isOpen={isEditInfoOpen}
          onClose={() => setEditInfoOpen(false)}
          onSave={() => window.location.reload()} // Reload the page to reflect changes
          name={profile.name || ""}
          email={profile.email || ""}
        />
      )}

      <AdminEditPassword
        isOpen={isEditPasswordOpen}
        onClose={() => setEditPasswordOpen(false)}
      />
    </div>
  );
};

export default AdminProfile;
