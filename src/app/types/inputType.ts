export interface InputData {
  workflow: Workflow;
  filters: Filters;
}

export interface Workflow {
  triggers: Triggers;
  actions: Actions;
}

export interface Triggers {
  trigger: Trigger[];
  integration: Integration[];
}

export interface Trigger {
  id: string;
  name: string;
  type: string;
  parameter: string;
}

export interface Integration {
  id: string;
  name: string;
  operation: string;
  parameter: string;
}

export interface Actions {
  action: Action[];
  integration: Integration2[];
}

export interface Action {
  id: string;
  name: string;
  operation: string;
  parameter: string;
  setup: boolean;
  data: Daum[];
}

export interface Daum {
  name: string;
  type: string;
  value: string[];
}

export interface Integration2 {
  id: string;
  name: string;
  operation: string;
  parameter: string;
  setup: boolean;
}

export interface Filters {
  filter: Filter[];
}

export interface Filter {
  type: string;
  conditions: Condition[];
}

export interface Condition {
  operator: string;
  label: string;
  multi: boolean;
}


export type Pipelines = Pipeline[]

export interface Pipeline {
  id: string
  name: string
  entity: Entity[]
}

export interface Entity {
  id: string
  name: string
  type: string
  uniqueValues: any[]
}

