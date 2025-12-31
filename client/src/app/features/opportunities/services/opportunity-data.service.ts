import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Opportunity,
  OpportunityStageHistoryItem,
  OpportunitySearchRequest,
  OpportunitySearchResponse
} from '../models/opportunity.model';

export interface SaveOpportunityRequest {
  name: string;
  accountId?: string;
  primaryContactId?: string;
  stageId?: string;
  stageName?: string;
  amount?: number;
  currency?: string;
  probability?: number;
  expectedCloseDate?: string;
  summary?: string;
  isClosed?: boolean;
  isWon?: boolean;
  winLossReason?: string | null;
}

@Injectable({ providedIn: 'root' })
export class OpportunityDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(request: OpportunitySearchRequest) {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.stage) params = params.set('stage', request.stage);
    if (request.accountId) params = params.set('accountId', request.accountId);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);

    return this.http.get<OpportunitySearchResponse>(`${this.baseUrl}/api/opportunities`, { params });
  }

  create(payload: SaveOpportunityRequest) {
    return this.http.post<Opportunity>(`${this.baseUrl}/api/opportunities`, payload);
  }

  update(id: string, payload: SaveOpportunityRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/opportunities/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/opportunities/${id}`);
  }

  getHistory(id: string) {
    return this.http.get<OpportunityStageHistoryItem[]>(`${this.baseUrl}/api/opportunities/${id}/history`);
  }

  updateOwner(id: string, ownerId: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/opportunities/${id}/owner`, {
      ownerId
    });
  }

  updateStage(id: string, stage: string) {
    return this.http.patch<void>(`${this.baseUrl}/api/opportunities/${id}/stage`, {
      stage
    });
  }
}
