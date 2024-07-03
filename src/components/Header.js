import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path based on your directory structure

const styles = {
  header: {
    backgroundColor: 'white', // White background
    padding: '1rem 0',
    color: 'black', // Black text color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for distinction
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
    color: '#4B0082', // Dark purple color
    textDecoration: 'none',
    fontSize: '1.2rem', // Increase font size
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
                onMouseOver={(e) => e.target.style = { ...styles.navLink, ...styles.navLinkHover }}
                onMouseOut={(e) => e.target.style = styles.navLink}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/analysis"
                style={styles.navLink}
                onMouseOver={(e) => e.target.style = { ...styles.navLink, ...styles.navLinkHover }}
                onMouseOut={(e) => e.target.style = styles.navLink}
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
