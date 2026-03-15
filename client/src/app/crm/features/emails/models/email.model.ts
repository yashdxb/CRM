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

// ═══════════════════════════════════════════════════════════════════════════
// MAILBOX MODELS (Outlook-like Inbox Experience)
// ═══════════════════════════════════════════════════════════════════════════

export type MailboxFolderType = 
  | 'inbox' 
  | 'sent' 
  | 'drafts' 
  | 'archive' 
  | 'trash' 
  | 'spam' 
  | 'starred' 
  | 'custom';

export type MailboxEmailPriority = 'low' | 'normal' | 'high';

export interface MailboxFolder {
  id: string;
  name: string;
  type: MailboxFolderType;
  icon: string;
  unreadCount: number;
  totalCount: number;
  color?: string;
  isSystem: boolean;
}

export interface MailboxEmailParticipant {
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface MailboxAttachment {
  id: string;
  name: string;
  contentType: string;
  size: number;
}

export interface MailboxEmail {
  id: string;
  connectionId: string;
  externalId: string;
  conversationId?: string;
  folderId: string;
  folderType: MailboxFolderType;
  from: MailboxEmailParticipant;
  to: MailboxEmailParticipant[];
  cc?: MailboxEmailParticipant[];
  bcc?: MailboxEmailParticipant[];
  subject: string;
  snippet: string;
  htmlBody: string;
  textBody?: string;
  isRead: boolean;
  isStarred: boolean;
  isDraft: boolean;
  priority: MailboxEmailPriority;
  hasAttachments: boolean;
  attachments?: MailboxAttachment[];
  labels?: string[];
  receivedAtUtc: string;
  sentAtUtc?: string;
  // CRM Integration
  relatedEntityType?: EmailRelationType;
  relatedEntityId?: string;
  relatedEntityName?: string;
}

export interface EmailThread {
  id: string;
  subject: string;
  participants: MailboxEmailParticipant[];
  emails: MailboxEmail[];
  lastEmailAtUtc: string;
  unreadCount: number;
  isStarred: boolean;
}

export interface MailboxSearchRequest {
  folderId?: string;
  folderType?: MailboxFolderType;
  search?: string;
  isRead?: boolean;
  isStarred?: boolean;
  hasAttachments?: boolean;
  fromDate?: string;
  toDate?: string;
  page?: number;
  pageSize?: number;
}

export interface MailboxSearchResponse {
  items: MailboxEmail[];
  total: number;
  unreadTotal: number;
  page: number;
  pageSize: number;
}

export interface MailboxStats {
  inboxTotal: number;
  inboxUnread: number;
  sentTotal: number;
  draftsTotal: number;
  starredTotal: number;
  archiveTotal: number;
  trashTotal: number;
  spamTotal: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// CRM EMAIL LINK MODELS
// ═══════════════════════════════════════════════════════════════════════════

export type CrmLinkEntityType = 'Lead' | 'Contact' | 'Account' | 'Opportunity';

export interface CrmEmailLinkRequest {
  connectionId: string;
  externalMessageId: string;
  conversationId?: string;
  subject: string;
  fromEmail: string;
  fromName?: string;
  receivedAtUtc: string;
  relatedEntityType: CrmLinkEntityType;
  relatedEntityId: string;
  note?: string;
}

export interface CrmEmailLink {
  id: string;
  connectionId: string;
  externalMessageId: string;
  conversationId?: string;
  subject: string;
  fromEmail: string;
  fromName?: string;
  receivedAtUtc: string;
  provider: string;
  relatedEntityType: CrmLinkEntityType;
  relatedEntityId: string;
  linkedByUserId: string;
  note?: string;
  createdAtUtc: string;
}

// Compose Mode for Reply/Forward
export type ComposeMode = 'new' | 'reply' | 'replyAll' | 'forward';
