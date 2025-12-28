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

import { Contact, SaveContactRequest } from '../models/contact.model';
import { ContactDataService } from '../services/contact-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { Customer } from '../../customers/models/customer.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-contact-form-page',
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
    <div class="contact-form-page">
      <header class="page-header">
        <div class="header-content">
          <a routerLink="/app/contacts" class="back-link">
            <i class="pi pi-arrow-left"></i>
            <span>Back to contacts</span>
          </a>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Contact' : 'Create New Contact' }}</h1>
            <p>{{ isEditMode() ? 'Update stakeholder details' : 'Add a new person to your account team' }}</p>
          </div>
        </div>
      </header>

      <main class="form-container">
        <form class="contact-form" (ngSubmit)="onSave()">
          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-user"></i>
              Contact details
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
                <label>Email</label>
                <input pInputText name="email" [(ngModel)]="form.email" type="email" placeholder="name@company.com" class="w-full" />
              </div>
              <div class="field">
                <label>Job title</label>
                <input pInputText name="jobTitle" [(ngModel)]="form.jobTitle" placeholder="Role or title" class="w-full" />
              </div>
              <div class="field">
                <label>Phone</label>
                <input pInputText name="phone" [(ngModel)]="form.phone" placeholder="+1 555-0101" class="w-full" />
              </div>
              <div class="field">
                <label>Mobile</label>
                <input pInputText name="mobile" [(ngModel)]="form.mobile" placeholder="+1 555-0102" class="w-full" />
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-building"></i>
              Account context
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Account</label>
                <p-select
                  [options]="accountOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="accountId"
                  [(ngModel)]="form.accountId"
                  placeholder="Link to account"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Lifecycle</label>
                <p-select
                  [options]="lifecycleOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="lifecycleStage"
                  [(ngModel)]="form.lifecycleStage"
                  placeholder="Select lifecycle"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Activity score</label>
                <p-inputNumber name="activityScore" [(ngModel)]="form.activityScore" [min]="0" [max]="100" class="w-full"></p-inputNumber>
              </div>
              <div class="field">
                <label>LinkedIn</label>
                <input pInputText name="linkedInProfile" [(ngModel)]="form.linkedInProfile" placeholder="https://linkedin.com/in/..." class="w-full" />
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-file-edit"></i>
              Notes
            </h2>
            <div class="field">
              <label>Context</label>
              <textarea pTextarea rows="3" placeholder="Key relationships, preferences, next steps"></textarea>
            </div>
          </section>

          <footer class="form-actions">
            <button type="button" pButton label="Cancel" class="crm-button crm-button--ghost" (click)="router.navigate(['/app/contacts'])"></button>
            <button
              type="submit"
              pButton
              [label]="isEditMode() ? 'Update contact' : 'Create contact'"
              class="crm-button crm-button--primary"
              [disabled]="!form.firstName || !form.lastName || saving()"
            ></button>
          </footer>
        </form>
      </main>
    </div>
  `,
  styles: [`
    .contact-form-page {
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

    .contact-form {
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
export class ContactFormPage implements OnInit {
  protected readonly lifecycleOptions: Option<string>[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];

  protected accountOptions: Option<string>[] = [];
  protected form: SaveContactRequest = this.createEmptyForm();
  protected saving = signal(false);

  private readonly contactData = inject(ContactDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const contact = history.state?.contact as Contact | undefined;
    if (this.editingId && contact) {
      this.prefill(contact);
    } else if (this.editingId) {
      this.contactData.getById(this.editingId).subscribe({
        next: (item) => this.prefill(item),
        error: () => this.router.navigate(['/app/contacts'])
      });
    }

    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.accountOptions = res.items.map((account: Customer) => ({ label: account.name, value: account.id }));
    });
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected onSave() {
    if (!this.form.firstName || !this.form.lastName) {
      return;
    }

    const payload: SaveContactRequest = {
      ...this.form,
      activityScore: this.form.activityScore ?? 0
    };

    this.saving.set(true);
    const request$ = this.editingId
      ? this.contactData.update(this.editingId, payload).pipe(map(() => null))
      : this.contactData.create(payload).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/app/contacts']);
      },
      error: () => this.saving.set(false)
    });
  }

  private prefill(contact: Contact) {
    const [firstName, ...rest] = contact.name.split(' ');
    this.form = {
      firstName,
      lastName: rest.join(' '),
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      jobTitle: contact.jobTitle,
      accountId: contact.accountId,
      ownerId: undefined,
      lifecycleStage: contact.lifecycleStage ?? 'Lead',
      activityScore: contact.activityScore ?? 0,
      linkedInProfile: ''
    };
  }

  private createEmptyForm(): SaveContactRequest {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      mobile: '',
      jobTitle: '',
      accountId: undefined,
      ownerId: undefined,
      lifecycleStage: 'Lead',
      activityScore: 0,
      linkedInProfile: ''
    };
  }
}
