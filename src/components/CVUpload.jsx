import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCVAsync } from '../store/analysisSlice';
import './CVUpload.css';

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
    <div className="cvUpload">
      <h2 className="title">Upload Your CV</h2>
      <div className="inputWrapper">
        <input
          type="file"
          onChange={handleFileChange}
          className="input"
        />
        <button
          onClick={handleUpload}
          className="button"
          disabled={cvUploadStatus === 'loading'}
        >
          {cvUploadStatus === 'loading' ? 'Uploading...' : 'Upload CV'}
        </button>
      </div>
    </div>
  );
}

export default CVUpload;
