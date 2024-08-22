import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Credolay Logo" />
      </div>
      <nav className="nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/analyze-cv" className={location.pathname === '/analyze-cv' ? 'active' : ''}>Analyze CV</Link>
        <Link to="/job-matching" className={location.pathname === '/job-matching' ? 'active' : ''}>Job Matching</Link>
      </nav>
    </header>
  );
};

export default Header;