import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import './Analysis.css';

const AnalysisResults = ({ analysis }) => {
  if (!analysis) return <p>No analysis results available.</p>;

  return (
    <div>
      <h3>Resume Analysis</h3>
      <ul>
        {Object.entries(analysis).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value.content || value.value || ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

function Analysis() {
  const { analysis } = useSelector((state) => state.resume);

  return (
    <div className="analysis">
      <Header />
      <main className="main-content">
        <section className="analysis-results">
          <h2>Analysis Results</h2>
          <AnalysisResults analysis={analysis} />
        </section>
      </main>
    </div>
  );
}

export default Analysis;
