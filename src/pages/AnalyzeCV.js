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
    const [jobResults, setJobResults] = useState([]);
    const [jobError, setJobError] = useState(null); // Separate error state for job search
    const [jobLoading, setJobLoading] = useState(false); // Separate loading state for job search

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

    const handleJobSearch = async (e) => {
        e.preventDefault();
        const skills = e.target.skills.value;
        const preferences = e.target.preferences.value;
        const location = e.target.location.value;

        setJobLoading(true);
        setJobError(null);

        try {
            // Replace with your actual API endpoint
            const response = await fetch(`https://api.example.com/jobs?skills=${skills}&preferences=${preferences}&location=${location}`);
            const data = await response.json();

            if (response.ok) {
                setJobResults(data.jobs);
            } else {
                throw new Error(data.message || 'Failed to fetch jobs');
            }
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setJobError('Failed to fetch jobs. Please try again later.');
        } finally {
            setJobLoading(false);
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

                    <section className="job-search-section">
                        <h2>Find Your Perfect Job</h2>
                        <form className="job-search" onSubmit={handleJobSearch}>
                            <div className="input-group">
                                <label htmlFor="skills">Skills</label>
                                <input type="text" id="skills" name="skills" placeholder="Enter your skills" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="preferences">Job Preferences</label>
                                <input type="text" id="preferences" name="preferences" placeholder="Enter your preferences" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="location">Location</label>
                                <input type="text" id="location" name="location" placeholder="Enter your location" required />
                            </div>
                            <button className="button" type="submit">Search Jobs</button>
                        </form>
                        {jobLoading && <p>Loading jobs...</p>} {/* Show loading indicator */}
                        {jobError && <p className="error">{jobError}</p>} {/* Show error message */}
                        <div className="job-results">
                            {jobResults.length > 0 ? (
                                jobResults.map((job, index) => (
                                    <div key={index} className="job-result">
                                        <h3>{job.title}</h3>
                                        <p>{job.company}</p>
                                        <p>{job.location}</p>
                                        <a href={job.link} target="_blank" rel="noopener noreferrer">Apply Now</a>
                                    </div>
                                ))
                            ) : (
                                !jobLoading && !jobError && <p>No jobs found. Try different search criteria.</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AnalyzeCV;
