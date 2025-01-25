import React, { useState, useEffect } from "react";
import NavbarHomePage from "../../../components/Navbar_HomePage.tsx";
import Sidebar from "../../../components/Sidebar.tsx";
import AdminEditInfo from "./AdminEditInfo.tsx";
import AdminEditPassword from "./AdminEditPassword.tsx";
import AdminEditContact from "./AdminEditContact.tsx"; // Add import for AdminEditContact
import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [contactInfo, setContactInfo] = useState(null);
  const [isEditInfoOpen, setEditInfoOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const [isEditContactOpen, setEditContactOpen] = useState(false); // For contact info edit dialog
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

        // Fetch contact info
        const contactResponse = await fetch(
          `http://localhost:8000/api/contacts/partner/${data.partner_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const contactData = await contactResponse.json();
        setContactInfo(contactData);
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
        localStorage.clear();
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

            {/* Contact Info Section */}
            {contactInfo && (
              <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-6">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Contact Info</h2>
                    <button
                      onClick={() => setEditContactOpen(true)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
                    >
                      Edit Contact
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p>
                      <strong>Phone Numbers:</strong>
                      <ul className="list-disc pl-6">
                        {contactInfo.phone_number.map((number, index) => (
                            <li key={index}>{number}</li>
                        ))}
                      </ul>
                    </p>
                    <p>
                      <strong>Emails:</strong>
                      <ul className="list-disc pl-6">
                        {contactInfo.email.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                      </ul>
                    </p>
                    <p>
                      <strong>Location Map:</strong>
                    </p>
                    <div className="w-full h-64">
                      <iframe
                          src={contactInfo.location_link} // Ensure this is a valid URL
                          className="w-full h-full rounded shadow-lg"
                          allowFullScreen
                          loading="lazy"
                      ></iframe>
                    </div>
                    <p>
                      <strong>Address:</strong> {contactInfo.address}
                    </p>
                    <p>
                      <strong>Website:</strong> {contactInfo.website}
                    </p>
                    <p>
                      <strong>Moodle Link:</strong> {contactInfo.moodle_link}
                    </p>
                  </div>
                </div>
              </div>
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

      {contactInfo && (
        <AdminEditContact
          isOpen={isEditContactOpen}
          onClose={() => setEditContactOpen(false)}
          onSave={() => window.location.reload()} // Reload the page to reflect changes
          contact={contactInfo}
        />
      )}
    </div>
  );
};

export default AdminProfile;
