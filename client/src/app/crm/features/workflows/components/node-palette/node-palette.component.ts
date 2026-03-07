import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WorkflowNode } from '../../models/workflow-definition.model';

@Component({
  selector: 'app-node-palette',
  standalone: true,
  imports: [FormsModule, NgFor, ButtonModule, InputTextModule],
  templateUrl: './node-palette.component.html',
  styleUrl: './node-palette.component.scss'
})
export class NodePaletteComponent {
  protected readonly nodeTemplates: Array<{ type: WorkflowNode['type']; label: string; icon: string; hint: string }> = [
    { type: 'approval', label: 'Approval Step', icon: 'pi pi-check-circle', hint: 'Manager/security approval gate' },
    { type: 'condition', label: 'Condition', icon: 'pi pi-code', hint: 'Branch by amount/purpose/risk' },
    { type: 'email', label: 'Email', icon: 'pi pi-envelope', hint: 'Send deal approval email' },
    { type: 'notification', label: 'Notification', icon: 'pi pi-bell', hint: 'In-app/SignalR notification' },
    { type: 'delay', label: 'Delay', icon: 'pi pi-clock', hint: 'Wait before escalation' },
    { type: 'crm-update', label: 'CRM Update', icon: 'pi pi-pencil', hint: 'Update deal fields/status' },
    { type: 'activity', label: 'Activity', icon: 'pi pi-calendar-plus', hint: 'Create follow-up task/activity' },
    { type: 'end', label: 'End', icon: 'pi pi-stop-circle', hint: 'Terminal node (optional)' }
  ];

  @Output() addApprovalStep = new EventEmitter<void>();
  @Output() addNode = new EventEmitter<WorkflowNode['type']>();

  protected search = '';

  protected get filteredTemplates() {
    const query = this.search.trim().toLowerCase();
    if (!query) {
      return this.nodeTemplates;
    }

    return this.nodeTemplates.filter((node) =>
      node.label.toLowerCase().includes(query)
      || node.hint.toLowerCase().includes(query)
      || node.type.toLowerCase().includes(query)
    );
  }

  protected onNodeDragStart(event: DragEvent, nodeType: WorkflowNode['type']) {
    if (!event.dataTransfer) {
      return;
    }

    (globalThis as any).__workflowNodeType = nodeType;
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('workflow-node-type', nodeType);
  }
}
