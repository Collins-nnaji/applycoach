import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const styles = {
  jobDescriptionInput: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    height: '300px', // Increase height
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
  },
  input: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '8px 16px',
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
  const [file, setFile] = useState(null);
  const analysisStatus = useSelector((state) => state.analysis.loading);

  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
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
      <textarea
        value={jobDescription}
        onChange={handleChange}
        placeholder="Enter job description"
        style={styles.textarea}
      />
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <button
        onClick={handleUpload}
        style={styles.button}
        disabled={analysisStatus === 'loading'}
        onMouseOver={(e) => e.target.style = { ...styles.button, ...styles.buttonHover }}
        onMouseOut={(e) => e.target.style = styles.button}
      >
        {analysisStatus === 'loading' ? 'Uploading...' : 'Upload Job Description'}
      </button>
    </div>
  );
}

export default JobDescriptionInput;
