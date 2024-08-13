import React, { useState } from 'react';
import { analyzeResume, rewriteCV } from '../api/gptService';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './AnalyzeCV.css';

function AnalyzeCV() {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [rewrittenCV, setRewrittenCV] = useState(null);
    const [rewriteLoading, setRewriteLoading] = useState(false);

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

    const handleRewriteCV = async () => {
        if (!result || !result.suggestedJobTitles) {
            setError('Please analyze your CV first to get suggested job titles.');
            return;
        }

        setRewriteLoading(true);
        setError(null);

        try {
            const data = {
                resumeText: resumeText,
                suggestedJobTitles: result.suggestedJobTitles,
            };

            const response = await rewriteCV(data);
            setRewrittenCV(response.rewrittenCV);
        } catch (err) {
            console.error('Error rewriting CV:', err);
            setError('An error occurred while rewriting the CV. Please try again later.');
        } finally {
            setRewriteLoading(false);
        }
    };

    const downloadRewrittenCV = () => {
        if (!rewrittenCV) return;

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(rewrittenCV)
                        ],
                    }),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "RewrittenCV.docx");
        });
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

                    <section className="rewrite-cv-section">
                        <h2>Enhance Your CV</h2>
                        <p>
                            Rewrite your CV to highlight your skills and experiences that align with the suggested job titles.
                            The enhanced CV will be tailored to improve your chances of landing these roles.
                        </p>
                        <button onClick={handleRewriteCV} disabled={rewriteLoading || !result}>
                            {rewriteLoading ? 'Rewriting CV...' : 'Rewrite My CV'}
                        </button>
                        {rewriteLoading && <LoadingSpinner />}
                        {rewrittenCV && (
                            <div className="rewritten-cv-download">
                                <p>Your CV has been rewritten and enhanced! Click below to download.</p>
                                <button onClick={downloadRewrittenCV}>Download Rewritten CV</button>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AnalyzeCV;