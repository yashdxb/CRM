import { NgFor, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { AssistantService } from './assistant.service';
import {
  AssistantChatMessage,
  AssistantChatService,
  AssistantInsights,
  AssistantInsightsAction
} from './assistant-chat.service';
import { AuthService } from '../auth/auth.service';
import { CrmEventsService } from '../realtime/crm-events.service';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DragDropModule],
  templateUrl: './assistant-panel.component.html',
  styleUrl: './assistant-panel.component.scss'
})
export class AssistantPanelComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly assistantService = inject(AssistantService);
  private readonly assistantChatService = inject(AssistantChatService);
  private readonly authService = inject(AuthService);
  private readonly crmEventsService = inject(CrmEventsService);
  private readonly router = inject(Router);
  private activeConversationId: string | null = null;
  private activeConversationMessageId: string | null = null;

  private readonly emptyAssistantInsights: AssistantInsights = {
    scope: 'Self',
    kpis: [],
    actions: [],
    generatedAtUtc: new Date().toISOString()
  };

  protected readonly assistantVisible = this.assistantService.isVisible;
  protected readonly assistantCollapsed = this.assistantService.isCollapsed;
  protected readonly assistantMessages = signal<AssistantUiMessage[]>([]);
  protected readonly assistantInput = signal('');
  protected readonly assistantSending = signal(false);
  protected readonly assistantError = signal<string | null>(null);
  protected readonly assistantInfo = signal<string | null>(null);
  protected readonly historyLoaded = signal(false);
  protected readonly historyLoading = signal(false);
  protected readonly assistantInsights = signal<AssistantInsights>(this.emptyAssistantInsights);
  protected readonly assistantActions = computed(() => this.assistantInsights().actions ?? []);
  protected assistantReviewDialogOpen = false;
  protected assistantReviewNote = '';
  protected assistantReviewSubmitting = false;
  protected pendingAssistantAction: AssistantInsightsAction | null = null;
  protected assistantUndoVisible = false;
  protected assistantUndoBusy = false;
  protected assistantUndoMessage = '';
  private assistantUndoTimerId: number | null = null;
  private assistantUndoActivityId: string | null = null;
  private assistantUndoActionType: string | null = null;
  protected readonly assistantGreeting = computed(() => this.buildAssistantGreeting());

  protected toggleAssistantCollapsed(): void {
    this.assistantService.toggleCollapsed();
  }

  protected hideAssistant(): void {
    this.assistantService.setVisible(false);
  }

  protected sendAssistantMessage(): void {
    const message = this.assistantInput().trim();
    if (!message || this.assistantSending()) {
      return;
    }

    const userMessage: AssistantUiMessage = {
      id: this.buildLocalId('user'),
      role: 'user',
      content: message,
      createdAtUtc: new Date().toISOString()
    };
    this.assistantMessages.update(messages => [...messages, userMessage]);
    this.assistantSending.set(true);
    this.assistantError.set(null);
    this.assistantInfo.set(null);
    this.assistantInput.set('');

    const streamEnabled = this.crmEventsService.isFeatureEnabled('realtime.assistantStreaming');
    const conversationId = streamEnabled ? this.buildLocalId('conversation') : undefined;
    if (conversationId) {
      const assistantMessage: AssistantUiMessage = {
        id: this.buildLocalId('assistant'),
        role: 'assistant',
        content: '',
        displayContent: '',
        isTyping: true,
        createdAtUtc: new Date().toISOString()
      };
      this.assistantMessages.update(messages => [...messages, assistantMessage]);
      this.activeConversationId = conversationId;
      this.activeConversationMessageId = assistantMessage.id;
    }

    this.assistantChatService.sendMessage(message, { stream: streamEnabled, conversationId }).subscribe({
      next: response => {
        if (streamEnabled && response.streamed) {
          return;
        }

        const reply = response.reply ?? '';
        const existingMessageId = this.activeConversationMessageId;
        const assistantMessage: AssistantUiMessage = existingMessageId
          ? {
              id: existingMessageId,
              role: 'assistant',
              content: reply,
              displayContent: '',
              isTyping: true,
              createdAtUtc: new Date().toISOString()
            }
          : {
              id: this.buildLocalId('assistant'),
              role: 'assistant',
              content: reply,
              displayContent: '',
              isTyping: true,
              createdAtUtc: new Date().toISOString()
            };
        if (existingMessageId) {
          this.updateMessage(existingMessageId, assistantMessage);
        } else {
          this.assistantMessages.update(messages => [...messages, assistantMessage]);
        }
        this.activeConversationId = null;
        this.activeConversationMessageId = null;
        this.assistantSending.set(false);
        this.runTypewriter(assistantMessage.id, reply);
        this.refreshInsights();
      },
      error: err => {
        this.activeConversationId = null;
        this.activeConversationMessageId = null;
        const fallback = typeof err?.error?.error === 'string'
          ? err.error.error
          : 'Assistant is unavailable right now. Please try again.';
        this.assistantError.set(fallback);
        this.assistantSending.set(false);
      }
    });
  }

  protected loadHistory(): void {
    if (this.historyLoaded() || this.historyLoading()) {
      return;
    }
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.historyLoading.set(true);
    this.assistantChatService.getHistory().subscribe({
      next: messages => {
        this.assistantMessages.set((messages ?? []).map((message) => ({
          ...message
        })));
        this.historyLoaded.set(true);
        this.historyLoading.set(false);
        this.refreshInsights();
      },
      error: () => {
        this.assistantError.set('Unable to load assistant history.');
        this.historyLoading.set(false);
      }
    });
  }

  protected onAssistantInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendAssistantMessage();
    }
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.refreshInsights();
    }

    this.crmEventsService.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleRealtimeAssistantEvent(event));
  }

  protected assistantActionLabel(action: AssistantInsightsAction): string {
    return (action.riskTier ?? '').toLowerCase() === 'low' ? 'Execute' : 'Review';
  }

  protected openAssistantAction(action: AssistantInsightsAction): void {
    const risk = (action.riskTier ?? '').toLowerCase();
    this.assistantError.set(null);
    this.assistantInfo.set(null);
    if (risk === 'medium' || risk === 'high') {
      this.pendingAssistantAction = action;
      this.assistantReviewNote = '';
      this.assistantReviewDialogOpen = true;
      return;
    }

    this.assistantChatService.executeAction(action)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.assistantInfo.set(result.message || 'Action executed.');
          if (result.createdActivityId && risk === 'low') {
            this.showAssistantUndo(action, result.createdActivityId);
          }
          this.refreshInsights();
          this.navigateAssistantAction(action);
        },
        error: () => {
          this.assistantError.set('Unable to execute assistant action.');
        }
      });
  }

  protected submitAssistantReview(approved: boolean): void {
    const action = this.pendingAssistantAction;
    if (!action || this.assistantReviewSubmitting) {
      return;
    }

    this.assistantReviewSubmitting = true;
    this.assistantChatService.reviewAction(action, approved, this.assistantReviewNote)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.assistantReviewSubmitting = false;
          this.assistantReviewDialogOpen = false;
          this.pendingAssistantAction = null;
          this.assistantReviewNote = '';
          this.assistantInfo.set(result.message || (approved ? 'Action approved.' : 'Action rejected.'));
          this.refreshInsights();
          if (approved) {
            this.navigateAssistantAction(action);
          }
        },
        error: () => {
          this.assistantReviewSubmitting = false;
          this.assistantError.set('Unable to submit review decision.');
        }
      });
  }

  protected cancelAssistantReview(): void {
    this.assistantReviewDialogOpen = false;
    this.pendingAssistantAction = null;
    this.assistantReviewNote = '';
  }

  protected undoAssistantAction(): void {
    if (!this.assistantUndoActivityId || this.assistantUndoBusy) {
      return;
    }

    this.assistantUndoBusy = true;
    this.assistantChatService.undoAction(this.assistantUndoActivityId, this.assistantUndoActionType ?? undefined)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.assistantUndoBusy = false;
          this.assistantUndoVisible = false;
          this.assistantUndoMessage = '';
          this.assistantUndoActivityId = null;
          this.assistantUndoActionType = null;
          if (this.assistantUndoTimerId !== null) {
            window.clearTimeout(this.assistantUndoTimerId);
            this.assistantUndoTimerId = null;
          }
          this.assistantInfo.set(result.message || 'Action undone.');
          this.refreshInsights();
        },
        error: () => {
          this.assistantUndoBusy = false;
          this.assistantError.set('Unable to undo action.');
        }
      });
  }

  protected formatAssistantMessage(content: string): string {
    if (!content) {
      return '';
    }

    let normalized = content.replace(/\r\n/g, '\n');
    normalized = normalized
      // Split inline numbered bullets into their own lines.
      .replace(/(\S)\s+(\d+[.)])\s*/g, '$1\n$2 ')
      // Split inline unordered bullets into their own lines.
      .replace(/(\S)\s+([-*•])\s*/g, '$1\n$2 ')
      // Normalize any marker that already starts a line.
      .replace(/(\n|^)(\d+[.)])\s*/g, '$1$2 ')
      .replace(/(\n|^)([-*•])\s*/g, '$1$2 ');
    normalized = normalized.trim();

    const lines = normalized.split('\n');
    type Block = { type: 'p'; text: string } | { type: 'ol' | 'ul'; items: string[] };
    const blocks: Block[] = [];
    const paragraphLines: string[] = [];

    const flushParagraph = () => {
      if (!paragraphLines.length) {
        return;
      }
      blocks.push({ type: 'p', text: paragraphLines.join(' ') });
      paragraphLines.length = 0;
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        continue;
      }

      const orderedMatch = trimmed.match(/^\d+[.)]\s*(.+)$/);
      const unorderedMatch = trimmed.match(/^[-*•]\s*(.+)$/);
      const listType = orderedMatch ? 'ol' : unorderedMatch ? 'ul' : null;
      const listItem = orderedMatch?.[1] ?? unorderedMatch?.[1];

      if (listType && listItem) {
        flushParagraph();
        const last = blocks[blocks.length - 1];
        if (last && last.type === listType) {
          last.items.push(listItem);
        } else {
          blocks.push({ type: listType, items: [listItem] });
        }
      } else {
        paragraphLines.push(trimmed);
      }
    }
    flushParagraph();

    return blocks
      .map((block) => {
        if (block.type === 'ol' || block.type === 'ul') {
          const items = block.items.map((item) => `<li>${this.formatInline(item)}</li>`).join('');
          const tag = block.type;
          return `<${tag} class=\"assistant-list\">${items}</${tag}>`;
        }
        const paragraph = block as Extract<Block, { type: 'p' }>;
        return `<p>${this.formatInline(paragraph.text)}</p>`;
      })
      .join('');
  }

  private formatInline(text: string): string {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  private buildAssistantGreeting(): string {
    const hours = new Date().getHours();
    const timeGreeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    const fullName = this.authService.currentUser()?.fullName ?? '';
    const firstName = fullName.trim().split(' ')[0] || 'there';
    return `Hi ${firstName}, ${timeGreeting}. How can I help you today? I can help with leads, accounts, opportunities, or activities. I’ll summarize and suggest next steps.`;
  }

  private refreshInsights(): void {
    this.assistantChatService.getInsights()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: insights => {
          this.assistantInsights.set(insights ?? this.emptyAssistantInsights);
        },
        error: () => {
          this.assistantInsights.set(this.emptyAssistantInsights);
        }
      });
  }

  private runTypewriter(messageId: string, fullText: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.updateMessage(messageId, { displayContent: fullText, isTyping: false });
      return;
    }

    const text = fullText ?? '';
    if (!text) {
      this.updateMessage(messageId, { displayContent: '', isTyping: false });
      return;
    }

    let index = 0;
    const step = () => {
      index = Math.min(index + 2, text.length);
      const snippet = text.slice(0, index);
      this.updateMessage(messageId, { displayContent: snippet });
      if (index >= text.length) {
        clearInterval(timerId);
        this.updateMessage(messageId, { isTyping: false });
      }
    };

    const timerId = window.setInterval(step, 24);
    step();
  }

  private updateMessage(id: string, patch: Partial<AssistantUiMessage>): void {
    this.assistantMessages.update(messages =>
      messages.map(message => (message.id === id ? { ...message, ...patch } : message))
    );
  }

  private buildLocalId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private handleRealtimeAssistantEvent(event: { eventType?: string; payload?: Record<string, unknown> | null }) {
    if (!this.crmEventsService.isFeatureEnabled('realtime.assistantStreaming')) {
      return;
    }

    if (!event?.eventType || !event.payload) {
      return;
    }

    const conversationId = String(event.payload['conversationId'] ?? '');
    if (!conversationId || !this.activeConversationId || conversationId !== this.activeConversationId || !this.activeConversationMessageId) {
      return;
    }

    if (event.eventType === 'assistant.chat.token') {
      const token = String(event.payload['token'] ?? '');
      if (!token) {
        return;
      }

      const messageId = this.activeConversationMessageId;
      const current = this.assistantMessages().find((message) => message.id === messageId);
      const next = `${current?.displayContent ?? ''}${token}`;
      this.updateMessage(messageId, { displayContent: next, content: next, isTyping: true });
      return;
    }

    if (event.eventType === 'assistant.chat.completed') {
      const messageId = this.activeConversationMessageId;
      const content = String(event.payload['content'] ?? '');
      const current = this.assistantMessages().find((message) => message.id === messageId);
      const resolved = content || current?.displayContent || current?.content || '';
      this.updateMessage(messageId, { displayContent: resolved, content: resolved, isTyping: false });
      this.assistantSending.set(false);
      this.activeConversationId = null;
      this.activeConversationMessageId = null;
      this.refreshInsights();
      return;
    }

    if (event.eventType === 'assistant.chat.failed') {
      const messageId = this.activeConversationMessageId;
      this.updateMessage(messageId, { isTyping: false });
      const error = String(event.payload['error'] ?? 'Assistant is unavailable right now. Please try again.');
      this.assistantError.set(error);
      this.assistantSending.set(false);
      this.activeConversationId = null;
      this.activeConversationMessageId = null;
    }
  }

  private navigateAssistantAction(action: AssistantInsightsAction): void {
    const entityType = (action.entityType ?? '').toLowerCase();
    if (entityType === 'lead') {
      this.router.navigate(['/app/leads']);
      return;
    }
    if (entityType === 'opportunity') {
      this.router.navigate(['/app/opportunities']);
      return;
    }
    if (entityType === 'activity') {
      this.router.navigate(['/app/activities']);
      return;
    }
    if (entityType === 'approval') {
      this.router.navigate(['/app/settings/approvals']);
      return;
    }

    this.router.navigate(['/app/dashboard']);
  }

  private showAssistantUndo(action: AssistantInsightsAction, createdActivityId: string): void {
    this.assistantUndoVisible = true;
    this.assistantUndoBusy = false;
    this.assistantUndoActivityId = createdActivityId;
    this.assistantUndoActionType = action.actionType;
    this.assistantUndoMessage = `${action.title} executed.`;
    if (this.assistantUndoTimerId !== null) {
      window.clearTimeout(this.assistantUndoTimerId);
    }
    this.assistantUndoTimerId = window.setTimeout(() => {
      this.assistantUndoVisible = false;
      this.assistantUndoActivityId = null;
      this.assistantUndoActionType = null;
      this.assistantUndoMessage = '';
      this.assistantUndoTimerId = null;
    }, 60_000);
  }
}

interface AssistantUiMessage extends AssistantChatMessage {
  displayContent?: string;
  isTyping?: boolean;
}
