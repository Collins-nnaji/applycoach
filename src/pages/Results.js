import React from 'react';
import { useSelector } from 'react-redux';
import MatchResults from '../components/MatchResults';
import Suggestions from '../components/Suggestions';

const styles = {
  results: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
};

function Results() {
  const matchResults = useSelector((state) => state.analysis.matchResults);
  const suggestions = useSelector((state) => state.analysis.suggestions);
  const loading = useSelector((state) => state.analysis.loading);

  if (loading === 'loading') {
    return <div style={styles.results}>Loading results...</div>;
  }

  return (
    <div style={styles.results}>
      <h1 style={styles.title}>Analysis Results</h1>
      {matchResults && <MatchResults results={matchResults} />}
      {suggestions && suggestions.length > 0 && <Suggestions suggestions={suggestions} />}
    </div>
  );
}

export default Results;
