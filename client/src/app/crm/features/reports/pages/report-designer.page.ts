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

  private get assetsUrl(): string {
    const basePath = '/api/report-designer-assets';
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
      // Telerik Web Report Designer requires full Kendo runtime APIs (View/Router/Binder).
      await this.loadRequiredScriptWithFallback([
        'https://kendo.cdn.telerik.com/2022.3.1109/js/kendo.all.min.js'
      ]);

      // Load required styles in deterministic order.
      await this.loadRequiredStyles([
        `${this.assetsUrl}/webReportDesigner-20.0.26.304.min.css`,
        `${this.assetsUrl}/webReportDesignerTheme-20.0.26.304.min.css`,
        `${this.assetsUrl}/jquery.ui-1.14.1.min.css`
      ]);
      
      // Ensure jQuery is globally available for Telerik jQuery plugin registration.
      if (typeof jQuery === 'undefined') {
        throw new Error('jQuery failed to initialize for the Report Designer.');
      }

      if (typeof (window as any).kendo?.View !== 'function') {
        throw new Error('Kendo runtime failed to initialize for the Report Designer.');
      }

      // Load required scripts in deterministic order.
      await this.loadRequiredScriptWithFallback([
        `${this.assetsUrl}/clipboard.polyfill-2.8.1.min.js`,
        `${this.assetsUrl}/clipboard.polyfill.min.js`,
        `${this.assetsUrl}/clipboard-polyfill.min.js`
      ]);
      await this.loadRequiredScriptWithFallback([
        `${this.assetsUrl}/jquery.ui-1.14.1.min.js`
      ]);
      await this.loadRequiredScriptWithFallback([
        `${this.assetsUrl}/webReportDesigner-20.0.26.304.min.js`
      ]);

      // Initialize the designer
      this.initializeDesigner();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load report designer';
      this.error.set(message);
      this.loading.set(false);
      this.toast.show('error', message);
    }
  }

  private async loadRequiredStyles(hrefs: string[]): Promise<void> {
    for (const href of hrefs) {
      await this.loadStylesheet(href);
    }
  }

  private async loadRequiredScriptWithFallback(srcs: string[]): Promise<void> {
    const errors: string[] = [];
    for (const src of srcs) {
      try {
        await this.loadScript(src);
        return;
      } catch (err) {
        errors.push(err instanceof Error ? err.message : String(err));
      }
    }

    throw new Error(`Failed to load required Report Designer script: ${errors.join(' | ')}`);
  }

  private initializeDesigner(): void {
    if (!this.designerContainer?.nativeElement) {
      this.error.set('Designer container not found');
      this.loading.set(false);
      return;
    }

    try {
      const pluginMethod = this.resolveDesignerPluginMethod();
      const dataKey = pluginMethod === 'telerik_WebReportDesigner'
        ? 'telerik_WebReportDesigner'
        : 'telerikWebReportDesigner';

      this.designerInstance = jQuery(this.designerContainer.nativeElement)[pluginMethod]({
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
      }).data(dataKey);

      this.loading.set(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize designer';
      this.error.set(message);
      this.loading.set(false);
    }
  }

  private resolveDesignerPluginMethod(): 'telerik_WebReportDesigner' | 'telerikWebReportDesigner' {
    const jqueryPlugin = jQuery?.fn;

    if (typeof jqueryPlugin?.telerik_WebReportDesigner === 'function') {
      return 'telerik_WebReportDesigner';
    }

    if (typeof jqueryPlugin?.telerikWebReportDesigner === 'function') {
      return 'telerikWebReportDesigner';
    }

    throw new Error('Telerik Web Report Designer plugin is not registered on jQuery.');
  }

  private destroyDesigner(): void {
    if (this.designerInstance && typeof this.designerInstance.dispose === 'function') {
      this.designerInstance.dispose();
    }
    this.designerInstance = null;
  }

  private loadStylesheet(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null;
      if (existing) {
        if (existing.dataset['loaded'] === 'true') {
          resolve();
          return;
        }

        existing.addEventListener('load', () => {
          existing.dataset['loaded'] = 'true';
          resolve();
        }, { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load stylesheet: ${href}`)), { once: true });
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        link.dataset['loaded'] = 'true';
        resolve();
      };
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
      document.head.appendChild(link);
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
      if (existing) {
        if (existing.dataset['loaded'] === 'true') {
          resolve();
          return;
        }

        existing.addEventListener('load', () => {
          existing.dataset['loaded'] = 'true';
          resolve();
        }, { once: true });
        existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => {
        script.dataset['loaded'] = 'true';
        resolve();
      };
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
