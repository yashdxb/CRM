export interface AwardLine {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  targetPrice?: number;
  specifications?: string;
}

export interface AwardShippingSelection {
  laneId?: string | null;
  transportMode?: string | null;
  carrierId?: string | null;
  rateId?: string | null;
  shippingCost?: number | null;
}

export interface AwardSummary {
  id: string;
  reference: string;
  rfqId: string;
  title: string;
  supplierId: string;
  supplierName: string;
  currency: string;
  paymentTerms?: string | null;
  incoterms?: string | null;
  deliveryLocation?: string | null;
  deliveryDate?: string | null;
  notes?: string | null;
  shipping?: AwardShippingSelection;
  lines: AwardLine[];
  createdOn: string;
  status?: 'Draft' | 'Awarded' | 'Released';
}
