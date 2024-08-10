import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResumeAsync } from '../api/resumeSlice';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import './AnalyzeCV.css';
import cvPic from '../assets/CVpic.jpg';

function AnalyzeCV() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resume);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
    dispatch(uploadResumeAsync(file))
      .unwrap()
      .then(() => {
        navigate('/analysis');
      })
      .catch((err) => {
        console.error('Upload and analysis failed:', err);
      });
  };

  return (
    <div className="analyze-cv-wrapper">
      <Header />
      <div className="analyze-cv">
        <main className="main-content">
          <section className="feature-section">
            <div className="feature-content">
              <img src={cvPic} alt="Resume Analysis" className="feature-image" />
              <div className="feature-text">
                <h2>Analyze Your CV</h2>
                <p>
                  <strong>Upload your resume</strong> for a detailed analysis including job fit assessment and skill gap identification. Get personalized recommendations to <strong>enhance your job applications</strong>.
                </p>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading}>
                  Upload and Analyze
                </button>
                {loading && <LoadingSpinner />}
                {error && <p className="error">An error occurred: {error}</p>}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AnalyzeCV;
