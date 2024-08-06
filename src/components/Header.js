import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={logo} alt="Credolay Logo" />
    </div>
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/analyze-cv">Analyze CV</Link>
    </nav>
  </header>
);

export default Header;
