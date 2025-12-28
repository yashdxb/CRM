export type LeadAssignmentRuleType = 'Manual' | 'RoundRobin' | 'Territory';

export interface LeadAssignmentRule {
  id: string;
  name: string;
  type: LeadAssignmentRuleType;
  isActive: boolean;
  territory?: string | null;
  assignedUserId?: string | null;
  assignedUserName?: string | null;
  lastAssignedUserId?: string | null;
  lastAssignedUserName?: string | null;
}

export interface UpsertLeadAssignmentRuleRequest {
  name: string;
  type: LeadAssignmentRuleType;
  isActive: boolean;
  territory?: string | null;
  assignedUserId?: string | null;
}
