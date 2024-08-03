// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path based on your directory structure

const styles = {
  header: {
    backgroundColor: 'white',
    padding: '1rem 0',
    color: 'black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '40px',
    marginRight: '10px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    color: '#4B0082',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'opacity 0.3s ease',
  },
  navLinkHover: {
    opacity: '0.7',
  },
};

function Header() {
  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logo}>
          <img src={logo} alt="Credolay Logo" style={styles.logoImage} />
        </div>
        <nav>
          <ul style={styles.navList}>
            <li>
              <Link
                to="/"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style = { ...styles.navLink, ...styles.navLinkHover })}
                onMouseOut={(e) => (e.target.style = styles.navLink)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/analysis"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style = { ...styles.navLink, ...styles.navLinkHover })}
                onMouseOut={(e) => (e.target.style = styles.navLink)}
              >
                Analysis
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
