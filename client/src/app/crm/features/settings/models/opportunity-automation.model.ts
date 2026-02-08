export interface OpportunityStageAutomationRule {
  id: string;
  name: string;
  stageName: string;
  taskSubject: string;
  taskDescription?: string | null;
  dueInDays: number;
  priority?: string | null;
  isActive: boolean;
  updatedAtUtc?: string | null;
}

export interface OpportunityStageAutomationRuleRequest {
  name: string;
  stageName: string;
  taskSubject: string;
  taskDescription?: string | null;
  dueInDays: number;
  priority?: string | null;
  isActive: boolean;
}
