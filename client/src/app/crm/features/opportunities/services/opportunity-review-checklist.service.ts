import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { OpportunityReviewChecklistItem } from '../models/opportunity.model';

export interface SaveOpportunityReviewChecklistItem {
  title: string;
  status?: string | null;
  notes?: string | null;
  type?: 'Security' | 'Legal';
}

@Injectable({ providedIn: 'root' })
export class OpportunityReviewChecklistService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  get(opportunityId: string, type?: 'Security' | 'Legal') {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    return this.http.get<OpportunityReviewChecklistItem[]>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/review-checklist`,
      { params }
    );
  }

  create(opportunityId: string, payload: SaveOpportunityReviewChecklistItem) {
    return this.http.post<OpportunityReviewChecklistItem>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/review-checklist`,
      payload
    );
  }

  update(itemId: string, payload: SaveOpportunityReviewChecklistItem) {
    return this.http.patch<OpportunityReviewChecklistItem>(
      `${this.baseUrl}/api/opportunity-review-checklist/${itemId}`,
      payload
    );
  }

  delete(itemId: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/opportunity-review-checklist/${itemId}`);
  }
}
