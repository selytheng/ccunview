import React from 'react'
import NavbarHomePage from '../../components/Navbar_HomePage'
import Sidebar from '../../components/Sidebar'
import ContentHeader from './ContentHeader'

const AdminEvent = () => {
  return (
    <div>
      <NavbarHomePage />
      <div className="dashboard">
        <Sidebar  />
        <div className="dashboard-content">
          <ContentHeader />
          this is event page
        </div>
      </div>
    </div>
  )
}

export default AdminEvent