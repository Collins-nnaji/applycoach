import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMatchResultsAsync } from '../store/analysisSlice';
import CVUpload from '../components/CVUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';
import ProgressBar from '../components/ProgressBar';
import FloatingActionButton from '../components/FloatingActionButton';
import './Analysis.css';

function Analysis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const cv = useSelector((state) => state.analysis.cv);
  const jobDescription = useSelector((state) => state.analysis.jobDescription);
  const matchingStatus = useSelector((state) => state.analysis.loading);

  const handleAnalyze = () => {
    if (cv && jobDescription) {
      dispatch(getMatchResultsAsync({ cvId: cv.id, jobDescriptionId: jobDescription.id }));
      navigate('/results');
    } else {
      alert('Please complete both CV upload and job description before analyzing.');
    }
  };

  const handleCVUploadComplete = () => {
    setStep(2);
  };

  const handleJobDescriptionComplete = () => {
    setStep(3);
  };

  return (
    <div className="analysis-page">
      <div className="hero-section">
        <h1 className="hero-title">CV Match</h1>
        <p className="hero-subtitle">AI-Powered Job Fit Analysis</p>
      </div>
      <ProgressBar currentStep={step} totalSteps={3} />
      <div className="card-container">
        <CVUpload onComplete={handleCVUploadComplete} />
        <JobDescriptionInput onComplete={handleJobDescriptionComplete} />
      </div>
      {cv && jobDescription && (
        <FloatingActionButton
          onClick={handleAnalyze}
          label={matchingStatus === 'loading' ? 'Analyzing...' : 'Analyze'}
          disabled={matchingStatus === 'loading'}
        />
      )}
    </div>
  );
}

export default Analysis;