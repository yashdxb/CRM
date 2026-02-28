import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  AttributionExplainability,
  AttributionSummaryItem,
  CampaignDetailResponse,
  CampaignHealthScore,
  CampaignMember,
  RecommendationPilotMetrics,
  CampaignRecommendation,
  CampaignSearchResponse,
  RecommendationDecisionRequest,
  SaveCampaignMemberRequest,
  SaveCampaignRequest
} from '../models/marketing.model';

@Injectable({ providedIn: 'root' })
export class MarketingDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  searchCampaigns(request: {
    search?: string;
    status?: string;
    channel?: string;
    ownerUserId?: string;
    page?: number;
    pageSize?: number;
  }) {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.status) params = params.set('status', request.status);
    if (request.channel) params = params.set('channel', request.channel);
    if (request.ownerUserId) params = params.set('ownerUserId', request.ownerUserId);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);

    return this.http.get<CampaignSearchResponse>(`${this.baseUrl}/api/marketing/campaigns`, { params });
  }

  getCampaign(id: string) {
    return this.http.get<CampaignDetailResponse>(`${this.baseUrl}/api/marketing/campaigns/${id}`);
  }

  createCampaign(payload: SaveCampaignRequest) {
    return this.http.post(`${this.baseUrl}/api/marketing/campaigns`, payload);
  }

  updateCampaign(id: string, payload: SaveCampaignRequest) {
    return this.http.put(`${this.baseUrl}/api/marketing/campaigns/${id}`, payload);
  }

  archiveCampaign(id: string) {
    return this.http.post(`${this.baseUrl}/api/marketing/campaigns/${id}/archive`, {});
  }

  addCampaignMember(campaignId: string, payload: SaveCampaignMemberRequest) {
    return this.http.post<CampaignMember>(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/members`, payload);
  }

  removeCampaignMember(campaignId: string, memberId: string) {
    return this.http.delete(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/members/${memberId}`);
  }

  getCampaignPerformance(campaignId: string) {
    return this.http.get(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/performance`);
  }

  getAttributionSummary() {
    return this.http.get<AttributionSummaryItem[]>(`${this.baseUrl}/api/marketing/attribution/summary`);
  }

  getCampaignHealthScore(campaignId: string) {
    return this.http.get<CampaignHealthScore>(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/health-score`);
  }

  getCampaignRecommendations(campaignId: string) {
    return this.http.get<CampaignRecommendation[]>(`${this.baseUrl}/api/marketing/campaigns/${campaignId}/recommendations`);
  }

  applyRecommendationDecision(recommendationId: string, payload: RecommendationDecisionRequest) {
    return this.http.post<CampaignRecommendation>(`${this.baseUrl}/api/marketing/recommendations/${recommendationId}/decision`, payload);
  }

  explainOpportunityAttribution(opportunityId: string) {
    return this.http.get<AttributionExplainability>(`${this.baseUrl}/api/marketing/attribution/opportunities/${opportunityId}/explain`);
  }

  getRecommendationPilotMetrics() {
    return this.http.get<RecommendationPilotMetrics>(`${this.baseUrl}/api/marketing/recommendations/pilot-metrics`);
  }
}
