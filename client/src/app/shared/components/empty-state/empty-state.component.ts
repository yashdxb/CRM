import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type EmptyStateType = 
  | 'no-data' 
  | 'no-results' 
  | 'error' 
  | 'no-access' 
  | 'empty-inbox' 
  | 'success';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: "./empty-state.component.html",
  styleUrls: ["./empty-state.component.scss"]
})
export class EmptyStateComponent {
  @Input() type: EmptyStateType = 'no-data';
  @Input() title = 'No data yet';
  @Input() description = 'Get started by creating your first item.';
  @Input() actionLabel?: string;
  @Input() actionIcon = 'pi pi-plus';
  @Input() secondaryActionLabel?: string;
  @Input() actionCallback?: () => void;
  @Input() secondaryActionCallback?: () => void;

  onAction(): void {
    this.actionCallback?.();
  }

  onSecondaryAction(): void {
    this.secondaryActionCallback?.();
  }
}
