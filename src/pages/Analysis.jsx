// src/pages/Analysis.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, CircularProgress, Card, CardContent } from '@mui/material';
import CVUpload from '../components/CVUpload';
import ProgressTracker from '../components/ProgressTracker';
import JobList from '../components/JobList';
import MatchResults from '../components/MatchResults';
import { getJobMatchesAsync } from '../store/resumeSlice';
import './Analysis.css';

function Analysis() {
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const analysis = useSelector((state) => state.resume.analysis);
  const jobMatches = useSelector((state) => state.resume.jobMatches);
  const resumeUploadStatus = useSelector((state) => state.resume.loading);

  useEffect(() => {
    if (analysis && analysis.skills.length > 0) {
      dispatch(getJobMatchesAsync(analysis.skills));
      setCurrentStep(3);
    }
  }, [analysis, dispatch]);

  const handleUploadComplete = () => {
    setCurrentStep(2);
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
        {currentStep === 2 && resumeUploadStatus !== 'loading' && !analysis && (
          <div className="analyzing-section">
            <Typography variant="h6">Analyzing your resume...</Typography>
            <CircularProgress />
          </div>
        )}
        {currentStep === 3 && (
          <div className="results-section">
            {analysis && (
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
            )}
            <JobList jobs={jobMatches} />
            <MatchResults />
          </div>
        )}
      </div>
    </div>
  );
}

export default Analysis;
