import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { MarketingDataService } from '../services/marketing-data.service';
import { SaveCampaignRequest } from '../models/marketing.model';

@Component({
  selector: 'app-campaign-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    DatePickerModule,
    SelectModule,
    BreadcrumbsComponent
  ],
  templateUrl: './campaign-form.page.html',
  styleUrl: './campaign-form.page.scss'
})
export class CampaignFormPage {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly data = inject(MarketingDataService);
  private readonly users = inject(UserAdminDataService);
  private readonly toast = inject(AppToastService);
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly referenceData = inject(ReferenceDataService);

  protected readonly editId = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly loading = signal(false);
  protected readonly currencyCode = signal<string>('');
  private currencyFallback = '';
  protected readonly owners = signal<Array<{ id: string; fullName: string; email: string }>>([]);
  protected readonly isEditMode = computed(() => !!this.editId());
  protected readonly typeOptions = [
    { label: 'General', value: 'General' },
    { label: 'Demand Gen', value: 'Demand Gen' },
    { label: 'Event', value: 'Event' },
    { label: 'Partner', value: 'Partner' },
    { label: 'ABM', value: 'ABM' }
  ];
  protected readonly channelOptions = [
    { label: 'Mixed', value: 'Mixed' },
    { label: 'Email', value: 'Email' },
    { label: 'Web', value: 'Web' },
    { label: 'Events', value: 'Events' },
    { label: 'Social', value: 'Social' }
  ];
  protected readonly statusOptions = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Planned', value: 'Planned' },
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' }
  ];
  protected readonly ownerOptions = computed(() =>
    this.owners().map((owner) => ({ label: owner.fullName, value: owner.id }))
  );

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(180)]],
    type: ['General', [Validators.required]],
    channel: ['Mixed', [Validators.required]],
    status: ['Draft', [Validators.required]],
    ownerUserId: ['', [Validators.required]],
    startDateUtc: [''],
    endDateUtc: [''],
    budgetPlanned: [0, [Validators.min(0)]],
    budgetActual: [0, [Validators.min(0)]],
    objective: ['', [Validators.maxLength(2000)]]
  });

  constructor() {
    this.loadCurrencyContext();
    this.editId.set(this.route.snapshot.paramMap.get('id'));
    this.loadOwners();
    if (this.editId()) {
      this.loadCampaign(this.editId()!);
    }
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.toPayload();
    this.saving.set(true);

    const onSuccess = () => {
      this.saving.set(false);
      this.toast.show('success', this.isEditMode() ? 'Campaign updated.' : 'Campaign created.');
      this.router.navigate(['/app/marketing/campaigns']);
    };

    const onError = () => {
      this.saving.set(false);
      this.toast.show('error', 'Unable to save campaign.');
    };

    if (this.isEditMode()) {
      this.data.updateCampaign(this.editId()!, payload).subscribe({ next: onSuccess, error: onError });
      return;
    }

    this.data.createCampaign(payload).subscribe({ next: onSuccess, error: onError });
  }

  protected cancel(): void {
    if (this.editId()) {
      this.router.navigate(['/app/marketing/campaigns', this.editId()]);
      return;
    }

    this.router.navigate(['/app/marketing/campaigns']);
  }

  protected resolveCurrencyCode(): string {
    return this.currencyCode() || this.currencyFallback || 'USD';
  }

  protected formatMoney(value: number | null | undefined): string {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: this.resolveCurrencyCode(),
      maximumFractionDigits: 0
    }).format(Number(value ?? 0));
  }

  private loadOwners(): void {
    this.users.search({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => {
        this.owners.set(res.items);
        if (!this.editId() && res.items.length > 0 && !this.form.controls.ownerUserId.value) {
          this.form.controls.ownerUserId.setValue(res.items[0].id);
        }
      },
      error: () => this.toast.show('error', 'Unable to load owners.')
    });
  }

  private loadCampaign(id: string): void {
    this.loading.set(true);
    this.data.getCampaign(id).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.form.patchValue({
          name: res.campaign.name,
          type: res.campaign.type,
          channel: res.campaign.channel,
          status: res.campaign.status,
          ownerUserId: res.campaign.ownerUserId,
          startDateUtc: this.toDateInput(res.campaign.startDateUtc),
          endDateUtc: this.toDateInput(res.campaign.endDateUtc),
          budgetPlanned: res.campaign.budgetPlanned,
          budgetActual: res.campaign.budgetActual,
          objective: res.campaign.objective ?? ''
        });
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load campaign.');
        this.router.navigate(['/app/marketing/campaigns']);
      }
    });
  }

  private toPayload(): SaveCampaignRequest {
    const value = this.form.getRawValue();
    return {
      name: value.name,
      type: value.type,
      channel: value.channel,
      status: value.status,
      ownerUserId: value.ownerUserId,
      startDateUtc: value.startDateUtc ? new Date(value.startDateUtc).toISOString() : null,
      endDateUtc: value.endDateUtc ? new Date(value.endDateUtc).toISOString() : null,
      budgetPlanned: Number(value.budgetPlanned ?? 0),
      budgetActual: Number(value.budgetActual ?? 0),
      objective: value.objective?.trim() || null
    };
  }

  private toDateInput(value?: string): string {
    if (!value) {
      return '';
    }

    return new Date(value).toISOString().slice(0, 10);
  }

  private loadCurrencyContext(): void {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.currencyCode() && this.currencyFallback) {
        this.currencyCode.set(this.currencyFallback);
      }
    });

    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        const resolved = settings.currency || this.currencyFallback;
        if (resolved) {
          this.currencyCode.set(resolved);
        }
      }
    });
  }
}
