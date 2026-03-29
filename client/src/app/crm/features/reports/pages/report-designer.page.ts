import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext } from '../../../../core/auth/token.utils';
import { ReportCatalogItem, ReportCategory, ReportServerConfig } from '../models/report.model';
import { ReportsDataService } from '../services/reports-data.service';
import { environment } from '../../../../../environments/environment';

type ReportWorkspaceMode = 'loading' | 'embedded' | 'report-server' | 'unavailable';

@Component({
  selector: 'app-report-designer-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, RouterLink],
  templateUrl: './report-designer.page.html',
  styleUrl: './report-designer.page.scss'
})
export class ReportDesignerPage {
  private readonly reportsData = inject(ReportsDataService);
  private readonly toast = inject(AppToastService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly route = inject(ActivatedRoute);
  private readonly apiBaseUrl = environment.apiUrl.replace(/\/+$/, '');
  private readonly clientBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  @ViewChild('designerFrame', { static: false }) designerFrame?: ElementRef<HTMLIFrameElement>;

  protected readonly workspaceMode = signal<ReportWorkspaceMode>('loading');
  protected readonly reportServerConfig = signal<ReportServerConfig | null>(null);
  protected readonly reportServerCatalog = signal<ReportCatalogItem[]>([]);
  protected readonly reportServerCategories = signal<ReportCategory[]>([]);
  protected readonly reportServerLoading = signal(false);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly designerFrameUrl = signal<SafeResourceUrl | null>(null);
  protected readonly requestedReport = signal<string>('');

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.requestedReport.set(params.get('report') ?? '');
    });
    this.loadWorkspaceMode();
  }

  protected readonly isEmbeddedMode = (): boolean => this.workspaceMode() === 'embedded';
  protected readonly isReportServerMode = (): boolean => this.workspaceMode() === 'report-server';
  protected readonly isUnavailableMode = (): boolean => this.workspaceMode() === 'unavailable';

  protected openReportServerViewer(): void {
    const config = this.reportServerConfig();
    if (!config?.reportServerUrl) {
      return;
    }

    window.open(`${config.reportServerUrl}/Report`, '_blank', 'noopener');
  }

  protected retry(): void {
    this.error.set(null);
    this.loading.set(true);
    this.designerFrameUrl.set(this.buildDesignerFrameUrl());
  }

  protected onDesignerFrameLoad(): void {
    if (!this.isEmbeddedMode()) {
      return;
    }

    const frameWindow = this.designerFrame?.nativeElement.contentWindow;
    if (!frameWindow) {
      this.error.set('Report designer frame is unavailable.');
      this.loading.set(false);
      return;
    }

    frameWindow.postMessage({
      type: 'crm-report-designer:init',
        payload: {
          serviceUrl: this.designerServiceUrl,
          assetsUrl: this.designerAssetsUrl,
          authenticationToken: this.authToken,
          report: this.requestedReport()
        }
      }, this.clientBaseUrl || '*');
  }

  @HostListener('window:message', ['$event'])
  protected onMessage(event: MessageEvent): void {
    if (event.origin !== this.clientBaseUrl || !event.data || typeof event.data !== 'object') {
      return;
    }

    const type = (event.data as { type?: string }).type;
    if (type === 'crm-report-designer:ready') {
      this.loading.set(false);
      this.error.set(null);
      return;
    }

    if (type === 'crm-report-designer:error') {
      const message = String((event.data as { message?: string }).message || 'Failed to initialize report designer.');
      this.error.set(message);
      this.loading.set(false);
      this.toast.show('error', message);
    }
  }

  private get designerServiceUrl(): string {
    const basePath = '/api/report-designer';
    return environment.production
      ? `${this.apiBaseUrl}${basePath}`
      : `${this.apiBaseUrl}${basePath}`;
  }

  private get designerAssetsUrl(): string {
    const basePath = '/api/report-designer-assets';
    return environment.production
      ? `${this.apiBaseUrl}${basePath}`
      : `${this.apiBaseUrl}${basePath}`;
  }

  private get authToken(): string {
    return readTokenContext()?.token ?? '';
  }

  private loadWorkspaceMode(): void {
    this.reportServerLoading.set(true);

    this.reportsData.getReportServerConfig().subscribe({
      next: (cfg) => {
        this.reportServerConfig.set(cfg.enabled ? cfg : null);

        if (!cfg.enabled) {
          this.workspaceMode.set('unavailable');
          this.loading.set(false);
          this.reportServerLoading.set(false);
          return;
        }

        this.workspaceMode.set('embedded');
        this.reportServerLoading.set(false);
        this.loading.set(true);
        this.designerFrameUrl.set(this.buildDesignerFrameUrl());
      },
      error: () => {
        this.reportServerConfig.set(null);
        this.workspaceMode.set('unavailable');
        this.reportServerCatalog.set([]);
        this.reportServerCategories.set([]);
        this.reportServerLoading.set(false);
        this.loading.set(false);
      }
    });
  }

  private buildDesignerFrameUrl(): SafeResourceUrl {
    const raw = `${this.clientBaseUrl}/assets/report-designer-host.html`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  }
}
