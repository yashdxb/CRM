/**
 * Supplier Lifecycle Statuses
 * Based on industry best practices (SAP Ariba, Coupa, Oracle)
 */

export type SupplierStatus = 
  | 'Draft'
  | 'Pending Approval'
  | 'Approved'
  | 'Active'
  | 'On Hold'
  | 'Blocked'
  | 'Inactive';

export interface StatusOption {
  label: string;
  value: SupplierStatus;
  description: string;
  canOrder: boolean;
  severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';
}

export const SUPPLIER_STATUSES: StatusOption[] = [
  { label: 'Draft', value: 'Draft', description: 'Initial data entry, incomplete profile', canOrder: false, severity: 'secondary' },
  { label: 'Pending Approval', value: 'Pending Approval', description: 'Submitted for review', canOrder: false, severity: 'info' },
  { label: 'Approved', value: 'Approved', description: 'Passed compliance/vetting', canOrder: true, severity: 'success' },
  { label: 'Active', value: 'Active', description: 'Currently transacting', canOrder: true, severity: 'success' },
  { label: 'On Hold', value: 'On Hold', description: 'Temporarily suspended', canOrder: false, severity: 'warn' },
  { label: 'Blocked', value: 'Blocked', description: 'Compliance violation', canOrder: false, severity: 'danger' },
  { label: 'Inactive', value: 'Inactive', description: 'Archived, no longer used', canOrder: false, severity: 'contrast' }
];

/**
 * Valid status transitions
 * Key = current status, Value = array of allowed next statuses
 */
export const STATUS_TRANSITIONS: Record<SupplierStatus, SupplierStatus[]> = {
  'Draft': ['Pending Approval', 'Inactive'],
  'Pending Approval': ['Approved', 'Draft', 'Inactive'],
  'Approved': ['Active', 'On Hold', 'Blocked', 'Inactive'],
  'Active': ['On Hold', 'Blocked', 'Inactive'],
  'On Hold': ['Active', 'Blocked', 'Inactive'],
  'Blocked': ['On Hold', 'Inactive'],
  'Inactive': ['Draft'] // Can reactivate by starting over
};

/**
 * Get allowed next statuses for a given current status
 */
export function getAllowedTransitions(currentStatus: SupplierStatus | string | null): StatusOption[] {
  if (!currentStatus) {
    // New supplier starts as Draft
    return SUPPLIER_STATUSES.filter(s => s.value === 'Draft');
  }
  
  const allowed = STATUS_TRANSITIONS[currentStatus as SupplierStatus] || [];
  return SUPPLIER_STATUSES.filter(s => allowed.includes(s.value) || s.value === currentStatus);
}

/**
 * Get status severity for PrimeNG Tag component
 */
export function getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
  const found = SUPPLIER_STATUSES.find(s => s.value === status);
  return found?.severity ?? 'secondary';
}

/**
 * Check if a status allows ordering
 */
export function canPlaceOrders(status: string): boolean {
  const found = SUPPLIER_STATUSES.find(s => s.value === status);
  return found?.canOrder ?? false;
}

/**
 * Get filter options for directory (includes "All" option)
 */
export function getStatusFilterOptions(): Array<{ label: string; value: string | null }> {
  return [
    { label: 'All statuses', value: null },
    ...SUPPLIER_STATUSES.map(s => ({ label: s.label, value: s.value }))
  ];
}
