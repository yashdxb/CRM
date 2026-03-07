import { Component, ElementRef, EventEmitter, Injector, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { DealApprovalWorkflowDefinition, WorkflowConnection, WorkflowNode, WorkflowStep } from '../../models/workflow-definition.model';

type ReteEditorInstance = { destroy?: () => void };

@Component({
  selector: 'app-workflow-canvas',
  standalone: true,
  template: `
    <div
      class="workflow-canvas-host"
      #canvasHost
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
    ></div>
  `,
  styleUrl: './workflow-canvas.component.scss'
})
export class WorkflowCanvasComponent implements OnChanges, OnDestroy {
  private readonly injector = inject(Injector);
  private readonly paletteDataKey = 'workflow-node-type';
  private readonly supportedNodeTypes = new Set<WorkflowNode['type']>([
    'approval',
    'condition',
    'email',
    'notification',
    'delay',
    'crm-update',
    'activity',
    'end'
  ]);

  @Input({ required: true }) workflow!: DealApprovalWorkflowDefinition;
  @Output() workflowChange = new EventEmitter<DealApprovalWorkflowDefinition>();

  @ViewChild('canvasHost', { static: true })
  private canvasHost?: ElementRef<HTMLDivElement>;

  private reteInstance: ReteEditorInstance | null = null;
  private editorRef: any | null = null;
  private areaRef: any | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workflow']) {
      void this.renderCanvas();
    }
  }

  ngOnDestroy(): void {
    this.reteInstance?.destroy?.();
    this.reteInstance = null;
    this.editorRef = null;
    this.areaRef = null;
  }

  async zoomToFit() {
    if (!this.editorRef || !this.areaRef) {
      return;
    }

    const { AreaExtensions } = await import('rete-area-plugin');
    await (AreaExtensions as any).zoomAt(this.areaRef, this.editorRef.getNodes());
  }

  protected onDragOver(event: DragEvent) {
    if (!event.dataTransfer) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  protected onDrop(event: DragEvent) {
    const container = this.canvasHost?.nativeElement;
    if (!container || !event.dataTransfer) {
      return;
    }

    event.preventDefault();
    const nodeType = event.dataTransfer.getData(this.paletteDataKey)
      || (globalThis as any).__workflowNodeType
      || '';
    if (!this.supportedNodeTypes.has(nodeType as WorkflowNode['type'])) {
      return;
    }
    (globalThis as any).__workflowNodeType = undefined;

    const bounds = container.getBoundingClientRect();
    const x = Math.max(24, Math.round(event.clientX - bounds.left - 70));
    const y = Math.max(24, Math.round(event.clientY - bounds.top - 40));
    if (nodeType === 'approval') {
      this.addApprovalStepAt(x, y);
      return;
    }

    this.addNodeAt(nodeType as WorkflowNode['type'], x, y);
  }

  private syncNodePosition(nodeId: string, x: number, y: number) {
    const nodes = this.workflow.nodes.map((node) => (node.id === nodeId ? { ...node, x, y } : node));
    this.workflowChange.emit({ ...this.workflow, nodes });
  }

  private syncConnections(connections: WorkflowConnection[]) {
    this.workflowChange.emit({ ...this.workflow, connections });
  }

  private addApprovalStepAt(x: number, y: number) {
    const steps = [...(this.workflow.steps ?? [])];
    const order = steps.length + 1;
    const nodeId = `approval-step-${crypto.randomUUID().slice(0, 8)}`;

    const nextSteps = [...steps, {
      order,
      approverRole: '',
      amountThreshold: null,
      purpose: null,
      nodeId
    }];

    const otherNodes = (this.workflow.nodes ?? []).filter((node) => node.type !== 'end');
    const endNode = (this.workflow.nodes ?? []).find((node) => node.type === 'end') ?? {
      id: 'end',
      type: 'end' as const,
      x: x + 240,
      y,
      label: 'End'
    };

    const nextNodes = [...otherNodes, { id: nodeId, type: 'approval' as const, x, y, label: `Step ${order}` }, endNode];
    const nextConnections = this.createLinearConnections(nextSteps);

    this.workflowChange.emit({
      ...this.workflow,
      steps: nextSteps,
      nodes: nextNodes,
      connections: nextConnections
    });
  }

  private addNodeAt(nodeType: WorkflowNode['type'], x: number, y: number) {
    const normalizedType = nodeType === 'start' ? 'approval' : nodeType;
    const nextId = normalizedType === 'end'
      ? `end-${crypto.randomUUID().slice(0, 8)}`
      : `${normalizedType}-${crypto.randomUUID().slice(0, 8)}`;

    const nextNodes = [...(this.workflow.nodes ?? []), { id: nextId, type: normalizedType, x, y, label: this.defaultNodeLabel(normalizedType) }];
    this.workflowChange.emit({
      ...this.workflow,
      nodes: nextNodes
    });
  }

  private createLinearConnections(steps: WorkflowStep[]): WorkflowConnection[] {
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

  private nodeLabel(node: WorkflowNode, indexByNode: Map<string, WorkflowStep>): string {
    if (node.label?.trim()) return node.label.trim();
    if (node.type === 'start') return 'Start';
    if (node.type === 'end') return 'End';
    if (node.type === 'condition') return 'Condition';
    if (node.type === 'email') return 'Email';
    if (node.type === 'notification') return 'Notification';
    if (node.type === 'delay') return 'Delay';
    if (node.type === 'crm-update') return 'CRM Update';
    if (node.type === 'activity') return 'Create Activity';

    const step = indexByNode.get(node.id);
    if (!step) return 'Approval Step';

    const role = step.approverRole || 'Approver role';
    const threshold = step.amountThreshold != null ? ` | >= ${step.amountThreshold}` : '';
    return `Step ${step.order}: ${role}${threshold}`;
  }

  private defaultNodeLabel(type: WorkflowNode['type']): string {
    if (type === 'condition') return 'Condition';
    if (type === 'email') return 'Email';
    if (type === 'notification') return 'Notification';
    if (type === 'delay') return 'Delay';
    if (type === 'crm-update') return 'CRM Update';
    if (type === 'activity') return 'Create Activity';
    if (type === 'end') return 'End';
    return 'Approval Step';
  }

  private async renderCanvas(): Promise<void> {
    if (!this.canvasHost) {
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

    class WorkflowNodeClass extends ClassicPreset.Node {
      constructor(id: string, title: string, canInput: boolean, canOutput: boolean) {
        super(title);
        this.id = id;
        if (canInput) this.addInput('in', new ClassicPreset.Input(socket, 'In'));
        if (canOutput) this.addOutput('out', new ClassicPreset.Output(socket, 'Out'));
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
    (AreaExtensions as any).snapGrid(area, { size: 24, dynamic: true });
    (AreaExtensions as any).restrictor(area, {
      scaling: { min: 0.35, max: 1.8 }
    });

    const selector = (AreaExtensions as any).selector();
    const accumulating = (AreaExtensions as any).accumulateOnCtrl();
    (AreaExtensions as any).selectableNodes(area, selector, { accumulating });

    const stepByNode = new Map(this.workflow.steps.map((step) => [step.nodeId as string, step]));
    const nodeInstances = new Map<string, InstanceType<typeof WorkflowNodeClass>>();

    for (const node of this.workflow.nodes) {
      const instance = new WorkflowNodeClass(
        node.id,
        this.nodeLabel(node, stepByNode),
        node.type !== 'start',
        node.type !== 'end'
      );
      await (editor as any).addNode(instance);
      await (area as any).translate(instance.id, { x: node.x, y: node.y });
      nodeInstances.set(node.id, instance);
    }

    for (const edge of this.workflow.connections) {
      const source = nodeInstances.get(edge.source);
      const target = nodeInstances.get(edge.target);
      if (!source || !target || source.id === target.id) continue;
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
        const edges = (editor as any)
          .getConnections()
          .map((connection: any) => ({ source: connection.source as string, target: connection.target as string }))
          .filter((edge: WorkflowConnection, index: number, all: WorkflowConnection[]) =>
            all.findIndex((candidate) => candidate.source === edge.source && candidate.target === edge.target) === index
          );
        this.syncConnections(edges);
      }
      return context;
    });

    await (AreaExtensions as any).zoomAt(area, (editor as any).getNodes());
    this.editorRef = editor;
    this.areaRef = area;

    this.reteInstance = {
      destroy: () => {
        accumulating.destroy?.();
        (area as any).destroy?.();
      }
    };
  }
}
