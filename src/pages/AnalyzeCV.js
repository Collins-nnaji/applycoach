import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyzeCV.css';
import Header from '../components/Header';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const AnalyzeCV = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      localStorage.setItem('suggestedJobTitles', JSON.stringify(data.suggestedJobTitles));
    } catch (err) {
      console.error('Error analyzing CV:', err);
      setError('An error occurred while analyzing the CV. Please try again later.');
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
      const response = await fetch(`${API_URL}/api/optimize`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ resumeText, jobDescription, analysis: result }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOptimizedResume(data.optimizedResume);
    } catch (err) {
      console.error('Error optimizing CV:', err);
      setError('An error occurred while optimizing the CV. Please try again later.');
    } finally {
      setOptimizing(false);
    }
  };

  const handleViewJobVacancies = () => {
    navigate('/job-vacancies');
  };

  return (
    <>
      <Header />
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
            <button onClick={handleViewJobVacancies} className="secondary-button">
              View Job Vacancies
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
    </>
  );
};

export default AnalyzeCV;