import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadCV, analyzeJobDescription, getMatchResults } from '../services/api';

export const uploadCVAsync = createAsyncThunk(
  'analysis/uploadCV',
  async (file) => {
    const response = await uploadCV(file);
    return response;
  }
);

export const analyzeJobDescriptionAsync = createAsyncThunk(
  'analysis/analyzeJobDescription',
  async (jobDescription) => {
    const response = await analyzeJobDescription(jobDescription);
    return response;
  }
);

export const getMatchResultsAsync = createAsyncThunk(
  'analysis/getMatchResults',
  async ({ cvId, jobDescriptionId }) => {
    const response = await getMatchResults(cvId, jobDescriptionId);
    return response;
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