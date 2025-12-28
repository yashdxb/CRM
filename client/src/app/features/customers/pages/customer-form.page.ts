import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';

import { CustomerStatus } from '../models/customer.model';
import { CustomerDataService, SaveCustomerRequest } from '../services/customer-data.service';

interface StatusOption {
  label: string;
  value: CustomerStatus;
}

@Component({
  selector: 'app-customer-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    CardModule
  ],
  template: `
    <div class="customer-form-page">
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-nav">
            <a routerLink="/app/customers" class="back-link">
              <i class="pi pi-arrow-left"></i>
              <span>Back to Customers</span>
            </a>
          </div>
          <div class="header-title">
            <h1>{{ isEditMode() ? 'Edit Customer' : 'Create New Customer' }}</h1>
            <p>{{ isEditMode() ? 'Update customer information' : 'Add a new customer to your CRM' }}</p>
          </div>
        </div>
      </header>

      <!-- Form Section -->
      <main class="form-container">
        <form class="customer-form" (ngSubmit)="onSave()">
          <fieldset class="form-fieldset" [disabled]="loading()">
            <!-- Basic Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-user"></i>
                Basic Information
              </h2>
              
              <div class="form-grid">
                <div class="field">
                  <label for="customerName">Customer Name <span class="required">*</span></label>
                  <input 
                    pInputText 
                    id="customerName"
                    name="name" 
                    [(ngModel)]="form.name" 
                    required 
                    placeholder="Enter customer name"
                    class="w-full"
                  />
                </div>
                
                <div class="field">
                  <label for="customerStatus">Lifecycle Stage</label>
                  <p-select
                    id="customerStatus"
                    [options]="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    name="status"
                    [(ngModel)]="form.lifecycleStage"
                    placeholder="Select status"
                    styleClass="w-full"
                  ></p-select>
                </div>

                <div class="field">
                  <label for="customerIndustry">Industry</label>
                  <input 
                    pInputText 
                    id="customerIndustry"
                    name="industry" 
                    [(ngModel)]="form.industry" 
                    placeholder="e.g., Technology, Healthcare"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerCompany">Company</label>
                  <input 
                    pInputText 
                    id="customerCompany"
                    name="company" 
                    [(ngModel)]="form.company" 
                    placeholder="Company name"
                    class="w-full"
                  />
                </div>
              </div>
            </section>

            <!-- Contact Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-phone"></i>
                Contact Information
              </h2>
              
              <div class="form-grid">
                <div class="field">
                  <label for="customerEmail">Email Address</label>
                  <input 
                    pInputText 
                    id="customerEmail"
                    name="email" 
                    type="email"
                    [(ngModel)]="form.email" 
                    placeholder="customer@example.com"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerPhone">Phone Number</label>
                  <input 
                    pInputText 
                    id="customerPhone"
                    name="phone" 
                    [(ngModel)]="form.phone" 
                    placeholder="+1 (555) 000-0000"
                    class="w-full"
                  />
                </div>
                
                <div class="field">
                  <label for="customerWebsite">Website</label>
                  <input 
                    pInputText 
                    id="customerWebsite"
                    name="website" 
                    [(ngModel)]="form.website" 
                    placeholder="https://example.com"
                    class="w-full"
                  />
                </div>

                <div class="field">
                  <label for="customerAddress">Address</label>
                  <input 
                    pInputText 
                    id="customerAddress"
                    name="address" 
                    [(ngModel)]="form.address" 
                    placeholder="Street address, City, Country"
                    class="w-full"
                  />
                </div>
              </div>
            </section>

            <!-- Additional Information -->
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-file-edit"></i>
                Additional Information
              </h2>
              
              <div class="field full-width">
                <label for="customerDescription">Notes</label>
                <textarea 
                  pTextarea 
                  id="customerDescription"
                  name="description" 
                  [(ngModel)]="form.description" 
                  rows="4" 
                  placeholder="Add any relevant notes about this customer..."
                  class="w-full"
                ></textarea>
              </div>
            </section>
          </fieldset>

          <!-- Form Actions -->
          <footer class="form-actions">
            <button 
              type="button" 
              pButton 
              label="Cancel" 
              icon="pi pi-times"
              class="crm-button crm-button--ghost" 
              routerLink="/app/customers">
            </button>
            <button 
              type="submit" 
              pButton 
              [label]="isEditMode() ? 'Update Customer' : 'Create Customer'"
              [icon]="isEditMode() ? 'pi pi-check' : 'pi pi-plus'"
              class="crm-button crm-button--primary" 
              [disabled]="!form.name || saving() || loading()">
            </button>
          </footer>
        </form>
      </main>
    </div>
  `,
  styles: [`
    .customer-form-page {
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

    .header-nav {
      margin-bottom: 1rem;
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

      &:hover {
        color: #0284c7;
        gap: 0.75rem;
      }

      i {
        font-size: 0.875rem;
      }
    }

    .header-title {
      h1 {
        font-size: 1.75rem;
        font-weight: 800;
        color: #1a1a2e;
        margin: 0 0 0.25rem;
        background: linear-gradient(135deg, #1a1a2e 0%, #667eea 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
        margin: 0;
      }
    }

    .form-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .customer-form {
      display: flex;
      flex-direction: column;
    }

    .form-fieldset {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      border: none;
      margin: 0;
      padding: 0;
      min-width: 0;
    }

    .form-section {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(20px);
      border: none;
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

      i {
        color: #667eea;
        font-size: 1.1rem;
      }
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

      &.full-width {
        grid-column: 1 / -1;
      }
    }

    .field label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #475569;
    }

    .required {
      color: #ef4444;
    }

    .w-full {
      width: 100%;
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
export class CustomerFormPage implements OnInit {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'Lead', value: 'Lead' },
    { label: 'Prospect', value: 'Prospect' },
    { label: 'Customer', value: 'Customer' }
  ];

  protected readonly isEditMode = signal(false);
  protected readonly saving = signal(false);
  protected readonly loading = signal(false);
  protected customerId: string | null = null;

  protected form: SaveCustomerRequest & { email?: string; company?: string; address?: string } = {
    name: '',
    lifecycleStage: 'Lead',
    phone: '',
    website: '',
    industry: '',
    description: '',
    email: '',
    company: '',
    address: ''
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly customerData: CustomerDataService
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEditMode.set(true);
      this.loadCustomer();
    }
  }

  private loadCustomer() {
    if (!this.customerId) return;
    this.loading.set(true);
    this.customerData.getById(this.customerId).subscribe({
      next: (customer) => {
        this.form = {
          name: customer.name,
          lifecycleStage: customer.status,
          phone: customer.phone || '',
          website: customer.address || '',
          industry: '',
          description: customer.notes?.join(', ') || '',
          email: customer.email || '',
          company: customer.company || '',
          address: customer.address || ''
        };
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/app/customers']);
      }
    });
  }

  protected onSave() {
    if (!this.form.name) return;

    this.saving.set(true);
    const payload: SaveCustomerRequest = {
      name: this.form.name,
      lifecycleStage: this.form.lifecycleStage,
      phone: this.form.phone,
      website: this.form.website,
      industry: this.form.industry,
      description: this.form.description
    };

    if (this.customerId) {
      this.customerData.update(this.customerId, payload).subscribe({
        next: () => this.router.navigate(['/app/customers']),
        error: () => this.saving.set(false)
      });
    } else {
      this.customerData.create(payload).subscribe({
        next: () => this.router.navigate(['/app/customers']),
        error: () => this.saving.set(false)
      });
    }
  }
}
