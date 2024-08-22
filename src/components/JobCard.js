import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onInterest }) => {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>Compatibility: {job.compatibilityScore.toFixed(2)}%</p>
      <ul>
        {job.requiredSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p>Salary: ${job.salaryRange.min} - ${job.salaryRange.max}</p>
      <button onClick={onInterest}>Express Interest</button>
    </div>
  );
};

export default JobCard;