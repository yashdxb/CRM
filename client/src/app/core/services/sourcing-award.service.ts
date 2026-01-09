import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AwardLine, AwardShippingSelection, AwardSummary } from '../models/sourcing-award.model';
import { SHIPPING_LANES_SEED } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-lane-seed.data';
import { SHIPPING_RATES_SEED } from '../../packs/supply-chain/system-admin/reference-data/data/shipping-rate-seed.data';

@Injectable({ providedIn: 'root' })
export class SourcingAwardService {
  private awards: AwardSummary[] = [
    {
      id: 'award-2025-001',
      reference: 'AWD-2025-001',
      rfqId: 'RFQ-2025-001',
      title: 'Electronics Components FY25',
      supplierId: 'sup-1',
      supplierName: 'Acme Electronics Ltd',
      currency: 'USD',
      paymentTerms: 'NET30',
      incoterms: 'FOB',
      deliveryLocation: 'Chicago Distribution Center',
      deliveryDate: '2025-03-15',
      notes: 'Preferred quarterly shipment schedule.',
      shipping: {
        laneId: 'LANE-001',
        transportMode: 'Ocean Freight',
        carrierId: 'carrier-3',
        rateId: 'RATE-001',
        shippingCost: 4200
      },
      lines: [
        {
          id: 'award-2025-001-line-1',
          productName: 'High Density PCB',
          description: '8 layer RoHS compliant board',
          quantity: 1000,
          uom: 'EA',
          unitPrice: 42.5,
          targetPrice: 40,
          specifications: 'Lead free, 1.6mm thickness'
        },
        {
          id: 'award-2025-001-line-2',
          productName: 'Power Management IC',
          description: 'PMIC, 12V, 3A output',
          quantity: 500,
          uom: 'EA',
          unitPrice: 12.75,
          specifications: 'Package QFN-32'
        }
      ],
      createdOn: '2025-01-05',
      status: 'Awarded'
    },
    {
      id: 'award-2025-002',
      reference: 'AWD-2025-002',
      rfqId: 'RFQ-2025-004',
      title: 'Packaging Materials Renewal',
      supplierId: 'sup-4',
      supplierName: 'Safety First Supplies',
      currency: 'CAD',
      paymentTerms: '2/10NET30',
      incoterms: 'DAP',
      deliveryLocation: 'Toronto Fulfillment Center',
      deliveryDate: '2025-02-10',
      notes: 'Ensure recyclable material certification is provided.',
      shipping: {
        laneId: 'LANE-003',
        transportMode: 'Air Freight',
        carrierId: 'carrier-1',
        rateId: 'RATE-002',
        shippingCost: 2500
      },
      lines: [
        {
          id: 'award-2025-002-line-1',
          productName: 'Protective Foam Insert',
          description: 'Custom die-cut protective insert',
          quantity: 2000,
          uom: 'EA',
          unitPrice: 2.85,
          targetPrice: 2.7
        },
        {
          id: 'award-2025-002-line-2',
          productName: 'Reinforced Shipping Box',
          description: 'Double wall corrugated shipping boxes',
          quantity: 1500,
          uom: 'EA',
          unitPrice: 1.35
        }
      ],
      createdOn: '2025-01-12',
      status: 'Awarded'
    }
  ];

  getAwards(): Observable<AwardSummary[]> {
    return of(this.awards.map(award => ({ ...award })));
  }

  getAwardById(id: string): Observable<AwardSummary | undefined> {
    const award = this.awards.find(item => item.id === id);
    return of(award ? { ...award } : undefined);
  }

  createAwardFromRfq(formValue: any, supplierOptions: Array<{ label: string; value: string }>): Observable<AwardSummary> {
    const now = Date.now();
    const awardId = `award-${now}`;
    const rfqId = formValue?.basicInfo?.title ? formValue.basicInfo.title.toUpperCase().replace(/\s+/g, '-').slice(0, 12) : `RFQ-${now}`;
    const invitedSupplierIds: string[] = formValue?.suppliers?.invitedSupplierIds ?? [];
    const winningSupplierId = invitedSupplierIds[0] ?? 'sup-1';
    const winningSupplierName = supplierOptions.find(option => option.value === winningSupplierId)?.label ?? 'Selected Supplier';

    const shippingSelection: AwardShippingSelection = {
      laneId: formValue?.terms?.shippingLaneId ?? null,
      transportMode: formValue?.terms?.transportMode ?? null,
      carrierId: formValue?.terms?.preferredCarrierId ?? null,
      rateId: formValue?.terms?.shippingRateId ?? null,
      shippingCost: formValue?.shippingCost ?? null
    };

    const lines: AwardLine[] = (formValue?.lineItems ?? []).map((line: any, index: number) => ({
      id: `${awardId}-line-${index + 1}`,
      productName: line.productName ?? `Line ${index + 1}`,
      description: line.description ?? '',
      quantity: line.quantity ?? 0,
      uom: line.uom ?? 'EA',
      unitPrice: line.targetPrice ?? 0,
      targetPrice: line.targetPrice ?? undefined,
      specifications: line.specifications ?? undefined
    }));

    const award: AwardSummary = {
      id: awardId,
      reference: `AWD-${now}`,
      rfqId,
      title: formValue?.basicInfo?.title ?? 'RFQ Award',
      supplierId: winningSupplierId,
      supplierName: winningSupplierName,
      currency: formValue?.terms?.currency ?? 'USD',
      paymentTerms: formValue?.terms?.paymentTerms ?? null,
      incoterms: formValue?.terms?.incoterms ?? null,
      deliveryLocation: formValue?.terms?.deliveryLocation ?? null,
      deliveryDate: formValue?.basicInfo?.deliveryDate ? new Date(formValue.basicInfo.deliveryDate).toISOString() : null,
      notes: formValue?.notes ?? null,
      shipping: shippingSelection,
      lines: lines.length ? lines : [
        {
          id: `${awardId}-line-1`,
          productName: 'Award Line',
          description: 'Auto generated award line',
          quantity: 1,
          uom: 'EA',
          unitPrice: 0
        }
      ],
      createdOn: new Date(now).toISOString(),
      status: 'Draft'
    };

    this.awards = [award, ...this.awards];
    return of({ ...award });
  }

  getLaneDisplay(laneId: string | null | undefined): string | null {
    if (!laneId) {
      return null;
    }
    const lane = SHIPPING_LANES_SEED.find(item => item.id === laneId);
    return lane ? `${lane.laneCode} · ${lane.originHub} → ${lane.destinationHub}` : null;
  }

  getRateDisplay(rateId: string | null | undefined): string | null {
    if (!rateId) {
      return null;
    }
    const rate = SHIPPING_RATES_SEED.find(item => item.id === rateId);
    if (!rate) {
      return null;
    }
    return `${rate.carrier} · ${rate.chargeBasis} · ${rate.currency} ${rate.baseRate.toFixed(2)}`;
  }
}
