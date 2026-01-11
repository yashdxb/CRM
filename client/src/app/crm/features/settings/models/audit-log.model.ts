export interface AuditEventItem {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  field?: string | null;
  oldValue?: string | null;
  newValue?: string | null;
  changedByUserId?: string | null;
  changedByName?: string | null;
  createdAtUtc: string;
}

export interface AuditLogResponse {
  items: AuditEventItem[];
  total: number;
}

export interface AuditLogQuery {
  search?: string;
  entityType?: string;
  action?: string;
  userId?: string;
  fromUtc?: string;
  toUtc?: string;
  page?: number;
  pageSize?: number;
}
