import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Mobile Table Wrapper Component
 * 
 * Automatically adapts PrimeNG DataTable display for mobile:
 * - Shows as scrollable table on desktop/tablet
 * - Shows as card-based list on mobile
 * - Maintains glass UI aesthetic on all breakpoints
 * 
 * Usage:
 * <app-mobile-table-wrapper [isMobile]="device.isMobile()">
 *   <p-table>...</p-table>
 * </app-mobile-table-wrapper>
 */
@Component({
  selector: 'app-mobile-table-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mobile-table-wrapper" [class.mobile]="isMobileView">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .mobile-table-wrapper {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .mobile-table-wrapper.mobile {
      overflow-x: visible;
    }

    /* Ensure table horizontal scrolling on mobile */
    .mobile-table-wrapper ::ng-deep {
      .p-datatable {
        width: 100%;
      }

      /* On mobile, make table scrollable */
      @media (max-width: 768px) {
        overflow-x: auto;
        display: block;
        
        .p-datatable {
          min-width: 100%;
        }

        /* Stack table headers as cards */
        .p-datatable-thead > tr {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .p-datatable-tbody > tr {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        /* Hide column headers on mobile, show as label */
        .p-datatable-tbody > tr > td::before {
          content: attr(data-label);
          font-weight: 600;
          font-size: 0.75rem;
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileTableWrapperComponent {
  @Input() isMobileView = false;
}
