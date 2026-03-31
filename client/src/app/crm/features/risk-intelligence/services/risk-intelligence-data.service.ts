import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, retry, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { RiskIntelligenceWorkspace } from '../models/risk-intelligence.model';

function retryTransient<T>() {
  return (source: import('rxjs').Observable<T>) =>
    source.pipe(
      retry({
        count: 2,
        delay: (error: HttpErrorResponse, retryIndex: number) => {
          const status = error?.status ?? 0;
          if (status === 0 || status === 502 || status === 503 || status === 504) {
            return timer(retryIndex * 2000);
          }
          throw error;
        }
      })
    );
}

@Injectable({ providedIn: 'root' })
export class RiskIntelligenceDataService {
  private readonly http = inject(HttpClient);

  getWorkspace() {
    const empty: RiskIntelligenceWorkspace = {
      summary: {
        totalOpenRisks: 0,
        immediateRisks: 0,
        soonRisks: 0,
        stalePipelineCount: 0,
        overdueApprovals: 0
      },
      priorityRisks: [],
      watchlist: [],
      generatedAtUtc: new Date().toISOString()
    };

    return this.http
      .get<RiskIntelligenceWorkspace>(`${environment.apiUrl}/api/risk-intelligence/workspace`)
      .pipe(
        retryTransient(),
        catchError((err) => {
          console.error('Failed to load Risk Intelligence workspace', err);
          return of(empty);
        })
      );
  }
}
