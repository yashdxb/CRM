import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MailboxFolder, MailboxFolderType, MailboxEmail, CrmLinkEntityType, CrmRecordLookupItem } from '../models/email.model';
import { MailboxService } from '../services/mailbox.service';
import { CrmEmailLinkService } from '../services/crm-email-link.service';
import { UiStateService } from '../../../../core/ui-state/ui-state.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';

interface MailboxLayoutPrefs {
  listPaneWidth: number;
  listPaneHeight: number;
  readingPanePosition: 'right' | 'bottom' | 'off';
}
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';

@Component({
  selector: 'app-emails-page',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TooltipModule,
    SkeletonModule,
    BadgeModule,
    DividerModule,
    AvatarModule,
    MenuModule,
    ConfirmDialogModule
  ],
  templateUrl: './emails.page.html',
  styleUrl: './emails.page.scss'
})
export class EmailsPage implements OnInit, OnDestroy {
  protected readonly mailbox = inject(MailboxService);
  private readonly crmLinkService = inject(CrmEmailLinkService);
  private readonly toastService = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly elementRef = inject(ElementRef);
  private readonly uiState = inject(UiStateService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly mailCompose = inject(MailComposeService);
  private routeSub?: Subscription;

  // State
  protected readonly folders = this.mailbox.folders;
  protected readonly emails = this.mailbox.emails;
  protected readonly selectedEmail = this.mailbox.selectedEmail;
  protected readonly loading = this.mailbox.loading;
  protected readonly currentFolder = this.mailbox.currentFolder;
  protected readonly stats = this.mailbox.stats;

  protected searchTerm = '';
  protected readingPanePosition: 'right' | 'bottom' | 'off' = 'right';

  // CRM Link state
  protected showLinkDialog = false;
  protected linkEntityType: CrmLinkEntityType | '' = '';
  protected linkEntityId = '';
  protected linkRecordOptions: CrmRecordLookupItem[] = [];
  protected linkRecordLoading = false;
  protected linkNote = '';
  protected readonly linkEntityTypeOptions = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Customer', value: 'Account' },
    { label: 'Opportunity', value: 'Opportunity' }
  ];

  // Resize state
  protected isResizing = false;
  private resizeStartX = 0;
  private resizeStartY = 0;
  private initialPaneSize = 0;

  // Computed
  protected readonly canManage = computed(() => {
    const context = readTokenContext();
    return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.emailsManage);
  });

  protected readonly currentFolderData = computed(() => {
    return this.folders().find(f => f.type === this.currentFolder()) || null;
  });

  protected readonly unreadInFolder = computed(() => {
    return this.emails().filter(e => !e.isRead).length;
  });

  // Keyboard shortcut handling
  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const tagName = target.tagName;
    const typingInEditor =
      tagName === 'INPUT' ||
      tagName === 'TEXTAREA' ||
      target.isContentEditable ||
      !!target.closest('.ql-editor, .p-editor-container, [contenteditable=\"true\"], [role=\"textbox\"]');

    if (typingInEditor) {
      return;
    }

    const email = this.selectedEmail();
    
    switch (event.key) {
      case 'n':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.openCompose();
        }
        break;
      case 'r':
        if (email && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          this.replyToSelected(event.shiftKey);
        }
        break;
      case 'Delete':
      case 'Backspace':
        if (email && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          this.deleteSelected();
        }
        break;
      case 'e':
        if (email) {
          event.preventDefault();
          this.archiveSelected();
        }
        break;
      case 's':
        if (email && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          this.toggleStarSelected();
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.navigateEmails(event.key === 'ArrowUp' ? -1 : 1);
        break;
    }
  }

  ngOnInit(): void {
    // Subscribe to route data changes to switch folders
    this.routeSub = this.route.data.subscribe(data => {
      const folder = data['folder'] as MailboxFolderType;
      if (folder && folder !== this.currentFolder()) {
        this.mailbox.selectFolder(folder);
      }
    });
    this.mailbox.loadStats();
    this.mailbox.loadEmails();

    // Load saved layout preferences
    this.uiState.get<MailboxLayoutPrefs>('mailbox-layout').subscribe(prefs => {
      if (prefs) {
        this.readingPanePosition = prefs.readingPanePosition;
        const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
        if (container) {
          if (prefs.listPaneWidth) {
            container.style.setProperty('--list-pane-width', `${prefs.listPaneWidth}px`);
          }
          if (prefs.listPaneHeight) {
            container.style.setProperty('--list-pane-height', `${prefs.listPaneHeight}px`);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // FOLDER ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  selectFolder(folder: MailboxFolder): void {
    // Navigate to the folder route instead of just changing state
    this.router.navigate(['/app/mailbox', folder.type]);
    this.searchTerm = '';
  }

  getFolderRoute(folder: MailboxFolder): string[] {
    return ['/app/mailbox', folder.type];
  }

  getFolderIcon(folder: MailboxFolder): string {
    return folder.icon || 'pi-folder';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EMAIL LIST ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  selectEmail(email: MailboxEmail): void {
    this.mailbox.selectEmail(email.id);
  }

  protected renderedEmailBody(): SafeHtml | null {
    const html = this.selectedEmail()?.htmlBody?.trim();
    if (!html) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustHtml(this.normalizeEmailHtml(html));
  }

  toggleStar(event: Event, email: MailboxEmail): void {
    event.stopPropagation();
    this.mailbox.toggleStar(email.id);
  }

  markAsRead(event: Event, email: MailboxEmail): void {
    event.stopPropagation();
    this.mailbox.markAsRead(email.id, !email.isRead);
  }

  deleteEmail(event: Event, email: MailboxEmail): void {
    event.stopPropagation();
    this.mailbox.deleteEmail(email.id);
    this.toastService.show('success', 'Email moved to Trash');
  }

  archiveEmail(event: Event, email: MailboxEmail): void {
    event.stopPropagation();
    this.mailbox.archiveEmail(email.id);
    this.toastService.show('success', 'Email archived');
  }

  onSearch(): void {
    this.mailbox.searchEmails({
      folderType: this.currentFolder(),
      search: this.searchTerm
    }).subscribe(response => {
      this.mailbox.emails.set(response.items);
    });
  }

  refreshEmails(): void {
    this.mailbox.refreshFromProvider();
    this.toastService.show('success', 'Mailbox refreshed');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // READING PANE ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  replyToSelected(replyAll = false): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailCompose.open({
        mode: replyAll ? 'replyAll' : 'reply',
        replyToEmail: email
      });
    }
  }

  forwardSelected(): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailCompose.open({
        mode: 'forward',
        replyToEmail: email
      });
    }
  }

  deleteSelected(): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailbox.deleteEmail(email.id);
      this.toastService.show('success', 'Email moved to Trash');
    }
  }

  archiveSelected(): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailbox.archiveEmail(email.id);
      this.toastService.show('success', 'Email archived');
    }
  }

  toggleStarSelected(): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailbox.toggleStar(email.id);
    }
  }

  markSpamSelected(): void {
    const email = this.selectedEmail();
    if (email) {
      this.mailbox.markAsSpam(email.id);
      this.toastService.show('success', 'Email marked as spam');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPOSE ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  openCompose(): void {
    this.mailCompose.open();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CRM LINK ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  openLinkDialog(): void {
    this.linkEntityType = '';
    this.linkEntityId = '';
    this.linkRecordOptions = [];
    this.linkNote = '';
    this.showLinkDialog = true;
  }

  closeLinkDialog(): void {
    this.showLinkDialog = false;
  }

  onLinkEntityTypeChange(entityType: CrmLinkEntityType | ''): void {
    this.linkEntityType = entityType;
    this.linkEntityId = '';
    this.linkRecordOptions = [];

    if (!entityType) {
      return;
    }

    this.linkRecordLoading = true;
    this.crmLinkService.getRecordOptions(entityType).subscribe({
      next: (options) => {
        this.linkRecordOptions = options;
        this.linkRecordLoading = false;
      },
      error: () => {
        this.linkRecordLoading = false;
        this.toastService.show('error', 'Failed to load CRM records');
      }
    });
  }

  linkEmailToCrm(): void {
    const email = this.selectedEmail();
    if (!email || !this.linkEntityType || !this.linkEntityId) return;

    this.crmLinkService.linkEmail({
      connectionId: email.connectionId,
      externalMessageId: email.externalId,
      conversationId: email.conversationId,
      subject: email.subject,
      fromEmail: email.from.email,
      fromName: email.from.name,
      receivedAtUtc: email.receivedAtUtc,
      relatedEntityType: this.linkEntityType,
      relatedEntityId: this.linkEntityId,
      note: this.linkNote || undefined
    }).subscribe({
      next: () => {
        this.toastService.show('success', 'Email linked to CRM record');
        this.closeLinkDialog();
      },
      error: () => {
        this.toastService.show('error', 'Failed to link email');
      }
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════════════════

  navigateEmails(direction: number): void {
    const emailList = this.emails();
    const currentId = this.mailbox.selectedEmailId();
    const currentIndex = emailList.findIndex(e => e.id === currentId);
    const newIndex = Math.max(0, Math.min(emailList.length - 1, currentIndex + direction));
    
    if (emailList[newIndex]) {
      this.selectEmail(emailList[newIndex]);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // UI STATE
  // ═══════════════════════════════════════════════════════════════════════════

  setReadingPanePosition(position: 'right' | 'bottom' | 'off'): void {
    this.readingPanePosition = position;
    if (position === 'off') {
      this.mailbox.selectedEmailId.set(null);
    }
    // Persist reading pane position preference
    const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
    const listPane = container?.querySelector('.email-list-pane');
    const prefs: MailboxLayoutPrefs = {
      listPaneWidth: listPane?.offsetWidth || 380,
      listPaneHeight: listPane?.offsetHeight || 300,
      readingPanePosition: position
    };
    this.uiState.set('mailbox-layout', prefs).subscribe();
  }

  closeReadingPane(): void {
    this.mailbox.selectedEmailId.set(null);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PANE RESIZE
  // ═══════════════════════════════════════════════════════════════════════════

  startResize(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing = true;
    this.resizeStartX = event.clientX;
    this.resizeStartY = event.clientY;

    const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
    if (container) {
      container.classList.add('resizing');
      
      if (this.readingPanePosition === 'bottom') {
        const listPane = container.querySelector('.email-list-pane');
        this.initialPaneSize = listPane?.offsetHeight || container.offsetHeight * 0.5;
      } else {
        const listPane = container.querySelector('.email-list-pane');
        this.initialPaneSize = listPane?.offsetWidth || 380;
      }
    }

    // Add global listeners for drag
    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.stopResize);
  }

  private onResize = (event: MouseEvent): void => {
    if (!this.isResizing) return;

    const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
    if (!container) return;

    if (this.readingPanePosition === 'bottom') {
      // Vertical resize
      const delta = event.clientY - this.resizeStartY;
      const newHeight = Math.max(150, Math.min(this.initialPaneSize + delta, container.offsetHeight - 150));
      container.style.setProperty('--list-pane-height', `${newHeight}px`);
    } else {
      // Horizontal resize
      const delta = event.clientX - this.resizeStartX;
      const newWidth = Math.max(280, Math.min(this.initialPaneSize + delta, container.offsetWidth - 300));
      container.style.setProperty('--list-pane-width', `${newWidth}px`);
    }
  };

  private stopResize = (): void => {
    this.isResizing = false;
    
    const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
    if (container) {
      container.classList.remove('resizing');

      // Save layout preferences to server
      const listPane = container.querySelector('.email-list-pane');
      const prefs: MailboxLayoutPrefs = {
        listPaneWidth: listPane?.offsetWidth || 380,
        listPaneHeight: listPane?.offsetHeight || 300,
        readingPanePosition: this.readingPanePosition
      };
      this.uiState.set('mailbox-layout', prefs).subscribe();
    }

    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.stopResize);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════════════════

  getInitials(email: MailboxEmail): string {
    return this.mailbox.getInitials(email.from.name, email.from.email);
  }

  formatDate(dateStr: string): string {
    return this.mailbox.formatEmailDate(dateStr);
  }

  formatFullDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  formatFileSize(bytes: number): string {
    return this.mailbox.formatFileSize(bytes);
  }

  getPriorityIcon(email: MailboxEmail): string {
    return email.priority === 'high' ? 'pi-exclamation-circle' : '';
  }

  trackByEmail(index: number, email: MailboxEmail): string {
    return email.id;
  }

  trackByFolder(index: number, folder: MailboxFolder): string {
    return folder.id;
  }

  private normalizeEmailHtml(html: string): string {
    let content = html;
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch?.[1]) {
      content = bodyMatch[1];
    }

    return `<div class="email-html-frame">${content}</div>`;
  }
}
