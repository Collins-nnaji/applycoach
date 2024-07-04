import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMatchResultsAsync } from '../store/analysisSlice';
import CVUpload from '../components/CVUpload';
import JobDescriptionInput from '../components/JobDescriptionInput';

const styles = {
  analysis: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    background: 'var(--background-color)',
    color: 'var(--text-color)',
    minHeight: '100vh',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: 'var(--primary-color)',
    textAlign: 'center',
  },
  analyzeButton: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '15px 30px',
    fontSize: '1.25rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'block',
    width: '100%',
    marginTop: '30px',
  },
  analyzeButtonHover: {
    backgroundColor: 'var(--hover-background)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
};

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
    <div style={styles.analysis}>
      <h1 style={styles.title}>CV and Job Description Analysis</h1>
      <CVUpload />
      <JobDescriptionInput />
      <button
        onClick={handleAnalyze}
        style={styles.analyzeButton}
        disabled={!cv || !jobDescription || matchingStatus === 'loading'}
        onMouseOver={(e) => e.target.style = { ...styles.analyzeButton, ...styles.analyzeButtonHover }}
        onMouseOut={(e) => e.target.style = styles.analyzeButton}
      >
        {matchingStatus === 'loading' ? 'Analyzing...' : 'Analyze'}
      </button>
    </div>
  );
}

export default Analysis;