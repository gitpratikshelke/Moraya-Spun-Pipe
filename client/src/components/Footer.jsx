import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../assets/logo1.png';

export default function Footer({ footerRef }) {
  return (
    <footer ref={footerRef} className="text-white pt-5" style={{ backgroundColor: "#000", opacity: "0.8" }}>
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Company Info + Logo */}
          <div className="col-12 col-md-4 mb-5">
            <div className="d-flex flex-column align-items-center align-items-md-start gap-3">
              <Link to="/" className="d-block">
                <img
                  src={logo1}
                  alt="Morya Logo"
                  className="img-fluid"
                  style={{ maxWidth: "80px", borderRadius: "50%", boxShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                />
              </Link>
              <div>
                <h5 className="fw-bold">Company</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white text-decoration-none">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-decoration-none">Contact Us</a>
                  </li>
                </ul>
              </div>
              <address className="mt-2 small">
                <p className="mb-1">📞 +91-8530153142 / +91-7276073142</p>
                <p className="mb-1">📩 moryaspunpipe@gmail.com</p>
                <p className="mb-0">📍 Pune-Solapur Hwy, near Hotel S4G,<br /> Wakdapul, Wakhari, Maharashtra 412203</p>
              </address>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-12 col-md-4 mb-5">
            <h5 className="fw-bold">Our Products</h5>
            <ul className="list-unstyled ps-2">
              {[
                "RCC Pipe",
                "Manhole Cover",
                "Cement Pipe",
                "Septic Tank",
                "Rcc Septic Tank",
                "Concrete Manhole Cover"
              ].map((item, idx) => (
                <li key={idx} className="mb-1">🔸 {item}</li>
              ))}
              <li className="mt-2">
                <a href="#" className="text-white fw-bold text-decoration-none">View All →</a>
              </li>
            </ul>
          </div>

          {/* Map Section */}
          <div className="col-12 col-md-4 mb-5">
            <h5 className="fw-bold mb-3">Google Map Location</h5>
            <div className="ratio ratio-4x3 shadow rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.8714210441026!2d74.34934330933187!3d18.45655128255218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3193e9e766dd3%3A0x80a0e78e427838b2!2sMorya%20Spun%20Pipe%20Industries!5e1!3m2!1sen!2sin!4v1746910547316!5m2!1sen!2sin"
                title="Company Location"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center border-top border-secondary small">
          <p className="mb-1">© {new Date().getFullYear()} Morya Spun Pipe Industries. All rights reserved.</p>
          <p className="mb-0">
            Developed by{' '}
            <a
              href="https://www.linkedin.com/in/pratik-shelke-245016233"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-underline"
            >
              Pratik Shelke
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
