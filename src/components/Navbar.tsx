import { useState } from "react";
import Logo from "../assets/images/Logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { BiBookOpen } from "react-icons/bi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      to: "/home", // Add 'to' property for routing
    },
    {
      text: "Courses",
      icon: <BiBookOpen />,
      to: "/course",
    },
    {
      text: "About",
      icon: <InfoIcon />,
      to: "#", // You can update with actual route for About page
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      to: "#", // You can update with actual route for Contact page
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container p-3" style={{ backgroundColor: '#071952', marginLeft: '0px', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={Logo} alt="" style={{ width: '550px', marginLeft: '-0px' }} />
        <div className="navbar-links-container">
          <Link to="/home" style={{ color: '#fff' }}>Home</Link>
          <Link to="/course" style={{ color: '#fff' }}>Courses</Link>
          <Link to="/about" style={{ color: '#fff' }}>About</Link>
          <Link to="/contact" style={{ color: '#fff' }}>Contact</Link>
          <a href="/login" style={{ color: '#fff' }}>
            <button className="primary-button" style={{ margin: 0, height: '35px', width: '100px', textAlign: 'center' }}>
              <div style={{ marginTop: '-9px', color: 'black' }} >Login</div>
            </button>
          </a>
          <Link to="/admin/dashboard" style={{ color: '#fff' }}>Admin</Link>
        </div>
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
