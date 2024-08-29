import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

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
        <Link to="/analyze-cv" className={location.pathname === '/analyze-cv' ? 'active' : ''} onClick={handleLinkClick}>Analyze CV</Link>
        <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''} onClick={handleLinkClick}>Resources</Link>
        {user ? (
          <div className="profile-dropdown" ref={dropdownRef}>
            <button 
              className="profile-button" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User size={24} />
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => { setDropdownOpen(false); handleLinkClick(); }}>Profile</Link>
                <button onClick={handleLogout} className="logout-button">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="auth-link" onClick={handleLinkClick}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;