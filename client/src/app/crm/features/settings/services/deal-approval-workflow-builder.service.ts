import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DealApprovalWorkflow, UpdateDealApprovalWorkflow } from '../models/deal-approval-workflow.model';

@Injectable({ providedIn: 'root' })
export class DealApprovalWorkflowBuilderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getWorkflow() {
    return this.http.get<DealApprovalWorkflow>(`${this.baseUrl}/api/workflows/deal-approval`);
  }

  updateWorkflow(payload: UpdateDealApprovalWorkflow) {
    return this.http.put<DealApprovalWorkflow>(`${this.baseUrl}/api/workflows/deal-approval`, payload);
  }
}
