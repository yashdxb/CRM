export interface ShippingMode {
  id: string;
  name: string;
  description?: string;
  typicalUse?: string;
  serviceLevels: ShippingServiceLevel[];
  notes?: string;
}

export interface ShippingServiceLevel {
  id: string;
  modeId: string;
  name: string;
  description?: string;
  targetTransitDays?: number;
  costMultiplier?: number;
  status: 'Active' | 'In Development' | 'Deprecated';
}
