export interface WorkspaceSettings {
  id: string;
  key: string;
  name: string;
  timeZone: string;
  currency: string;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
}

export interface UpdateWorkspaceSettingsRequest {
  name: string;
  timeZone: string;
  currency: string;
  approvalAmountThreshold?: number | null;
  approvalApproverRole?: string | null;
}
