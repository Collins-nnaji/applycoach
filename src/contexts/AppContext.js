import React, { createContext, useState, useContext, useCallback } from 'react';

const API_URL = 'https://credolaygptbackend.azurewebsites.net';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestedJobTitles, setSuggestedJobTitles] = useState([]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('An error occurred while fetching jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProfile = async (updatedProfile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('An error occurred while updating your profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user,
      setUser,
      jobs,
      fetchJobs,
      updateUserProfile,
      loading,
      error,
      suggestedJobTitles,
      setSuggestedJobTitles
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);