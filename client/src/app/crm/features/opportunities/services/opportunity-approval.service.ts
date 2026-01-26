import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  OpportunityApprovalDecisionRequest,
  OpportunityApprovalInboxItem,
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

  getInbox(status?: string, purpose?: string) {
    const params: Record<string, string> = {};
    if (status) params['status'] = status;
    if (purpose) params['purpose'] = purpose;
    return this.http.get<OpportunityApprovalInboxItem[]>(
      `${this.baseUrl}/api/opportunity-approvals`,
      { params }
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
