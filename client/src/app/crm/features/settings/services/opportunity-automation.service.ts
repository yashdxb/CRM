import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  OpportunityStageAutomationRule,
  OpportunityStageAutomationRuleRequest
} from '../models/opportunity-automation.model';

@Injectable({ providedIn: 'root' })
export class OpportunityAutomationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getRules() {
    return this.http.get<OpportunityStageAutomationRule[]>(`${this.baseUrl}/api/opportunities/automation-rules`);
  }

  createRule(payload: OpportunityStageAutomationRuleRequest) {
    return this.http.post<OpportunityStageAutomationRule>(`${this.baseUrl}/api/opportunities/automation-rules`, payload);
  }

  updateRule(id: string, payload: OpportunityStageAutomationRuleRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/opportunities/automation-rules/${id}`, payload);
  }

  deleteRule(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/opportunities/automation-rules/${id}`);
  }
}
