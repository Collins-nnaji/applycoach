import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './pages/Home';
import Resources from './pages/Resources';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
