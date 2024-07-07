import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMatchResultsAsync } from '../store/analysisSlice';
import CVUpload from '../components/CVUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';
import './Analysis.css';

function Analysis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cv = useSelector((state) => state.analysis.cv);
  const jobDescription = useSelector((state) => state.analysis.jobDescription);
  const matchingStatus = useSelector((state) => state.analysis.loading);

  const handleAnalyze = () => {
    if (cv && jobDescription) {
      dispatch(getMatchResultsAsync({ cvId: cv.id, jobDescriptionId: jobDescription.id }));
      navigate('/results');
    } else {
      alert('Please upload a CV and enter a job description before analyzing.');
    }
  };

  return (
    <div className="analysis">
      <h1 className="title">CV and Job Description Analysis</h1>
      <CVUpload />
      <JobDescriptionInput />
      <button
        onClick={handleAnalyze}
        className="analyzeButton"
        disabled={!cv || !jobDescription || matchingStatus === 'loading'}
      >
        {matchingStatus === 'loading' ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
}

export default Analysis;
