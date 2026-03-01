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
  assistantActionScoringPolicy: AssistantActionScoringPolicy;
  decisionEscalationPolicy?: DecisionEscalationPolicy | null;
  supportingDocumentPolicy?: SupportingDocumentPolicy | null;
  featureFlags?: Record<string, boolean> | null;
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
  assistantActionScoringPolicy?: AssistantActionScoringPolicy | null;
  decisionEscalationPolicy?: DecisionEscalationPolicy | null;
  supportingDocumentPolicy?: SupportingDocumentPolicy | null;
  featureFlags?: Record<string, boolean> | null;
}

export interface DecisionEscalationPolicy {
  enabled: boolean;
  sendEmailNotifications: boolean;
  notifyCurrentAssignee: boolean;
  notifyPendingStepRole: boolean;
  fallbackRoleName: string;
}

export interface SupportingDocumentPolicy {
  maxDocumentsPerRecord: number;
  maxFileSizeMb: number;
  allowedExtensions: string[];
}

export interface AssistantActionScoringPolicy {
  weights: AssistantActionScoringWeights;
  thresholds: AssistantActionScoringThresholds;
}

export interface AssistantActionScoringWeights {
  slaBreaches: number;
  staleOpportunities: number;
  pendingApprovals: number;
  lowConfidenceLeads: number;
  overdueActivities: number;
}

export interface AssistantActionScoringThresholds {
  mediumRiskFrom: number;
  highRiskFrom: number;
  soonUrgencyFrom: number;
  immediateUrgencyFrom: number;
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
  showCqvsInLeadList: boolean;
  requireEvidenceBeforeQualified: boolean;
  minimumEvidenceCoveragePercent: number;
  factorEvidenceRules: QualificationFactorEvidenceRule[];
  thresholdRules: QualificationThresholdRule[];
  modifiers: QualificationModifierRule[];
  exposureWeights: QualificationExposureWeight[];
  leadDataWeights: QualificationLeadDataWeight[];
  evidenceSources: string[];
}

export interface QualificationFactorEvidenceRule {
  factorKey: string;
  requireEvidence: boolean;
  allowedEvidenceSources: string[];
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

export interface QualificationLeadDataWeight {
  key: string;
  weight: number;
}
