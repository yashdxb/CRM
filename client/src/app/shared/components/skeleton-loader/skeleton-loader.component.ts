import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text' | 'circle' | 'rect' | 'card' | 'avatar' | 'table-row';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./skeleton-loader.component.html",
  styleUrls: ["./skeleton-loader.component.scss"]
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
