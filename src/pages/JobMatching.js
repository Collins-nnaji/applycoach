import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import './JobMatching.css';

const JobMatching = () => {
  const { user, jobs, fetchJobs } = useAppContext();
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await fetchJobs();
      setLoading(false);
    };
    initializeData();
  }, [fetchJobs]);

  useEffect(() => {
    if (user && jobs.length > 0) {
      const matched = jobs.map(job => ({
        ...job,
        compatibilityScore: calculateCompatibility(user, job)
      })).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
      setMatchedJobs(matched);
    }
  }, [user, jobs]);

  const calculateCompatibility = (user, job) => {
    // Implement a more comprehensive compatibility calculation
    // Make sure to handle cases where user properties might be undefined
    const userSkills = user?.skills || [];
    const jobSkills = job.requiredSkills || [];
    const skillMatch = userSkills.filter(skill => 
      jobSkills.includes(skill.toLowerCase())
    ).length / jobSkills.length;
    
    const userExperience = user?.yearsOfExperience || 0;
    const jobExperience = job.requiredExperience || 1;
    const experienceMatch = Math.min(userExperience / jobExperience, 1);
    
    const userEducation = user?.educationLevel || 0;
    const jobEducation = job.requiredEducationLevel || 0;
    const educationMatch = userEducation >= jobEducation ? 1 : 0;
    
    // You can adjust these weights based on importance
    const weights = { skills: 0.5, experience: 0.3, education: 0.2 };
    
    return (
      (skillMatch * weights.skills + 
      experienceMatch * weights.experience + 
      educationMatch * weights.education) * 100
    );
  };

  if (loading) {
    return <div className="loading">Loading job matches...</div>;
  }

  return (
    <div className="job-matching-page">
      <Header />
      <div className="job-matching-content">
        <h1>Your Job Matches</h1>
        <p>Based on your profile, we've found the following job matches for you:</p>
        
        <div className="job-list">
          {matchedJobs.map(job => (
            <JobCard 
              key={job.id}
              job={job}
              compatibilityScore={job.compatibilityScore}
            />
          ))}
        </div>
        
        {matchedJobs.length === 0 && (
          <p className="no-matches">No job matches found. Please update your profile to improve matches.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobMatching;