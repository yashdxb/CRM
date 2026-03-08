import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject, signal, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TelerikReportingModule, TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { PipelineByStageReport, ReportCatalogItem, ReportParameterOption, ReportServerConfig } from '../models/report.model';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, BreadcrumbsComponent, TelerikReportingModule],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss'
})
export class ReportsPage implements AfterViewInit {
  private static readonly crmCategoryName = 'CRM';
  private static readonly ownerFilteredReportName = 'Open Opportunities by Owner';
  private static readonly ownerFilterParameterName = 'OwnerUserId';
  private readonly data = inject(ReportsDataService);
  private readonly toast = inject(AppToastService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');

  @ViewChild('telerikViewer') private telerikViewer?: TelerikReportViewerComponent;

  protected readonly loading = signal(false);
  protected readonly report = signal<PipelineByStageReport>({
    generatedAtUtc: new Date().toISOString(),
    totalOpenOpportunities: 0,
    totalPipelineValue: 0,
    stages: []
  });

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
  protected readonly viewerReady = signal(false);
  protected readonly canOpenReportDesigner = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );
  protected readonly ownerOptions = signal<Array<{ label: string; value: string }>>([
    { label: 'All owners', value: '' }
  ]);
  protected readonly ownerOptionsLoading = signal(false);
  protected readonly selectedOwnerUserId = signal('');

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
    this.refresh();
  }

  ngAfterViewInit(): void {
    if (this.telerikViewer) {
      console.log('[Telerik] Viewer found in AfterViewInit');
    }
  }

  protected onTelerikReady = (): void => {
    console.log('[Telerik] Viewer ready');
    this.viewerReady.set(true);
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

  protected openReport(item: ReportCatalogItem) {
    this.selectedReport.set(item);
    this.viewerReady.set(false);

    if (this.requiresOwnerFilter(item)) {
      this.selectedOwnerUserId.set('');
      this.telerikEnabled.set(false);
      this.telerikReportSource.set(null);
      this.loadOwnerOptions();
      return;
    }

    this.applySelectedReportFilters();
  }

  protected backToCatalog() {
    this.selectedReport.set(null);
    this.telerikEnabled.set(false);
    this.telerikReportSource.set(null);
    this.selectedOwnerUserId.set('');
    this.ownerOptions.set([{ label: 'All owners', value: '' }]);
    this.ownerOptionsLoading.set(false);
    this.viewerReady.set(false);
  }

  protected applySelectedReportFilters() {
    const selected = this.selectedReport();
    const config = this.reportServerConfig();
    if (!selected || !config?.reportServiceUrl) return;

    this.viewerReady.set(false);
    this.telerikServiceUrl.set(this.resolveServiceUrl(config.reportServiceUrl));
    const reportPath = selected.categoryName
      ? `${selected.categoryName}/${selected.name}`
      : selected.name;

    const reportSource: Record<string, unknown> = { report: reportPath };

    if (this.requiresOwnerFilter(selected)) {
      reportSource['parameters'] = {
        [ReportsPage.ownerFilterParameterName]: this.selectedOwnerUserId() || ''
      };
    }

    this.telerikReportSource.set(reportSource);
    this.telerikEnabled.set(true);
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
        this.reportCatalog.set(
          items.filter((item) => (item.categoryName ?? '').trim().toLowerCase() === ReportsPage.crmCategoryName.toLowerCase())
        );
        this.catalogLoading.set(false);
      },
      error: () => {
        this.catalogLoading.set(false);
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

  protected requiresOwnerFilter(item: ReportCatalogItem | null): boolean {
    return (item?.name ?? '').trim().toLowerCase() === ReportsPage.ownerFilteredReportName.toLowerCase();
  }

  private loadOwnerOptions() {
    const selected = this.selectedReport();
    if (!selected) {
      this.ownerOptions.set([{ label: 'All owners', value: '' }]);
      return;
    }

    this.ownerOptionsLoading.set(true);
    this.data.getReportParameterOptions(selected.id, ReportsPage.ownerFilterParameterName).subscribe({
      next: (items) => {
        this.ownerOptions.set([
          ...items.map((item: ReportParameterOption) => ({
            label: item.label,
            value: item.value
          }))
        ]);
        this.ownerOptionsLoading.set(false);
      },
      error: () => {
        this.ownerOptions.set([{ label: 'All owners', value: '' }]);
        this.ownerOptionsLoading.set(false);
        this.toast.show('error', 'Unable to load report filter options.');
      }
    });
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
