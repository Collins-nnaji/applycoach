import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiBaseUrl = 'https://credolayfunctionapp.azurewebsites.net/api'; // Base URL for the backend

export const uploadCVAsync = createAsyncThunk(
  'analysis/uploadCV',
  async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${apiBaseUrl}/UploadCV`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-file-name': file.name
      }
    });

    return response.data;
  }
);

export const analyzeJobDescriptionAsync = createAsyncThunk(
  'analysis/analyzeJobDescription',
  async (jobDescription) => {
    const response = await axios.post(`${apiBaseUrl}/AnalyzeJobDescription`, { description: jobDescription });
    return response.data;
  }
);

export const getMatchResultsAsync = createAsyncThunk(
  'analysis/getMatchResults',
  async ({ cvId, jobDescriptionId }) => {
    const response = await axios.post(`${apiBaseUrl}/GetMatchResults`, { cvId, jobDescriptionId });
    return response.data;
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState: {
    cv: null,
    jobDescription: null,
    matchResults: null,
    suggestions: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadCVAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(uploadCVAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.cv = action.payload;
      })
      .addCase(uploadCVAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(analyzeJobDescriptionAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(analyzeJobDescriptionAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.jobDescription = action.payload;
      })
      .addCase(analyzeJobDescriptionAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(getMatchResultsAsync.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getMatchResultsAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.matchResults = action.payload.matchResults;
        state.suggestions = action.payload.suggestions;
      })
      .addCase(getMatchResultsAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default analysisSlice.reducer;
