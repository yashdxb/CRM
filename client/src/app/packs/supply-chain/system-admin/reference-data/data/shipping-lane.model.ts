export interface ShippingLane {
  id: string;
  laneCode: string;
  originHub: string;
  originCountry: string;
  destinationHub: string;
  destinationCountry: string;
  distanceKm?: number;
  defaultMode: string;
  preferredCarriers: string[];
  leadTimeDays?: number;
  status: 'Active' | 'Planned' | 'Suspended';
  notes?: string;
}
