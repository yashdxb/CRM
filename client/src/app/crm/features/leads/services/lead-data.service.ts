import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CsvImportJob } from '../../../../shared/models/csv-import.model';
import {
  Lead,
  LeadAssignmentStrategy,
  LeadConversionRequest,
  LeadConversionResponse,
  LeadCadenceChannel,
  LeadCadenceChannelOption,
  LeadCadenceTouch,
  LeadSearchRequest,
  LeadSearchResponse,
  LeadStatus,
  LeadStatusHistoryItem
} from '../models/lead.model';

export interface SaveLeadRequest {
  firstName: string;
  lastName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  status?: LeadStatus;
  ownerId?: string;
  assignmentStrategy?: LeadAssignmentStrategy;
  source?: string;
  territory?: string;
  autoScore?: boolean;
  score?: number;
  disqualifiedReason?: string;
  lossReason?: string;
  lossCompetitor?: string;
  lossNotes?: string;
  nurtureFollowUpAtUtc?: string | Date | null;
  qualifiedNotes?: string;
  budgetAvailability?: string;
  budgetEvidence?: string;
  readinessToSpend?: string;
  readinessEvidence?: string;
  buyingTimeline?: string;
  timelineEvidence?: string;
  problemSeverity?: string;
  problemEvidence?: string;
  economicBuyer?: string;
  economicBuyerEvidence?: string;
  icpFit?: string;
  icpFitEvidence?: string;
}

export interface LeadAiScoreResponse {
  score: number;
  confidence: number;
  rationale: string;
  scoredAtUtc: string;
}

@Injectable({ providedIn: 'root' })
export class LeadDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: LeadSearchRequest) {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.status) params = params.set('status', request.status);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);

    return this.http.get<LeadSearchResponse>(`${this.baseUrl}/api/leads`, { params });
  }

  get(id: string) {
    return this.http.get<Lead>(`${this.baseUrl}/api/leads/${id}`);
  }

  getStatusHistory(id: string) {
    return this.http.get<LeadStatusHistoryItem[]>(`${this.baseUrl}/api/leads/${id}/status-history`);
  }

  getCadenceTouches(id: string) {
    return this.http.get<LeadCadenceTouch[]>(`${this.baseUrl}/api/leads/${id}/cadence-touches`);
  }

  getCadenceChannels() {
    return this.http.get<LeadCadenceChannelOption[]>(`${this.baseUrl}/api/leads/cadence-channels`);
  }

  create(payload: SaveLeadRequest) {
    return this.http.post<Lead>(`${this.baseUrl}/api/leads`, payload);
  }

  update(id: string, payload: SaveLeadRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/leads/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/leads/${id}`);
  }

  bulkAssignOwner(ids: string[], ownerId: string) {
    return this.http.post<void>(`${this.baseUrl}/api/leads/bulk-assign-owner`, {
      ids,
      ownerId
    });
  }

  bulkUpdateStatus(ids: string[], status: LeadStatus) {
    return this.http.post<void>(`${this.baseUrl}/api/leads/bulk-update-status`, {
      ids,
      status
    });
  }

  updateOwner(id: string, ownerId: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/leads/${id}/owner`, {
      ownerId
    });
  }

  updateStatus(id: string, status: LeadStatus) {
    return this.http.patch<void>(`${this.baseUrl}/api/leads/${id}/status`, {
      status
    });
  }

  logCadenceTouch(id: string, payload: { channel: LeadCadenceChannel; outcome: string; nextStepDueAtUtc: string | Date }) {
    return this.http.post<LeadCadenceTouch>(`${this.baseUrl}/api/leads/${id}/cadence-touch`, payload);
  }

  aiScore(id: string) {
    return this.http.post<LeadAiScoreResponse>(`${this.baseUrl}/api/leads/${id}/ai-score`, {});
  }

  convert(id: string, payload: LeadConversionRequest) {
    return this.http.post<LeadConversionResponse>(`${this.baseUrl}/api/leads/${id}/convert`, payload);
  }

  importCsv(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CsvImportJob>(`${this.baseUrl}/api/leads/import/queue`, formData);
  }
}
