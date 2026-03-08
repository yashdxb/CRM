import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { WorkflowCanvasComponent } from '../components/workflow-canvas/workflow-canvas.component';
import { NodePaletteComponent } from '../components/node-palette/node-palette.component';
import { PropertiesPanelComponent } from '../components/properties-panel/properties-panel.component';
import { DealApprovalWorkflowDefinition, WorkflowNode, WorkflowStep } from '../models/workflow-definition.model';
import { WorkflowDefinitionService } from '../services/workflow-definition.service';

@Component({
  selector: 'app-workflow-designer-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ButtonModule,
    BreadcrumbsComponent,
    WorkflowCanvasComponent,
    NodePaletteComponent,
    PropertiesPanelComponent
  ],
  templateUrl: './workflow-designer.page.html',
  styleUrl: './workflow-designer.page.scss'
})
export class WorkflowDesignerPage {
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

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly validating = signal(false);
  protected readonly updatedAtUtc = signal<string | null>(null);
  protected readonly publishedAtUtc = signal<string | null>(null);
  protected readonly publishedBy = signal<string | null>(null);
  protected readonly lastValidationErrors = signal<string[]>([]);
  protected readonly lastValidationAtUtc = signal<string | null>(null);
  protected readonly roleOptions = signal<Array<{ label: string; value: string }>>([]);
  protected readonly workflow = signal<DealApprovalWorkflowDefinition>(this.defaultWorkflow());

  @ViewChild(WorkflowCanvasComponent)
  private canvas?: WorkflowCanvasComponent;

  constructor() {
    this.loadRoleOptions();
    this.load();
  }

  protected load() {
    this.loading.set(true);
    this.lastValidationErrors.set([]);
    this.lastValidationAtUtc.set(null);
    this.workflowService.getDealApprovalDefinition().subscribe({
      next: (result) => {
        this.workflow.set(this.normalize(result.definition));
        this.updatedAtUtc.set(result.updatedAtUtc ?? null);
        this.publishedAtUtc.set(result.publishedAtUtc ?? null);
        this.publishedBy.set(result.publishedBy ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.workflow.set(this.defaultWorkflow());
        this.toast.show('error', 'Unable to load workflow definition.', 3000);
      }
    });
  }

  protected onCanvasChange(next: DealApprovalWorkflowDefinition) {
    this.workflow.set(this.normalize(next));
  }

  protected addApprovalStep() {
    const current = this.normalize(this.workflow());
    const nodeId = `approval-step-${crypto.randomUUID().slice(0, 8)}`;
    const nextOrder = current.steps.length + 1;

    const steps = [...current.steps, { order: nextOrder, approverRole: '', amountThreshold: null, purpose: null, nodeId }];
    const nodes = [
      ...current.nodes.filter((node) => node.type !== 'end'),
      { id: nodeId, type: 'approval' as const, x: 40 + nextOrder * 260, y: 180, label: `Step ${nextOrder}` },
      { id: 'end', type: 'end' as const, x: 40 + (nextOrder + 1) * 260, y: 180, label: 'End' }
    ];

    this.workflow.set(this.normalize({
      ...current,
      steps,
      nodes,
      connections: this.createLinearConnections(steps)
    }));
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

    this.workflow.set(this.normalize({
      ...current,
      nodes: [...current.nodes, nextNode]
    }));
  }

  protected removeStep(index: number) {
    const current = this.normalize(this.workflow());
    const removedNodeId = current.steps[index]?.nodeId;
    const steps = current.steps
      .filter((_, idx) => idx !== index)
      .map((step, idx) => ({ ...step, order: idx + 1 }));

    this.workflow.set(this.normalize({
      ...current,
      steps,
      nodes: current.nodes.filter((node) => node.id !== removedNodeId),
      connections: current.connections.filter((edge) => edge.source !== removedNodeId && edge.target !== removedNodeId)
    }));
  }

  protected patchStep({ index, patch }: { index: number; patch: Partial<WorkflowStep> }) {
    const current = this.normalize(this.workflow());
    const steps = current.steps.map((step, idx) => (idx === index ? { ...step, ...patch } : step));
    this.workflow.set(this.normalize({ ...current, steps }));
  }

  protected patchNode({ nodeId, patch }: { nodeId: string; patch: Partial<WorkflowNode> }) {
    const current = this.normalize(this.workflow());
    const nodes = current.nodes.map((node) => (node.id === nodeId ? { ...node, ...patch } : node));
    this.workflow.set(this.normalize({ ...current, nodes }));
  }

  protected removeNode(nodeId: string) {
    const current = this.normalize(this.workflow());
    if (nodeId === 'start' || nodeId === 'end') {
      return;
    }

    const nodes = current.nodes.filter((node) => node.id !== nodeId);
    const connections = current.connections.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
    this.workflow.set(this.normalize({ ...current, nodes, connections }));
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
    this.persistWorkflow('publish', 'published');
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
        this.workflow.set(this.normalize(JSON.parse(result.definitionJson) as DealApprovalWorkflowDefinition));
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
    this.workflow.set(this.normalize({ ...current, scope }));
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
        this.workflow.set(this.normalize(JSON.parse(result.definitionJson) as DealApprovalWorkflowDefinition));
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

    this.workflow.set({ ...current, nodes });
  }

  protected async fitView() {
    await this.canvas?.zoomToFit();
  }

  private defaultWorkflow(): DealApprovalWorkflowDefinition {
    return {
      enabled: true,
      scope: {
        name: 'Deal Approval Workflow',
        purpose: 'Control discount and commercial approvals for opportunities.',
        module: 'opportunities',
        pipeline: 'default',
        stage: 'proposal',
        trigger: 'on-stage-change',
        status: 'draft',
        version: 1
      },
      steps: [{ order: 1, approverRoleId: null, approverRole: 'Sales Manager', amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }],
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

  private createLinearConnections(steps: WorkflowStep[]) {
    const edges: { source: string; target: string }[] = [];
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
        label: node.label?.trim() || this.defaultNodeLabel(type)
      });
    }

    if (!nodes.some((node) => node.id === 'start')) {
      nodes.unshift({ id: 'start', type: 'start', x: 40, y: 180, label: 'Start' });
      seenNodeIds.add('start');
    }
    if (!nodes.some((node) => node.id === 'end')) {
      nodes.push({ id: 'end', type: 'end', x: 40 + (steps.length + 1) * 260, y: 180, label: 'End' });
      seenNodeIds.add('end');
    }

    for (const [index, step] of steps.entries()) {
      const nodeId = step.nodeId || `approval-step-${index + 1}`;
      if (!nodes.some((node) => node.id === nodeId)) {
        nodes.push({ id: nodeId, type: 'approval', x: 40 + (index + 1) * 260, y: 180, label: `Step ${index + 1}` });
        seenNodeIds.add(nodeId);
      }
    }

    const connections = (definition.connections ?? []).filter(
      (edge, index, all) => seenNodeIds.has(edge.source) && seenNodeIds.has(edge.target)
        && edge.source !== edge.target
        && all.findIndex((candidate) => candidate.source === edge.source && candidate.target === edge.target) === index
    );

    return {
      enabled: definition.enabled,
      scope: {
        name: definition.scope?.name === undefined || definition.scope?.name === null ? 'Deal Approval Workflow' : definition.scope.name.trim(),
        purpose: definition.scope?.purpose === undefined || definition.scope?.purpose === null
          ? 'Control discount and commercial approvals for opportunities.'
          : definition.scope.purpose.trim(),
        module: definition.scope?.module === undefined || definition.scope?.module === null ? 'opportunities' : definition.scope.module.trim(),
        pipeline: definition.scope?.pipeline === undefined || definition.scope?.pipeline === null ? 'default' : definition.scope.pipeline.trim(),
        stage: definition.scope?.stage === undefined || definition.scope?.stage === null ? 'proposal' : definition.scope.stage.trim(),
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
