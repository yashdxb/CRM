import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { WorkflowNode, WorkflowStep } from '../../models/workflow-definition.model';

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
  @Input() roleOptions: Array<{ label: string; value: string }> = [];
  @Input() securityLevelOptions: Array<{ label: string; value: string }> = [];
  @Output() removeStep = new EventEmitter<number>();
  @Output() patchStep = new EventEmitter<{ index: number; patch: Partial<WorkflowStep> }>();
  @Output() removeNode = new EventEmitter<string>();
  @Output() patchNode = new EventEmitter<{ nodeId: string; patch: Partial<WorkflowNode> }>();

  protected get editableNodes() {
    return this.nodes.filter((node) => node.type !== 'approval');
  }

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
}
