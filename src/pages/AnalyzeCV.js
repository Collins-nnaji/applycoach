import React, { useState } from 'react';
import { analyzeResume } from '../api/gptService';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import './AnalyzeCV.css';
import cvPic from '../assets/CVpic.jpg';

function AnalyzeCV() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && isValidFileType(selectedFile)) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setError('Please upload a valid resume file (PDF, DOC, DOCX)');
            setFile(null);
            setFileName('');
        }
    };

    const isValidFileType = (file) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return allowedTypes.includes(file.type);
    };

    const extractTextFromFile = async (file) => {
        if (file.type === 'application/pdf') {
            const data = await pdfParse(file);
            return data.text;
        } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const data = await mammoth.extractRawText({ arrayBuffer: file });
            return data.value;
        } else {
            throw new Error('Unsupported file type');
        }
    };

    const handleSubmit = async () => {
        if (!file || !jobDescription) {
            setError('Please upload a resume and provide a job description.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const resumeText = await extractTextFromFile(file);

            const response = await analyzeResume({ resumeText, jobDescription });
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
                            <img src={cvPic} alt="Resume Analysis" className="feature-image" />
                            <div className="feature-text">
                                <h2>Analyze Your CV</h2>
                                <p>
                                    Upload your resume and job description for a detailed analysis including job fit assessment and skill gap identification. Get personalized recommendations to enhance your job applications.
                                </p>
                                <label className="file-label">
                                    {fileName ? `Selected: ${fileName}` : 'Upload Resume (PDF, DOC, DOCX)'}
                                    <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                </label>
                                <textarea
                                    placeholder="Enter the job description or title here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                                <button onClick={handleSubmit} disabled={loading}>
                                    {loading ? 'Analyzing...' : (fileName ? 'Analyze' : 'Upload and Analyze')}
                                </button>
                                {loading && <LoadingSpinner />}
                                {error && <p className="error">{error}</p>}
                                {result && (
                                    <div className="results">
                                        <h3>Job Fit and Skill Gap Analysis</h3>
                                        <p>{result.jobFitAndSkillGap}</p>
                                        <h3>Recommendations</h3>
                                        <p>{result.recommendations}</p>
                                        <h3>Suggested Job Titles</h3>
                                        <p>{result.suggestedJobTitles}</p>
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
