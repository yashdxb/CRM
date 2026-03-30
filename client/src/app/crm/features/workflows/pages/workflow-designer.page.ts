import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  ApprovalWorkflowDefinition,
  ParallelApprovalGroup,
  ValidationItem,
  WorkflowFlowItem,
  WorkflowStatus,
  WorkflowSummary
} from '../models/approval-workflow-builder.model';
import { ApprovalWorkflowBuilderFacade } from '../services/approval-workflow-builder.facade';

interface WorkflowRegistryRow {
  id: string;
  name: string;
  moduleLabel: string;
  processName: string;
  requesterLabel: string;
  conditionSummary: string;
  finalApprover: string;
  trigger: string;
  status: WorkflowStatus;
  version: string;
  slaSummary: string;
}

interface ConditionTableRow {
  order: string;
  groupLabel: string;
  groupLogic: string;
  field: string;
  operator: string;
  value: string;
}

interface ApprovalPathRow {
  id: string;
  rowKind: 'step' | 'parallel-group' | 'parallel-approver';
  path: string;
  title: string;
  typeLabel: string;
  typeSeverity: 'info' | 'success' | 'warn' | 'contrast';
  approverType: string;
  approverSelector: string;
  slaHours: string;
  completion: string;
  escalation: string;
  requirementLabel: string;
  requirementSeverity: 'success' | 'warn' | 'info';
}

interface OutcomeRow {
  event: string;
  action: string;
  config: string;
}

@Component({
  selector: 'app-workflow-designer-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BreadcrumbsComponent,
    ButtonModule,
    CardModule,
    ChipModule,
    DividerModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TableModule,
    TagModule,
    TextareaModule,
    ToggleSwitchModule
  ],
  providers: [ApprovalWorkflowBuilderFacade],
  templateUrl: './workflow-designer.page.html',
  styleUrl: './workflow-designer.page.scss'
})
export class WorkflowDesignerPage {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(ApprovalWorkflowBuilderFacade);
  private readonly toast = inject(AppToastService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly currentDefinition = signal<ApprovalWorkflowDefinition>(this.facade.loadDraft());
  private readonly savedSnapshot = signal<ApprovalWorkflowDefinition>(this.facade.loadDraft());

  protected readonly metadataLoading = this.facade.metadataLoading;
  protected readonly moduleOptions = this.facade.moduleOptions;
  protected readonly triggerOptions = this.facade.triggerOptions;
  protected readonly workflowStatus = signal<WorkflowStatus>(this.savedSnapshot().status);
  protected readonly selectedWorkflowId = signal<string>(this.savedSnapshot().id);

  protected readonly form = this.fb.nonNullable.group({
    name: [this.savedSnapshot().name, Validators.required],
    processName: [this.savedSnapshot().processName, Validators.required],
    requesterLabel: [this.savedSnapshot().requesterLabel, Validators.required],
    module: [this.savedSnapshot().module, Validators.required],
    triggerType: [this.savedSnapshot().triggerType, Validators.required],
    version: [this.savedSnapshot().version, Validators.required],
    isActive: [this.savedSnapshot().isActive],
    description: [this.savedSnapshot().description],
    testScenario: this.fb.nonNullable.group({
      discountPercent: [this.savedSnapshot().testScenario.discountPercent, Validators.required],
      dealValue: [this.savedSnapshot().testScenario.dealValue, Validators.required],
      region: [this.savedSnapshot().testScenario.region, Validators.required],
      dealType: [this.savedSnapshot().testScenario.dealType, Validators.required]
    })
  });

  protected readonly summary = computed<WorkflowSummary>(() => this.facade.buildSummary(this.currentDefinition()));
  protected readonly logicPreview = computed(() => this.facade.buildLogicPreview(this.currentDefinition()));
  protected readonly conditionSummary = computed(() => this.buildConditionSummary(this.currentDefinition()));
  protected readonly finalApprover = computed(() => this.findFinalApprover(this.currentDefinition()));
  protected readonly moduleLabel = computed(() => this.resolveModuleLabel(this.currentDefinition().module));
  protected readonly validationItems = computed<ValidationItem[]>(() => this.facade.buildValidation(this.currentDefinition()));
  protected readonly scenarioResult = computed(() =>
    this.facade.evaluateScenario(this.currentDefinition(), this.currentDefinition().testScenario)
  );
  protected readonly statusSeverity = computed<'info' | 'success'>(() =>
    this.workflowStatus() === 'Active' ? 'success' : 'info'
  );
  protected readonly validationSeverity = computed<'success' | 'warn' | 'error'>(() => {
    const validations = this.validationItems();
    if (validations.some((item) => item.severity === 'error')) {
      return 'error';
    }
    if (validations.some((item) => item.severity === 'warn')) {
      return 'warn';
    }
    return 'success';
  });
  protected readonly canPublish = computed(
    () => this.form.valid && !this.validationItems().some((item) => item.severity === 'error')
  );
  protected readonly registryRows = computed<WorkflowRegistryRow[]>(() => {
    const definition = this.currentDefinition();
    const summary = this.summary();
    return [
      {
        id: definition.id,
        name: definition.name,
        moduleLabel: this.moduleLabel(),
        processName: definition.processName,
        requesterLabel: definition.requesterLabel,
        conditionSummary: this.conditionSummary(),
        finalApprover: this.finalApprover(),
        trigger: definition.triggerType,
        status: this.workflowStatus(),
        version: definition.version,
        slaSummary: summary.slaSummary
      }
    ];
  });
  protected readonly conditionRows = computed<ConditionTableRow[]>(() =>
    this.currentDefinition().conditionGroups.flatMap((group, groupIndex) =>
      group.rules.map((rule, ruleIndex) => ({
        order: `${groupIndex + 1}.${ruleIndex + 1}`,
        groupLabel: group.label,
        groupLogic: ruleIndex === 0 ? `Start with ${group.combinator}` : rule.combinator,
        field: this.labelize(rule.field),
        operator: rule.operator,
        value: String(rule.value ?? '')
      }))
    )
  );
  protected readonly approvalRows = computed<ApprovalPathRow[]>(() => this.buildApprovalRows(this.currentDefinition().steps));
  protected readonly outcomeRows = computed<OutcomeRow[]>(() =>
    this.currentDefinition().outcomes.map((outcome) => ({
      event: this.titleCase(outcome.event),
      action: outcome.action,
      config: outcome.config || 'No extra configuration'
    }))
  );
  protected readonly lastSavedLabel = computed(() => this.formatDate(this.facade.lastSavedAtUtc()));

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.currentDefinition.set(this.serializeForm());
    });

    this.facade
      .loadMetadata(this.savedSnapshot())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected selectWorkflow(row: WorkflowRegistryRow) {
    this.selectedWorkflowId.set(row.id);
  }

  protected saveDraft() {
    const saved = this.facade.saveDraft(this.serializeForm());
    this.savedSnapshot.set(saved);
    this.currentDefinition.set(saved);
    this.workflowStatus.set('Draft');
    this.patchForm(saved);
    this.toast.show('success', 'Workflow draft saved.');
  }

  protected publish() {
    const published = this.facade.publish(this.serializeForm());
    this.savedSnapshot.set(published);
    this.currentDefinition.set(published);
    this.workflowStatus.set('Active');
    this.patchForm(published);
    this.toast.show('success', 'Workflow published.');
  }

  protected cancelChanges() {
    const reset = this.savedSnapshot();
    this.patchForm(reset);
    this.currentDefinition.set(reset);
    this.workflowStatus.set(reset.status);
    this.toast.show('success', 'Workflow changes reset to the last saved snapshot.');
  }

  protected showMockAction(action: string) {
    this.toast.show('success', `${action} is part of the simplified mock builder. Fine-tune the UX here before wiring full editing actions.`);
  }

  protected statusTagSeverity(status: WorkflowStatus): 'info' | 'success' {
    return status === 'Active' ? 'success' : 'info';
  }

  protected trackById(_: number, row: { id: string }) {
    return row.id;
  }

  private patchForm(definition: ApprovalWorkflowDefinition) {
    this.form.reset(
      {
        name: definition.name,
        processName: definition.processName,
        requesterLabel: definition.requesterLabel,
        module: definition.module,
        triggerType: definition.triggerType,
        version: definition.version,
        isActive: definition.isActive,
        description: definition.description,
        testScenario: {
          discountPercent: definition.testScenario.discountPercent,
          dealValue: definition.testScenario.dealValue,
          region: definition.testScenario.region,
          dealType: definition.testScenario.dealType
        }
      },
      { emitEvent: false }
    );
  }

  private serializeForm(): ApprovalWorkflowDefinition {
    const base = this.savedSnapshot();
    const raw = this.form.getRawValue();
    return {
      ...base,
      name: raw.name,
      processName: raw.processName,
      requesterLabel: raw.requesterLabel,
      module: raw.module,
      triggerType: raw.triggerType,
      version: raw.version,
      isActive: raw.isActive,
      status: this.workflowStatus(),
      description: raw.description,
      testScenario: {
        discountPercent: raw.testScenario.discountPercent,
        dealValue: raw.testScenario.dealValue,
        region: raw.testScenario.region,
        dealType: raw.testScenario.dealType
      }
    };
  }

  private buildApprovalRows(steps: WorkflowFlowItem[]): ApprovalPathRow[] {
    return steps.flatMap((step, index) => {
      if (step.kind === 'parallel-group') {
        return this.buildParallelGroupRows(step, index);
      }

      return [
        {
          id: step.id,
          rowKind: 'step',
          path: `${index + 1}`,
          title: step.title,
          typeLabel: step.stepType,
          typeSeverity: step.stepType === 'Final' ? 'success' : 'info',
          approverType: step.approverType,
          approverSelector: step.approverSelector,
          slaHours: `${step.slaHours}h`,
          completion: step.completionRule,
          escalation: step.escalationRule,
          requirementLabel: step.completionRule,
          requirementSeverity: step.completionRule === 'Required' ? 'success' : 'warn'
        }
      ];
    });
  }

  private buildConditionSummary(definition: ApprovalWorkflowDefinition) {
    return definition.conditionGroups
      .flatMap((group) => group.rules.map((rule) => `${this.labelize(rule.field)} ${rule.operator} ${rule.value}`))
      .join(' AND ');
  }

  private findFinalApprover(definition: ApprovalWorkflowDefinition) {
    const finalStep = definition.steps.find((item) => item.kind === 'step' && item.stepType === 'Final');
    return finalStep && finalStep.kind === 'step' ? finalStep.approverSelector : 'Not assigned';
  }

  private buildParallelGroupRows(step: ParallelApprovalGroup, index: number): ApprovalPathRow[] {
    const header: ApprovalPathRow = {
      id: step.id,
      rowKind: 'parallel-group',
      path: `${index + 1}`,
      title: step.title,
      typeLabel: 'Parallel Group',
      typeSeverity: 'contrast',
      approverType: `${step.approvers.length} approvers`,
      approverSelector: step.completionMode,
      slaHours: `${Math.max(...step.approvers.map((approver) => approver.slaHours))}h max`,
      completion: `${step.requiredApprovals} approval${step.requiredApprovals > 1 ? 's' : ''} required`,
      escalation: 'Shared decision gate',
      requirementLabel: step.completionMode,
      requirementSeverity: 'info'
    };

    const approvers = step.approvers.map((approver, memberIndex) => ({
      id: approver.id,
      rowKind: 'parallel-approver' as const,
      path: `${index + 1}.${memberIndex + 1}`,
      title: approver.title,
      typeLabel: 'Parallel Approver',
      typeSeverity: 'warn' as const,
      approverType: approver.approverType,
      approverSelector: approver.approverSelector,
      slaHours: `${approver.slaHours}h`,
      completion: approver.completionRule,
      escalation: approver.escalationRule,
      requirementLabel: approver.completionRule,
      requirementSeverity: approver.completionRule === 'Required' ? 'success' as const : 'warn' as const
    }));

    return [header, ...approvers];
  }

  private formatDate(value: string | null) {
    if (!value) {
      return 'just now';
    }

    return new Intl.DateTimeFormat('en-CA', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(value));
  }

  private titleCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  private labelize(value: string) {
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^./, (char) => char.toUpperCase());
  }

  private resolveModuleLabel(moduleValue: string) {
    const liveOption = this.moduleOptions().find((option) => option.value === moduleValue);
    if (liveOption?.label) {
      return liveOption.label;
    }

    switch (moduleValue.trim().toLowerCase()) {
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
        return this.labelize(moduleValue);
    }
  }
}
