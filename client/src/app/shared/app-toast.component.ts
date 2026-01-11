import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppToastService } from '../core/app-toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: "./app-toast.component.html"
})
export class AppToastComponent {
  private readonly toastService = inject(AppToastService);
  readonly toast = this.toastService.toastState;
}
