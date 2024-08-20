import React, { createContext, useState, useContext } from 'react';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [suggestedJobTitles, setSuggestedJobTitles] = useState([]);
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobVacancies = async () => {
    if (suggestedJobTitles.length === 0) {
      setError('No suggested job titles found. Please analyze your CV first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/job-vacancies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({ jobTitles: suggestedJobTitles }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobVacancies(data.jobVacancies);
    } catch (err) {
      console.error('Error fetching job vacancies:', err);
      setError('An error occurred while fetching job vacancies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ 
      suggestedJobTitles, 
      setSuggestedJobTitles,
      jobVacancies,
      fetchJobVacancies,
      loading,
      error
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);