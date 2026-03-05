import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
  signal,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext } from '../../../../core/auth/token.utils';
import { environment } from '../../../../../environments/environment';

declare const jQuery: any;
declare const telerikWebReportDesigner: any;

@Component({
  selector: 'app-report-designer-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './report-designer.page.html',
  styleUrl: './report-designer.page.scss'
})
export class ReportDesignerPage implements AfterViewInit, OnDestroy {
  private readonly toast = inject(AppToastService);
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('designerContainer', { static: false }) designerContainer?: ElementRef<HTMLDivElement>;

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  private designerInstance: any = null;

  private get serviceUrl(): string {
    const basePath = '/api/report-designer';
    return environment.production
      ? `${environment.apiUrl.replace(/\/+$/, '')}${basePath}`
      : basePath;
  }

  private get authToken(): string {
    return readTokenContext()?.token ?? '';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDesignerAssets();
    }
  }

  ngOnDestroy(): void {
    this.destroyDesigner();
  }

  private async loadDesignerAssets(): Promise<void> {
    try {
      // Load the designer CSS
      await this.loadStylesheet(`${this.serviceUrl}/resources/styles/telerikWebReportDesigner.min.css`);
      
      // Check if jQuery is available (should be from report viewer)
      if (typeof jQuery === 'undefined') {
        throw new Error('jQuery is not available. The report viewer should have loaded it.');
      }

      // Load the designer scripts
      await this.loadScript(`${this.serviceUrl}/resources/js/telerikWebReportDesigner.min.js`);

      // Initialize the designer
      this.initializeDesigner();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load report designer';
      this.error.set(message);
      this.loading.set(false);
      this.toast.show('error', message);
    }
  }

  private initializeDesigner(): void {
    if (!this.designerContainer?.nativeElement) {
      this.error.set('Designer container not found');
      this.loading.set(false);
      return;
    }

    try {
      this.designerInstance = jQuery(this.designerContainer.nativeElement).telerikWebReportDesigner({
        serviceUrl: this.serviceUrl,
        report: '',
        persistSession: true,
        authenticationToken: this.authToken,
        toolboxArea: {
          layout: 'list'
        },
        propertiesArea: {
          layout: 'categorized'
        },
        skipOnboarding: false
      }).data('telerikWebReportDesigner');

      this.loading.set(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize designer';
      this.error.set(message);
      this.loading.set(false);
    }
  }

  private destroyDesigner(): void {
    if (this.designerInstance && typeof this.designerInstance.dispose === 'function') {
      this.designerInstance.dispose();
    }
    this.designerInstance = null;
  }

  private loadStylesheet(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
      document.head.appendChild(link);
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }

  protected retry(): void {
    this.error.set(null);
    this.loading.set(true);
    this.loadDesignerAssets();
  }
}
