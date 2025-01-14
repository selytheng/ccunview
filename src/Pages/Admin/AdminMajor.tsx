import React from 'react'
import NavbarHomePage from '../../components/Navbar_HomePage'
import Sidebar from '../../components/Sidebar'
import ContentHeader from './ContentHeader'

const AdminMajor = () => {
  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar  />
        <div className="dashboard-content">
          <ContentHeader />
          this is Major page
        </div>
      </div>
    </div>
  )
}

export default AdminMajor