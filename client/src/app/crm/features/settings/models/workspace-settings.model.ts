export interface WorkspaceSettings {
  id: string;
  key: string;
  name: string;
  timeZone: string;
  currency: string;
  industryPreset?: string | null;
  verticalPresetConfiguration: VerticalPresetConfiguration;
  leadFirstTouchSlaHours?: number | null;
  defaultContractTermMonths?: number | null;
  defaultDeliveryOwnerRoleId?: string | null;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  approvalWorkflowPolicy?: ApprovalWorkflowPolicy | null;
  qualificationPolicy: QualificationPolicy;
  leadDispositionPolicy: LeadDispositionPolicy;
  assistantActionScoringPolicy: AssistantActionScoringPolicy;
  decisionEscalationPolicy?: DecisionEscalationPolicy | null;
  supportingDocumentPolicy?: SupportingDocumentPolicy | null;
  dealHealthScoringPolicy?: DealHealthScoringPolicy | null;
  recordNumberingPolicies?: RecordNumberingPolicy[] | null;
  featureFlags?: Record<string, boolean> | null;
  reportDesignerRequiredPermission?: string | null;
}

export interface UpdateWorkspaceSettingsRequest {
  name: string;
  timeZone: string;
  currency: string;
  industryPreset?: string | null;
  leadFirstTouchSlaHours?: number | null;
  defaultContractTermMonths?: number | null;
  defaultDeliveryOwnerRoleId?: string | null;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
  approvalWorkflowPolicy?: ApprovalWorkflowPolicy | null;
  qualificationPolicy?: QualificationPolicy | null;
  leadDispositionPolicy?: LeadDispositionPolicy | null;
  assistantActionScoringPolicy?: AssistantActionScoringPolicy | null;
  decisionEscalationPolicy?: DecisionEscalationPolicy | null;
  supportingDocumentPolicy?: SupportingDocumentPolicy | null;
  dealHealthScoringPolicy?: DealHealthScoringPolicy | null;
  recordNumberingPolicies?: RecordNumberingPolicy[] | null;
  featureFlags?: Record<string, boolean> | null;
  reportDesignerRequiredPermission?: string | null;
}

export interface RecordNumberingPolicy {
  moduleKey: string;
  prefix: string;
  enabled: boolean;
  padding: number;
}

export interface ApplyVerticalPresetRequest {
  presetId: string;
  resetExisting?: boolean;
}

export interface VerticalPresetConfiguration {
  presetId: string;
  vocabulary: VerticalVocabulary;
  brokerageLeadProfileCatalog: BrokerageLeadProfileCatalog;
  dashboardPackDefaults: string[];
  reportLibraryHighlights: string[];
  workflowTemplateHighlights: string[];
}

export interface VerticalVocabulary {
  leadQualificationLabel: string;
  opportunitySingularLabel: string;
  opportunityPluralLabel: string;
  pipelineLabel: string;
  qualificationGuidance: string;
}

export interface BrokerageLeadProfileCatalog {
  buyerTypes: string[];
  motivationUrgencies: string[];
  financingReadinessOptions: string[];
  preApprovalStatuses: string[];
  preferredAreas: string[];
  propertyTypes: string[];
  budgetBands: string[];
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
  factors: QualificationFactorDefinition[];
  factorEvidenceRules: QualificationFactorEvidenceRule[];
  thresholdRules: QualificationThresholdRule[];
  modifiers: QualificationModifierRule[];
  exposureWeights: QualificationExposureWeight[];
  leadDataWeights: QualificationLeadDataWeight[];
  evidenceSources: string[];
  lifecycleScoreWeights?: QualificationLifecycleScoreWeights | null;
}

export interface QualificationLifecycleScoreWeights {
  qualificationWeight: number;
  leadDataQualityWeight: number;
  conversationWeight: number;
  historyWeight: number;
}

export interface QualificationFactorDefinition {
  key: string;
  displayLabel: string;
  isActive: boolean;
  isRequired: boolean;
  order: number;
  factorType: 'system' | 'custom';
  valueType: 'singleSelect' | 'text';
  includeInScore: boolean;
  options: string[];
}

export interface LeadCustomQualificationFactorValue {
  key: string;
  value?: string | null;
  evidence?: string | null;
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

export interface LeadDispositionPolicy {
  disqualificationReasons: string[];
  lossReasons: string[];
}

export interface DealHealthScoringPolicy {
  dimensions: DealHealthDimensionConfig[];
  bands: DealHealthBandThresholds;
  confidence: number;
}

export interface DealHealthDimensionConfig {
  key: string;
  label: string;
  maxScore: number;
  enabled: boolean;
  brackets?: DealHealthBracket[] | null;
}

export interface DealHealthBracket {
  threshold: number;
  score: number;
}

export interface DealHealthBandThresholds {
  excellent: number;
  good: number;
  fair: number;
  atRisk: number;
}
