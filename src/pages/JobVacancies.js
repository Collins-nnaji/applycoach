import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobVacancies.css';
import Header from '../components/Header';
import { useAppContext } from './AppContext';

const JobVacancies = () => {
  const { 
    suggestedJobTitles, 
    jobVacancies, 
    fetchJobVacancies, 
    loading, 
    error 
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (suggestedJobTitles.length === 0) {
      navigate('/analyze-cv');
    } else {
      fetchJobVacancies();
    }
  }, [suggestedJobTitles, fetchJobVacancies, navigate]);

  const handleApply = (jobId) => {
    console.log(`Applying for job with ID: ${jobId}`);
    // Implement your apply logic here
  };

  const handleBackToAnalysis = () => {
    navigate('/analyze-cv');
  };

  const handleGoogleJobsSearch = (jobTitle) => {
    const searchQuery = encodeURIComponent(`${jobTitle} jobs`);
    const googleJobsUrl = `https://www.google.com/search?q=${searchQuery}&ibp=htl;jobs`;
    window.open(googleJobsUrl, '_blank');
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
                <button onClick={() => handleGoogleJobsSearch(title)} className="google-jobs-search-button">
                  Search on Google Jobs
                </button>
              </div>
            ))}
          </div>
        </div>
        {jobVacancies.length > 0 ? (
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
        ) : (
          <p>No job vacancies found matching your profile. Try searching on Google Jobs using the suggested job titles above.</p>
        )}
        <button onClick={handleBackToAnalysis} className="secondary-button">
          Back to CV Analysis
        </button>
      </div>
    </>
  );
};

export default JobVacancies;