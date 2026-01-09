import { RFQ, RFQStatus, RFQType } from '../../../models/rfq.model';

export const RFQS_SEED_DATA: Omit<RFQ, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    buyerId: 'buyer-1',
    buyerName: 'Acme Manufacturing',
    rfqNumber: 'RFQ-2025-001',
    title: 'Electronic Components - Q1 2025',
    description: 'Request for quotation for electronic components required for Q1 2025 production',
    type: RFQType.RFQ,
    status: RFQStatus.PUBLISHED,
    publishDate: new Date('2025-01-15'),
    closeDate: new Date('2025-02-15'),
    responseDeadline: new Date('2025-02-10'),
    deliveryDate: new Date('2025-03-01'),
    deliveryLocation: 'Toronto, ON, Canada',
    paymentTerms: 'NET30',
    incoterms: 'DDP',
    currency: 'CAD',
    lineItems: [
      { id: 'line-1', productName: 'Microcontroller IC', description: 'ARM Cortex-M4 32-bit', quantity: 1000, uom: 'EA', targetPrice: 5.5 },
      { id: 'line-2', productName: 'PCB Assembly', description: '4-layer PCB with SMT', quantity: 500, uom: 'EA', targetPrice: 25 }
    ],
    invitedSupplierIds: ['sup-1', 'sup-2', 'sup-3'],
    invitedSupplierCount: 3,
    responseCount: 2,
    createdBy: 'user-1'
  },
  {
    buyerId: 'buyer-1',
    buyerName: 'Acme Manufacturing',
    rfqNumber: 'RFQ-2025-002',
    title: 'Raw Materials - Steel & Aluminum',
    description: 'Bulk procurement of steel sheets and aluminum rods',
    type: RFQType.RFQ,
    status: RFQStatus.IN_PROGRESS,   // ✅ fixed
    publishDate: new Date('2025-01-20'),
    closeDate: new Date('2025-02-20'),
    responseDeadline: new Date('2025-02-15'),
    deliveryDate: new Date('2025-03-15'),
    deliveryLocation: 'Vancouver, BC, Canada',
    paymentTerms: 'NET60',
    incoterms: 'FOB',
    currency: 'USD',
    lineItems: [
      { id: 'line-1', productName: 'Steel Sheet', description: 'Cold-rolled, 1mm', quantity: 10000, uom: 'KG', targetPrice: 1.2 },
      { id: 'line-2', productName: 'Aluminum Rod', description: '6061-T6, Ø25mm', quantity: 5000, uom: 'KG', targetPrice: 3.5 }
    ],
    invitedSupplierIds: ['sup-4', 'sup-5'],
    invitedSupplierCount: 2,
    responseCount: 1,
    createdBy: 'user-1'
  }
];