import React, { useState } from 'react';
import { analyzeResume, optimizeResume } from '../api/gptService';
import Header from '../components/Header';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import './AnalyzeCV.css';

function AnalyzeCV() {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [optimizedResume, setOptimizedResume] = useState(null);
    const [optimizing, setOptimizing] = useState(false);

    const handleSubmit = async () => {
        if (!resumeText || !jobDescription) {
            setError('Please enter your resume text and provide a job description.');
            return;
        }
    
        setLoading(true);
        setError(null);
        setResult(null);
        setOptimizedResume(null);
    
        try {
            const data = { resumeText, jobDescription };
            console.log('Sending analyze request');
            const response = await analyzeResume(data);
            console.log('Received analyze response', response);
            if (response && response.matchScore !== undefined) {
                setResult(response);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Error analyzing resume:', err);
            setError(`An error occurred while analyzing the resume: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOptimize = async () => {
        if (!result) {
            setError('Please analyze the resume first before optimizing.');
            return;
        }

        setOptimizing(true);
        setError(null);

        try {
            const data = { resumeText, jobDescription, analysis: result };
            console.log('Sending optimize request');
            const response = await optimizeResume(data);
            console.log('Received optimize response', response);
            if (response && response.optimizedResume) {
                setOptimizedResume(response.optimizedResume);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Error optimizing resume:', err);
            setError(`An error occurred while optimizing the resume: ${err.message}`);
        } finally {
            setOptimizing(false);
        }
    };

    return (
        <div className="analyze-cv-wrapper">
            <Header />
            <div className="analyze-cv">
                <main className="main-content">
                    <section className="input-section">
                        <h2>Analyze Your CV</h2>
                        <p>
                            Paste your resume text and job description for a detailed analysis including job fit assessment, skill gap identification, and personalized recommendations.
                        </p>
                        <div className="input-fields">
                            <textarea
                                placeholder="Paste your resume text here..."
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
                        </div>
                        <button onClick={handleSubmit} disabled={loading} className="primary-button">
                            {loading ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </section>

                    {error && (
                        <div className="error-message">
                            <AlertCircle size={24} />
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
                                            {skill.match ? <CheckCircle size={18} /> : <XCircle size={18} />}
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
                                {optimizing ? 'Optimizing...' : 'Optimize Resume'}
                            </button>
                        </section>
                    )}

                    {optimizedResume && (
                        <section className="optimized-resume-section">
                            <h3>Optimized Resume</h3>
                            <div className="optimized-resume-content">
                                <pre>{optimizedResume}</pre>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default AnalyzeCV;