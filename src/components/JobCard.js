import React from 'react';
import './JobCard.css';

const JobCard = ({ job, compatibilityScore }) => {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p className="company">{job.company}</p>
      <p className="compatibility">Match: {compatibilityScore.toFixed(1)}%</p>
      <p className="salary-range">Salary: ${job.salaryRange.min} - ${job.salaryRange.max}</p>
      <ul className="required-skills">
        {job.requiredSkills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
      <p className="description">{job.description}</p>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;