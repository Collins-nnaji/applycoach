import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCVAsync } from '../store/analysisSlice';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Description, CheckCircle } from '@mui/icons-material';
import './CVUpload.css';

function CVUpload({ onComplete }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const cvUploadStatus = useSelector((state) => state.analysis.loading);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(uploadCVAsync(selectedFile)).then(() => {
        onComplete();
      });
    }
  };

  return (
    <Card className="cv-upload-card">
      <CardContent>
        <Typography variant="h5">Upload Your CV</Typography>
        <div className="file-input-container">
          <input
            accept=".pdf,.doc,.docx"
            className="file-input"
            id="cv-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="cv-upload">
            <IconButton color="primary" aria-label="upload CV" component="span">
              <Avatar variant="rounded" className="upload-avatar">
                {cvUploadStatus === 'loading' ? (
                  <CircularProgress color="inherit" size={24} />
                ) : file ? (
                  <CheckCircle fontSize="large" />
                ) : (
                  <Description fontSize="large" />
                )}
              </Avatar>
            </IconButton>
          </label>
        </div>
        {file && <span className="file-name">{file.name}</span>}
      </CardContent>
    </Card>
  );
}

export default CVUpload;
