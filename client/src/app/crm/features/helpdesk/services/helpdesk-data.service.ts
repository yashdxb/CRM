import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  HelpDeskCaseDetailResponse,
  HelpDeskCaseSearchResponse,
  HelpDeskQueue,
  HelpDeskSlaPolicy,
  HelpDeskSummary,
  HelpDeskUserLookup,
  SaveHelpDeskCaseRequest
} from '../models/helpdesk.model';

@Injectable({ providedIn: 'root' })
export class HelpDeskDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  searchCases(request: {
    search?: string;
    status?: string;
    priority?: string;
    severity?: string;
    queueId?: string;
    ownerUserId?: string;
    source?: string;
    page?: number;
    pageSize?: number;
  }) {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.status) params = params.set('status', request.status);
    if (request.priority) params = params.set('priority', request.priority);
    if (request.severity) params = params.set('severity', request.severity);
    if (request.queueId) params = params.set('queueId', request.queueId);
    if (request.ownerUserId) params = params.set('ownerUserId', request.ownerUserId);
    if (request.source) params = params.set('source', request.source);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);
    return this.http.get<HelpDeskCaseSearchResponse>(`${this.baseUrl}/api/helpdesk/cases`, { params });
  }

  getCase(id: string) {
    return this.http.get<HelpDeskCaseDetailResponse>(`${this.baseUrl}/api/helpdesk/cases/${id}`);
  }

  createCase(payload: SaveHelpDeskCaseRequest) {
    return this.http.post(`${this.baseUrl}/api/helpdesk/cases`, payload);
  }

  updateCase(id: string, payload: SaveHelpDeskCaseRequest) {
    return this.http.put(`${this.baseUrl}/api/helpdesk/cases/${id}`, payload);
  }

  assignCase(id: string, queueId?: string | null, ownerUserId?: string | null) {
    return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/assign`, { queueId, ownerUserId });
  }

  updateStatus(id: string, status: string, note?: string | null) {
    return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/status`, { status, note });
  }

  addComment(id: string, body: string, isInternal = true, attachmentIds: string[] = []) {
    return this.http.post(`${this.baseUrl}/api/helpdesk/cases/${id}/comments`, { body, isInternal, attachmentIds });
  }

  listQueues() {
    return this.http.get<HelpDeskQueue[]>(`${this.baseUrl}/api/helpdesk/queues`);
  }

  lookupActiveUsers(search?: string, max = 200) {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (max) params = params.set('max', String(max));
    return this.http.get<HelpDeskUserLookup[]>(`${this.baseUrl}/api/users/lookup`, { params });
  }

  createQueue(payload: { name: string; description?: string | null; isActive: boolean; memberUserIds?: string[] }) {
    return this.http.post(`${this.baseUrl}/api/helpdesk/queues`, payload);
  }

  updateQueue(id: string, payload: { name: string; description?: string | null; isActive: boolean; memberUserIds?: string[] }) {
    return this.http.put(`${this.baseUrl}/api/helpdesk/queues/${id}`, payload);
  }

  listSlaPolicies() {
    return this.http.get<HelpDeskSlaPolicy[]>(`${this.baseUrl}/api/helpdesk/sla-policies`);
  }

  updateSlaPolicy(id: string, payload: Partial<HelpDeskSlaPolicy>) {
    return this.http.put(`${this.baseUrl}/api/helpdesk/sla-policies/${id}`, payload);
  }

  getSummary() {
    return this.http.get<HelpDeskSummary>(`${this.baseUrl}/api/helpdesk/reports/summary`);
  }
}
