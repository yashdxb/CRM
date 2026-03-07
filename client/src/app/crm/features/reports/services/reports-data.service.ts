import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  PipelineByStageReport,
  ReportsEmbedConfig,
  ReportServerConfig,
  ReportServerToken,
  ReportCatalogItem,
  ReportCategory
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

    return this.http.get<PipelineByStageReport>(url).pipe(catchError(() => of(empty)));
  }

  getEmbedConfig() {
    const url = `${environment.apiUrl}/api/reports/embed-config`;
    const empty: ReportsEmbedConfig = {
      enabled: false,
      provider: 'telerik-rest-service',
      serviceUrl: null,
      pipelineByStageReportSource: null
    };

    return this.http.get<ReportsEmbedConfig>(url).pipe(catchError(() => of(empty)));
  }

  getReportServerConfig() {
    const url = `${environment.apiUrl}/api/report-server/config`;
    const empty: ReportServerConfig = { enabled: false };
    return this.http.get<ReportServerConfig>(url).pipe(catchError(() => of(empty)));
  }

  getReportServerToken() {
    const url = `${environment.apiUrl}/api/report-server/token`;
    return this.http.post<ReportServerToken>(url, null);
  }

  getReportCatalog() {
    const url = `${environment.apiUrl}/api/report-server/catalog`;
    return this.http.get<ReportCatalogItem[]>(url).pipe(catchError(() => of([])));
  }

  getReportCategories() {
    const url = `${environment.apiUrl}/api/report-server/categories`;
    return this.http.get<ReportCategory[]>(url).pipe(catchError(() => of([])));
  }
}
