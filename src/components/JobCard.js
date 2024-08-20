import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p className="company">{job.company}</p>
      <p className="salary-range">Salary Range: ${job.salaryRange.min} - ${job.salaryRange.max}</p>
      <div className="skills">
        <h3>Required Skills:</h3>
        <ul>
          {job.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <p className="description">{job.description}</p>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;