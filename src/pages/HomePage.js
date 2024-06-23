import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GuidedQuestions from './GuidedQuestions';
import { questions } from '../services/api';
import './HomePage.css';
import heroImage from '../assets/hero-image.jpg';
import benefitsImage from '../assets/benefits-image.png';

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [guidedResponses, setGuidedResponses] = useState({});

  const handleFeatureSelection = (feature) => {
    if (selectedFeature === feature) {
      setSelectedFeature(null);
    } else {
      setSelectedFeature(feature);
    }
  };

  const handleGuidedResponseChange = (questionId, response) => {
    setGuidedResponses({ ...guidedResponses, [questionId]: response });
  };

  const handleGuidedQuestionsSubmit = () => {
    // Logic for handling form submission
  };

  return (
    <div className="homepage">
      <Header />
      <div className="welcome-section">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="welcome-text">
          <h1 className="stylish-font">Discover Your Financial Path</h1>
          <p className="sub-text">
            Your personal finance and credit management tool. Build better credit habits, save effectively, and explore loan and investment options.
          </p>
        </div>
      </div>
      <div className="benefits-section">
        <img src={benefitsImage} alt="Benefits" className="benefits-image" />
      </div>
      <div className="feature-buttons">
        <div
          className={`feature-button-card ${selectedFeature === 'financialGuidance' ? 'active' : ''}`}
          onClick={() => handleFeatureSelection('financialGuidance')}
        >
          <h3>Financial Guidance</h3>
        </div>
        <div
          className={`feature-button-card ${selectedFeature === 'creditScoreTips' ? 'active' : ''}`}
          onClick={() => handleFeatureSelection('creditScoreTips')}
        >
          <h3>Credit Score Tips</h3>
        </div>
        <div
          className={`feature-button-card ${selectedFeature === 'savingsPlans' ? 'active' : ''}`}
          onClick={() => handleFeatureSelection('savingsPlans')}
        >
          <h3>Savings Plans</h3>
        </div>
        <div
          className={`feature-button-card ${selectedFeature === 'loanOptions' ? 'active' : ''}`}
          onClick={() => handleFeatureSelection('loanOptions')}
        >
          <h3>Loan Options</h3>
        </div>
        <div
          className={`feature-button-card ${selectedFeature === 'investmentIdeas' ? 'active' : ''}`}
          onClick={() => handleFeatureSelection('investmentIdeas')}
        >
          <h3>Investment Ideas</h3>
        </div>
      </div>
      {selectedFeature && (
        <div className="questions-section">
          <h2>{selectedFeature.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <GuidedQuestions
            questions={questions[selectedFeature]}
            responses={guidedResponses}
            onResponseChange={handleGuidedResponseChange}
            onSubmit={handleGuidedQuestionsSubmit}
            buttonText={`Get ${selectedFeature.replace(/([A-Z])/g, ' $1').trim()}`}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
