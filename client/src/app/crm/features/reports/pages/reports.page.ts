import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject, signal, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TelerikReportingModule, TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { PipelineByStageReport, ReportCatalogItem, ReportServerConfig } from '../models/report.model';
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
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');

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

  // Report Server state
  protected readonly reportServerEnabled = signal(false);
  protected readonly reportServerConfig = signal<ReportServerConfig | null>(null);
  protected readonly reportCatalog = signal<ReportCatalogItem[]>([]);
  protected readonly catalogLoading = signal(false);
  protected readonly selectedReport = signal<ReportCatalogItem | null>(null);
  protected readonly reportServerToken = signal('');
  protected readonly canOpenReportDesigner = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected get telerikAuthToken(): string {
    const serviceUrl = this.telerikServiceUrl();
    const appToken = readTokenContext()?.token ?? '';

    if (this.reportServerEnabled() && serviceUrl && !serviceUrl.startsWith(this.apiBaseUrl)) {
      return this.reportServerToken();
    }

    return appToken;
  }

  constructor() {
    this.loadReportServerConfig();
    this.loadEmbedConfig();
    this.refresh();
  }

  ngAfterViewInit(): void {
    if (this.telerikViewer) {
      console.log('[Telerik] Viewer found in AfterViewInit');
    }
  }

  protected onTelerikReady = (): void => {
    console.log('[Telerik] Viewer ready');
    this.normalizeTelerikViewerState();
  };

  protected onTelerikError = (e: unknown, args: unknown): void => {
    console.error('[Telerik] Error:', e, args);
    setTimeout(() => this.normalizeTelerikViewerState(), 300);
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

  protected openReport(item: ReportCatalogItem) {
    const config = this.reportServerConfig();
    if (!config?.reportServiceUrl) return;

    this.selectedReport.set(item);
    this.telerikServiceUrl.set(this.resolveServiceUrl(config.reportServiceUrl));
    const reportPath = item.categoryName
      ? `${item.categoryName}/${item.name}`
      : item.name;
    this.telerikReportSource.set({ report: reportPath });
    this.telerikEnabled.set(true);
  }

  protected backToCatalog() {
    this.selectedReport.set(null);
    this.telerikEnabled.set(false);
    this.telerikReportSource.set(null);
  }

  private loadReportServerConfig() {
    this.data.getReportServerConfig().subscribe({
      next: (config) => {
        this.reportServerConfig.set(config);
        this.reportServerEnabled.set(config.enabled);
        if (config.enabled) {
          this.loadReportServerToken();
          this.loadCatalog();
        }
      }
    });
  }

  private loadReportServerToken() {
    this.data.getReportServerToken().subscribe({
      next: (token) => this.reportServerToken.set(token.accessToken),
      error: () => this.toast.show('error', 'Failed to get Report Server token.')
    });
  }

  private loadCatalog() {
    this.catalogLoading.set(true);
    this.data.getReportCatalog().subscribe({
      next: (items) => {
        this.reportCatalog.set(items);
        this.catalogLoading.set(false);
      },
      error: () => {
        this.catalogLoading.set(false);
      }
    });
  }

  private loadEmbedConfig() {
    this.data.getEmbedConfig().subscribe({
      next: (config) => {
        // Skip embedded config if Report Server is the provider
        if (config.provider === 'report-server') return;

        const servicePath = (config.serviceUrl ?? '').trim();
        const reportSource = (config.pipelineByStageReportSource ?? '').trim();
        const serviceUrl = this.resolveServiceUrl(servicePath);

        this.telerikEnabled.set(config.enabled && !!serviceUrl && !!reportSource);
        this.telerikServiceUrl.set(serviceUrl);
        this.telerikReportSource.set(reportSource ? { report: reportSource } : null);
      },
      error: () => {
        this.telerikEnabled.set(false);
        this.telerikServiceUrl.set('');
        this.telerikReportSource.set(null);
      }
    });
  }

  private resolveServiceUrl(servicePath: string): string {
    if (!servicePath) {
      return '';
    }

    if (/^https?:\/\//i.test(servicePath)) {
      return servicePath;
    }

    if (servicePath.startsWith('/')) {
      return `${this.apiBaseUrl}${servicePath}`;
    }

    return `${this.apiBaseUrl}/${servicePath.replace(/^\/+/, '')}`;
  }

  private normalizeTelerikViewerState(): void {
    const root = this.host.nativeElement as HTMLElement;
    const errorPane = root.querySelector('.trv-error-pane') as HTMLElement | null;
    const errorMessage = root.querySelector('.trv-error-pane .trv-error-message') as HTMLElement | null;
    const renderedPages = root.querySelectorAll('.trv-page-wrapper, .trv-report-page');

    if (!errorPane) {
      return;
    }

    const message = (errorMessage?.textContent ?? '').trim();
    const hasRenderedPages = renderedPages.length > 0;

    if (hasRenderedPages && message.length === 0) {
      errorPane.style.display = 'none';
      errorPane.style.visibility = 'hidden';
      errorPane.style.opacity = '0';
    } else {
      errorPane.style.removeProperty('display');
      errorPane.style.removeProperty('visibility');
      errorPane.style.removeProperty('opacity');
    }
  }
}
