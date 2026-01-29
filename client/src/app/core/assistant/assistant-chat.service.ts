import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export type AssistantRole = 'assistant' | 'user';

export interface AssistantChatMessage {
  id: string;
  role: AssistantRole;
  content: string;
  createdAtUtc: string;
}

export interface AssistantChatResponse {
  reply: string;
  messages: AssistantChatMessage[];
}

@Injectable({ providedIn: 'root' })
export class AssistantChatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getHistory(take = 50) {
    return this.http.get<AssistantChatMessage[]>(`${this.baseUrl}/api/assistant/history`, {
      params: { take }
    });
  }

  sendMessage(message: string) {
    return this.http.post<AssistantChatResponse>(`${this.baseUrl}/api/assistant/chat`, {
      message
    });
  }
}
