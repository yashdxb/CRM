export interface DealApprovalWorkflowStep {
  order: number;
  approverRole: string;
  amountThreshold?: number | null;
  purpose?: string | null;
  nodeId?: string | null;
}

export interface DealApprovalWorkflowNode {
  id: string;
  type: 'start' | 'approval' | 'end';
  x: number;
  y: number;
}

export interface DealApprovalWorkflowConnection {
  source: string;
  target: string;
}

export interface DealApprovalWorkflow {
  enabled: boolean;
  steps: DealApprovalWorkflowStep[];
  nodes: DealApprovalWorkflowNode[];
  connections: DealApprovalWorkflowConnection[];
}

export type UpdateDealApprovalWorkflow = DealApprovalWorkflow;
