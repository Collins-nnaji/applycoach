import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResumeAsync } from '../store/resumeSlice';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { Description, CheckCircle } from '@mui/icons-material';
import './CVUpload.css';

function CVUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resume);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(uploadResumeAsync(file)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled' && onUploadComplete) {
          onUploadComplete(response.payload);
        }
      });
    }
  };

  return (
    <Card className="cv-upload-card">
      <CardContent>
        <Typography variant="h5">Upload Your Resume</Typography>
        <div className="file-input-container">
          <input
            accept=".pdf,.doc,.docx"
            className="file-input"
            id="resume-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="resume-upload">
            <IconButton color="primary" aria-label="upload resume" component="span">
              <Avatar variant="rounded" className="upload-avatar">
                {loading ? (
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
        {loading && <LinearProgress />}
        {file && <span className="file-name">{file.name}</span>}
      </CardContent>
      <CardContent>
        <IconButton onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </IconButton>
      </CardContent>
      {error && (
        <CardContent>
          <Typography variant="h6" color="error">Error</Typography>
          <Typography>{error}</Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default CVUpload;
