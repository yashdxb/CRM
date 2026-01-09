export type PurchaseOrderStatus = 'Draft' | 'Submitted' | 'Approved' | 'In Transit' | 'Completed' | 'Cancelled';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  supplierName: string;
  status: PurchaseOrderStatus;
  orderDate: Date;
  expectedDeliveryDate?: Date | null;
  totalAmount: number;
  currency: string;
  lineItemCount: number;
}

export interface PurchaseOrderFilter {
  searchText: string;
  status?: PurchaseOrderStatus;
  supplier?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export type PoApprovalStatus = 'Pending' | 'Escalated' | 'Approved';

export interface PoApproval {
  poNumber: string;
  requestor: string;
  department: string;
  amount: string;
  status: PoApprovalStatus;
  submittedOn: string;
  dueBy: string;
  approvers: string[];
  currentApprover: string;
  notes: string;
}
