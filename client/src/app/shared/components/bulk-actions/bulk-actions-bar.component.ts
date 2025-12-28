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
  template: `
    <div class="bulk-actions-bar" *ngIf="selectedCount() > 0" [@slideUp]>
      <div class="bulk-actions-bar__info">
        <button class="bulk-actions-bar__close" (click)="onClearSelection()" pTooltip="Clear selection">
          <i class="pi pi-times"></i>
        </button>
        <span class="bulk-actions-bar__count">
          <strong>{{ selectedCount() }}</strong> {{ selectedCount() === 1 ? 'item' : 'items' }} selected
        </span>
      </div>

      <div class="bulk-actions-bar__actions">
        <button
          *ngFor="let action of actions"
          pButton
          [label]="action.label"
          [icon]="action.icon"
          [severity]="action.severity || 'secondary'"
          [disabled]="action.disabled"
          (click)="onActionClick(action)"
          class="p-button-sm"
        ></button>
      </div>

      <div class="bulk-actions-bar__select-all" *ngIf="totalCount && totalCount > selectedCount()">
        <button class="bulk-actions-bar__link" (click)="onSelectAll()">
          Select all {{ totalCount }} items
        </button>
      </div>
    </div>
  `,
  styles: [`
    .bulk-actions-bar {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 20px;
      background: #0f172a;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.4);
      z-index: 1000;
      min-width: 400px;
    }

    .bulk-actions-bar__info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bulk-actions-bar__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .bulk-actions-bar__close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .bulk-actions-bar__count {
      font-size: 0.9rem;
      color: #e2e8f0;
      white-space: nowrap;
    }

    .bulk-actions-bar__count strong {
      color: #ffffff;
    }

    .bulk-actions-bar__actions {
      display: flex;
      gap: 8px;
      padding-left: 16px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bulk-actions-bar__select-all {
      padding-left: 16px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .bulk-actions-bar__link {
      background: none;
      border: none;
      color: #60a5fa;
      font-size: 0.85rem;
      cursor: pointer;
      text-decoration: underline;
      white-space: nowrap;
    }

    .bulk-actions-bar__link:hover {
      color: #93c5fd;
    }

    @media (max-width: 768px) {
      .bulk-actions-bar {
        left: 16px;
        right: 16px;
        transform: none;
        min-width: auto;
        flex-wrap: wrap;
        justify-content: center;
      }

      .bulk-actions-bar__actions {
        border-left: none;
        padding-left: 0;
        padding-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        width: 100%;
        justify-content: center;
      }
    }
  `]
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
