import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  Opportunity,
  ExpansionSignal,
  OpportunityReviewThreadItem,
  OpportunityStageHistoryItem,
  OpportunitySearchRequest,
  OpportunitySearchResponse,
  OpportunityTeamMember,
  UpdateOpportunityTeamRequest
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
  contractStartDateUtc?: string | null;
  contractEndDateUtc?: string | null;
  forecastCategory?: string | null;
  opportunityType?: string | null;
  summary?: string;
  requirements?: string | null;
  buyingProcess?: string | null;
  successCriteria?: string | null;
  discountPercent?: number | null;
  discountAmount?: number | null;
  pricingNotes?: string | null;
  securityReviewStatus?: string | null;
  securityNotes?: string | null;
  legalReviewStatus?: string | null;
  legalNotes?: string | null;
  proposalStatus?: string | null;
  proposalNotes?: string | null;
  proposalLink?: string | null;
  proposalGeneratedAtUtc?: string | Date | null;
  proposalSentAtUtc?: string | Date | null;
  deliveryOwnerId?: string | null;
  deliveryHandoffScope?: string | null;
  deliveryHandoffRisks?: string | null;
  deliveryHandoffTimeline?: string | null;
  deliveryStatus?: string | null;
  deliveryCompletedAtUtc?: string | null;
  isClosed?: boolean;
  isWon?: boolean;
  winLossReason?: string | null;
}

export interface OpportunityReviewOutcomeRequest {
  outcome: 'Approved' | 'Needs Work' | 'Escalated';
  comment?: string | null;
  acknowledgmentDueAtUtc?: string | null;
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
    if (request.missingNextStep) params = params.set('missingNextStep', 'true');
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

  getById(id: string) {
    return this.http.get<Opportunity>(`${this.baseUrl}/api/opportunities/${id}`);
  }

  getReviewThread(id: string) {
    return this.http.get<OpportunityReviewThreadItem[]>(`${this.baseUrl}/api/opportunities/${id}/review-thread`);
  }

  addReviewOutcome(id: string, payload: OpportunityReviewOutcomeRequest) {
    return this.http.post<OpportunityReviewThreadItem>(`${this.baseUrl}/api/opportunities/${id}/review-outcome`, payload);
  }

  acknowledgeReview(id: string) {
    return this.http.post<OpportunityReviewThreadItem>(`${this.baseUrl}/api/opportunities/${id}/review-ack`, {});
  }

  getTeam(id: string) {
    return this.http.get<OpportunityTeamMember[]>(`${this.baseUrl}/api/opportunities/${id}/team`);
  }

  updateTeam(id: string, payload: UpdateOpportunityTeamRequest) {
    return this.http.put<OpportunityTeamMember[]>(`${this.baseUrl}/api/opportunities/${id}/team`, payload);
  }

  getExpansionSignals() {
    return this.http.get<ExpansionSignal[]>(`${this.baseUrl}/api/opportunities/expansion-signals`);
  }

  createExpansion(opportunityId: string) {
    return this.http.post<Opportunity>(`${this.baseUrl}/api/opportunities/${opportunityId}/expansion`, {});
  }
}
