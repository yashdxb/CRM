import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { map } from 'rxjs';

import { Activity, ActivityType, UpsertActivityRequest } from '../models/activity.model';
import { ActivityDataService } from '../services/activity-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { Customer } from '../../customers/models/customer.model';
import { Contact } from '../../contacts/models/contact.model';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { Opportunity } from '../../opportunities/models/opportunity.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

interface Option<T = string> {
  label: string;
  value: T;
}

interface ActivityTemplate {
  id: string;
  label: string;
  defaults: Partial<UpsertActivityRequest>;
}

@Component({
  selector: 'app-activity-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  template: `
    <div class="activity-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <header class="page-header">
        <div class="header-content">
          <button pButton type="button" class="back-link p-button-text" routerLink="/app/activities">
            <i class="pi pi-arrow-left"></i>
            <span>Back to activities</span>
          </button>
          <div class="header-title">
            <h1>
              <span class="title-gradient">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>
              <span class="title-light">Activity</span>
            </h1>
            <p>{{ isEditMode() ? 'Update the schedule and details' : 'Track tasks, calls, and meetings' }}</p>
          </div>
        </div>
      </header>

      <main class="form-container">
        <form class="activity-form" (ngSubmit)="onSave()">
          <section class="form-section">
            <h2 class="section-title">
              <i class="pi pi-calendar"></i>
              Activity details
            </h2>
            <div class="form-grid">
              <div class="field">
                <label>Template</label>
                <p-select
                  [options]="templateOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="template"
                  [(ngModel)]="selectedTemplate"
                  (ngModelChange)="onTemplateChange($event)"
                  placeholder="Choose template"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field full-row">
                <label>Subject <span class="required">*</span></label>
                <input pInputText name="subject" [(ngModel)]="form.subject" required placeholder="Enter activity subject" class="w-full" />
              </div>
              <div class="field">
                <label>Type</label>
                <p-select
                  [options]="typeOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="type"
                  [(ngModel)]="form.type"
                  placeholder="Select type"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Priority</label>
                <p-select
                  [options]="priorityOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="priority"
                  [(ngModel)]="form.priority"
                  placeholder="Select priority"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field">
                <label>Due date</label>
                <p-datePicker
                  name="dueDateUtc"
                  [(ngModel)]="form.dueDateUtc"
                  [showIcon]="true"
                  styleClass="w-full"
                ></p-datePicker>
              </div>
              <div class="field">
                <label>Related to</label>
                <p-select
                  [options]="relationOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityType"
                  [(ngModel)]="form.relatedEntityType"
                  (ngModelChange)="onRelationTypeChange($event)"
                  placeholder="Select record type"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Account'">
                <label>Account</label>
                <p-select
                  [options]="customerOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select account"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Contact'">
                <label>Contact</label>
                <p-select
                  [options]="contactOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select contact"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field" *ngIf="form.relatedEntityType === 'Opportunity'">
                <label>Opportunity</label>
                <p-select
                  [options]="opportunityOptions"
                  optionLabel="label"
                  optionValue="value"
                  name="relatedEntityId"
                  [(ngModel)]="form.relatedEntityId"
                  placeholder="Select opportunity"
                  styleClass="w-full"
                ></p-select>
              </div>
              <div class="field full-row">
                <label>Description</label>
                <textarea pTextarea name="description" [(ngModel)]="form.description" rows="3" placeholder="Add notes or agenda"></textarea>
              </div>
            </div>
          </section>

          <footer class="form-actions">
            <button type="button" pButton label="Cancel" class="crm-button crm-button--ghost" (click)="router.navigate(['/app/activities'])"></button>
            <button
              type="submit"
              pButton
              [label]="isEditMode() ? 'Update activity' : 'Create activity'"
              class="crm-button crm-button--primary"
              [disabled]="!form.subject || saving()"
            ></button>
          </footer>
        </form>
      </main>
    </div>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════════════════════════════════
       ACTIVITY FORM PAGE - Premium Glass UI with Card Focus Effects
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

    .activity-form-page {
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
    .activity-form-page::before {
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

    .activity-form-page::after {
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

    .activity-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
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

    .full-row {
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
    :host ::ng-deep .p-textarea,
    :host ::ng-deep .p-datepicker {
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
    :host ::ng-deep .p-textarea:hover,
    :host ::ng-deep .p-datepicker:hover {
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
    :host ::ng-deep .p-textarea:focus,
    :host ::ng-deep .p-datepicker:focus {
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
export class ActivityFormPage implements OnInit {
  protected readonly typeOptions: Option<ActivityType>[] = [
    { label: 'Task', value: 'Task' },
    { label: 'Call', value: 'Call' },
    { label: 'Email', value: 'Email' },
    { label: 'Meeting', value: 'Meeting' }
  ];

  protected readonly priorityOptions: Option<NonNullable<UpsertActivityRequest['priority']>>[] = [
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' }
  ];

  protected readonly relationOptions: Option<NonNullable<UpsertActivityRequest['relatedEntityType']>>[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Opportunity', value: 'Opportunity' }
  ];
  protected readonly templateOptions: Option<string>[] = [
    { label: 'No template', value: 'none' },
    { label: 'Discovery call', value: 'call-discovery' },
    { label: 'Stakeholder meeting', value: 'meeting-stakeholder' },
    { label: 'Follow-up task', value: 'follow-up' }
  ];
  private readonly activityTemplates: ActivityTemplate[] = [
    {
      id: 'call-discovery',
      label: 'Discovery call',
      defaults: {
        subject: 'Discovery call',
        type: 'Call',
        priority: 'High',
        description: 'Confirm pain points, decision process, and next steps.'
      }
    },
    {
      id: 'meeting-stakeholder',
      label: 'Stakeholder meeting',
      defaults: {
        subject: 'Stakeholder sync',
        type: 'Meeting',
        priority: 'Normal',
        description: 'Agenda: recap needs, align stakeholders, and lock the next action.'
      }
    },
    {
      id: 'follow-up',
      label: 'Follow-up task',
      defaults: {
        subject: 'Follow-up',
        type: 'Task',
        priority: 'Normal',
        description: 'Send recap, share collateral, and confirm next meeting.'
      }
    }
  ];

  protected form: UpsertActivityRequest = this.createEmptyForm();
  protected saving = signal(false);
  private readonly toastService = inject(AppToastService);
  protected customerOptions: Option<string>[] = [];
  protected contactOptions: Option<string>[] = [];
  protected opportunityOptions: Option<string>[] = [];
  protected selectedTemplate = 'none';

  private readonly activityData = inject(ActivityDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  private editingId: string | null = null;

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    const activity = history.state?.activity as Activity | undefined;
    if (this.editingId && activity) {
      this.prefill(activity);
    } else if (this.editingId && !activity) {
      this.router.navigate(['/app/activities']);
      return;
    }

    this.loadLookups();
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected onRelationTypeChange(_value?: UpsertActivityRequest['relatedEntityType']) {
    this.form.relatedEntityId = undefined;
  }

  protected onTemplateChange(value?: string | null) {
    const selected = value ?? 'none';
    this.selectedTemplate = selected;
    if (selected === 'none') {
      return;
    }

    const template = this.activityTemplates.find((item) => item.id === selected);
    if (!template) {
      return;
    }

    this.form = {
      ...this.form,
      subject: template.defaults.subject ?? this.form.subject,
      type: template.defaults.type ?? this.form.type,
      priority: template.defaults.priority ?? this.form.priority,
      description: template.defaults.description ?? this.form.description
    };
  }

  protected onSave() {
    if (!this.form.subject) {
      return;
    }

    this.saving.set(true);
    const request$ = this.editingId
      ? this.activityData.update(this.editingId, this.form).pipe(map(() => null))
      : this.activityData.create(this.form).pipe(map(() => null));

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        const message = this.editingId ? 'Activity updated.' : 'Activity created.';
        this.router.navigate(['/app/activities'], { state: { toast: { tone: 'success', message } } });
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update activity.' : 'Unable to create activity.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadLookups() {
    this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.customerOptions = res.items.map((c: Customer) => ({ label: c.name, value: c.id }));
    });
    this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.contactOptions = res.items.map((c: Contact) => ({ label: c.name, value: c.id }));
    });
    this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
      this.opportunityOptions = res.items.map((o: Opportunity) => ({ label: o.name, value: o.id }));
    });
  }

  private prefill(activity: Activity) {
    this.form = {
      subject: activity.subject,
      description: activity.description,
      type: activity.type,
      priority: activity.priority ?? 'Normal',
      dueDateUtc: activity.dueDateUtc,
      completedDateUtc: activity.completedDateUtc,
      relatedEntityType: activity.relatedEntityType ?? 'Account',
      relatedEntityId: activity.relatedEntityId,
      ownerId: activity.ownerId
    };
  }

  private createEmptyForm(): UpsertActivityRequest {
    return {
      subject: '',
      description: '',
      type: 'Task',
      priority: 'Normal',
      dueDateUtc: undefined,
      relatedEntityType: 'Account',
      relatedEntityId: undefined,
      ownerId: undefined
    };
  }
}
