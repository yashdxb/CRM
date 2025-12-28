import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card' | 'avatar' | 'table-row';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-loader" [ngClass]="'skeleton-loader--' + variant" [style.width]="width" [style.height]="height">
      <ng-container [ngSwitch]="variant">
        <!-- Text lines -->
        <ng-container *ngSwitchCase="'text'">
          <div class="skeleton-line" *ngFor="let _ of lines" [style.width]="getLineWidth(_)"></div>
        </ng-container>

        <!-- Circle (avatar placeholder) -->
        <div *ngSwitchCase="'circle'" class="skeleton-circle" [style.width]="size" [style.height]="size"></div>

        <!-- Avatar with text -->
        <ng-container *ngSwitchCase="'avatar'">
          <div class="skeleton-avatar">
            <div class="skeleton-circle" style="width: 40px; height: 40px;"></div>
            <div class="skeleton-avatar__text">
              <div class="skeleton-line" style="width: 120px;"></div>
              <div class="skeleton-line" style="width: 80px; height: 10px;"></div>
            </div>
          </div>
        </ng-container>

        <!-- Rectangle -->
        <div *ngSwitchCase="'rect'" class="skeleton-rect"></div>

        <!-- Card -->
        <ng-container *ngSwitchCase="'card'">
          <div class="skeleton-card">
            <div class="skeleton-card__header">
              <div class="skeleton-circle" style="width: 48px; height: 48px;"></div>
              <div class="skeleton-card__header-text">
                <div class="skeleton-line" style="width: 60%;"></div>
                <div class="skeleton-line" style="width: 40%; height: 10px;"></div>
              </div>
            </div>
            <div class="skeleton-card__body">
              <div class="skeleton-line"></div>
              <div class="skeleton-line" style="width: 80%;"></div>
              <div class="skeleton-line" style="width: 60%;"></div>
            </div>
          </div>
        </ng-container>

        <!-- Table row -->
        <ng-container *ngSwitchCase="'table-row'">
          <div class="skeleton-table-row" *ngFor="let _ of lines">
            <div class="skeleton-circle" style="width: 32px; height: 32px;"></div>
            <div class="skeleton-line" style="width: 150px;"></div>
            <div class="skeleton-line" style="width: 100px;"></div>
            <div class="skeleton-line" style="width: 80px;"></div>
            <div class="skeleton-line" style="width: 60px;"></div>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    .skeleton-loader {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-line,
    .skeleton-circle,
    .skeleton-rect {
      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
    }

    .skeleton-line {
      height: 14px;
      width: 100%;
    }

    .skeleton-circle {
      border-radius: 50%;
      flex-shrink: 0;
    }

    .skeleton-rect {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    .skeleton-avatar {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .skeleton-avatar__text {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .skeleton-card {
      padding: 20px;
      border-radius: 16px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
    }

    .skeleton-card__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .skeleton-card__header-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .skeleton-card__body {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skeleton-table-row {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .skeleton-table-row:last-child {
      border-bottom: none;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    /* Dark mode support */
    :host-context(.dark-theme) {
      .skeleton-line,
      .skeleton-circle,
      .skeleton-rect {
        background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
        background-size: 200% 100%;
      }

      .skeleton-card {
        background: #1e293b;
        border-color: #334155;
      }

      .skeleton-table-row {
        border-bottom-color: #334155;
      }
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width?: string;
  @Input() height?: string;
  @Input() size = '40px';
  @Input() count = 3;

  get lines(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }

  getLineWidth(index: number): string {
    // Vary line widths for more natural look
    const widths = ['100%', '85%', '70%', '90%', '60%'];
    return widths[index % widths.length];
  }
}
