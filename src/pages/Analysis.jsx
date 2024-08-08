import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Analysis.css';

function Analysis() {
  const { analysis } = useSelector((state) => state.resume);

  return (
    <div className="analysis">
      <Header />
      <main className="main-content">
        <section className="analysis-results">
          <h2>CV Analysis Results</h2>
          {analysis ? (
            <div>
              <h3>Extracted Information</h3>
              <div className="info-items">
                {Object.entries(analysis.extractedData).map(([key, value]) => (
                  <div key={key} className="info-item">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
              <h3>Recommendations</h3>
              <ul className="recommendations-list">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No analysis results available.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Analysis;
