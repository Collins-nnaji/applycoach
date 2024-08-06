import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AnalyzeCV from './pages/AnalyzeCV';
import Analysis from './pages/Analysis';
import Error from './pages/Error';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze-cv" element={<AnalyzeCV />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  </Router>
);

export default App;
