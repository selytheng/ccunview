import Logo from "../assets/images/Logo.png";

const NavbarHomePage = () => {
  return (
    <nav>
      <div className="nav-logo-container p-3 bg-[#071952] bg-opacity-80" style={{  marginLeft: '0px', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={Logo} alt="" style={{ width: '550px', marginLeft: '-0px' }} />
      </div>
    </nav>
  );
};

export default NavbarHomePage;
