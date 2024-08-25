import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Credolay Logo" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/analyze-cv" className={location.pathname === '/analyze-cv' ? 'active' : ''}>Analyze CV</Link>
        <Link to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</Link>
      </nav>
    </header>
  );
};

export default Header;