import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import cvPic from '../assets/CVpic.jpg';  // Import the CV image
import jobPic from '../assets/Jobpic.jpg'; // Import the Job image

function Home() {
  return (
    <div className="home">
      <h1 className="title">Analyze and Optimize Your CV</h1>
      <p className="subtitle">Upload your CV and job description to get a match score and recommendations. Get an optimized CV and discover job opportunities tailored to your profile.</p>

      <div className="section">
        <img src={cvPic} alt="CV Analysis" className="image" />
        <p className="sectionText">
          <b>Upload your CV</b> and job description for a detailed analysis and get a <b>personalized, optimized CV</b>.
        </p>
      </div>

      <div className="section">
        <img src={jobPic} alt="Job Descriptions" className="image" />
        <p className="sectionText">
          <b>Receive job descriptions</b> that match your CV perfectly and <b>apply with confidence</b>.
        </p>
      </div>

      <div className="startButtonContainer">
        <Link
          to="/analysis"
          className="startButton"
        >
          Start Analysis
        </Link>
      </div>
    </div>
  );
}

export default Home;
