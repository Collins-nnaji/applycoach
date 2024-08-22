import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import ProfileForm from '../components/ProfileForm';
import SkillAssessment from '../components/SkillAssessment';
import './JobMatching.css';

const JobMatching = () => {
  const { user, jobs, fetchJobs, updateUserProfile } = useAppContext();
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);

  useEffect(() => {
    fetchJobs();
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
    // Implement your compatibility calculation logic here
    // This is a simplified example
    const sharedSkills = user.skills.filter(skill => job.requiredSkills.includes(skill));
    return (sharedSkills.length / job.requiredSkills.length) * 100;
  };

  const handleProfileUpdate = (updatedProfile) => {
    updateUserProfile(updatedProfile);
    setShowProfileForm(false);
  };

  const handleJobInterest = (jobId) => {
    // Implement logic to express interest in a job
    console.log(`Expressed interest in job ${jobId}`);
  };

  const handleSkillAssessment = (results) => {
    // Implement logic to update user profile with assessment results
    console.log('Skill assessment results:', results);
    setShowSkillAssessment(false);
  };

  return (
    <div className="job-matching-page">
      <Header />
      <div className="job-matching-content">
        <h1>Job Matching</h1>
        <button onClick={() => setShowProfileForm(true)}>Update Profile</button>
        <button onClick={() => setShowSkillAssessment(true)}>Take Skill Assessment</button>
        
        {showProfileForm && (
          <ProfileForm onSubmit={handleProfileUpdate} initialData={user} />
        )}
        
        {showSkillAssessment && (
          <SkillAssessment onComplete={handleSkillAssessment} />
        )}
        
        <div className="job-list">
          {matchedJobs.map(job => (
            <JobCard 
              key={job.id}
              job={job}
              onInterest={() => handleJobInterest(job.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobMatching;