import React from 'react';

import './Footer.css';
import linkedinIcon from '../assets/linkedin.png';
import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ApplyCoachPro</h3>
          <p>Your trusted partner for authentic career growth and strategic job placement.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-links">
            <li>
              <a href="mailto:admin@applycoachpro.com" target="_blank" rel="noopener noreferrer">
                admin@applycoachpro.co.uk
              </a>
            </li>
            <li>
              <a href="https://wa.me/447918262629" target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" className="icon" /> +44 7918 262629
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/apply-coachpro/about/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" className="icon" /> ApplyCoachPro
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/applycoachproofficial" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="icon" /> applycoachproofficial
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ApplyCoachPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
