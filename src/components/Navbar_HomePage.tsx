import { NavLink } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import img from "../../public/AI.jpg";
import { FaUserCircle } from "react-icons/fa";

const NavbarHomePage = () => {
  const userName = localStorage.getItem("admin_name");
  const partnerName = localStorage.getItem("partner_name");

  return (
    <nav>
      <div
        className="nav-logo-container p-3 bg-[#071952]"
        style={{
          marginLeft: "0px",
          width: "100vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="" style={{ width: "550px", marginLeft: "-0px" }} />
        {/* User Info Section */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/admin/profile"
            className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition duration-200 ease-in-out"
          >
            <FaUserCircle className="text-2xl text-blue-600" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {userName}
              </span>
              <span className="text-xs text-gray-500">
                Partner: {partnerName}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHomePage;
