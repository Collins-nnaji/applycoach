import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SurveyPage.css';

const SurveyPage = () => {
  return (
    <div className="survey-page">
      <Header />
      <div className="survey-content">
        <h2>Financial Survey</h2>
        <iframe
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID" // Replace with your Microsoft Forms embed link
          width="100%"
          height="500px"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Financial Survey"
        >
          Loading…
        </iframe>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyPage;
