import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import JobFilter from '../components/JobFilter';
import JobCard from '../components/JobCard';
import SalaryChart from '../components/SalaryChart';
import SkillsMatchChart from '../components/SkillsMatchChart';
import './JobVacancies.css';

// Mock data
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Co",
    salaryRange: { min: 60000, max: 90000 },
    requiredSkills: ["React", "JavaScript", "CSS"],
    description: "We're looking for a skilled frontend developer to create responsive and interactive web applications."
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Data Systems Inc",
    salaryRange: { min: 70000, max: 100000 },
    requiredSkills: ["Node.js", "Express", "MongoDB"],
    description: "Seeking an experienced backend developer to build robust server-side applications."
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Innovative Solutions",
    salaryRange: { min: 80000, max: 120000 },
    requiredSkills: ["React", "Node.js", "PostgreSQL", "DevOps"],
    description: "Looking for a versatile full stack engineer to work on cutting-edge projects."
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Designs Co",
    salaryRange: { min: 65000, max: 95000 },
    requiredSkills: ["Figma", "Adobe XD", "User Research"],
    description: "Seeking a talented UI/UX designer to create intuitive and visually appealing interfaces."
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Analytics Pro",
    salaryRange: { min: 90000, max: 130000 },
    requiredSkills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    description: "We need a data scientist to derive insights from complex datasets and build predictive models."
  }
];

const JobVacancies = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    salaryMin: 0,
    salaryMax: 1000000,
    skills: [],
    companies: []
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJobs(mockJobs);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('An error occurred while fetching jobs. Please try again later.');
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    const filtered = jobs.filter(job => {
      const salaryInRange = job.salaryRange.min >= filters.salaryMin && job.salaryRange.max <= filters.salaryMax;
      const skillsMatch = filters.skills.length === 0 || filters.skills.every(skill => job.requiredSkills.includes(skill));
      const companyMatch = filters.companies.length === 0 || filters.companies.includes(job.company);
      return salaryInRange && skillsMatch && companyMatch;
    });
    setFilteredJobs(filtered);
  }, [jobs, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Header />
      <div className="job-vacancies-container">
        <h1>Open Book Job Board</h1>
        <JobFilter filters={filters} onFilterChange={handleFilterChange} />
        <div className="job-stats">
          <SalaryChart jobs={filteredJobs} />
          <SkillsMatchChart jobs={filteredJobs} />
        </div>
        <div className="job-list">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {filteredJobs.length === 0 && <p className="no-results">No jobs match your current filters. Try adjusting your criteria.</p>}
      </div>
    </>
  );
};

export default JobVacancies;