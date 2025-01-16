import { useLocation } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import '../../assets/css/content.css'

const ContentHeader = () => {
  const location = useLocation();

  // Mapping of paths to titles
  const pathToTitle = {
    '/admin': 'Dashboard',
    '/admin/course': 'Courses',
    '/admin/training': 'Trainings',
    '/admin/workshop': 'Workshops',
    '/admin/event': 'Events',
    '/admin/major': 'Majors',
    '/admin/partner': 'Partners',
    '/admin/feedback': 'Feedbacks',
  };

  const headerTitle = pathToTitle[location.pathname as keyof typeof pathToTitle] || 'Dashboard';

  return (
    <div className='content-header'>
      <h1 className="header-title" style={{fontWeight: 'bold', fontSize: 20}}>{headerTitle}</h1>
      <div className="header-activity">
        <div className="search-box">
          <input type="text" placeholder="Search anything here...." />
          <BiSearch className='icon'/>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
