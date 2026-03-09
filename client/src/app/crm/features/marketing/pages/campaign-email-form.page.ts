import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { EditorModule } from 'primeng/editor';
import { DatePickerModule } from 'primeng/datepicker';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import { Campaign, SaveCampaignEmailRequest } from '../models/marketing.model';

@Component({
  selector: 'app-campaign-email-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    EditorModule,
    DatePickerModule,
    BreadcrumbsComponent
  ],
  templateUrl: './campaign-email-form.page.html',
  styleUrl: './campaign-email-form.page.scss'
})
export class CampaignEmailFormPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly data = inject(MarketingDataService);
  private readonly toast = inject(AppToastService);

  protected readonly editId = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly loading = signal(false);
  protected readonly campaigns = signal<Array<{ label: string; value: string }>>([]);
  protected readonly isEditMode = computed(() => !!this.editId());
  protected readonly showSchedule = signal(false);

  protected readonly form = this.fb.group({
    campaignId: ['', Validators.required],
    subject: ['', [Validators.required, Validators.maxLength(200)]],
    fromName: ['', [Validators.required, Validators.maxLength(100)]],
    replyTo: ['', Validators.email],
    htmlBody: ['', Validators.required],
    textBody: [''],
    scheduledAtUtc: [null as Date | null]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId.set(id);
      this.loadEmail(id);
    }
    this.loadCampaigns();
  }

  private loadCampaigns(): void {
    this.data.searchCampaigns({ pageSize: 200 }).subscribe({
      next: (res) => {
        this.campaigns.set(
          res.items.map((c: Campaign) => ({ label: c.name, value: c.id }))
        );
      }
    });
  }

  private loadEmail(id: string): void {
    this.loading.set(true);
    this.data.getEmail(id).subscribe({
      next: (detail) => {
        this.form.patchValue({
          campaignId: detail.campaignId,
          subject: detail.subject,
          fromName: detail.fromName,
          replyTo: detail.replyTo ?? '',
          htmlBody: detail.htmlBody,
          textBody: detail.textBody ?? ''
        });
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('error', 'Failed to load email');
        this.loading.set(false);
        this.router.navigate(['/app/marketing/emails']);
      }
    });
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.getRawValue();
    const payload: SaveCampaignEmailRequest = {
      campaignId: val.campaignId!,
      subject: val.subject!,
      fromName: val.fromName!,
      replyTo: val.replyTo || undefined,
      htmlBody: val.htmlBody!,
      textBody: val.textBody || undefined
    };

    this.saving.set(true);
    const op = this.editId()
      ? this.data.updateEmailDraft(this.editId()!, payload)
      : this.data.createEmailDraft(payload);

    op.subscribe({
      next: (result) => {
        this.toast.show('success', this.editId() ? 'Email updated' : 'Email draft created');
        this.saving.set(false);
        this.router.navigate(['/app/marketing/emails', result.id]);
      },
      error: () => {
        this.toast.show('error', 'Failed to save email');
        this.saving.set(false);
      }
    });
  }

  protected saveAndSchedule(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const scheduledDate = this.form.controls.scheduledAtUtc.value;
    if (!scheduledDate) {
      this.showSchedule.set(true);
      return;
    }

    this.saving.set(true);
    const val = this.form.getRawValue();
    const payload: SaveCampaignEmailRequest = {
      campaignId: val.campaignId!,
      subject: val.subject!,
      fromName: val.fromName!,
      replyTo: val.replyTo || undefined,
      htmlBody: val.htmlBody!,
      textBody: val.textBody || undefined
    };

    const saveOp = this.editId()
      ? this.data.updateEmailDraft(this.editId()!, payload)
      : this.data.createEmailDraft(payload);

    saveOp.subscribe({
      next: (result) => {
        this.data.scheduleEmail(result.id, {
          scheduledAtUtc: scheduledDate.toISOString()
        }).subscribe({
          next: () => {
            this.toast.show('success', 'Email scheduled');
            this.saving.set(false);
            this.router.navigate(['/app/marketing/emails', result.id]);
          },
          error: () => {
            this.toast.show('error', 'Email saved but scheduling failed');
            this.saving.set(false);
            this.router.navigate(['/app/marketing/emails', result.id]);
          }
        });
      },
      error: () => {
        this.toast.show('error', 'Failed to save email');
        this.saving.set(false);
      }
    });
  }

  protected cancel(): void {
    this.router.navigate(['/app/marketing/emails']);
  }
}
