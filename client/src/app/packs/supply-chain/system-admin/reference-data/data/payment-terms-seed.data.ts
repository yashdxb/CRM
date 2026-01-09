// src/app/features/reference-data/payment-terms/data/payment-terms-seed.data.ts

import { PaymentTerm } from '../data/payment-term.model';

export const PAYMENT_TERMS_SEED_DATA: Omit<PaymentTerm, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    code: 'NET30',
    name: 'Net 30 Days',
    description: 'Payment due within 30 days of invoice date',
    days: 30,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 1
  },
  {
    code: 'NET60',
    name: 'Net 60 Days',
    description: 'Payment due within 60 days of invoice date',
    days: 60,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 2
  },
  {
    code: 'NET90',
    name: 'Net 90 Days',
    description: 'Payment due within 90 days of invoice date',
    days: 90,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 3
  },
  {
    code: '2/10NET30',
    name: '2/10 Net 30',
    description: '2% discount if paid within 10 days, otherwise net 30 days',
    days: 30,
    discountPercent: 2,
    discountDays: 10,
    isActive: true,
    displayOrder: 4
  },
  {
    code: '1/10NET30',
    name: '1/10 Net 30',
    description: '1% discount if paid within 10 days, otherwise net 30 days',
    days: 30,
    discountPercent: 1,
    discountDays: 10,
    isActive: true,
    displayOrder: 5
  },
  {
    code: '2/15NET45',
    name: '2/15 Net 45',
    description: '2% discount if paid within 15 days, otherwise net 45 days',
    days: 45,
    discountPercent: 2,
    discountDays: 15,
    isActive: true,
    displayOrder: 6
  },
  {
    code: 'COD',
    name: 'Cash on Delivery',
    description: 'Payment required upon delivery',
    days: 0,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 7
  },
  {
    code: 'PREPAID',
    name: 'Prepaid',
    description: 'Payment required before shipment',
    days: 0,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 8
  },
  {
    code: 'NET15',
    name: 'Net 15 Days',
    description: 'Payment due within 15 days of invoice date',
    days: 15,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 9
  },
  {
    code: 'NET45',
    name: 'Net 45 Days',
    description: 'Payment due within 45 days of invoice date',
    days: 45,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 10
  },
  {
    code: 'NET120',
    name: 'Net 120 Days',
    description: 'Payment due within 120 days of invoice date',
    days: 120,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 11
  },
  {
    code: 'EOM',
    name: 'End of Month',
    description: 'Payment due at the end of the month',
    days: 30,
    discountPercent: undefined,
    discountDays: undefined,
    isActive: true,
    displayOrder: 12
  }
];