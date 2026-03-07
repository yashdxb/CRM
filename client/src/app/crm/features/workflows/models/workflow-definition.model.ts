export interface WorkflowNode {
  id: string;
  type: 'start' | 'approval' | 'condition' | 'email' | 'notification' | 'delay' | 'crm-update' | 'activity' | 'end';
  x: number;
  y: number;
  label?: string | null;
}

export interface WorkflowConnection {
  source: string;
  target: string;
}

export interface WorkflowStep {
  order: number;
  approverRole: string;
  amountThreshold?: number | null;
  purpose?: string | null;
  nodeId?: string | null;
}

export interface WorkflowScope {
  name: string;
  purpose: string;
  module: string;
  pipeline: string;
  stage: string;
  trigger: string;
  status: 'draft' | 'published';
  version: number;
}

export interface DealApprovalWorkflowDefinition {
  enabled: boolean;
  scope: WorkflowScope;
  steps: WorkflowStep[];
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

export interface WorkflowDefinitionResponse {
  key: string;
  name: string;
  isActive: boolean;
  definitionJson: string;
  updatedAtUtc?: string | null;
}

export interface WorkflowValidationResponse {
  isValid: boolean;
  errors: string[];
}

export interface WorkflowExecutionStatus {
  currentExecutionId?: string | null;
  pendingApprovals: number;
  runningExecutions: number;
  completedToday: number;
  lastUpdatedAtUtc?: string | null;
}

export interface WorkflowExecutionHistoryItem {
  executionId: string;
  status: string;
  triggeredBy: string;
  startedAtUtc: string;
  completedAtUtc?: string | null;
  summary: string;
}
