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
import {BiBookOpen, BiCaretDown, BiHome, BiLogIn, BiNews} from "react-icons/bi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import '../assets/css/admin.css';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      to: "/home",
    },
    {
      text: "News",
      icon: <BiNews />,
      to: "/news",
    },
    {
      text: "Courses",
      icon: <BiBookOpen />,
      to: "#", // Placeholder for dropdown
      dropdown: [
        { text: "ITC Course", to: "/course/1" },
        { text: "RUPP Course", to: "/course/2" },
      ],
    },
    {
      text: "About",
      icon: <InfoIcon />,
      to: "#", // Placeholder for dropdown
      dropdown: [
        { text: "Contact Us", icon: <InfoIcon />, to: "/about/contact" },
        { text: "Our Team", icon: <InfoIcon />, to: "/about/team" },
        { text: "Our Story", icon: <InfoIcon />, to: "/about/story" },
      ],
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      to: "#",
    },
  ];

  return (
      <nav  className="navbar">
        <div className="nav-logo-container p-3" style={{ backgroundColor: '#071952', marginLeft: '0px', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={Logo} alt="" style={{ width: '550px', marginLeft: '-0px' }} />
          <div className="navbar-links-container flex items-center">
            <Link to="/home" style={{color: '#fff'}} className="flex items-center gap-1"><BiHome className='icon'/>Home</Link>
            <Link to="/news" style={{color: '#fff'}} className="flex items-center gap-1"><BiNews className='icon'/>News</Link>
            {/* Courses Dropdown */}
            <div
                className="dropdown"
                onMouseEnter={() => setOpenCourses(true)}
                onMouseLeave={() => setOpenCourses(false)}
                style={{position: 'relative'}}
            >
              <Link to="#" style={{color: '#fff'}} className="flex items-center gap-1">
                <BiBookOpen className='icon'/> Courses <BiCaretDown className='icon'/>
              </Link>
              {openCourses && (
                  <div className="dropdown-menu">
                    {menuOptions[2].dropdown?.map((course) => (
                        <Link key={course.text} to={course.to} className="dropdown-item flex items-center gap-2">
                          {course.text}
                        </Link>
                    ))}
                  </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
                className="dropdown"
                onMouseEnter={() => setOpenAbout(true)}
                onMouseLeave={() => setOpenAbout(false)}
                style={{position: 'relative'}}
            >
              <Link to="#" style={{color: '#fff'}} className="flex items-center gap-1">
                <InfoIcon className='icon'/>About<BiCaretDown className='icon'/>
              </Link>
              {openAbout && (
                  <div className="dropdown-menu">
                    {menuOptions[3].dropdown?.map((about) => (
                        <Link key={about.text} to={about.to} className="dropdown-item">

                          <div className="flex items-center gap-1">{about.text}</div>
                        </Link>
                    ))}
                  </div>
              )}
            </div>

            <a href="/login" style={{color: '#fff'}}>
              <button
                  className="primary-button"
                  style={{
                    margin: 0,
                    height: '35px',
                    width: '100px',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    color: '#071952',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
              >
                <BiLogIn className='icon'/> {/* Add margin to the icon */}
                Login
              </button>
            </a>
          </div>
        </div>
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)}/>
        </div>

        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
              sx={{width: 250}}
              role="presentation"
              onClick={() => setOpenMenu(false)}
              onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton component={Link} to={item.to} onClick={item.dropdown ? (e) => {
                      e.preventDefault();
                      item.text === "Courses" ? setOpenCourses(!openCourses) : setOpenAbout(!openAbout); } : undefined}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                    {item.dropdown && (openCourses || openAbout) && (
                        <div className="dropdown-menu" style={{ paddingLeft: '20px' }}>
                          {item.dropdown.map((subItem) => (
                              <ListItem key={subItem.text} disablePadding>
                                <ListItemButton component={Link} to={subItem.to}>
                                  <ListItemText primary={subItem.text} />
                                </ListItemButton>
                              </ListItem>
                          ))}
                        </div>
                    )}
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