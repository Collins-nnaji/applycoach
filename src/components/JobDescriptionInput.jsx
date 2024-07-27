import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeJobDescriptionAsync } from '../store/analysisSlice';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Description, CheckCircle } from '@mui/icons-material';
import './JobDescriptionInput.css';

function JobDescriptionInput({ onComplete }) {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [inputMode, setInputMode] = useState('text');
  const dispatch = useDispatch();
  const jobUploadStatus = useSelector((state) => state.analysis.loading);

  const handleChange = (e) => {
    setJobDescription(e.target.value);
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setJobDescription('');
    }
  };

  const handleSubmit = () => {
    if (jobDescription.trim()) {
      dispatch(analyzeJobDescriptionAsync(jobDescription)).then(() => {
        onComplete();
      });
    } else if (file) {
      const formData = new FormData();
      formData.append('jobDescription', file);
      dispatch(analyzeJobDescriptionAsync(formData)).then(() => {
        onComplete();
      });
    }
  };

  return (
    <Card className="job-description-card">
      <CardContent>
        <Typography variant="h5">Job Description</Typography>
        <div className="toggle-container">
          <Button
            variant={inputMode === 'text' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setInputMode('text')}
            disabled={!!file}
          >
            Enter Text
          </Button>
          <Button
            variant={inputMode === 'file' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setInputMode('file')}
            disabled={!!jobDescription}
          >
            Upload File
          </Button>
        </div>
        {inputMode === 'text' ? (
          <TextField
            multiline
            rows={15}
            value={jobDescription}
            onChange={handleChange}
            placeholder="Enter job description"
            variant="outlined"
            fullWidth
            className="job-description-input"
            style={{ fontSize: '1.2rem' }}
            disabled={!!file}
          />
        ) : (
          <div className="file-input-container">
            <input
              accept=".txt,.pdf,.doc,.docx"
              className="file-input"
              id="job-description-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="job-description-upload">
              <IconButton color="primary" aria-label="upload job description" component="span">
                <Avatar variant="rounded" className="upload-avatar">
                  {jobUploadStatus === 'loading' ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : file ? (
                    <CheckCircle fontSize="large" />
                  ) : (
                    <Description fontSize="large" />
                  )}
                </Avatar>
              </IconButton>
            </label>
            {file && <span className="file-name">{file.name}</span>}
          </div>
        )}
        {jobUploadStatus === 'loading' && <CircularProgress className="upload-progress" />}
      </CardContent>
      <CardContent>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={jobUploadStatus === 'loading'}
        >
          {jobUploadStatus === 'loading' ? 'Submitting...' : 'Submit Job Description'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobDescriptionInput;
