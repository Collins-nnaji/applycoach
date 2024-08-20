import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppProvider } from './pages/AppContext'; // Import the AppProvider
import Home from './pages/Home';
import AnalyzeCV from './pages/AnalyzeCV';
import JobVacancies from './pages/JobVacancies';
import Error from './pages/Error';
import './App.css';

const App = () => (
  <AppProvider> {/* Wrap the entire app with AppProvider */}
    <Router>
      <div className="App">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze-cv" element={<AnalyzeCV />} />
          <Route path="/job-vacancies" element={<JobVacancies />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  </AppProvider>
);

export default App;