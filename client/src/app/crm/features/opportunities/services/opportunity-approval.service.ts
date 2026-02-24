import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  DecisionAssistDraft,
  DecisionHistoryItem,
  OpportunityApprovalDecisionRequest,
  OpportunityApprovalInboxItem,
  OpportunityApprovalItem,
  OpportunityApprovalRequest
} from '../models/opportunity.model';

interface DecisionInboxApiStep {
  stepOrder: number;
  stepType: string;
  status: string;
  assigneeUserId?: string | null;
  assigneeName?: string | null;
  approverRole?: string | null;
  dueAtUtc?: string | null;
  completedAtUtc?: string | null;
}

interface DecisionInboxApiItem {
  id: string;
  decisionType: string;
  workflowType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  parentEntityName?: string | null;
  status: OpportunityApprovalInboxItem['status'] | string;
  purpose: string;
  priority: string;
  riskLevel: string;
  slaStatus: string;
  slaDueAtUtc?: string | null;
  isEscalated: boolean;
  requestedAgeHours: number;
  policyReason: string;
  businessImpactLabel: string;
  amount: number;
  currency: string;
  requestedByUserId?: string | null;
  requestedByName?: string | null;
  assigneeUserId?: string | null;
  assigneeName?: string | null;
  requestedOn: string;
  decisionOn?: string | null;
  notes?: string | null;
  currentStepOrder: number;
  totalSteps: number;
  stepRole?: string | null;
  chainStatus?: string | null;
  steps: DecisionInboxApiStep[];
}

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
    return this.http.get<DecisionInboxApiItem[]>(
      `${this.baseUrl}/api/decisions/inbox`,
      { params }
    ).pipe(
      // Keep the existing UI model stable while backend transitions to generic decision contracts.
      map((items) => (items ?? []).map((item) => this.mapDecisionInboxItem(item)))
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

  decideDecision(decisionId: string, payload: OpportunityApprovalDecisionRequest) {
    return this.http.patch<DecisionInboxApiItem>(
      `${this.baseUrl}/api/decisions/${decisionId}/decision`,
      payload
    ).pipe(map((item) => this.mapDecisionInboxItem(item)));
  }

  generateDecisionAssistDraft(decisionId: string) {
    return this.http.post<DecisionAssistDraft>(
      `${this.baseUrl}/api/decisions/${decisionId}/assist-draft`,
      {}
    );
  }

  getDecisionHistory(filters?: {
    action?: string;
    status?: string;
    decisionType?: string;
    search?: string;
    take?: number;
  }) {
    const params: Record<string, string> = {};
    if (filters?.action) params['action'] = filters.action;
    if (filters?.status) params['status'] = filters.status;
    if (filters?.decisionType) params['decisionType'] = filters.decisionType;
    if (filters?.search) params['search'] = filters.search;
    if (typeof filters?.take === 'number') params['take'] = String(filters.take);

    return this.http.get<DecisionHistoryItem[]>(
      `${this.baseUrl}/api/decisions/history`,
      { params }
    );
  }

  private mapDecisionInboxItem(item: DecisionInboxApiItem): OpportunityApprovalInboxItem {
    return {
      id: item.id,
      opportunityId: item.entityId,
      opportunityName: item.entityName,
      accountName: item.parentEntityName ?? '—',
      status: (item.status as OpportunityApprovalInboxItem['status']) ?? 'Pending',
      purpose: item.purpose,
      approverRole: item.stepRole ?? item.steps?.find((step) => step.stepOrder === item.currentStepOrder)?.approverRole ?? 'Approver',
      approvalChainId: null,
      stepOrder: item.currentStepOrder,
      totalSteps: item.totalSteps,
      chainStatus: item.chainStatus ?? item.status,
      approverUserId: item.assigneeUserId,
      approverName: item.assigneeName,
      requestedByUserId: item.requestedByUserId,
      requestedByName: item.requestedByName,
      requestedOn: item.requestedOn,
      decisionOn: item.decisionOn,
      notes: item.notes,
      amount: item.amount,
      currency: item.currency,
      decisionType: item.decisionType,
      priority: item.priority,
      riskLevel: item.riskLevel,
      slaStatus: item.slaStatus as OpportunityApprovalInboxItem['slaStatus'],
      slaDueAtUtc: item.slaDueAtUtc,
      isEscalated: item.isEscalated,
      requestedAgeHours: item.requestedAgeHours,
      policyReason: item.policyReason,
      businessImpactLabel: item.businessImpactLabel
    };
  }
}
