export interface HelpDeskCase {
  id: string;
  caseNumber: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  severity: string;
  category: string;
  subcategory?: string | null;
  source: string;
  accountId?: string | null;
  accountName?: string | null;
  contactId?: string | null;
  contactName?: string | null;
  queueId?: string | null;
  queueName?: string | null;
  ownerUserId?: string | null;
  ownerUserName?: string | null;
  firstResponseDueUtc: string;
  resolutionDueUtc: string;
  firstRespondedUtc?: string | null;
  resolvedUtc?: string | null;
  closedUtc?: string | null;
  closureReason?: string | null;
  csatScore?: number | null;
  csatFeedback?: string | null;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
}

export interface HelpDeskCaseComment {
  id: string;
  caseId: string;
  authorUserId?: string | null;
  authorUserName: string;
  body: string;
  isInternal: boolean;
  createdAtUtc: string;
  attachments: HelpDeskCaseCommentAttachment[];
}

export interface HelpDeskCaseCommentAttachment {
  attachmentId: string;
  fileName: string;
  contentType: string;
  size: number;
  downloadUrl: string;
}

export interface HelpDeskCaseEscalation {
  id: string;
  caseId: string;
  type: string;
  occurredUtc: string;
  actorUserId?: string | null;
  actorUserName?: string | null;
  notes?: string | null;
}

export interface HelpDeskCaseDetailResponse {
  case: HelpDeskCase;
  comments: HelpDeskCaseComment[];
  escalations: HelpDeskCaseEscalation[];
}

export interface HelpDeskCaseSearchResponse {
  items: HelpDeskCase[];
  total: number;
}

export interface HelpDeskQueue {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  activeMemberCount: number;
  members: HelpDeskQueueMember[];
}

export interface HelpDeskQueueMember {
  userId: string;
  userName: string;
}

export interface HelpDeskUserLookup {
  id: string;
  fullName: string;
  email: string;
}

export interface HelpDeskSlaPolicy {
  id: string;
  name: string;
  priority: string;
  severity: string;
  firstResponseTargetMinutes: number;
  resolutionTargetMinutes: number;
  escalationMinutes: number;
  businessHoursJson?: string | null;
  isActive: boolean;
}

export interface HelpDeskSummary {
  openCount: number;
  atRiskCount: number;
  breachedCount: number;
  resolvedTodayCount: number;
  averageCsatScore?: number | null;
  ratedCaseCount?: number;
  topClosureReasons?: { reason: string; count: number }[];
}

export interface SaveHelpDeskCaseRequest {
  subject: string;
  description: string;
  priority: string;
  severity: string;
  category: string;
  subcategory?: string | null;
  source: string;
  accountId?: string | null;
  contactId?: string | null;
  queueId?: string | null;
  ownerUserId?: string | null;
  closureReason?: string | null;
  csatScore?: number | null;
  csatFeedback?: string | null;
}
