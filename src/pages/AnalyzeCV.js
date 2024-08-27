import React, { useState } from 'react';
import './AnalyzeCV.css';
import Header from '../components/Header';
import { useAppContext } from '../contexts/AppContext';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const AnalyzeCV = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationTips, setOptimizationTips] = useState(null);
  const { setSuggestedJobTitles } = useAppContext();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResumeFile(file);
      setError(null);
    } else {
      setError('Please upload a PDF or DOC file.');
      setResumeFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      setError('Please upload your CV and provide a job description.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setOptimizationTips(null);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 
          'Origin': window.location.origin
        },
        body: formData,
      });

      const responseData = await response.text();
      console.log('Raw API response:', responseData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseData}`);
      }

      let data;
      try {
        data = JSON.parse(responseData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }

      if (!data || typeof data !== 'object') {
        throw new Error('Unexpected response format from server');
      }

      console.log('Parsed API response:', data);

      setResult(data);
      setSuggestedJobTitles(data.suggestedJobTitles.map(job => job.title));
    } catch (err) {
      console.error('Error analyzing CV:', err);
      setError(`An error occurred while analyzing the CV: ${err.message}. Please try again later.`);
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
        body: JSON.stringify({ resumeText: resumeFile.name, jobDescription, analysis: result }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOptimizationTips(data.optimizationTips);
    } catch (err) {
      console.error('Error optimizing CV:', err);
      setError('An error occurred while optimizing the CV. Please try again later.');
    } finally {
      setOptimizing(false);
    }
  };

  const handleBrowseJobs = (jobTitle) => {
    const searchQuery = encodeURIComponent(`${jobTitle} jobs`);
    const googleJobsUrl = `https://www.google.com/search?q=${searchQuery}&ibp=htl;jobs`;
    window.open(googleJobsUrl, '_blank');
  };

  return (
    <>
      <Header />
      <div className="analyze-cv-container">
        <div className="analyze-cv-component">
          <div className="analyze-cv">
            <h2>Analyze Your CV</h2>
            <div className="input-section">
              <div className="file-input-container">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  id="cv-upload"
                />
                <label htmlFor="cv-upload" className={`file-input-button ${resumeFile ? 'file-selected' : ''}`}>
                  {resumeFile ? 'CV Uploaded' : 'Choose CV File'}
                </label>
                {resumeFile && <div className="file-name">{resumeFile.name}</div>}
              </div>
              <textarea
                placeholder="Enter the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={5}
              />
              <button onClick={handleAnalyze} disabled={loading} className={`primary-button ${loading ? 'loading' : ''}`}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
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
                  <p className="match-explanation">{result.matchScoreExplanation}</p>
                </div>

                <div className="result-card skills-analysis">
                  <h4>Skills Analysis</h4>
                  <ul className="skills-list">
                    {result.skills.map((skill, index) => (
                      <li key={index} className={skill.match ? 'match' : 'gap'}>
                        {skill.match ? '✓' : '✗'}
                        <span className="skill-name">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="result-card skills-gap">
                  <h4>Skills Gap Analysis</h4>
                  <p>{result.skillsGapAnalysis}</p>
                </div>

                <div className="result-card recommendations">
                  <h4>Recommendations</h4>
                  <ul className="recommendations-list">
                    {result.recommendations.map((rec, index) => (
                      <li key={index}>
                        <strong>{rec.action}</strong>
                        <span className="time-estimate">Estimated time: {rec.timeEstimate}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="result-card job-titles">
                  <h4>Suggested Job Titles</h4>
                  <ul className="job-titles-list">
                    {result.suggestedJobTitles.map((job, index) => (
                      <li key={index}>
                        <strong className="job-title">{job.title}</strong>
                        <p className="job-explanation">{job.explanation}</p>
                        <button 
                          onClick={() => handleBrowseJobs(job.title)} 
                          className="browse-jobs-button"
                        >
                          Browse Jobs
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={handleOptimize} disabled={optimizing} className="secondary-button">
                  {optimizing ? 'Getting optimization tips...' : 'Get CV Optimization Tips'}
                </button>
              </section>
            )}

            {optimizationTips && (
              <section className="optimization-section">
                <h3>CV Optimization Tips</h3>
                {optimizationTips.map((category, index) => (
                  <div key={index} className="optimization-category">
                    <h4>{category.category}</h4>
                    <ul>
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyzeCV;