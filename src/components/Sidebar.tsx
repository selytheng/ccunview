import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/admin.css";
import {
  BiStats,
  BiBookOpen,
  BiClipboard,
  BiCategory,
  BiCalendar,
  BiGroup,
  BiSidebar,
  BiCommentDetail,
} from "react-icons/bi";
import { PiUserList } from "react-icons/pi"; // Correct import for PiUserList
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const [userName, setUserName] = useState(null);
  const [partnerName, setPartnerName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("http://localhost:8000/api/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const partnerId = userData.partner_id;
          setUserName(userData.name); // Set the user's name

          const partnersResponse = await fetch(
            "http://localhost:8000/api/partners",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (partnersResponse.ok) {
            const partnersData = await partnersResponse.json();
            const partner = partnersData.find((p) => p.id === partnerId);
            setPartnerName(partner ? partner.name : "Unknown Partner");
          } else {
            console.error("Failed to fetch partners data");
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="menu">
      <div className="menu-list">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiCategory className="icon" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/partner"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiGroup className="icon" />
          Partner
        </NavLink>
        <NavLink
          to="/superadmin/users"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <PiUserList className="icon" />
          Users
        </NavLink>
        <NavLink
          to="/admin/major"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiClipboard className="icon" />
          Majors
        </NavLink>
        <NavLink
          to="/admin/course"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiBookOpen className="icon" />
          Courses
        </NavLink>
        <NavLink
          to="/admin/training"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiStats className="icon" />
          Trainings
        </NavLink>
        <NavLink
          to="/admin/workshop"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiSidebar className="icon" />
          Workshops
        </NavLink>
        <NavLink
          to="/admin/events"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiCalendar className="icon" />
          Events
        </NavLink>
        <NavLink
          to="/admin/feedback"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiCommentDetail className="icon" />
          Feedback
        </NavLink>
      </div>
      <div className="user-info px-4 py-2">
        <NavLink
          to="/admin/profile"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <FaUserCircle className="user-icon text-xl text-blue-600" />
          <div className="flex flex-col">
            {userName !== null ? (
              <span className="text-sm font-semibold text-gray-700">
                {userName}
              </span>
            ) : (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
            {partnerName !== null ? (
              <span className="text-xs text-gray-500">
                Partner: {partnerName}
              </span>
            ) : (
              <span className="text-xs text-gray-500">Loading...</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
