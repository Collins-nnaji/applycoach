import React, { useState } from 'react';
import { analyzeResume } from '../api/gptService';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import './AnalyzeCV.css';

function AnalyzeCV() {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!resumeText || !jobDescription) {
            setError('Please enter your resume text and provide a job description.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = {
                resumeText: resumeText,
                jobDescription: jobDescription,
            };

            const response = await analyzeResume(data);
            setResult(response);
        } catch (err) {
            console.error('Error analyzing resume:', err);
            setError('An error occurred while analyzing the resume. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyze-cv-wrapper">
            <Header />
            <div className="analyze-cv">
                <main className="main-content">
                    <section className="feature-section">
                        <div className="feature-content">
                            <div className="feature-text">
                                <h2>Analyze Your CV</h2>
                                <p>
                                    Paste your resume text and job description for a detailed analysis including job fit assessment and skill gap identification. Get personalized recommendations to enhance your job applications.
                                </p>
                                <textarea
                                    placeholder="Paste your resume text here..."
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                    rows={10}
                                />
                                <textarea
                                    placeholder="Enter the job description or title here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    rows={5}
                                />
                                <button onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Analyzing...' : 'Analyze'}
                                </button>
                                {loading && <LoadingSpinner />}
                                {error && <p className="error">{error}</p>}
                                {result && (
                                    <div className={`results ${result ? 'show' : ''}`}>
                                        <h3>Job Fit and Skill Gap Analysis</h3>
                                        <p>{result['Job Fit and Skill Gap']}</p>
                                        <h3>Recommendations</h3>
                                        <p>{result.Recommendations}</p>
                                        <h3>Suggested Job Titles</h3>
                                        <ul>
                                            {result['Suggested Job Titles']?.split('\n').map((title, index) => (
                                                <li key={index}>{title}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AnalyzeCV;
