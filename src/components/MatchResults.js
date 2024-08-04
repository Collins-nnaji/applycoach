import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CircularProgress } from '@mui/material';
import { getJobMatchesAsync } from '../store/resumeSlice';

function MatchResults() {
  const dispatch = useDispatch();
  const matchResults = useSelector((state) => state.resume.jobMatches);
  const loading = useSelector((state) => state.resume.loading);
  const analysis = useSelector((state) => state.resume.analysis);

  useEffect(() => {
    if (analysis && analysis.skills.length > 0) {
      dispatch(getJobMatchesAsync(analysis.skills));
    }
  }, [analysis, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!matchResults || matchResults.length === 0) {
    return <Typography>No match results found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Match Results</Typography>
      {matchResults.map((job, index) => (
        <div key={index}>
          <Typography variant="body1">{job.title}</Typography>
          <Typography variant="body2">{job.company}</Typography>
          <Typography variant="body2">{job.location}</Typography>
        </div>
      ))}
    </div>
  );
}

export default MatchResults;
