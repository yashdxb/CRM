export type RateStatus = 'Active' | 'Draft' | 'Expired';
export type RateUom = 'Per Shipment' | 'Per Container' | 'Per KG' | 'Per CBM';

export interface ShippingRate {
  id: string;
  laneId: string;
  laneCode: string;
  mode: string;
  carrier: string;
  serviceLevel?: string;
  chargeBasis: RateUom;
  currency: string;
  baseRate: number;
  fuelSurchargePct?: number;
  accessorialNotes?: string;
  minCharge?: number;
  maxCharge?: number;
  effectiveDate: string;
  expiryDate?: string;
  status: RateStatus;
  notes?: string;
}
