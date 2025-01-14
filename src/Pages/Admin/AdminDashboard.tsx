import React from 'react'
import Sidebar from '../../components/Sidebar'
import '../../assets/css/admin.css'
import NavbarHomePage from '../../components/Navbar_HomePage'
import ContentHeader from './ContentHeader'

const AdminDashboard = () => {
  return (
    <div>
        <NavbarHomePage />
        <div className='dashboard' style={{backgroundColor: ''}}>
          <Sidebar/>
          <div className="dashboard-content" style={{backgroundColor: ''}}>
              <ContentHeader />
              this is dashboard
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard