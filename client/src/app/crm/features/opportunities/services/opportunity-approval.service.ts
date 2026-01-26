import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  OpportunityApprovalDecisionRequest,
  OpportunityApprovalItem,
  OpportunityApprovalRequest
} from '../models/opportunity.model';

@Injectable({ providedIn: 'root' })
export class OpportunityApprovalService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getForOpportunity(opportunityId: string) {
    return this.http.get<OpportunityApprovalItem[]>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/approvals`
    );
  }

  requestApproval(opportunityId: string, payload: OpportunityApprovalRequest) {
    return this.http.post<OpportunityApprovalItem>(
      `${this.baseUrl}/api/opportunities/${opportunityId}/approvals`,
      payload
    );
  }

  decide(approvalId: string, payload: OpportunityApprovalDecisionRequest) {
    return this.http.patch<OpportunityApprovalItem>(
      `${this.baseUrl}/api/opportunity-approvals/${approvalId}`,
      payload
    );
  }
}
