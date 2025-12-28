import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';

import { OpportunityDataService, SaveOpportunityRequest } from '../services/opportunity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';

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
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    SelectModule,
    DatePickerModule
  ],
  template: `
    <div class="opportunity-form-page">
      <div class="page-background">
        <div class="animated-orb orb-1"></div>
        <div class="animated-orb orb-2"></div>
        <div class="animated-orb orb-3"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="page-container">
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="badge-dot"></span> New Opportunity
            </div>
            <h1 class="hero-title">
              <span class="title-gradient">Create Opportunity</span>
            </h1>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="stat-label">Stage</span>
                <span class="stat-value">{{ selectedStage || 'Prospecting' }}</span>
              </div>
              <div class="hero-stat">
                <span class="stat-label">Target Close</span>
                <span class="stat-value">{{ form.expectedCloseDate || 'TBD' }}</span>
              </div>
              <div class="hero-stat">
                <span class="stat-label">Currency</span>
                <span class="stat-value">{{ form.currency }}</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="visual-card">
              <span class="card-icon"><i class="pi pi-briefcase"></i></span>
              <div>
                <div class="visual-label">Deal Value</div>
                <div class="visual-value">{{ form.amount | number:'1.0-0' }} {{ form.currency }}</div>
              </div>
            </div>
            <div class="visual-card">
              <span class="card-icon"><i class="pi pi-users"></i></span>
              <div>
                <span class="stat-label">Currency</span>
                <span class="stat-value">{{ form.currency }}</span>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="visual-card">
              <span class="card-icon"><i class="pi pi-briefcase"></i></span>
              <div>
                <div class="visual-label">Deal Value</div>
                <div class="visual-value">{{ form.amount | number:'1.0-0' }} {{ form.currency }}</div>
              </div>
            </div>
            <div class="visual-card">
              <span class="card-icon"><i class="pi pi-users"></i></span>
              <div>
                <div class="visual-label">Account</div>
                <div class="visual-value">{{ accountLabel }}</div>
              </div>
            </div>
          </div>
        </section>
        <form class="glass-card opportunity-form" (ngSubmit)="onSave()">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Opportunity name *</label>
              <input pInputText name="name" [(ngModel)]="form.name" required placeholder="ACME rollout" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Account</label>
              <p-select
                [options]="accountOptions"
                optionLabel="label"
                optionValue="value"
                name="accountId"
                [(ngModel)]="form.accountId"
                placeholder="Select account"
                styleClass="w-full"
              ></p-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Stage *</label>
              <p-select
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
            <div class="form-group">
              <label class="form-label">Expected close</label>
              <p-datePicker
                name="closeDate"
                [(ngModel)]="form.expectedCloseDate"
                inputId="closeDate"
                [showIcon]="true"
                styleClass="w-full"
              ></p-datePicker>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Amount</label>
              <p-inputNumber
                [(ngModel)]="form.amount"
                name="amount"
                mode="currency"
                [currency]="form.currency"
                placeholder="0"
                class="w-full"
              ></p-inputNumber>
            </div>
            <div class="form-group">
              <label class="form-label">Currency</label>
              <p-select
                [options]="currencyOptions"
                optionLabel="label"
                optionValue="value"
                name="currency"
                [(ngModel)]="form.currency"
                placeholder="Currency"
                styleClass="w-full"
              ></p-select>
            </div>
            <div class="form-group">
              <label class="form-label">Probability (%)</label>
              <p-inputNumber
                [(ngModel)]="form.probability"
                name="probability"
                suffix="%"
                [min]="0"
                [max]="100"
                class="w-full"
              ></p-inputNumber>
            </div>
            <div class="form-group">
              <label class="form-label">Win/Loss reason</label>
              <input pInputText name="reason" [(ngModel)]="form.winLossReason" placeholder="Optional" class="form-input" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group full-row">
              <label class="form-label">Summary</label>
              <textarea pTextarea rows="4" name="summary" [(ngModel)]="form.summary" placeholder="Key notes, stakeholders, risks" class="form-input textarea"></textarea>
            </div>
          </div>
          <div class="dialog-actions">
            <button
              type="button"
              pButton
              label="Cancel"
              class="btn-icon"
              (click)="router.navigate(['/app/opportunities'])"
            ></button>
            <button
              pButton
              type="submit"
              label="Save opportunity"
              class="btn-primary"
              [disabled]="!form.name || saving()"
            ></button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./opportunity-form.page.scss']
})
export class OpportunityFormPage implements OnInit {

  get accountLabel(): string {
    const found = this.accountOptions.find(opt => opt.value === this.form.accountId);
    return found?.label || '';
  }
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
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' }
  ];

  protected accountOptions: Option<string | undefined>[] = [];
  protected selectedStage = 'Prospecting';
  protected form: SaveOpportunityRequest = this.createEmptyForm();
  protected saving = signal(false);

  private readonly opportunityData = inject(OpportunityDataService);
  protected readonly router = inject(Router);
  protected readonly customerData = inject(CustomerDataService);

  ngOnInit() {
    this.loadAccounts();
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

    this.opportunityData.create(payload).subscribe({
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
      this.form.accountId = res.items[0]?.id;
    });
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
