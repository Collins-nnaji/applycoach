import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GuidedQuestions from './GuidedQuestions';
import PDFGenerator from './PDFGenerator';
import { questions } from '../services/api';
import './HomePage.css';
import heroImage from '../assets/hero-image.jpg';
import benefitsImage from '../assets/benefits-image.png';

const HomePage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [guidedResponses, setGuidedResponses] = useState({});
  const [userName, setUserName] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFeatureSelection = (feature) => {
    setSelectedFeature((prevFeature) => (prevFeature === feature ? null : feature));
  };

  const handleGuidedResponseChange = (questionId, response) => {
    setGuidedResponses((prevResponses) => ({ ...prevResponses, [questionId]: response }));
  };

  const handleGuidedQuestionsSubmit = async () => {
    const formattedMessage = Object.entries(guidedResponses)
      .map(([questionId, response]) => {
        const questionText = questions[selectedFeature].find(q => q.id === parseInt(questionId))?.text || '';
        return `${questionText}\n${response}`;
      })
      .join('\n\n');

    const prompt = `Create a ${selectedFeature.replace(/([A-Z])/g, ' $1')} with these details:\n\n${formattedMessage}`;

    setLoading(true);
    setError(null);

    try {
      console.log('Sending request to backend with prompt:', prompt);
      const response = await fetch('https://credolay-backend.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Received response from backend:', data);
        setGptResponse(data.response);
      } else {
        const errorText = await response.text();
        console.error('Error in response from server:', response.statusText, errorText);
        setError(`Failed to generate the document. Server responded with status: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(`Failed to generate the document. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const formattedMessage = Object.entries(guidedResponses)
      .map(([questionId, response]) => {
        const questionText = questions[selectedFeature].find(q => q.id === parseInt(questionId))?.text || '';
        return `${questionText}\n${response}`;
      })
      .join('\n\n');

    const topic = selectedFeature.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase());
    const pdf = PDFGenerator(userName, formattedMessage, gptResponse, topic);
    const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
    const pdfURL = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = pdfURL;
    link.download = `${userName}_${topic}.pdf`;
    link.click();
  };

  return (
    <div className="homepage">
      <Header />
      <div className="welcome-section">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="welcome-text">
          <p className="sub-text">
            Your personal finance and credit management tool.<br />
            Build better credit habits, save effectively,<br />
            and explore loan and investment options.
          </p>
        </div>
      </div>
      <div className="benefits-section">
        <img src={benefitsImage} alt="Benefits" className="benefits-image" />
      </div>
      <div className="feature-buttons">
        {['financialGuidance', 'creditScoreTips', 'savingsPlans', 'loanOptions', 'investmentIdeas'].map((feature) => (
          <div
            key={feature}
            className={`feature-button-card ${selectedFeature === feature ? 'active' : ''}`}
            onClick={() => handleFeatureSelection(feature)}
          >
            <h3>{feature.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}</h3>
          </div>
        ))}
      </div>
      {selectedFeature && (
        <div className="questions-section">
          <h2>{selectedFeature.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}</h2>
          <div className="user-info">
            <label>
              Your Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>
          </div>
          <GuidedQuestions
            questions={questions[selectedFeature]}
            responses={guidedResponses}
            onResponseChange={handleGuidedResponseChange}
            onSubmit={handleGuidedQuestionsSubmit}
            buttonText={`Get ${selectedFeature.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}`}
          />
        </div>
      )}
      {loading && <p>Loading...</p>}
      {gptResponse && (
        <div className="gpt-response-section">
          <h2>Generated {selectedFeature && selectedFeature.replace(/([A-Z])/g, ' $1')}</h2>
          <p>{gptResponse}</p>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <Footer />
    </div>
  );
};

export default HomePage;
