import React from 'react'
import Sidebar from '../components/Sidebar'
// import Content from './Content'
// import Profile from './Profile'
import '../assets/css/admin.css'
import NavbarHomePage from '../components/Navbar_HomePage'
import Content from './Content'
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
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard