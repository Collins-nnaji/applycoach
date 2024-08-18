import React, { useState, useEffect, useRef } from 'react';
import './AnalyzeCV.css';
import Header from '../components/Header';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const AnalyzeCV = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState(null);

  const analysisRef = useRef(null);
  const optimizedResumeRef = useRef(null);

  useEffect(() => {
    if (analysisRef.current) {
      analysisRef.current.scrollTop = analysisRef.current.scrollHeight;
    }
    if (optimizedResumeRef.current) {
      optimizedResumeRef.current.scrollTop = optimizedResumeRef.current.scrollHeight;
    }
  }, [analysis, optimizedResume]);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both CV text and job description.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis('');

    const eventSource = new EventSource(`${API_URL}/api/analyze`);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        setIsAnalyzing(false);
      } else {
        setAnalysis((prev) => prev + event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      setIsAnalyzing(false);
      setError('An error occurred while analyzing the CV. Please try again later.');
    };

    fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      body: JSON.stringify({ resumeText, jobDescription }),
    }).catch((error) => {
      console.error('Fetch error:', error);
      eventSource.close();
      setIsAnalyzing(false);
      setError('An error occurred while sending the request. Please try again later.');
    });
  };

  const handleOptimize = async () => {
    if (!analysis) {
      setError('Please analyze the CV first before optimizing.');
      return;
    }

    setIsOptimizing(true);
    setError(null);
    setOptimizedResume('');

    const eventSource = new EventSource(`${API_URL}/api/optimize`);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        setIsOptimizing(false);
      } else {
        setOptimizedResume((prev) => prev + event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
      setIsOptimizing(false);
      setError('An error occurred while optimizing the CV. Please try again later.');
    };

    fetch(`${API_URL}/api/optimize`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      body: JSON.stringify({ resumeText, jobDescription, analysis }),
    }).catch((error) => {
      console.error('Fetch error:', error);
      eventSource.close();
      setIsOptimizing(false);
      setError('An error occurred while sending the request. Please try again later.');
    });
  };

  return (
    <div className="analyze-cv-wrapper">
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
          <button onClick={handleAnalyze} disabled={isAnalyzing} className="primary-button">
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {analysis && (
          <section className="results-section">
            <h3>Analysis Results</h3>
            <div className="result-card analysis-content" ref={analysisRef}>
              {analysis.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <button onClick={handleOptimize} disabled={isOptimizing} className="secondary-button">
              {isOptimizing ? 'Optimizing...' : 'Optimize CV'}
            </button>
          </section>
        )}

        {optimizedResume && (
          <section className="optimized-cv-section">
            <h3>Optimized CV</h3>
            <div className="optimized-cv-content" ref={optimizedResumeRef}>
              {optimizedResume.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalyzeCV;