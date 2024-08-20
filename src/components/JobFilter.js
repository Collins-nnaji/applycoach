import React, { useState, useEffect } from 'react';
import './JobFilter.css';

const JobFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setLocalFilters(prev => ({ ...prev, skills }));
  };

  const handleCompanyChange = (e) => {
    const companies = e.target.value.split(',').map(company => company.trim());
    setLocalFilters(prev => ({ ...prev, companies }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  return (
    <form className="job-filter" onSubmit={handleSubmit}>
      <div className="filter-group">
        <label htmlFor="salaryMin">Minimum Salary:</label>
        <input
          type="number"
          id="salaryMin"
          name="salaryMin"
          value={localFilters.salaryMin}
          onChange={handleChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="salaryMax">Maximum Salary:</label>
        <input
          type="number"
          id="salaryMax"
          name="salaryMax"
          value={localFilters.salaryMax}
          onChange={handleChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="skills">Required Skills (comma-separated):</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={localFilters.skills.join(', ')}
          onChange={handleSkillChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="companies">Companies (comma-separated):</label>
        <input
          type="text"
          id="companies"
          name="companies"
          value={localFilters.companies.join(', ')}
          onChange={handleCompanyChange}
        />
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default JobFilter;