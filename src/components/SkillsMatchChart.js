import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import './SkillsMatchChart.css';

const SkillsMatchChart = ({ jobs }) => {
  if (jobs.length === 0) {
    return <div className="skills-match-chart no-data">No skills data available</div>;
  }

  const skillsCount = jobs.reduce((acc, job) => {
    job.requiredSkills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const chartData = Object.entries(skillsCount).map(([skill, count]) => ({
    skill,
    count
  }));

  return (
    <div className="skills-match-chart">
      <h2>Skills in Demand</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
          <Radar name="Skill Demand" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsMatchChart;