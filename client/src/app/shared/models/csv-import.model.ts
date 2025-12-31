export interface CsvImportError {
  rowNumber: number;
  message: string;
}

export interface CsvImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: CsvImportError[];
}

export type CsvImportJobStatus = 'Queued' | 'Processing' | 'Completed' | 'Failed';

export interface CsvImportJob {
  id: string;
  entityType: string;
  status: CsvImportJobStatus;
}

export interface CsvImportJobStatusResponse {
  id: string;
  entityType: string;
  status: CsvImportJobStatus;
  total: number;
  imported: number;
  skipped: number;
  errors: CsvImportError[];
  createdAtUtc: string;
  completedAtUtc?: string | null;
  errorMessage?: string | null;
}
