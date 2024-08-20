// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './app/slices/workflowSlice';
import setupReducer from './app/slices/setupSlice';

const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    setup: setupReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
