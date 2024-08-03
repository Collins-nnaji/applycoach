// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});
