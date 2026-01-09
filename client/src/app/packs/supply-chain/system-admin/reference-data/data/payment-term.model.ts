// src/app/features/reference-data/payment-terms/models/payment-term.model.ts

export interface PaymentTerm {
  id: string;
  code: string;                  // NET30, NET60, 2/10NET30, COD
  name: string;                  // Net 30 Days, Net 60 Days, etc.
  description?: string;
  days: number;                  // Payment due in X days
  discountPercent?: number;      // Discount percentage (e.g., 2%)
  discountDays?: number;         // Days to qualify for discount (e.g., 10)
  isActive: boolean;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentTermFilter {
  searchText?: string;
  isActive?: boolean | null;
}