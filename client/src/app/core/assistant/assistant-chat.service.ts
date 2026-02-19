import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SKIP_LOADING_OVERLAY } from '../loading/loading-overlay.context';

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

export interface AssistantInsightsKpi {
  key: string;
  label: string;
  value: number;
  severity: 'ok' | 'warn' | 'danger' | string;
}

export interface AssistantInsightsAction {
  id: string;
  title: string;
  description: string;
  riskTier: 'low' | 'medium' | 'high' | string;
  ownerScope: string;
  dueWindow: string;
  actionType: string;
  entityType?: string | null;
  entityId?: string | null;
  priority: number;
}

export interface AssistantInsights {
  scope: string;
  kpis: AssistantInsightsKpi[];
  actions: AssistantInsightsAction[];
  generatedAtUtc: string;
}

export interface AssistantActionExecutionResult {
  status: string;
  message: string;
  requiresReview: boolean;
  createdActivityId?: string | null;
  createdApprovalId?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AssistantChatService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly skipOverlayContext = new HttpContext().set(SKIP_LOADING_OVERLAY, true);

  getHistory(take = 50) {
    return this.http.get<AssistantChatMessage[]>(`${this.baseUrl}/api/assistant/history`, {
      params: { take },
      context: this.skipOverlayContext
    });
  }

  sendMessage(message: string) {
    return this.http.post<AssistantChatResponse>(`${this.baseUrl}/api/assistant/chat`, {
      message
    }, {
      context: this.skipOverlayContext
    });
  }

  getInsights() {
    return this.http.get<AssistantInsights>(`${this.baseUrl}/api/assistant/insights`, {
      context: this.skipOverlayContext
    });
  }

  executeAction(action: AssistantInsightsAction, note?: string) {
    return this.http.post<AssistantActionExecutionResult>(`${this.baseUrl}/api/assistant/actions/execute`, {
      actionId: action.id,
      actionType: action.actionType,
      riskTier: action.riskTier,
      entityType: action.entityType ?? null,
      entityId: action.entityId ?? null,
      note: note ?? null
    }, {
      context: this.skipOverlayContext
    });
  }

  reviewAction(action: AssistantInsightsAction, approved: boolean, reviewNote?: string) {
    return this.http.post<AssistantActionExecutionResult>(`${this.baseUrl}/api/assistant/actions/review`, {
      actionId: action.id,
      actionType: action.actionType,
      riskTier: action.riskTier,
      entityType: action.entityType ?? null,
      entityId: action.entityId ?? null,
      approved,
      reviewNote: reviewNote ?? null
    }, {
      context: this.skipOverlayContext
    });
  }

  undoAction(createdActivityId: string, actionType?: string) {
    return this.http.post<AssistantActionExecutionResult>(`${this.baseUrl}/api/assistant/actions/undo`, {
      createdActivityId,
      actionType: actionType ?? null
    }, {
      context: this.skipOverlayContext
    });
  }
}
