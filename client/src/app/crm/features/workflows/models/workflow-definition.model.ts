export interface WorkflowNodeConditionConfig {
  field: string | null;
  operator: string | null;
  value: string | null;
}

export interface WorkflowNodeDelayConfig {
  duration: number | null;
  unit: 'minutes' | 'hours' | 'days';
  businessHoursOnly: boolean;
}

export interface WorkflowNodeEmailConfig {
  template: string | null;
  recipientType: string | null;
  subject: string | null;
}

export interface WorkflowNodeNotificationConfig {
  channel: string | null;
  audience: string | null;
  message: string | null;
}

export interface WorkflowNodeCrmUpdateConfig {
  field: string | null;
  value: string | null;
}

export interface WorkflowNodeActivityConfig {
  activityType: string | null;
  subject: string | null;
  ownerStrategy: string | null;
  dueInHours: number | null;
}

export interface WorkflowNodeConfig {
  condition?: WorkflowNodeConditionConfig | null;
  delay?: WorkflowNodeDelayConfig | null;
  email?: WorkflowNodeEmailConfig | null;
  notification?: WorkflowNodeNotificationConfig | null;
  crmUpdate?: WorkflowNodeCrmUpdateConfig | null;
  activity?: WorkflowNodeActivityConfig | null;
}

export interface WorkflowNode {
  id: string;
  type: 'start' | 'approval' | 'condition' | 'email' | 'notification' | 'delay' | 'crm-update' | 'activity' | 'end';
  x: number;
  y: number;
  label?: string | null;
  config?: WorkflowNodeConfig | null;
}

export interface WorkflowConnection {
  source: string;
  target: string;
  label?: string | null;
  branchKey?: string | null;
}

export interface WorkflowStep {
  order: number;
  approverRoleId?: string | null;
  approverRole: string;
  minimumSecurityLevelId?: string | null;
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
  publishedDefinitionJson?: string | null;
  publishedAtUtc?: string | null;
  publishedBy?: string | null;
}

export interface WorkflowScopeOption {
  label: string;
  value: string;
}

export interface WorkflowScopeMetadataResponse {
  modules: WorkflowScopeOption[];
  pipelines: WorkflowScopeOption[];
  stages: WorkflowScopeOption[];
  triggers: WorkflowScopeOption[];
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
  currentOpportunityId?: string | null;
  currentOpportunityName?: string | null;
  currentPurpose?: string | null;
  currentStepOrder?: number | null;
  currentTotalSteps?: number | null;
  currentPendingApproverRole?: string | null;
  currentPendingApproverName?: string | null;
  currentDecisionRequestId?: string | null;
  currentDecisionStatus?: string | null;
}

export interface WorkflowExecutionHistoryItem {
  executionId: string;
  opportunityId: string;
  opportunityName: string;
  workflowName: string;
  workflowVersion: number;
  purpose: string;
  status: string;
  triggeredBy: string;
  currentStepOrder: number;
  totalSteps: number;
  pendingApproverRole?: string | null;
  pendingApproverName?: string | null;
  decisionRequestId?: string | null;
  decisionStatus?: string | null;
  startedAtUtc: string;
  completedAtUtc?: string | null;
  summary: string;
}
