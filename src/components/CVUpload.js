import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCVAsync } from '../store/analysisSlice';

const styles = {
  cvUpload: {
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
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px 0 0 4px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'var(--text-color)',
  },
  button: {
    backgroundColor: 'var(--button-background)',
    color: 'var(--button-text)',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: 'var(--hover-background)',
  },
};

function CVUpload() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const cvUploadStatus = useSelector((state) => state.analysis.loading);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadCVAsync(file));
    }
  };

  return (
    <div style={styles.cvUpload}>
      <h2 style={styles.title}>Upload Your CV</h2>
      <div style={styles.inputWrapper}>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button
          onClick={handleUpload}
          style={styles.button}
          disabled={cvUploadStatus === 'loading'}
          onMouseOver={(e) => e.target.style = { ...styles.button, ...styles.buttonHover }}
          onMouseOut={(e) => e.target.style = styles.button}
        >
          {cvUploadStatus === 'loading' ? 'Uploading...' : 'Upload CV'}
        </button>
      </div>
    </div>
  );
}

export default CVUpload;