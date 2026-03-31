import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TelerikReportingModule, TelerikReportViewerComponent } from '@progress/telerik-angular-report-viewer';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import {
  PipelineByStageReport,
  ReportLibraryFilter,
  ReportLibraryItem,
  ReportParameterOption,
  ReportServerConfig
} from '../models/report.model';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, DatePickerModule, MultiSelectModule, SelectModule, BreadcrumbsComponent, TelerikReportingModule],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss'
})
export class ReportsPage implements AfterViewInit {
  private static readonly GENERIC_EMBEDDED_REPORT_SOURCE = 'CRM.Enterprise.Api.Reporting.EmbeddedLibraryTelerikReport, CRM.Enterprise.Api';
  private readonly data = inject(ReportsDataService);
  private readonly toast = inject(AppToastService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
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
  protected readonly viewerRuntimeReady = signal(false);
  protected readonly telerikServiceUrl = signal('');
  protected readonly telerikReportSource = signal<Record<string, unknown> | null>(null);

  protected readonly reportServerEnabled = signal(false);
  protected readonly reportServerConfig = signal<ReportServerConfig | null>(null);
  protected readonly reportCatalog = signal<ReportLibraryItem[]>([]);
  protected readonly catalogLoading = signal(false);
  protected readonly selectedReport = signal<ReportLibraryItem | null>(null);
  protected readonly viewerReady = signal(false);
  protected readonly canOpenReportDesigner = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.reportsDesign)
  );
  protected readonly filterValues = signal<Record<string, string | string[]>>({});
  protected readonly dateFilterValues = signal<Record<string, Date | null>>({});
  protected readonly dynamicFilterOptions = signal<Record<string, ReportParameterOption[]>>({});
  protected readonly filterOptionsLoading = signal(false);

  protected get telerikAuthToken(): string {
    const appToken = readTokenContext()?.token ?? '';
    return appToken;
  }

  constructor() {
    void this.ensureViewerRuntime();
    this.loadReportServerConfig();
    this.refresh();
  }

  ngAfterViewInit(): void {
    if (this.telerikViewer) {
      console.log('[Telerik] Viewer found in AfterViewInit');
    }
  }

  protected onTelerikReady = (): void => {
    this.viewerReady.set(true);
    this.normalizeTelerikViewerState();
  };

  protected onTelerikError = (): void => {
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

  protected openReport(item: ReportLibraryItem) {
    this.selectedReport.set(this.normalizeReportLibraryItem(item));
    this.viewerReady.set(false);
    this.telerikEnabled.set(false);
    this.telerikReportSource.set(null);

    this.initializeFilterValues(item);

    if (item.filters.length === 0) {
      this.applySelectedReportFilters();
      return;
    }

    this.loadDynamicFilterOptions(item);
  }

  protected backToCatalog() {
    this.selectedReport.set(null);
    this.telerikEnabled.set(false);
    this.telerikReportSource.set(null);
    this.filterValues.set({});
    this.dateFilterValues.set({});
    this.dynamicFilterOptions.set({});
    this.filterOptionsLoading.set(false);
    this.viewerReady.set(false);
  }

  protected applySelectedReportFilters() {
    const selected = this.selectedReport();
    const config = this.reportServerConfig();
    if (!selected || !config?.reportServiceUrl) {
      return;
    }

    if (!this.viewerRuntimeReady()) {
      void this.ensureViewerRuntime()
        .then(() => this.applySelectedReportFilters())
        .catch(() => undefined);
      return;
    }

    this.viewerReady.set(false);
    this.telerikServiceUrl.set(this.resolveServiceUrl(config.reportServiceUrl));
    const isEmbeddedMode = !config.reportServerUrl;
    const reportPath = isEmbeddedMode
      ? (selected.embeddedReportSource ?? '')
      : (selected.categoryName
          ? `${selected.categoryName}/${selected.name}`
          : selected.name);

    if (!reportPath) {
      this.telerikEnabled.set(false);
      this.telerikReportSource.set(null);
      this.toast.show('error', 'This report is available as a template only right now. Open Report Workspace to design or publish it first.');
      return;
    }

    const reportSource: Record<string, unknown> = { report: reportPath };
    const parameters: Record<string, string> = {};
    const values = this.filterValues();

    for (const filter of selected.filters) {
      if (filter.kind === 'dateRange') {
        if (filter.parameterName) {
          const fromValue = values[filter.parameterName];
          parameters[filter.parameterName] = typeof fromValue === 'string' ? fromValue : '';
        }
        if (filter.parameterNameTo) {
          const toValue = values[filter.parameterNameTo];
          parameters[filter.parameterNameTo] = typeof toValue === 'string' ? toValue : '';
        }
        continue;
      }

      if (filter.parameterName) {
        const value = values[filter.parameterName];
        if (Array.isArray(value)) {
          const normalized = value.filter((item) => typeof item === 'string' && item.trim().length > 0);
          const allOptions = this.getFilterOptions(filter)
            .map((option) => option.value)
            .filter((option) => typeof option === 'string' && option.trim().length > 0);
          const isAllSelected = normalized.length > 0 && allOptions.length > 0 && normalized.length === allOptions.length;
          parameters[filter.parameterName] = isAllSelected ? '' : normalized.join(',');
        } else {
          parameters[filter.parameterName] = value ?? '';
        }
      }
    }

    if (Object.keys(parameters).length > 0) {
      reportSource['parameters'] = parameters;
    }

    if (selected.embeddedReportSource === ReportsPage.GENERIC_EMBEDDED_REPORT_SOURCE) {
      const headers = this.getEmbeddedHeaders(selected.id);
      reportSource['parameters'] = {
        ...(reportSource['parameters'] as Record<string, string> | undefined ?? {}),
        ReportKey: selected.id,
        ReportTitle: selected.name,
        ReportDescription: selected.description,
        Header1: headers[0],
        Header2: headers[1],
        Header3: headers[2],
        Header4: headers[3]
      };
    }

    this.telerikReportSource.set(reportSource);
    this.telerikEnabled.set(true);
  }

  protected getFilters(): ReportLibraryFilter[] {
    return this.selectedReport()?.filters ?? [];
  }

  protected getFilterValue(parameterName?: string | null): string {
    if (!parameterName) {
      return '';
    }

    const value = this.filterValues()[parameterName];
    return typeof value === 'string' ? value : '';
  }

  protected getMultiFilterValue(parameterName?: string | null): string[] {
    if (!parameterName) {
      return [];
    }

    const value = this.filterValues()[parameterName];
    return Array.isArray(value) ? value : [];
  }

  protected setFilterValue(parameterName: string | null | undefined, value: string | string[] | null | undefined) {
    if (!parameterName) {
      return;
    }

    this.filterValues.update((current) => ({
      ...current,
      [parameterName]: Array.isArray(value) ? value : (value ?? '')
    }));
  }

  protected getFilterOptions(filter: ReportLibraryFilter): ReportParameterOption[] {
    return filter.optionSource === 'report-parameter'
      ? this.dynamicFilterOptions()[filter.key] ?? []
      : filter.options ?? [];
  }

  protected getDateFilterValue(parameterName?: string | null): Date | null {
    if (!parameterName) {
      return null;
    }

    return this.dateFilterValues()[parameterName] ?? null;
  }

  protected setDateFilterValue(parameterName: string | null | undefined, value: Date | Date[] | null | undefined) {
    if (!parameterName) {
      return;
    }

    const nextDate = value instanceof Date && !Number.isNaN(value.getTime())
      ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
      : null;

    const nextValue = nextDate
      ? this.formatDateForParameter(nextDate)
      : '';

    this.dateFilterValues.update((current) => ({
      ...current,
      [parameterName]: nextDate
    }));
    this.setFilterValue(parameterName, nextValue);
  }

  protected trackFilter(_index: number, filter: ReportLibraryFilter) {
    return filter.key;
  }

  protected canRunSelectedReport(): boolean {
    const selected = this.selectedReport();
    const config = this.reportServerConfig();
    if (!selected || !config) {
      return false;
    }

    return config.reportServerUrl
      ? true
      : !!selected.embeddedReportSource;
  }

  protected getSelectedReportRunLabel(): string {
    return this.canRunSelectedReport() ? 'Run Report' : 'Open in Workspace';
  }

  protected runOrDesignSelectedReport(): void {
    if (this.canRunSelectedReport()) {
      this.applySelectedReportFilters();
      return;
    }

    window.open('/app/report-designer', '_self');
  }

  protected editSelectedReportInWorkspace(): void {
    const selected = this.selectedReport();
    if (!selected) {
      return;
    }

    const reportPath = selected.embeddedReportSource?.trim();
    if (!reportPath) {
      this.toast.show('error', 'This report does not have an editable designer definition yet.');
      return;
    }

    void this.router.navigate(['/app/report-designer'], {
      queryParams: {
        report: reportPath
      }
    });
  }

  private initializeFilterValues(report: ReportLibraryItem) {
    const nextValues: Record<string, string | string[]> = {};
    const nextDateValues: Record<string, Date | null> = {};

    for (const filter of report.filters) {
      if (filter.kind === 'dateRange') {
        if (filter.parameterName) {
          nextValues[filter.parameterName] = filter.defaultValue ?? '';
          nextDateValues[filter.parameterName] = this.parseDateParameter(filter.defaultValue);
        }

        if (filter.parameterNameTo) {
          nextValues[filter.parameterNameTo] = filter.defaultValueTo ?? '';
          nextDateValues[filter.parameterNameTo] = this.parseDateParameter(filter.defaultValueTo);
        }

        continue;
      }

      if (filter.parameterName) {
        nextValues[filter.parameterName] = filter.kind === 'owner'
          ? []
          : (filter.defaultValue ?? '');
      }
    }

    this.filterValues.set(nextValues);
    this.dateFilterValues.set(nextDateValues);
    this.dynamicFilterOptions.set({});
  }

  private loadDynamicFilterOptions(report: ReportLibraryItem) {
    const dynamicFilters = report.filters.filter(
      (filter) => filter.optionSource === 'report-parameter' && !!filter.parameterName
    );

    if (dynamicFilters.length === 0) {
      this.filterOptionsLoading.set(false);
      return;
    }

    this.filterOptionsLoading.set(true);

    const requests = Object.fromEntries(
      dynamicFilters.map((filter) => [
        filter.key,
        this.data.getReportParameterOptions(report.id, filter.parameterName!).pipe(catchError(() => of([])))
      ])
    );

    forkJoin(requests).subscribe({
      next: (result) => {
        this.dynamicFilterOptions.set(
          Object.fromEntries(
            Object.entries(result).map(([key, options]) => [key, this.normalizeOptions(options)])
          )
        );
        this.filterOptionsLoading.set(false);
      },
      error: () => {
        this.dynamicFilterOptions.set({});
        this.filterOptionsLoading.set(false);
        this.toast.show('error', 'Unable to load report filter options.');
      }
    });
  }

  private formatDateForParameter(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDateParameter(value?: string | null): Date | null {
    if (!value) {
      return null;
    }

    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime())
      ? null
      : new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }

  private loadReportServerConfig() {
    this.data.getReportServerConfig().subscribe({
      next: (config) => {
        this.reportServerConfig.set(config);
        this.reportServerEnabled.set(config.enabled);
        if (config.enabled) {
          // Keep the viewer on the CRM API origin through the proxy/embedded service path.
          // Do not fetch a separate Report Server token on page load unless we later reintroduce
          // a direct external viewer integration.
          this.loadLibrary();
        }
      }
    });
  }

  private loadLibrary() {
    this.catalogLoading.set(true);
    this.data.getReportLibrary().subscribe({
      next: (items) => {
        const crmOnly = items.filter((item) => item.categoryName?.toLowerCase() === 'crm');
        this.reportCatalog.set(crmOnly.map((item) => this.normalizeReportLibraryItem(item)));
        this.catalogLoading.set(false);
      },
      error: () => {
        this.reportCatalog.set([]);
        this.catalogLoading.set(false);
        this.toast.show('error', 'Report library is unavailable right now. Check report connectivity or publish reports later.');
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

  private async ensureViewerRuntime(): Promise<void> {
    if (this.viewerRuntimeReady()) {
      return;
    }

    await this.loadViewerScript('/assets/vendor/telerikReportViewer.kendo.min.js');
    await this.loadViewerScript('/assets/vendor/telerikReportViewer.min.js');
    this.viewerRuntimeReady.set(true);
  }

  private async loadViewerScript(path: string): Promise<void> {
    const assetUrl = new URL(path, window.location.origin).toString();
    const existing = document.querySelector(`script[src="${assetUrl}"]`) as HTMLScriptElement | null;

    if (existing) {
      if (existing.dataset['loaded'] === 'true') {
        return;
      }

      await new Promise<void>((resolve, reject) => {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${path}.`)), { once: true });
      });
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = assetUrl;
      script.async = false;
      script.onload = () => {
        script.dataset['loaded'] = 'true';
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load ${path}.`));
      document.body.appendChild(script);
    }).catch((error) => {
      const message = error instanceof Error ? error.message : 'Failed to initialize Telerik report viewer runtime.';
      this.toast.show('error', message);
      throw error;
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

  private normalizeReportLibraryItem(item: ReportLibraryItem): ReportLibraryItem {
    return {
      ...item,
      embeddedReportSource: item.embeddedReportSource ?? null,
      filters: item.filters.map((filter) => ({
        ...filter,
        options: this.normalizeOptions(filter.options ?? [])
      }))
    };
  }

  private normalizeOptions(options: ReportParameterOption[]): ReportParameterOption[] {
    const seen = new Set<string>();
    const normalized: ReportParameterOption[] = [];

    for (const option of options) {
      const value = option?.value ?? '';
      const label = option?.label ?? '';
      const key = `${value}::${label}`;
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      normalized.push({ value, label });
    }

    return normalized;
  }

  private getEmbeddedHeaders(reportId: string): [string, string, string, string] {
    switch (reportId) {
      case 'open-opportunities-by-owner':
        return ['Owner', 'Stage', 'Open Deals', 'Pipeline'];
      case 'pending-deal-approval':
        return ['Deal', 'Workflow', 'Status', 'Due'];
      case 'lead-conversion-summary':
        return ['Lead Source', 'Created', 'Qualified', 'Converted'];
      case 'sales-activities-by-owner':
        return ['Owner', 'Activities', 'Completed', 'Overdue'];
      case 'forecast-summary':
      case 'forecast-distribution':
      case 'revenue-forecast':
        return ['Forecast Bucket', 'Deals', 'Open Value', 'Weighted'];
      case 'pipeline-stage-mix':
        return ['Stage', 'Deals', 'Value', 'Share'];
      case 'revenue-and-conversion-trend':
        return ['Period', 'Revenue', 'Leads', 'Converted'];
      case 'win-loss-analysis':
        return ['Outcome', 'Deals', 'Value', 'Avg Deal'];
      case 'sales-cycle-duration':
        return ['Stage', 'Deals', 'Avg Age', 'Avg Value'];
      case 'top-deals':
        return ['Deal', 'Account', 'Stage', 'Amount'];
      case 'lead-conversion-funnel':
        return ['Funnel Step', 'Count', '', ''];
      case 'lead-source-performance':
        return ['Source', 'Leads', 'Converted', 'Conv Rate'];
      case 'lead-aging':
        return ['Age Bucket', 'Lead Count', '', ''];
      case 'lead-score-distribution':
        return ['Score Band', 'Leads', 'Avg Score', 'Avg Confidence'];
      case 'lead-quality-vs-conversation-signal':
        return ['Lead', 'Owner', 'Qualification', 'Conversation'];
      case 'cqvs-readiness-heatmap':
        return ['Factor', 'Captured', 'Verified', 'Missing'];
      case 'manager-pipeline-health':
      case 'pipeline-health-scorecard':
        return ['Stage', 'Open Deals', 'Stale', 'Weighted'];
      case 'activity-summary':
        return ['Activity Type', 'Count', 'Open', 'Completed'];
      case 'team-performance':
        return ['Owner', 'Open Deals', 'Pipeline', 'Completed Acts'];
      case 'customer-growth':
        return ['Period', 'New Customers', 'Revenue', 'Industry'];
      case 'customer-revenue-concentration':
        return ['Customer', 'Annual Revenue', 'Open Opps', 'Pipeline'];
      case 'campaign-roi':
        return ['Campaign', 'Members', 'Actual', 'Planned'];
      case 'email-engagement':
        return ['Template / Subject', 'Sent', 'Opened', 'Clicked'];
      default:
        return ['Column 1', 'Column 2', 'Column 3', 'Column 4'];
    }
  }
}
