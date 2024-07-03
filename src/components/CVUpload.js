import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCVAsync } from '../store/analysisSlice';

const styles = {
  cvUpload: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
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
  );
}

export default CVUpload;
