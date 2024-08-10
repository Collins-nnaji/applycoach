import React, { useState } from 'react';
import { analyzeResume } from '../api/gptService';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import './AnalyzeCV.css';
import cvPic from '../assets/CVpic.jpg';

function AnalyzeCV() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(''); // Track the name of the selected file
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : ''); // Update file name display
    };

    const handleSubmit = async () => {
        if (!file || !jobDescription) {
            alert('Please upload a resume and provide a job description.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('resume', file);
            formData.append('jobDescription', jobDescription);

            const response = await analyzeResume(formData);
            setResult(response);
        } catch (err) {
            console.error('Error analyzing resume:', err);
            if (err.response) {
                setError(`Error: ${err.response.status} - ${err.response.data.error || err.response.data}`);
            } else if (err.request) {
                setError('No response received from the server. Please try again later.');
            } else {
                setError(`An unexpected error occurred: ${err.message}`);
            }
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
                                    {fileName ? `Selected: ${fileName}` : 'Upload Resume'}
                                    <input type="file" onChange={handleFileChange} />
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
