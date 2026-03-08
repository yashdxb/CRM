import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
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
  imports: [CommonModule, FormsModule, ButtonModule, DatePickerModule, SelectModule, BreadcrumbsComponent, TelerikReportingModule],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss'
})
export class ReportsPage implements AfterViewInit {
  private readonly data = inject(ReportsDataService);
  private readonly toast = inject(AppToastService);
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

  protected readonly reportServerEnabled = signal(false);
  protected readonly reportServerConfig = signal<ReportServerConfig | null>(null);
  protected readonly reportCatalog = signal<ReportLibraryItem[]>([]);
  protected readonly catalogLoading = signal(false);
  protected readonly selectedReport = signal<ReportLibraryItem | null>(null);
  protected readonly reportServerToken = signal('');
  protected readonly viewerReady = signal(false);
  protected readonly canOpenReportDesigner = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );
  protected readonly filterValues = signal<Record<string, string>>({});
  protected readonly dynamicFilterOptions = signal<Record<string, ReportParameterOption[]>>({});
  protected readonly filterOptionsLoading = signal(false);

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
    this.selectedReport.set(item);
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

    this.viewerReady.set(false);
    this.telerikServiceUrl.set(this.resolveServiceUrl(config.reportServiceUrl));
    const reportPath = selected.categoryName
      ? `${selected.categoryName}/${selected.name}`
      : selected.name;

    const reportSource: Record<string, unknown> = { report: reportPath };
    const parameters: Record<string, string> = {};
    const values = this.filterValues();

    for (const filter of selected.filters) {
      if (filter.kind === 'dateRange') {
        if (filter.parameterName) {
          parameters[filter.parameterName] = values[filter.parameterName] ?? '';
        }
        if (filter.parameterNameTo) {
          parameters[filter.parameterNameTo] = values[filter.parameterNameTo] ?? '';
        }
        continue;
      }

      if (filter.parameterName) {
        parameters[filter.parameterName] = values[filter.parameterName] ?? '';
      }
    }

    if (Object.keys(parameters).length > 0) {
      reportSource['parameters'] = parameters;
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

    return this.filterValues()[parameterName] ?? '';
  }

  protected setFilterValue(parameterName: string | null | undefined, value: string | null | undefined) {
    if (!parameterName) {
      return;
    }

    this.filterValues.update((current) => ({
      ...current,
      [parameterName]: value ?? ''
    }));
  }

  protected getFilterOptions(filter: ReportLibraryFilter): ReportParameterOption[] {
    const source = filter.optionSource === 'report-parameter'
      ? this.dynamicFilterOptions()[filter.key] ?? []
      : filter.options ?? [];

    const seen = new Set<string>();
    return source.filter((option) => {
      const key = `${option.value}::${option.label}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }

  protected getDateFilterValue(parameterName?: string | null): Date | null {
    const value = this.getFilterValue(parameterName);
    if (!value) {
      return null;
    }

    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  protected setDateFilterValue(parameterName: string | null | undefined, value: Date | Date[] | null | undefined) {
    if (!parameterName) {
      return;
    }

    const nextValue = value instanceof Date
      ? this.formatDateForParameter(value)
      : '';

    this.setFilterValue(parameterName, nextValue);
  }

  protected trackFilter(_index: number, filter: ReportLibraryFilter) {
    return filter.key;
  }

  private initializeFilterValues(report: ReportLibraryItem) {
    const nextValues: Record<string, string> = {};

    for (const filter of report.filters) {
      if (filter.kind === 'dateRange') {
        if (filter.parameterName) {
          nextValues[filter.parameterName] = filter.defaultValue ?? '';
        }

        if (filter.parameterNameTo) {
          nextValues[filter.parameterNameTo] = filter.defaultValueTo ?? '';
        }

        continue;
      }

      if (filter.parameterName) {
        nextValues[filter.parameterName] = filter.defaultValue ?? '';
      }
    }

    this.filterValues.set(nextValues);
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
        this.dynamicFilterOptions.set(result);
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

  private loadReportServerConfig() {
    this.data.getReportServerConfig().subscribe({
      next: (config) => {
        this.reportServerConfig.set(config);
        this.reportServerEnabled.set(config.enabled);
        if (config.enabled) {
          this.loadReportServerToken();
          this.loadLibrary();
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

  private loadLibrary() {
    this.catalogLoading.set(true);
    this.data.getReportLibrary().subscribe({
      next: (items) => {
        this.reportCatalog.set(items);
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
