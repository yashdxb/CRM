import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { KeyboardShortcutsService } from './keyboard-shortcuts.service';

@Component({
  selector: 'app-keyboard-shortcuts-modal',
  standalone: true,
  imports: [NgFor, NgIf, ButtonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }))
      ])
    ])
  ],
  templateUrl: "./keyboard-shortcuts-modal.component.html",
  styleUrls: ["./keyboard-shortcuts-modal.component.scss"]
})
export class KeyboardShortcutsModalComponent {
  protected readonly shortcutsService = inject(KeyboardShortcutsService);

  formatKeys(keys: string): string {
    return keys.toUpperCase().replace(' ', ' → ');
  }
}
