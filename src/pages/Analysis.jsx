// src/pages/Analysis.js

import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Card, CardContent } from '@mui/material';
import CVUpload from '../components/CVUpload';
import ProgressTracker from '../components/ProgressTracker';
import JobList from '../components/JobList';
import MatchResults from '../components/MatchResults';
import './Analysis.css';

function Analysis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadComplete = (uploadResponse) => {
    setCurrentStep(2);
    setLoading(true);
    // Simulate polling or a delay for analysis completion
    setTimeout(() => {
      // Simulate fetching the analysis results
      const analysisResults = {
        summary: "Experienced Full-Stack Developer with expertise in React and Node.js.",
        skills: ["Python", "React", "Node.js"],
        jobMatches: [
          { id: 1, title: 'Software Engineer', company: 'Company A', location: 'New York, NY' },
          { id: 2, title: 'Frontend Developer', company: 'Company B', location: 'San Francisco, CA' },
        ],
      };
      setAnalysis(analysisResults);
      setCurrentStep(3);
      setLoading(false);
    }, 5000); // Simulate a delay for the analysis to complete
  };

  return (
    <div className="analysis-page">
      <header className="hero-section">
        <Typography variant="h1" className="hero-title">Resume Analysis</Typography>
        <Typography variant="h2" className="hero-subtitle">AI-Powered Job Fit Analysis</Typography>
      </header>
      <div className="steps-summary">
        <Card className="step-card">
          <CardContent>
            <Typography variant="h6">Step 1: Upload Resume</Typography>
            <Typography>Upload your resume to begin the analysis.</Typography>
          </CardContent>
        </Card>
        <Card className="step-card">
          <CardContent>
            <Typography variant="h6">Step 2: Analysis</Typography>
            <Typography>Your resume will be analyzed to extract skills and summary.</Typography>
          </CardContent>
        </Card>
        <Card className="step-card">
          <CardContent>
            <Typography variant="h6">Step 3: Job Matching</Typography>
            <Typography>Get job matches based on the extracted skills.</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="content-section">
        <CVUpload onUploadComplete={handleUploadComplete} />
        <ProgressTracker currentStep={currentStep} totalSteps={3} />
        {currentStep === 2 && loading && (
          <div className="analyzing-section">
            <Typography variant="h6">Analyzing your resume...</Typography>
            <CircularProgress />
          </div>
        )}
        {currentStep === 3 && analysis && (
          <div className="results-section">
            <div className="summary-section">
              <Typography variant="h6">Resume Summary</Typography>
              <Typography>{analysis.summary}</Typography>
              <Typography variant="h6">Skills</Typography>
              <ul>
                {analysis.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <JobList jobs={analysis.jobMatches} />
            <MatchResults results={analysis.jobMatches} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Analysis;
