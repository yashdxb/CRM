import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LeadAssignmentRule, UpsertLeadAssignmentRuleRequest } from '../models/lead-assignment.model';

@Injectable({ providedIn: 'root' })
export class LeadAssignmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getRules() {
    return this.http.get<LeadAssignmentRule[]>(`${this.baseUrl}/api/leads/assignment-rules`);
  }

  create(payload: UpsertLeadAssignmentRuleRequest) {
    return this.http.post<LeadAssignmentRule>(`${this.baseUrl}/api/leads/assignment-rules`, payload);
  }

  update(id: string, payload: UpsertLeadAssignmentRuleRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/leads/assignment-rules/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/leads/assignment-rules/${id}`);
  }
}
