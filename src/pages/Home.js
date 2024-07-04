import React from 'react';
import { Link } from 'react-router-dom';
import cvPic from '../assets/CVpic.jpg';  // Import the image

const styles = {
  home: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'var(--background-color)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: 'var(--primary-color)',
  },
  description: {
    fontSize: '1.25rem',
    maxWidth: '600px',
    margin: '0 auto 30px',
    color: 'var(--text-color)',
  },
  startButton: {
    display: 'inline-block',
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '10px 20px',
    fontSize: '1.25rem',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  startButtonHover: {
    backgroundColor: 'var(--hover-background)',
  },
  // Add styling for the image
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: '30px 0',
  },
};

function Home() {
  return (
    <div style={styles.home}>
      <h1 style={styles.title}>Welcome to Credolay</h1>
      <p style={styles.description}>
      Credolay helps you analyze CVs and job descriptions to find the perfect match. 
        Upload your CV and start your journey to your dream job today! 
        After the analysis, you can download a newly optimized CV tailored to your target job!
      </p>
      {/* Add the image here */}
      <img src={cvPic} alt="CV Analysis" style={styles.image} />
      <Link
        to="/analysis"
        style={styles.startButton}
        onMouseOver={(e) => e.target.style = { ...styles.startButton, ...styles.startButtonHover }}
        onMouseOut={(e) => e.target.style = styles.startButton}
      >
        Start Analysis
      </Link>
    </div>
  );
}

export default Home;