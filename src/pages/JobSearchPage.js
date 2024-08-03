// src/pages/JobSearchPage.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobSearch from '../components/JobSearch';
import JobList from '../components/JobList';
import './JobSearchPage.css';

function JobSearchPage() {
  const [jobs, setJobs] = useState([]);
  const analysis = useSelector((state) => state.resume.analysis);

  useEffect(() => {
    if (analysis && analysis.skills.length > 0) {
      handleSearch({ keywords: analysis.skills.join(' '), location: '' });
    }
  }, [analysis]);

  const handleSearch = (searchParams) => {
    // Mock job search logic
    const mockJobs = [
      { id: 1, title: 'Software Engineer', company: 'Company A', location: 'New York, NY' },
      { id: 2, title: 'Data Scientist', company: 'Company B', location: 'San Francisco, CA' },
    ];
    setJobs(mockJobs);
  };

  return (
    <div className="job-search-page">
      <h1 className="title">Job Search</h1>
      <JobSearch onSearch={handleSearch} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobSearchPage;
