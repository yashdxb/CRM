import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, delay, map, forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA - Will be replaced with API calls when backend is ready
// ═══════════════════════════════════════════════════════════════════════════
const MOCK_FOLDERS = [
    { id: 'inbox', name: 'Inbox', type: 'inbox', icon: 'pi-inbox', unreadCount: 12, totalCount: 156, isSystem: true },
    { id: 'starred', name: 'Starred', type: 'starred', icon: 'pi-star', unreadCount: 2, totalCount: 23, isSystem: true },
    { id: 'sent', name: 'Sent', type: 'sent', icon: 'pi-send', unreadCount: 0, totalCount: 89, isSystem: true },
    { id: 'drafts', name: 'Drafts', type: 'drafts', icon: 'pi-file-edit', unreadCount: 0, totalCount: 5, isSystem: true },
    { id: 'archive', name: 'Archive', type: 'archive', icon: 'pi-folder', unreadCount: 0, totalCount: 234, isSystem: true },
    { id: 'spam', name: 'Spam', type: 'spam', icon: 'pi-ban', unreadCount: 3, totalCount: 8, isSystem: true },
    { id: 'trash', name: 'Trash', type: 'trash', icon: 'pi-trash', unreadCount: 0, totalCount: 14, isSystem: true }
];
const MOCK_PARTICIPANTS = [
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
function generateMockEmails(count, folder) {
    const emails = [];
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
        const attachments = hasAttachments
            ? [
                {
                    id: `att-${i}-1`,
                    name: ['Report.pdf', 'Proposal.docx', 'Spreadsheet.xlsx', 'Presentation.pptx'][Math.floor(Math.random() * 4)],
                    contentType: 'application/pdf',
                    size: Math.floor(Math.random() * 5000000) + 100000
                }
            ]
            : [];
        const connectionId = 'mock-conn-1';
        const externalId = `ext-${folder}-${i}`;
        const conversationId = `conv-${folder}-${Math.floor(i / 3)}`;
        emails.push({
            id: `${connectionId}/${externalId}`,
            connectionId,
            externalId,
            conversationId,
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
    return emails.sort((a, b) => new Date(b.receivedAtUtc).getTime() - new Date(a.receivedAtUtc).getTime());
}
// Pre-generate mock emails for each folder
const MOCK_EMAILS = {
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
export class MailboxService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    // Use environment flag to determine mock vs real API
    useMockData = environment.useMockApi;
    // State
    currentFolder = signal('inbox', ...(ngDevMode ? [{ debugName: "currentFolder" }] : []));
    selectedEmailId = signal(null, ...(ngDevMode ? [{ debugName: "selectedEmailId" }] : []));
    folders = signal(MOCK_FOLDERS, ...(ngDevMode ? [{ debugName: "folders" }] : []));
    emails = signal([], ...(ngDevMode ? [{ debugName: "emails" }] : []));
    selectedEmail = signal(null, ...(ngDevMode ? [{ debugName: "selectedEmail" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    unreadCount = computed(() => {
        return this.emails().filter(e => !e.isRead).length;
    }, ...(ngDevMode ? [{ debugName: "unreadCount" }] : []));
    stats = computed(() => ({
        inboxTotal: this.folders().find(f => f.type === 'inbox')?.totalCount ?? 0,
        inboxUnread: this.folders().find(f => f.type === 'inbox')?.unreadCount ?? 0,
        sentTotal: this.folders().find(f => f.type === 'sent')?.totalCount ?? 0,
        draftsTotal: this.folders().find(f => f.type === 'drafts')?.totalCount ?? 0,
        starredTotal: this.folders().find(f => f.type === 'starred')?.totalCount ?? 0,
        archiveTotal: this.folders().find(f => f.type === 'archive')?.totalCount ?? 0,
        trashTotal: this.folders().find(f => f.type === 'trash')?.totalCount ?? 0,
        spamTotal: this.folders().find(f => f.type === 'spam')?.totalCount ?? 0
    }), ...(ngDevMode ? [{ debugName: "stats" }] : []));
    // ─────────────────────────────────────────────────────────────────────────
    // FOLDER OPERATIONS
    // ─────────────────────────────────────────────────────────────────────────
    getFolders() {
        if (this.useMockData) {
            return of(MOCK_FOLDERS).pipe(delay(200));
        }
        return of(this.folders());
    }
    selectFolder(folderType) {
        this.currentFolder.set(folderType);
        this.selectedEmailId.set(null);
        this.selectedEmail.set(null);
        this.loadEmails(folderType);
    }
    // ─────────────────────────────────────────────────────────────────────────
    // EMAIL OPERATIONS
    // ─────────────────────────────────────────────────────────────────────────
    loadEmails(folderType) {
        const folder = folderType || this.currentFolder();
        this.loading.set(true);
        this.fetchEmails(folder);
    }
    refreshFromProvider(folderType) {
        const folder = folderType || this.currentFolder();
        this.loading.set(true);
        if (this.useMockData) {
            this.fetchEmails(folder);
            return;
        }
        this.http.post(`${this.baseUrl}/api/mailbox/sync`, {}).subscribe({
            next: () => {
                this.fetchEmails(folder);
                this.loadStats();
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }
    fetchEmails(folder) {
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
    /** Load proxy stats and update folder counts */
    loadStats() {
        if (this.useMockData)
            return;
        this.http.get(`${this.baseUrl}/api/mailbox/stats`).subscribe({
            next: (stats) => {
                this.folders.update(folders => folders.map(f => {
                    switch (f.type) {
                        case 'inbox': return { ...f, totalCount: stats.inboxTotal, unreadCount: stats.inboxUnread };
                        case 'sent': return { ...f, totalCount: stats.sentTotal };
                        case 'drafts': return { ...f, totalCount: stats.draftsTotal };
                        case 'starred': return { ...f, totalCount: stats.starredTotal };
                        case 'archive': return { ...f, totalCount: stats.archiveTotal };
                        case 'trash': return { ...f, totalCount: stats.trashTotal };
                        case 'spam': return { ...f, totalCount: stats.spamTotal };
                        default: return f;
                    }
                }));
            }
        });
    }
    searchEmails(request) {
        if (this.useMockData) {
            const folder = request.folderType || 'inbox';
            let items = [...(MOCK_EMAILS[folder] || [])];
            if (request.search) {
                const term = request.search.toLowerCase();
                items = items.filter(e => e.subject.toLowerCase().includes(term) ||
                    e.snippet.toLowerCase().includes(term) ||
                    e.from.name?.toLowerCase().includes(term) ||
                    e.from.email.toLowerCase().includes(term));
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
        if (request.folderType)
            params = params.set('folder', request.folderType);
        if (request.search)
            params = params.set('search', request.search);
        if (request.isRead !== undefined)
            params = params.set('isRead', String(request.isRead));
        if (request.isStarred !== undefined)
            params = params.set('isStarred', String(request.isStarred));
        if (request.page)
            params = params.set('page', String(request.page));
        if (request.pageSize)
            params = params.set('pageSize', String(request.pageSize));
        return this.http.get(`${this.baseUrl}/api/mailbox/messages`, { params }).pipe(map((response) => {
            const items = (response.items ?? []).map((item) => this.mapMailboxItemToMailboxEmail(item));
            return {
                items,
                total: response.total,
                unreadTotal: items.filter(e => !e.isRead).length,
                page: response.page,
                pageSize: response.pageSize
            };
        }));
    }
    getEmail(id) {
        if (this.useMockData) {
            for (const folder of Object.values(MOCK_EMAILS)) {
                const email = folder.find(e => e.id === id);
                if (email)
                    return of(email).pipe(delay(100));
            }
            return of(null);
        }
        // id is composite: "connectionId/externalId"
        return this.http.get(`${this.baseUrl}/api/mailbox/messages/${encodeURIComponent(id)}`).pipe(map((item) => this.mapMailboxDetailToMailboxEmail(item)));
    }
    selectEmail(id) {
        this.selectedEmailId.set(id);
        const summary = this.emails().find(e => e.id === id) ?? null;
        const selectedSummary = summary && !summary.isRead ? { ...summary, isRead: true } : summary;
        this.selectedEmail.set(selectedSummary);
        if (summary && !summary.isRead) {
            this.emails.update(emails => emails.map(e => e.id === id ? { ...e, isRead: true } : e));
            this.updateFolderCounts();
            this.markAsRead(id, true);
        }
        this.getEmail(id).subscribe({
            next: (email) => {
                if (this.selectedEmailId() === id && email) {
                    this.selectedEmail.set(summary && !summary.isRead ? { ...email, isRead: true } : email);
                }
            }
        });
    }
    markAsRead(id, isRead) {
        if (this.useMockData) {
            this.emails.update(emails => emails.map(e => e.id === id ? { ...e, isRead } : e));
            // Update folder unread count
            this.updateFolderCounts();
            return;
        }
        this.http.patch(`${this.baseUrl}/api/mailbox/messages/${encodeURIComponent(id)}`, { isRead }).subscribe({
            next: () => {
                this.emails.update(emails => emails.map(e => e.id === id ? { ...e, isRead } : e));
                this.selectedEmail.update(email => email?.id === id ? { ...email, isRead } : email);
                this.updateFolderCounts();
                this.loadStats();
            },
            error: () => {
                this.loadEmails();
                this.loadStats();
            }
        });
    }
    toggleStar(id) {
        if (this.useMockData) {
            this.emails.update(emails => emails.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e));
            return;
        }
        const email = this.emails().find(e => e.id === id);
        if (email) {
            this.http.patch(`${this.baseUrl}/api/mailbox/messages/${encodeURIComponent(id)}`, { isStarred: !email.isStarred }).subscribe(() => {
                this.emails.update(emails => emails.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e));
                this.selectedEmail.update(selected => selected?.id === id ? { ...selected, isStarred: !email.isStarred } : selected);
            });
        }
    }
    moveToFolder(ids, targetFolder) {
        if (this.useMockData) {
            this.emails.update(emails => emails.filter(e => !ids.includes(e.id)));
            this.updateFolderCounts();
            return;
        }
        forkJoin(ids.map((id) => this.http.patch(`${this.baseUrl}/api/mailbox/messages/${encodeURIComponent(id)}`, { moveToFolder: targetFolder }))).subscribe({
            next: () => {
                this.emails.update(emails => emails.filter(e => !ids.includes(e.id)));
                this.selectedEmail.update(email => email && ids.includes(email.id) ? null : email);
                this.updateFolderCounts();
                this.loadStats();
            },
            error: () => {
                this.loadEmails();
                this.loadStats();
            }
        });
    }
    deleteEmail(id) {
        this.moveToFolder([id], 'trash');
    }
    archiveEmail(id) {
        this.moveToFolder([id], 'archive');
    }
    markAsSpam(id) {
        this.moveToFolder([id], 'spam');
    }
    sendEmail(connectionId, payload) {
        if (this.useMockData) {
            return of({
                success: true,
                messageId: crypto.randomUUID()
            }).pipe(delay(200));
        }
        const request = {
            connectionId,
            to: payload.to,
            subject: payload.subject,
            htmlBody: payload.htmlBody,
            cc: payload.cc?.length ? payload.cc : null,
            bcc: payload.bcc?.length ? payload.bcc : null
        };
        return this.http.post(`${this.baseUrl}/api/mailbox/send`, request).pipe(map((response) => {
            this.loadStats();
            if (this.currentFolder() === 'sent') {
                this.loadEmails('sent');
            }
            return response;
        }));
    }
    // ─────────────────────────────────────────────────────────────────────────
    // THREAD OPERATIONS
    // ─────────────────────────────────────────────────────────────────────────
    getThread(conversationId) {
        if (this.useMockData) {
            const allEmails = Object.values(MOCK_EMAILS).flat();
            const threadEmails = allEmails
                .filter(e => e.conversationId === conversationId)
                .sort((a, b) => new Date(a.receivedAtUtc).getTime() - new Date(b.receivedAtUtc).getTime());
            if (threadEmails.length === 0)
                return of(null);
            const participants = new Map();
            threadEmails.forEach(e => {
                participants.set(e.from.email, e.from);
                e.to.forEach(t => participants.set(t.email, t));
            });
            return of({
                id: conversationId,
                subject: threadEmails[0].subject.replace(/^(RE:|FW:|FWD:)\s*/i, ''),
                participants: Array.from(participants.values()),
                emails: threadEmails,
                lastEmailAtUtc: threadEmails[threadEmails.length - 1].receivedAtUtc,
                unreadCount: threadEmails.filter(e => !e.isRead).length,
                isStarred: threadEmails.some(e => e.isStarred)
            }).pipe(delay(200));
        }
        // No dedicated thread endpoint — fetch all messages by conversationId
        return this.http.get(`${this.baseUrl}/api/mailbox/messages`, {
            params: { search: conversationId, pageSize: '50' }
        }).pipe(map(res => {
            const emails = res.items.map(m => this.mapMailboxItemToMailboxEmail(m))
                .filter(e => e.conversationId === conversationId)
                .sort((a, b) => new Date(a.receivedAtUtc).getTime() - new Date(b.receivedAtUtc).getTime());
            if (emails.length === 0)
                return null;
            const participants = new Map();
            emails.forEach(e => {
                participants.set(e.from.email, e.from);
                e.to.forEach(t => participants.set(t.email, t));
            });
            return {
                id: conversationId,
                subject: emails[0].subject.replace(/^(RE:|FW:|FWD:)\s*/i, ''),
                participants: Array.from(participants.values()),
                emails,
                lastEmailAtUtc: emails[emails.length - 1].receivedAtUtc,
                unreadCount: emails.filter(e => !e.isRead).length,
                isStarred: emails.some(e => e.isStarred)
            };
        }));
    }
    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────
    updateFolderCounts() {
        const folder = this.currentFolder();
        const unreadCount = this.emails().filter(e => !e.isRead).length;
        const totalCount = this.emails().length;
        this.folders.update(folders => folders.map(f => f.type === folder ? { ...f, unreadCount, totalCount } : f));
    }
    getAttachmentUrl(email, attachmentId) {
        return `${this.baseUrl}/api/mailbox/messages/${encodeURIComponent(email.id)}/attachments/${encodeURIComponent(attachmentId)}`;
    }
    formatFileSize(bytes) {
        if (bytes < 1024)
            return bytes + ' B';
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
    getInitials(name, email) {
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
    formatEmailDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        }
        else if (days === 1) {
            return 'Yesterday';
        }
        else if (days < 7) {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        }
        else if (date.getFullYear() === now.getFullYear()) {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
        else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    }
    mapFolderToType(folder) {
        switch ((folder || '').toLowerCase()) {
            case 'inbox': return 'inbox';
            case 'sent': return 'sent';
            case 'drafts': return 'drafts';
            case 'archive': return 'archive';
            case 'trash': return 'trash';
            case 'spam': return 'spam';
            case 'starred': return 'starred';
            default: return 'inbox';
        }
    }
    mapImportanceToPriority(importance) {
        const value = (importance || '').toLowerCase();
        if (value === 'high')
            return 'high';
        if (value === 'low')
            return 'low';
        return 'normal';
    }
    mapRecipients(emails) {
        return (emails ?? []).map((email) => ({ email }));
    }
    mapMailboxItemToMailboxEmail(item) {
        const folderType = this.mapFolderToType(item.folder);
        return {
            id: item.id,
            connectionId: item.connectionId,
            externalId: item.id,
            conversationId: item.conversationId ?? undefined,
            folderId: folderType,
            folderType,
            from: {
                email: item.fromEmail,
                name: item.fromName ?? undefined
            },
            to: [],
            subject: item.subject,
            snippet: item.bodyPreview ?? '',
            htmlBody: '',
            textBody: item.bodyPreview ?? '',
            isRead: item.isRead,
            isStarred: item.isStarred,
            isDraft: folderType === 'drafts',
            priority: this.mapImportanceToPriority(item.importance),
            hasAttachments: item.hasAttachments,
            attachments: [],
            receivedAtUtc: item.receivedAtUtc,
            sentAtUtc: item.sentAtUtc ?? undefined
        };
    }
    mapMailboxDetailToMailboxEmail(item) {
        const base = this.mapMailboxItemToMailboxEmail(item);
        return {
            ...base,
            externalId: item.externalId,
            conversationId: item.conversationId ?? undefined,
            htmlBody: item.bodyHtml ?? '',
            textBody: item.bodyText ?? base.textBody,
            to: this.mapRecipients(item.toRecipients),
            cc: this.mapRecipients(item.ccRecipients),
            bcc: this.mapRecipients(item.bccRecipients),
            isDraft: item.isDraft,
            attachments: (item.attachments ?? []).map(a => ({
                id: a.id,
                name: a.name,
                size: a.size,
                contentType: a.contentType
            }))
        };
    }
    static ɵfac = function MailboxService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MailboxService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MailboxService, factory: MailboxService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MailboxService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
