import { ShippingRate } from './shipping-rate.model';

export const SHIPPING_RATES_SEED: ShippingRate[] = [
  {
    id: 'RATE-001',
    laneId: 'LANE-001',
    laneCode: 'NA-USA-EU-DE',
    mode: 'Ocean Freight',
    carrier: 'BlueOcean Shipping',
    serviceLevel: 'FCL Premium',
    chargeBasis: 'Per Container',
    currency: 'USD',
    baseRate: 4200,
    fuelSurchargePct: 12,
    minCharge: 4000,
    effectiveDate: '2025-01-01',
    expiryDate: '2025-12-31',
    status: 'Active',
    notes: 'Includes port handling. 1 free detention day.'
  },
  {
    id: 'RATE-002',
    laneId: 'LANE-003',
    laneCode: 'EU-DE-NA-USA-AIR',
    mode: 'Air Freight',
    carrier: 'Global Freight Group',
    serviceLevel: 'Express',
    chargeBasis: 'Per KG',
    currency: 'USD',
    baseRate: 6.75,
    fuelSurchargePct: 18,
    minCharge: 450,
    effectiveDate: '2025-02-01',
    status: 'Active',
    notes: 'Priority handling and customs pre-clearance included.'
  },
  {
    id: 'RATE-003',
    laneId: 'LANE-002',
    laneCode: 'AP-JPN-USA',
    mode: 'Ocean Freight',
    carrier: 'BlueOcean Shipping',
    serviceLevel: 'LCL Consolidated',
    chargeBasis: 'Per CBM',
    currency: 'USD',
    baseRate: 85,
    fuelSurchargePct: 10,
    effectiveDate: '2025-03-01',
    status: 'Draft',
    notes: 'Pending approval for new product launch volumes.'
  }
];
