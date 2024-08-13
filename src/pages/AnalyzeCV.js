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
    const [careerInsights, setCareerInsights] = useState(null);
    const [insightsLoading, setInsightsLoading] = useState(false);

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
            setError(`An error occurred while analyzing the resume: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    const generateCareerInsights = async () => {
        setInsightsLoading(true);
        setCareerInsights(null);

        try {
            // Simulating an API call for career insights
            await new Promise(resolve => setTimeout(resolve, 2000));
            setCareerInsights({
                trendingSkills: ['Data Science', 'Machine Learning', 'Cloud Computing'],
                growingSectors: ['Healthcare Tech', 'Renewable Energy', 'Cybersecurity'],
                salaryTrends: {
                    entry: '$50,000 - $70,000',
                    mid: '$70,000 - $100,000',
                    senior: '$100,000+'
                }
            });
        } catch (err) {
            console.error('Error generating career insights:', err);
            setError('Failed to generate career insights. Please try again later.');
        } finally {
            setInsightsLoading(false);
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
                                    Paste your resume text and job description for a detailed analysis including job fit assessment, skill gap identification, and personalized recommendations.
                                </p>
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
                                <button onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Analyzing...' : 'Analyze'}
                                </button>
                                {loading && <LoadingSpinner />}
                                {error && <p className="error">{error}</p>}
                                {result && (
                                    <div className={`results ${result ? 'show' : ''}`}>
                                        <div className="result-section">
                                            <h3>Job Match Score</h3>
                                            <div className="match-score">
                                                <span className="percentage">{result.matchScore}%</span>
                                                <div className="progress-bar">
                                                    <div className="progress" style={{width: `${result.matchScore}%`}}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="result-section">
                                            <h3>Skills Analysis</h3>
                                            <ul className="skills-list">
                                                {result.skills.map((skill, index) => (
                                                    <li key={index} className={skill.match ? 'match' : 'gap'}>
                                                        {skill.name}
                                                        <span className={`status ${skill.match ? 'match' : 'gap'}`}>
                                                            {skill.match ? 'Match' : 'Gap'}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="result-section">
                                            <h3>Recommendations</h3>
                                            <ul className="recommendations-list">
                                                {result.recommendations.map((rec, index) => (
                                                    <li key={index}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="result-section">
                                            <h3>Suggested Job Titles</h3>
                                            <ul className="job-titles-list">
                                                {result.suggestedJobTitles.map((title, index) => (
                                                    <li key={index}>{title}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="career-insights-section">
                        <h2>Career Insights</h2>
                        <p>Get valuable insights into current job market trends, in-demand skills, and salary expectations.</p>
                        <button onClick={generateCareerInsights} disabled={insightsLoading}>
                            {insightsLoading ? 'Generating Insights...' : 'Generate Career Insights'}
                        </button>
                        {insightsLoading && <LoadingSpinner />}
                        {careerInsights && (
                            <div className="insights-results">
                                <div className="insight-card">
                                    <h3>Trending Skills</h3>
                                    <ul>
                                        {careerInsights.trendingSkills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="insight-card">
                                    <h3>Growing Sectors</h3>
                                    <ul>
                                        {careerInsights.growingSectors.map((sector, index) => (
                                            <li key={index}>{sector}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="insight-card">
                                    <h3>Salary Trends</h3>
                                    <ul>
                                        <li>Entry Level: {careerInsights.salaryTrends.entry}</li>
                                        <li>Mid-Career: {careerInsights.salaryTrends.mid}</li>
                                        <li>Senior Level: {careerInsights.salaryTrends.senior}</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AnalyzeCV;
