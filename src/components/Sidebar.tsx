import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/admin.css";
import {
  BiBookOpen,
  BiClipboard,
  BiCategory,
  BiCalendar,
  BiGroup,
  BiSidebar,
  BiCommentDetail,
  BiDesktop,
} from "react-icons/bi";
import { PiUserList } from "react-icons/pi"; // Correct import for PiUserList

const Sidebar = () => {
  const [roleId, setRoleId] = useState<number | null>(null);

  // Simulate fetching role_id (e.g., from localStorage or an API)
  useEffect(() => {
    // Example: Replace this with the actual role fetching logic
    const userRoleId = localStorage.getItem("role_id"); // Assuming role_id is stored in localStorage
    setRoleId(userRoleId ? parseInt(userRoleId, 10) : null);
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

        {/* Conditionally show Partner and Users tabs for role_id = 1 */}
        {roleId === 1 && (
          <>
            <NavLink
              to="/superadmin/partner"
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
          </>
        )}

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
          to="/admin/trainings"
          className={({ isActive }) => (isActive ? "item active" : "item")}
        >
          <BiDesktop className="icon" />
          Trainings
        </NavLink>
        <NavLink
          to="/admin/workshops"
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
    </div>
  );
};

export default Sidebar;
