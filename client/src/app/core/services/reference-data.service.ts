import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PAYMENT_TERMS_SEED_DATA } from '../../packs/supply-chain/system-admin/reference-data/data/payment-terms-seed.data';
import { INCOTERMS_SEED_DATA } from '../../packs/supply-chain/system-admin/reference-data/data/incoterms-seed.data';
import { UOM_MOCK_DATA } from '../../packs/supply-chain/system-admin/reference-data/data/uom-mock.data';
import { SHIPPING_LANES_SEED } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-lane-seed.data';
import { SHIPPING_RATES_SEED } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-rate-seed.data';
import { SHIPPING_MODES_SEED } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-mode-seed.data';
import { PaymentTerm } from '../../packs/supply-chain/system-admin/reference-data/data/payment-term.model';
import { Incoterm } from '../../packs/supply-chain/system-admin/reference-data/data/incoterm.model';
import { ShippingLane } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-lane.model';
import { ShippingRate } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-rate.model';

export interface CurrencyReference {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
}

export interface UnitOfMeasureReference {
  id: string;
  code: string;
  name: string;
  symbol: string;
  isBaseUnit: boolean;
  conversionFactor: number;
  description?: string;
  displayOrder?: number;
  isActive: boolean;
}

export interface CarrierReference {
  id: string;
  name: string;
  modes: string[];
  coverage: string[];
  primaryRegion: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  avgTransitDays?: number;
  onTimeRate?: number;
  isActive: boolean;
}

export interface TransportationModeReference {
  id: string;
  name: string;
  description?: string;
  typicalUse?: string;
  serviceLevels: Array<{
    id: string;
    name: string;
    targetTransitDays?: number;
  }>;
}

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private readonly currencies: CurrencyReference[] = [
    { id: 'cur-USD', code: 'USD', name: 'US Dollar', symbol: '$', isActive: true },
    { id: 'cur-EUR', code: 'EUR', name: 'Euro', symbol: '€', isActive: true },
    { id: 'cur-GBP', code: 'GBP', name: 'British Pound', symbol: '£', isActive: true },
    { id: 'cur-CAD', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', isActive: true },
    { id: 'cur-JPY', code: 'JPY', name: 'Japanese Yen', symbol: '¥', isActive: true },
    { id: 'cur-AUD', code: 'AUD', name: 'Australian Dollar', symbol: 'A$', isActive: true },
    { id: 'cur-CHF', code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', isActive: true }
  ];

  private readonly carriers: CarrierReference[] = [
    {
      id: 'carrier-1',
      name: 'Global Freight Group',
      modes: ['Air', 'Ocean'],
      coverage: ['North America', 'Europe', 'Asia-Pacific'],
      primaryRegion: 'North America',
      contactName: 'Emily Carter',
      contactEmail: 'emily.carter@gfg.com',
      phone: '+1 555 201 7744',
      avgTransitDays: 7,
      onTimeRate: 95,
      isActive: true
    },
    {
      id: 'carrier-2',
      name: 'Sunrise Logistics',
      modes: ['Road'],
      coverage: ['North America'],
      primaryRegion: 'North America',
      contactName: 'Mark Chen',
      contactEmail: 'mark.chen@sunriselogistics.com',
      phone: '+1 555 889 1122',
      avgTransitDays: 4,
      onTimeRate: 88,
      isActive: true
    },
    {
      id: 'carrier-3',
      name: 'BlueOcean Shipping',
      modes: ['Ocean'],
      coverage: ['Asia-Pacific', 'Europe'],
      primaryRegion: 'Asia-Pacific',
      contactName: 'Hiro Tanaka',
      contactEmail: 'hiro.tanaka@blueocean.jp',
      phone: '+81 3-1234-5678',
      avgTransitDays: 18,
      onTimeRate: 91,
      isActive: true
    },
    {
      id: 'carrier-4',
      name: 'RailConnect',
      modes: ['Rail', 'Intermodal'],
      coverage: ['Europe', 'Asia-Pacific'],
      primaryRegion: 'Europe',
      contactName: 'Sven Jorgensen',
      contactEmail: 'sven.jorgensen@railconnect.eu',
      phone: '+45 55 441 2233',
      avgTransitDays: 9,
      onTimeRate: 82,
      isActive: true
    },
    {
      id: 'carrier-5',
      name: 'Express Air Cargo',
      modes: ['Air'],
      coverage: ['North America', 'Europe'],
      primaryRegion: 'North America',
      contactName: 'Lena Rodriguez',
      contactEmail: 'lena.rodriguez@expressair.com',
      phone: '+1 555 332 9988',
      avgTransitDays: 2,
      onTimeRate: 96,
      isActive: true
    },
    {
      id: 'carrier-6',
      name: 'Continental Roadways',
      modes: ['Road'],
      coverage: ['Europe'],
      primaryRegion: 'Europe',
      contactName: 'Oliver Schmidt',
      contactEmail: 'oliver.schmidt@continentalroadways.eu',
      phone: '+49 30 1234 567',
      avgTransitDays: 5,
      onTimeRate: 89,
      isActive: true
    }
  ];

  getCurrencies(): Observable<CurrencyReference[]> {
    return of(this.currencies.slice());
  }

  getPaymentTerms(): Observable<PaymentTerm[]> {
    const terms: PaymentTerm[] = PAYMENT_TERMS_SEED_DATA.map((term, index) => ({
      id: `payment-term-${index + 1}`,
      code: term.code,
      name: term.name,
      description: term.description,
      days: term.days,
      discountPercent: term.discountPercent,
      discountDays: term.discountDays,
      isActive: term.isActive,
      displayOrder: term.displayOrder
    }));

    return of(terms);
  }

  getIncoterms(): Observable<Incoterm[]> {
    const incoterms: Incoterm[] = INCOTERMS_SEED_DATA.map((item, index) => ({
      id: `incoterm-${index + 1}`,
      code: item.code,
      name: item.name,
      description: item.description,
      category: item.category,
      sellerResponsibility: item.sellerResponsibility,
      buyerResponsibility: item.buyerResponsibility,
      riskTransferPoint: item.riskTransferPoint,
      displayOrder: item.displayOrder ?? index + 1,
      isActive: item.isActive
    }));

    return of(incoterms);
  }

  getUnitsOfMeasure(): Observable<UnitOfMeasureReference[]> {
    const units: UnitOfMeasureReference[] = UOM_MOCK_DATA.filter(item => item.isActive).map(item => ({
      id: item.id,
      code: item.code,
      name: item.name,
      symbol: item.symbol,
      isBaseUnit: item.isBaseUnit,
      conversionFactor: item.conversionFactor,
      description: item.description,
      displayOrder: item.displayOrder,
      isActive: item.isActive
    }));

    return of(units);
  }

  getCarriers(): Observable<CarrierReference[]> {
    return of(this.carriers.slice());
  }

  getTransportationModes(): Observable<TransportationModeReference[]> {
    return of(
      SHIPPING_MODES_SEED.map(mode => ({
        id: mode.id,
        name: mode.name,
        description: mode.description,
        typicalUse: mode.typicalUse,
        serviceLevels: mode.serviceLevels.map(level => ({
          id: level.id,
          name: level.name,
          targetTransitDays: level.targetTransitDays
        }))
      }))
    );
  }

  getShippingLanes(): Observable<ShippingLane[]> {
    return of(SHIPPING_LANES_SEED.slice());
  }

  getShippingRates(): Observable<ShippingRate[]> {
    return of(SHIPPING_RATES_SEED.slice());
  }
}
