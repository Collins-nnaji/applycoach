import React, { useState } from 'react';
import './JobDescriptionInput.css';

function JobDescriptionInput() {
  const [jobDescription, setJobDescription] = useState('');
  const [inputMode, setInputMode] = useState('text');

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

  return (
    <div className="jobDescriptionInput">
      <h2 className="title">Job Description</h2>
      <div className="toggle">
        <button
          className={`toggleButton ${inputMode === 'text' ? 'active' : ''}`}
          onClick={() => setInputMode('text')}
        >
          Enter Text
        </button>
        <button
          className={`toggleButton ${inputMode === 'file' ? 'active' : ''}`}
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
          className="textarea"
        />
      ) : (
        <input
          type="file"
          onChange={handleFileChange}
          className="input"
        />
      )}
    </div>
  );
}

export default JobDescriptionInput;
