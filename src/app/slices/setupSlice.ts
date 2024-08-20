// src/app/slices/setupSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SetupState {
  setupTrigger: boolean;
  setupPipeline: boolean; 
  setupCondition: boolean;
  setupAction: boolean;
  setupPreview: boolean; 
}

const initialState: SetupState = {
  setupTrigger: false,
  setupPipeline: false,
  setupCondition: false,
  setupAction: false,
  setupPreview: false, // Initialize new boolean value
};

// Create the slice
const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    // Reducer to set up trigger
    setSetupTrigger(state, action: PayloadAction<boolean>) {
      state.setupTrigger = action.payload;
    },
    setSetupPipeline(state, action: PayloadAction<boolean>) {
      state.setupPipeline = action.payload;
    },
    // Reducer to set up condition
    setSetupCondition(state, action: PayloadAction<boolean>) {
      state.setupCondition = action.payload;
    },
    // Reducer to set up action
    setSetupAction(state, action: PayloadAction<boolean>) {
      state.setupAction = action.payload;
    },
    // Reducer to set up preview
    setSetupPreview(state, action: PayloadAction<boolean>) {
      state.setupPreview = action.payload;
    },
    clearSetupState(state) {
      return initialState;
    }
  },
});

// Export actions
export const { setSetupTrigger,setSetupPipeline, setSetupCondition, setSetupAction, setSetupPreview, clearSetupState } = setupSlice.actions;

// Export reducer
export default setupSlice.reducer;
