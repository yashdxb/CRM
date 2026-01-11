import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  severity?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'help' | 'contrast';
  disabled?: boolean;
}

@Component({
  selector: 'app-bulk-actions-bar',
  standalone: true,
  imports: [NgIf, NgFor, ButtonModule, TooltipModule],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ],
  templateUrl: "./bulk-actions-bar.component.html",
  styleUrls: ["./bulk-actions-bar.component.scss"]
})
export class BulkActionsBarComponent {
  @Input() actions: BulkAction[] = [];
  @Input() totalCount?: number;
  @Input() set selectedItems(items: any[]) {
    this._selectedItems.set(items);
  }
  
  @Output() actionClicked = new EventEmitter<BulkAction>();
  @Output() clearSelection = new EventEmitter<void>();
  @Output() selectAll = new EventEmitter<void>();

  private readonly _selectedItems = signal<any[]>([]);
  readonly selectedCount = computed(() => this._selectedItems().length);

  onActionClick(action: BulkAction): void {
    this.actionClicked.emit(action);
  }

  onClearSelection(): void {
    this.clearSelection.emit();
  }

  onSelectAll(): void {
    this.selectAll.emit();
  }
}
