export interface WorkspaceSettings {
  id: string;
  key: string;
  name: string;
  timeZone: string;
  currency: string;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  qualificationPolicy: QualificationPolicy;
}

export interface UpdateWorkspaceSettingsRequest {
  name: string;
  timeZone: string;
  currency: string;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  qualificationPolicy?: QualificationPolicy | null;
}

export interface QualificationPolicy {
  defaultThreshold: number;
  managerApprovalBelow: number;
  blockBelow: number;
  allowOverrides: boolean;
  requireOverrideReason: boolean;
  thresholdRules: QualificationThresholdRule[];
  modifiers: QualificationModifierRule[];
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
