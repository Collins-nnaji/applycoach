import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Credolay Logo" />
        </Link>
      </div>
      <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`} ref={mobileMenuRef}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleLinkClick}>Home</Link>
        <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''} onClick={handleLinkClick}>Resources</Link>
      </nav>
    </header>
  );
};

export default Header;
