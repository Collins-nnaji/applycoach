import React from 'react';
import './Footer.css'; // Ensure the case matches the actual file name
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import whatsappIcon from '../assets/whatsapp.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <a href="https://www.instagram.com/standexdigital/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://x.com/standexdigital" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/company/standex-digital/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a href="https://wa.me/+2348074090677" target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
          </a>
        </div>
        <p>&copy; 2024 Credolay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
