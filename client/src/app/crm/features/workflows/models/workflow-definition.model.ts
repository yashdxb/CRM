/** @deprecated Use ConditionGroup/ConditionRule from approval-workflow-builder.model instead. */
export interface WorkflowNodeConditionConfig {
  field: string | null;
  operator: string | null;
  value: string | null;
}

/** @deprecated Legacy delay node config — not used in unified builder. */
export interface WorkflowNodeDelayConfig {
  duration: number | null;
  unit: 'minutes' | 'hours' | 'days';
  businessHoursOnly: boolean;
}

/** @deprecated Legacy email node config — not used in unified builder. */
export interface WorkflowNodeEmailConfig {
  template: string | null;
  recipientType: string | null;
  subject: string | null;
}

/** @deprecated Legacy notification node config — not used in unified builder. */
export interface WorkflowNodeNotificationConfig {
  channel: string | null;
  audience: string | null;
  message: string | null;
}

/** @deprecated Legacy CRM update node config — not used in unified builder. */
export interface WorkflowNodeCrmUpdateConfig {
  field: string | null;
  value: string | null;
}

/** @deprecated Legacy activity node config — not used in unified builder. */
export interface WorkflowNodeActivityConfig {
  activityType: string | null;
  subject: string | null;
  ownerStrategy: string | null;
  dueInHours: number | null;
}

/** @deprecated Use WorkflowStep from approval-workflow-builder.model instead. */
export interface WorkflowNodeConfig {
  condition?: WorkflowNodeConditionConfig | null;
  delay?: WorkflowNodeDelayConfig | null;
  email?: WorkflowNodeEmailConfig | null;
  notification?: WorkflowNodeNotificationConfig | null;
  crmUpdate?: WorkflowNodeCrmUpdateConfig | null;
  activity?: WorkflowNodeActivityConfig | null;
}

/** @deprecated Legacy canvas node — not used in unified builder. */
export interface WorkflowNode {
  id: string;
  type: 'start' | 'approval' | 'condition' | 'email' | 'notification' | 'delay' | 'crm-update' | 'activity' | 'end';
  x: number;
  y: number;
  label?: string | null;
  config?: WorkflowNodeConfig | null;
}

/** @deprecated Legacy canvas connection — not used in unified builder. */
export interface WorkflowConnection {
  source: string;
  target: string;
  label?: string | null;
  branchKey?: string | null;
}

/** @deprecated Use WorkflowStep from approval-workflow-builder.model instead. */
export interface WorkflowStep {
  order: number;
  approverRoleId?: string | null;
  approverRole: string;
  minimumSecurityLevelId?: string | null;
  amountThreshold?: number | null;
  purpose?: string | null;
  nodeId?: string | null;
}

/** @deprecated Use ApprovalWorkflowDefinition from approval-workflow-builder.model instead. */
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

/** @deprecated Use ApprovalWorkflowDefinition from approval-workflow-builder.model instead. */
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
