import React from 'react';
import { useSelector } from 'react-redux';

const styles = {
  matchResults: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  matchPercentage: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: '10px',
  },
  matchDetails: {
    listStyle: 'none',
    padding: 0,
  },
  matchItem: {
    marginBottom: '5px',
  },
};

function MatchResults() {
  const matchResults = useSelector(state => state.analysis.matchResults);

  if (!matchResults) {
    return null;
  }

  return (
    <div style={styles.matchResults}>
      <h2>Match Results</h2>
      <p style={styles.matchPercentage}>Match Percentage: {matchResults.percentage}%</p>
      <ul style={styles.matchDetails}>
        {matchResults.details.map((detail, index) => (
          <li key={index} style={styles.matchItem}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchResults;