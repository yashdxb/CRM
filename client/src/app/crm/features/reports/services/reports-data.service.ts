import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, timeout } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  PipelineByStageReport,
  ReportsEmbedConfig,
  ReportServerConfig,
  ReportServerToken,
  ReportCatalogItem,
  ReportLibraryItem,
  ReportCategory,
  ReportParameterOption
} from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportsDataService {
  private readonly http = inject(HttpClient);

  getPipelineByStage() {
    const url = `${environment.apiUrl}/api/reports/pipeline-by-stage`;
    const empty: PipelineByStageReport = {
      generatedAtUtc: new Date().toISOString(),
      totalOpenOpportunities: 0,
      totalPipelineValue: 0,
      stages: []
    };

    return this.http.get<PipelineByStageReport>(url).pipe(catchError((err) => {
      console.error('Failed to load pipeline-by-stage report', err);
      return of(empty);
    }));
  }

  getEmbedConfig() {
    const url = `${environment.apiUrl}/api/reports/embed-config`;
    const empty: ReportsEmbedConfig = {
      enabled: false,
      provider: 'telerik-rest-service',
      serviceUrl: null,
      pipelineByStageReportSource: null
    };

    return this.http.get<ReportsEmbedConfig>(url).pipe(catchError((err) => {
      console.error('Failed to load embed config', err);
      return of(empty);
    }));
  }

  getReportServerConfig() {
    const url = `${environment.apiUrl}/api/report-server/config`;
    const empty: ReportServerConfig = { enabled: false };
    return this.http.get<ReportServerConfig>(url).pipe(catchError((err) => {
      console.error('Failed to load report server config', err);
      return of(empty);
    }));
  }

  getReportServerToken() {
    const url = `${environment.apiUrl}/api/report-server/token`;
    return this.http.post<ReportServerToken>(url, null);
  }

  getReportCatalog() {
    const url = `${environment.apiUrl}/api/report-server/catalog`;
    return this.http.get<ReportCatalogItem[]>(url).pipe(catchError((err) => {
      console.error('Failed to load report catalog', err);
      return of([] as ReportCatalogItem[]);
    }));
  }

  getReportLibrary() {
    const url = `${environment.apiUrl}/api/report-server/library`;
    return this.http.get<ReportLibraryItem[]>(url).pipe(
      timeout(8000),
      catchError((err) => {
        console.error('Failed to load report library', err);
        return of([] as ReportLibraryItem[]);
      })
    );
  }

  getReportCategories() {
    const url = `${environment.apiUrl}/api/report-server/categories`;
    return this.http.get<ReportCategory[]>(url).pipe(catchError((err) => {
      console.error('Failed to load report categories', err);
      return of([] as ReportCategory[]);
    }));
  }

  getReportParameterOptions(reportId: string, parameterName: string) {
    const encodedReportId = encodeURIComponent(reportId);
    const encodedParameterName = encodeURIComponent(parameterName);
    const url = `${environment.apiUrl}/api/report-server/reports/${encodedReportId}/parameters/${encodedParameterName}/options`;
    return this.http.get<ReportParameterOption[]>(url).pipe(catchError((err) => {
      console.error('Failed to load report parameter options', err);
      return of([] as ReportParameterOption[]);
    }));
  }
}
