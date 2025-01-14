import React from 'react';
import '../assets/css/admin.css'
import { BiHome, BiStats, BiTask } from 'react-icons/bi';

const Sidebar = () => {
  return (
    <div className='menu'>
        {/* <div className='logo'>
            <BiBookAlt className='logo-icon'/>
            <h2>CCUN</h2>
        </div> */}
        <div className='menu-list'>
            <a href='/admin' className='item'>
                <BiHome className='icon'/>
                Dashboard
            </a>
            <a href='/admin/course' className='item'>
                <BiTask className='icon'/>
                Courses
            </a>
            <a href='/admin/training' className='item'>
                <BiStats className='icon'/>
                Trainings
            </a>
            <a href='/admin/workshop' className='item'>
                <BiHome className='icon'/>
                Workshops
            </a>
            <a href='/admin/event' className='item'>
                <BiHome className='icon'/>
                Events
            </a>
            <a href='/admin/major' className='item'>
                <BiHome className='icon'/>
                Majors
            </a>
            <a href='/admin/partner' className='item'>
                <BiHome className='icon'/>
                Partner
            </a>
        </div>
    </div>
  )
}

export default Sidebar