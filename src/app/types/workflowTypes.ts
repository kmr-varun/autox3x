export interface Condition {
    columnId: string;
    columnName: string;
    columnType: string;
    fromValue: string;
    toValue: string;
    operator: string;
    operatorString: string;
    multi: boolean;
    conditionType: string;
  }
  
  export interface ActionData {
    name: string;
    type: string;
    value: any[];
  }
  
  export interface Actions {
    id: string;
    name: string;
    operation: string;
    setup: boolean;
    data: ActionData[];
  }
  
  export interface WorkflowState {
    id: string;
    name: string;
    workflowName: string;
    workflowDesc: string;
    workflowType: string;
    workflowString: string;
    workflowData: [];
    pipelineId: string;
    pipelineName: string;
    orgId: string;
    createdBy: string;
    updatedBy: string;
    conditions: Condition[];
    actions: Actions[];
  }
  