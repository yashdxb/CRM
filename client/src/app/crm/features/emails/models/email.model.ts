export type EmailStatus = 'Pending' | 'Queued' | 'Sent' | 'Delivered' | 'Opened' | 'Clicked' | 'Bounced' | 'Failed';
export type EmailRelationType = 'Lead' | 'Contact' | 'Customer' | 'Opportunity' | 'Activity';

export interface EmailListItem {
  id: string;
  toEmail: string;
  toName?: string;
  subject: string;
  status: EmailStatus;
  createdAtUtc: string;
  sentAtUtc?: string;
  deliveredAtUtc?: string;
  openedAtUtc?: string;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  senderId: string;
  senderName?: string;
}

export interface EmailDetail {
  id: string;
  toEmail: string;
  toName?: string;
  ccEmails?: string;
  bccEmails?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  status: EmailStatus;
  messageId?: string;
  errorMessage?: string;
  retryCount: number;
  createdAtUtc: string;
  sentAtUtc?: string;
  deliveredAtUtc?: string;
  openedAtUtc?: string;
  clickedAtUtc?: string;
  bouncedAtUtc?: string;
  bounceReason?: string;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  templateId?: string;
  templateName?: string;
  senderId: string;
  senderName?: string;
}

export interface SendEmailRequest {
  toEmail: string;
  toName?: string;
  ccEmails?: string;
  bccEmails?: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  templateId?: string;
  templateVariables?: Record<string, string>;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  sendImmediately?: boolean;
  enableTracking?: boolean;
}

export interface EmailStats {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalFailed: number;
  pendingCount: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

// Email Template Models

export interface EmailTemplateListItem {
  id: string;
  name: string;
  category?: string;
  subject: string;
  isActive: boolean;
  isSystem: boolean;
  usageCount: number;
  lastUsedAtUtc?: string;
  createdAtUtc: string;
}

export interface EmailTemplateDetail {
  id: string;
  name: string;
  description?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  category?: string;
  isActive: boolean;
  isSystem: boolean;
  variables?: string;
  usageCount: number;
  lastUsedAtUtc?: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface UpsertTemplateRequest {
  name: string;
  description?: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  category?: string;
  isActive?: boolean;
  variables?: string;
}

// Search request/response interfaces

export interface EmailSearchRequest {
  search?: string;
  status?: EmailStatus;
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  senderId?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

export interface EmailSearchResponse {
  items: EmailListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TemplateSearchRequest {
  search?: string;
  category?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}

export interface TemplateSearchResponse {
  items: EmailTemplateListItem[];
  total: number;
  page: number;
  pageSize: number;
}
