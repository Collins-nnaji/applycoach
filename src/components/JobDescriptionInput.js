import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const styles = {
  jobDescriptionInput: {
    background: 'rgba(255,255,255,0.05)',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: 'var(--primary-color)',
  },
  toggle: {
    display: 'flex',
    marginBottom: '15px',
  },
  toggleButton: {
    flex: 1,
    padding: '10px',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--text-color)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  toggleButtonActive: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--text-color)',
    resize: 'vertical',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--text-color)',
  },
  button: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: 'var(--hover-background)',
  },
};

function JobDescriptionInput() {
  const [jobDescription, setJobDescription] = useState('');
  const [inputMode, setInputMode] = useState('text');
  const analysisStatus = useSelector((state) => state.analysis.loading);

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
    <div style={styles.jobDescriptionInput}>
      <h2 style={styles.title}>Job Description</h2>
      <div style={styles.toggle}>
        <button
          style={{
            ...styles.toggleButton,
            ...(inputMode === 'text' ? styles.toggleButtonActive : {}),
          }}
          onClick={() => setInputMode('text')}
        >
          Enter Text
        </button>
        <button
          style={{
            ...styles.toggleButton,
            ...(inputMode === 'file' ? styles.toggleButtonActive : {}),
          }}
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
          style={styles.textarea}
        />
      ) : (
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />
      )}
    </div>
  );
}

export default JobDescriptionInput;