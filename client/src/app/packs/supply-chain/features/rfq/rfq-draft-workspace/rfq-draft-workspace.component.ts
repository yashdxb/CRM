import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { DatePickerModule } from 'primeng/datepicker';
import { MessageService } from 'primeng/api';

import { ProductService } from '../../../catalog/services/product.service';
import { Product } from '../../../catalog/models/product.model';

interface DraftLineItem {
  product: Product;
  desiredQuantity: number;
  targetPrice?: number;
  needByDate?: Date | null;
  notes?: string;
}

interface SupplierDraftGroup {
  supplierId: string;
  supplierName: string;
  items: DraftLineItem[];
}

interface ValidationItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'complete' | 'attention';
}

interface MetricDisplay {
  label: string;
  value: string | number;
  icon: string;
  tone: 'info' | 'primary' | 'warn' | 'success';
}

interface DraftActionItem {
  title: string;
  owner: string;
  dueDate: Date;
  status: 'Planned' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-rfq-draft-workspace',
  standalone: true,
  templateUrl: './rfq-draft-workspace.component.html',
  styleUrls: ['./rfq-draft-workspace.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    InputNumberModule,
    ButtonModule,
    TagModule,
    DividerModule,
    TextareaModule,
    ToastModule,
    TooltipModule,
    DatePickerModule
  ],
  providers: [MessageService]
})
export class RfqDraftWorkspaceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  loading = true;
  productIds: string[] = [];
  supplierIdPrefill: string | null = null;

  draftItems: DraftLineItem[] = [];
  supplierGroups: SupplierDraftGroup[] = [];
  validationItems: ValidationItem[] = [];
  actionItems: DraftActionItem[] = [];

  get totalTargetSpend(): number {
    return this.draftItems.reduce((acc, item) => {
      const target = item.targetPrice ?? 0;
      const quantity = item.desiredQuantity ?? 0;
      return acc + target * quantity;
    }, 0);
  }

  get metrics(): MetricDisplay[] {
    const suppliers = this.supplierGroups.length;
    const lineItems = this.draftItems.length;
    const totalQuantity = this.draftItems.reduce((acc, item) => acc + (item.desiredQuantity ?? 0), 0);
    const estimatedSpend = this.draftItems.reduce((acc, item) => {
      if (!item.targetPrice) {
        return acc;
      }
      return acc + item.targetPrice * (item.desiredQuantity ?? 0);
    }, 0);

    return [
      {
        label: 'Suppliers Selected',
        value: suppliers,
        icon: 'pi pi-users',
        tone: 'info'
      },
      {
        label: 'Line Items',
        value: lineItems,
        icon: 'pi pi-list-check',
        tone: 'primary'
      },
      {
        label: 'Total Quantity',
        value: totalQuantity,
        icon: 'pi pi-box',
        tone: 'warn'
      },
      {
        label: 'Estimated Spend',
        value: this.formatCurrency(estimatedSpend),
        icon: 'pi pi-dollar',
        tone: 'success'
      }
    ];
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      const productIdsParam = params.get('productIds');
      this.supplierIdPrefill = params.get('supplierId');

      if (!productIdsParam) {
        this.loading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'No products selected',
          detail: 'Select items in the catalog to start an RFQ draft.'
        });
        return;
      }

      this.productIds = productIdsParam.split(',').filter(Boolean);
      this.loadDraftItems();
    });
  }

  get hasDraft(): boolean {
    return this.draftItems.length > 0;
  }

  get earliestNeedBy(): Date | null {
    const dates = this.draftItems
      .map(item => item.needByDate)
      .filter((value): value is Date => value instanceof Date);
    if (!dates.length) {
      return null;
    }
    return dates.reduce((earliest, current) =>
      current.getTime() < earliest.getTime() ? current : earliest
    );
  }

  continueToSetup(): void {
    if (!this.hasDraft) {
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Draft Ready',
      detail: 'Carrying draft selections into RFQ setup.'
    });

    this.router.navigate(['/app/supply-chain/rfqs/new'], {
      queryParams: {
        ...(this.supplierIdPrefill ? { supplierId: this.supplierIdPrefill } : {}),
        productIds: this.productIds.join(',')
      }
    });
  }

  returnToCatalog(): void {
    this.router.navigate(['/app/supply-chain/rfqs']);
  }

  removeItem(item: DraftLineItem): void {
    this.draftItems = this.draftItems.filter(existing => existing !== item);
    this.productIds = this.productIds.filter(id => id !== item.product.id);
    this.rebuildGroups();
    this.updateValidations();

    this.messageService.add({
      severity: 'info',
      summary: 'Removed from draft',
      detail: `${item.product.name} removed.`
    });
  }

  onQuantityChange(): void {
    this.updateValidations();
  }

  onNeedByDateChange(): void {
    this.updateValidations();
  }

  private loadDraftItems(): void {
    this.loading = true;
    this.productService.getProducts().pipe(take(1)).subscribe({
      next: products => {
        const matched = products.filter(product => this.productIds.includes(product.id));
        this.draftItems = matched.map(product => ({
          product,
          desiredQuantity: Math.max(50, product.predictedDemand30Days ?? 20),
          targetPrice: this.estimateTargetPrice(product),
          needByDate: this.defaultNeedByDate(),
          notes: ''
        }));
        this.rebuildGroups();
        this.initValidations();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to load products',
          detail: 'Please try starting the draft again from the catalog.'
        });
      }
    });
  }

  private rebuildGroups(): void {
    const groupMap = new Map<string, SupplierDraftGroup>();
    this.draftItems.forEach(item => {
      const supplierId = item.product.supplierId ?? 'unassigned';
      const supplierName = item.product.supplierName ?? 'Supplier';
      if (!groupMap.has(supplierId)) {
        groupMap.set(supplierId, {
          supplierId,
          supplierName,
          items: []
        });
      }
      groupMap.get(supplierId)?.items.push(item);
    });
    this.supplierGroups = Array.from(groupMap.values());
  }

  private initValidations(): void {
    this.validationItems = [
      {
        id: 'suppliers',
        title: 'Invited suppliers identified',
        description: 'Each selected product is linked to a supplier for the RFQ.',
        status: 'pending'
      },
      {
        id: 'quantities',
        title: 'Quantities confirmed',
        description: 'Desired quantities set for every line item.',
        status: 'pending'
      },
      {
        id: 'timeline',
        title: 'Need-by timeline captured',
        description: 'Target delivery dates noted for sourcing coordination.',
        status: 'pending'
      }
    ];
    this.updateValidations();

    this.actionItems = [
      {
        title: 'Confirm RFQ timeline in sourcing plan',
        owner: 'Category Lead',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'In Progress'
      },
      {
        title: 'Attach product specifications',
        owner: 'Engineering',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'Planned'
      },
      {
        title: 'Finalize supplier shortlist review',
        owner: 'Procurement Analyst',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'Planned'
      }
    ];
  }

  private updateValidations(): void {
    const hasSuppliers = this.supplierGroups.length > 0;
    const allQuantitiesValid = this.draftItems.every(item => item.desiredQuantity > 0);
    const hasDates = this.draftItems.every(item => item.needByDate != null);

    this.validationItems = this.validationItems.map(item => {
      switch (item.id) {
        case 'suppliers':
          return { ...item, status: hasSuppliers ? 'complete' : 'attention' };
        case 'quantities':
          return { ...item, status: allQuantitiesValid ? 'complete' : 'attention' };
        case 'timeline':
          return { ...item, status: hasDates ? 'complete' : 'pending' };
        default:
          return item;
      }
    });
  }

  private estimateTargetPrice(product: Product): number {
    const base = product.predictedDemand30Days ?? 0;
    const factor = product.seasonalityIndex ?? 1;
    const normalized = Math.max(15, Math.round((base / 100) * factor * 10));
    return normalized;
  }

  defaultNeedByDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 21);
    return date;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }
}
