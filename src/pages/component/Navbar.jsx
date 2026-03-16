import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Track which dropdown is open: null, 'about', or 'products'
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle function for mobile dropdowns
  const handleToggleSubMenu = (e, menuName) => {
    if (window.innerWidth <= 991) {
      e.preventDefault(); // Stop navigation
      e.stopPropagation(); // Stop event bubbling
      setOpenSubMenu(openSubMenu === menuName ? null : menuName);
    }
  };

  return (
    <header className={`wpo-site-header ${isSticky ? "sticky-on" : ""}`}>
      <nav className="navigation pill-nav">
        <div className="container-fluid nav-container">
          <div className="nav-wrapper">
            <div className="logo-section">
              <a className="navbar-brand" href="/">
                <div className="logo-dots">
                  <img style={{width:"23rem", marginLeft:"1rem"}} src="./assets/images/brand-logo/akshay-embedded (1).png" alt="Logo" />
                </div>
                {/* <span className="d-none d-lg-inline text-white">Akshay Embedded System</span> */}
              </a>
            </div>

            {/* Main Mobile Menu */}
            <div className={`menu-section ${isMenuOpen ? "active" : ""}`}>
              <ul className="nav-list">
                <li><a href="/">Home</a></li>
                
                {/* AboutUs Dropdown */}
                <li className={`nav-item dropdown ${openSubMenu === 'about' ? 'is-open' : ''}`}>
                  <a href="#" onClick={(e) => handleToggleSubMenu(e, 'about')} className="dropdown-togglee">
                    AboutUs <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/profile">Profile</a></li>
                    {/* <li><a href="/quality-policy">Quality Policy</a></li> */}
                    <li><a href="/Our-Team">Our Team</a></li>
                    {/* <li><a href="/clienttestimoial">Client Testimonials</a></li> */}
                    <li><a href="/Certifications">Certifications</a></li>
                  </ul>
                </li>

                {/* Products Dropdown */}
                <li className={`nav-item dropdown ${openSubMenu === 'products' ? 'is-open' : ''}`}>
                  <a href="#" onClick={(e) => handleToggleSubMenu(e, 'products')} className="dropdown-togglee">
                    Sectors <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/healthcaresector">Healthcare</a></li>
                    {/* <li><a href="/Medical-Devices">Medical Devices</a></li> */}
                    <li><a href="/Compressor-Industry">Compressor Industry</a></li>
                    <li><a href="/Hydraulic-Machines">Hydraulic Machine</a></li>
                    <li><a href="/Commercial-Electronics">Commercial Electronic</a></li>
                    <li><a href="/Industrial-Automation">Industrial Automation</a></li>
                  </ul>
                </li>

                <li><a href="/Blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            <div className="cta-section d-flex align-items-center gap-3">
              <a href="mailto:akshayembedded17@gmail.com" className="join-btn d-none d-lg-block">Contact Us</a>
              <button className="mobile-toggle d-lg-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;