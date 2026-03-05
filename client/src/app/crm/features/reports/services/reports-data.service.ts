import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PipelineByStageReport, ReportsEmbedConfig } from '../models/report.model';

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
}
