// src/app/domains/sourcing/models/quote.model.ts

export interface Quote {
  id: string;
  quoteNumber: string;
  rfqId: string;
  rfqNumber: string;
  supplierId: string;
  supplierName: string;
  status: QuoteStatus;
  quoteDate: Date;
  submittedDate: Date;
  validUntil: Date;
  totalAmount: number;
  currency: string;
  paymentTerms: string;
  deliveryTerms: string;
  notes?: string;
  lineItems: QuoteLineItem[];
}

export interface QuoteLineItem {
  id: string;
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export enum QuoteStatus {
  DRAFT = 'Draft',
  SUBMITTED = 'Submitted',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  EXPIRED = 'Expired'
}

export interface CreateQuoteDto {
  rfqId: string;
  quoteDate: Date;
  paymentTerms: string;
  deliveryTerms: string;
  validUntil: Date;
  notes?: string;
  lineItems: CreateQuoteLineDto[];
}

export interface CreateQuoteLineDto {
  productCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
}