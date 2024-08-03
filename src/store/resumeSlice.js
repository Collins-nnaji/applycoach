// src/store/resumeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadFileToBlob, analyzeResume, getJobMatches } from '../azureDocumentIntelligence';

// Thunk for uploading and analyzing resume
export const uploadResumeAsync = createAsyncThunk('resume/uploadResume', async (file, { dispatch }) => {
  const url = await uploadFileToBlob(file, dispatch);
  const analysis = await analyzeResume(url);
  return { id: 1, file, url, analysis };
});

// Thunk for getting job matches
export const getJobMatchesAsync = createAsyncThunk('resume/getJobMatches', async (skills) => {
  const jobMatches = await getJobMatches(skills);
  return jobMatches;
});

const resumeSlice = createSlice({
  name: 'resume',
  initialState: { loading: false, resume: null, analysis: null, uploadProgress: 0, jobMatches: [], error: null },
  reducers: {
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResumeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadResumeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.resume = action.payload;
        state.analysis = action.payload.analysis;
      })
      .addCase(uploadResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getJobMatchesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobMatchesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.jobMatches = action.payload;
      })
      .addCase(getJobMatchesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUploadProgress } = resumeSlice.actions;

export default resumeSlice.reducer;
