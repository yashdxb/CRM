import { ShippingMode } from './shipping-mode.model';

export const SHIPPING_MODES_SEED: ShippingMode[] = [
  {
    id: 'MODE-001',
    name: 'Air Freight',
    description: 'Fast delivery for urgent shipments and high-value goods.',
    typicalUse: 'Electronics, perishables, critical spares',
    notes: 'Requires TSA-compliant carriers and airport handling capabilities.',
    serviceLevels: [
      {
        id: 'MODE-001-SL-EXP',
        modeId: 'MODE-001',
        name: 'Express',
        description: 'Next-flight-out service with premium handling.',
        targetTransitDays: 2,
        costMultiplier: 1.8,
        status: 'Active'
      },
      {
        id: 'MODE-001-SL-STD',
        modeId: 'MODE-001',
        name: 'Standard',
        description: 'Consolidated service for non-urgent air shipments.',
        targetTransitDays: 5,
        costMultiplier: 1.2,
        status: 'Active'
      },
      {
        id: 'MODE-001-SL-ECO',
        modeId: 'MODE-001',
        name: 'Economy',
        description: 'Deferred shipping with minimal surcharges.',
        targetTransitDays: 8,
        costMultiplier: 1.0,
        status: 'In Development'
      }
    ]
  },
  {
    id: 'MODE-002',
    name: 'Ocean Freight',
    description: 'Most cost-effective solution for large volumes and long-distance trade lanes.',
    typicalUse: 'Bulk raw materials, finished goods on replenishment cycles',
    notes: 'Best suited for non time-sensitive shipments.',
    serviceLevels: [
      {
        id: 'MODE-002-SL-FCL',
        modeId: 'MODE-002',
        name: 'FCL Premium',
        description: 'Dedicated full-container load with priority berthing.',
        targetTransitDays: 24,
        costMultiplier: 1.3,
        status: 'Active'
      },
      {
        id: 'MODE-002-SL-LCL',
        modeId: 'MODE-002',
        name: 'LCL Consolidated',
        description: 'Shared-container service for smaller shipments.',
        targetTransitDays: 32,
        costMultiplier: 1.0,
        status: 'Active'
      }
    ]
  },
  {
    id: 'MODE-003',
    name: 'Road Transport',
    description: 'Flexible door-to-door service for regional shipments.',
    typicalUse: 'Domestic deliveries, last-mile distribution',
    notes: 'Allows quick adjustments to pickup and delivery windows.',
    serviceLevels: [
      {
        id: 'MODE-003-SL-PREM',
        modeId: 'MODE-003',
        name: 'Priority Linehaul',
        description: 'Dedicated truckload with guaranteed delivery window.',
        targetTransitDays: 3,
        costMultiplier: 1.4,
        status: 'Active'
      },
      {
        id: 'MODE-003-SL-STD',
        modeId: 'MODE-003',
        name: 'Standard TL/LTL',
        description: 'Typical truckload or less-than-truckload service.',
        targetTransitDays: 5,
        costMultiplier: 1.0,
        status: 'Active'
      }
    ]
  }
];
