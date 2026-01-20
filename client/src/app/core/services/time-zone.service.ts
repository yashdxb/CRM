import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TimeZoneDefinitionDto, TimeZoneOption } from '../models/time-zone.model';

@Injectable({ providedIn: 'root' })
export class TimeZoneService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private readonly timeZones$ = this.http
    .get<TimeZoneDefinitionDto[]>(`${this.baseUrl}/api/system/timezones`)
    .pipe(
      map((zones) =>
        zones.map((zone) => ({
          label: zone.label,
          value: zone.ianaId,
          utcOffsetMinutes: zone.utcOffsetMinutes,
          flagCode: zone.flagCode
        }))
      ),
      // Cache once so every page uses the same list and avoids repeat calls.
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError(() => of([]))
    );

  getTimeZones() {
    return this.timeZones$;
  }
}
