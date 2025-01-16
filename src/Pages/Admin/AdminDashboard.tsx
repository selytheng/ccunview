import Sidebar from '../../components/Sidebar';
import '../../assets/css/admin.css';
import NavbarHomePage from '../../components/Navbar_HomePage';
import ContentHeader from './ContentHeader';
import TotalCard from './TotalCard';
// import { BiBook, BiUser, BiTask } from 'react-icons/bi';  // Icons for "Total Courses", "Total Majors", etc.

const AdminDashboard = () => {
  return (
    <div>
      <NavbarHomePage />
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard-content">
          <ContentHeader />
          <div className="box-container">
            <TotalCard />
            {/* <div style={{width: 740, height: 300, padding: 2, backgroundColor: 'pink'}}>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
