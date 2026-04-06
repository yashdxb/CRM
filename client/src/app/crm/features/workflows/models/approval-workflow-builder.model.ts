export type WorkflowStatus = 'Draft' | 'Active';
export type ConditionCombinator = 'AND' | 'OR';
export type StepKind = 'step' | 'parallel-group';
export type StepType = 'Sequential' | 'Final';
export type ParallelCompletionMode = 'All must approve' | 'Any one can approve';
export type CompletionRule = 'Required' | 'Optional';
export type ValidationSeverity = 'success' | 'warn' | 'error';

export interface ApprovalWorkflowDefinition {
  id: string;
  name: string;
  processName: string;
  requesterLabel: string;
  module: string;
  triggerType: string;
  version: string;
  isActive: boolean;
  status: WorkflowStatus;
  description: string;
  conditionGroups: ConditionGroup[];
  steps: WorkflowFlowItem[];
  outcomes: WorkflowOutcome[];
  testScenario: WorkflowTestScenario;
}

export interface ConditionGroup {
  id: string;
  combinator: ConditionCombinator;
  label: string;
  rules: ConditionRule[];
}

export interface ConditionRule {
  id: string;
  field: string;
  operator: string;
  value: string | number | null;
  combinator: ConditionCombinator;
}

export interface WorkflowStep {
  id: string;
  kind: 'step';
  title: string;
  stepType: StepType;
  approverType: string;
  approverSelector: string;
  slaHours: number;
  escalationRule: string;
  completionRule: CompletionRule;
  advanced: WorkflowStepAdvancedSettings;
}

export interface ParallelApprovalGroup {
  id: string;
  kind: 'parallel-group';
  title: string;
  completionMode: ParallelCompletionMode;
  requiredApprovals: number;
  approvers: WorkflowStep[];
}

export type WorkflowFlowItem = WorkflowStep | ParallelApprovalGroup;

export interface WorkflowStepAdvancedSettings {
  reminderHours: number | null;
  escalationContact: string;
  requireDecisionComment: boolean;
  allowDelegateApproval: boolean;
  notes: string;
}

export interface WorkflowOutcome {
  event: 'approve' | 'reject' | 'timeout';
  action: string;
  config: string;
}

export interface ValidationItem {
  severity: ValidationSeverity;
  title: string;
  detail: string;
}

export interface WorkflowSummary {
  module: string;
  trigger: string;
  totalSteps: number;
  parallelGroups: number;
  estimatedApprovalPath: string;
  slaSummary: string;
}

export interface WorkflowTestScenario {
  discountPercent: number;
  dealValue: number;
  region: string;
  dealType: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'approval' | 'follow-up' | 'review' | 'escalation';
  module: string;
  previewSteps: string[];
}

export interface SimulationResult {
  triggered: boolean;
  badge: string;
  detail: string;
  traversedNodes: SimulationNode[];
  estimatedDuration: string;
  finalOutcome: string;
}

export interface SimulationNode {
  id: string;
  title: string;
  kind: StepKind | 'condition' | 'outcome';
  status: 'passed' | 'skipped' | 'pending';
  detail: string;
}
