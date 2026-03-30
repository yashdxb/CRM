import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  ApprovalWorkflowDefinition,
  CompletionRule,
  ConditionCombinator,
  ConditionGroup,
  ConditionRule,
  ParallelApprovalGroup,
  ParallelCompletionMode,
  ValidationItem,
  WorkflowFlowItem,
  WorkflowOutcome,
  WorkflowStatus,
  WorkflowStep,
  WorkflowSummary,
  WorkflowTestScenario
} from '../models/approval-workflow-builder.model';
import { ApprovalWorkflowBuilderFacade } from '../services/approval-workflow-builder.facade';

@Component({
  selector: 'app-workflow-designer-advanced-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AccordionModule,
    BreadcrumbsComponent,
    ButtonModule,
    CardModule,
    ChipModule,
    DividerModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    MessageModule,
    PanelModule,
    SelectModule,
    TagModule,
    TextareaModule,
    ToggleSwitchModule,
    TooltipModule
  ],
  providers: [ApprovalWorkflowBuilderFacade],
  templateUrl: './workflow-designer-advanced.page.html',
  styleUrl: './workflow-designer-advanced.page.scss'
})
export class WorkflowDesignerAdvancedPage {
  private readonly fb = inject(FormBuilder);
  protected readonly facade = inject(ApprovalWorkflowBuilderFacade);
  private readonly toast = inject(AppToastService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly currentDefinition = signal<ApprovalWorkflowDefinition>(this.facade.loadDraft());
  private readonly savedSnapshot = signal<ApprovalWorkflowDefinition>(this.facade.loadDraft());
  protected readonly workflowStatus = signal<WorkflowStatus>(this.savedSnapshot().status);
  protected readonly selectedFlowItemId = signal<string | null>(this.savedSnapshot().steps[0]?.id ?? null);
  protected readonly metadataLoading = this.facade.metadataLoading;

  protected readonly moduleOptions = this.facade.moduleOptions;
  protected readonly triggerOptions = this.facade.triggerOptions;
  protected readonly combinatorOptions = this.facade.combinatorOptions;
  protected readonly approverTypeOptions = this.facade.approverTypeOptions;
  protected readonly conditionFieldOptions = computed(() => this.facade.buildConditionFieldOptions(this.currentDefinition()));
  protected readonly conditionOperatorOptions = computed(() => this.facade.buildConditionOperatorOptions(this.currentDefinition()));
  protected readonly escalationRuleOptions = computed(() => this.facade.buildEscalationRuleOptions(this.currentDefinition()));
  protected readonly completionRuleOptions = computed(() => this.facade.buildCompletionRuleOptions(this.currentDefinition()));
  protected readonly completionModeOptions = computed(() => this.facade.buildCompletionModeOptions(this.currentDefinition()));
  protected readonly outcomeActionOptions = computed(() => this.facade.buildOutcomeActionOptions(this.currentDefinition()));

  protected readonly form = this.buildForm(this.savedSnapshot());
  protected readonly summary = computed<WorkflowSummary>(() => this.facade.buildSummary(this.currentDefinition()));
  protected readonly logicPreview = computed(() => this.facade.buildLogicPreview(this.currentDefinition()));
  protected readonly validationItems = computed<ValidationItem[]>(() => this.facade.buildValidation(this.currentDefinition()));
  protected readonly scenarioResult = computed(() =>
    this.facade.evaluateScenario(this.currentDefinition(), this.currentDefinition().testScenario)
  );
  protected readonly statusSeverity = computed<'info' | 'success'>(() =>
    this.workflowStatus() === 'Active' ? 'success' : 'info'
  );
  protected readonly validationSeverity = computed<'success' | 'warn' | 'danger'>(() => {
    const validations = this.validationItems();
    if (validations.some((item) => item.severity === 'error')) {
      return 'danger';
    }

    if (validations.some((item) => item.severity === 'warn')) {
      return 'warn';
    }

    return 'success';
  });
  protected readonly canPublish = computed(() =>
    this.form.valid && !this.validationItems().some((item) => item.severity === 'error')
  );
  protected readonly lastSavedLabel = computed(() => this.formatDate(this.facade.lastSavedAtUtc()));

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.currentDefinition.set(this.serializeWorkflow());
    });

    this.currentDefinition.set(this.serializeWorkflow());
    this.facade
      .loadMetadata(this.savedSnapshot())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected get conditionGroups(): FormArray {
    return this.form.get('conditionGroups') as FormArray;
  }

  protected get flowSteps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  protected get testScenarioGroup(): FormGroup {
    return this.form.get('testScenario') as FormGroup;
  }

  protected getOutcomeGroup(key: 'approve' | 'reject' | 'timeout'): FormGroup {
    return this.form.get(['outcomes', key]) as FormGroup;
  }

  protected conditionRules(groupIndex: number): FormArray {
    return this.conditionGroups.at(groupIndex).get('rules') as FormArray;
  }

  protected parallelApprovers(stepIndex: number): FormArray {
    return this.flowSteps.at(stepIndex).get('approvers') as FormArray;
  }

  protected isParallelGroup(stepControl: AbstractControl | null) {
    return stepControl?.get('kind')?.value === 'parallel-group';
  }

  protected advancedSettingsGroup(stepControl: AbstractControl | null): FormGroup {
    return stepControl?.get('advanced') as FormGroup;
  }

  protected approverSelectorOptionsFor(stepControl: AbstractControl | null) {
    const type = stepControl?.get('approverType')?.value as string | null;
    return this.facade.approverOptionsFor(type ?? 'Role', this.currentDefinition());
  }

  protected selectFlowItem(itemId: string) {
    this.selectedFlowItemId.set(itemId);
  }

  protected isSelectedFlowItem(itemId: string) {
    return this.selectedFlowItemId() === itemId;
  }

  protected addCondition(groupIndex: number) {
    this.conditionRules(groupIndex).push(this.createConditionRuleForm());
    this.touchDefinition();
  }

  protected addConditionGroup() {
    this.conditionGroups.push(this.createConditionGroupForm());
    this.touchDefinition();
  }

  protected removeCondition(groupIndex: number, ruleIndex: number) {
    this.conditionRules(groupIndex).removeAt(ruleIndex);
    this.touchDefinition();
  }

  protected removeConditionGroup(groupIndex: number) {
    this.conditionGroups.removeAt(groupIndex);
    this.touchDefinition();
  }

  protected addSequentialStep(stepType: 'Sequential' | 'Final' = 'Sequential') {
    const step = this.createStepForm({
      id: crypto.randomUUID(),
      kind: 'step',
      title: stepType === 'Final' ? 'Final approval step' : 'New sequential approval',
      stepType,
      approverType: 'Role',
      approverSelector: '',
      slaHours: stepType === 'Final' ? 24 : 8,
      escalationRule: 'Escalates in 24h',
      completionRule: 'Required',
      advanced: {
        reminderHours: 4,
        escalationContact: 'VP Sales',
        requireDecisionComment: true,
        allowDelegateApproval: false,
        notes: ''
      }
    });

    this.flowSteps.push(step);
    this.selectedFlowItemId.set(step.get('id')?.value ?? null);
    this.touchDefinition();
  }

  protected addParallelGroup() {
    const group = this.createParallelGroupForm({
      id: crypto.randomUUID(),
      kind: 'parallel-group',
      title: 'Parallel approval group',
      completionMode: 'All must approve',
      requiredApprovals: 2,
      approvers: [
        {
          id: crypto.randomUUID(),
          kind: 'step',
          title: 'Parallel approver 1',
          stepType: 'Sequential',
          approverType: 'Role',
          approverSelector: 'Finance Manager',
          slaHours: 12,
          escalationRule: 'Escalates in 24h',
          completionRule: 'Required',
          advanced: {
            reminderHours: 4,
            escalationContact: 'VP Sales',
            requireDecisionComment: true,
            allowDelegateApproval: false,
            notes: ''
          }
        },
        {
          id: crypto.randomUUID(),
          kind: 'step',
          title: 'Parallel approver 2',
          stepType: 'Sequential',
          approverType: 'Role',
          approverSelector: 'Legal Reviewer',
          slaHours: 12,
          escalationRule: 'Escalates in 24h',
          completionRule: 'Required',
          advanced: {
            reminderHours: 4,
            escalationContact: 'VP Sales',
            requireDecisionComment: true,
            allowDelegateApproval: false,
            notes: ''
          }
        }
      ]
    });

    this.flowSteps.push(group);
    this.selectedFlowItemId.set(group.get('id')?.value ?? null);
    this.touchDefinition();
  }

  protected addParallelApprover(stepIndex: number) {
    this.parallelApprovers(stepIndex).push(
      this.createStepForm({
        id: crypto.randomUUID(),
        kind: 'step',
        title: `Parallel approver ${this.parallelApprovers(stepIndex).length + 1}`,
        stepType: 'Sequential',
        approverType: 'Role',
        approverSelector: '',
        slaHours: 8,
        escalationRule: 'Escalates in 24h',
        completionRule: 'Required',
        advanced: {
          reminderHours: 4,
          escalationContact: 'VP Sales',
          requireDecisionComment: true,
          allowDelegateApproval: false,
          notes: ''
        }
      })
    );
    this.touchDefinition();
  }

  protected removeParallelApprover(stepIndex: number, approverIndex: number) {
    this.parallelApprovers(stepIndex).removeAt(approverIndex);
    this.touchDefinition();
  }

  protected moveFlowItem(stepIndex: number, direction: -1 | 1) {
    const targetIndex = stepIndex + direction;
    if (targetIndex < 0 || targetIndex >= this.flowSteps.length) {
      return;
    }

    const current = this.flowSteps.at(stepIndex);
    const target = this.flowSteps.at(targetIndex);
    this.flowSteps.setControl(stepIndex, target);
    this.flowSteps.setControl(targetIndex, current);
    this.touchDefinition();
  }

  protected duplicateFlowItem(stepIndex: number) {
    const item = this.serializeFlowItem(this.flowSteps.at(stepIndex) as FormGroup);
    const duplicated = this.isParallelGroup(this.flowSteps.at(stepIndex))
      ? this.createParallelGroupForm({
          ...(item as ParallelApprovalGroup),
          id: crypto.randomUUID(),
          title: `${item.title} Copy`,
          approvers: (item as ParallelApprovalGroup).approvers.map((approver) => ({
            ...approver,
            id: crypto.randomUUID()
          }))
        })
      : this.createStepForm({
          ...(item as WorkflowStep),
          id: crypto.randomUUID(),
          title: `${item.title} Copy`
        });

    this.flowSteps.insert(stepIndex + 1, duplicated);
    this.touchDefinition();
  }

  protected deleteFlowItem(stepIndex: number) {
    const itemId = this.flowSteps.at(stepIndex).get('id')?.value as string | null;
    this.flowSteps.removeAt(stepIndex);
    if (this.selectedFlowItemId() === itemId) {
      this.selectedFlowItemId.set(this.flowSteps.at(Math.max(0, stepIndex - 1))?.get('id')?.value ?? null);
    }
    this.touchDefinition();
  }

  protected stepMenuItems(stepIndex: number): MenuItem[] {
    return [
      {
        label: 'Duplicate',
        icon: 'pi pi-copy',
        command: () => this.duplicateFlowItem(stepIndex)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteFlowItem(stepIndex)
      }
    ];
  }

  protected saveDraft() {
    const saved = this.facade.saveDraft(this.serializeWorkflow());
    this.savedSnapshot.set(saved);
    this.workflowStatus.set('Draft');
    this.form.controls.isActive.setValue(false, { emitEvent: false });
    this.currentDefinition.set(this.serializeWorkflow());
    this.facade.loadMetadata(saved).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.toast.show('success', 'Workflow draft saved.', 2200);
  }

  protected publish() {
    if (!this.canPublish()) {
    this.toast.show('error', 'Resolve validation errors before publishing.', 2600);
      return;
    }

    const published = this.facade.publish(this.serializeWorkflow());
    this.savedSnapshot.set(published);
    this.workflowStatus.set('Active');
    this.form.controls.isActive.setValue(true, { emitEvent: false });
    this.currentDefinition.set(this.serializeWorkflow());
    this.facade.loadMetadata(published).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.toast.show('success', 'Workflow published.', 2200);
  }

  protected cancelChanges() {
    this.patchForm(this.savedSnapshot());
    this.workflowStatus.set(this.savedSnapshot().status);
    this.facade.loadMetadata(this.savedSnapshot()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.toast.show('success', 'Workflow changes reverted.', 2200);
  }

  protected statusChipClass(rule: CompletionRule | ParallelCompletionMode | string) {
    if (rule === 'All must approve' || rule === 'Required' || rule === 'Escalates in 24h') {
      return 'chip chip--primary';
    }

    if (rule === 'Any one can approve') {
      return 'chip chip--accent';
    }

    if (String(rule).includes('Escalates')) {
      return 'chip chip--warning';
    }

    return 'chip chip--neutral';
  }

  protected validationTagSeverity(severity: ValidationItem['severity']) {
    if (severity === 'error') {
      return 'danger';
    }

    if (severity === 'warn') {
      return 'warn';
    }

    return 'success';
  }

  protected isValidationMessage(severity: ValidationItem['severity']) {
    return severity !== 'success';
  }

  private buildForm(definition: ApprovalWorkflowDefinition) {
    return this.fb.group({
      id: this.fb.control(definition.id),
      name: this.fb.control(definition.name, Validators.required),
      module: this.fb.control(definition.module, Validators.required),
      triggerType: this.fb.control(definition.triggerType, Validators.required),
      version: this.fb.control(definition.version, Validators.required),
      isActive: this.fb.control(definition.isActive),
      description: this.fb.control(definition.description),
      conditionGroups: this.fb.array(definition.conditionGroups.map((group) => this.createConditionGroupForm(group))),
      steps: this.fb.array(definition.steps.map((step) => this.createFlowItemForm(step))),
      outcomes: this.fb.group({
        approve: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'approve')),
        reject: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'reject')),
        timeout: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'timeout'))
      }),
      testScenario: this.fb.group({
        discountPercent: this.fb.control(definition.testScenario.discountPercent, Validators.required),
        dealValue: this.fb.control(definition.testScenario.dealValue, Validators.required),
        region: this.fb.control(definition.testScenario.region, Validators.required),
        dealType: this.fb.control(definition.testScenario.dealType, Validators.required)
      })
    });
  }

  private createOutcomeForm(outcome?: WorkflowOutcome) {
    return this.fb.group({
      event: this.fb.control(outcome?.event ?? 'approve'),
      action: this.fb.control(outcome?.action ?? '', Validators.required),
      config: this.fb.control(outcome?.config ?? '')
    });
  }

  private createConditionGroupForm(group?: ConditionGroup) {
    return this.fb.group({
      id: this.fb.control(group?.id ?? crypto.randomUUID()),
      label: this.fb.control(group?.label ?? 'New condition group', Validators.required),
      combinator: this.fb.control<ConditionCombinator>(group?.combinator ?? 'AND', Validators.required),
      rules: this.fb.array((group?.rules ?? [undefined]).map((rule) => this.createConditionRuleForm(rule)))
    });
  }

  private createConditionRuleForm(rule?: ConditionRule) {
    return this.fb.group({
      id: this.fb.control(rule?.id ?? crypto.randomUUID()),
      field: this.fb.control(rule?.field ?? 'discountPercent', Validators.required),
      operator: this.fb.control(rule?.operator ?? '>', Validators.required),
      value: this.fb.control(rule?.value ?? '', Validators.required),
      combinator: this.fb.control<ConditionCombinator>(rule?.combinator ?? 'AND', Validators.required)
    });
  }

  private createFlowItemForm(item: WorkflowFlowItem) {
    return item.kind === 'parallel-group' ? this.createParallelGroupForm(item) : this.createStepForm(item);
  }

  private createParallelGroupForm(group: ParallelApprovalGroup) {
    return this.fb.group({
      id: this.fb.control(group.id),
      kind: this.fb.control<'parallel-group'>('parallel-group'),
      title: this.fb.control(group.title, Validators.required),
      completionMode: this.fb.control<ParallelCompletionMode>(group.completionMode, Validators.required),
      requiredApprovals: this.fb.control(group.requiredApprovals, [Validators.required, Validators.min(1)]),
      approvers: this.fb.array(group.approvers.map((approver) => this.createStepForm(approver)))
    });
  }

  private createStepForm(step: WorkflowStep) {
    return this.fb.group({
      id: this.fb.control(step.id),
      kind: this.fb.control<'step'>('step'),
      title: this.fb.control(step.title, Validators.required),
      stepType: this.fb.control(step.stepType, Validators.required),
      approverType: this.fb.control(step.approverType, Validators.required),
      approverSelector: this.fb.control(step.approverSelector, Validators.required),
      slaHours: this.fb.control(step.slaHours, [Validators.required, Validators.min(1)]),
      escalationRule: this.fb.control(step.escalationRule, Validators.required),
      completionRule: this.fb.control(step.completionRule, Validators.required),
      advanced: this.fb.group({
        reminderHours: this.fb.control(step.advanced.reminderHours),
        escalationContact: this.fb.control(step.advanced.escalationContact),
        requireDecisionComment: this.fb.control(step.advanced.requireDecisionComment),
        allowDelegateApproval: this.fb.control(step.advanced.allowDelegateApproval),
        notes: this.fb.control(step.advanced.notes)
      })
    });
  }

  private serializeWorkflow(): ApprovalWorkflowDefinition {
    const base = this.savedSnapshot();
    return {
      id: this.form.controls.id.getRawValue() ?? '',
      name: this.form.controls.name.getRawValue() ?? '',
      processName: base.processName,
      requesterLabel: base.requesterLabel,
      module: this.form.controls.module.getRawValue() ?? '',
      triggerType: this.form.controls.triggerType.getRawValue() ?? '',
      version: this.form.controls.version.getRawValue() ?? '',
      isActive: this.form.controls.isActive.getRawValue() ?? false,
      status: this.workflowStatus(),
      description: this.form.controls.description.getRawValue() ?? '',
      conditionGroups: this.conditionGroups.controls.map((group) => this.serializeConditionGroup(group as FormGroup)),
      steps: this.flowSteps.controls.map((step) => this.serializeFlowItem(step as FormGroup)),
      outcomes: ['approve', 'reject', 'timeout'].map((key) => this.serializeOutcome(this.getOutcomeGroup(key as 'approve' | 'reject' | 'timeout'))),
      testScenario: this.testScenarioGroup.getRawValue() as WorkflowTestScenario
    };
  }

  private serializeConditionGroup(group: FormGroup): ConditionGroup {
    return {
      id: group.get('id')?.getRawValue(),
      label: group.get('label')?.getRawValue(),
      combinator: group.get('combinator')?.getRawValue(),
      rules: (group.get('rules') as FormArray).controls.map((rule) => this.serializeConditionRule(rule as FormGroup))
    };
  }

  private serializeConditionRule(rule: FormGroup): ConditionRule {
    return {
      id: rule.get('id')?.getRawValue(),
      field: rule.get('field')?.getRawValue(),
      operator: rule.get('operator')?.getRawValue(),
      value: rule.get('value')?.getRawValue(),
      combinator: rule.get('combinator')?.getRawValue()
    };
  }

  private serializeFlowItem(stepGroup: FormGroup): WorkflowFlowItem {
    const kind = stepGroup.get('kind')?.getRawValue();
    if (kind === 'parallel-group') {
      return {
        id: stepGroup.get('id')?.getRawValue(),
        kind: 'parallel-group',
        title: stepGroup.get('title')?.getRawValue(),
        completionMode: stepGroup.get('completionMode')?.getRawValue(),
        requiredApprovals: Number(stepGroup.get('requiredApprovals')?.getRawValue() ?? 0),
        approvers: (stepGroup.get('approvers') as FormArray).controls.map((approver) =>
          this.serializeFlowItem(approver as FormGroup)
        ) as WorkflowStep[]
      };
    }

    return {
      id: stepGroup.get('id')?.getRawValue(),
      kind: 'step',
      title: stepGroup.get('title')?.getRawValue(),
      stepType: stepGroup.get('stepType')?.getRawValue(),
      approverType: stepGroup.get('approverType')?.getRawValue(),
      approverSelector: stepGroup.get('approverSelector')?.getRawValue(),
      slaHours: Number(stepGroup.get('slaHours')?.getRawValue() ?? 0),
      escalationRule: stepGroup.get('escalationRule')?.getRawValue(),
      completionRule: stepGroup.get('completionRule')?.getRawValue(),
      advanced: (stepGroup.get('advanced') as FormGroup).getRawValue()
    };
  }

  private serializeOutcome(group: FormGroup): WorkflowOutcome {
    return group.getRawValue() as WorkflowOutcome;
  }

  private patchForm(definition: ApprovalWorkflowDefinition) {
    this.form.setControl(
      'conditionGroups',
      this.fb.array(definition.conditionGroups.map((group) => this.createConditionGroupForm(group)))
    );
    this.form.setControl('steps', this.fb.array(definition.steps.map((step) => this.createFlowItemForm(step))));
    this.form.setControl(
      'outcomes',
      this.fb.group({
        approve: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'approve')),
        reject: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'reject')),
        timeout: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'timeout'))
      })
    );
    this.form.setControl(
      'testScenario',
      this.fb.group({
        discountPercent: this.fb.control(definition.testScenario.discountPercent, Validators.required),
        dealValue: this.fb.control(definition.testScenario.dealValue, Validators.required),
        region: this.fb.control(definition.testScenario.region, Validators.required),
        dealType: this.fb.control(definition.testScenario.dealType, Validators.required)
      })
    );

    this.form.patchValue({
      id: definition.id,
      name: definition.name,
      module: definition.module,
      triggerType: definition.triggerType,
      version: definition.version,
      isActive: definition.isActive,
      description: definition.description
    });

    this.selectedFlowItemId.set(definition.steps[0]?.id ?? null);
    this.currentDefinition.set(this.serializeWorkflow());
  }

  private touchDefinition() {
    this.currentDefinition.set(this.serializeWorkflow());
  }

  private formatDate(value: string) {
    return new Date(value).toLocaleString();
  }
}
