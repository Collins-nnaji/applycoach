import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './api/resumeSlice';

const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

export default store;
