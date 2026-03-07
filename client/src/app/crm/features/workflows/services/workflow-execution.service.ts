import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { WorkflowExecutionHistoryItem, WorkflowExecutionStatus } from '../models/workflow-definition.model';

@Injectable({ providedIn: 'root' })
export class WorkflowExecutionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getDealApprovalStatus() {
    return this.http.get<WorkflowExecutionStatus>(`${this.baseUrl}/api/workflows/executions/deal-approval/status`);
  }

  getDealApprovalHistory(take = 50) {
    return this.http.get<WorkflowExecutionHistoryItem[]>(
      `${this.baseUrl}/api/workflows/executions/deal-approval/history?take=${take}`
    );
  }
}
