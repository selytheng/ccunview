import Logo from "../assets/images/Logo.png";
import {
    BiBookOpen, BiCalendar, BiCaretDown,
    BiChat,
    BiGroup,
    BiHome, BiImage,
    BiLogoMicrosoftTeams,
    BiNews,
    BiSolidContact
} from "react-icons/bi";
import '../assets/css/admin.css';
import {useState} from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import {Link} from "react-router-dom";
import {HiOutlineBars3} from "react-icons/hi2";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openCourses, setOpenCourses] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openNews, setOpenNews] = useState(false); // New state for EventComponent dropdown

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon className="font-bold "/>,
            to: "",
        },
        {
            text: "Events",
            icon: <BiNews />,
            to: "/events",
        },
        {
            text: "Courses",
            icon: <BiBookOpen />,
            to: "#", // Placeholder for dropdown
            dropdown: [
                { text: "Courses", to: "/course" },
                { text: "Majors", to: "/major" },
                { text: "Partners", to: "/partner" },
            ],
        },
        {
            text: "About Us",
            icon: <InfoIcon />,
            to: "#", // Placeholder for dropdown
            dropdown: [
                { text: "Contact Us", icon: <BiSolidContact className="text-[20px]"/>, to: "/contact" },
                { text: "Our Teams", icon: <BiLogoMicrosoftTeams className="text-[20px]"/>, to: "#team" },
                { text: "Gallery", icon: <BiImage  className="text-[20px]"/>, to: "#partners" },
                { text: "Feedbacks", icon: <BiChat className="text-[20px]"/>, to: "/feedback" },
                { text: "Our Partners", icon: <BiGroup  className="text-[20px]"/>, to: "/partner" },
            ],
        },
        {
            text: "News",
            icon: <BiNews />,
            to: "",
            dropdown: [
                { text: "Training", icon: <InfoIcon />, to: "/training" },
                { text: "Work Shop", icon: <InfoIcon />, to: "/workshop" },
            ],
        },
    ];
  return (
      <nav  className="navbar">
          <div className="nav-logo-container p-3" style={{
              backgroundColor: '#071952',
              marginLeft: '0px',
              width: '100vw',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
          }}>
              <img src={Logo} alt="" style={{width: '520px', marginLeft: '-0px'}}/>

              <div className="mr-10">
                  <div className="nav-logo-container">
                      <div className="navbar-links-container flex items-center ">
                          <Link to="/" style={{color: '#fff'}} className="flex items-center gap-1"><BiHome
                              className='icon text-[18px] '/><p className="text-[13px]">Home</p></Link>
                          <Link to="/events" style={{color: '#fff'}} className="flex items-center gap-1"><BiCalendar
                              className='icon text-[18px]'/><p className="text-[13px]">Events</p></Link>

                          {/* Courses Dropdown */}
                          <div
                              className="dropdown"
                              onMouseEnter={() => setOpenCourses(true)}
                              onMouseLeave={() => setOpenCourses(false)}
                              style={{position: 'relative'}}
                          >
                              <Link to="#" style={{color: '#fff'}} className="flex items-center gap-1">
                                  <BiBookOpen className='icon text-[18px]'/> <p className="text-[13px]">Courses</p>
                                  <BiCaretDown
                                      className='icon'/>
                              </Link>
                              {openCourses && (
                                  <div className="dropdown-menu ">
                                      {menuOptions[2].dropdown?.map((course) => (
                                          <Link key={course.text} to={course.to}
                                                className="dropdown-item flex items-center gap-2 ">
                                              <p className="text-[13px]">{course.text}</p>
                                          </Link>
                                      ))}
                                  </div>
                              )}
                          </div>

                          <div
                              className="dropdown"
                              onMouseEnter={() => setOpenNews(true)}
                              onMouseLeave={() => setOpenNews(false)}
                              style={{position: 'relative'}}
                          >
                              <Link to="#" style={{color: '#fff'}} className="flex items-center gap-1">
                                  <BiNews className='icon text-[18px]'/> <p className="text-[13px]">News</p>
                                  <BiCaretDown
                                      className='icon'/>
                              </Link>
                              {openNews && (
                                  <div className="dropdown-menu">
                                      {menuOptions[4].dropdown?.map((event) => ( // Reference the correct dropdown
                                          <Link key={event.text} to={event.to}
                                                className="dropdown-item flex items-center gap-2">
                                              <p className="text-[13px]">{event.text}</p>
                                          </Link>
                                      ))}
                                  </div>
                              )}
                          </div>

                          {/* About Dropdown */}
                          <div
                              className="dropdown "
                              onMouseEnter={() => setOpenAbout(true)}
                              onMouseLeave={() => setOpenAbout(false)}
                              style={{position: 'relative'}}
                          >
                              <Link to="#" style={{color: '#fff'}} className="flex items-center gap-1">
                                  <InfoIcon className='icon text-[16px]'/> <p className="text-[13px]">About</p>
                                  <BiCaretDown
                                      className='icon'/>
                              </Link>
                              {openAbout && (
                                  <div className="dropdown-menu ">
                                      {menuOptions[3].dropdown?.map((about) => (
                                          <Link key={about.text} to={about.to} className="dropdown-item">
                                              {/*<div className="flex items-center gap-1"></div>*/}
                                              <p className="text-[13px] flex items-center gap-2">{about.icon}{about.text}</p>
                                          </Link>
                                      ))}
                                  </div>
                              )}
                          </div>
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
                                          item.text === "Courses" ? setOpenCourses(!openCourses) : item.text === "Events" ? setOpenNews(!openNews) : setOpenAbout(!openAbout);
                                      } : undefined}>
                                          <ListItemIcon>{item.icon}</ListItemIcon>
                                          <ListItemText primary={item.text}/>
                                      </ListItemButton>
                                      {item.dropdown && (openCourses || openAbout || openNews) && (
                                          <div className="dropdown-menu" style={{paddingLeft: '20px'}}>
                                              {item.dropdown.map((subItem) => (
                                                  <ListItem key={subItem.text} disablePadding>
                                                      <ListItemButton component={Link} to={subItem.to}>
                                                          <ListItemText primary={subItem.text}/>
                                                      </ListItemButton>
                                                  </ListItem>
                                              ))}
                                          </div>
                                      )}
                                  </ListItem>
                              ))}
                          </List>
                          <Divider/>
                      </Box>
                  </Drawer>
              </div>
          </div>
      </nav>
  );
};

export default Navbar;