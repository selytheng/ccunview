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
            <a href='#' className='item'>
                <BiHome className='icon'/>
                Dashboard
            </a>
            <a href='#' className='item'>
                <BiTask className='icon'/>
                Course
            </a>
            <a href='#' className='item'>
                <BiStats className='icon'/>
                Training
            </a>
            <a href='#' className='item'>
                <BiHome className='icon'/>
                Workshop
            </a>
            <a href='#' className='item'>
                <BiHome className='icon'/>
                Workshop
            </a>
            <a href='#' className='item'>
                <BiHome className='icon'/>
                Workshop
            </a>
        </div>
    </div>
  )
}

export default Sidebar