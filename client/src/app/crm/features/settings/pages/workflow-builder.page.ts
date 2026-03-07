import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import {
  DealApprovalWorkflow,
  DealApprovalWorkflowConnection,
  DealApprovalWorkflowNode,
  DealApprovalWorkflowStep
} from '../models/deal-approval-workflow.model';
import { DealApprovalWorkflowBuilderService } from '../services/deal-approval-workflow-builder.service';

type ReteEditorInstance = {
  destroy?: () => void;
};

@Component({
  selector: 'app-workflow-builder-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputNumberModule,
    InputTextModule,
    BreadcrumbsComponent
  ],
  templateUrl: './workflow-builder.page.html',
  styleUrl: './workflow-builder.page.scss'
})
export class WorkflowBuilderPage implements AfterViewInit, OnDestroy {
  private readonly service = inject(DealApprovalWorkflowBuilderService);
  private readonly toast = inject(AppToastService);
  private readonly injector = inject(Injector);

  @ViewChild('canvasHost')
  private canvasHost?: ElementRef<HTMLDivElement>;

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly workflow = signal<DealApprovalWorkflow>({
    enabled: true,
    steps: [{ order: 1, approverRole: 'Sales Manager', amountThreshold: null, purpose: 'Deal Approval', nodeId: 'approval-step-1' }],
    nodes: [
      { id: 'start', type: 'start', x: 40, y: 180 },
      { id: 'approval-step-1', type: 'approval', x: 300, y: 180 },
      { id: 'end', type: 'end', x: 560, y: 180 }
    ],
    connections: [
      { source: 'start', target: 'approval-step-1' },
      { source: 'approval-step-1', target: 'end' }
    ]
  });

  private reteInstance: ReteEditorInstance | null = null;
  private viewReady = false;

  constructor() {
    this.loadWorkflow();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    void this.renderCanvas();
  }

  ngOnDestroy(): void {
    this.reteInstance?.destroy?.();
    this.reteInstance = null;
  }

  protected loadWorkflow() {
    this.loading.set(true);
    this.service.getWorkflow().subscribe({
      next: (workflow) => {
        this.workflow.set(this.normalizeWorkflow(workflow));
        this.loading.set(false);
        void this.renderCanvas();
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load workflow builder.', 3000);
      }
    });
  }

  protected addStep() {
    const current = this.normalizeWorkflow(this.workflow());
    const stepNodeId = `approval-step-${crypto.randomUUID().slice(0, 8)}`;
    const nextOrder = current.steps.length + 1;
    const stepX = 40 + nextOrder * 260;

    const steps = [
      ...current.steps,
      { order: nextOrder, approverRole: '', amountThreshold: null, purpose: null, nodeId: stepNodeId }
    ];

    const nodes: DealApprovalWorkflowNode[] = [
      ...current.nodes.filter((node) => node.id !== 'end'),
      { id: stepNodeId, type: 'approval', x: stepX, y: 180 } as DealApprovalWorkflowNode,
      { ...(current.nodes.find((node) => node.id === 'end')!), x: 40 + (nextOrder + 1) * 260 } as DealApprovalWorkflowNode
    ];

    this.workflow.set(
      this.normalizeWorkflow({
        ...current,
        steps,
        nodes,
        connections: this.createLinearConnections(steps)
      })
    );

    void this.renderCanvas();
  }

  protected removeStep(index: number) {
    const current = this.normalizeWorkflow(this.workflow());
    const removed = current.steps[index];
    const steps = current.steps
      .filter((_, idx) => idx !== index)
      .map((step, idx) => ({ ...step, order: idx + 1 }));

    const removedNodeId = removed?.nodeId ?? '';
    const nodes = current.nodes.filter((node) => node.id !== removedNodeId);

    this.workflow.set(
      this.normalizeWorkflow({
        ...current,
        steps,
        nodes,
        connections: current.connections.filter((connection) => connection.source !== removedNodeId && connection.target !== removedNodeId)
      })
    );

    void this.renderCanvas();
  }

  protected updateStep(index: number, patch: Partial<DealApprovalWorkflowStep>) {
    const current = this.normalizeWorkflow(this.workflow());
    const steps = current.steps.map((step, idx) => (idx === index ? { ...step, ...patch } : step));
    this.workflow.set(this.normalizeWorkflow({ ...current, steps }));
    void this.renderCanvas();
  }

  protected toggleEnabled(enabled: boolean) {
    const current = this.workflow();
    this.workflow.set({ ...current, enabled });
  }

  protected saveWorkflow() {
    const normalized = this.normalizeWorkflow(this.workflow());
    if (normalized.enabled && normalized.steps.length === 0) {
      this.toast.show('error', 'Add at least one approval step.', 3000);
      return;
    }

    if (normalized.steps.some((step) => !step.approverRole.trim())) {
      this.toast.show('error', 'Every step requires an approver role.', 3000);
      return;
    }

    this.saving.set(true);
    this.service.updateWorkflow(normalized).subscribe({
      next: (workflow) => {
        this.saving.set(false);
        this.workflow.set(this.normalizeWorkflow(workflow));
        void this.renderCanvas();
        this.toast.show('success', 'Deal approval workflow saved.', 3000);
      },
      error: (error: unknown) => {
        this.saving.set(false);
        const message = (error as { error?: string })?.error ?? 'Unable to save workflow.';
        this.toast.show('error', message, 3000);
      }
    });
  }

  private normalizeWorkflow(workflow: DealApprovalWorkflow): DealApprovalWorkflow {
    const sortedSteps = [...(workflow.steps ?? [])]
      .filter((step) => !!step)
      .sort((a, b) => a.order - b.order)
      .map((step, index) => ({
        order: index + 1,
        approverRole: (step.approverRole ?? '').trim(),
        amountThreshold: step.amountThreshold ?? null,
        purpose: step.purpose?.trim() ? step.purpose.trim() : null,
        nodeId: step.nodeId?.trim() || `approval-step-${index + 1}`
      }));

    const nodesById = new Map<string, DealApprovalWorkflowNode>((workflow.nodes ?? []).map((node) => [node.id, node]));
    const nodes: DealApprovalWorkflowNode[] = [];

    nodes.push(nodesById.get('start') ?? { id: 'start', type: 'start', x: 40, y: 180 });

    sortedSteps.forEach((step, index) => {
      const nodeId = step.nodeId ?? `approval-step-${index + 1}`;
      const existing = nodesById.get(nodeId);
      nodes.push(existing ?? { id: nodeId, type: 'approval', x: 40 + (index + 1) * 260, y: 180 });
    });

    nodes.push(nodesById.get('end') ?? { id: 'end', type: 'end', x: 40 + (sortedSteps.length + 1) * 260, y: 180 });

    const validNodeIds = new Set(nodes.map((node) => node.id));
    const validConnections = (workflow.connections ?? [])
      .filter((connection) => validNodeIds.has(connection.source) && validNodeIds.has(connection.target) && connection.source !== connection.target)
      .filter((connection, index, all) => all.findIndex((item) => item.source === connection.source && item.target === connection.target) === index);

    const connections = validConnections.length ? validConnections : this.createLinearConnections(sortedSteps);

    return {
      enabled: workflow.enabled && sortedSteps.length > 0,
      steps: sortedSteps,
      nodes,
      connections
    };
  }

  private createLinearConnections(steps: DealApprovalWorkflowStep[]): DealApprovalWorkflowConnection[] {
    const result: DealApprovalWorkflowConnection[] = [];
    let previous = 'start';

    steps.forEach((step) => {
      const nodeId = step.nodeId || `approval-step-${step.order}`;
      result.push({ source: previous, target: nodeId });
      previous = nodeId;
    });

    result.push({ source: previous, target: 'end' });
    return result;
  }

  private syncNodePosition(nodeId: string, x: number, y: number) {
    const current = this.workflow();
    const nodes = current.nodes.map((node) => (node.id === nodeId ? { ...node, x, y } : node));
    this.workflow.set({ ...current, nodes });
  }

  private syncConnectionsFromEditor(editor: unknown) {
    const editorConnections = (editor as any)
      .getConnections()
      .map((connection: any) => ({ source: connection.source as string, target: connection.target as string }))
      .filter((connection: DealApprovalWorkflowConnection) => connection.source !== connection.target)
      .filter((connection: DealApprovalWorkflowConnection, index: number, all: DealApprovalWorkflowConnection[]) =>
        all.findIndex((item) => item.source === connection.source && item.target === connection.target) === index
      );

    const current = this.workflow();
    this.workflow.set({ ...current, connections: editorConnections });
  }

  private nodeLabel(node: DealApprovalWorkflowNode, indexByNode: Map<string, DealApprovalWorkflowStep>): string {
    if (node.type === 'start') {
      return 'Start';
    }

    if (node.type === 'end') {
      return 'End';
    }

    const step = indexByNode.get(node.id);
    if (!step) {
      return 'Approval Step';
    }

    const role = step.approverRole || 'Approver role';
    const threshold = step.amountThreshold != null ? ` | >= ${step.amountThreshold}` : '';
    return `Step ${step.order}: ${role}${threshold}`;
  }

  private async renderCanvas(): Promise<void> {
    if (!this.viewReady || !this.canvasHost) {
      return;
    }

    this.reteInstance?.destroy?.();
    this.reteInstance = null;

    const container = this.canvasHost.nativeElement;
    container.innerHTML = '';

    const { NodeEditor, ClassicPreset } = await import('rete');
    const { AreaPlugin, AreaExtensions } = await import('rete-area-plugin');
    const { ConnectionPlugin, Presets: ConnectionPresets } = await import('rete-connection-plugin');
    const { AngularPlugin, Presets: AngularPresets } = await import('rete-angular-plugin/21');

    const socket = new ClassicPreset.Socket('workflow');

    class WorkflowNode extends ClassicPreset.Node {
      constructor(id: string, title: string, canInput: boolean, canOutput: boolean) {
        super(title);
        this.id = id;
        if (canInput) {
          this.addInput('in', new ClassicPreset.Input(socket, 'In'));
        }
        if (canOutput) {
          this.addOutput('out', new ClassicPreset.Output(socket, 'Out'));
        }
      }
    }

    const editor = new NodeEditor();
    const area = new AreaPlugin(container);
    const connection = new ConnectionPlugin();
    const render = new AngularPlugin({ injector: this.injector });

    (editor as any).use(area as any);
    (area as any).use(connection as any);
    (area as any).use(render as any);

    (connection as any).addPreset((ConnectionPresets as any).classic.setup());
    (render as any).addPreset((AngularPresets as any).classic.setup());
    (AreaExtensions as any).simpleNodesOrder(area);

    const indexByNode = new Map(this.workflow().steps.map((step) => [step.nodeId as string, step]));
    const nodes = this.workflow().nodes;
    const nodeInstances = new Map<string, InstanceType<typeof WorkflowNode>>();

    for (const node of nodes) {
      const canInput = node.type !== 'start';
      const canOutput = node.type !== 'end';
      const instance = new WorkflowNode(node.id, this.nodeLabel(node, indexByNode), canInput, canOutput);
      await (editor as any).addNode(instance);
      await (area as any).translate(instance.id, { x: node.x, y: node.y });
      nodeInstances.set(node.id, instance);
    }

    for (const edge of this.workflow().connections) {
      const source = nodeInstances.get(edge.source);
      const target = nodeInstances.get(edge.target);
      if (!source || !target || source.id === target.id) {
        continue;
      }

      await (editor as any).addConnection(new ClassicPreset.Connection(source, 'out', target, 'in'));
    }

    (area as any).addPipe((context: any) => {
      if (context?.type === 'nodetranslated') {
        const { id, position } = context.data;
        this.syncNodePosition(id, position.x, position.y);
      }
      return context;
    });

    (editor as any).addPipe((context: any) => {
      if (context?.type === 'connectioncreated' || context?.type === 'connectionremoved') {
        this.syncConnectionsFromEditor(editor);
      }
      return context;
    });

    await (AreaExtensions as any).zoomAt(area, (editor as any).getNodes());

    this.reteInstance = {
      destroy: () => {
        (area as any).destroy?.();
      }
    };
  }
}
