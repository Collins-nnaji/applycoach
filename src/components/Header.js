import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <img src={require('../assets/logo.png')} alt="Credolay Logo" />
          </Link>
        </div>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul className="nav-links">
            <li><Link to="/" className="button-link">Home</Link></li>
            <li><Link to="/survey" className="button-link">Survey</Link></li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
