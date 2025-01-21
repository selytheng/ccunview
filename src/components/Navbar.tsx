import Logo from "../assets/images/Logo.png";
import { BiLogIn} from "react-icons/bi";
import '../assets/css/admin.css';

const Navbar = () => {
  return (
      <nav  className="navbar">
        <div className="nav-logo-container p-3" style={{ backgroundColor: '#071952', marginLeft: '0px', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={Logo} alt="" style={{ width: '550px', marginLeft: '-0px' }} />

            <div className="mr-8">
                <a href="/login" style={{color: '#fff'}} >
                    <button
                        className="primary-button"
                        style={{
                            margin: 0,
                            height: '35px',
                            width: '100px',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            color: '#071952',
                            border: 'none',
                            borderRadius: '40px',
                            cursor: 'pointer',
                        }}
                    >
                        <BiLogIn className='icon'/> {/* Add margin to the icon */}
                        Login
                    </button>
                </a>
            </div>
        </div>

      </nav>

  );
};

export default Navbar;