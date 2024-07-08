import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCVAsync } from '../store/analysisSlice';


function CVUpload({ onComplete }) {
  const [file, setFile] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const cvUploadStatus = useSelector((state) => state.analysis.loading);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadCVAsync(file)).then(() => {
        onComplete();
      });
    }
  };

  return (
    <div className={`interactive-card ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      <h2 className="card-title">Upload Your CV</h2>
      {isExpanded && (
        <div className="card-content">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
          <button
            onClick={handleUpload}
            className="upload-button"
            disabled={cvUploadStatus === 'loading'}
          >
            {cvUploadStatus === 'loading' ? 'Uploading...' : 'Upload CV'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CVUpload;