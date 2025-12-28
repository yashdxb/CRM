import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';

import { map } from 'rxjs';

import { Lead, LeadAssignmentStrategy, LeadStatus } from '../models/lead.model';
import { LeadDataService, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserListItem } from '../../settings/models/user-admin.model';

interface StatusOption {
  label: string;
  value: LeadStatus;
}

interface AssignmentOption {
  label: string;
  value: LeadAssignmentStrategy;
}

interface OwnerOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-lead-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule
  ],
  template: `
    <div class="lead-form-page">
      <header class="page-header">
        <div class="header-content">
          <a routerLink="/app/leads" class="back-link">
            <i class="pi pi-arrow-left"></i>
            <span>Back to leads</span>
          </a>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Lead' : 'Create New Lead' }}</h1>
            <p>{{ isEditMode() ? 'Update lead details and status' : 'Add a new lead to your pipeline' }}</p>
          </div>
        </div>
      </header>

      <main class="form-container">
        <form class="lead-form" (ngSubmit)="onSave()">
          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-user"></i>
              Lead basics
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>First name <span class="required">*</span></label>
                <input pInputText name="firstName" [(ngModel)]="form.firstName" required placeholder="First name" class="w-full" />
              </div>
              <div class="field">
                <label>Last name <span class="required">*</span></label>
                <input pInputText name="lastName" [(ngModel)]="form.lastName" required placeholder="Last name" class="w-full" />
              </div>
              <div class="field">
                <label>Company</label>
                <input pInputText name="companyName" [(ngModel)]="form.companyName" placeholder="Company" class="w-full" />
              </div>
              <div class="field">
                <label>Status</label>
                <p-select
                  [options]="statusOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="status"
                  [(ngModel)]="form.status"
                  placeholder="Select status"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Assignment</label>
                <p-select
                  [options]="assignmentOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="assignmentStrategy"
                  [(ngModel)]="form.assignmentStrategy"
                  placeholder="Select assignment"
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-option>
                    <div class="option-row" [attr.data-testid]="'lead-assignment-option-' + option.value">
                      {{ option.label }}
                    </div>
                  </ng-template>
                </p-select>
              </div>
              <div class="field" *ngIf="form.assignmentStrategy === 'Manual'">
                <label>Owner</label>
                <p-select
                  [options]="ownerOptions()"
                  optionLabel="label"
                  optionValue="value"
                  name="ownerId"
                  [(ngModel)]="form.ownerId"
                  placeholder="Select owner"
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-option>
                    <div class="option-row" [attr.data-testid]="'lead-owner-option-' + option.value">
                      {{ option.label }}
                    </div>
                  </ng-template>
                </p-select>
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-phone"></i>
              Contact details
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Email</label>
                <input pInputText name="email" [(ngModel)]="form.email" type="email" placeholder="name@company.com" class="w-full" />
              </div>
              <div class="field">
                <label>Phone</label>
                <input pInputText name="phone" [(ngModel)]="form.phone" placeholder="+1 555-0101" class="w-full" />
              </div>
              <div class="field">
                <label>Job title</label>
                <input pInputText name="jobTitle" [(ngModel)]="form.jobTitle" placeholder="Role or title" class="w-full" />
              </div>
              <div class="field">
                <label>Source</label>
                <input pInputText name="source" [(ngModel)]="form.source" placeholder="Web, Referral, Event" class="w-full" />
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-chart-line"></i>
              Qualification
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Lead score</label>
                <p-inputNumber
                  name="score"
                  [(ngModel)]="form.score"
                  [min]="0"
                  [max]="100"
                  placeholder="0-100"
                  class="w-full"
                  [disabled]="form.autoScore"
                ></p-inputNumber>
                <label class="checkbox-row">
                  <input type="checkbox" name="autoScore" [(ngModel)]="form.autoScore" />
                  <span>Auto score</span>
                </label>
                <p class="hint-text" *ngIf="form.autoScore">
                  Auto score uses email, phone, company, job title, source, territory, and linked account/contact.
                  Preview: {{ computeAutoScore() }}.
                  <span *ngIf="isEditMode()">Last saved: {{ form.score ?? 0 }}.</span>
                </p>
              </div>
              <div class="field" *ngIf="form.assignmentStrategy === 'Territory'">
                <label>Territory</label>
                <input pInputText name="territory" [(ngModel)]="form.territory" placeholder="West, EMEA, APAC" class="w-full" />
              </div>
              <div class="field">
                <label>Notes</label>
                <textarea pTextarea name="notes" rows="3" placeholder="Key context, objections, next steps" class="w-full"></textarea>
              </div>
            </div>
          </section>

          <footer class="form-actions">
            <button type="button" pButton label="Cancel" class="crm-button crm-button--ghost" (click)="router.navigate(['/app/leads'])"></button>
            <button
              type="submit"
              pButton
              [label]="isEditMode() ? 'Update lead' : 'Create lead'"
              class="crm-button crm-button--primary"
              [disabled]="!form.firstName || !form.lastName || saving()"
            ></button>
          </footer>
        </form>
      </main>
    </div>
  `,
  styles: [`
    .lead-form-page {
      min-height: 100vh;
      background:
        radial-gradient(at 40% 20%, hsla(228, 83%, 72%, 0.12) 0px, transparent 50%),
        radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.12) 0px, transparent 50%),
        radial-gradient(at 0% 50%, hsla(355, 85%, 63%, 0.08) 0px, transparent 50%),
        linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
      background-attachment: fixed;
    }

    .page-header {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .header-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #0ea5e9;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .back-link:hover {
      color: #0284c7;
      gap: 0.75rem;
    }

    .header-title h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0 0 0.25rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-title p {
      color: #64748b;
      font-size: 0.95rem;
      margin: 0;
    }

    .form-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .lead-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-section {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
    }

    .section-title i {
      color: #667eea;
      font-size: 1.1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #475569;
    }

    .checkbox-row {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.35rem;
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      user-select: none;
    }

    .checkbox-row input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: #6366f1;
    }

    .hint-text {
      margin: 0.35rem 0 0;
      font-size: 0.8rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    .required {
      color: #ef4444;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .form-actions button {
      min-width: 180px;
    }

    @media (max-width: 768px) {
      .page-header {
        padding: 1.25rem 1.5rem;
      }

      .form-container {
        padding: 1.5rem;
      }
    }
  `]
})
export class LeadFormPage implements OnInit {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'New', value: 'New' },
    { label: 'Qualified', value: 'Qualified' },
    { label: 'Converted', value: 'Converted' },
    { label: 'Lost', value: 'Lost' }
  ];
  protected readonly assignmentOptions: AssignmentOption[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Round robin', value: 'RoundRobin' },
    { label: 'Territory', value: 'Territory' }
  ];
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);

  private readonly leadData = inject(LeadDataService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const lead = history.state?.lead as Lead | undefined;
    this.loadOwners();
    if (this.editingId && lead) {
      this.prefillFromLead(lead);
    } else if (this.editingId) {
      this.leadData.get(this.editingId).subscribe({
        next: (data) => this.prefillFromLead(data),
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected onSave() {
    if (!this.form.firstName || !this.form.lastName) {
      return;
    }

    const resolvedScore = this.form.autoScore ? this.computeAutoScore() : (this.form.score ?? 0);
    const payload: SaveLeadRequest = {
      ...this.form,
      score: resolvedScore,
      ownerId: this.form.assignmentStrategy === 'Manual' ? this.form.ownerId : undefined,
      territory: this.form.assignmentStrategy === 'Territory' ? this.form.territory : this.form.territory
    };
    if (this.form.autoScore) {
      this.form.score = resolvedScore;
    }

    this.saving.set(true);
    const request$ = this.editingId
      ? this.leadData.update(this.editingId, payload).pipe(map(() => null))
      : this.leadData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Lead updated.' : 'Lead created.';
        this.router.navigate(['/app/leads'], { state: { toast: { tone: 'success', message } } });
      },
      error: () => this.saving.set(false)
    });
  }

  private prefillFromLead(lead: Lead) {
    const [firstName, ...rest] = lead.name.split(' ');
    this.form = {
      firstName,
      lastName: rest.join(' '),
      companyName: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      score: lead.score ?? 0,
      autoScore: false,
      source: lead.source ?? '',
      jobTitle: lead.jobTitle ?? '',
      ownerId: lead.ownerId,
      assignmentStrategy: 'Manual',
      territory: lead.territory ?? ''
    };
  }

  private createEmptyForm(): SaveLeadRequest & { autoScore: boolean } {
    return {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      phone: '',
      jobTitle: '',
      source: '',
      territory: '',
      status: 'New',
      score: 0,
      autoScore: true,
      assignmentStrategy: 'RoundRobin'
    };
  }

  private loadOwners() {
    this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
      next: (res) => this.ownerOptions.set(this.mapOwnerOptions(res.items)),
      error: () => this.ownerOptions.set([])
    });
  }

  private mapOwnerOptions(users: UserListItem[]): OwnerOption[] {
    return users.map((user) => ({
      label: user.fullName,
      value: user.id
    }));
  }

  protected computeAutoScore(): number {
    const email = this.form.email?.trim();
    const phone = this.form.phone?.trim();
    const company = this.form.companyName?.trim();
    const jobTitle = this.form.jobTitle?.trim();
    const source = this.form.source?.trim();
    const territory = this.form.territory?.trim();
    const hasSignal = !!(email || phone || company || jobTitle || source || territory);

    if (!hasSignal) {
      return this.form.score ?? 0;
    }

    let score = 20;
    if (email) score += 20;
    if (phone) score += 15;
    if (company) score += 10;
    if (jobTitle) score += 10;
    if (source) score += 10;
    if (territory) score += 5;

    return Math.min(100, Math.max(0, score));
  }
}
