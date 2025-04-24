import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import './Header.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="logo">
          {/* Make logo link to home */}
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="ApplyCoachPro Logo" />
          </Link>
        </div>
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {/* Keep only Trainings & Workshops link */}
            <li><Link to="/workshops" onClick={closeMenu} className={isActive('/workshops') ? 'active' : ''}>Trainings & Workshops</Link></li>
            {/* Removed Services link */}
            {/* Removed Packages link */}
            {/* Removed Resources link */}
            {/* Removed Contact link */}
          </ul>
        </nav>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
}

export default Header; 