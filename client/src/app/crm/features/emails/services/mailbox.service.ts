import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  MailboxFolder,
  MailboxFolderType,
  MailboxEmail,
  MailboxSearchRequest,
  MailboxSearchResponse,
  MailboxStats,
  EmailThread,
  MailboxEmailParticipant,
  MailboxAttachment
} from '../models/email.model';

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA - Will be replaced with API calls when backend is ready
// ═══════════════════════════════════════════════════════════════════════════

const MOCK_FOLDERS: MailboxFolder[] = [
  { id: 'inbox', name: 'Inbox', type: 'inbox', icon: 'pi-inbox', unreadCount: 12, totalCount: 156, isSystem: true },
  { id: 'starred', name: 'Starred', type: 'starred', icon: 'pi-star', unreadCount: 2, totalCount: 23, isSystem: true },
  { id: 'sent', name: 'Sent', type: 'sent', icon: 'pi-send', unreadCount: 0, totalCount: 89, isSystem: true },
  { id: 'drafts', name: 'Drafts', type: 'drafts', icon: 'pi-file-edit', unreadCount: 0, totalCount: 5, isSystem: true },
  { id: 'archive', name: 'Archive', type: 'archive', icon: 'pi-folder', unreadCount: 0, totalCount: 234, isSystem: true },
  { id: 'spam', name: 'Spam', type: 'spam', icon: 'pi-ban', unreadCount: 3, totalCount: 8, isSystem: true },
  { id: 'trash', name: 'Trash', type: 'trash', icon: 'pi-trash', unreadCount: 0, totalCount: 14, isSystem: true }
];

const MOCK_PARTICIPANTS: MailboxEmailParticipant[] = [
  { email: 'sarah.johnson@techcorp.com', name: 'Sarah Johnson' },
  { email: 'michael.chen@globalinc.com', name: 'Michael Chen' },
  { email: 'emily.rodriguez@startup.io', name: 'Emily Rodriguez' },
  { email: 'david.kim@enterprise.com', name: 'David Kim' },
  { email: 'jennifer.smith@consulting.co', name: 'Jennifer Smith' },
  { email: 'robert.williams@sales.net', name: 'Robert Williams' },
  { email: 'lisa.brown@marketing.io', name: 'Lisa Brown' },
  { email: 'james.taylor@finance.com', name: 'James Taylor' }
];

const MOCK_SUBJECTS = [
  'Q4 Sales Pipeline Review - Action Required',
  'RE: Partnership Proposal - Next Steps',
  'Meeting Recap: Product Roadmap Discussion',
  'Urgent: Contract Renewal Due Tomorrow',
  'FW: Customer Success Story - Great Results!',
  'Weekly Team Update - March 2025',
  'New Lead Assignment: TechStart Inc.',
  'Budget Approval Request',
  'RE: Demo Scheduled for Friday',
  'Follow-up: Pricing Discussion',
  'Introduction: New Account Executive',
  'Campaign Results: February Newsletter',
  'RE: Support Ticket #12345',
  'Quarterly Business Review Invite',
  'Product Update Announcement'
];

const MOCK_SNIPPETS = [
  'Hi team, I wanted to share the latest updates on our Q4 pipeline. As you can see from the attached report, we\'ve made significant progress...',
  'Thank you for your proposal. After discussing with the leadership team, we\'d like to move forward with the partnership. Here are the next steps...',
  'Following up on our meeting yesterday, I wanted to summarize the key decisions and action items we discussed regarding the product roadmap...',
  'This is a reminder that the contract with Enterprise Corp is set to expire tomorrow. Please review the renewal terms and confirm...',
  'Exciting news! I wanted to share this customer success story with the team. Our implementation at GlobalTech resulted in a 40% increase...',
  'Here\'s the weekly update on team activities. We closed 3 deals this week totaling $245K in ARR. Outstanding pipeline stands at...',
  'A new lead has been assigned to you. Company: TechStart Inc. Contact: John Doe, VP of Operations. They expressed interest in...',
  'Please review and approve the attached budget request for the upcoming marketing campaign. Total requested: $50,000...',
  'Confirming our demo is scheduled for this Friday at 2 PM EST. Please find the meeting link and agenda attached...',
  'Thank you for taking the time to discuss pricing options. Based on our conversation, I\'ve prepared a custom quote that addresses...'
];

function generateMockEmails(count: number, folder: MailboxFolderType): MailboxEmail[] {
  const emails: MailboxEmail[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const from = MOCK_PARTICIPANTS[Math.floor(Math.random() * MOCK_PARTICIPANTS.length)];
    const to = MOCK_PARTICIPANTS.filter(p => p.email !== from.email).slice(0, Math.floor(Math.random() * 2) + 1);
    const subject = MOCK_SUBJECTS[Math.floor(Math.random() * MOCK_SUBJECTS.length)];
    const snippet = MOCK_SNIPPETS[Math.floor(Math.random() * MOCK_SNIPPETS.length)];
    const isRead = folder === 'sent' || folder === 'drafts' || Math.random() > 0.3;
    const hasAttachments = Math.random() > 0.7;
    const isStarred = Math.random() > 0.85;
    
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const receivedAt = new Date(now);
    receivedAt.setDate(receivedAt.getDate() - daysAgo);
    receivedAt.setHours(receivedAt.getHours() - hoursAgo);
    
    const attachments: MailboxAttachment[] = hasAttachments
      ? [
          {
            id: `att-${i}-1`,
            filename: ['Report.pdf', 'Proposal.docx', 'Spreadsheet.xlsx', 'Presentation.pptx'][Math.floor(Math.random() * 4)],
            mimeType: 'application/pdf',
            size: Math.floor(Math.random() * 5000000) + 100000
          }
        ]
      : [];
    
    emails.push({
      id: `email-${folder}-${i}`,
      threadId: `thread-${Math.floor(i / 3)}`,
      folderId: folder,
      folderType: folder,
      from,
      to,
      subject,
      snippet,
      htmlBody: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear Team,</p>
        <p>${snippet}</p>
        <p>Please let me know if you have any questions or need additional information.</p>
        <p>Best regards,<br/>${from.name}</p>
      </div>`,
      textBody: snippet,
      isRead,
      isStarred,
      isDraft: folder === 'drafts',
      priority: Math.random() > 0.9 ? 'high' : 'normal',
      hasAttachments,
      attachments,
      receivedAtUtc: receivedAt.toISOString(),
      sentAtUtc: folder === 'sent' ? receivedAt.toISOString() : undefined
    });
  }
  
  // Sort by date, newest first
  return emails.sort((a, b) => 
    new Date(b.receivedAtUtc).getTime() - new Date(a.receivedAtUtc).getTime()
  );
}

// Pre-generate mock emails for each folder
const MOCK_EMAILS: Record<MailboxFolderType, MailboxEmail[]> = {
  inbox: generateMockEmails(25, 'inbox'),
  starred: generateMockEmails(8, 'starred').map(e => ({ ...e, isStarred: true })),
  sent: generateMockEmails(20, 'sent'),
  drafts: generateMockEmails(5, 'drafts'),
  archive: generateMockEmails(15, 'archive'),
  spam: generateMockEmails(4, 'spam'),
  trash: generateMockEmails(6, 'trash'),
  custom: []
};

// ═══════════════════════════════════════════════════════════════════════════
// MAILBOX SERVICE
// ═══════════════════════════════════════════════════════════════════════════

@Injectable({ providedIn: 'root' })
export class MailboxService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  
  // Use environment flag to determine mock vs real API
  private readonly useMockData = environment.useMockApi;
  
  // State
  readonly currentFolder = signal<MailboxFolderType>('inbox');
  readonly selectedEmailId = signal<string | null>(null);
  readonly folders = signal<MailboxFolder[]>(MOCK_FOLDERS);
  readonly emails = signal<MailboxEmail[]>([]);
  readonly loading = signal(false);
  
  // Computed
  readonly selectedEmail = computed(() => {
    const id = this.selectedEmailId();
    return this.emails().find(e => e.id === id) || null;
  });
  
  readonly unreadCount = computed(() => {
    return this.emails().filter(e => !e.isRead).length;
  });
  
  readonly stats = computed<MailboxStats>(() => ({
    inboxUnread: this.folders().find(f => f.type === 'inbox')?.unreadCount ?? 0,
    draftsCount: this.folders().find(f => f.type === 'drafts')?.totalCount ?? 0,
    sentToday: 5, // Mock
    starredCount: this.folders().find(f => f.type === 'starred')?.totalCount ?? 0,
    spamCount: this.folders().find(f => f.type === 'spam')?.totalCount ?? 0,
    trashCount: this.folders().find(f => f.type === 'trash')?.totalCount ?? 0
  }));

  // ─────────────────────────────────────────────────────────────────────────
  // FOLDER OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────
  
  getFolders(): Observable<MailboxFolder[]> {
    if (this.useMockData) {
      return of(MOCK_FOLDERS).pipe(delay(200));
    }
    return this.http.get<MailboxFolder[]>(`${this.baseUrl}/api/mailbox/folders`);
  }
  
  selectFolder(folderType: MailboxFolderType): void {
    this.currentFolder.set(folderType);
    this.selectedEmailId.set(null);
    this.loadEmails(folderType);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EMAIL OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────
  
  loadEmails(folderType?: MailboxFolderType): void {
    const folder = folderType || this.currentFolder();
    this.loading.set(true);
    
    this.searchEmails({ folderType: folder }).subscribe({
      next: (response) => {
        this.emails.set(response.items);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  
  searchEmails(request: MailboxSearchRequest): Observable<MailboxSearchResponse> {
    if (this.useMockData) {
      const folder = request.folderType || 'inbox';
      let items = [...(MOCK_EMAILS[folder] || [])];
      
      if (request.search) {
        const term = request.search.toLowerCase();
        items = items.filter(e => 
          e.subject.toLowerCase().includes(term) ||
          e.snippet.toLowerCase().includes(term) ||
          e.from.name?.toLowerCase().includes(term) ||
          e.from.email.toLowerCase().includes(term)
        );
      }
      
      if (request.isRead !== undefined) {
        items = items.filter(e => e.isRead === request.isRead);
      }
      
      if (request.isStarred !== undefined) {
        items = items.filter(e => e.isStarred === request.isStarred);
      }
      
      if (request.hasAttachments) {
        items = items.filter(e => e.hasAttachments);
      }
      
      const page = request.page || 1;
      const pageSize = request.pageSize || 25;
      const start = (page - 1) * pageSize;
      const paged = items.slice(start, start + pageSize);
      
      return of({
        items: paged,
        total: items.length,
        unreadTotal: items.filter(e => !e.isRead).length,
        page,
        pageSize
      }).pipe(delay(300));
    }
    
    let params = new HttpParams();
    if (request.folderType) params = params.set('folder', request.folderType);
    if (request.search) params = params.set('search', request.search);
    if (request.isRead !== undefined) params = params.set('isRead', String(request.isRead));
    if (request.isStarred !== undefined) params = params.set('isStarred', String(request.isStarred));
    if (request.page) params = params.set('page', String(request.page));
    if (request.pageSize) params = params.set('pageSize', String(request.pageSize));
    
    return this.http.get<MailboxSearchResponse>(`${this.baseUrl}/api/mailbox/messages`, { params });
  }
  
  getEmail(id: string): Observable<MailboxEmail | null> {
    if (this.useMockData) {
      for (const folder of Object.values(MOCK_EMAILS)) {
        const email = folder.find(e => e.id === id);
        if (email) return of(email).pipe(delay(100));
      }
      return of(null);
    }
    return this.http.get<MailboxEmail>(`${this.baseUrl}/api/mailbox/messages/${id}`);
  }
  
  selectEmail(id: string): void {
    this.selectedEmailId.set(id);
    // Auto-mark as read
    this.markAsRead(id, true);
  }
  
  markAsRead(id: string, isRead: boolean): void {
    if (this.useMockData) {
      this.emails.update(emails => 
        emails.map(e => e.id === id ? { ...e, isRead } : e)
      );
      // Update folder unread count
      this.updateFolderCounts();
      return;
    }
    
    // POST to mark as read, DELETE to mark as unread
    if (isRead) {
      this.http.post(`${this.baseUrl}/api/mailbox/messages/${id}/read`, {}).subscribe();
    } else {
      this.http.delete(`${this.baseUrl}/api/mailbox/messages/${id}/read`).subscribe();
    }
  }
  
  toggleStar(id: string): void {
    if (this.useMockData) {
      this.emails.update(emails => 
        emails.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e)
      );
      return;
    }
    
    const email = this.emails().find(e => e.id === id);
    if (email) {
      this.http.post(`${this.baseUrl}/api/mailbox/messages/${id}/star?starred=${!email.isStarred}`, {}).subscribe();
    }
  }
  
  moveToFolder(ids: string[], targetFolder: MailboxFolderType): void {
    if (this.useMockData) {
      this.emails.update(emails => 
        emails.filter(e => !ids.includes(e.id))
      );
      // In real impl, would add to target folder
      this.updateFolderCounts();
      return;
    }
    
    // Move each email individually
    ids.forEach(id => {
      this.http.post(`${this.baseUrl}/api/mailbox/messages/${id}/move?folder=${targetFolder}`, {}).subscribe();
    });
    this.loadEmails();
  }
  
  deleteEmail(id: string): void {
    this.moveToFolder([id], 'trash');
  }
  
  archiveEmail(id: string): void {
    this.moveToFolder([id], 'archive');
  }
  
  markAsSpam(id: string): void {
    this.moveToFolder([id], 'spam');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // THREAD OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────
  
  getThread(threadId: string): Observable<EmailThread | null> {
    if (this.useMockData) {
      // Group emails by thread ID
      const allEmails = Object.values(MOCK_EMAILS).flat();
      const threadEmails = allEmails
        .filter(e => e.threadId === threadId)
        .sort((a, b) => new Date(a.receivedAtUtc).getTime() - new Date(b.receivedAtUtc).getTime());
      
      if (threadEmails.length === 0) return of(null);
      
      const participants = new Map<string, MailboxEmailParticipant>();
      threadEmails.forEach(e => {
        participants.set(e.from.email, e.from);
        e.to.forEach(t => participants.set(t.email, t));
      });
      
      return of({
        id: threadId,
        subject: threadEmails[0].subject.replace(/^(RE:|FW:|FWD:)\s*/i, ''),
        participants: Array.from(participants.values()),
        emails: threadEmails,
        lastEmailAtUtc: threadEmails[threadEmails.length - 1].receivedAtUtc,
        unreadCount: threadEmails.filter(e => !e.isRead).length,
        isStarred: threadEmails.some(e => e.isStarred)
      }).pipe(delay(200));
    }
    
    return this.http.get<EmailThread>(`${this.baseUrl}/api/mailbox/threads/${threadId}`);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────────
  
  private updateFolderCounts(): void {
    const folder = this.currentFolder();
    const unreadCount = this.emails().filter(e => !e.isRead).length;
    const totalCount = this.emails().length;
    
    this.folders.update(folders => 
      folders.map(f => f.type === folder ? { ...f, unreadCount, totalCount } : f)
    );
  }
  
  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
  
  getInitials(name?: string, email?: string): string {
    if (name) {
      const parts = name.split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return '??';
  }
  
  formatEmailDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
}
