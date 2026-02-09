export interface WorkspaceSettings {
  id: string;
  key: string;
  name: string;
  timeZone: string;
  currency: string;
  leadFirstTouchSlaHours?: number | null;
  defaultContractTermMonths?: number | null;
  defaultDeliveryOwnerRoleId?: string | null;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  approvalWorkflowPolicy?: ApprovalWorkflowPolicy | null;
  qualificationPolicy: QualificationPolicy;
}

export interface UpdateWorkspaceSettingsRequest {
  name: string;
  timeZone: string;
  currency: string;
  leadFirstTouchSlaHours?: number | null;
  defaultContractTermMonths?: number | null;
  defaultDeliveryOwnerRoleId?: string | null;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  approvalWorkflowPolicy?: ApprovalWorkflowPolicy | null;
  qualificationPolicy?: QualificationPolicy | null;
}

export interface ApprovalWorkflowPolicy {
  enabled: boolean;
  steps: ApprovalWorkflowStep[];
}

export interface ApprovalWorkflowStep {
  order: number;
  approverRole: string;
  amountThreshold?: number | null;
  purpose?: string | null;
}

export interface QualificationPolicy {
  defaultThreshold: number;
  managerApprovalBelow: number;
  blockBelow: number;
  allowOverrides: boolean;
  requireOverrideReason: boolean;
  thresholdRules: QualificationThresholdRule[];
  modifiers: QualificationModifierRule[];
  exposureWeights: QualificationExposureWeight[];
}

export interface QualificationThresholdRule {
  segment: string;
  dealType: string;
  stage: string;
  threshold: number;
}

export interface QualificationModifierRule {
  key: string;
  delta: number;
}

export interface QualificationExposureWeight {
  key: string;
  weight: number;
}
