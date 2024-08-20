import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkflowState, Condition, Actions } from '../types/workflowTypes'; // Adjust the path as necessary

const initialState: WorkflowState = {
  id: '',
  name: '',
  workflowName: '',
  workflowDesc: '',
  workflowType: '',
  workflowString: '',
  workflowData: [],
  pipelineId: '',
  pipelineName: '',
  orgId: '',
  createdBy: '',
  updatedBy: '',
  conditions: [],
  actions: []
};

// Create the slice
const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    // Reducer to update workflow details
    setWorkflowDetails(state, action: PayloadAction<Partial<WorkflowState>>) {
      return {
        ...state,
        ...action.payload
      };
    },
    // Reducer to set conditions
    setConditions(state, action: PayloadAction<Condition[]>) {
      state.conditions = action.payload;
    },
    // Reducer to set actions
    setActions(state, action: PayloadAction<Actions[]>) {
      state.actions = action.payload;
    },
    // Reducer to update a specific field in a condition
    updateConditionField(state, action: PayloadAction<{ index: number; field: Partial<Condition> }>) {
      const { index, field } = action.payload;
      state.conditions = state.conditions.map((condition, i) =>
        i === index ? { ...condition, ...field } : condition
      );
    },
    // Reducer to update a specific field in an action
    updateActionField(state, action: PayloadAction<{ index: number; field: Partial<Actions> }>) {
      const { index, field } = action.payload;
      state.actions = state.actions.map((action, i) =>
        i === index ? { ...action, ...field } : action
      );
    },
    // Reducer to add a new condition
    addCondition(state, action: PayloadAction<Condition>) {
      state.conditions.push(action.payload);
    },
    // Reducer to add a new action
    addAction(state, action: PayloadAction<Actions>) {
      state.actions.push(action.payload);
    },
    // Reducer to remove a condition by index
    removeCondition(state, action: PayloadAction<number>) {
      state.conditions = state.conditions.filter((_, index) => index !== action.payload);
    },
    // Reducer to clear all conditions
    clearConditions(state) {
      state.conditions = [];
    },
    // Reducer to clear all actions
    clearActions(state) {
      state.actions = [];
    },
    // Reducer to clear the entire workflow state
    clearWorkflowState(state) {
      return initialState;
    }
  }
});

// Export actions
export const { 
  setWorkflowDetails, 
  setConditions, 
  setActions, 
  updateConditionField, 
  updateActionField, 
  addCondition, 
  addAction, 
  removeCondition, 
  clearConditions, 
  clearActions, 
  clearWorkflowState 
} = workflowSlice.actions;

// Export reducer
export default workflowSlice.reducer;
