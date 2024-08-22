import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import linkedinIcon from '../assets/linkedin.png';
import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Credolay</h3>
          <p>Your trusted partner for authentic career growth and strategic job placement.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/analyze-cv">Analyze CV</Link></li>
            <li><Link to="/job-matching">Job Matching</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal Resources</h3>
          <ul>
            <li><a href="/GDPR_Policy.pdf" target="_blank" rel="noopener noreferrer">GDPR Policy</a></li>
            <li><a href="/Terms_of_Service.pdf" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
            <li><a href="/Privacy_Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-links">
            <li>
              <a href="mailto:admin@credolay.com" target="_blank" rel="noopener noreferrer">
                admin@credolay.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/447918262629" target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" className="icon" /> +44 7918 262629
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/credolay" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" className="icon" /> Credolay
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/credolayofficial" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="icon" /> credolayofficial
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Credolay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;