export type FormDraftEntityType = 'lead' | 'customer' | 'contact' | 'opportunity';

export interface FormDraftSummary {
  id: string;
  entityType: FormDraftEntityType;
  title: string;
  subtitle?: string | null;
  createdAtUtc: string;
  updatedAtUtc: string;
}

export interface FormDraftDetail extends FormDraftSummary {
  payloadJson: string;
  status: string;
}

export interface FormDraftListResponse {
  items: FormDraftSummary[];
  total: number;
}

export interface SaveFormDraftRequest {
  id?: string | null;
  entityType: FormDraftEntityType;
  title?: string | null;
  subtitle?: string | null;
  payloadJson?: string | null;
}
