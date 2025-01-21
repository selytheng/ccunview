import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import {
    BiBookOpen,
    BiCaretDown,
    BiChat,
    BiGroup,
    BiHome,
    BiLogoMicrosoftTeams,
    BiNews,
    BiSolidContact
} from "react-icons/bi";
import { Link } from "react-router-dom";
import '../assets/css/admin.css';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { HiOutlineBars3 } from "react-icons/hi2";

const NavbarLink = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openCourses, setOpenCourses] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openEvents, setOpenEvents] = useState(false); // New state for Events dropdown

    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon className="font-bold "/>,
            to: "",
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
                { text: "Courses", to: "/user/courses" },
                { text: "Majors", to: "/user/major" },
            ],
        },
        {
            text: "About Us",
            icon: <InfoIcon />,
            to: "#", // Placeholder for dropdown
            dropdown: [
                { text: "Contact Us", icon: <BiSolidContact className="text-[20px]"/>, to: "/contact" },
                { text: "Our Teams", icon: <BiLogoMicrosoftTeams className="text-[20px]"/>, to: "#team" },
                { text: "Feedbacks", icon: <BiChat className="text-[20px]"/>, to: "#feedback" },
                { text: "Our Partners", icon: <BiGroup  className="text-[20px]"/>, to: "#partners" },
            ],
        },
        {
            text: "Events",
            icon: <PhoneRoundedIcon />,
            to: "",
            dropdown: [
                { text: "Training", icon: <InfoIcon />, to: "/training" },
                { text: "Work Shop", icon: <InfoIcon />, to: "/workshop" },
            ],
        },
    ];

    return (
        <div className="border-b-2 border-[#071952] flex " style={{position: 'fixed', zIndex: 1000, height: 45, backgroundColor: '#fff', marginTop:0  }}>
            <div className="nav-logo-container" style={{
                backgroundColor: '',
                marginLeft: '0px',
                width: '100vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '20px'
            }}>
                <div className="navbar-links-container flex items-center ">
                    <Link to="/" style={{ color: '#071952'}} className="flex items-center gap-1"><BiHome className='icon text-[18px] ' /><p className="text-[13px]">Home</p></Link>
                    <Link to="/news" style={{ color: '#071952' }} className="flex items-center gap-1"><BiNews className='icon text-[18px]' /><p className="text-[13px]">News</p></Link>

                    {/* Courses Dropdown */}
                    <div
                        className="dropdown"
                        onMouseEnter={() => setOpenCourses(true)}
                        onMouseLeave={() => setOpenCourses(false)}
                        style={{ position: 'relative' }}
                    >
                        <Link to="#"  style={{color: '#071952'}} className="flex items-center gap-1">
                            <BiBookOpen className='icon text-[18px]' /> <p className="text-[13px]">My Courses</p> <BiCaretDown
                            className='icon'/>
                        </Link>
                        {openCourses && (
                            <div className="dropdown-menu ">
                                {menuOptions[2].dropdown?.map((course ) => (
                                    <Link key={course.text} to={course.to} className="dropdown-item flex items-center gap-2 ">
                                        <p className="text-[13px]">{course.text}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Events Dropdown */}
                    <div
                        className="dropdown"
                        onMouseEnter={() => setOpenEvents(true)} // Use openEvents state
                        onMouseLeave={() => setOpenEvents(false)}
                        style={{ position: 'relative' }}
                    >
                        <Link to="#" style={{ color: '#071952' }} className="flex items-center gap-1">
                            <PhoneRoundedIcon className='icon text-[10px]'/> <p className="text-[13px]">Events</p> <BiCaretDown
                            className='icon'/>
                        </Link>
                        {openEvents && ( // Check openEvents state
                            <div className="dropdown-menu">
                                {menuOptions[4].dropdown?.map((event) => ( // Reference the correct dropdown
                                    <Link key={event.text} to={event.to} className="dropdown-item flex items-center gap-2">
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
                        style={{ position: 'relative' }}
                    >
                        <Link to="#" style={{ color: '#071952' }} className="flex items-center gap-1">
                            <InfoIcon className='icon text-[16px]' /> <p className="text-[13px]">About</p> <BiCaretDown
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
                                <ListItemButton component={Link} to={item.to} onClick={item.dropdown ? (e) => {
                                    e.preventDefault();
                                    item.text === "Courses" ? setOpenCourses(!openCourses) : item.text === "Events" ? setOpenEvents(!openEvents) : setOpenAbout(!openAbout);
                                } : undefined}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                                {item.dropdown && (openCourses || openAbout || openEvents) && (
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
        </div>
    );
};

export default NavbarLink;