// ✅ rfq.model.ts
export interface RFQ {
  id: string;                      // ✅ standardized lowercase
  buyerId: string;
  buyerName: string;
  buyerOrganization?: string;
  rfqNumber: string;
  title: string;
  description: string;
  type: RFQType;
  status: RFQStatus;
  publishDate?: Date;
  deliveryDate?: Date;
  deliveryLocation?: string;
  issueDate?: Date;                // ✅ made optional
  closeDate: Date;
  responseDeadline: Date;
  expectedDeliveryDate?: Date;
  currency: string;
  paymentTerms?: string;
  incoterms?: string;
  totalEstimatedValue?: number;
  createdBy: string;
  createdAt?: Date;                // ✅ optional for seed
  updatedAt?: Date;
  lineItems: {
    id: string;
    productName: string;
    description: string;
    quantity: number;
    uom: string;
    targetPrice?: number;
    specifications?: string;
  }[];
  invitedSupplierIds: string[];
  invitedSupplierCount: number;
  responseCount: number;
}

export enum RFQType {
  RFQ = 'RFQ',
  RFP = 'RFP',
  RFI = 'RFI'
}

export enum RFQStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  IN_PROGRESS = 'In Progress',
  CLOSED = 'Closed',
  CANCELLED = 'Cancelled',
  AWARDED = 'Awarded'
}
export interface RFQFilter {
  status?: RFQStatus;
  type?: RFQType;
  searchText?: string;
  dateFrom?: Date;
  dateTo?: Date;
}