import React from 'react'
import Sidebar from '../components/Sidebar'
// import Content from './Content'
// import Profile from './Profile'
import '../assets/css/admin.css'
import NavbarHomePage from '../components/Navbar_HomePage'
import Content from './Content'
import { Route, Routes } from 'react-router-dom'
import AdminCourse from './AdminCourse'
import AdminTraining from './AdminTraining'
import AdminWorkshop from './AdminWorkshop'
import AdminEvent from './AdminEvent'
import AdminMajor from './AdminMajor'
import AdminPartner from './AdminPartner'
// import Logo from "../assets/images/Logo.png";

const AdminDashboard = () => {
  return (
    <div>
        {/* <div style={{backgroundColor: '', width: '900px', height: '70px', display: 'flex', marginBottom: '5px'}}>
        <img src={Logo} alt="" style={{ width: '480px', marginLeft: '-0px' }} />
        </div> */}
        <NavbarHomePage />
        <div className='dashboard'>
        
        
        <Sidebar/>
        <div className="dashboard-content">
            <Content />
            {/* <Profile /> */}
            <Routes>
                <Route path="dashboard" element={<Content />} />
                <Route path="course" element={<AdminCourse />} />
                <Route path="training" element={<AdminTraining />} />
                <Route path="workshop" element={<AdminWorkshop />} />
                <Route path="event" element={<AdminEvent />} />
                <Route path="major" element={<AdminMajor />} />
                <Route path="partner" element={<AdminPartner />} />
            </Routes>
            
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard