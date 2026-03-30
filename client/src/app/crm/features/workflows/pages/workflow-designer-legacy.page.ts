import { KeyValuePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, ViewChild, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { TenantContextService } from '../../../../core/tenant/tenant-context.service';
import { WorkflowCanvasComponent } from '../components/workflow-canvas/workflow-canvas.component';
import { NodePaletteComponent } from '../components/node-palette/node-palette.component';
import { PropertiesPanelComponent } from '../components/properties-panel/properties-panel.component';
import {
  DealApprovalWorkflowDefinition,
  WorkflowConnection,
  WorkflowNode,
  WorkflowNodeConfig,
  WorkflowScopeOption,
  WorkflowStep
} from '../models/workflow-definition.model';
import { WorkflowDefinitionService } from '../services/workflow-definition.service';

@Component({
  selector: 'app-workflow-designer-legacy-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    KeyValuePipe,
    TitleCasePipe,
    FormsModule,
    ButtonModule,
    DialogModule,
    SelectModule,
    BreadcrumbsComponent,
    WorkflowCanvasComponent,
    NodePaletteComponent,
    PropertiesPanelComponent
  ],
  templateUrl: './workflow-designer-legacy.page.html',
  styleUrl: './workflow-designer-legacy.page.scss'
})
export class WorkflowDesignerLegacyPage {
  private static readonly fallbackModuleOptions: WorkflowScopeOption[] = [{ label: 'Opportunities', value: 'opportunities' }];
  private static readonly fallbackPipelineOptions: WorkflowScopeOption[] = [
    { label: 'Default Pipeline', value: 'default' },
    { label: 'All Pipelines', value: 'all' }
  ];
  private static readonly fallbackStageOptions: WorkflowScopeOption[] = [
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Security / Legal Review', value: 'Security / Legal Review' },
    { label: 'Commit', value: 'Commit' },
    { label: 'Closed Won', value: 'Closed Won' },
    { label: 'Closed Lost', value: 'Closed Lost' },
    { label: 'All Stages', value: 'All' }
  ];
  private static readonly fallbackTriggerOptions: WorkflowScopeOption[] = [
    { label: 'Manual Request', value: 'manual-request' },
    { label: 'Stage Change', value: 'on-stage-change' },
    { label: 'Amount Threshold', value: 'on-amount-threshold' },
    { label: 'Discount Threshold', value: 'on-discount-threshold' }
  ];
  protected readonly templateOptions = signal([
    { label: 'Deal Approval', value: 'deal-approval' },
    { label: 'Discount Approval', value: 'discount-approval' },
    { label: 'Large Deal Escalation', value: 'large-deal-escalation' },
    { label: 'Stage Gate Exception', value: 'stage-gate-exception' },
    { label: 'Approval + Email Follow-up', value: 'approval-email-followup' },
    { label: 'Conditional Routing', value: 'conditional-routing' },
    { label: 'Full Pipeline (All Nodes)', value: 'full-pipeline' }
  ]);

  private readonly supportedNodeTypes = new Set<DealApprovalWorkflowDefinition['nodes'][number]['type']>([
    'start',
    'approval',
    'condition',
    'email',
    'notification',
    'delay',
    'crm-update',
    'activity',
    'end'
  ]);

  private readonly workflowService = inject(WorkflowDefinitionService);
  private readonly toast = inject(AppToastService);
  private readonly tenantContext = inject(TenantContextService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly validating = signal(false);
  protected readonly updatedAtUtc = signal<string | null>(null);
  protected readonly publishedAtUtc = signal<string | null>(null);
  protected readonly publishedBy = signal<string | null>(null);
  protected readonly selectedTemplate = signal('deal-approval');
  protected readonly lastValidationErrors = signal<string[]>([]);
  protected readonly lastValidationAtUtc = signal<string | null>(null);
  protected readonly showPublishSummary = signal(false);
  protected readonly showSimulation = signal(false);
  protected readonly simulationTrace = signal<SimulationStep[]>([]);
  protected readonly publishReadiness = computed(() => this.computePublishReadiness());
  protected readonly roleOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly securityLevelOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly moduleOptions = signal<WorkflowScopeOption[]>(WorkflowDesignerLegacyPage.fallbackModuleOptions);
  protected readonly pipelineOptions = signal<WorkflowScopeOption[]>(WorkflowDesignerLegacyPage.fallbackPipelineOptions);
  protected readonly stageOptions = signal<WorkflowScopeOption[]>(WorkflowDesignerLegacyPage.fallbackStageOptions);
  protected readonly triggerOptions = signal<WorkflowScopeOption[]>(WorkflowDesignerLegacyPage.fallbackTriggerOptions);
  protected readonly workflow = signal<DealApprovalWorkflowDefinition>(this.defaultWorkflow());
  protected readonly selectedNodeId = signal<string | null>(null);
  protected readonly workflowTitle = signal('Approval Workflow Builder');
  protected readonly workflowDescription = signal('Design and publish the single CRM deal approval workflow used by opportunity approvals.');

  @ViewChild(WorkflowCanvasComponent)
  private canvas?: WorkflowCanvasComponent;

  constructor() {
    this.loadVerticalPresetContext();
    this.loadRoleOptions();
    this.loadSecurityLevelOptions();
    this.loadScopeMetadata();
    this.load();
  }

  private loadVerticalPresetContext() {
    this.tenantContext.getTenantContext().subscribe({
      next: (context) => {
        const presetId = context.verticalPresetConfiguration?.presetId ?? 'CoreCRM';
        if (presetId === 'RealEstateBrokerage') {
          this.workflowTitle.set('Brokerage Workflow Builder');
          this.workflowDescription.set('Design and publish brokerage approval and follow-up workflows for transactions and buyer readiness.');
          this.templateOptions.set([
            { label: 'New Inquiry Follow-up SLA', value: 'deal-approval' },
            { label: 'Showing Follow-up Automation', value: 'discount-approval' },
            { label: 'Weak Conversation Coaching', value: 'large-deal-escalation' },
            { label: 'Low-Readiness Conversion Approval', value: 'stage-gate-exception' },
            { label: 'Approval + Email Follow-up', value: 'approval-email-followup' },
            { label: 'Conditional Routing', value: 'conditional-routing' },
            { label: 'Full Pipeline (All Nodes)', value: 'full-pipeline' }
          ]);
          return;
        }

        this.workflowTitle.set('Approval Workflow Builder');
        this.workflowDescription.set('Design and publish the single CRM deal approval workflow used by opportunity approvals.');
        this.templateOptions.set([
          { label: 'Deal Approval', value: 'deal-approval' },
          { label: 'Discount Approval', value: 'discount-approval' },
          { label: 'Large Deal Escalation', value: 'large-deal-escalation' },
          { label: 'Stage Gate Exception', value: 'stage-gate-exception' },
          { label: 'Approval + Email Follow-up', value: 'approval-email-followup' },
          { label: 'Conditional Routing', value: 'conditional-routing' },
          { label: 'Full Pipeline (All Nodes)', value: 'full-pipeline' }
        ]);
      },
      error: () => {}
    });
  }

  protected load() {
    this.loading.set(true);
    this.lastValidationErrors.set([]);
    this.lastValidationAtUtc.set(null);
    this.workflowService.getDealApprovalDefinition().subscribe({
      next: (result) => {
        this.workflow.set(this.normalizeAgainstMetadata(this.normalize(result.definition)));
        this.ensureSelectedNode();
        this.updatedAtUtc.set(result.updatedAtUtc ?? null);
        this.publishedAtUtc.set(result.publishedAtUtc ?? null);
        this.publishedBy.set(result.publishedBy ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.workflow.set(this.normalizeAgainstMetadata(this.defaultWorkflow()));
        this.ensureSelectedNode();
        this.toast.show('error', 'Unable to load workflow definition.', 3000);
      }
    });
  }

  protected onCanvasChange(next: DealApprovalWorkflowDefinition) {
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize(next)));
    this.ensureSelectedNode();
  }

  protected addApprovalStep() {
    const current = this.normalize(this.workflow());
    const nodeId = `approval-step-${crypto.randomUUID().slice(0, 8)}`;
    const nextOrder = current.steps.length + 1;

    const steps = [...current.steps, { order: nextOrder, approverRole: '', minimumSecurityLevelId: null, amountThreshold: null, purpose: null, nodeId }];
    const nodes = [
      ...current.nodes.filter((node) => node.type !== 'end'),
      { id: nodeId, type: 'approval' as const, x: 40 + nextOrder * 260, y: 180, label: `Step ${nextOrder}` },
      { id: 'end', type: 'end' as const, x: 40 + (nextOrder + 1) * 260, y: 180, label: 'End' }
    ];

    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({
      ...current,
      steps,
      nodes,
      connections: this.createLinearConnections(steps)
    })));
    this.selectedNodeId.set(nodeId);
  }

  protected addNodeByType(type: WorkflowNode['type']) {
    if (type === 'approval') {
      this.addApprovalStep();
      return;
    }

    if (type === 'start') {
      return;
    }

    const current = this.normalize(this.workflow());
    const offset = current.nodes.length * 24;
    const nextNode: WorkflowNode = {
      id: `${type}-${crypto.randomUUID().slice(0, 8)}`,
      type,
      x: 160 + offset,
      y: 120 + offset,
      label: this.defaultNodeLabel(type)
    };

    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({
      ...current,
      nodes: [...current.nodes, nextNode]
    })));
    this.selectedNodeId.set(nextNode.id);
  }

  protected removeStep(index: number) {
    const current = this.normalize(this.workflow());
    const removedNodeId = current.steps[index]?.nodeId;
    const steps = current.steps
      .filter((_, idx) => idx !== index)
      .map((step, idx) => ({ ...step, order: idx + 1 }));

    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({
      ...current,
      steps,
      nodes: current.nodes.filter((node) => node.id !== removedNodeId),
      connections: current.connections.filter((edge) => edge.source !== removedNodeId && edge.target !== removedNodeId)
    })));
    this.ensureSelectedNode();
  }

  protected patchStep({ index, patch }: { index: number; patch: Partial<WorkflowStep> }) {
    const current = this.normalize(this.workflow());
    const steps = current.steps.map((step, idx) => (idx === index ? { ...step, ...patch } : step));
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, steps })));
  }

  protected patchNode({ nodeId, patch }: { nodeId: string; patch: Partial<WorkflowNode> }) {
    const current = this.normalize(this.workflow());
    const nodes = current.nodes.map((node) => (node.id === nodeId ? { ...node, ...patch } : node));
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, nodes })));
  }

  protected patchNodeConfig(nodeId: string, patch: Partial<WorkflowNodeConfig>) {
    const current = this.normalize(this.workflow());
    const nodes = current.nodes.map((node) => {
      if (node.id !== nodeId) {
        return node;
      }

      return {
        ...node,
        config: {
          ...(node.config ?? {}),
          ...patch
        }
      };
    });

    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, nodes })));
  }

  protected patchConnection(connectionIndex: number, patch: Partial<WorkflowConnection>) {
    const current = this.normalize(this.workflow());
    const connections = current.connections.map((connection, index) =>
      index === connectionIndex ? { ...connection, ...patch } : connection
    );
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, connections })));
  }

  protected removeNode(nodeId: string) {
    const current = this.normalize(this.workflow());
    if (nodeId === 'start' || nodeId === 'end') {
      return;
    }

    const nodes = current.nodes.filter((node) => node.id !== nodeId);
    const connections = current.connections.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, nodes, connections })));
    this.ensureSelectedNode();
  }

  protected selectNode(nodeId: string | null) {
    this.selectedNodeId.set(nodeId);
  }

  protected validate() {
    this.validating.set(true);
    const current = this.normalize(this.workflow());
    this.workflowService.validateDealApprovalDefinition(current).subscribe({
      next: (result) => {
        this.validating.set(false);
        this.lastValidationAtUtc.set(new Date().toISOString());
        this.lastValidationErrors.set(result.errors ?? []);
        if (result.isValid) {
          this.toast.show('success', 'Workflow is valid.', 2500);
          return;
        }
        this.toast.show('error', result.errors.join(' | '), 5000);
      },
      error: () => {
        this.validating.set(false);
        this.lastValidationAtUtc.set(new Date().toISOString());
        this.lastValidationErrors.set(['Validation request failed.']);
        this.toast.show('error', 'Validation failed.', 3000);
      }
    });
  }

  protected saveDraft() {
    this.persistWorkflow('save-draft', 'draft');
  }

  protected publish() {
    this.showPublishSummary.set(true);
  }

  protected confirmPublish() {
    this.showPublishSummary.set(false);
    this.persistWorkflow('publish', 'published');
  }

  protected simulate() {
    const wf = this.workflow();
    const trace = this.buildSimulationTrace(wf);
    this.simulationTrace.set(trace);
    this.showSimulation.set(true);
  }

  protected unpublish() {
    this.persistWorkflow('unpublish', 'draft');
  }

  protected revertDraft() {
    this.saving.set(true);
    const current = this.normalize(this.workflow());
    this.workflowService.saveDealApprovalDefinition(current, false, 'revert-draft').subscribe({
      next: (result) => {
        this.saving.set(false);
        this.workflow.set(this.normalizeAgainstMetadata(this.normalize(JSON.parse(result.definitionJson) as DealApprovalWorkflowDefinition)));
        this.ensureSelectedNode();
        this.updatedAtUtc.set(result.updatedAtUtc ?? null);
        this.publishedAtUtc.set(result.publishedAtUtc ?? null);
        this.publishedBy.set(result.publishedBy ?? null);
        this.lastValidationErrors.set([]);
        this.toast.show('success', 'Draft reverted to last published workflow.', 3000);
      },
      error: (error: unknown) => {
        this.saving.set(false);
        const errors = this.extractErrors(error);
        this.lastValidationErrors.set(errors);
        this.toast.show('error', errors.join(' | '), 4000);
      }
    });
  }

  protected patchScope(field: keyof DealApprovalWorkflowDefinition['scope'], value: string | number) {
    const current = this.normalize(this.workflow());
    const scope = { ...current.scope, [field]: value };
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize({ ...current, scope })));
  }

  protected applyTemplate(templateKey: string) {
    this.selectedTemplate.set(templateKey);
    this.workflow.set(this.normalizeAgainstMetadata(this.normalize(this.createTemplate(templateKey))));
    this.ensureSelectedNode();
    this.lastValidationErrors.set([]);
    this.lastValidationAtUtc.set(null);
    this.toast.show('success', 'Workflow template applied.', 2500);
  }

  private persistWorkflow(
    operation: 'save-draft' | 'publish' | 'unpublish',
    status: 'draft' | 'published'
  ) {
    this.saving.set(true);
    const current = this.normalize(this.workflow());
    const currentVersion = Math.max(1, current.scope.version || 1);
    const nextVersion = operation === 'publish' && current.scope.status !== 'published'
      ? currentVersion + 1
      : currentVersion;
    const definition: DealApprovalWorkflowDefinition = {
      ...current,
      enabled: operation === 'publish',
      scope: {
        ...current.scope,
        status,
        version: nextVersion
      }
    };

    this.workflowService.saveDealApprovalDefinition(definition, definition.enabled, operation).subscribe({
      next: (result) => {
        this.saving.set(false);
        this.updatedAtUtc.set(result.updatedAtUtc ?? null);
        this.publishedAtUtc.set(result.publishedAtUtc ?? null);
        this.publishedBy.set(result.publishedBy ?? null);
        this.lastValidationErrors.set([]);
        this.lastValidationAtUtc.set(new Date().toISOString());
        this.workflow.set(this.normalizeAgainstMetadata(this.normalize(JSON.parse(result.definitionJson) as DealApprovalWorkflowDefinition)));
        this.ensureSelectedNode();
        this.toast.show('success',
          operation === 'publish' ? 'Workflow published.'
            : operation === 'unpublish' ? 'Workflow unpublished.'
            : 'Draft saved.',
          3000);
      },
      error: (error: unknown) => {
        this.saving.set(false);
        const errors = this.extractErrors(error);
        this.lastValidationErrors.set(errors);
        this.lastValidationAtUtc.set(new Date().toISOString());
        this.toast.show('error', errors.join(' | '), 4000);
      }
    });
  }

  protected nodeCountByType(type: WorkflowNode['type']) {
    return this.workflow().nodes.filter((node) => node.type === type).length;
  }

  private computePublishReadiness(): PublishReadiness {
    const wf = this.workflow();
    const nodes = wf.nodes;
    const connections = wf.connections;
    const steps = wf.steps;
    const scope = wf.scope;

    const nodeCounts: Record<string, number> = {};
    for (const node of nodes) {
      nodeCounts[node.type] = (nodeCounts[node.type] || 0) + 1;
    }

    const warnings: string[] = [];

    // Scope checks
    if (!scope.name?.trim()) warnings.push('Workflow name is empty.');
    if (!scope.stage || scope.stage === '') warnings.push('No stage selected.');
    if (!scope.trigger || scope.trigger === '') warnings.push('No trigger selected.');

    // Structural checks
    const hasStart = nodes.some(n => n.type === 'start');
    const hasEnd = nodes.some(n => n.type === 'end');
    if (!hasStart) warnings.push('Missing start node.');
    if (!hasEnd) warnings.push('Missing end node.');
    if (connections.length === 0) warnings.push('No connections between nodes.');

    // Orphan detection
    const connectedNodeIds = new Set<string>();
    for (const conn of connections) {
      connectedNodeIds.add(conn.source);
      connectedNodeIds.add(conn.target);
    }
    const orphans = nodes.filter(n => n.type !== 'start' && !connectedNodeIds.has(n.id));
    if (orphans.length > 0) {
      warnings.push(`${orphans.length} node(s) not connected to any path.`);
    }

    // Email node config checks
    const emailNodes = nodes.filter(n => n.type === 'email');
    for (const node of emailNodes) {
      const emailConfig = node.config?.email;
      if (!emailConfig?.recipientType?.trim()) {
        warnings.push(`Email node "${node.label || node.id}" has no recipient type.`);
      }
      if (!emailConfig?.subject?.trim() && !emailConfig?.template?.trim()) {
        warnings.push(`Email node "${node.label || node.id}" has no subject or template.`);
      }
    }

    // Notification node config checks
    const notifNodes = nodes.filter(n => n.type === 'notification');
    for (const node of notifNodes) {
      const notifConfig = node.config?.notification;
      if (!notifConfig?.channel?.trim()) {
        warnings.push(`Notification node "${node.label || node.id}" has no channel.`);
      }
      if (!notifConfig?.audience?.trim()) {
        warnings.push(`Notification node "${node.label || node.id}" has no audience.`);
      }
    }

    // Condition node branch checks
    const conditionNodes = nodes.filter(n => n.type === 'condition');
    for (const node of conditionNodes) {
      const outgoing = connections.filter(c => c.source === node.id);
      if (outgoing.length < 2) {
        warnings.push(`Condition node "${node.label || node.id}" has fewer than 2 branches.`);
      }
    }

    // Approval step checks
    if (steps.length === 0 && wf.enabled) {
      warnings.push('No approval steps defined for an active workflow.');
    }
    for (const step of steps) {
      if (!step.approverRole?.trim()) {
        warnings.push(`Approval step "${step.purpose || step.nodeId}" has no approver role.`);
      }
    }

    return {
      nodeCounts,
      totalNodes: nodes.length,
      totalConnections: connections.length,
      totalSteps: steps.length,
      scopeName: scope.name || 'Unnamed',
      scopeStage: scope.stage || 'Not set',
      scopeTrigger: scope.trigger || 'Not set',
      scopePipeline: scope.pipeline || 'Not set',
      version: scope.version || 1,
      status: scope.status || 'draft',
      warnings
    };
  }

  private buildSimulationTrace(wf: DealApprovalWorkflowDefinition): SimulationStep[] {
    const nodeMap = new Map(wf.nodes.map(n => [n.id, n]));
    const outgoingMap = new Map<string, WorkflowConnection[]>();
    for (const conn of wf.connections) {
      const list = outgoingMap.get(conn.source) ?? [];
      list.push(conn);
      outgoingMap.set(conn.source, list);
    }

    const trace: SimulationStep[] = [];
    const startNode = wf.nodes.find(n => n.type === 'start');
    if (!startNode) {
      trace.push({ sequence: 1, nodeType: 'error', label: 'No start node', description: 'Workflow has no start node.' });
      return trace;
    }

    const visited = new Set<string>();
    const queue: string[] = [startNode.id];
    let seq = 0;

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const node = nodeMap.get(nodeId);
      if (!node) continue;

      seq++;
      const step: SimulationStep = {
        sequence: seq,
        nodeType: node.type,
        label: node.label || node.type,
        description: this.describeNodeAction(node, wf.steps)
      };
      trace.push(step);

      if (node.type === 'end') continue;

      if (node.type === 'approval') {
        step.description += ' [PAUSES — waits for approver decision]';
      }

      const outgoing = outgoingMap.get(nodeId) ?? [];
      if (node.type === 'condition' && outgoing.length >= 2) {
        for (const conn of outgoing) {
          const branchLabel = conn.label || conn.branchKey || 'branch';
          step.description += ` → Branch "${branchLabel}"`;
        }
      }

      for (const conn of outgoing) {
        if (!visited.has(conn.target)) {
          queue.push(conn.target);
        }
      }
    }

    return trace;
  }

  private describeNodeAction(node: WorkflowNode, steps: WorkflowStep[]): string {
    switch (node.type) {
      case 'start':
        return 'Workflow execution begins.';
      case 'end':
        return 'Workflow execution ends.';
      case 'approval': {
        const step = steps.find(s => s.nodeId === node.id);
        return step
          ? `Request approval from ${step.approverRole || 'unassigned role'} (${step.purpose || 'approval'})`
          : 'Request approval (unconfigured step).';
      }
      case 'condition': {
        const cfg = node.config?.condition;
        return cfg?.field
          ? `Evaluate condition: ${cfg.field} ${cfg.operator || '?'} ${cfg.value || '?'}`
          : 'Evaluate condition (unconfigured).';
      }
      case 'email': {
        const cfg = node.config?.email;
        return cfg?.recipientType
          ? `Send email to ${cfg.recipientType}: "${cfg.subject || 'No subject'}"`
          : 'Send email (unconfigured recipient).';
      }
      case 'notification': {
        const cfg = node.config?.notification;
        return cfg?.channel
          ? `Send ${cfg.channel} notification to ${cfg.audience || 'unknown audience'}`
          : 'Send notification (unconfigured).';
      }
      case 'delay': {
        const cfg = node.config?.delay;
        return cfg?.duration
          ? `Wait ${cfg.duration} ${cfg.unit || 'hours'}${cfg.businessHoursOnly ? ' (business hours)' : ''}`
          : 'Delay (unconfigured duration).';
      }
      case 'crm-update': {
        const cfg = node.config?.crmUpdate;
        return cfg?.field
          ? `Update opportunity: set ${cfg.field} = "${cfg.value || ''}"`
          : 'Update CRM record (unconfigured).';
      }
      case 'activity': {
        const cfg = node.config?.activity;
        return cfg?.activityType
          ? `Create ${cfg.activityType} activity: "${cfg.subject || 'untitled'}"`
          : 'Create activity (unconfigured).';
      }
      default:
        return 'Unknown action.';
    }
  }

  protected autoArrange() {
    const current = this.normalize(this.workflow());
    const approvalNodeIds = new Set(current.steps.map((step) => step.nodeId).filter((id): id is string => !!id));

    let sideIndex = 0;
    const nodes = current.nodes.map((node, index) => {
      if (node.type === 'start') {
        return { ...node, x: 40, y: 180 };
      }

      if (node.type === 'end') {
        return { ...node, x: 40 + (current.steps.length + 1) * 260, y: 180 };
      }

      if (node.type === 'approval' && approvalNodeIds.has(node.id)) {
        const step = current.steps.find((candidate) => candidate.nodeId === node.id);
        const order = step?.order ?? index + 1;
        return { ...node, x: 40 + order * 260, y: 180 };
      }

      const arranged = { ...node, x: 180 + (sideIndex % 3) * 280, y: 340 + Math.floor(sideIndex / 3) * 170 };
      sideIndex += 1;
      return arranged;
    });

    this.workflow.set(this.normalizeAgainstMetadata({ ...current, nodes }));
  }

  protected async fitView() {
    await this.canvas?.zoomToFit();
  }

  protected readonly nodeSelectionOptions = () => this.workflow().nodes.map((node) => ({
    label: `${node.type === 'approval' ? 'Approval' : this.defaultNodeLabel(node.type)} - ${node.label ?? node.id}`,
    value: node.id
  }));

  protected readonly selectedNode = () => {
    const selected = this.selectedNodeId();
    return this.workflow().nodes.find((node) => node.id === selected) ?? null;
  };

  protected readonly selectedStepIndex = () => {
    const selected = this.selectedNodeId();
    return this.workflow().steps.findIndex((step) => step.nodeId === selected);
  };

  protected readonly selectedStep = () => {
    const index = this.selectedStepIndex();
    return index >= 0 ? this.workflow().steps[index] : null;
  };

  protected readonly selectedNodeConnections = () => {
    const selected = this.selectedNodeId();
    if (!selected) {
      return [];
    }

    return this.workflow().connections
      .map((connection, index) => ({ connection, index }))
      .filter(({ connection }) => connection.source === selected);
  };

  private defaultWorkflow(): DealApprovalWorkflowDefinition {
    return this.createTemplate('deal-approval');
  }

  private loadScopeMetadata() {
    this.workflowService.getScopeMetadata().subscribe({
      next: (metadata) => {
        this.moduleOptions.set(metadata.modules?.length ? metadata.modules : WorkflowDesignerLegacyPage.fallbackModuleOptions);
        this.pipelineOptions.set(metadata.pipelines?.length ? metadata.pipelines : WorkflowDesignerLegacyPage.fallbackPipelineOptions);
        this.stageOptions.set(metadata.stages?.length ? metadata.stages : WorkflowDesignerLegacyPage.fallbackStageOptions);
        this.triggerOptions.set(metadata.triggers?.length ? metadata.triggers : WorkflowDesignerLegacyPage.fallbackTriggerOptions);
        this.workflow.update((current) => this.normalizeAgainstMetadata(this.normalize(current)));
      },
      error: () => {
        this.moduleOptions.set(WorkflowDesignerLegacyPage.fallbackModuleOptions);
        this.pipelineOptions.set(WorkflowDesignerLegacyPage.fallbackPipelineOptions);
        this.stageOptions.set(WorkflowDesignerLegacyPage.fallbackStageOptions);
        this.triggerOptions.set(WorkflowDesignerLegacyPage.fallbackTriggerOptions);
      }
    });
  }

  private createTemplate(templateKey: string): DealApprovalWorkflowDefinition {
    const salesManagerRoleId = this.resolveRoleId('Sales Manager');
    const financeManagerRoleId = this.resolveRoleId('Finance Manager') ?? salesManagerRoleId;
    const legalRoleId = this.resolveRoleId('Legal Approver') ?? financeManagerRoleId;

    switch (templateKey) {
      case 'discount-approval':
        return {
          enabled: true,
          scope: {
            name: 'Discount Approval Workflow',
            purpose: 'Route discounted deals for commercial review before update or close.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Proposal'),
            trigger: 'on-discount-threshold',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Discount', nodeId: 'approval-step-1' },
            { order: 2, approverRoleId: financeManagerRoleId, approverRole: 'Finance Manager', minimumSecurityLevelId: null, amountThreshold: 25000, purpose: 'Discount', nodeId: 'approval-step-2' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
            { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Commercial Review' },
            { id: 'approval-step-2', type: 'approval', x: 560, y: 180, label: 'Finance Sign-Off' },
            { id: 'end', type: 'end', x: 820, y: 180, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'approval-step-1' },
            { source: 'approval-step-1', target: 'approval-step-2' },
            { source: 'approval-step-2', target: 'end' }
          ]
        };
      case 'large-deal-escalation':
        return {
          enabled: true,
          scope: {
            name: 'Large Deal Escalation Workflow',
            purpose: 'Escalate high-value opportunities through commercial leadership.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Commit'),
            trigger: 'on-amount-threshold',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: 50000, purpose: 'Close', nodeId: 'approval-step-1' },
            { order: 2, approverRoleId: financeManagerRoleId, approverRole: 'Finance Manager', minimumSecurityLevelId: null, amountThreshold: 100000, purpose: 'Close', nodeId: 'approval-step-2' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
            { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Sales Approval' },
            { id: 'approval-step-2', type: 'approval', x: 560, y: 180, label: 'Executive Escalation' },
            { id: 'notification-1', type: 'notification', x: 560, y: 360, label: 'Notify Revenue Ops' },
            { id: 'end', type: 'end', x: 820, y: 180, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'approval-step-1' },
            { source: 'approval-step-1', target: 'approval-step-2' },
            { source: 'approval-step-2', target: 'notification-1' },
            { source: 'notification-1', target: 'end' }
          ]
        };
      case 'stage-gate-exception':
        return {
          enabled: true,
          scope: {
            name: 'Stage Gate Exception Workflow',
            purpose: 'Require approval before bypassing a stage gate into later opportunity stages.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Qualification'),
            trigger: 'on-stage-change',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Update', nodeId: 'approval-step-1' },
            { order: 2, approverRoleId: legalRoleId, approverRole: 'Legal Approver', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Update', nodeId: 'approval-step-2' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
            { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Stage Override Review' },
            { id: 'approval-step-2', type: 'approval', x: 560, y: 180, label: 'Risk Review' },
            { id: 'end', type: 'end', x: 820, y: 180, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'approval-step-1' },
            { source: 'approval-step-1', target: 'approval-step-2' },
            { source: 'approval-step-2', target: 'end' }
          ]
        };
      case 'approval-email-followup':
        return {
          enabled: true,
          scope: {
            name: 'Approval + Email Follow-up Workflow',
            purpose: 'Approve a deal, wait for a cooling-off period, then email the stakeholder.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Proposal'),
            trigger: 'on-stage-change',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
            { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Manager Approval' },
            { id: 'delay-1', type: 'delay', x: 560, y: 180, label: '24h Cooling Period', config: { delay: { duration: 24, unit: 'hours', businessHoursOnly: false } } },
            { id: 'email-1', type: 'email', x: 820, y: 180, label: 'Confirmation Email', config: { email: { template: 'deal-approved', recipientType: 'deal-owner', subject: 'Your deal has been approved' } } },
            { id: 'end', type: 'end', x: 1080, y: 180, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'approval-step-1' },
            { source: 'approval-step-1', target: 'delay-1' },
            { source: 'delay-1', target: 'email-1' },
            { source: 'email-1', target: 'end' }
          ]
        };
      case 'conditional-routing':
        return {
          enabled: true,
          scope: {
            name: 'Conditional Routing Workflow',
            purpose: 'Route deals above a threshold to executive review; smaller deals go straight to notification.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Proposal'),
            trigger: 'on-amount-threshold',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: financeManagerRoleId, approverRole: 'Finance Manager', minimumSecurityLevelId: null, amountThreshold: 50000, purpose: 'Close', nodeId: 'approval-step-1' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 260, label: 'Start' },
            { id: 'condition-1', type: 'condition', x: 300, y: 260, label: 'Amount > 50k?', config: { condition: { field: 'amount', operator: 'greater-than', value: '50000' } } },
            { id: 'approval-step-1', type: 'approval', x: 600, y: 120, label: 'Executive Approval' },
            { id: 'notification-1', type: 'notification', x: 600, y: 400, label: 'Notify Sales Rep', config: { notification: { channel: 'in-app', audience: 'deal-owner', message: 'Your deal has been auto-approved.' } } },
            { id: 'email-1', type: 'email', x: 900, y: 120, label: 'Approval Confirmation', config: { email: { template: 'deal-approved', recipientType: 'deal-owner', subject: 'Executive approval granted' } } },
            { id: 'end', type: 'end', x: 900, y: 400, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'condition-1' },
            { source: 'condition-1', target: 'approval-step-1', label: 'Yes' },
            { source: 'condition-1', target: 'notification-1', label: 'No' },
            { source: 'approval-step-1', target: 'email-1' },
            { source: 'email-1', target: 'end' },
            { source: 'notification-1', target: 'end' }
          ]
        };
      case 'full-pipeline':
        return {
          enabled: true,
          scope: {
            name: 'Full Pipeline Workflow',
            purpose: 'Demonstrate all node types: approval, condition, email, delay, notification, CRM update, and activity.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Proposal'),
            trigger: 'on-stage-change',
            status: 'draft',
            version: 1
          },
          steps: [
            { order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }
          ],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 220, label: 'Start' },
            { id: 'condition-1', type: 'condition', x: 300, y: 220, label: 'High Value?', config: { condition: { field: 'amount', operator: 'greater-than', value: '100000' } } },
            { id: 'approval-step-1', type: 'approval', x: 560, y: 100, label: 'Manager Sign-Off' },
            { id: 'delay-1', type: 'delay', x: 560, y: 340, label: '1-Day Wait', config: { delay: { duration: 1, unit: 'days', businessHoursOnly: true } } },
            { id: 'email-1', type: 'email', x: 820, y: 100, label: 'Send Approval Email', config: { email: { template: 'deal-approved', recipientType: 'deal-owner', subject: 'Deal approved — next steps' } } },
            { id: 'crm-update-1', type: 'crm-update', x: 820, y: 340, label: 'Advance Stage', config: { crmUpdate: { field: 'stage', value: 'Negotiation' } } },
            { id: 'notification-1', type: 'notification', x: 1080, y: 220, label: 'Notify Team', config: { notification: { channel: 'in-app', audience: 'team', message: 'Deal workflow completed.' } } },
            { id: 'activity-1', type: 'activity', x: 1340, y: 220, label: 'Schedule Follow-up', config: { activity: { activityType: 'task', subject: 'Follow-up with customer', ownerStrategy: 'deal-owner', dueInHours: 48 } } },
            { id: 'end', type: 'end', x: 1600, y: 220, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'condition-1' },
            { source: 'condition-1', target: 'approval-step-1', label: 'Yes' },
            { source: 'condition-1', target: 'delay-1', label: 'No' },
            { source: 'approval-step-1', target: 'email-1' },
            { source: 'delay-1', target: 'crm-update-1' },
            { source: 'email-1', target: 'notification-1' },
            { source: 'crm-update-1', target: 'notification-1' },
            { source: 'notification-1', target: 'activity-1' },
            { source: 'activity-1', target: 'end' }
          ]
        };
      case 'deal-approval':
      default:
        return {
          enabled: true,
          scope: {
            name: 'Deal Approval Workflow',
            purpose: 'Control discount and commercial approvals for opportunities.',
            module: 'opportunities',
            pipeline: 'default',
            stage: this.resolveStageValue('Proposal'),
            trigger: 'on-stage-change',
            status: 'draft',
            version: 1
          },
          steps: [{ order: 1, approverRoleId: salesManagerRoleId, approverRole: 'Sales Manager', minimumSecurityLevelId: null, amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }],
          nodes: [
            { id: 'start', type: 'start', x: 40, y: 180, label: 'Start' },
            { id: 'approval-step-1', type: 'approval', x: 300, y: 180, label: 'Step 1' },
            { id: 'end', type: 'end', x: 560, y: 180, label: 'End' }
          ],
          connections: [
            { source: 'start', target: 'approval-step-1' },
            { source: 'approval-step-1', target: 'end' }
          ]
        };
    }
  }

  private createLinearConnections(steps: WorkflowStep[]) {
    const edges: WorkflowConnection[] = [];
    let previous = 'start';

    for (const step of steps) {
      const nodeId = step.nodeId || `approval-step-${step.order}`;
      edges.push({ source: previous, target: nodeId });
      previous = nodeId;
    }

    edges.push({ source: previous, target: 'end' });
    return edges;
  }

  private normalize(definition: DealApprovalWorkflowDefinition): DealApprovalWorkflowDefinition {
    const steps = [...(definition.steps ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((step, index) => ({
        ...step,
        order: index + 1,
        approverRoleId: step.approverRoleId ?? null,
        minimumSecurityLevelId: step.minimumSecurityLevelId ?? null,
        nodeId: step.nodeId || `approval-step-${index + 1}`,
        approverRole: (step.approverRole ?? '').trim(),
        purpose: step.purpose?.trim() || null,
        amountThreshold: step.amountThreshold ?? null
      }));

    const stepNodeIds = new Set(steps.map((step) => step.nodeId || '').filter((id) => !!id));
    const nodes: DealApprovalWorkflowDefinition['nodes'] = [];
    const seenNodeIds = new Set<string>();

    for (const node of definition.nodes ?? []) {
      const id = (node.id ?? '').trim();
      const type = this.normalizeNodeType(node);
      if (!id || !type) {
        continue;
      }

      const normalizedId = type === 'start' ? 'start' : type === 'end' ? 'end' : id;
      if (seenNodeIds.has(normalizedId)) {
        continue;
      }

      if (type === 'approval' && !stepNodeIds.has(normalizedId)) {
        continue;
      }

      seenNodeIds.add(normalizedId);
      nodes.push({
        ...node,
        id: normalizedId,
        type,
        label: node.label?.trim() || this.defaultNodeLabel(type),
        config: this.normalizeNodeConfig(type, node.config ?? null)
      });
    }

    if (!nodes.some((node) => node.id === 'start')) {
      nodes.unshift({ id: 'start', type: 'start', x: 40, y: 180, label: 'Start', config: null });
      seenNodeIds.add('start');
    }
    if (!nodes.some((node) => node.id === 'end')) {
      nodes.push({ id: 'end', type: 'end', x: 40 + (steps.length + 1) * 260, y: 180, label: 'End', config: null });
      seenNodeIds.add('end');
    }

    for (const [index, step] of steps.entries()) {
      const nodeId = step.nodeId || `approval-step-${index + 1}`;
      if (!nodes.some((node) => node.id === nodeId)) {
        nodes.push({ id: nodeId, type: 'approval', x: 40 + (index + 1) * 260, y: 180, label: `Step ${index + 1}`, config: null });
        seenNodeIds.add(nodeId);
      }
    }

    const connections = (definition.connections ?? [])
      .filter(
        (edge, index, all) => seenNodeIds.has(edge.source) && seenNodeIds.has(edge.target)
          && edge.source !== edge.target
          && all.findIndex((candidate) => candidate.source === edge.source && candidate.target === edge.target) === index
      )
      .map((edge) => ({
        ...edge,
        label: edge.label?.trim() || null,
        branchKey: edge.branchKey?.trim() || null
      }));

    return {
      enabled: definition.enabled,
      scope: {
        name: definition.scope?.name === undefined || definition.scope?.name === null ? 'Deal Approval Workflow' : definition.scope.name.trim(),
        purpose: definition.scope?.purpose === undefined || definition.scope?.purpose === null
          ? 'Control discount and commercial approvals for opportunities.'
          : definition.scope.purpose.trim(),
        module: definition.scope?.module === undefined || definition.scope?.module === null ? 'opportunities' : definition.scope.module.trim(),
        pipeline: definition.scope?.pipeline === undefined || definition.scope?.pipeline === null ? 'default' : definition.scope.pipeline.trim(),
        stage: definition.scope?.stage === undefined || definition.scope?.stage === null ? this.resolveStageValue('Proposal') : definition.scope.stage.trim(),
        trigger: definition.scope?.trigger === undefined || definition.scope?.trigger === null
          ? 'on-stage-change'
          : definition.scope.trigger.trim(),
        status: definition.scope?.status === 'published' ? 'published' : 'draft',
        version: Math.max(1, definition.scope?.version ?? 1)
      },
      steps,
      nodes,
      connections: connections.length ? connections : this.createLinearConnections(steps)
    };
  }

  private loadRoleOptions() {
    this.workflowService.getRoleOptions().subscribe({
      next: (roles) => {
        this.roleOptions.set((roles ?? [])
          .map((role) => ({ label: role.name, value: role.id }))
          .sort((left, right) => left.label.localeCompare(right.label)));
      },
      error: () => {
        this.roleOptions.set([]);
      }
    });
  }

  private loadSecurityLevelOptions() {
    this.workflowService.getSecurityLevelOptions().subscribe({
      next: (levels) => {
        this.securityLevelOptions.set((levels ?? [])
          .map((level) => ({ label: `${level.name} (Rank ${level.rank})`, value: level.id }))
          .sort((left, right) => left.label.localeCompare(right.label)));
      },
      error: () => {
        this.securityLevelOptions.set([]);
      }
    });
  }

  private resolveRoleId(roleName: string) {
    return this.roleOptions().find((role) => role.label === roleName)?.value ?? null;
  }

  private normalizeAgainstMetadata(definition: DealApprovalWorkflowDefinition): DealApprovalWorkflowDefinition {
    return {
      ...definition,
      scope: {
        ...definition.scope,
        module: this.normalizeOptionValue(definition.scope.module, this.moduleOptions(), this.moduleOptions()[0]?.value ?? 'opportunities'),
        pipeline: this.normalizeOptionValue(definition.scope.pipeline, this.pipelineOptions(), this.pipelineOptions()[0]?.value ?? 'default'),
        stage: this.normalizeOptionValue(definition.scope.stage, this.stageOptions(), this.resolveStageValue('Proposal')),
        trigger: this.normalizeOptionValue(definition.scope.trigger, this.triggerOptions(), this.triggerOptions()[0]?.value ?? 'manual-request')
      }
    };
  }

  private normalizeOptionValue(value: string | null | undefined, options: WorkflowScopeOption[], fallback: string) {
    const normalized = value?.trim();
    if (!normalized) {
      return fallback;
    }

    const match = options.find((option) => option.value.toLowerCase() === normalized.toLowerCase());
    return match?.value ?? fallback;
  }

  private resolveStageValue(preferredStage: string) {
    const exact = this.stageOptions().find((option) => option.value.toLowerCase() === preferredStage.toLowerCase());
    if (exact) {
      return exact.value;
    }

    const firstTenantStage = this.stageOptions().find((option) => option.value.toLowerCase() !== 'all');
    return firstTenantStage?.value ?? preferredStage;
  }

  private normalizeNodeType(node: DealApprovalWorkflowDefinition['nodes'][number]) {
    const rawType = (node.type ?? '').toLowerCase().trim() as DealApprovalWorkflowDefinition['nodes'][number]['type'];
    if (this.supportedNodeTypes.has(rawType)) {
      return rawType;
    }

    if (node.id === 'start') {
      return 'start';
    }

    if (node.id === 'end') {
      return 'end';
    }

    return null;
  }

  private defaultNodeLabel(type: WorkflowNode['type']) {
    if (type === 'start') return 'Start';
    if (type === 'approval') return 'Approval Step';
    if (type === 'condition') return 'Condition';
    if (type === 'email') return 'Email';
    if (type === 'notification') return 'Notification';
    if (type === 'delay') return 'Delay';
    if (type === 'crm-update') return 'CRM Update';
    if (type === 'activity') return 'Activity';
    return 'End';
  }

  private ensureSelectedNode() {
    const selected = this.selectedNodeId();
    if (selected && this.workflow().nodes.some((node) => node.id === selected)) {
      return;
    }

    this.selectedNodeId.set(this.workflow().nodes.find((node) => node.type === 'approval')?.id ?? this.workflow().nodes[0]?.id ?? null);
  }

  private normalizeNodeConfig(type: WorkflowNode['type'], config: WorkflowNodeConfig | null | undefined): WorkflowNodeConfig | null {
    if (!config) {
      if (type === 'condition') {
        return { condition: { field: null, operator: null, value: null } };
      }
      if (type === 'delay') {
        return { delay: { duration: null, unit: 'hours', businessHoursOnly: false } };
      }
      if (type === 'email') {
        return { email: { template: null, recipientType: null, subject: null } };
      }
      if (type === 'notification') {
        return { notification: { channel: null, audience: null, message: null } };
      }
      if (type === 'crm-update') {
        return { crmUpdate: { field: null, value: null } };
      }
      if (type === 'activity') {
        return { activity: { activityType: null, subject: null, ownerStrategy: null, dueInHours: null } };
      }
      return null;
    }

    return {
      condition: config.condition
        ? {
            field: config.condition.field?.trim() || null,
            operator: config.condition.operator?.trim() || null,
            value: config.condition.value?.trim() || null
          }
        : type === 'condition' ? { field: null, operator: null, value: null } : null,
      delay: config.delay
        ? {
            duration: config.delay.duration ?? null,
            unit: config.delay.unit ?? 'hours',
            businessHoursOnly: !!config.delay.businessHoursOnly
          }
        : type === 'delay' ? { duration: null, unit: 'hours', businessHoursOnly: false } : null,
      email: config.email
        ? {
            template: config.email.template?.trim() || null,
            recipientType: config.email.recipientType?.trim() || null,
            subject: config.email.subject?.trim() || null
          }
        : type === 'email' ? { template: null, recipientType: null, subject: null } : null,
      notification: config.notification
        ? {
            channel: config.notification.channel?.trim() || null,
            audience: config.notification.audience?.trim() || null,
            message: config.notification.message?.trim() || null
          }
        : type === 'notification' ? { channel: null, audience: null, message: null } : null,
      crmUpdate: config.crmUpdate
        ? {
            field: config.crmUpdate.field?.trim() || null,
            value: config.crmUpdate.value?.trim() || null
          }
        : type === 'crm-update' ? { field: null, value: null } : null,
      activity: config.activity
        ? {
            activityType: config.activity.activityType?.trim() || null,
            subject: config.activity.subject?.trim() || null,
            ownerStrategy: config.activity.ownerStrategy?.trim() || null,
            dueInHours: config.activity.dueInHours ?? null
          }
        : type === 'activity' ? { activityType: null, subject: null, ownerStrategy: null, dueInHours: null } : null
    };
  }

  private extractErrors(error: unknown) {
    const payload = (error as {
      error?: string | string[] | { errors?: string[]; error?: string; text?: string; title?: string };
      message?: string;
    })?.error;

    if (Array.isArray(payload)) {
      return payload.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    }

    if (typeof payload === 'string') {
      const parsed = payload.split(';').map((item) => item.trim()).filter(Boolean);
      if (parsed.length > 0) {
        return parsed;
      }
    }

    if (payload && typeof payload === 'object') {
      if (Array.isArray(payload.errors) && payload.errors.length > 0) {
        return payload.errors.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
      }

      if (typeof payload.error === 'string' && payload.error.trim().length > 0) {
        return payload.error.split(';').map((item) => item.trim()).filter(Boolean);
      }

      if (typeof payload.text === 'string' && payload.text.trim().length > 0) {
        return payload.text.split(';').map((item) => item.trim()).filter(Boolean);
      }

      if (typeof payload.title === 'string' && payload.title.trim().length > 0) {
        return [payload.title.trim()];
      }
    }

    const message = (error as { message?: string })?.message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return [message.trim()];
    }

    return ['Unable to save workflow.'];
  }
}

interface PublishReadiness {
  nodeCounts: Record<string, number>;
  totalNodes: number;
  totalConnections: number;
  totalSteps: number;
  scopeName: string;
  scopeStage: string;
  scopeTrigger: string;
  scopePipeline: string;
  version: number;
  status: string;
  warnings: string[];
}

interface SimulationStep {
  sequence: number;
  nodeType: string;
  label: string;
  description: string;
}
