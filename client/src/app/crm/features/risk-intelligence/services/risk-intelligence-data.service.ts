import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, of, retry, switchMap, take, timeout, timer } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { readTokenContext } from '../../../../core/auth/token.utils';
import { RiskIntelligenceWorkspace } from '../models/risk-intelligence.model';

function retryTransient<T>() {
  return (source: import('rxjs').Observable<T>) =>
    source.pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryIndex: number) => {
          const status = error?.status ?? 0;
          if (status === 0 || status === 401 || status === 403 || status === 502 || status === 503 || status === 504) {
            return timer(retryIndex * 2000);
          }
          throw error;
        }
      })
    );
}

function waitForAuthContext(): Observable<void> {
  return timer(0, 200).pipe(
    filter(() => !!readTokenContext()?.token),
    take(1),
    timeout({ first: 1500, with: () => of(0) }),
    map(() => void 0)
  );
}

@Injectable({ providedIn: 'root' })
export class RiskIntelligenceDataService {
  private readonly http = inject(HttpClient);

  getWorkspace() {
    return waitForAuthContext().pipe(
      switchMap(() =>
        this.http
          .get<RiskIntelligenceWorkspace>(`${environment.apiUrl}/api/risk-intelligence/workspace`)
          .pipe(retryTransient())
      )
    );
  }
}
