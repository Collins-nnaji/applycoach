import React, { useState } from 'react';
import './AnalyzeCV.css';

// Import the API service functions
const API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'An error occurred');
    }
    return response.json();
}

async function analyzeCV(resumeText, jobDescription) {
    const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
    });
    return handleResponse(response);
}

async function optimizeCV(resumeText, jobDescription, analysis) {
    const response = await fetch(`${API_URL}/api/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription, analysis }),
    });
    return handleResponse(response);
}

const AnalyzeCV = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [optimizing, setOptimizing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please enter your CV text and provide a job description.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setOptimizedResume(null);

    try {
      const data = await analyzeCV(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      console.error('Error analyzing CV:', err);
      setError(err.message || 'An error occurred while analyzing the CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!result) {
      setError('Please analyze the CV first before optimizing.');
      return;
    }

    setOptimizing(true);
    setError(null);

    try {
      const data = await optimizeCV(resumeText, jobDescription, result);
      setOptimizedResume(data.optimizedResume);
    } catch (err) {
      console.error('Error optimizing CV:', err);
      setError(err.message || 'An error occurred while optimizing the CV. Please try again.');
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="analyze-cv">
      <h2>Analyze Your CV</h2>
      <div className="input-section">
        <textarea
          placeholder="Paste your CV text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
        />
        <textarea
          placeholder="Enter the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
        />
        <button onClick={handleAnalyze} disabled={loading} className="primary-button">
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <section className="results-section">
          <h3>Analysis Results</h3>
          <div className="result-card match-score">
            <h4>Job Match Score</h4>
            <div className="score-display">
              <span className="percentage">{result.matchScore}%</span>
              <div className="progress-bar">
                <div className="progress" style={{width: `${result.matchScore}%`}}></div>
              </div>
            </div>
          </div>

          <div className="result-card skills-analysis">
            <h4>Skills Analysis</h4>
            <ul className="skills-list">
              {result.skills.map((skill, index) => (
                <li key={index} className={skill.match ? 'match' : 'gap'}>
                  {skill.match ? '✓' : '✗'}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="result-card recommendations">
            <h4>Recommendations</h4>
            <ul className="recommendations-list">
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="result-card job-titles">
            <h4>Suggested Job Titles</h4>
            <ul className="job-titles-list">
              {result.suggestedJobTitles.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </div>

          <button onClick={handleOptimize} disabled={optimizing} className="secondary-button">
            {optimizing ? 'Optimizing...' : 'Optimize CV'}
          </button>
        </section>
      )}

      {optimizedResume && (
        <section className="optimized-cv-section">
          <h3>Optimized CV</h3>
          <div className="optimized-cv-content">
            <pre>{optimizedResume}</pre>
          </div>
        </section>
      )}
    </div>
  );
};

export default AnalyzeCV;