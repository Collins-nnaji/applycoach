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
    padding: '20px',
    background: 'var(--background-color)',
    color: 'var(--text-color)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: 'var(--primary-color)',
  },
  section: {
    marginBottom: '30px',
  },
  analyzeButton: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '10px 20px',
    fontSize: '1.25rem',
    border: '2px solid var(--button-background)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  analyzeButtonHover: {
    backgroundColor: 'var(--hover-background)',
    color: 'var(--button-text)',
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
      <div style={styles.section}>
        <CVUpload />
      </div>
      <div style={styles.section}>
        <JobDescriptionInput />
      </div>
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
