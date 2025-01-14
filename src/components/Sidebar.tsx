import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/admin.css';
import { BiStats, BiBookOpen, BiClipboard, BiCategory, BiCalendar, BiGroup, BiSidebar, BiCommentDetail } from 'react-icons/bi';

const Sidebar = () => {
  return (
    <div className='menu'>
        {/* <div className='logo'>
            <BiBookOpenAlt className='logo-icon'/>
            <h2>CCUN</h2>
        </div> */}
        <div className='menu-list'>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCategory className="icon" />
                Dashboard
            </NavLink>
            <NavLink 
              to="/admin/course" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiBookOpen className="icon" />
                Courses
            </NavLink>
            <NavLink 
              to="/admin/major" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiClipboard className='icon'/>
                Majors
            </NavLink>
            <NavLink 
              to="/admin/training" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiStats className='icon'/>
                Trainings
            </NavLink>
            <NavLink 
              to="/admin/workshop" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiSidebar className='icon'/>
                Workshops
            </NavLink>
            <NavLink 
              to="/admin/event" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCalendar className='icon'/>
                Events
            </NavLink>
            <NavLink 
              to="/admin/partner" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiGroup className='icon'/>
                Partner
            </NavLink>
            <NavLink 
              to="/admin/feedback" 
              className={({ isActive }) => isActive ? 'item active' : 'item'}
            >
                <BiCommentDetail className='icon'/>
                Feedback
            </NavLink>
        </div>
    </div>
  );
}

export default Sidebar;
