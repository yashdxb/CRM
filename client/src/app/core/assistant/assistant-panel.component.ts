import { NgFor, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
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
  protected readonly assistantLoaded = signal(false);
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
        this.assistantLoaded.set(true);
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

  protected onAssistantInputKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendAssistantMessage();
    }
  }

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      if (!this.assistantVisible()) {
        return;
      }

      if (this.assistantLoaded()) {
        return;
      }

      this.assistantChatService.getHistory().subscribe({
        next: messages => {
          this.assistantMessages.set(messages ?? []);
          this.assistantLoaded.set(true);
        },
        error: () => {
          this.assistantError.set('Unable to load assistant history.');
          this.assistantLoaded.set(true);
        }
      });
    });
  }

  private buildAssistantGreeting(): string {
    const hours = new Date().getHours();
    const timeGreeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    const fullName = this.authService.currentUser()?.fullName ?? '';
    const firstName = fullName.trim().split(' ')[0] || 'there';
    return `Hi ${firstName}, ${timeGreeting}. How can I help you today? I can help with leads, accounts, opportunities, or activities. I’ll summarize and suggest next steps.`;
  }
}
