import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResumeToBlob, analyzeResume } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import './AnalyzeCV.css';
import cvPic from '../assets/CVpic.jpg';

function AnalyzeCV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const blobUrl = await uploadResumeToBlob(file);
      const analysisResponse = await analyzeResume(blobUrl);
      localStorage.setItem('analysisResults', JSON.stringify(analysisResponse));
      navigate('/analysis');
    } catch (error) {
      console.error(error);
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-cv">
      <Header />
      <main className="main-content">
        <section className="feature-section">
          <div className="feature-content">
            <img src={cvPic} alt="Resume Analysis" className="feature-image" />
            <div className="feature-text">
              <h2>Analyze Your CV</h2>
              <p>
                <strong>Upload your resume</strong> for a detailed analysis and get personalized recommendations to <strong>enhance your job applications</strong>.
              </p>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={loading}>Upload and Analyze</button>
              {loading && <LoadingSpinner />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default AnalyzeCV;
