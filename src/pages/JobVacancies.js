import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobVacancies.css';
import Header from '../components/Header';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const JobVacancies = () => {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [suggestedJobTitles, setSuggestedJobTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobVacancies = async () => {
      const storedJobTitles = localStorage.getItem('suggestedJobTitles');
      if (!storedJobTitles) {
        setError('No suggested job titles found. Please analyze your CV first.');
        setLoading(false);
        return;
      }

      const parsedJobTitles = JSON.parse(storedJobTitles);
      setSuggestedJobTitles(parsedJobTitles);

      try {
        const response = await fetch(`${API_URL}/api/job-vacancies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify({ jobTitles: parsedJobTitles }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setJobVacancies(data.jobVacancies);
      } catch (err) {
        console.error('Error fetching job vacancies:', err);
        setError('An error occurred while fetching job vacancies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
  };

  const handleBackToAnalysis = () => {
    navigate('/analyze-cv');
  };

  const handleLinkedInSearch = (jobTitle) => {
    const encodedJobTitle = encodeURIComponent(jobTitle);
    window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodedJobTitle}`, '_blank');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading">Loading job vacancies...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleBackToAnalysis} className="secondary-button">
            Back to CV Analysis
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="job-vacancies">
        <h2>Tailored Job Vacancies</h2>
        <p className="disclaimer">
          These job vacancies are tailored based on your CV analysis. While AI-assisted matching can be helpful, we strongly recommend against using AI to write your CV or professional profiles. Recruiters can easily detect AI-generated content, which may disadvantage your application. Instead, we offer bespoke services to help you create authentic, compelling applications that showcase your unique skills and experiences.
        </p>
        <div className="suggested-job-titles">
          <h3>Suggested Job Titles</h3>
          <div className="job-titles-list">
            {suggestedJobTitles.map((title, index) => (
              <div key={index} className="job-title-item">
                <span>{title}</span>
                <button onClick={() => handleLinkedInSearch(title)} className="linkedin-search-button">
                  Search on LinkedIn
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="vacancies-list">
          {jobVacancies.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Match Score:</strong> {job.matchScore}%</p>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.id)} className="primary-button">
                Apply
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleBackToAnalysis} className="secondary-button">
          Back to CV Analysis
        </button>
      </div>
    </>
  );
};

export default JobVacancies;