import React, { useState } from 'react';


function JobDescriptionInput({ onComplete }) {
  const [jobDescription, setJobDescription] = useState('');
  const [inputMode, setInputMode] = useState('text');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (jobDescription.trim()) {
      onComplete();
    }
  };

  return (
    <div className={`interactive-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      <h2 className="card-title">Job Description</h2>
      {isExpanded && (
        <div className="card-content">
          <div className="toggle-container">
            <button
              className={`toggle-button ${inputMode === 'text' ? 'active' : ''}`}
              onClick={() => setInputMode('text')}
            >
              Enter Text
            </button>
            <button
              className={`toggle-button ${inputMode === 'file' ? 'active' : ''}`}
              onClick={() => setInputMode('file')}
            >
              Upload File
            </button>
          </div>
          {inputMode === 'text' ? (
            <textarea
              value={jobDescription}
              onChange={handleChange}
              placeholder="Enter job description"
              className="job-description-input"
            />
          ) : (
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          )}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default JobDescriptionInput;