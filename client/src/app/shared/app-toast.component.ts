import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppToastService } from '../core/app-toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div class="app-inline-toast" *ngIf="toast() as alert" [ngClass]="'app-inline-toast--' + alert.tone">
      <i [class]="alert.tone === 'success' ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'"></i>
      <span>{{ alert.message }}</span>
    </div>
  `
})
export class AppToastComponent {
  private readonly toastService = inject(AppToastService);
  readonly toast = this.toastService.toastState;
}
