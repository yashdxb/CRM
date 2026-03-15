import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { WorkflowConnection, WorkflowNode, WorkflowNodeConfig, WorkflowStep } from '../../models/workflow-definition.model';

@Component({
  selector: 'app-workflow-properties-panel',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, FormsModule, ButtonModule, InputNumberModule, InputTextModule, SelectModule],
  templateUrl: './properties-panel.component.html',
  styleUrl: './properties-panel.component.scss'
})
export class PropertiesPanelComponent {
  @Input({ required: true }) steps: WorkflowStep[] = [];
  @Input({ required: true }) nodes: WorkflowNode[] = [];
  @Input({ required: true }) connections: WorkflowConnection[] = [];
  @Input() selectedNodeId: string | null = null;
  @Input() roleOptions: Array<{ label: string; value: string }> = [];
  @Input() securityLevelOptions: Array<{ label: string; value: string }> = [];
  @Input() nodeSelectionOptions: Array<{ label: string; value: string }> = [];
  @Output() removeStep = new EventEmitter<number>();
  @Output() patchStep = new EventEmitter<{ index: number; patch: Partial<WorkflowStep> }>();
  @Output() removeNode = new EventEmitter<string>();
  @Output() patchNode = new EventEmitter<{ nodeId: string; patch: Partial<WorkflowNode> }>();
  @Output() patchNodeConfig = new EventEmitter<{ nodeId: string; patch: Partial<WorkflowNodeConfig> }>();
  @Output() patchConnection = new EventEmitter<{ index: number; patch: Partial<WorkflowConnection> }>();
  @Output() selectionChange = new EventEmitter<string | null>();

  protected readonly conditionFieldOptions = [
    { label: 'Deal Amount', value: 'amount' },
    { label: 'Deal Purpose', value: 'purpose' },
    { label: 'Stage', value: 'stage' },
    { label: 'Risk Score', value: 'riskScore' }
  ];
  protected readonly conditionOperatorOptions = [
    { label: 'Equals', value: 'equals' },
    { label: 'Contains', value: 'contains' },
    { label: 'Greater Than', value: 'gt' },
    { label: 'Less Than', value: 'lt' }
  ];
  protected readonly delayUnitOptions = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' }
  ];
  protected readonly emailRecipientOptions = [
    { label: 'Deal owner', value: 'owner' },
    { label: 'Manager reviewer', value: 'manager' },
    { label: 'Primary contact', value: 'primary-contact' }
  ];
  protected readonly notificationChannelOptions = [
    { label: 'In-app', value: 'in-app' },
    { label: 'SignalR', value: 'signalr' },
    { label: 'Email digest', value: 'email-digest' }
  ];
  protected readonly notificationAudienceOptions = [
    { label: 'Owner', value: 'owner' },
    { label: 'Approver role', value: 'approver-role' },
    { label: 'Revenue ops', value: 'revenue-ops' }
  ];
  protected readonly crmUpdateFieldOptions = [
    { label: 'Stage', value: 'stage' },
    { label: 'Status', value: 'status' },
    { label: 'Forecast category', value: 'forecastCategory' }
  ];
  protected readonly activityTypeOptions = [
    { label: 'Task', value: 'Task' },
    { label: 'Follow Up', value: 'FollowUp' },
    { label: 'Call', value: 'Call' },
    { label: 'Meeting', value: 'Meeting' }
  ];
  protected readonly activityOwnerOptions = [
    { label: 'Deal owner', value: 'owner' },
    { label: 'Approver', value: 'approver' },
    { label: 'Manager', value: 'manager' }
  ];

  protected onRoleChange(index: number, roleId: string | null) {
    const role = this.roleOptions.find((option) => option.value === roleId);
    this.patchStep.emit({
      index,
      patch: {
        approverRoleId: roleId,
        approverRole: role?.label ?? ''
      }
    });
  }

  protected patchCondition(nodeId: string, field: 'field' | 'operator' | 'value', value: string | null) {
    const current = this.selectedNode?.config?.condition ?? { field: null, operator: null, value: null };
    this.patchNodeConfig.emit({ nodeId, patch: { condition: { ...current, [field]: value } } });
  }

  protected patchDelay(nodeId: string, field: 'duration' | 'unit' | 'businessHoursOnly', value: number | string | boolean | null) {
    const current = this.selectedNode?.config?.delay ?? { duration: null, unit: 'hours', businessHoursOnly: false };
    this.patchNodeConfig.emit({ nodeId, patch: { delay: { ...current, [field]: value } } });
  }

  protected patchEmail(nodeId: string, field: 'template' | 'recipientType' | 'subject', value: string | null) {
    const current = this.selectedNode?.config?.email ?? { template: null, recipientType: null, subject: null };
    this.patchNodeConfig.emit({ nodeId, patch: { email: { ...current, [field]: value } } });
  }

  protected patchNotification(nodeId: string, field: 'channel' | 'audience' | 'message', value: string | null) {
    const current = this.selectedNode?.config?.notification ?? { channel: null, audience: null, message: null };
    this.patchNodeConfig.emit({ nodeId, patch: { notification: { ...current, [field]: value } } });
  }

  protected patchCrmUpdate(nodeId: string, field: 'field' | 'value', value: string | null) {
    const current = this.selectedNode?.config?.crmUpdate ?? { field: null, value: null };
    this.patchNodeConfig.emit({ nodeId, patch: { crmUpdate: { ...current, [field]: value } } });
  }

  protected patchActivity(nodeId: string, field: 'activityType' | 'subject' | 'ownerStrategy' | 'dueInHours', value: string | number | null) {
    const current = this.selectedNode?.config?.activity ?? { activityType: null, subject: null, ownerStrategy: null, dueInHours: null };
    this.patchNodeConfig.emit({ nodeId, patch: { activity: { ...current, [field]: value } } });
  }

  protected get selectedNode() {
    return this.nodes.find((node) => node.id === this.selectedNodeId) ?? null;
  }

  protected get selectedStepIndex() {
    return this.steps.findIndex((step) => step.nodeId === this.selectedNodeId);
  }

  protected get selectedStep() {
    return this.selectedStepIndex >= 0 ? this.steps[this.selectedStepIndex] : null;
  }

  protected get selectedConnections() {
    return this.connections
      .map((connection, index) => ({ connection, index }))
      .filter(({ connection }) => connection.source === this.selectedNodeId);
  }
}
