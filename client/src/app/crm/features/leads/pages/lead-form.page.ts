import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

import { map } from 'rxjs';

import { Lead, LeadAssignmentStrategy, LeadStatus, LeadStatusHistoryItem } from '../models/lead.model';
import { LeadDataService, SaveLeadRequest } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { UserListItem } from '../../settings/models/user-admin.model';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';

interface StatusOption {
  label: string;
  value: LeadStatus;
  icon: string;
  disabled?: boolean;
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
    CheckboxModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ProgressBarModule,
    TagModule,
    BreadcrumbsComponent
  ],
  template: `
    <div class="lead-form-page">
      <app-breadcrumbs></app-breadcrumbs>
      <header class="page-header">
        <div class="header-content">
          <div class="header-top">
            <button pButton type="button" class="back-link p-button-text" routerLink="/app/leads">
              <i class="pi pi-arrow-left"></i>
              <span>Back to leads</span>
            </button>
            <button
              pButton
              type="button"
              class="crm-button crm-button--primary"
              icon="pi pi-calendar-plus"
              label="Log activity"
              *ngIf="isEditMode()"
              (click)="logActivity()"
            ></button>
            <button
              pButton
              type="button"
              class="crm-button crm-button--primary"
              icon="pi pi-bolt"
              label="Convert lead"
              *ngIf="isEditMode()"
              [disabled]="!canConvertLead()"
              (click)="onConvertLead()"
            ></button>
          </div>
          <div class="header-title">
            <h1>
              <span class="title-gradient">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>
              <span class="title-light">Lead</span>
            </h1>
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
                  [options]="statusOptionsForView()"
                  optionLabel="label"
                  optionValue="value"
                  optionDisabled="disabled"
                  name="status"
                  [(ngModel)]="form.status"
                  placeholder="Select status"
                  appendTo="body"
                  styleClass="w-full"
                >
                  <ng-template pTemplate="item" let-option>
                    <div class="status-option" [attr.data-status]="option.value">
                      <i class="pi" [ngClass]="option.icon"></i>
                      <span>{{ option.label }}</span>
                    </div>
                  </ng-template>
                  <ng-template pTemplate="value" let-option>
                    <div class="status-option" *ngIf="option" [attr.data-status]="option.value">
                      <i class="pi" [ngClass]="option.icon"></i>
                      <span>{{ option.label }}</span>
                    </div>
                    <span *ngIf="!option" class="status-placeholder">Select status</span>
                  </ng-template>
                </p-select>
                <p class="status-note" *ngIf="isEditMode() && form.status === 'Converted'">
                  This lead is already converted. Update the opportunity instead.
                </p>
                <p class="status-note" *ngIf="isEditMode() && form.status !== 'Converted'">
                  Convert via the "Convert lead" button after qualification.
                </p>
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
                  appendTo="body"
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
                  appendTo="body"
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

          <section class="form-section form-section--qualification">
            <h2 class="section-title">
              <i class="pi pi-chart-line"></i>
              Qualification
            </h2>
            <p-progressBar
              *ngIf="aiScoring()"
              styleClass="ai-score-progress ai-score-progress--top"
              mode="indeterminate"
            ></p-progressBar>
            <div class="form-grid">
              <div class="field score-field">
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
                  <p-checkbox name="autoScore" [(ngModel)]="form.autoScore" binary="true"></p-checkbox>
                  <span>Auto score</span>
                </label>
                <p class="hint-text" *ngIf="form.autoScore">
                  Auto score uses email, phone, company, job title, source, territory, and linked account/contact.
                  Preview: {{ computeAutoScore() }}.
                  <span *ngIf="isEditMode()">Last saved: {{ form.score ?? 0 }}.</span>
                </p>
                <div class="ai-score-row" *ngIf="isEditMode()">
                  <button
                    pButton
                    type="button"
                    label="AI score"
                    icon="pi pi-bolt"
                    class="crm-button crm-button--primary ai-score-button"
                    (click)="onAiScore()"
                    [disabled]="aiScoring()"
                  ></button>
                  <div class="ai-score-inline" *ngIf="aiScoreNote() && !aiScoring()" [ngClass]="aiScoreClass()">
                    <i class="pi" [ngClass]="aiScoreIcon()"></i>
                    <span>{{ aiScoreNote() }}</span>
                  </div>
                </div>
              </div>
              <div class="field" *ngIf="form.assignmentStrategy === 'Territory'">
                <label>Territory</label>
                <input pInputText name="territory" [(ngModel)]="form.territory" placeholder="West, EMEA, APAC" class="w-full" />
              </div>
              <div class="field full-row">
                <label>Notes</label>
                <textarea
                  pTextarea
                  name="notes"
                  rows="5"
                  placeholder="Key context, objections, next steps"
                  class="w-full"
                ></textarea>
              </div>
            </div>
          </section>

          <section class="form-section" *ngIf="isEditMode()">
            <h2 class="section-title">
              <i class="pi pi-history"></i>
              Status history
            </h2>
            <div class="history-list" *ngIf="statusHistory().length; else noHistory">
              <div class="history-item" *ngFor="let entry of statusHistory()">
                <div class="history-header">
                  <p-tag [value]="entry.status" [severity]="statusSeverity(entry.status)"></p-tag>
                  <span class="history-time">{{ entry.changedAtUtc | date:'medium' }}</span>
                </div>
                <div class="history-meta">
                  <span>Changed by {{ entry.changedBy || 'system' }}</span>
                </div>
                <div class="history-notes" *ngIf="entry.notes">{{ entry.notes }}</div>
              </div>
            </div>
            <ng-template #noHistory>
              <div class="history-empty">No status changes recorded yet.</div>
            </ng-template>
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
    /* ═══════════════════════════════════════════════════════════════════════════
       LEAD FORM PAGE - Premium Glass UI with Card Focus Effects
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

    .lead-form-page {
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
    .lead-form-page::before {
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

    .lead-form-page::after {
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

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
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

    .lead-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .history-list {
      display: grid;
      gap: 0.85rem;
      margin-top: 0.5rem;
    }

    .history-item {
      padding: 0.85rem 1rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(15, 23, 42, 0.08);
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
      display: grid;
      gap: 0.4rem;
    }

    .history-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .history-time {
      font-size: 0.85rem;
      color: rgba(51, 65, 85, 0.75);
    }

    .history-meta {
      font-size: 0.85rem;
      color: rgba(51, 65, 85, 0.8);
    }

    .history-notes {
      font-size: 0.9rem;
      color: rgba(30, 41, 59, 0.9);
    }

    .history-empty {
      padding: 0.85rem 1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px dashed rgba(148, 163, 184, 0.6);
      color: rgba(71, 85, 105, 0.9);
      font-size: 0.9rem;
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

    .form-section--qualification {
      padding-bottom: 2rem;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       SECTION HEADERS - Premium Typography
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

    .form-section:hover .section-title {
      color: #0891b2;
      border-bottom-color: rgba(6, 182, 212, 0.35);
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

    .form-section:hover .section-title i {
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);
      color: #0891b2;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);
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

    .status-option {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .status-option i {
      font-size: 0.9rem;
    }

    .status-placeholder {
      color: rgba(var(--apple-gray-1), 0.6);
      font-weight: 500;
    }

    .status-option[data-status="New"] i { color: #06b6d4; }
    .status-option[data-status="Contacted"] i { color: #f59e0b; }
    .status-option[data-status="Qualified"] i { color: #10b981; }
    .status-option[data-status="Converted"] i { color: #6366f1; }
    .status-option[data-status="Lost"] i { color: #ef4444; }

    .status-note {
      margin: 0.5rem 0 0;
      font-size: 0.82rem;
      color: rgba(var(--apple-secondary), 0.7);
    }

    .status-note strong {
      color: rgba(var(--apple-label), 0.9);
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       CHECKBOX - Premium Toggle
       ═══════════════════════════════════════════════════════════════════════════ */

    .checkbox-row {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      margin-top: 0.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(var(--apple-label), 0.8);
      cursor: pointer;
      user-select: none;
      padding: 0.375rem 0.75rem 0.375rem 0;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .checkbox-row:hover {
      color: rgba(var(--apple-blue), 1);
    }

    .checkbox-row .p-checkbox {
      display: inline-flex;
      align-items: center;
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box {
      width: 22px !important;
      height: 22px !important;
      border-radius: 7px !important;
      border: 1.5px solid rgba(var(--apple-gray-2), 0.8) !important;
      background: rgba(255, 255, 255, 0.8) !important;
      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box:hover {
      border-color: rgba(var(--apple-blue), 0.5) !important;
      background: rgba(255, 255, 255, 0.95) !important;
    }

    :host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 1) 0%, 
        rgba(var(--apple-blue), 0.85) 100%) !important;
      border-color: rgba(var(--apple-blue), 1) !important;
      box-shadow: 
        0 2px 8px rgba(var(--apple-blue), 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       HINT TEXT - Premium Info Box
       ═══════════════════════════════════════════════════════════════════════════ */

    .hint-text {
      margin: 0.5rem 0 0;
      padding: 0.625rem 0.875rem;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
      font-size: 0.75rem;
      color: rgba(var(--apple-secondary), 0.6);
      line-height: 1.5;
      background: linear-gradient(135deg, 
        rgba(var(--apple-gray-6), 0.5) 0%, 
        rgba(var(--apple-gray-5), 0.3) 100%);
      border-radius: 10px;
      border: 1px solid rgba(var(--apple-gray-4), 0.3);
      backdrop-filter: blur(10px);
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       AI SCORE SECTION
       ═══════════════════════════════════════════════════════════════════════════ */

    .ai-score-row {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .ai-score-inline {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.5rem 0.875rem;
      border-radius: 10px;
      backdrop-filter: blur(8px);
      transition: all 0.2s ease;
    }

    .ai-score-inline i {
      font-size: 0.875rem;
    }

    .ai-score-inline.is-success {
      color: rgb(52, 199, 89);
      background: linear-gradient(135deg, 
        rgba(52, 199, 89, 0.12) 0%, 
        rgba(52, 199, 89, 0.08) 100%);
      border: 1px solid rgba(52, 199, 89, 0.2);
    }

    .ai-score-inline.is-info {
      color: rgba(var(--apple-blue), 1);
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 0.12) 0%, 
        rgba(var(--apple-blue), 0.08) 100%);
      border: 1px solid rgba(var(--apple-blue), 0.2);
    }

    .ai-score-inline.is-warn {
      color: rgb(255, 149, 0);
      background: linear-gradient(135deg, 
        rgba(255, 149, 0, 0.12) 0%, 
        rgba(255, 149, 0, 0.08) 100%);
      border: 1px solid rgba(255, 149, 0, 0.2);
    }

    .ai-score-inline.is-error {
      color: rgba(var(--apple-pink), 1);
      background: linear-gradient(135deg, 
        rgba(var(--apple-pink), 0.12) 0%, 
        rgba(var(--apple-pink), 0.08) 100%);
      border: 1px solid rgba(var(--apple-pink), 0.2);
    }

    :host ::ng-deep .ai-score-progress {
      width: 140px;
      height: 4px;
      border-radius: 2px;
      background: rgba(var(--apple-gray-4), 0.4);
      overflow: hidden;
    }

    :host ::ng-deep .ai-score-progress .p-progressbar-value {
      background: linear-gradient(90deg, 
        rgba(var(--apple-blue), 1) 0%, 
        rgba(var(--apple-purple), 0.9) 50%,
        rgba(var(--apple-teal), 1) 100%);
      border-radius: 2px;
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    :host ::ng-deep .ai-score-progress--top {
      width: 100%;
      height: 3px;
      margin: 0.625rem 0 1rem;
    }

    .score-field {
      grid-column: 1 / -1;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       AI BUTTON - Premium Pill Button (Keeping the style user likes)
       ═══════════════════════════════════════════════════════════════════════════ */

    :host ::ng-deep .ai-score-button {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;
      border-radius: 980px !important;
      font-weight: 600 !important;
      font-size: 0.875rem !important;
      padding: 0.625rem 1.25rem !important;
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 1) 0%, 
        rgba(var(--apple-purple), 0.9) 100%) !important;
      border: none !important;
      color: white !important;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(var(--apple-blue), 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
      letter-spacing: -0.01em !important;
    }

    :host ::ng-deep .ai-score-button:hover {
      background: linear-gradient(135deg, 
        rgba(var(--apple-blue), 0.9) 0%, 
        rgba(var(--apple-purple), 0.85) 100%) !important;
      transform: translateY(-1px) scale(1.02) !important;
      box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.12),
        0 8px 20px rgba(var(--apple-blue), 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    }

    :host ::ng-deep .ai-score-button:active {
      transform: translateY(0) scale(0.98) !important;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.1),
        0 2px 8px rgba(var(--apple-blue), 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
    }

    :host ::ng-deep .ai-score-button .pi {
      font-size: 0.9375rem;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       FORM ACTIONS - Premium Button Styles (Keeping user's preferred style)
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

    /* ═══════════════════════════════════════════════════════════════════════════
       FOCUS STATES - Premium Accessibility Ring
       ═══════════════════════════════════════════════════════════════════════════ */

    :host ::ng-deep *:focus-visible {
      outline: none;
      box-shadow: 
        0 0 0 3px rgba(var(--apple-blue), 0.25),
        0 0 0 6px rgba(var(--apple-blue), 0.1) !important;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       SELECTION - Premium Style
       ═══════════════════════════════════════════════════════════════════════════ */

    ::selection {
      background: rgba(var(--apple-blue), 0.25);
      color: inherit;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       SMOOTH TRANSITIONS FOR ALL INTERACTIVE ELEMENTS
       ═══════════════════════════════════════════════════════════════════════════ */

    .form-section,
    .form-section::before,
    .form-section::after,
    .section-title,
    .section-title i,
    .field label,
    .back-link,
    .back-link i {
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  `]
})
export class LeadFormPage implements OnInit {
  protected readonly statusOptions: StatusOption[] = [
    { label: 'New', value: 'New', icon: 'pi-star' },
    { label: 'Contacted', value: 'Contacted', icon: 'pi-comments' },
    { label: 'Qualified', value: 'Qualified', icon: 'pi-check' },
    { label: 'Converted', value: 'Converted', icon: 'pi-verified' },
    { label: 'Lost', value: 'Lost', icon: 'pi-times' }
  ];
  protected readonly assignmentOptions: AssignmentOption[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Round robin', value: 'RoundRobin' },
    { label: 'Territory', value: 'Territory' }
  ];
  protected readonly ownerOptions = signal<OwnerOption[]>([]);

  protected form: SaveLeadRequest & { autoScore: boolean } = this.createEmptyForm();
  protected saving = signal(false);
  protected aiScoring = signal(false);
  protected aiScoreNote = signal<string | null>(null);
  protected aiScoreSeverity = signal<'success' | 'info' | 'warn' | 'error'>('info');
  protected statusHistory = signal<LeadStatusHistoryItem[]>([]);
  private readonly toastService = inject(AppToastService);

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
      this.loadStatusHistory(this.editingId);
    } else if (this.editingId) {
      this.leadData.get(this.editingId).subscribe({
        next: (data) => {
          this.prefillFromLead(data);
          this.loadStatusHistory(this.editingId!);
        },
        error: () => this.router.navigate(['/app/leads'])
      });
    }
  }

  protected isEditMode() {
    return !!this.editingId;
  }

  protected logActivity(): void {
    if (!this.editingId) {
      return;
    }
    const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
    const subject = fullName ? `Follow up: ${fullName}` : 'Lead follow-up';
    this.router.navigate(['/app/activities/new'], {
      queryParams: {
        relatedType: 'Lead',
        relatedId: this.editingId,
        subject
      }
    });
  }

  protected canConvertLead(): boolean {
    return this.isEditMode() && this.form.status === 'Qualified';
  }

  protected statusOptionsForView(): StatusOption[] {
    const isConverted = this.form.status === 'Converted';
    return this.statusOptions.map((option) => ({
      ...option,
      disabled: option.value === 'Converted' && !isConverted
    }));
  }

  protected onConvertLead(): void {
    if (!this.editingId || !this.canConvertLead()) {
      return;
    }
    this.router.navigate(['/app/leads', this.editingId, 'convert']);
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
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', this.editingId ? 'Unable to update lead.' : 'Unable to create lead.');
      }
    });
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
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

  private loadStatusHistory(leadId: string) {
    this.leadData.getStatusHistory(leadId).subscribe({
      next: (history) => this.statusHistory.set(history),
      error: () => this.statusHistory.set([])
    });
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

  protected onAiScore() {
    debugger;
    if (!this.editingId || this.aiScoring()) {
      return;
    }

    this.aiScoring.set(true);
    this.leadData.aiScore(this.editingId).subscribe({
      next: (result) => {
        this.aiScoring.set(false);
        this.form.score = result.score;
        this.form.autoScore = false;
        const confidencePct = Math.round(result.confidence * 100);
        this.aiScoreNote.set(`AI score ${result.score} - ${confidencePct}% confidence. ${result.rationale || ''}`.trim());
        this.aiScoreSeverity.set(this.resolveAiSeverity(result.score));
        this.raiseToast('success', `AI score updated to ${result.score}.`);
      },
      error: () => {
        
        
        this.aiScoring.set(false);
        this.raiseToast('error', 'Unable to run AI scoring.');
      }
    });
  }

  private resolveAiSeverity(score: number): 'success' | 'info' | 'warn' | 'error' {
    if (score >= 70) return 'success';
    if (score >= 45) return 'info';
    if (score >= 25) return 'warn';
    return 'error';
  }

  protected aiScoreClass() {
    return `is-${this.aiScoreSeverity()}`;
  }

  protected aiScoreIcon() {
    switch (this.aiScoreSeverity()) {
      case 'success':
        return 'pi-check-circle';
      case 'warn':
        return 'pi-exclamation-triangle';
      case 'error':
        return 'pi-times-circle';
      default:
        return 'pi-info-circle';
    }
  }

  protected statusSeverity(status: LeadStatus | string) {
    switch (status) {
      case 'Qualified':
      case 'Converted':
        return 'success';
      case 'Contacted':
        return 'info';
      case 'Lost':
        return 'danger';
      default:
        return 'warn';
    }
  }
}
