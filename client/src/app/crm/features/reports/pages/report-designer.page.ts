import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ReportCatalogItem, ReportCategory, ReportServerConfig } from '../models/report.model';
import { ReportsDataService } from '../services/reports-data.service';

@Component({
  selector: 'app-report-designer-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, RouterLink],
  templateUrl: './report-designer.page.html',
  styleUrl: './report-designer.page.scss'
})
export class ReportDesignerPage {
  private readonly reportsData = inject(ReportsDataService);

  protected readonly reportServerConfig = signal<ReportServerConfig | null>(null);
  protected readonly reportServerCatalog = signal<ReportCatalogItem[]>([]);
  protected readonly reportServerCategories = signal<ReportCategory[]>([]);
  protected readonly reportServerLoading = signal(false);

  constructor() {
    this.loadReportServerWorkspace();
  }

  protected openReportServerViewer(): void {
    const config = this.reportServerConfig();
    if (!config?.reportServerUrl) {
      return;
    }

    window.open(`${config.reportServerUrl}/Report`, '_blank', 'noopener');
  }

  private loadReportServerWorkspace(): void {
    this.reportServerLoading.set(true);

    this.reportsData.getReportServerConfig().subscribe({
      next: (cfg) => {
        this.reportServerConfig.set(cfg.enabled ? cfg : null);

        if (!cfg.enabled) {
          this.reportServerCatalog.set([]);
          this.reportServerCategories.set([]);
          this.reportServerLoading.set(false);
          return;
        }

        this.reportsData.getReportCatalog().subscribe({
          next: (items) => {
            this.reportServerCatalog.set(items.filter(i => i.categoryName?.toLowerCase() === 'crm'));
            this.reportServerLoading.set(false);
          },
          error: () => {
            this.reportServerCatalog.set([]);
            this.reportServerLoading.set(false);
          }
        });

        this.reportsData.getReportCategories().subscribe({
          next: (items) => this.reportServerCategories.set(items.filter(c => c.name?.toLowerCase() === 'crm')),
          error: () => this.reportServerCategories.set([])
        });
      },
      error: () => {
        this.reportServerConfig.set(null);
        this.reportServerCatalog.set([]);
        this.reportServerCategories.set([]);
        this.reportServerLoading.set(false);
      }
    });
  }
}
