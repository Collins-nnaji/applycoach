import React from 'react';
import { useSelector } from 'react-redux';

const styles = {
  suggestions: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  suggestionList: {
    listStyle: 'none',
    padding: 0,
  },
  suggestionItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
};

function Suggestions() {
  const suggestions = useSelector(state => state.analysis.suggestions);

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div style={styles.suggestions}>
      <h2>Improvement Suggestions</h2>
      <ul style={styles.suggestionList}>
        {suggestions.map((suggestion, index) => (
          <li key={index} style={styles.suggestionItem}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestions;