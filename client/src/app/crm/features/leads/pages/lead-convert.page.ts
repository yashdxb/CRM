import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import { Lead, LeadConversionRequest } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

@Component({
  selector: 'app-lead-convert-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    InputTextModule,
    BreadcrumbsComponent,
],
  templateUrl: './lead-convert.page.html',
  styleUrl: './lead-convert.page.scss'
})
export class LeadConvertPage implements OnInit {
  protected readonly lead = signal<Lead | null>(null);
  protected readonly saving = signal(false);
  protected readonly form = signal<LeadConversionRequest>({
    createAccount: true,
    accountName: '',
    createContact: true,
    createOpportunity: true,
    opportunityName: '',
    amount: 0,
    expectedCloseDate: ''
  });
  protected readonly canConvert = computed(() => {
    const value = this.form();
    if (value.createOpportunity && !value.createAccount) {
      return false;
    }
    return true;
  });

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly leadData = inject(LeadDataService);

  private leadId: string | null = null;

  ngOnInit() {
    this.leadId = this.route.snapshot.paramMap.get('id');
    const lead = history.state?.lead as Lead | undefined;
    if (lead) {
      this.setLead(lead);
      return;
    }

    if (this.leadId) {
      this.leadData.get(this.leadId).subscribe({
        next: (data) => this.setLead(data),
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  protected onConvert() {
    if (!this.leadId) return;
    if (!this.canConvert()) return;
    const value = this.form();
    const closeDate = value.expectedCloseDate as unknown;
    const expectedCloseDate = closeDate instanceof Date
      ? closeDate.toISOString()
      : (typeof closeDate === 'string' && closeDate.trim() ? closeDate : undefined);
    const payload: LeadConversionRequest = {
      ...value,
      expectedCloseDate
    };
    this.saving.set(true);
    this.leadData.convert(this.leadId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/app/leads'], { state: { toast: { tone: 'success', message: 'Lead converted.' } } });
      },
      error: () => this.saving.set(false)
    });
  }

  protected onCancel() {
    this.router.navigate(['/app/leads']);
  }

  private setLead(lead: Lead) {
    this.lead.set(lead);
    const accountName = lead.company || lead.name;
    const opportunityName = `${accountName} Opportunity`;
    this.form.set({
      createAccount: true,
      accountName,
      createContact: true,
      createOpportunity: true,
      opportunityName,
      amount: 0,
      expectedCloseDate: ''
    });
  }
}
