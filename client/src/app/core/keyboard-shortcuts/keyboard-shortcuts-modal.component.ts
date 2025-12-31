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
  template: `
    <div class="shortcuts-backdrop" *ngIf="shortcutsService.isHelpModalOpen()" [@fadeIn] (click)="shortcutsService.closeHelpModal()">
      <div class="shortcuts-modal" [@slideUp] (click)="$event.stopPropagation()">
        <header class="shortcuts-modal__header">
          <h2>Keyboard Shortcuts</h2>
          <button
            pButton
            type="button"
            icon="pi pi-times"
            class="shortcuts-modal__close p-button-text"
            (click)="shortcutsService.closeHelpModal()"
          ></button>
        </header>

        <div class="shortcuts-modal__content">
          <section class="shortcuts-section">
            <h3>Navigation</h3>
            <p class="shortcuts-section__hint">Press <kbd>G</kbd> then a letter</p>
            <ul>
              <li *ngFor="let shortcut of shortcutsService.getShortcutsByCategory('navigation')">
                <span>{{ shortcut.description }}</span>
                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>
              </li>
            </ul>
          </section>

          <section class="shortcuts-section">
            <h3>Quick Actions</h3>
            <p class="shortcuts-section__hint">Press <kbd>N</kbd> then a letter to create</p>
            <ul>
              <li *ngFor="let shortcut of shortcutsService.getShortcutsByCategory('actions')">
                <span>{{ shortcut.description }}</span>
                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>
              </li>
            </ul>
          </section>

          <section class="shortcuts-section">
            <h3>General</h3>
            <ul>
              <li>
                <span>Open command palette</span>
                <kbd>⌘ K</kbd>
              </li>
              <li *ngFor="let shortcut of shortcutsService.getShortcutsByCategory('general')">
                <span>{{ shortcut.description }}</span>
                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>
              </li>
            </ul>
          </section>
        </div>

        <footer class="shortcuts-modal__footer">
          <span>Press <kbd>?</kbd> anywhere to show this help</span>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .shortcuts-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .shortcuts-modal {
      width: 100%;
      max-width: 560px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25);
      overflow: hidden;
    }

    .shortcuts-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid #e2e8f0;
    }

    .shortcuts-modal__header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
    }

    .shortcuts-modal__close.p-button {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 10px;
      background: transparent;
      color: #64748b;
    }

    .shortcuts-modal__close.p-button:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .shortcuts-modal__content {
      padding: 24px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .shortcuts-section {
      margin-bottom: 24px;
    }

    .shortcuts-section:last-child {
      margin-bottom: 0;
    }

    .shortcuts-section h3 {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin: 0 0 8px;
    }

    .shortcuts-section__hint {
      font-size: 0.8rem;
      color: #94a3b8;
      margin: 0 0 12px;
    }

    .shortcuts-section__hint kbd {
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .shortcuts-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .shortcuts-section li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .shortcuts-section li:last-child {
      border-bottom: none;
    }

    .shortcuts-section li span {
      font-size: 0.9rem;
      color: #334155;
    }

    .shortcuts-section li kbd {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 6px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      font-size: 0.8rem;
      font-family: inherit;
      color: #475569;
      font-weight: 500;
    }

    .shortcuts-modal__footer {
      padding: 16px 24px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }

    .shortcuts-modal__footer span {
      font-size: 0.85rem;
      color: #64748b;
    }

    .shortcuts-modal__footer kbd {
      background: #ffffff;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      font-size: 0.8rem;
      font-family: inherit;
    }
  `]
})
export class KeyboardShortcutsModalComponent {
  protected readonly shortcutsService = inject(KeyboardShortcutsService);

  formatKeys(keys: string): string {
    return keys.toUpperCase().replace(' ', ' → ');
  }
}
