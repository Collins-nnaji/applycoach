// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import cvPic from '../assets/CVpic.jpg';
import jobPic from '../assets/Jobpic.jpg';

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <h1 className="title">Welcome to Credolay</h1>
        <p className="subtitle">Your trusted partner for career growth and job placement. Let us help you find the perfect job and optimize your resume to stand out to employers.</p>
      </header>

      <main className="main-content">
        <section className="feature-section">
          <div className="feature-content">
            <img src={cvPic} alt="Resume Analysis" className="feature-image" />
            <div className="feature-text">
              <h2>Optimize Your Resume</h2>
              <p>
                <strong>Upload your resume</strong> for a detailed analysis and get personalized recommendations to <strong>enhance your job applications</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-content reverse">
            <img src={jobPic} alt="Job Listings" className="feature-image" />
            <div className="feature-text">
              <h2>Find Your Dream Job</h2>
              <p>
                <strong>Explore job listings</strong> tailored to your skills and preferences. <strong>Apply confidently</strong> and track your applications.
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="cta-container">
        <Link to="/analysis" className="cta-button">
          Start Your Journey
        </Link>
      </div>
    </div>
  );
}

export default Home;