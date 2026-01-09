export interface ItemPrice {
  id: string;
  itemId: string;
  unitPrice: number;
  costPrice?: number;
  currency: string;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  isActive: boolean;
}
