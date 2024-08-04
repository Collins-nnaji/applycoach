// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import cvPic from '../assets/CVpic.jpg';
import jobPic from '../assets/Jobpic.jpg';

function Home() {
  return (
    <div className="home">
      <h1 className="title">Welcome to Credolay</h1>
      <p className="subtitle">Your trusted partner for career growth and job placement. Let us help you find the perfect job and optimize your resume to stand out to employers.</p>

      <div className="section">
        <img src={cvPic} alt="Resume Analysis" className="image" />
        <p className="sectionText">
          <b>Upload your resume</b> for a detailed analysis and get personalized recommendations to <b>enhance your job applications</b>.
        </p>
      </div>

      <div className="section">
        <img src={jobPic} alt="Job Listings" className="image" />
        <p className="sectionText">
          <b>Explore job listings</b> tailored to your skills and preferences. <b>Apply confidently</b> and track your applications.
        </p>
      </div>

      <div className="startButtonContainer">
        <Link
          to="/analysis"
          className="startButton"
        >
          Start Your Journey
        </Link>
      </div>
    </div>
  );
}

export default Home;
