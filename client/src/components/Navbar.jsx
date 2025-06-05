  import { Link } from "react-router-dom";
  import logo1 from "../assets/logo1.png";
  import React, { useState, useEffect } from "react";

  // Import icons
  import { FaHome, FaUser, FaPhoneAlt, FaBoxOpen } from "react-icons/fa";

  function Navbar({ setSearchProduct, displaySearch, scrollToFooter }) {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    const navbarStyle = {
      position: "fixed",
      top: visible ? "0" : "-80px",
      left: "0",
      right: "0",
      zIndex: "1030",
      transition: "top 0.4s ease-in-out",
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const searchProduct = (value) => {
      setSearchProduct(value);
    };

    return (
      <nav
        className="navbar navbar-expand-lg navbar-light px-3 px-md-5 py-1 py-md-2 bg-dark bg-opacity-50"
        style={navbarStyle}
      >
        <Link to="/">
          <img
            src={logo1}
            height="40px"
            width="40px"
            alt="Logo"
            className="d-md-none"
          />
          <img
            src={logo1}
            height="70px"
            width="70px"
            alt="Logo"
            className="d-none d-md-inline"
          />
        </Link>

        <div className="navbar-brand text-white fw-bold fs-4 mx-3 d-none d-md-block">
          MORYA SPUN PIPES INDUSTRIES
        </div>

        <div className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">
          {/* Search Bar */}
          {displaySearch && (
            <div className="d-none d-md-flex align-items-center">
              <input
                type="text"
                className="form-control text-white rounded-pill me-2 bg-transparent border border-white"
                placeholder="Search products..."
                style={{ width: "15vw", padding: "0.5rem 1rem" }}
                onChange={(e) => searchProduct(e.target.value)}
              />
              <button className="btn btn-outline-dark rounded-pill bg-transparent border border-white text-white">
                Search
              </button>
            </div>
          )}

          {/* Home */}
          <Link
            to="/"
            className="nav-link nav-hover text-white fw-bold d-flex align-items-center gap-1"
          >
            <FaHome className="fs-5" />
            <span className="d-none d-md-inline">HOME</span>
          </Link>

          {/* About Us */}
          <Link
            to="/about"
            className="nav-link nav-hover text-white fw-bold d-flex align-items-center gap-1"
          >
            <FaUser className="fs-5" />
            <span className="d-none d-md-inline">ABOUT US</span>
          </Link>

          {/* Contact Us */}
          <button
            onClick={scrollToFooter}
            className="nav-link nav-hover text-white fw-bold btn btn-link d-flex align-items-center gap-1 p-0"
          >
            <FaPhoneAlt className="fs-5" />
            <span className="d-none d-md-inline">CONTACT US</span>
          </button>

          {/* Products Dropdown */}
          <div
            className="nav-link nav-hover text-white fw-bold position-relative d-flex align-items-center gap-1"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ cursor: "pointer" }}
          >
            <FaBoxOpen className="fs-5" />
            <span className="d-none d-md-inline">PRODUCTS</span>
            {showDropdown && (
              <div
                className="dropdown-menu position-absolute p-4 bg-dark bg-opacity-100 text-white"
                style={{
                  top: "100%",
                  right: 0,
                  minWidth: "90vw",
                  zIndex: 1000,
                }}
              >
                <div className="d-flex justify-content-between text-white flex-wrap">
                  {/* Manhole Cover */}
                  <div className="dropdown-column text-white">
                    <h6 className="fw-bold text-uppercase">Manhole Cover</h6>
                    <p className="mb-1 text-white">600 x 600 mm RCC Square Manhole Cover</p>
                    <p className="mb-1 text-white">600 x 600 mm Concrete Drainage Cover</p>
                    <p className="mb-1 text-white">RCC Heavy Duty Manhole Cover</p>
                    <p className="mb-1 text-white">Concrete Manhole Cover</p>
                    <Link to="/explore/Manhole Cover" className="text-primary">
                      View All Products
                    </Link>
                  </div>

                  {/* Cement Pipe */}
                  <div className="dropdown-column">
                    <h6 className="fw-bold text-uppercase">Cement Pipe</h6>
                    <p className="mb-1 text-white">300mm (12 inch) Round RCC Pipe NP2</p>
                    <p className="mb-1 text-white">600mm (2ft) Round RCC Pipe NP2</p>
                    <p className="mb-1 text-white">450mm (1.5ft) Round RCC Pipe NP2</p>
                    <p className="mb-1 text-white">900mm (3ft) Round RCC Pipe NP2</p>
                    <p className="mb-1 text-white">8 inch Round RCC Pipe NP2</p>
                    <Link to="/explore/Cement Pipe" className="text-primary">
                      View All Products
                    </Link>
                  </div>

                  {/* Septic Tank */}
                  <div className="dropdown-column">
                    <h6 className="fw-bold text-uppercase">Septic Tank</h6>
                    <p className="mb-1 text-white">1800mm RCC Septic Tank</p>
                    <p className="mb-1 text-white">RCC Septic Tank 1200mm</p>
                    <p className="mb-1 text-white">600mm Industrial Storage Tank</p>
                    <p className="mb-1 text-white">RCC Septic Tank</p>
                    <Link to="/explore/Septic Tank" className="text-primary">
                      View All Products
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom CSS for hover */}
        <style jsx="true">{`
          .nav-hover:hover {
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
            transition: all 0.3s ease-in-out;
          }

          .nav-hover:hover span,
          .nav-hover:hover svg {
            color: #ffc107 !important;
          }
        `}</style>
      </nav>
    );
  }

  export default Navbar;
