import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppProvider } from './contexts/AppContext';
import Home from './pages/Home';
import AnalyzeCV from './pages/AnalyzeCV';
import Resources from './pages/Resources'; // Changed from JobMatching
import Error from './pages/Error';
import { initGA, logPageView } from './GoogleAnalytics';
import './App.css';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA('G-7S4ETVNPPJ'); // Replace with your actual tracking ID if different
  }, []);

  return (
    <AppProvider>
      <Router>
        <RouteTracker />
        <div className="App">
          <Helmet>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />
          </Helmet>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze-cv" element={<AnalyzeCV />} />
            <Route path="/resources" element={<Resources />} /> {/* Changed from /job-matching to /resources */}
            <Route path="/error" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;