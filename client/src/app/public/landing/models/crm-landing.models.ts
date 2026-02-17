export type TagSeverity = 'success' | 'info' | 'warn' | 'danger';

export interface CrmLandingVm {
  dashboard: {
    newLeads: number;
    newLeadsProgress: number;
    pipelineValue: number;
    pipelineProgress: number;
    winRate: number;
  };
  funnel: {
    leads: number;
    qualified: number;
    proposal: number;
    won: number;
  };
  tasks: Array<{
    title: string;
    time: string;
    icon: string;
    badge: string;
    severity: TagSeverity;
  }>;
  lead: {
    name: string;
    role: string;
    email: string;
    phone: string;
    stage: string;
    value: number;
    avatarUrl: string;
  };
}

export interface BookDemoRequest {
  fullName: string;
  workEmail: string;
  company: string;
  roleTitle: string;
  phone: string;
  teamSize: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  useCase: string;
  landingPageUrl: string | null;
}
