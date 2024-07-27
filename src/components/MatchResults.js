import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMatchResultsAsync } from '../store/analysisSlice';
import './MatchResults.css'; // Import the new CSS file

function MatchResults() {
  const matchResults = useSelector((state) => state.analysis.matchResults);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Assuming you have a way to get cvId and jobDescriptionId
    const cvId = "some-cv-id";
    const jobDescriptionId = "some-job-description-id";
    dispatch(getMatchResultsAsync({ cvId, jobDescriptionId }));
  }, [dispatch]);

  if (!matchResults) {
    return null;
  }

  return (
    <div className="match-results">
      <h2>Match Results</h2>
      <p className="match-percentage">Match Percentage: {matchResults.percentage}%</p>
      <ul className="match-details">
        {matchResults.details.map((detail, index) => (
          <li key={index} className="match-item">{detail}</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchResults;
