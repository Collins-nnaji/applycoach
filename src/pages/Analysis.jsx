import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Analysis.css';

const Analysis = () => {
  const analysisResults = JSON.parse(localStorage.getItem('analysisResults'));

  return (
    <div className="analysis">
      <Header />
      <div className="container">
        <main className="main-content">
          <h1>Analysis Results</h1>
          <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Analysis;
