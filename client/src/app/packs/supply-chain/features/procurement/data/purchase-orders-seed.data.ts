import { PurchaseOrder } from '../../../models/po.model';

export const PURCHASE_ORDERS_SEED_DATA: PurchaseOrder[] = [
  {
    id: 'po-001',
    poNumber: 'PO-2025-112',
    title: 'Precision bearings for Q2 build',
    supplierName: 'Atlas Components',
    status: 'Submitted',
    orderDate: new Date('2025-03-01'),
    expectedDeliveryDate: new Date('2025-03-18'),
    totalAmount: 1204500,
    currency: 'USD',
    lineItemCount: 18
  },
  {
    id: 'po-002',
    poNumber: 'PO-2025-108',
    title: 'Aluminum sheet batch',
    supplierName: 'Nordic Metals',
    status: 'Approved',
    orderDate: new Date('2025-02-27'),
    expectedDeliveryDate: new Date('2025-03-10'),
    totalAmount: 540000,
    currency: 'USD',
    lineItemCount: 6
  },
  {
    id: 'po-003',
    poNumber: 'PO-2025-099',
    title: 'Packaging kits - spring release',
    supplierName: 'Summit Packaging',
    status: 'In Transit',
    orderDate: new Date('2025-02-20'),
    expectedDeliveryDate: new Date('2025-03-06'),
    totalAmount: 180250,
    currency: 'USD',
    lineItemCount: 12
  },
  {
    id: 'po-004',
    poNumber: 'PO-2025-093',
    title: 'Logistics handling services',
    supplierName: 'Keystone Logistics',
    status: 'Draft',
    orderDate: new Date('2025-02-14'),
    expectedDeliveryDate: null,
    totalAmount: 92500,
    currency: 'USD',
    lineItemCount: 3
  },
  {
    id: 'po-005',
    poNumber: 'PO-2025-087',
    title: 'Injection-molded components',
    supplierName: 'Vertex Plastics',
    status: 'Completed',
    orderDate: new Date('2025-02-05'),
    expectedDeliveryDate: new Date('2025-02-22'),
    totalAmount: 312000,
    currency: 'USD',
    lineItemCount: 9
  }
];
