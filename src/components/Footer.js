// src/components/Footer.js
import React from 'react';

const styles = {
  footer: {
    backgroundColor: 'white', // White background
    color: 'black', // Black text color
    padding: '1rem 0',
    textAlign: 'center',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for distinction
    position: 'relative',
    width: '100%',
    bottom: 0,
    marginTop: 'auto',
  },
  link: {
    color: '#4B0082', // Dark purple color for any links
    textDecoration: 'none',
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <p>&copy; 2023 Credolay. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" style={styles.link}>Privacy Policy</a> | <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
