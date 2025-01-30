import React, { useState, useEffect } from "react";
import NavbarHomePage from "../../../components/Navbar_HomePage";
import Sidebar from "../../../components/Sidebar";
import AdminEditInfo from "./AdminEditInfo";
import AdminEditPassword from "./AdminEditPassword";
import AdminEditContact from "./AdminEditContact";
import { Link, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [partnerName, setPartnerName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [contactInfo, setContactInfo] = useState(null);
  const [isEditInfoOpen, setEditInfoOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const [isEditContactOpen, setEditContactOpen] = useState(false);
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
            navigate("/login");
          }
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);

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

        if (data.role_id === 1) {
          setRoleName("Super Admin");
        } else if (data.role_id === 2) {
          setRoleName("Partner");
        }

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
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // Helper function to render contact list items
  const renderContactList = (items) => {
    if (!items) return <li className="text-gray-500">No information available</li>;
    if (typeof items === 'string') return <li>{items}</li>;
    if (Array.isArray(items) && items.length > 0) {
      return items.map((item, index) => <li key={index}>{item}</li>);
    }
    return <li className="text-gray-500">No information available</li>;
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
                      {renderContactList(contactInfo?.phone_number)}
                    </ul>
                  </p>
                  <p>
                    <strong>Emails:</strong>
                    <ul className="list-disc pl-6">
                      {renderContactList(contactInfo?.email)}
                    </ul>
                  </p>
                  <p>
                    <strong>Location Map:</strong>
                  </p>
                  {contactInfo?.location_link ? (
                    <div className="w-full h-64">
                      <iframe
                        src={contactInfo.location_link}
                        className="w-full h-full rounded shadow-lg"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  ) : (
                    <p className="text-gray-500">No location map available</p>
                  )}
                  <p>
                    <strong>Address:</strong>{" "}
                    {contactInfo?.address || (
                      <span className="text-gray-500">No address available</span>
                    )}
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    {contactInfo?.website ? (
                      <a
                        href={contactInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {contactInfo.website}
                      </a>
                    ) : (
                      <span className="text-gray-500">No website available</span>
                    )}
                  </p>
                  <p>
                    <strong>Moodle Link:</strong>{" "}
                    {contactInfo?.moodle_link ? (
                      <a
                        href={contactInfo.moodle_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {contactInfo.moodle_link}
                      </a>
                    ) : (
                      <span className="text-gray-500">No Moodle link available</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Components */}
      {profile && (
        <AdminEditInfo
          isOpen={isEditInfoOpen}
          onClose={() => setEditInfoOpen(false)}
          onSave={() => window.location.reload()}
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
          onSave={() => window.location.reload()}
          contact={contactInfo}
        />
      )}
    </div>
  );
};

export default AdminProfile;