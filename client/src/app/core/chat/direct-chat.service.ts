import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface DirectChatParticipantItem {
  userId: string;
  displayName: string;
  email: string;
}

export interface DirectChatThreadItem {
  threadId: string;
  title: string | null;
  lastMessageAtUtc: string;
  isArchived: boolean;
  lastClearedAtUtc: string | null;
  participants: DirectChatParticipantItem[];
}

export interface DirectChatMessageItem {
  messageId: string;
  threadId: string;
  senderUserId: string;
  senderDisplayName: string;
  content: string;
  sentAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class DirectChatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  openThread(participantUserIds: string[]) {
    return this.http.post<DirectChatThreadItem>(`${this.baseUrl}/api/chat/threads/open`, {
      participantUserIds
    });
  }

  listThreads() {
    return this.http.get<DirectChatThreadItem[]>(`${this.baseUrl}/api/chat/threads`);
  }

  getMessages(threadId: string, take = 200) {
    return this.http.get<DirectChatMessageItem[]>(`${this.baseUrl}/api/chat/threads/${threadId}/messages`, {
      params: { take: String(take) }
    });
  }

  sendMessage(threadId: string, message: string) {
    return this.http.post<DirectChatMessageItem>(`${this.baseUrl}/api/chat/threads/${threadId}/messages`, { message });
  }

  archiveThread(threadId: string, archived: boolean) {
    return this.http.post<void>(`${this.baseUrl}/api/chat/threads/${threadId}/archive`, { archived });
  }

  clearThread(threadId: string) {
    return this.http.post<void>(`${this.baseUrl}/api/chat/threads/${threadId}/clear`, {});
  }

  addParticipant(threadId: string, userId: string) {
    return this.http.post<void>(`${this.baseUrl}/api/chat/threads/${threadId}/participants`, { userId });
  }

  sendTyping(threadId: string, isTyping: boolean) {
    return this.http.post<void>(`${this.baseUrl}/api/chat/threads/${threadId}/typing`, { isTyping });
  }
}
