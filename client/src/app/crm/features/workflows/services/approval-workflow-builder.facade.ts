import { inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

import {
  ApprovalWorkflowDefinition,
  CompletionRule,
  ConditionCombinator,
  ConditionGroup,
  ConditionRule,
  ParallelApprovalGroup,
  ParallelCompletionMode,
  ValidationItem,
  WorkflowStatus,
  WorkflowStep,
  WorkflowSummary,
  WorkflowTestScenario
} from '../models/approval-workflow-builder.model';
import { WorkflowDefinitionService } from './workflow-definition.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { RoleSummary, SecurityLevelDefinition, UserLookupItem } from '../../settings/models/user-admin.model';

type Option = { label: string; value: string };
type ApproverTypeOption = { label: string; value: string; count: number };

@Injectable()
export class ApprovalWorkflowBuilderFacade {
  private readonly workflowDefinitions = inject(WorkflowDefinitionService);
  private readonly userAdmin = inject(UserAdminDataService);

  readonly metadataLoading = signal(true);
  readonly moduleOptions = signal<Option[]>([]);
  readonly triggerOptions = signal<Option[]>([]);
  readonly roleApproverOptions = signal<Option[]>([]);
  readonly userApproverOptions = signal<Option[]>([]);
  readonly securityLevelApproverOptions = signal<Option[]>([]);
  readonly approverTypeOptions = signal<ApproverTypeOption[]>([]);

  readonly combinatorOptions: Array<{ label: string; value: ConditionCombinator }> = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' }
  ];

  readonly stepTypeTagSeverity: Record<string, 'info' | 'success' | 'secondary' | 'warn'> = {
    Sequential: 'info',
    Final: 'success'
  };

  private readonly draft = signal<ApprovalWorkflowDefinition>(this.createDemoWorkflow());
  private readonly status = signal<WorkflowStatus>(this.draft().status);
  private readonly lastSavedAt = signal<string>(new Date().toISOString());

  readonly currentStatus = this.status.asReadonly();
  readonly lastSavedAtUtc = this.lastSavedAt.asReadonly();

  loadDraft(): ApprovalWorkflowDefinition {
    return clone(this.draft());
  }

  loadMetadata(definition: ApprovalWorkflowDefinition): Observable<void> {
    this.metadataLoading.set(true);

    return forkJoin({
      metadata: this.workflowDefinitions.getScopeMetadata().pipe(
        catchError(() =>
          of({
            modules: [],
            pipelines: [],
            stages: [],
            triggers: []
          })
        )
      ),
      roles: this.userAdmin.getRoles().pipe(catchError(() => of([] as RoleSummary[]))),
      users: this.userAdmin.lookupActive(undefined, 200).pipe(catchError(() => of([] as UserLookupItem[]))),
      securityLevels: this.userAdmin.getSecurityLevels().pipe(catchError(() => of([] as SecurityLevelDefinition[])))
    }).pipe(
      tap(({ metadata, roles, users, securityLevels }) => {
        this.moduleOptions.set(
          mergeOptions(metadata.modules ?? [], [definition.module]).map((option) => ({
            ...option,
            label: normalizeModuleLabel(option.label || option.value)
          }))
        );
        this.triggerOptions.set(mergeOptions(metadata.triggers ?? [], [definition.triggerType]));

        const roleOptions = mergeOptions(
          roles.map((role) => ({ label: role.name, value: role.name })),
          collectApproverSelectors(definition, 'Role')
        );
        const userOptions = mergeOptions(
          users.map((user) => ({
            label: user.fullName ? `${user.fullName} (${user.email})` : user.email,
            value: user.fullName || user.email
          })),
          collectApproverSelectors(definition, 'Named User')
        );
        const securityOptions = mergeOptions(
          securityLevels.map((level) => ({ label: `${level.name} (L${level.rank})`, value: level.name })),
          collectApproverSelectors(definition, 'Security Level')
        );

        this.roleApproverOptions.set(roleOptions);
        this.userApproverOptions.set(userOptions);
        this.securityLevelApproverOptions.set(securityOptions);
        const typeOptions = new Map<string, ApproverTypeOption>();
        for (const type of uniqueStrings(collectApproverTypes(definition))) {
          const count =
            type === 'Role' ? roleOptions.length :
            type === 'Named User' ? userOptions.length :
            type === 'Security Level' ? securityOptions.length :
            0;
          typeOptions.set(type, { label: type, value: type, count });
        }
        this.approverTypeOptions.set([...typeOptions.values()]);
        this.metadataLoading.set(false);
      }),
      map(() => void 0)
    );
  }

  saveDraft(definition: ApprovalWorkflowDefinition) {
    const next: ApprovalWorkflowDefinition = clone({ ...definition, status: 'Draft' as WorkflowStatus, isActive: false });
    this.draft.set(next);
    this.status.set('Draft');
    this.lastSavedAt.set(new Date().toISOString());
    return next;
  }

  publish(definition: ApprovalWorkflowDefinition) {
    const next: ApprovalWorkflowDefinition = clone({ ...definition, status: 'Active' as WorkflowStatus, isActive: true });
    this.draft.set(next);
    this.status.set('Active');
    this.lastSavedAt.set(new Date().toISOString());
    return next;
  }

  buildConditionFieldOptions(definition: ApprovalWorkflowDefinition): Option[] {
    return mergeOptions(
      uniqueStrings([
        ...definition.conditionGroups.flatMap((group) => group.rules.map((rule) => rule.field)),
        ...Object.keys(definition.testScenario ?? {})
      ]).map((value) => ({ label: labelizeField(value), value })),
      []
    );
  }

  buildConditionOperatorOptions(definition: ApprovalWorkflowDefinition): Option[] {
    return uniqueStrings(definition.conditionGroups.flatMap((group) => group.rules.map((rule) => rule.operator))).map((value) => ({
      label: labelizeOperator(value),
      value
    }));
  }

  buildEscalationRuleOptions(definition: ApprovalWorkflowDefinition): Option[] {
    return uniqueStrings(collectEscalationRules(definition)).map((value) => ({ label: value, value }));
  }

  buildCompletionRuleOptions(definition: ApprovalWorkflowDefinition): Array<{ label: string; value: CompletionRule }> {
    return uniqueStrings(collectCompletionRules(definition)).map((value) => ({
      label: value,
      value: value as CompletionRule
    }));
  }

  buildCompletionModeOptions(definition: ApprovalWorkflowDefinition): Array<{ label: string; value: ParallelCompletionMode }> {
    return uniqueStrings(
      definition.steps.filter((item): item is ParallelApprovalGroup => item.kind === 'parallel-group').map((item) => item.completionMode)
    ).map((value) => ({
      label: value,
      value: value as ParallelCompletionMode
    }));
  }

  buildOutcomeActionOptions(definition: ApprovalWorkflowDefinition): Option[] {
    return uniqueStrings(definition.outcomes.map((outcome) => outcome.action)).map((value) => ({ label: value, value }));
  }

  approverOptionsFor(type: string, definition: ApprovalWorkflowDefinition): Option[] {
    if (type === 'Named User') {
      return mergeOptions(this.userApproverOptions(), collectApproverSelectors(definition, type));
    }

    if (type === 'Security Level') {
      return mergeOptions(this.securityLevelApproverOptions(), collectApproverSelectors(definition, type));
    }

    if (type === 'Role') {
      return mergeOptions(this.roleApproverOptions(), collectApproverSelectors(definition, type));
    }

    return mergeOptions([], collectApproverSelectors(definition, type));
  }

  buildSummary(definition: ApprovalWorkflowDefinition): WorkflowSummary {
    const totalSteps = definition.steps.reduce((count, item) => {
      if (item.kind === 'parallel-group') {
        return count + item.approvers.length;
      }

      return count + 1;
    }, 0);

    const parallelGroups = definition.steps.filter((item) => item.kind === 'parallel-group').length;
    const estimatedPath = definition.steps
      .map((item, index) =>
        item.kind === 'parallel-group'
          ? `P${index + 1}: ${item.completionMode === 'All must approve' ? 'All parallel approvers' : 'Any parallel approver'}`
          : `S${index + 1}: ${item.title}`
      )
      .join(' → ');

    return {
      module: definition.module,
      trigger: definition.triggerType,
      totalSteps,
      parallelGroups,
      estimatedApprovalPath: estimatedPath,
      slaSummary: this.buildSlaSummary(definition)
    };
  }

  buildLogicPreview(definition: ApprovalWorkflowDefinition) {
    const conditions = definition.conditionGroups
      .map((group) =>
        group.rules
          .map((rule, index) => {
            const prefix = index === 0 ? '' : `${rule.combinator.toLowerCase()} `;
            return `${prefix}${this.labelForField(rule.field)} ${this.labelForOperator(rule.operator)} ${rule.value}`;
          })
          .join(' ')
      )
      .filter(Boolean)
      .join(' and ');

    const flow = definition.steps
      .map((item) => {
        if (item.kind === 'parallel-group') {
          const approvers = item.approvers.map((approver) => approver.approverSelector).join(' and ');
          return `run parallel approval from ${approvers}. Continue when ${item.completionMode.toLowerCase()}.`;
        }

        return `send approval to ${item.approverSelector}.`;
      })
      .join(' Then ');

    const approveAction = definition.outcomes.find((item) => item.event === 'approve')?.action ?? 'continue workflow';

    return `If ${conditions || 'workflow conditions are met'}, ${flow} On success, ${approveAction.toLowerCase()}.`;
  }

  buildValidation(definition: ApprovalWorkflowDefinition): ValidationItem[] {
    const items: ValidationItem[] = [];
    const orders = new Set<number>();

    definition.conditionGroups.forEach((group, groupIndex) => {
      if (group.rules.length === 0) {
        items.push({
          severity: 'warn',
          title: `Condition group ${groupIndex + 1} is empty`,
          detail: 'Add at least one rule or remove the unused group.'
        });
      }

      group.rules.forEach((rule) => {
        if (rule.value === '' || rule.value === null || rule.value === undefined) {
          items.push({
            severity: 'error',
            title: `Missing value for ${this.labelForField(rule.field)}`,
            detail: 'Every active condition needs a comparison value.'
          });
        }
      });
    });

    definition.steps.forEach((item, index) => {
      if (orders.has(index + 1)) {
        items.push({
          severity: 'error',
          title: 'Duplicate step order detected',
          detail: 'Each step card must hold a unique position in the approval path.'
        });
      }
      orders.add(index + 1);

      if (item.kind === 'parallel-group') {
        if (item.requiredApprovals < 1 || item.requiredApprovals > item.approvers.length) {
          items.push({
            severity: 'error',
            title: 'Invalid parallel approval threshold',
            detail: 'Required approvals must be between 1 and the number of approvers in the group.'
          });
        }

        item.approvers.forEach((approver) => this.validateStep(approver, items));
      } else {
        this.validateStep(item, items);
      }
    });

    if (!definition.steps.some((item) => item.kind === 'step' && item.stepType === 'Final')) {
      items.push({
        severity: 'warn',
        title: 'No final approval step configured',
        detail: 'Add a final approver to make the exit point explicit.'
      });
    }

    if (!definition.outcomes.some((outcome) => outcome.event === 'timeout' && outcome.action)) {
      items.push({
        severity: 'error',
        title: 'No timeout action configured',
        detail: 'Set what should happen when an approval breaches its SLA.'
      });
    }

    if (items.length === 0) {
      items.push({
        severity: 'success',
        title: 'Workflow is ready to publish',
        detail: 'All required approvers, actions, and SLA settings are configured.'
      });
    }

    return items;
  }

  evaluateScenario(definition: ApprovalWorkflowDefinition, scenario: WorkflowTestScenario) {
    const matches = definition.conditionGroups.every((group) => this.evaluateGroup(group, scenario));
    return {
      matches,
      badge: matches ? 'Would trigger' : 'Would not trigger',
      detail: matches
        ? 'This sample record satisfies the workflow entry criteria.'
        : 'The sample values do not satisfy every required workflow condition.'
    };
  }

  private validateStep(step: WorkflowStep, items: ValidationItem[]) {
    if (!step.approverSelector) {
      items.push({
        severity: 'error',
        title: `Missing approver on ${step.title}`,
        detail: 'Choose a role, user, or dynamic approver target before publishing.'
      });
    }

    if (step.slaHours <= 0) {
      items.push({
        severity: 'warn',
        title: `${step.title} has no SLA`,
        detail: 'Use SLA hours to drive escalation and operational visibility.'
      });
    }

    if (step.escalationRule === 'No escalation' && step.slaHours <= 24) {
      items.push({
        severity: 'warn',
        title: `${step.title} has no escalation`,
        detail: 'Short SLA steps usually need a clear escalation route.'
      });
    }
  }

  private buildSlaSummary(definition: ApprovalWorkflowDefinition) {
    const hours = definition.steps.reduce((total, item) => {
      if (item.kind === 'parallel-group') {
        const longestGroupStep = item.approvers.reduce((max, step) => Math.max(max, step.slaHours), 0);
        return total + longestGroupStep;
      }

      return total + item.slaHours;
    }, 0);

    return `${hours}h across the longest approval path`;
  }

  private labelForField(field: string) {
    return labelizeField(field);
  }

  private labelForOperator(operator: string) {
    return labelizeOperator(operator).toLowerCase();
  }

  private evaluateGroup(group: ConditionGroup, scenario: WorkflowTestScenario) {
    if (group.rules.length === 0) {
      return true;
    }

    const evaluations = group.rules.map((rule) => this.evaluateRule(rule, scenario));
    return group.combinator === 'AND' ? evaluations.every(Boolean) : evaluations.some(Boolean);
  }

  private evaluateRule(rule: ConditionRule, scenario: WorkflowTestScenario) {
    const fieldValue = (scenario as unknown as Record<string, string | number>)[rule.field];
    const compareValue = typeof fieldValue === 'number' ? Number(rule.value ?? 0) : String(rule.value ?? '');

    switch (rule.operator) {
      case '>':
        return Number(fieldValue ?? 0) > Number(compareValue);
      case '>=':
        return Number(fieldValue ?? 0) >= Number(compareValue);
      case '=':
        return String(fieldValue ?? '').toLowerCase() === String(compareValue).toLowerCase();
      case '!=':
        return String(fieldValue ?? '').toLowerCase() !== String(compareValue).toLowerCase();
      case 'contains':
        return String(fieldValue ?? '').toLowerCase().includes(String(compareValue).toLowerCase());
      default:
        return false;
    }
  }

  private createDemoWorkflow(): ApprovalWorkflowDefinition {
    return {
      id: 'high-discount-approval',
      name: 'High Discount Approval',
      processName: 'Discount Exception Governance',
      requesterLabel: 'Opportunity Owner',
      module: 'Opportunity',
      triggerType: 'On Submit',
      version: 'v2.3',
      isActive: false,
      status: 'Draft',
      description: 'Route strategic discount exceptions through sales leadership, finance, legal, and final executive approval before the opportunity can be marked approved.',
      conditionGroups: [
        {
          id: 'discount-group',
          label: 'Commercial Risk',
          combinator: 'AND',
          rules: [
            {
              id: 'discount-rule',
              field: 'discountPercent',
              operator: '>',
              value: 10,
              combinator: 'AND'
            },
            {
              id: 'value-rule',
              field: 'dealValue',
              operator: '>=',
              value: 50000,
              combinator: 'AND'
            }
          ]
        }
      ],
      steps: [
        this.createStep({
          id: 'sales-manager-step',
          title: 'Sales Manager approval',
          stepType: 'Sequential',
          approverType: 'Role',
          approverSelector: 'Sales Manager',
          slaHours: 8,
          escalationRule: 'Escalates in 24h',
          completionRule: 'Required',
          notes: 'Manager confirms discount strategy, close plan, and deal quality.'
        }),
        this.createParallelGroup({
          id: 'parallel-finance-legal',
          title: 'Finance & Legal review',
          completionMode: 'All must approve',
          requiredApprovals: 2,
          approvers: [
            this.createStep({
              id: 'finance-manager-step',
              title: 'Finance Manager approval',
              stepType: 'Sequential',
              approverType: 'Role',
              approverSelector: 'Finance Manager',
              slaHours: 12,
              escalationRule: 'Escalates in 24h',
              completionRule: 'Required',
              notes: 'Validate margin, pricing envelope, and payment terms.'
            }),
            this.createStep({
              id: 'legal-reviewer-step',
              title: 'Legal Reviewer approval',
              stepType: 'Sequential',
              approverType: 'Role',
              approverSelector: 'Legal Reviewer',
              slaHours: 12,
              escalationRule: 'Escalates in 24h',
              completionRule: 'Required',
              notes: 'Validate redlines, non-standard clauses, and risk language.'
            })
          ]
        }),
        this.createStep({
          id: 'director-step',
          title: 'Director final approval',
          stepType: 'Final',
          approverType: 'Role',
          approverSelector: 'Director',
          slaHours: 24,
          escalationRule: 'Escalates in 48h',
          completionRule: 'Required',
          notes: 'Final commercial sign-off before the opportunity is approved.'
        })
      ],
      outcomes: [
        { event: 'approve', action: 'Mark Approved', config: 'Set approval status to Approved and unlock quote progression.' },
        { event: 'reject', action: 'Mark Rejected', config: 'Set approval status to Rejected and notify the owner with comments.' },
        { event: 'timeout', action: 'Escalate to VP Sales', config: 'Create escalation task and notify VP Sales plus opportunity owner.' }
      ],
      testScenario: {
        discountPercent: 14,
        dealValue: 85000,
        region: 'Canada',
        dealType: 'Expansion'
      }
    };
  }

  private createStep(input: {
    id: string;
    title: string;
    stepType: 'Sequential' | 'Final';
    approverType: string;
    approverSelector: string;
    slaHours: number;
    escalationRule: string;
    completionRule: CompletionRule;
    notes: string;
  }): WorkflowStep {
    return {
      id: input.id,
      kind: 'step',
      title: input.title,
      stepType: input.stepType,
      approverType: input.approverType,
      approverSelector: input.approverSelector,
      slaHours: input.slaHours,
      escalationRule: input.escalationRule,
      completionRule: input.completionRule,
      advanced: {
        reminderHours: 4,
        escalationContact: 'VP Sales',
        requireDecisionComment: true,
        allowDelegateApproval: false,
        notes: input.notes
      }
    };
  }

  private createParallelGroup(input: {
    id: string;
    title: string;
    completionMode: ParallelCompletionMode;
    requiredApprovals: number;
    approvers: WorkflowStep[];
  }): ParallelApprovalGroup {
    return {
      id: input.id,
      kind: 'parallel-group',
      title: input.title,
      completionMode: input.completionMode,
      requiredApprovals: input.requiredApprovals,
      approvers: input.approvers
    };
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function uniqueStrings(values: Array<string | null | undefined>) {
  return [...new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))];
}

function mergeOptions(options: Array<{ label: string; value: string }>, currentValues: string[]) {
  const map = new Map<string, Option>();

  for (const option of options) {
    if (option.value) {
      map.set(option.value, option);
    }
  }

  for (const value of currentValues) {
    if (value && !map.has(value)) {
      map.set(value, { label: labelizeField(value), value });
    }
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function labelizeField(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim();
}

function labelizeOperator(value: string) {
  switch (value) {
    case '>':
      return 'Greater than';
    case '>=':
      return 'Greater than or equal';
    case '=':
      return 'Equals';
    case '!=':
      return 'Not equals';
    case 'contains':
      return 'Contains';
    default:
      return labelizeField(value);
  }
}

function normalizeModuleLabel(value: string) {
  const normalized = value.trim().toLowerCase();
  switch (normalized) {
    case 'lead':
    case 'leads':
      return 'Leads';
    case 'opportunity':
    case 'opportunities':
    case 'deal':
    case 'deals':
      return 'Deals';
    case 'customer':
    case 'customers':
    case 'account':
    case 'accounts':
      return 'Customers';
    case 'contact':
    case 'contacts':
      return 'Contacts';
    case 'activity':
    case 'activities':
      return 'Activities';
    case 'campaign':
    case 'campaigns':
    case 'marketing':
      return 'Marketing';
    case 'property':
    case 'properties':
      return 'Properties';
    default:
      return labelizeField(value);
  }
}

function collectApproverSelectors(definition: ApprovalWorkflowDefinition, approverType: string) {
  const selectors: string[] = [];

  for (const step of definition.steps) {
    if (step.kind === 'parallel-group') {
      for (const approver of step.approvers) {
        if (approver.approverType === approverType) {
          selectors.push(approver.approverSelector);
        }
      }
      continue;
    }

    if (step.approverType === approverType) {
      selectors.push(step.approverSelector);
    }
  }

  return uniqueStrings(selectors);
}

function collectApproverTypes(definition: ApprovalWorkflowDefinition) {
  const values: string[] = [];
  for (const step of definition.steps) {
    if (step.kind === 'parallel-group') {
      values.push(...step.approvers.map((approver) => approver.approverType));
    } else {
      values.push(step.approverType);
    }
  }

  return values;
}

function collectEscalationRules(definition: ApprovalWorkflowDefinition) {
  const values: string[] = [];

  for (const step of definition.steps) {
    if (step.kind === 'parallel-group') {
      values.push(...step.approvers.map((approver) => approver.escalationRule));
    } else {
      values.push(step.escalationRule);
    }
  }

  return values;
}

function collectCompletionRules(definition: ApprovalWorkflowDefinition) {
  const values: string[] = [];

  for (const step of definition.steps) {
    if (step.kind === 'parallel-group') {
      values.push(...step.approvers.map((approver) => approver.completionRule));
    } else {
      values.push(step.completionRule);
    }
  }

  return values;
}
