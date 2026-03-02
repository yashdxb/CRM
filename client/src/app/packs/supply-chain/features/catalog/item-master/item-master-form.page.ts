import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { AppToastService } from '../../../../../core/app-toast.service';
import { ItemMasterUpsertRequest } from '../../../catalog/models/item-master.model';
import { ItemMasterDataService } from '../../../catalog/services/item-master-data.service';

@Component({
  selector: 'app-item-master-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    BreadcrumbsComponent
  ],
  templateUrl: './item-master-form.page.html',
  styleUrl: './item-master-form.page.scss'
})
export class ItemMasterFormPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastService = inject(AppToastService);
  private readonly itemMasterService = inject(ItemMasterDataService);

  protected readonly isEditMode = signal(false);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly editingId = signal<string | null>(null);

  protected readonly statusOptions = [
    { label: 'Active', value: true, icon: 'pi-check-circle' },
    { label: 'Inactive', value: false, icon: 'pi-pause-circle' }
  ];

  protected readonly itemTypeOptions = [
    { label: 'Product', value: 'Product', icon: 'pi-box' },
    { label: 'Service', value: 'Service', icon: 'pi-briefcase' }
  ];

  protected getItemTypeColor(itemType: 'Product' | 'Service'): string {
    return itemType === 'Service' ? '#8b5cf6' : '#3b82f6';
  }

  protected getStatusColor(isActive: boolean): string {
    return isActive ? '#22c55e' : '#f59e0b';
  }

  protected readonly form = signal<ItemMasterUpsertRequest>({
    itemType: 'Product',
    sku: '',
    name: '',
    description: null,
    categoryName: null,
    defaultUom: null,
    isActive: true
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isEditMode.set(false);
      return;
    }

    this.isEditMode.set(true);
    this.editingId.set(id);
    this.loading.set(true);
    this.itemMasterService.getById(id).subscribe({
      next: (item) => {
        this.form.set({
          itemType: item.itemType,
          sku: item.sku,
          name: item.name,
          description: item.description ?? null,
          categoryName: item.categoryName ?? null,
          defaultUom: item.defaultUom ?? null,
          isActive: item.isActive
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toastService.show('error', 'Unable to load item.', 2800);
        this.router.navigate(['/app/catalog']);
      }
    });
  }

  protected onFieldChange<K extends keyof ItemMasterUpsertRequest>(key: K, value: ItemMasterUpsertRequest[K]) {
    this.form.update(current => ({ ...current, [key]: value }));
  }

  protected save() {
    const payload = this.form();
    if (!payload.sku.trim() || !payload.name.trim()) {
      this.toastService.show('error', 'SKU and name are required.', 2600);
      return;
    }

    this.saving.set(true);
    const request: ItemMasterUpsertRequest = {
      itemType: payload.itemType,
      sku: payload.sku.trim(),
      name: payload.name.trim(),
      description: payload.description?.trim() || null,
      categoryName: payload.categoryName?.trim() || null,
      defaultUom: payload.defaultUom?.trim() || null,
      isActive: payload.isActive
    };

    const id = this.editingId();
    const request$ = id
      ? this.itemMasterService.update(id, request)
      : this.itemMasterService.create(request);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.toastService.show('success', id ? 'Item updated.' : 'Item created.', 2200);
        this.router.navigate(['/app/catalog']);
      },
      error: (error) => {
        this.saving.set(false);
        const message = error?.error?.message || 'Unable to save item.';
        this.toastService.show('error', message, 3200);
      }
    });
  }

  protected cancel() {
    this.router.navigate(['/app/catalog']);
  }
}
