import Logo from "../assets/images/Logo.png";
import img from "../../public/AI.jpg"

const NavbarHomePage = () => {
  return (
    <nav>
        <div className="nav-logo-container p-3 bg-[#071952] " style={{
            marginLeft: '0px',
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <img src={Logo} alt="" style={{width: '550px', marginLeft: '-0px'}}/>
            <div className="flex items-center justify-center gap-4 mr-2  w-40 h-12 rounded-lg">
                <div className="text-white font-light">Admin</div>
                <div className="">
                    <img src={img} className="w-10 h-10 rounded-full"/>
                </div>
            </div>
        </div>

    </nav>
  );
};

export default NavbarHomePage;
