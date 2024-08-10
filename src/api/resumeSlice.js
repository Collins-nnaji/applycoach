import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadResumeToBlob, analyzeResume } from './azureService';

export const uploadResumeAsync = createAsyncThunk(
  'resume/uploadResume',
  async (file, { rejectWithValue }) => {
    try {
      const blobUrl = await uploadResumeToBlob(file);
      const analysis = await analyzeResume(blobUrl);
      return { analysis };
    } catch (error) {
      return rejectWithValue(error.message || 'Error during resume upload or analysis');
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    loading: false,
    error: null,
    analysis: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadResumeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResumeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload.analysis;
      })
      .addCase(uploadResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resumeSlice.reducer;
