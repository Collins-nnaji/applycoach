import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SalaryChart.css';

const SalaryChart = ({ jobs }) => {
  if (jobs.length === 0) {
    return <div className="salary-chart no-data">No salary data available</div>;
  }

  const chartData = jobs.map(job => ({
    name: job.title,
    min: job.salaryRange.min,
    max: job.salaryRange.max,
  }));

  return (
    <div className="salary-chart">
      <h2>Salary Ranges</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="min" fill="#8884d8" name="Minimum Salary" />
          <Bar dataKey="max" fill="#82ca9d" name="Maximum Salary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;