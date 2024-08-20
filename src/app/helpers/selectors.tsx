import { RootState } from "@/store";

export const selectWorkflow = (state: RootState) => state.workflow;
export const selectConditions = (state: RootState) => state.workflow.conditions;
export const selectActions = (state: RootState) => state.workflow.actions;
