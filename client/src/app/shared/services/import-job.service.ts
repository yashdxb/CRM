import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CsvImportJobStatusResponse } from '../models/csv-import.model';

@Injectable({ providedIn: 'root' })
export class ImportJobService {
  private readonly http = inject(HttpClient);

  getStatus(jobId: string) {
    return this.http.get<CsvImportJobStatusResponse>(`${environment.apiUrl}/api/import-jobs/${jobId}`);
  }
}
