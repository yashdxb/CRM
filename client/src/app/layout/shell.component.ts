import { Component, computed, DestroyRef, ElementRef, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
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
import { LoadingOverlayService } from '../core/loading/loading-overlay.service';
import { PresenceConnectionState, PresenceService } from '../core/realtime/presence.service';
import { CrmEventsService } from '../core/realtime/crm-events.service';
import { readUserId } from '../core/auth/token.utils';
import { UserLookupItem } from '../crm/features/settings/models/user-admin.model';
import { UserAdminDataService } from '../crm/features/settings/services/user-admin-data.service';
import { DirectChatMessageItem, DirectChatService, DirectChatThreadItem } from '../core/chat/direct-chat.service';

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
    NotificationContainerComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    AppToastComponent,
    AssistantPanelComponent,
    SidebarComponent,
    TopbarComponent,
    QuickAddModalComponent,
    ProgressSpinnerModule,
    TooltipModule
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
  protected readonly chatLoading = signal(false);
  protected readonly chatError = signal<string | null>(null);
  protected readonly selectedParticipantToAdd = signal<string | null>(null);
  protected readonly emojiPickerVisible = signal(false);
  protected readonly quickEmojis = QUICK_EMOJIS;
  protected readonly chatMessages = signal<DirectChatMessage[]>([]);
  protected readonly availableParticipantsToAdd = computed(() => {
    const currentIds = new Set(this.activeChatParticipants().map((participant) => participant.userId));
    return this.onlinePeople().filter(
      (person) =>
        person.userId !== this.currentUserId &&
        !currentIds.has(person.userId)
    );
  });
  protected readonly currentChatMessages = computed(() => {
    const threadId = this.activeChatThreadId();
    if (!threadId) {
      return [];
    }

    return this.chatMessages()
      .filter((message) => message.threadId === threadId)
      .sort((first, second) => new Date(first.sentAtUtc).getTime() - new Date(second.sentAtUtc).getTime());
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
  @ViewChild('presenceTrigger') presenceTrigger?: ElementRef<HTMLElement>;
  @ViewChild('presencePopup') presencePopup?: ElementRef<HTMLElement>;

  protected readonly quickAddVisible = signal(false);
  protected readonly quickAddType = signal<QuickAddType>('lead');

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
    return !!person.userId && !!this.currentUserId;
  }

  protected engageChat(person: PresencePerson): void {
    if (!this.canChatWith(person)) {
      return;
    }

    this.chatLoading.set(true);
    this.chatError.set(null);

    this.directChatService.openThread([person.userId])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (thread) => {
          this.activeChatUser.set(person);
          this.activeChatThreadId.set(thread.threadId);
          this.activeChatParticipants.set(this.mapThreadParticipants(thread));
          this.chatPanelVisible.set(true);
          this.onlineUsersPopupVisible.set(false);
          this.loadThreadMessages(thread.threadId);
        },
        error: () => {
          this.chatLoading.set(false);
          this.chatError.set('Unable to open chat right now.');
        }
      });
  }

  protected closeChatPanel(): void {
    this.chatPanelVisible.set(false);
    this.emojiPickerVisible.set(false);
  }

  protected sendChatMessage(): void {
    const threadId = this.activeChatThreadId();
    const message = this.applyEmojiShortcuts(this.chatDraft().trim());

    if (!threadId || !message || this.chatSaving()) {
      return;
    }

    this.chatSaving.set(true);
    this.directChatService.sendMessage(threadId, message)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.chatDraft.set('');
          this.emojiPickerVisible.set(false);
          this.chatSaving.set(false);
        },
        error: () => {
          this.chatSaving.set(false);
          this.chatError.set('Unable to send message. Please retry.');
        }
      });
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
        next: () => this.closeChatPanel(),
        error: () => {
          this.chatError.set('Unable to archive this chat.');
        }
      });
  }

  protected addParticipantToActiveChat(userId: string | null): void {
    const threadId = this.activeChatThreadId();
    if (!threadId || !userId) {
      return;
    }

    this.directChatService.addParticipant(threadId, userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const person = this.onlinePeople().find((item) => item.userId === userId);
          if (person) {
            this.activeChatParticipants.update((participants) =>
              participants.some((existing) => existing.userId === person.userId)
                ? participants
                : [...participants, person]
            );
          }
          this.selectedParticipantToAdd.set(null);
        },
        error: () => {
          this.chatError.set('Unable to add this participant.');
        }
      });
  }

  protected insertEmoji(emoji: string): void {
    this.chatDraft.update((value) => `${value}${emoji}`);
  }

  protected toggleEmojiPicker(): void {
    this.emojiPickerVisible.update((value) => !value);
  }

  protected selectParticipantToAdd(value: string): void {
    this.selectedParticipantToAdd.set(value || null);
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
    if (event.eventType !== 'chat.direct.message') {
      return;
    }

    const payload = event.payload ?? null;
    if (!payload) {
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
      sentAtUtc
    };

    this.chatMessages.update((messages) => {
      if (messages.some((message) => message.id === incoming.id)) {
        return messages;
      }
      return [...messages, incoming];
    });
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
      sentAtUtc: item.sentAtUtc
    };
  }

  private mapThreadParticipants(thread: DirectChatThreadItem): PresencePerson[] {
    return thread.participants.map((participant) => ({
      userId: participant.userId,
      displayName: participant.displayName,
      email: participant.email,
      initials: this.buildInitials(participant.displayName)
    }));
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
