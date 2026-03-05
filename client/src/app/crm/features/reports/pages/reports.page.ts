import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject, signal, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TelerikReportingModule, TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext } from '../../../../core/auth/token.utils';
import { PipelineByStageReport } from '../models/report.model';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TableModule, BreadcrumbsComponent, TelerikReportingModule],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss'
})
export class ReportsPage implements AfterViewInit {
  private readonly data = inject(ReportsDataService);
  private readonly toast = inject(AppToastService);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('reportTable') private reportTable?: Table;
  @ViewChild('telerikViewer') private telerikViewer?: TelerikReportViewerComponent;

  protected readonly loading = signal(false);
  protected readonly report = signal<PipelineByStageReport>({
    generatedAtUtc: new Date().toISOString(),
    totalOpenOpportunities: 0,
    totalPipelineValue: 0,
    stages: []
  });

  protected readonly currencyCode = 'USD';
  protected readonly telerikEnabled = signal(false);
  protected readonly telerikServiceUrl = signal('');
  protected readonly telerikReportSource = signal<Record<string, unknown> | null>(null);
  
  protected get telerikAuthToken(): string {
    return readTokenContext()?.token ?? '';
  }

  constructor() {
    this.loadEmbedConfig();
    this.refresh();
  }

  ngAfterViewInit(): void {
    // The viewer is only rendered after *ngIf passes, so we need to wait for it
    // and bind error handler imperatively if needed
    if (this.telerikViewer) {
      console.log('[Telerik] Viewer found in AfterViewInit');
      console.log('[Telerik] reportSource:', this.telerikViewer.getReportSource?.());
    }
  }

  // Event handlers for Telerik viewer
  protected onTelerikReady = (): void => {
    console.log('[Telerik] Viewer ready');
    if (this.telerikViewer) {
      const rs = this.telerikViewer.getReportSource?.();
      console.log('[Telerik] Current report source:', rs);
    }
  };

  protected onTelerikError = (e: unknown, args: unknown): void => {
    console.error('[Telerik] Error:', e, args);
  };

  protected refresh() {
    this.loading.set(true);
    this.data.getPipelineByStage().subscribe({
      next: (report) => {
        this.report.set(report);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load pipeline report.');
      }
    });
  }

  protected exportCsv() {
    this.reportTable?.exportCSV();
  }

  private loadEmbedConfig() {
    this.data.getEmbedConfig().subscribe({
      next: (config) => {
        const servicePath = (config.serviceUrl ?? '').trim();
        const reportSource = (config.pipelineByStageReportSource ?? '').trim();
        // Use direct API URL in production, relative path in development (via proxy)
        const serviceUrl = servicePath
          ? (environment.production
              ? `${environment.apiUrl.replace(/\/+$/, '')}/${servicePath.replace(/^\/+/, '')}`
              : servicePath)
          : '';

        console.log('[Telerik] Config loaded:', { enabled: config.enabled, serviceUrl, reportSource });
        
        this.telerikEnabled.set(config.enabled && !!serviceUrl && !!reportSource);
        this.telerikServiceUrl.set(serviceUrl);
        this.telerikReportSource.set(reportSource ? { report: reportSource } : null);
        
        // After setting signals, give Angular time to render the viewer, then imperatively set the report source
        if (config.enabled && serviceUrl && reportSource) {
          this.cdr.detectChanges();
          setTimeout(() => {
            if (this.telerikViewer) {
              console.log('[Telerik] Setting report source imperatively:', { report: reportSource });
              this.telerikViewer.setReportSource({ report: reportSource });
            } else {
              console.log('[Telerik] Viewer not found after timeout');
            }
          }, 100);
        }
      },
      error: () => {
        this.telerikEnabled.set(false);
        this.telerikServiceUrl.set('');
        this.telerikReportSource.set(null);
      }
    });
  }
}
