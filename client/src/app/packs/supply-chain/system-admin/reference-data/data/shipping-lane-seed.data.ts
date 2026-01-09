import { ShippingLane } from './shipping-lane.model';

export const SHIPPING_LANES_SEED: ShippingLane[] = [
  {
    id: 'LANE-001',
    laneCode: 'NA-USA-EU-DE',
    originHub: 'Chicago DC',
    originCountry: 'United States',
    destinationHub: 'Hamburg Port',
    destinationCountry: 'Germany',
    distanceKm: 6800,
    defaultMode: 'Ocean Freight',
    preferredCarriers: ['BlueOcean Shipping'],
    leadTimeDays: 25,
    status: 'Active',
    notes: 'Trans-Atlantic replenishment lane for finished goods.'
  },
  {
    id: 'LANE-002',
    laneCode: 'AP-JPN-USA',
    originHub: 'Nagoya Plant',
    originCountry: 'Japan',
    destinationHub: 'Los Angeles Port',
    destinationCountry: 'United States',
    distanceKm: 8700,
    defaultMode: 'Ocean Freight',
    preferredCarriers: ['BlueOcean Shipping'],
    leadTimeDays: 30,
    status: 'Active',
    notes: 'High-volume commodity lane. Requires weekly bookings.'
  },
  {
    id: 'LANE-003',
    laneCode: 'EU-DE-NA-USA-AIR',
    originHub: 'Frankfurt Air Cargo',
    originCountry: 'Germany',
    destinationHub: 'Atlanta Air Hub',
    destinationCountry: 'United States',
    distanceKm: 7400,
    defaultMode: 'Air Freight',
    preferredCarriers: ['Global Freight Group'],
    leadTimeDays: 3,
    status: 'Active',
    notes: 'Critical spare parts lane with SLA 72 hours door-to-door.'
  },
  {
    id: 'LANE-004',
    laneCode: 'AP-SG-EU-NL',
    originHub: 'Singapore Port',
    originCountry: 'Singapore',
    destinationHub: 'Rotterdam Port',
    destinationCountry: 'Netherlands',
    distanceKm: 9800,
    defaultMode: 'Ocean Freight',
    preferredCarriers: ['BlueOcean Shipping'],
    leadTimeDays: 28,
    status: 'Planned',
    notes: 'Upcoming lane for new product launch in EMEA.'
  }
];
