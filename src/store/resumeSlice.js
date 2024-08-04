import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadResumeAsync = createAsyncThunk(
  'resume/uploadResume',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('https://credolayfunctionapp.azurewebsites.net/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          return Math.round((current / total) * 100);
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    file: null,
    loading: false,
    error: null,
    analysis: null,
    jobMatches: [],
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
        state.jobMatches = action.payload.jobMatches;
      })
      .addCase(uploadResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default resumeSlice.reducer;
