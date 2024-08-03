// src/components/JobSearch.js
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import './JobSearch.css';

function JobSearch({ onSearch }) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch({ keywords, location });
  };

  return (
    <Card className="job-search-card">
      <CardContent>
        <Typography variant="h5">Search for Jobs</Typography>
        <div className="search-fields">
          <TextField
            label="Keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            variant="outlined"
            fullWidth
            className="search-field"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined"
            fullWidth
            className="search-field"
          />
        </div>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobSearch;
