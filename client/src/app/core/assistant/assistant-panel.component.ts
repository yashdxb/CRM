import { NgFor, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AssistantService } from './assistant.service';
import { AssistantChatMessage, AssistantChatService } from './assistant-chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-assistant-panel',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DragDropModule],
  templateUrl: './assistant-panel.component.html',
  styleUrl: './assistant-panel.component.scss'
})
export class AssistantPanelComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly assistantService = inject(AssistantService);
  private readonly assistantChatService = inject(AssistantChatService);
  private readonly authService = inject(AuthService);

  protected readonly assistantVisible = this.assistantService.isVisible;
  protected readonly assistantCollapsed = this.assistantService.isCollapsed;
  protected readonly assistantMessages = signal<AssistantChatMessage[]>([]);
  protected readonly assistantInput = signal('');
  protected readonly assistantSending = signal(false);
  protected readonly assistantError = signal<string | null>(null);
  protected readonly historyLoaded = signal(false);
  protected readonly historyLoading = signal(false);
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

    this.assistantSending.set(true);
    this.assistantError.set(null);
    this.assistantInput.set('');

    this.assistantChatService.sendMessage(message).subscribe({
      next: response => {
        this.assistantMessages.set(response.messages ?? []);
        this.assistantSending.set(false);
      },
      error: err => {
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
        this.assistantMessages.set(messages ?? []);
        this.historyLoaded.set(true);
        this.historyLoading.set(false);
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

  constructor() {}

  protected formatAssistantMessage(content: string): string {
    if (!content) {
      return '';
    }

    let normalized = content.replace(/\r\n/g, '\n');
    normalized = normalized.replace(/(\s|^)(\d+)\.\s+/g, '\n$2. ');
    normalized = normalized.trim();

    const lines = normalized.split('\n').map((line) => line.trim()).filter(Boolean);
    type Block = { type: 'p'; text: string } | { type: 'list'; items: string[] };
    const blocks: Block[] = [];

    for (const line of lines) {
      const listMatch = line.match(/^\d+\.\s+(.*)$/);
      if (listMatch) {
        const item = listMatch[1];
        const last = blocks[blocks.length - 1];
        if (last && last.type === 'list') {
          last.items.push(item);
        } else {
          blocks.push({ type: 'list', items: [item] });
        }
      } else {
        blocks.push({ type: 'p', text: line });
      }
    }

    return blocks
      .map((block) => {
        if (block.type === 'list') {
          const items = block.items.map((item) => `<li>${this.formatInline(item)}</li>`).join('');
          return `<ol class=\"assistant-list\">${items}</ol>`;
        }
        return `<p>${this.formatInline(block.text)}</p>`;
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
}
