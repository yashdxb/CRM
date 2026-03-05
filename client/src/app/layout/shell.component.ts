import { Component, computed, DestroyRef, ElementRef, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationContainerComponent } from '../core/notifications';
import { CommandPaletteComponent, CommandPaletteService, QuickAddType } from '../core/command-palette';
import { KeyboardShortcutsModalComponent } from '../core/keyboard-shortcuts';
import { AppToastComponent } from '../shared/app-toast.component';
import { AssistantPanelComponent } from '../core/assistant/assistant-panel.component';
import { NavigationService } from './navigation';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { QuickAddModalComponent } from './quick-add/quick-add-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoadingOverlayService } from '../core/loading/loading-overlay.service';
import { PresenceConnectionState, PresenceService } from '../core/realtime/presence.service';
import { CrmEventsService } from '../core/realtime/crm-events.service';
import { readUserId } from '../core/auth/token.utils';
import { UserLookupItem } from '../crm/features/settings/models/user-admin.model';
import { UserAdminDataService } from '../crm/features/settings/services/user-admin-data.service';
import { DirectChatAttachmentItem, DirectChatMessageItem, DirectChatService, DirectChatThreadItem } from '../core/chat/direct-chat.service';
import { NotificationService } from '../core/notifications';
import { firstValueFrom } from 'rxjs';
import { AttachmentDataService, AttachmentItem } from '../shared/services/attachment-data.service';
import { environment } from '../../environments/environment';

interface PresencePerson {
  userId: string;
  displayName: string;
  email: string | null;
  initials: string;
}

interface DirectChatMessage {
  id: string;
  threadId: string;
  senderUserId: string;
  senderDisplayName: string;
  recipientUserId: string;
  content: string;
  sentAtUtc: string;
  attachments: DirectChatAttachment[];
}

interface DirectChatAttachment {
  attachmentId: string;
  fileName: string;
  contentType: string;
  size: number;
  downloadUrl: string;
}

interface PendingChatAttachment {
  id: string;
  file: File;
  size: number;
}

interface DirectChatThreadView {
  threadId: string;
  title: string;
  subtitle: string;
  lastMessageAtUtc: string | null;
  unreadCount: number;
}

const EMOJI_SHORTCUTS: Record<string, string> = {
  ':smile:': '😄',
  ':laugh:': '😂',
  ':thumbsup:': '👍',
  ':heart:': '❤️',
  ':fire:': '🔥',
  ':party:': '🎉',
  ':ok:': '👌',
  ':sad:': '😢'
};

const QUICK_EMOJIS = ['😀', '😂', '😍', '👍', '🔥', '🎉', '👏', '😎', '❤️', '🚀'];

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NgIf,
    FormsModule,
    NotificationContainerComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    AppToastComponent,
    AssistantPanelComponent,
    SidebarComponent,
    TopbarComponent,
    QuickAddModalComponent,
    ProgressSpinnerModule,
    TooltipModule,
    MultiSelectModule
  ],
  templateUrl: "./shell.component.html",
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly nav = inject(NavigationService);
  protected readonly loadingOverlay = inject(LoadingOverlayService);
  private readonly commandPaletteService = inject(CommandPaletteService);
  private readonly presenceService = inject(PresenceService);
  private readonly crmEventsService = inject(CrmEventsService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly directChatService = inject(DirectChatService);
  private readonly notificationService = inject(NotificationService);
  private readonly attachmentDataService = inject(AttachmentDataService);
  protected readonly currentUserId = readUserId();

  protected readonly onlineUsers = toSignal(this.presenceService.onlineUsers$, { initialValue: new Set<string>() });
  protected readonly presenceConnectionState = toSignal(this.presenceService.connectionState$, {
    initialValue: 'disconnected' as PresenceConnectionState
  });
  protected readonly onlineCount = computed(() => this.onlineUsers().size);
  protected readonly onlineUsersPopupVisible = signal(false);
  protected readonly userLookupLoading = signal(false);
  protected readonly userLookupLoaded = signal(false);
  protected readonly userLookupError = signal<string | null>(null);
  protected readonly userLookupById = signal<Map<string, UserLookupItem>>(new Map());
  protected readonly onlinePeople = computed(() => {
    const lookup = this.userLookupById();
    return [...this.onlineUsers()]
      .map((userId) => {
        const user = lookup.get(userId);
        const displayName = user?.fullName?.trim() || `User ${userId.slice(0, 8)}`;
        return {
          userId,
          displayName,
          email: user?.email ?? null,
          initials: this.buildInitials(displayName)
        };
      })
      .sort((first, second) => first.displayName.localeCompare(second.displayName));
  });
  protected readonly activeChatUser = signal<PresencePerson | null>(null);
  protected readonly activeChatThreadId = signal<string | null>(null);
  protected readonly activeChatParticipants = signal<PresencePerson[]>([]);
  protected readonly chatPanelVisible = signal(false);
  protected readonly chatDraft = signal('');
  protected readonly chatSaving = signal(false);
  protected readonly chatMaximized = signal(false);
  protected readonly chatAttachmentUploading = signal(false);
  protected readonly chatLoading = signal(false);
  protected readonly chatError = signal<string | null>(null);
  protected readonly chatUnreadByThread = signal<Map<string, number>>(new Map());
  protected readonly chatUnreadTotal = computed(() =>
    [...this.chatUnreadByThread().values()].reduce((total, count) => total + count, 0)
  );
  protected readonly selectedParticipantsToAdd = signal<string[]>([]);
  protected readonly chatAddingParticipants = signal(false);
  protected readonly emojiPickerVisible = signal(false);
  protected readonly quickEmojis = QUICK_EMOJIS;
  protected readonly chatMessages = signal<DirectChatMessage[]>([]);
  protected readonly pendingChatAttachments = signal<PendingChatAttachment[]>([]);
  protected readonly chatThreads = signal<DirectChatThreadItem[]>([]);
  protected readonly chatThreadLoading = signal(false);
  protected readonly typingUsersByThread = signal<Map<string, Map<string, string>>>(new Map());
  protected readonly activeTypingUsers = computed(() => {
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return [] as string[];
    }

    const users = this.typingUsersByThread().get(threadId);
    return users ? [...users.values()] : [];
  });
  protected readonly availableParticipantsToAdd = computed(() => {
    const currentIds = new Set(this.activeChatParticipants().map((participant) => participant.userId));
    return this.onlinePeople().filter(
      (person) =>
        person.userId !== this.currentUserId &&
        !currentIds.has(person.userId)
    );
  });
  protected readonly participantAddOptions = computed(() =>
    this.availableParticipantsToAdd().map((person) => ({
      label: person.email ? `${person.displayName} (${person.email})` : person.displayName,
      value: person.userId
    }))
  );
  protected readonly currentChatMessages = computed(() => {
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return [];
    }

    return this.chatMessages()
      .filter((message) => message.threadId === threadId)
      .sort((first, second) => {
        const byTime = new Date(first.sentAtUtc).getTime() - new Date(second.sentAtUtc).getTime();
        return byTime !== 0 ? byTime : first.id.localeCompare(second.id);
      });
  });
  protected readonly chatThreadViews = computed<DirectChatThreadView[]>(() => {
    const threads = this.chatThreads();
    const unread = this.chatUnreadByThread();
    const allMessages = this.chatMessages();
    const currentUserId = this.currentUserId?.toLowerCase() ?? '';

    return threads
      .map((thread) => {
        const otherParticipants = thread.participants.filter(
          (participant) => participant.userId.toLowerCase() !== currentUserId
        );
        const participantNames = otherParticipants.map((participant) => participant.displayName).filter(Boolean);
        const title = thread.title?.trim()
          || participantNames.slice(0, 2).join(', ')
          || 'Direct chat';

        const threadMessages = allMessages
          .filter((message) => message.threadId === thread.threadId)
          .sort((a, b) => new Date(b.sentAtUtc).getTime() - new Date(a.sentAtUtc).getTime());
        const latest = threadMessages[0];
        const subtitle = latest?.content?.trim()
          ? this.truncateMessage(latest.content, 48)
          : (otherParticipants[0]?.email ?? 'No messages yet');

        const lastMessageAtUtc = latest?.sentAtUtc ?? thread.lastMessageAtUtc ?? null;
        return {
          threadId: thread.threadId,
          title,
          subtitle,
          lastMessageAtUtc,
          unreadCount: unread.get(thread.threadId) ?? 0
        } satisfies DirectChatThreadView;
      })
      .sort((a, b) => {
        const aRawTime = a.lastMessageAtUtc ? new Date(a.lastMessageAtUtc).getTime() : Number.NaN;
        const bRawTime = b.lastMessageAtUtc ? new Date(b.lastMessageAtUtc).getTime() : Number.NaN;
        const aTime = Number.isFinite(aRawTime) ? aRawTime : Number.MAX_SAFE_INTEGER;
        const bTime = Number.isFinite(bRawTime) ? bRawTime : Number.MAX_SAFE_INTEGER;
        const byTime = aTime - bTime;
        return byTime !== 0 ? byTime : a.threadId.localeCompare(b.threadId);
      });
  });
  protected readonly presencePopupBodyMaxHeight = computed(() => {
    const desiredHeight = 84 + this.onlineCount() * 56;
    return Math.min(360, Math.max(140, desiredHeight));
  });
  protected readonly presenceStatusLabel = computed(() => {
    const state = this.presenceConnectionState();
    if (state === 'connected') {
      return 'Live';
    }
    if (state === 'reconnecting' || state === 'connecting') {
      return 'Syncing';
    }
    return 'Offline';
  });
  protected readonly footerPresenceTooltip = computed(() => {
    const count = this.onlineCount();
    const state = this.presenceConnectionState();

    if (state === 'connected') {
      return `${count} user${count === 1 ? '' : 's'} online`;
    }

    if (state === 'reconnecting' || state === 'connecting') {
      return `Presence ${state}… showing latest count (${count})`;
    }

    return `Presence offline. Last known count: ${count}`;
  });

  @ViewChild('quickAddModal') quickAddModal!: QuickAddModalComponent;
  @ViewChild('chatAttachmentInput') chatAttachmentInput?: ElementRef<HTMLInputElement>;
  @ViewChild('presenceTrigger') presenceTrigger?: ElementRef<HTMLElement>;
  @ViewChild('presencePopup') presencePopup?: ElementRef<HTMLElement>;

  protected readonly quickAddVisible = signal(false);
  protected readonly quickAddType = signal<QuickAddType>('lead');
  private typingIdleTimer: ReturnType<typeof setTimeout> | null = null;
  private typingExpiryTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private lastTypingThreadId: string | null = null;
  private typingAnnounced = false;
  private lastNewConversationSoundAt = 0;

  private readonly quickAddEffect = effect(() => {
    const request = this.commandPaletteService.quickAddRequest();
    if (request) {
      this.openQuickAdd(request);
      this.commandPaletteService.clearQuickAddRequest();
    }
  });

  constructor() {
    this.syncSidebarForViewport();
    this.crmEventsService.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleRealtimeEvent(event));
  }

  @HostListener('window:crm-quick-add', ['$event'])
  handleQuickAddEvent(event: Event) {
    const type = (event as CustomEvent<QuickAddType>)?.detail;
    if (type) {
      this.openQuickAdd(type);
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.syncSidebarForViewport();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.onlineUsersPopupVisible()) {
      return;
    }

    const targetNode = event.target as Node | null;
    const triggerElement = this.presenceTrigger?.nativeElement;
    const popupElement = this.presencePopup?.nativeElement;

    if (!targetNode) {
      this.onlineUsersPopupVisible.set(false);
      return;
    }

    const clickedInsideTrigger = !!triggerElement && triggerElement.contains(targetNode);
    const clickedInsidePopup = !!popupElement && popupElement.contains(targetNode);

    if (!clickedInsideTrigger && !clickedInsidePopup) {
      this.onlineUsersPopupVisible.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.onlineUsersPopupVisible.set(false);
  }

  protected openQuickAdd(type?: QuickAddType) {
    this.quickAddType.set(type ?? 'lead');
    this.quickAddVisible.set(true);
    // Allow modal to render, then call open() to load lookups
    setTimeout(() => this.quickAddModal?.open(type), 0);
  }

  protected onQuickAddCreated() {
    this.nav.refreshNav();
  }

  protected toggleOnlineUsersPopup(event: MouseEvent): void {
    event.stopPropagation();
    const willOpen = !this.onlineUsersPopupVisible();
    this.onlineUsersPopupVisible.set(willOpen);

    if (willOpen) {
      this.ensureUserLookupLoaded();
    }
  }

  protected retryUserLookup(): void {
    this.userLookupLoaded.set(false);
    this.userLookupError.set(null);
    this.ensureUserLookupLoaded();
  }

  protected canChatWith(person: PresencePerson): boolean {
    if (!person.userId) {
      return false;
    }

    if (!this.currentUserId) {
      return true;
    }

    return person.userId !== this.currentUserId;
  }

  protected engageChat(person: PresencePerson): void {
    if (!this.canChatWith(person)) {
      return;
    }

    this.activeChatUser.set(person);
    this.activeChatThreadId.set(null);
    this.activeChatParticipants.set([person]);
    this.chatPanelVisible.set(true);
    this.onlineUsersPopupVisible.set(false);
    this.chatDraft.set('');
    this.chatLoading.set(true);
    this.chatError.set(null);

    this.directChatService.openThread([person.userId])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (thread) => {
          this.activeChatThreadId.set(thread.threadId);
          this.activeChatParticipants.set(this.mapThreadParticipants(thread));
          this.chatThreads.update((items) => this.upsertThread(items, thread));
          this.loadThreadMessages(thread.threadId);
          this.refreshChatThreads(thread.threadId);
        },
        error: () => {
          this.chatLoading.set(false);
          this.chatError.set('Unable to open chat right now. Please verify API/auth connectivity and try again.');
        }
      });
  }

  protected closeChatPanel(): void {
    this.stopSelfTyping();
    this.chatPanelVisible.set(false);
    this.chatMaximized.set(false);
    this.emojiPickerVisible.set(false);
    this.pendingChatAttachments.set([]);
    this.chatLoading.set(false);
    this.chatError.set(null);
  }

  protected openChatInbox(): void {
    const unreadThreadId = this.pickMostRecentUnreadThreadId();
    this.chatPanelVisible.set(true);
    if (this.activeChatThreadId() && !unreadThreadId) {
      return;
    }
    this.refreshChatThreads(unreadThreadId ?? undefined);
  }

  protected selectChatThread(threadId: string): void {
    if (!threadId || this.activeChatThreadId() === threadId) {
      return;
    }
    this.openThreadById(threadId);
  }

  protected async sendChatMessage(): Promise<void> {
    const threadId = this.activeChatThreadId();
    const message = this.applyEmojiShortcuts(this.chatDraft().trim());
    const pendingAttachments = this.pendingChatAttachments();

    if (!threadId || this.chatSaving() || (!message && pendingAttachments.length === 0)) {
      return;
    }

    this.stopSelfTyping(threadId);
    this.chatSaving.set(true);
    this.chatError.set(null);

    try {
      let attachmentIds: string[] = [];
      if (pendingAttachments.length > 0) {
        this.chatAttachmentUploading.set(true);
        const uploaded = await Promise.all(
          pendingAttachments.map((item) =>
            firstValueFrom(this.attachmentDataService.upload(item.file, 'DirectChatThread', threadId))
          )
        );
        attachmentIds = uploaded.map((item) => item.id);
      }

      const sentMessage = await firstValueFrom(this.directChatService.sendMessage(threadId, message, attachmentIds));
      this.chatDraft.set('');
      this.emojiPickerVisible.set(false);
      this.pendingChatAttachments.set([]);
      if (this.chatAttachmentInput?.nativeElement) {
        this.chatAttachmentInput.nativeElement.value = '';
      }

      const mapped = this.mapMessageItem(sentMessage);
      this.chatMessages.update((messages) => {
        if (messages.some((item) => item.id === mapped.id)) {
          return messages;
        }
        return [...messages, mapped];
      });
      this.markThreadAsRead(threadId);
      this.refreshChatThreads(threadId);
    } catch {
      this.chatError.set('Unable to send message. Please retry.');
    } finally {
      this.chatAttachmentUploading.set(false);
      this.chatSaving.set(false);
    }
  }

  protected clearActiveChat(): void {
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return;
    }

    this.directChatService.clearThread(threadId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.chatMessages.update((items) => items.filter((message) => message.threadId !== threadId));
        },
        error: () => {
          this.chatError.set('Unable to clear this chat.');
        }
      });
  }

  protected archiveActiveChat(): void {
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return;
    }

    this.directChatService.archiveThread(threadId, true)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.chatThreads.update((items) => items.filter((thread) => thread.threadId !== threadId));
          this.closeChatPanel();
        },
        error: () => {
          this.chatError.set('Unable to archive this chat.');
        }
      });
  }

  protected async addParticipantsToActiveChat(): Promise<void> {
    const threadId = this.activeChatThreadId();
    const selected = [...new Set(this.selectedParticipantsToAdd().filter(Boolean))];
    if (!threadId || selected.length === 0 || this.chatAddingParticipants()) {
      return;
    }

    this.chatAddingParticipants.set(true);
    this.chatError.set(null);

    const results = await Promise.allSettled(
      selected.map(async (userId) => {
        await firstValueFrom(this.directChatService.addParticipant(threadId, userId));
        return userId;
      })
    );

    const addedUserIds = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map((result) => result.value);
    const failedCount = results.length - addedUserIds.length;

    if (addedUserIds.length > 0) {
      const onlineById = new Map(this.onlinePeople().map((person) => [person.userId, person]));
      this.activeChatParticipants.update((participants) => {
        const next = [...participants];
        for (const userId of addedUserIds) {
          const person = onlineById.get(userId);
          if (!person || next.some((existing) => existing.userId === userId)) {
            continue;
          }
          next.push(person);
        }
        return next;
      });
      this.refreshChatThreads(threadId);
    }

    if (failedCount > 0) {
      this.chatError.set(
        addedUserIds.length > 0
          ? `Added ${addedUserIds.length} participant(s). ${failedCount} could not be added.`
          : 'Unable to add selected participants.'
      );
    } else {
      this.chatError.set(null);
    }

    this.selectedParticipantsToAdd.set([]);
    this.chatAddingParticipants.set(false);
  }

  protected insertEmoji(emoji: string): void {
    this.chatDraft.update((value) => `${value}${emoji}`);
  }

  protected toggleEmojiPicker(): void {
    this.emojiPickerVisible.update((value) => !value);
  }

  protected onChatInput(value: string): void {
    this.chatDraft.set(value);
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return;
    }

    if (!value.trim()) {
      this.stopSelfTyping(threadId);
      return;
    }

    this.startSelfTyping(threadId);

    if (this.typingIdleTimer) {
      clearTimeout(this.typingIdleTimer);
    }
    this.typingIdleTimer = setTimeout(() => this.stopSelfTyping(threadId), 1500);
  }

  protected toggleChatMaximize(): void {
    this.chatMaximized.update((value) => !value);
  }

  protected onChatAttachmentSelected(fileList: FileList | null): void {
    if (!fileList || !fileList.length) {
      return;
    }

    const existing = this.pendingChatAttachments();
    const currentSize = existing.reduce((sum, item) => sum + item.size, 0);
    const files = Array.from(fileList);
    const maxTotalBytes = 20 * 1024 * 1024;

    const next: PendingChatAttachment[] = [...existing];
    let accumulatedSize = currentSize;

    for (const file of files) {
      if (!file || !file.name) {
        continue;
      }

      const duplicate = next.some(
        (item) => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified
      );
      if (duplicate) {
        continue;
      }

      if (accumulatedSize + file.size > maxTotalBytes) {
        this.chatError.set('Total attachment size must be under 20 MB.');
        break;
      }

      next.push({
        id: crypto.randomUUID(),
        file,
        size: file.size
      });
      accumulatedSize += file.size;
    }

    this.pendingChatAttachments.set(next);
    if (this.chatAttachmentInput?.nativeElement) {
      this.chatAttachmentInput.nativeElement.value = '';
    }
  }

  protected removePendingChatAttachment(id: string): void {
    this.pendingChatAttachments.update((current) => current.filter((item) => item.id !== id));
  }

  protected formatAttachmentSize(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) {
      return '0 B';
    }
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }
    return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
  }

  protected setSelectedParticipantsToAdd(values: string[] | null | undefined): void {
    this.selectedParticipantsToAdd.set([...(values ?? []).filter(Boolean)]);
  }

  protected formatChatTime(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return '';
    }
    return parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private ensureUserLookupLoaded(): void {
    if (this.userLookupLoading() || this.userLookupLoaded()) {
      return;
    }

    this.userLookupLoading.set(true);
    this.userLookupError.set(null);

    this.userAdminData.lookupActive(undefined, 500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          const map = new Map<string, UserLookupItem>();
          for (const user of users) {
            if (user.id) {
              map.set(user.id, user);
            }
          }
          this.userLookupById.set(map);
          this.userLookupLoaded.set(true);
          this.userLookupLoading.set(false);
        },
        error: () => {
          this.userLookupLoading.set(false);
          this.userLookupError.set('Unable to load user directory right now.');
        }
      });
  }

  private buildInitials(name: string): string {
    const parts = name.split(' ').filter(Boolean).slice(0, 2);
    if (!parts.length) {
      return 'U';
    }
    return parts.map((part) => part[0]?.toUpperCase() ?? '').join('');
  }

  private handleRealtimeEvent(event: { eventType: string; payload?: Record<string, unknown> | null }): void {
    const payload = event.payload ?? null;
    if (!payload) {
      return;
    }

    if (event.eventType === 'chat.direct.typing') {
      this.handleTypingRealtimeEvent(payload);
      return;
    }

    if (event.eventType !== 'chat.direct.message') {
      return;
    }

    const senderUserId = this.asString(payload['senderUserId']);
    const recipientUserId = this.asString(payload['recipientUserId']) ?? '';
    const threadId = this.asString(payload['threadId']);
    const content = this.asString(payload['content']);
    if (!senderUserId || !threadId || !content) {
      return;
    }

    const messageId = this.asString(payload['messageId']) ?? crypto.randomUUID();
    const senderDisplayName = this.asString(payload['senderDisplayName']) ?? 'User';
    const sentAtUtc = this.asString(payload['sentAtUtc']) ?? new Date().toISOString();

    const incoming: DirectChatMessage = {
      id: messageId,
      threadId,
      senderUserId,
      senderDisplayName,
      recipientUserId,
      content,
      sentAtUtc,
      attachments: this.normalizeRealtimeAttachments(payload['attachments'])
    };
    const threadKnownBeforeEvent = this.chatThreads().some((item) => item.threadId === threadId);

    this.chatMessages.update((messages) => {
      if (messages.some((message) => message.id === incoming.id)) {
        return messages;
      }
      return [...messages, incoming];
    });
    this.removeTypingUser(threadId, senderUserId);
    this.refreshChatThreads(threadId);

    if (!this.currentUserId || senderUserId === this.currentUserId) {
      return;
    }

    const isActiveThread =
      this.chatPanelVisible() &&
      this.activeChatThreadId() === threadId;

    if (isActiveThread) {
      this.markThreadAsRead(threadId);
      return;
    }

    this.incrementThreadUnread(threadId);
    const action = {
      label: threadKnownBeforeEvent ? 'Reply' : 'Open chat',
      callback: () => this.openThreadById(threadId, senderUserId, senderDisplayName)
    };

    if (threadKnownBeforeEvent) {
      this.notificationService.info(
        `New message from ${senderDisplayName}`,
        this.truncateMessage(content),
        action
      );
      return;
    }

    this.notificationService.show({
      type: 'warning',
      title: `New conversation from ${senderDisplayName}`,
      message: this.truncateMessage(content),
      action,
      duration: 9000,
      dismissible: true
    });
    this.playNewConversationSound();
  }

  private asString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value : null;
  }

  private loadThreadMessages(threadId: string): void {
    this.chatLoading.set(true);
    this.chatError.set(null);
    this.directChatService.getMessages(threadId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (messages) => {
          this.chatMessages.update((current) => {
            const withoutThread = current.filter((message) => message.threadId !== threadId);
            const mapped = messages.map((message) => this.mapMessageItem(message));
            return [...withoutThread, ...mapped];
          });
          this.chatLoading.set(false);
          if (this.activeChatThreadId() === threadId && this.chatPanelVisible()) {
            this.markThreadAsRead(threadId);
          }
        },
        error: () => {
          this.chatLoading.set(false);
          this.chatError.set('Unable to load chat history.');
        }
      });
  }

  private mapMessageItem(item: DirectChatMessageItem): DirectChatMessage {
    return {
      id: item.messageId,
      threadId: item.threadId,
      senderUserId: item.senderUserId,
      senderDisplayName: item.senderDisplayName,
      recipientUserId: '',
      content: item.content,
      sentAtUtc: item.sentAtUtc,
      attachments: (item.attachments ?? []).map((attachment) => this.mapAttachmentItem(attachment))
    };
  }

  private mapAttachmentItem(item: DirectChatAttachmentItem): DirectChatAttachment {
    const baseUrl = (environment.apiUrl ?? '').replace(/\/+$/, '');
    const path = item.downloadUrl?.trim() ?? '';
    const downloadUrl = path.startsWith('http')
      ? path
      : `${baseUrl}/${path.replace(/^\/+/, '')}`;
    return {
      attachmentId: item.attachmentId,
      fileName: item.fileName,
      contentType: item.contentType,
      size: item.size,
      downloadUrl
    };
  }

  private normalizeRealtimeAttachments(raw: unknown): DirectChatAttachment[] {
    if (!Array.isArray(raw)) {
      return [];
    }

    const baseUrl = (environment.apiUrl ?? '').replace(/\/+$/, '');
    const attachments: DirectChatAttachment[] = [];
    for (const item of raw) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const record = item as Record<string, unknown>;
      const attachmentId = this.asString(record['attachmentId']);
      const fileName = this.asString(record['fileName']);
      const contentType = this.asString(record['contentType']) ?? 'application/octet-stream';
      const sizeRaw = record['size'];
      const size = typeof sizeRaw === 'number' ? sizeRaw : Number(sizeRaw ?? 0);

      if (!attachmentId || !fileName) {
        continue;
      }

      attachments.push({
        attachmentId,
        fileName,
        contentType,
        size: Number.isFinite(size) ? size : 0,
        downloadUrl: `${baseUrl}/api/attachments/${attachmentId}/download`
      });
    }

    return attachments;
  }

  private mapThreadParticipants(thread: DirectChatThreadItem): PresencePerson[] {
    return thread.participants.map((participant) => ({
      userId: participant.userId,
      displayName: participant.displayName,
      email: participant.email,
      initials: this.buildInitials(participant.displayName)
    }));
  }

  private incrementThreadUnread(threadId: string): void {
    this.chatUnreadByThread.update((current) => {
      const next = new Map(current);
      next.set(threadId, (next.get(threadId) ?? 0) + 1);
      return next;
    });
  }

  private markThreadAsRead(threadId: string): void {
    this.chatUnreadByThread.update((current) => {
      if (!current.has(threadId)) {
        return current;
      }

      const next = new Map(current);
      next.delete(threadId);
      return next;
    });
  }

  private pickMostRecentUnreadThreadId(): string | null {
    const unreadIds = [...this.chatUnreadByThread().keys()];
    if (unreadIds.length === 0) {
      return null;
    }

    const messages = this.chatMessages();
    unreadIds.sort((first, second) => {
      const firstLast = messages
        .filter((message) => message.threadId === first)
        .map((message) => new Date(message.sentAtUtc).getTime())
        .sort((a, b) => b - a)[0] ?? 0;
      const secondLast = messages
        .filter((message) => message.threadId === second)
        .map((message) => new Date(message.sentAtUtc).getTime())
        .sort((a, b) => b - a)[0] ?? 0;
      return secondLast - firstLast;
    });

    return unreadIds[0] ?? null;
  }

  private openThreadById(threadId: string, senderUserId?: string, senderDisplayName?: string): void {
    this.chatPanelVisible.set(true);
    this.chatLoading.set(true);
    this.chatError.set(null);

    this.directChatService.listThreads()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (threads) => {
          this.chatThreads.set(threads);
          const thread = threads.find((item) => item.threadId === threadId);
          if (thread) {
            this.activeChatThreadId.set(thread.threadId);
            const participants = this.mapThreadParticipants(thread);
            this.activeChatParticipants.set(participants);
            const focusUser = participants.find((person) => person.userId !== this.currentUserId) ?? participants[0] ?? null;
            if (focusUser) {
              this.activeChatUser.set(focusUser);
            }
            this.loadThreadMessages(thread.threadId);
            this.markThreadAsRead(thread.threadId);
            return;
          }

          if (senderUserId) {
            this.fallbackOpenOneToOne(senderUserId, senderDisplayName);
            return;
          }

          this.chatLoading.set(false);
          this.chatError.set('Unable to open this conversation.');
        },
        error: () => {
          if (senderUserId) {
            this.fallbackOpenOneToOne(senderUserId, senderDisplayName);
            return;
          }

          this.chatLoading.set(false);
          this.chatError.set('Unable to open this conversation.');
        }
      });
  }

  private refreshChatThreads(preferredThreadId?: string): void {
    this.chatThreadLoading.set(true);
    this.directChatService.listThreads()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (threads) => {
          this.chatThreadLoading.set(false);
          this.chatThreads.set(threads);

          if (preferredThreadId && !this.activeChatThreadId() && this.chatPanelVisible()) {
            const preferred = threads.find((thread) => thread.threadId === preferredThreadId);
            if (preferred) {
              this.openThreadById(preferredThreadId);
              return;
            }

            const recentForThread = this.chatMessages()
              .filter((message) => message.threadId === preferredThreadId)
              .sort((first, second) => new Date(second.sentAtUtc).getTime() - new Date(first.sentAtUtc).getTime())[0] ?? null;

            if (recentForThread?.senderUserId && recentForThread.senderUserId !== this.currentUserId) {
              this.fallbackOpenOneToOne(recentForThread.senderUserId, recentForThread.senderDisplayName);
              return;
            }
          }

          if (!this.activeChatThreadId() && threads.length > 0 && this.chatPanelVisible()) {
            this.openThreadById(threads[0].threadId);
          }
        },
        error: () => {
          this.chatThreadLoading.set(false);
        }
      });
  }

  private fallbackOpenOneToOne(senderUserId: string, senderDisplayName?: string): void {
    this.directChatService.openThread([senderUserId])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (thread) => {
          this.activeChatThreadId.set(thread.threadId);
          const participants = this.mapThreadParticipants(thread);
          this.activeChatParticipants.set(participants);
          this.chatThreads.update((items) => this.upsertThread(items, thread));
          const focusUser = participants.find((person) => person.userId === senderUserId)
            ?? participants.find((person) => person.userId !== this.currentUserId)
            ?? (senderDisplayName ? {
              userId: senderUserId,
              displayName: senderDisplayName,
              email: null,
              initials: this.buildInitials(senderDisplayName)
            } : null);
          if (focusUser) {
            this.activeChatUser.set(focusUser);
          }
          this.loadThreadMessages(thread.threadId);
          this.markThreadAsRead(thread.threadId);
        },
        error: () => {
          this.chatLoading.set(false);
          this.chatError.set('Unable to open this conversation.');
        }
      });
  }

  private truncateMessage(message: string, maxLength = 120): string {
    if (message.length <= maxLength) {
      return message;
    }
    return `${message.slice(0, maxLength - 1)}…`;
  }

  protected buildAvatarInitials(displayName: string): string {
    return this.buildInitials(displayName || 'User');
  }

  private startSelfTyping(threadId: string): void {
    if (this.lastTypingThreadId && this.lastTypingThreadId !== threadId && this.typingAnnounced) {
      this.sendTypingStatus(this.lastTypingThreadId, false);
      this.typingAnnounced = false;
    }

    if (!this.typingAnnounced || this.lastTypingThreadId !== threadId) {
      this.sendTypingStatus(threadId, true);
      this.typingAnnounced = true;
      this.lastTypingThreadId = threadId;
    }
  }

  private stopSelfTyping(threadId?: string): void {
    if (this.typingIdleTimer) {
      clearTimeout(this.typingIdleTimer);
      this.typingIdleTimer = null;
    }

    const targetThreadId = threadId ?? this.lastTypingThreadId;
    if (!targetThreadId || !this.typingAnnounced) {
      if (!threadId) {
        this.lastTypingThreadId = null;
      }
      return;
    }

    this.sendTypingStatus(targetThreadId, false);
    this.typingAnnounced = false;
    if (!threadId || threadId === this.lastTypingThreadId) {
      this.lastTypingThreadId = null;
    }
  }

  private sendTypingStatus(threadId: string, isTyping: boolean): void {
    this.directChatService.sendTyping(threadId, isTyping)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: () => void 0 });
  }

  private handleTypingRealtimeEvent(payload: Record<string, unknown>): void {
    const threadId = this.asString(payload['threadId']);
    const senderUserId = this.asString(payload['senderUserId']);
    const senderDisplayName = this.asString(payload['senderDisplayName']) ?? 'User';
    const isTyping = Boolean(payload['isTyping']);

    if (!threadId || !senderUserId || senderUserId === this.currentUserId) {
      return;
    }

    if (!isTyping) {
      this.removeTypingUser(threadId, senderUserId);
      return;
    }

    this.typingUsersByThread.update((current) => {
      const next = new Map(current);
      const users = new Map(next.get(threadId) ?? []);
      users.set(senderUserId, senderDisplayName);
      next.set(threadId, users);
      return next;
    });

    const timerKey = `${threadId}:${senderUserId}`;
    const previousTimer = this.typingExpiryTimers.get(timerKey);
    if (previousTimer) {
      clearTimeout(previousTimer);
    }
    this.typingExpiryTimers.set(timerKey, setTimeout(() => {
      this.removeTypingUser(threadId, senderUserId);
      this.typingExpiryTimers.delete(timerKey);
    }, 3500));
  }

  private removeTypingUser(threadId: string, userId: string): void {
    this.typingUsersByThread.update((current) => {
      const users = current.get(threadId);
      if (!users || !users.has(userId)) {
        return current;
      }

      const next = new Map(current);
      const updatedUsers = new Map(users);
      updatedUsers.delete(userId);
      if (updatedUsers.size === 0) {
        next.delete(threadId);
      } else {
        next.set(threadId, updatedUsers);
      }
      return next;
    });
  }

  private playNewConversationSound(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const now = Date.now();
    if (now - this.lastNewConversationSoundAt < 2500) {
      return;
    }
    this.lastNewConversationSoundAt = now;

    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    try {
      const context = new AudioContextCtor();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = 740;

      gainNode.gain.setValueAtTime(0.0001, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.24);

      oscillator.onended = () => {
        void context.close();
      };
    } catch {
      // Ignore browser audio-policy failures (e.g., autoplay restrictions).
    }
  }

  private upsertThread(current: DirectChatThreadItem[], candidate: DirectChatThreadItem): DirectChatThreadItem[] {
    const next = [...current];
    const index = next.findIndex((item) => item.threadId === candidate.threadId);
    if (index >= 0) {
      next[index] = candidate;
      return next;
    }
    return [...next, candidate];
  }

  private applyEmojiShortcuts(value: string): string {
    let result = value;
    for (const [shortcut, emoji] of Object.entries(EMOJI_SHORTCUTS)) {
      result = result.replaceAll(shortcut, emoji);
    }
    return result;
  }

  private syncSidebarForViewport() {
    if (typeof window === 'undefined') {
      return;
    }

    this.nav.applyResponsiveSidebarState(window.innerWidth <= 840);
  }
}
