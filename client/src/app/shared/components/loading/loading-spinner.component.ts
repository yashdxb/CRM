import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="loading-spinner" [class.loading-spinner--fullscreen]="fullscreen" [class.loading-spinner--overlay]="overlay">
      <div class="loading-spinner__content">
        <svg class="loading-spinner__svg" viewBox="0 0 50 50" [style.width]="size" [style.height]="size">
          <circle
            class="loading-spinner__track"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          />
          <circle
            class="loading-spinner__circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
        <p *ngIf="message" class="loading-spinner__message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .loading-spinner--fullscreen {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
      z-index: 9999;
    }

    .loading-spinner--overlay {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(2px);
      z-index: 10;
    }

    .loading-spinner__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .loading-spinner__svg {
      animation: rotate 1.5s linear infinite;
    }

    .loading-spinner__track {
      stroke: #e2e8f0;
    }

    .loading-spinner__circle {
      stroke: var(--brand-primary, #3b82f6);
      stroke-dasharray: 80, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite;
    }

    .loading-spinner__message {
      font-size: 0.9rem;
      color: var(--text-subtle, #64748b);
      margin: 0;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 80, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 80, 200;
        stroke-dashoffset: -125;
      }
    }

    :host-context(.dark-theme) {
      .loading-spinner--fullscreen,
      .loading-spinner--overlay {
        background: rgba(15, 23, 42, 0.9);
      }

      .loading-spinner__track {
        stroke: #334155;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size = '48px';
  @Input() message?: string;
  @Input() fullscreen = false;
  @Input() overlay = false;
}
