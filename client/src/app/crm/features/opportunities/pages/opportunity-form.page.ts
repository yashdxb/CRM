import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { map } from 'rxjs';

import { OpportunityDataService, SaveOpportunityRequest } from '../services/opportunity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { Opportunity } from '../models/opportunity.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-opportunity-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  template: `
    <section class="opportunity-form-page">
      <div class="form-header">
        <div class="header-content">
          <app-breadcrumbs></app-breadcrumbs>

          <button type="button" class="back-link" routerLink="/app/opportunities">
            <i class="pi pi-arrow-left"></i>
            Back to Opportunities
          </button>

          <div class="header-row">
            <div class="header-title">
              <h1>
                <span class="title-gradient">{{ isEditMode() ? 'Update' : 'Create' }}</span>
                <span class="title-light">Opportunity</span>
              </h1>
              <p>Capture the deal details, set your stage, and keep the team aligned on next steps.</p>
            </div>
            <div class="header-meta">
              <span class="meta-chip">
                <i class="pi pi-flag"></i>
                {{ selectedStage || 'Prospecting' }}
              </span>
              <span class="meta-chip">
                <i class="pi pi-percentage"></i>
                {{ form.probability ?? 0 }}%
              </span>
              <span class="meta-chip">
                <i class="pi pi-money-bill"></i>
                {{ form.currency || 'USD' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-body">
        <form class="form-layout" (ngSubmit)="onSave()">
          <section class="form-card">
            <h3 class="section-title">
              <i class="pi pi-briefcase"></i>
              Opportunity Details
            </h3>
            <div class="form-grid">
              <div class="field">
                <label for="oppName">Opportunity name <span class="required">*</span></label>
                <input
                  pInputText
                  id="oppName"
                  name="name"
                  [(ngModel)]="form.name"
                  required
                  placeholder="ACME rollout"
                  class="w-full"
                />
              </div>
              <div class="field">
                <label for="oppAccount">Account</label>
                <p-select
                  inputId="oppAccount"
                  appendTo="body"
                  [options]="accountOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="accountId"
                  [(ngModel)]="form.accountId"
                  placeholder="Select account"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label for="oppStage">Stage *</label>
                <p-select
                  inputId="oppStage"
                  appendTo="body"
                  [options]="stageOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="stage"
                  [(ngModel)]="selectedStage"
                  (ngModelChange)="onStageChange($event)"
                  placeholder="Pick stage"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label for="oppClose">Expected close</label>
                <p-datePicker
                  inputId="oppClose"
                  appendTo="body"
                  name="closeDate"
                  [(ngModel)]="form.expectedCloseDate"
                  [showIcon]="true"
                  styleClass="w-full"
                ></p-datePicker>
              </div>
            </div>
          </section>

          <section class="form-card">
            <h3 class="section-title">
              <i class="pi pi-chart-line"></i>
              Deal Settings
            </h3>
            <div class="form-grid">
              <div class="field">
                <label for="oppAmount">Amount</label>
                <p-inputNumber
                  inputId="oppAmount"
                  [(ngModel)]="form.amount"
                  name="amount"
                  mode="currency"
                  [currency]="form.currency"
                  placeholder="0"
                  class="w-full"
                ></p-inputNumber>
              </div>
              <div class="field">
                <label for="oppCurrency">Currency</label>
                <p-select
                  inputId="oppCurrency"
                  appendTo="body"
                  [options]="currencyOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="currency"
                  [(ngModel)]="form.currency"
                  placeholder="Currency"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label for="oppProbability">Probability (%)</label>
                <p-inputNumber
                  inputId="oppProbability"
                  [(ngModel)]="form.probability"
                  name="probability"
                  suffix="%"
                  [min]="0"
                  [max]="100"
                  class="w-full"
                ></p-inputNumber>
              </div>
              <div class="field">
                <label for="oppReason">Win/Loss reason</label>
                <input
                  pInputText
                  id="oppReason"
                  name="reason"
                  [(ngModel)]="form.winLossReason"
                  placeholder="Optional"
                  class="w-full"
                />
              </div>
              <div class="field full">
                <label for="oppSummary">Summary</label>
                <textarea
                  pTextarea
                  id="oppSummary"
                  rows="4"
                  name="summary"
                  [(ngModel)]="form.summary"
                  placeholder="Key notes, stakeholders, risks"
                  class="w-full"
                ></textarea>
              </div>
            </div>
          </section>

          <div class="form-actions">
            <button
              type="button"
              pButton
              label="Cancel"
              class="crm-button--ghost"
              (click)="router.navigate(['/app/opportunities'])"
            ></button>
            <button
              pButton
              type="submit"
              [label]="isEditMode() ? 'Update opportunity' : 'Save opportunity'"
              class="crm-button--primary"
              [disabled]="!form.name || saving()"
            ></button>
          </div>
        </form>
      </div>
    </section>
  `,
  styleUrls: ['./opportunity-form.page.scss']
})
export class OpportunityFormPage implements OnInit {
  protected readonly stageOptions: Option[] = [
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Closed Won', value: 'Closed Won' },
    { label: 'Closed Lost', value: 'Closed Lost' }
  ];

  protected readonly currencyOptions: Option[] = [
    { label: 'USD', value: 'USD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' }
  ];

  protected accountOptions: Option<string | undefined>[] = [];
  protected selectedStage = 'Prospecting';
  protected form: SaveOpportunityRequest = this.createEmptyForm();
  protected saving = signal(false);
  protected readonly isEditMode = signal(false);
  private editingId: string | null = null;
  private pendingOpportunity: Opportunity | null = null;
  private pendingAccountName: string | null = null;

  private readonly opportunityData = inject(OpportunityDataService);
  protected readonly router = inject(Router);
  protected readonly customerData = inject(CustomerDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadAccounts();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.editingId = id;
      this.isEditMode.set(!!id);
      if (id) {
        this.loadOpportunity(id);
      } else {
        this.form = this.createEmptyForm();
        this.selectedStage = this.form.stageName ?? 'Prospecting';
      }
    });
  }

  protected onStageChange(stage: string) {
    this.selectedStage = stage;
    this.form.stageName = stage;
    this.form.probability = this.estimateProbability(stage);
    this.form.isClosed = stage.startsWith('Closed');
    this.form.isWon = stage === 'Closed Won';
  }

  protected onSave() {
    if (!this.form.name) return;
    this.saving.set(true);

    const expectedCloseDate =
      typeof this.form.expectedCloseDate === 'string' && !this.form.expectedCloseDate.trim()
        ? undefined
        : this.form.expectedCloseDate;
    const payload: SaveOpportunityRequest = {
      ...this.form,
      expectedCloseDate,
      stageName: this.selectedStage,
      winLossReason: this.form.winLossReason || null
    };

    const request$ = this.editingId
      ? this.opportunityData.update(this.editingId, payload).pipe(map(() => null))
      : this.opportunityData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/app/opportunities']);
      },
      error: () => this.saving.set(false)
    });
  }

  private loadAccounts() {
    this.customerData.search({ page: 1, pageSize: 50 }).subscribe((res) => {
      this.accountOptions = res.items.map((c) => ({ label: c.name, value: c.id }));
      if (this.pendingAccountName && !this.form.accountId) {
        const match = this.accountOptions.find((opt) => opt.label === this.pendingAccountName);
        this.form.accountId = match?.value;
        this.pendingAccountName = null;
      }

      if (!this.isEditMode() && !this.form.accountId) {
        this.form.accountId = res.items[0]?.id;
      }

      if (this.pendingOpportunity) {
        this.applyOpportunity(this.pendingOpportunity);
        this.pendingOpportunity = null;
      }
      this.cdr.detectChanges();
    });
  }

  private loadOpportunity(id: string) {
    this.opportunityData.getById(id).subscribe({
      next: (opp) => {
        this.applyOpportunity(opp);
        if (!this.accountOptions.length) {
          this.pendingOpportunity = opp;
        }
      },
      error: () => {
        this.router.navigate(['/app/opportunities']);
      }
    });
  }

  private applyOpportunity(opp: Opportunity) {
    const accountId = this.accountOptions.find((opt) => opt.label === opp.account)?.value;
    if (!accountId && opp.account) {
      this.pendingAccountName = opp.account;
    }
    const stage = opp.stage || 'Prospecting';
    this.selectedStage = stage;
    Object.assign(this.form, {
      name: opp.name,
      accountId: accountId ?? this.form.accountId,
      stageName: stage,
      amount: opp.amount ?? 0,
      currency: opp.currency ?? 'USD',
      probability: opp.probability ?? this.estimateProbability(stage),
      expectedCloseDate: opp.closeDate,
      summary: this.form.summary ?? '',
      isClosed: opp.status !== 'Open',
      isWon: opp.status === 'Closed Won',
      winLossReason: opp.winLossReason ?? ''
    });
    this.cdr.detectChanges();
  }

  private createEmptyForm(): SaveOpportunityRequest {
    return {
      name: '',
      accountId: undefined,
      stageName: 'Prospecting',
      amount: 0,
      currency: 'USD',
      probability: this.estimateProbability('Prospecting'),
      expectedCloseDate: undefined,
      summary: '',
      isClosed: false,
      isWon: false,
      winLossReason: ''
    };
  }

  private estimateProbability(stage: string) {
    const map: Record<string, number> = {
      Prospecting: 20,
      Qualification: 35,
      Proposal: 55,
      Negotiation: 75,
      'Closed Won': 100,
      'Closed Lost': 0
    };
    return map[stage] ?? 0;
  }
}
