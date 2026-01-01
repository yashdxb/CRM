import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';

import { CustomerStatus } from '../models/customer.model';
import { CustomerDataService, SaveCustomerRequest } from '../services/customer-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { Activity } from '../../activities/models/activity.model';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AttachmentDataService, AttachmentItem } from '../../../../shared/services/attachment-data.service';

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
    CardModule,
    TabsModule,
    TableModule,
    TagModule,
    FileUploadModule,
    BreadcrumbsComponent
  ],
  template: `
    <div class="customer-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <button pButton type="button" class="back-link p-button-text" routerLink="/app/customers">
            <i class="pi pi-arrow-left"></i>
            <span>Back to customers</span>
          </button>
          <div class="header-title">
            <h1>
              <span class="title-gradient">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>
              <span class="title-light">Customer</span>
            </h1>
            <p>{{ isEditMode() ? 'Update customer information' : 'Add a new customer to your CRM' }}</p>
          </div>
        </div>
      </header>

      <!-- Form Section -->
      <main class="form-container">
        <form class="customer-form" (ngSubmit)="onSave()">
          <fieldset class="form-fieldset" [disabled]="loading()">
            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-user"></i>
                Basic information
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

            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-phone"></i>
                Contact information
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

            <section class="form-section">
              <h2 class="section-title">
                <i class="pi pi-file-edit"></i>
                Additional information
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

          <footer class="form-actions">
            <button 
              type="button" 
              pButton 
              label="Cancel" 
              class="crm-button crm-button--ghost" 
              routerLink="/app/customers">
            </button>
            <button 
              type="submit" 
              pButton 
              [label]="isEditMode() ? 'Update customer' : 'Create customer'"
              class="crm-button crm-button--primary" 
              [disabled]="!form.name || saving() || loading()">
            </button>
          </footer>
        </form>
      </main>

      <section class="form-container detail-container" *ngIf="isEditMode()">
        <section class="form-section">
          <h2 class="section-title">
            <i class="pi pi-briefcase"></i>
            Customer workspace
          </h2>

          <p-tabs value="timeline">
            <p-tablist>
              <p-tab value="timeline">Timeline</p-tab>
              <p-tab value="notes">Notes</p-tab>
              <p-tab value="related">Related records</p-tab>
              <p-tab value="attachments">Attachments</p-tab>
            </p-tablist>
            <p-tabpanels>
              <p-tabpanel value="timeline">
              <div class="timeline" *ngIf="!timelineLoading(); else timelineLoadingTpl">
                <div class="timeline-item" *ngFor="let activity of activities()">
                  <div class="timeline-type">
                    <span class="type-dot" [attr.data-type]="activity.type">{{ activity.type }}</span>
                  </div>
                  <div class="timeline-body">
                    <div class="timeline-title">{{ activity.subject }}</div>
                    <div class="timeline-meta">
                      <span>{{ activity.createdAtUtc | date: 'MMM d, yyyy · h:mm a' }}</span>
                      <span *ngIf="activity.ownerName">• {{ activity.ownerName }}</span>
                    </div>
                    <div class="timeline-description" *ngIf="activity.description">{{ activity.description }}</div>
                  </div>
                </div>
                <div class="empty-state" *ngIf="!activities().length">No activity yet.</div>
              </div>
              <ng-template #timelineLoadingTpl>
                <div class="empty-state">Loading timeline...</div>
              </ng-template>
              </p-tabpanel>

              <p-tabpanel value="notes">
              <div class="notes">
                <div class="note-editor">
                  <textarea
                    pTextarea
                    rows="4"
                    placeholder="Add a note about this customer..."
                    class="w-full"
                    [(ngModel)]="noteText"
                  ></textarea>
                  <div class="note-actions">
                    <button
                      pButton
                      type="button"
                      label="Add note"
                      icon="pi pi-plus"
                      class="crm-button crm-button--primary"
                      [disabled]="!noteText.trim() || noteSaving()"
                      (click)="addNote()"
                    ></button>
                  </div>
                </div>

                <div class="note-list" *ngIf="notes().length; else notesEmpty">
                  <div class="note-item" *ngFor="let note of notes()">
                    <div class="note-header">
                      <span class="note-title">{{ note.subject }}</span>
                      <span class="note-meta">{{ note.createdAtUtc | date: 'MMM d, yyyy · h:mm a' }}</span>
                    </div>
                    <div class="note-body">{{ note.description }}</div>
                  </div>
                </div>
                <ng-template #notesEmpty>
                  <div class="empty-state">No notes yet.</div>
                </ng-template>
              </div>
              </p-tabpanel>

              <p-tabpanel value="related">
              <div class="related-grid">
                <div class="related-section">
                  <h3>Contacts</h3>
                  <p-table [value]="relatedContacts()" [paginator]="false" [rows]="5" styleClass="compact-table">
                    <ng-template pTemplate="header">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-row>
                      <tr>
                        <td>{{ row.name }}</td>
                        <td>{{ row.email || '—' }}</td>
                        <td>{{ row.phone || '—' }}</td>
                      </tr>
                    </ng-template>
                  </p-table>
                  <div class="empty-state" *ngIf="!relatedContacts().length">No contacts linked.</div>
                </div>

                <div class="related-section">
                  <h3>Opportunities</h3>
                  <p-table [value]="relatedOpportunities()" [paginator]="false" [rows]="5" styleClass="compact-table">
                    <ng-template pTemplate="header">
                      <tr>
                        <th>Name</th>
                        <th>Stage</th>
                        <th>Amount</th>
                      </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-row>
                      <tr>
                        <td>{{ row.name }}</td>
                        <td><p-tag [value]="row.stage" severity="info"></p-tag></td>
                        <td>{{ row.amount | currency: row.currency : 'symbol' : '1.0-0' }}</td>
                      </tr>
                    </ng-template>
                  </p-table>
                  <div class="empty-state" *ngIf="!relatedOpportunities().length">No opportunities yet.</div>
                </div>
              </div>
              </p-tabpanel>

              <p-tabpanel value="attachments">
              <div class="attachments">
                <p-fileUpload
                  mode="basic"
                  chooseLabel="Upload file"
                  [customUpload]="true"
                  (uploadHandler)="onAttachmentUpload($event)"
                  [auto]="true"
                ></p-fileUpload>

                <p-table [value]="attachments()" [paginator]="false" [rows]="5" styleClass="compact-table">
                  <ng-template pTemplate="header">
                    <tr>
                      <th>File</th>
                      <th>Uploaded by</th>
                      <th>Size</th>
                      <th></th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-row>
                    <tr>
                      <td>{{ row.fileName }}</td>
                      <td>{{ row.uploadedBy || '—' }}</td>
                      <td>{{ row.size | number }} bytes</td>
                      <td class="table-actions">
                        <button pButton type="button" class="icon-btn" icon="pi pi-download" (click)="downloadAttachment(row)"></button>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
                <div class="empty-state" *ngIf="!attachments().length">No attachments yet.</div>
              </div>
              </p-tabpanel>
            </p-tabpanels>
          </p-tabs>
        </section>
      </section>
    </div>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════════════════════════════════
       CUSTOMER FORM PAGE - Premium Glass UI with Card Focus Effects
       Apple + Linear/Vercel Hybrid Design
       ═══════════════════════════════════════════════════════════════════════════ */

    :host {
      /* Premium color palette */
      --apple-blue: 0, 122, 255;
      --apple-purple: 175, 82, 222;
      --apple-pink: 255, 45, 85;
      --apple-teal: 90, 200, 250;
      --apple-green: 52, 199, 89;
      --apple-gray-1: 142, 142, 147;
      --apple-gray-2: 174, 174, 178;
      --apple-gray-3: 199, 199, 204;
      --apple-gray-4: 209, 209, 214;
      --apple-gray-5: 229, 229, 234;
      --apple-gray-6: 242, 242, 247;
      --apple-label: 0, 0, 0;
      --apple-secondary: 60, 60, 67;
      --apple-tertiary: 60, 60, 67;
      --apple-fill: 120, 120, 128;
      
      /* Gradient border colors for hover */
      --gradient-start: rgba(var(--apple-blue), 0.6);
      --gradient-mid: rgba(var(--apple-purple), 0.4);
      --gradient-end: rgba(var(--apple-teal), 0.5);
    }

    .customer-form-page {
      min-height: 100vh;
      position: relative;
      /* Soft mesh gradient background */
      background: 
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),
        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),
        linear-gradient(180deg, 
          rgba(var(--apple-gray-6), 0.95) 0%, 
          rgba(255, 255, 255, 1) 40%,
          rgba(var(--apple-gray-6), 0.3) 100%);
      padding-bottom: 5rem;
    }

    /* Animated ambient orbs */
    .customer-form-page::before {
      content: '';
      position: fixed;
      top: -15%;
      left: -5%;
      width: 50%;
      height: 50%;
      background: radial-gradient(
        circle,
        rgba(var(--apple-blue), 0.08) 0%,
        rgba(var(--apple-blue), 0.03) 30%,
        transparent 60%
      );
      pointer-events: none;
      z-index: 0;
      animation: float-orb-1 18s ease-in-out infinite;
    }

    .customer-form-page::after {
      content: '';
      position: fixed;
      bottom: -20%;
      right: -10%;
      width: 60%;
      height: 60%;
      background: radial-gradient(
        circle,
        rgba(var(--apple-purple), 0.07) 0%,
        rgba(var(--apple-teal), 0.03) 35%,
        transparent 60%
      );
      pointer-events: none;
      z-index: 0;
      animation: float-orb-2 22s ease-in-out infinite;
    }

    @keyframes float-orb-1 {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }
      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }
      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }
    }

    @keyframes float-orb-2 {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }
      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       HEADER - Premium Frosted Bar
       ═══════════════════════════════════════════════════════════════════════════ */

    .page-header {
      position: sticky;
      top: 0;
      z-index: 100;
      /* Premium frosted glass */
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(40px) saturate(200%);
      -webkit-backdrop-filter: blur(40px) saturate(200%);
      /* Subtle gradient border */
      border-bottom: 1px solid transparent;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),
        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));
      background-origin: border-box;
      background-clip: padding-box, border-box;
      padding: 1rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }

    .header-content {
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.625rem 0.375rem 0.375rem;
      margin-left: -0.375rem;
      border: none;
      background: transparent;
      color: rgba(var(--apple-blue), 1);
      font-size: 0.9375rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
    }

    .back-link:hover {
      background: rgba(var(--apple-blue), 0.1);
      transform: translateX(-2px);
    }

    .back-link:active {
      background: rgba(var(--apple-blue), 0.15);
      transform: scale(0.97);
    }

    .back-link i {
      font-size: 1rem;
      transition: transform 0.2s ease;
    }

    .back-link:hover i {
      transform: translateX(-3px);
    }

    .header-title h1 {
      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0 0 0.25rem;
      line-height: 1.1;
    }

    .header-title h1 .title-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradient-shift 4s ease-in-out infinite;
    }

    .header-title h1 .title-light {
      -webkit-text-fill-color: #374151;
      color: #374151;
      margin-left: 0.5rem;
    }

    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .header-title p {
      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
      color: #6b7280;
      font-size: 1rem;
      font-weight: 400;
      max-width: 500px;
      line-height: 1.6;
      margin: 0;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       FORM LAYOUT
       ═══════════════════════════════════════════════════════════════════════════ */

    .form-container {
      position: relative;
      z-index: 1;
      max-width: 960px;
      margin: 0 auto;
      padding: 1.5rem;
    }

    .customer-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
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

    /* ═══════════════════════════════════════════════════════════════════════════
       FORM SECTIONS - Premium Glass Cards with Hover Focus
       ═══════════════════════════════════════════════════════════════════════════ */

    .form-section {
      position: relative;
      /* Premium frosted glass */
      background: rgba(255, 255, 255, 0.55);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border-radius: 20px;
      padding: 1.75rem;
      /* Gradient border via pseudo-element */
      border: 1px solid rgba(255, 255, 255, 0.6);
      /* Multi-layer premium shadow */
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.8) inset,
        0 1px 2px rgba(0, 0, 0, 0.02),
        0 4px 12px rgba(0, 0, 0, 0.03),
        0 16px 32px rgba(0, 0, 0, 0.04);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      overflow: hidden;
    }

    /* Gradient border glow on hover */
    .form-section::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 21px;
      padding: 1px;
      background: linear-gradient(135deg, 
        transparent 0%,
        transparent 100%);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      opacity: 0;
      transition: all 0.4s ease;
    }

    /* Ambient glow behind card on hover */
    .form-section::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120%;
      height: 120%;
      transform: translate(-50%, -50%);
      background: radial-gradient(
        ellipse at center,
        rgba(var(--apple-blue), 0) 0%,
        transparent 70%
      );
      pointer-events: none;
      z-index: -1;
      opacity: 0;
      transition: all 0.4s ease;
    }

    .form-section:hover {
      background: rgba(255, 255, 255, 0.72);
      border-color: transparent;
      transform: translateY(-3px) scale(1.005);
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.9) inset,
        0 4px 8px rgba(0, 0, 0, 0.03),
        0 8px 24px rgba(0, 0, 0, 0.06),
        0 24px 48px rgba(var(--apple-blue), 0.08),
        0 0 60px rgba(var(--apple-blue), 0.06);
    }

    .form-section:hover::before {
      opacity: 1;
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 0.4) 0%,
        rgba(var(--apple-purple), 0.3) 50%,
        rgba(var(--apple-teal), 0.4) 100%);
    }

    .form-section:hover::after {
      opacity: 1;
      background: radial-gradient(
        ellipse at center,
        rgba(var(--apple-blue), 0.04) 0%,
        transparent 70%
      );
    }

    /* Focus-within for when form fields inside are focused */
    .form-section:focus-within {
      background: rgba(255, 255, 255, 0.78);
      border-color: transparent;
      transform: translateY(-2px);
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 1) inset,
        0 4px 12px rgba(0, 0, 0, 0.04),
        0 12px 32px rgba(var(--apple-blue), 0.1),
        0 0 80px rgba(var(--apple-blue), 0.08);
    }

    .form-section:focus-within::before {
      opacity: 1;
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 0.5) 0%,
        rgba(var(--apple-purple), 0.35) 50%,
        rgba(var(--apple-teal), 0.45) 100%);
    }

    .form-section:hover .section-title {
      color: #0891b2;
      border-bottom-color: rgba(6, 182, 212, 0.35);
    }

    .form-section:hover .section-title i {
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);
      color: #0891b2;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       SECTION HEADERS - Premium Typography with Teal Accent
       ═══════════════════════════════════════════════════════════════════════════ */

    .section-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      text-transform: none;
      letter-spacing: -0.01em;
      color: #0e7490;
      margin: 0 0 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(6, 182, 212, 0.2);
      transition: all 0.3s ease;
    }

    .section-title i {
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);
      color: #06b6d4;
      font-size: 1.25rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       FORM GRID
       ═══════════════════════════════════════════════════════════════════════════ */

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem 1.125rem;
    }

    .full-row,
    .full-width {
      grid-column: 1 / -1;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field label {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
      font-size: 0.8125rem;
      font-weight: 500;
      color: rgba(var(--apple-secondary), 0.65);
      letter-spacing: -0.01em;
      padding-left: 0.25rem;
      transition: color 0.2s ease;
    }

    .form-section:hover .field label {
      color: rgba(var(--apple-secondary), 0.8);
    }

    .required {
      color: rgba(var(--apple-pink), 1);
      font-weight: 600;
    }

    .w-full {
      width: 100%;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       INPUT FIELDS - Premium Glass Inputs
       ═══════════════════════════════════════════════════════════════════════════ */

    :host ::ng-deep .p-inputtext,
    :host ::ng-deep .p-select,
    :host ::ng-deep .p-inputnumber,
    :host ::ng-deep .p-textarea {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;
      background: rgba(var(--apple-gray-6), 0.5) !important;
      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;
      border-radius: 12px !important;
      font-size: 0.9375rem !important;
      padding: 0.75rem 1rem !important;
      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      box-shadow: 
        inset 0 1px 2px rgba(0, 0, 0, 0.02),
        0 1px 2px rgba(255, 255, 255, 0.5) !important;
    }

    :host ::ng-deep .p-inputtext:hover,
    :host ::ng-deep .p-select:hover,
    :host ::ng-deep .p-inputnumber:hover,
    :host ::ng-deep .p-textarea:hover {
      background: rgba(var(--apple-gray-5), 0.6) !important;
      border-color: rgba(var(--apple-gray-3), 0.5) !important;
      box-shadow: 
        inset 0 1px 2px rgba(0, 0, 0, 0.02),
        0 2px 4px rgba(0, 0, 0, 0.02) !important;
    }

    :host ::ng-deep .p-inputtext:focus,
    :host ::ng-deep .p-select:focus,
    :host ::ng-deep .p-select.p-focus,
    :host ::ng-deep .p-inputnumber:focus,
    :host ::ng-deep .p-textarea:focus {
      background: rgba(255, 255, 255, 0.95) !important;
      border-color: rgba(var(--apple-blue), 0.5) !important;
      box-shadow: 
        0 0 0 4px rgba(var(--apple-blue), 0.15),
        0 4px 12px rgba(var(--apple-blue), 0.1),
        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;
      outline: none !important;
    }

    :host ::ng-deep .p-inputtext::placeholder {
      color: rgba(var(--apple-gray-1), 0.6);
      font-weight: 400;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       FORM ACTIONS - Premium Button Styles
       ═══════════════════════════════════════════════════════════════════════════ */

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      padding-top: 0.75rem;
    }

    .form-actions button {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;
      min-width: 130px;
      border-radius: 12px !important;
      font-weight: 600 !important;
      font-size: 0.9375rem !important;
      padding: 0.75rem 1.5rem !important;
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      letter-spacing: -0.01em !important;
    }

    :host ::ng-deep .crm-button--ghost {
      background: rgba(255, 255, 255, 0.7) !important;
      border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;
      color: rgba(var(--apple-label), 0.8) !important;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
      backdrop-filter: blur(10px) !important;
    }

    :host ::ng-deep .crm-button--ghost:hover {
      background: rgba(255, 255, 255, 0.9) !important;
      border-color: rgba(var(--apple-gray-2), 0.6) !important;
      color: rgba(var(--apple-label), 0.95) !important;
      transform: translateY(-1px) !important;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 1) !important;
    }

    :host ::ng-deep .crm-button--ghost:active {
      background: rgba(var(--apple-gray-5), 0.8) !important;
      transform: translateY(0) scale(0.98) !important;
    }

    :host ::ng-deep .crm-button--primary {
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 1) 0%, 
        rgba(var(--apple-blue), 0.85) 100%) !important;
      border: none !important;
      color: white !important;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 16px rgba(var(--apple-blue), 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
    }

    :host ::ng-deep .crm-button--primary:hover:not(:disabled) {
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 0.92) 0%, 
        rgba(var(--apple-blue), 0.78) 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.12),
        0 8px 24px rgba(var(--apple-blue), 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    }

    :host ::ng-deep .crm-button--primary:active:not(:disabled) {
      transform: translateY(0) scale(0.98) !important;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.1),
        0 2px 8px rgba(var(--apple-blue), 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
    }

    :host ::ng-deep .crm-button--primary:disabled {
      background: rgba(var(--apple-gray-4), 0.8) !important;
      color: rgba(var(--apple-gray-1), 1) !important;
      box-shadow: none !important;
      cursor: not-allowed !important;
      transform: none !important;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       DETAIL SECTIONS - Timeline, Notes, Related, Attachments
       ═══════════════════════════════════════════════════════════════════════════ */

    .detail-container {
      padding-top: 0;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 1rem;
      padding: 1rem;
      border-radius: 14px;
      background: rgba(248, 250, 252, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }

    .type-dot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      background: rgba(59, 130, 246, 0.12);
      color: #1d4ed8;
    }

    .type-dot[data-type='Call'] { background: rgba(16, 185, 129, 0.15); color: #047857; }
    .type-dot[data-type='Meeting'] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }
    .type-dot[data-type='Email'] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }
    .type-dot[data-type='Task'] { background: rgba(148, 163, 184, 0.2); color: #475569; }
    .type-dot[data-type='Note'] { background: rgba(236, 72, 153, 0.15); color: #be185d; }

    .timeline-title {
      font-weight: 700;
      color: #1f2937;
    }

    .timeline-meta {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0.25rem 0 0.5rem;
    }

    .timeline-description {
      color: #334155;
    }

    .notes {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .note-editor {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .note-actions {
      display: flex;
      justify-content: flex-end;
    }

    .note-item {
      padding: 1rem;
      border-radius: 14px;
      background: rgba(248, 250, 252, 0.9);
      border: 1px solid rgba(226, 232, 240, 0.7);
    }

    .note-header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .note-meta {
      font-weight: 500;
      color: #94a3b8;
      font-size: 0.8rem;
    }

    .note-body {
      color: #475569;
      white-space: pre-wrap;
    }

    .related-grid {
      display: grid;
      gap: 1.5rem;
    }

    .related-section h3 {
      margin-bottom: 0.75rem;
      color: #1f2937;
      font-size: 1rem;
      font-weight: 700;
    }

    .attachments {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .compact-table ::ng-deep .p-datatable-thead > tr > th {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #64748b;
    }

    .table-actions {
      width: 48px;
      text-align: right;
    }

    .empty-state {
      padding: 1rem;
      color: #94a3b8;
      font-size: 0.9rem;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       RESPONSIVE
       ═══════════════════════════════════════════════════════════════════════════ */

    @media (max-width: 768px) {
      .page-header {
        padding: 1rem;
      }

      .header-title h1 {
        font-size: 1.625rem;
      }

      .form-container {
        padding: 1rem;
      }

      .form-section {
        padding: 1.5rem;
        border-radius: 16px;
      }

      .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .form-actions {
        flex-direction: column;
      }

      .form-actions button {
        width: 100%;
        min-width: auto;
      }
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       CUSTOM SCROLLBAR - Premium Style
       ═══════════════════════════════════════════════════════════════════════════ */

    :host {
      scrollbar-width: thin;
      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;
    }

    :host::-webkit-scrollbar {
      width: 10px;
    }

    :host::-webkit-scrollbar-track {
      background: transparent;
    }

    :host::-webkit-scrollbar-thumb {
      background: rgba(var(--apple-gray-2), 0.4);
      border-radius: 5px;
      border: 3px solid transparent;
      background-clip: content-box;
    }

    :host::-webkit-scrollbar-thumb:hover {
      background: rgba(var(--apple-gray-1), 0.5);
      background-clip: content-box;
    }

    /* Selection */
    ::selection {
      background: rgba(var(--apple-blue), 0.25);
      color: inherit;
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
  private readonly toastService = inject(AppToastService);
  private readonly activityData = inject(ActivityDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly attachmentData = inject(AttachmentDataService);
  protected customerId: string | null = null;

  protected readonly activities = signal<Activity[]>([]);
  protected readonly notes = signal<Activity[]>([]);
  protected readonly relatedContacts = signal<Contact[]>([]);
  protected readonly relatedOpportunities = signal<Opportunity[]>([]);
  protected readonly attachments = signal<AttachmentItem[]>([]);
  protected readonly timelineLoading = signal(false);
  protected readonly noteSaving = signal(false);

  protected noteText = '';

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
      this.loadDetailData();
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
        this.raiseToast('error', 'Unable to load customer.');
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
        next: () => this.navigateWithToast('Customer updated.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to update customer.');
        }
      });
    } else {
      this.customerData.create(payload).subscribe({
        next: () => this.navigateWithToast('Customer created.'),
        error: () => {
          this.saving.set(false);
          this.raiseToast('error', 'Unable to create customer.');
        }
      });
    }
  }

  protected addNote() {
    if (!this.customerId || !this.noteText.trim()) {
      return;
    }

    this.noteSaving.set(true);
    const payload = {
      subject: 'Note',
      description: this.noteText.trim(),
      type: 'Note' as const,
      relatedEntityType: 'Account' as const,
      relatedEntityId: this.customerId
    };

    this.activityData.create(payload).subscribe({
      next: (note) => {
        this.noteSaving.set(false);
        this.noteText = '';
        this.notes.set([note, ...this.notes()]);
        this.activities.set([note, ...this.activities()]);
      },
      error: () => {
        this.noteSaving.set(false);
        this.raiseToast('error', 'Unable to add note.');
      }
    });
  }

  protected onAttachmentUpload(event: { files: File[] }) {
    if (!this.customerId || !event.files?.length) {
      return;
    }

    const file = event.files[0];
    this.attachmentData.upload(file, 'Account', this.customerId).subscribe({
      next: (attachment) => {
        this.attachments.set([attachment, ...this.attachments()]);
        this.raiseToast('success', 'Attachment uploaded.');
      },
      error: () => {
        this.raiseToast('error', 'Unable to upload attachment.');
      }
    });
  }

  protected downloadAttachment(item: AttachmentItem) {
    const url = this.attachmentData.downloadUrl(item.id);
    window.open(url, '_blank');
  }

  private navigateWithToast(message: string) {
    this.saving.set(false);
    this.router.navigate(['/app/customers'], { state: { toast: { tone: 'success', message } } });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadDetailData() {
    if (!this.customerId) {
      return;
    }

    this.timelineLoading.set(true);
    this.activityData
      .search({
        relatedEntityType: 'Account',
        relatedEntityId: this.customerId,
        page: 1,
        pageSize: 50
      })
      .subscribe({
        next: (res) => {
          const ordered = [...res.items].sort(
            (a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? '')
          );
          this.activities.set(ordered);
          this.timelineLoading.set(false);
        },
        error: () => {
          this.timelineLoading.set(false);
          this.raiseToast('error', 'Unable to load timeline.');
        }
      });

    this.activityData
      .search({
        relatedEntityType: 'Account',
        relatedEntityId: this.customerId,
        type: 'Note',
        page: 1,
        pageSize: 50
      })
      .subscribe({
        next: (res) => {
          const ordered = [...res.items].sort(
            (a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? '')
          );
          this.notes.set(ordered);
        }
      });

    this.contactData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedContacts.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load related contacts.')
    });

    this.opportunityData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
      next: (res) => this.relatedOpportunities.set(res.items),
      error: () => this.raiseToast('error', 'Unable to load opportunities.')
    });

    this.attachmentData.list('Account', this.customerId).subscribe({
      next: (items) => this.attachments.set(items),
      error: () => this.raiseToast('error', 'Unable to load attachments.')
    });
  }
}
