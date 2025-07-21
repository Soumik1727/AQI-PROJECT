import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaGoogle, 
  FaInstagram, 
  FaLinkedinIn, 
  FaGithub,
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaPrint
} from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Section */}
      <section className="social-section">
        <div className="social-left">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="social-right">
          <a href="#!" className="social-icon" target="_blank"><FaFacebookF /></a>
          <a href="#!" className="social-icon" target="_blank"><FaTwitter /></a>
          <a href="#!" className="social-icon" target="_blank"><FaGoogle /></a>
          <a href="#!" className="social-icon" target="_blank"><FaInstagram /></a>
          <a href="#!" className="social-icon" target="_blank"><FaLinkedinIn /></a>
          <a href="#!" className="social-icon" target="_blank"><FaGithub /></a>
        </div>
      </section>

      {/* Links Section */}
      <section className="links-section">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-col company-info">
            <h6 className="footer-title">AQI Project</h6>
            <div className="footer-divider"></div>
            <p>
                Our project delivers accurate, affordable air quality monitoring for healthier cities and communities.
            </p>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h6 className="footer-title">Services</h6>
            <div className="footer-divider"></div>
            <a href="#!" className="footer-link" target="_blank">Air Quality</a>
            <a href="#!" className="footer-link" target="_blank">Weather Reports</a>
            <a href="#!" className="footer-link" target="_blank">Health Products</a>
            <a href="#!" className="footer-link" target="_blank">Health Tips</a>
          </div>

          {/* Useful Links */}
          <div className="footer-col">
            <h6 className="footer-title">Useful links</h6>
            <div className="footer-divider"></div>
            <a href="#!" className="footer-link" target="_blank">Your Account</a>
            <a href="#!" className="footer-link" target="_blank">AQI</a>
            <a href="#!" className="footer-link" target="_blank">Weather</a>
            <a href="#!" className="footer-link" target="_blank">Help</a>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h6 className="footer-title">Contact</h6>
            <div className="footer-divider"></div>
            <p><FaUniversity className="contact-icon" /> 188, Raja S.C. Mallick Rd, Kolkata 700032.</p>
            <p><FaEnvelope className="contact-icon" /> hodcse@jadavpuruniversity.in</p>
            <p><FaPhone className="contact-icon" /> +9133-24146666</p>
            {/* <p><FaPrint className="contact-icon" /> + 01 234 567 89</p> */}
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="copyright">
        © {new Date().getFullYear()} Copyright:
        <a className="copyright-link"  href="https://jadavpuruniversity.in/" target="_blank"> CSE Department-Jadavpur University</a>
      </div>
    </footer>
  );
};

export default Footer;