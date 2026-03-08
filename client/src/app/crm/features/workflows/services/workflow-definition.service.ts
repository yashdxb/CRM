import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  DealApprovalWorkflowDefinition,
  WorkflowDefinitionResponse,
  WorkflowValidationResponse
} from '../models/workflow-definition.model';

@Injectable({ providedIn: 'root' })
export class WorkflowDefinitionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly workflowKey = 'deal-approval';
  private readonly legacyUrl = `${this.baseUrl}/api/workflows/deal-approval`;

  getRoleOptions() {
    return this.http.get<Array<{ id: string; name: string }>>(`${this.baseUrl}/api/roles`);
  }

  getDealApprovalDefinition() {
    return this.http
      .get<WorkflowDefinitionResponse>(`${this.baseUrl}/api/workflows/definitions/${this.workflowKey}`)
      .pipe(
        map((response) => {
          const parsed = this.parseDefinitionJson(response.definitionJson);
          return {
            definition: parsed,
            isActive: response.isActive,
            updatedAtUtc: response.updatedAtUtc,
            publishedDefinitionJson: response.publishedDefinitionJson ?? null,
            publishedAtUtc: response.publishedAtUtc ?? null,
            publishedBy: response.publishedBy ?? null
          };
        }),
        catchError(() => {
          return this.http.get<DealApprovalWorkflowDefinition>(this.legacyUrl).pipe(
            map((definition) => ({
              definition,
              isActive: definition.enabled,
              updatedAtUtc: null,
              publishedDefinitionJson: null,
              publishedAtUtc: null,
              publishedBy: null
            })),
            catchError((legacyError) => throwError(() => legacyError))
          );
        })
      );
  }

  saveDealApprovalDefinition(
    definition: DealApprovalWorkflowDefinition,
    isActive: boolean,
    operation: 'save-draft' | 'publish' | 'unpublish' | 'revert-draft'
  ) {
    return this.http.put<WorkflowDefinitionResponse>(
      `${this.baseUrl}/api/workflows/definitions/${this.workflowKey}`,
      {
        definitionJson: JSON.stringify(definition),
        isActive,
        operation
      }
    ).pipe(
      catchError((error: { status?: number }) => {
        if (error?.status !== 404) {
          return throwError(() => error);
        }

        return this.http.put<DealApprovalWorkflowDefinition>(this.legacyUrl, {
          ...definition,
          enabled: isActive
        }).pipe(
          map((legacy) => ({
            key: this.workflowKey,
            name: 'Deal Approval',
            isActive: legacy.enabled,
            definitionJson: JSON.stringify(legacy),
            updatedAtUtc: null,
            publishedDefinitionJson: null,
            publishedAtUtc: null,
            publishedBy: null
          }))
        );
      })
    );
  }

  validateDealApprovalDefinition(definition: DealApprovalWorkflowDefinition) {
    return this.http.post<WorkflowValidationResponse>(
      `${this.baseUrl}/api/workflows/definitions/${this.workflowKey}/validate`,
      {
        definitionJson: JSON.stringify(definition),
        isActive: definition.enabled
      }
    ).pipe(
      catchError((error: { status?: number }) => {
        if (error?.status !== 404) {
          return throwError(() => error);
        }

        const hasApprovalStep = (definition.steps ?? []).some((step) => (step.approverRole ?? '').trim().length > 0);
        if (definition.enabled && !hasApprovalStep) {
          return of({
            isValid: false,
            errors: ['At least one approval step with approver role is required.']
          });
        }

        return of({
          isValid: true,
          errors: []
        });
      })
    );
  }

  private parseDefinitionJson(raw: unknown): DealApprovalWorkflowDefinition {
    if (typeof raw === 'string') {
      return JSON.parse(raw) as DealApprovalWorkflowDefinition;
    }

    if (raw && typeof raw === 'object') {
      return raw as DealApprovalWorkflowDefinition;
    }

    throw new Error('Workflow definition payload is not valid JSON.');
  }
}
