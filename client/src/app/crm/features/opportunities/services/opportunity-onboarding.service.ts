import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { OpportunityOnboardingItem } from '../models/opportunity.model';

export interface SaveOpportunityOnboardingItem {
  type: 'Checklist' | 'Milestone';
  title: string;
  status?: string | null;
  dueDateUtc?: string | Date | null;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class OpportunityOnboardingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  get(opportunityId: string, type?: 'Checklist' | 'Milestone') {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    return this.http.get<OpportunityOnboardingItem[]>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/onboarding`,
      { params }
    );
  }

  create(opportunityId: string, payload: SaveOpportunityOnboardingItem) {
    return this.http.post<OpportunityOnboardingItem>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/onboarding`,
      payload
    );
  }

  update(itemId: string, payload: SaveOpportunityOnboardingItem) {
    return this.http.patch<OpportunityOnboardingItem>(
      `${this.baseUrl}/api/opportunity-onboarding/${itemId}`,
      payload
    );
  }

  delete(itemId: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/opportunity-onboarding/${itemId}`);
  }
}
