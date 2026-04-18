import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { HelpDeskDataService } from '../services/helpdesk-data.service';
import { AttachmentDataService } from '../../../../shared/services/attachment-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/inputgroup";
import * as i6 from "primeng/inputgroupaddon";
import * as i7 from "primeng/textarea";
import * as i8 from "primeng/select";
import * as i9 from "primeng/tabs";
import * as i10 from "primeng/fileupload";
import * as i11 from "primeng/checkbox";
import * as i12 from "primeng/inputnumber";
import * as i13 from "primeng/knob";
const _c0 = () => ({ standalone: true });
function HelpDeskCaseDetailPage_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71)(1, "div", 72);
    i0.ɵɵelement(2, "p-knob", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 74)(4, "span", 75);
    i0.ɵɵtext(5, "Overall case score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 76)(7, "span", 77);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 78);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 79);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "p", 80);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const currentCase_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r1.caseHeaderScoreValue())("readonly", true)("valueTemplate", "{value}%")("size", 92)("strokeWidth", 9)("showValue", true)("min", 0)("max", 100);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--case-header-score-color", ctx_r1.caseHeaderScoreColor());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(currentCase_r1.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.caseHeaderProgressSummary());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("breached", ctx_r1.getSlaState() === "breached")("at-risk", ctx_r1.getSlaState() === "at-risk")("healthy", ctx_r1.getSlaState() === "healthy");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" SLA ", i0.ɵɵpipeBind1(13, 20, ctx_r1.getSlaState()), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.caseHeaderScoreMessage());
} }
function HelpDeskCaseDetailPage_div_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81)(1, "article", 82)(2, "div", 83)(3, "strong");
    i0.ɵɵtext(4, "SLA status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 84);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "titlecase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 85)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const currentCase_r3 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("breached", ctx_r1.getSlaState() === "breached")("at-risk", ctx_r1.getSlaState() === "at-risk")("healthy", ctx_r1.getSlaState() === "healthy");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 9, ctx_r1.getSlaState()), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Resolution due: ", i0.ɵɵpipeBind2(11, 11, currentCase_r3.resolutionDueUtc, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.formatDueIn(currentCase_r3.resolutionDueUtc));
} }
function HelpDeskCaseDetailPage_div_87_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 88);
    i0.ɵɵlistener("click", function HelpDeskCaseDetailPage_div_87_button_3_Template_button_click_0_listener() { const status_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateStatus(status_r5.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const status_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ((tmp_3_0 = ctx_r1.caseRecord()) == null ? null : tmp_3_0.status) === status_r5.value);
    i0.ɵɵproperty("label", status_r5.label)("disabled", !ctx_r1.canManage());
} }
function HelpDeskCaseDetailPage_div_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "span");
    i0.ɵɵtext(2, "Quick status:");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, HelpDeskCaseDetailPage_div_87_button_3_Template, 1, 4, "button", 87);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.statusOptions);
} }
function HelpDeskCaseDetailPage_article_90_ul_9_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 93);
    i0.ɵɵelement(2, "i", 94);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const attachment_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", attachment_r6.downloadUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(attachment_r6.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatBytes(attachment_r6.size));
} }
function HelpDeskCaseDetailPage_article_90_ul_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 91);
    i0.ɵɵtemplate(1, HelpDeskCaseDetailPage_article_90_ul_9_li_1_Template, 7, 3, "li", 92);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r7.attachments);
} }
function HelpDeskCaseDetailPage_article_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 89)(1, "header")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, HelpDeskCaseDetailPage_article_90_ul_9_Template, 2, 1, "ul", 90);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r7.authorUserName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 4, row_r7.createdAtUtc, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r7.body);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r7.attachments.length);
} }
function HelpDeskCaseDetailPage_ul_95_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵelement(2, "i", 94);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 96);
    i0.ɵɵlistener("click", function HelpDeskCaseDetailPage_ul_95_li_1_Template_button_click_4_listener() { const attachment_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removePendingAttachment(attachment_r9.id)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const attachment_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", attachment_r9.fileName, " (", ctx_r1.formatBytes(attachment_r9.size), ") ");
} }
function HelpDeskCaseDetailPage_ul_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 95);
    i0.ɵɵtemplate(1, HelpDeskCaseDetailPage_ul_95_li_1_Template, 5, 2, "li", 92);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.pendingCommentAttachments());
} }
function HelpDeskCaseDetailPage_article_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 97)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r10.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 3, row_r10.occurredUtc, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r10.notes || "System-generated SLA event.");
} }
function HelpDeskCaseDetailPage_p_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "No escalation events yet.");
    i0.ɵɵelementEnd();
} }
export class HelpDeskCaseDetailPage {
    route = inject(ActivatedRoute);
    router = inject(Router);
    fb = inject(FormBuilder);
    data = inject(HelpDeskDataService);
    attachments = inject(AttachmentDataService);
    toast = inject(AppToastService);
    caseId = this.route.snapshot.paramMap.get('id');
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    caseRecord = signal(null, ...(ngDevMode ? [{ debugName: "caseRecord" }] : []));
    comments = signal([], ...(ngDevMode ? [{ debugName: "comments" }] : []));
    escalations = signal([], ...(ngDevMode ? [{ debugName: "escalations" }] : []));
    queues = signal([], ...(ngDevMode ? [{ debugName: "queues" }] : []));
    activeTab = signal('overview', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    commentAttachmentUploading = signal(false, ...(ngDevMode ? [{ debugName: "commentAttachmentUploading" }] : []));
    pendingCommentAttachments = signal([], ...(ngDevMode ? [{ debugName: "pendingCommentAttachments" }] : []));
    selectedMacro = signal(null, ...(ngDevMode ? [{ debugName: "selectedMacro" }] : []));
    canManage = computed(() => tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.helpDeskManage), ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    statusOptions = [
        { label: 'New', value: 'New' },
        { label: 'Open', value: 'Open' },
        { label: 'Pending Customer', value: 'Pending Customer' },
        { label: 'Pending Internal', value: 'Pending Internal' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Closed', value: 'Closed' }
    ];
    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
        { label: 'Urgent', value: 'Urgent' }
    ];
    severityOptions = [
        { label: 'S1', value: 'S1' },
        { label: 'S2', value: 'S2' },
        { label: 'S3', value: 'S3' },
        { label: 'S4', value: 'S4' }
    ];
    sourceOptions = [
        { label: 'Manual', value: 'Manual' },
        { label: 'Email', value: 'Email' }
    ];
    queueOptions = computed(() => this.queues().map((q) => ({ label: q.name, value: q.id })), ...(ngDevMode ? [{ debugName: "queueOptions" }] : []));
    closureReasonOptions = [
        { label: 'Resolved by product guidance', value: 'Resolved by product guidance' },
        { label: 'Bug fix deployed', value: 'Bug fix deployed' },
        { label: 'Configuration issue', value: 'Configuration issue' },
        { label: 'User training required', value: 'User training required' },
        { label: 'Third-party dependency', value: 'Third-party dependency' }
    ];
    macroOptions = [
        { label: 'Request logs', value: 'request-logs', body: 'Please share recent logs, timestamps, and exact reproduction steps so we can isolate the issue quickly.' },
        { label: 'Request environment details', value: 'request-env', body: 'Please confirm environment, browser version, and tenant key. This helps us validate configuration-specific behavior.' },
        { label: 'Closure confirmation', value: 'closure-confirm', body: 'The fix has been applied. Please confirm whether the issue is fully resolved on your side.' }
    ];
    commentForm = this.fb.group({
        body: ['', [Validators.required, Validators.maxLength(4000)]],
        isInternal: [true]
    });
    form = this.fb.group({
        subject: ['', [Validators.required, Validators.maxLength(240)]],
        description: ['', [Validators.required, Validators.maxLength(4000)]],
        priority: ['Medium', [Validators.required]],
        severity: ['S3', [Validators.required]],
        category: ['General', [Validators.required]],
        subcategory: [''],
        source: ['Manual', [Validators.required]],
        queueId: [null],
        closureReason: [null],
        csatScore: [null],
        csatFeedback: ['']
    });
    constructor() {
        this.loadQueues();
        if (this.caseId) {
            this.loadCase(this.caseId);
        }
    }
    isNewCase() {
        return !this.caseId;
    }
    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        const raw = this.form.getRawValue();
        const payload = {
            subject: raw.subject ?? '',
            description: raw.description ?? '',
            priority: raw.priority ?? 'Medium',
            severity: raw.severity ?? 'S3',
            category: raw.category ?? 'General',
            subcategory: raw.subcategory ?? null,
            source: raw.source ?? 'Manual',
            queueId: raw.queueId ?? null,
            accountId: this.caseRecord()?.accountId ?? null,
            contactId: this.caseRecord()?.contactId ?? null,
            ownerUserId: this.caseRecord()?.ownerUserId ?? null,
            closureReason: raw.closureReason ?? null,
            csatScore: raw.csatScore ?? null,
            csatFeedback: raw.csatFeedback ?? null
        };
        const request$ = this.caseId
            ? this.data.updateCase(this.caseId, payload)
            : this.data.createCase(payload);
        request$.subscribe({
            next: (res) => {
                this.saving.set(false);
                this.toast.show('success', this.caseId ? 'Case updated.' : 'Case created.');
                if (!this.caseId && res?.id) {
                    this.router.navigate(['/app/helpdesk/cases', res.id]);
                    return;
                }
                if (this.caseId) {
                    this.loadCase(this.caseId);
                }
            },
            error: () => {
                this.saving.set(false);
                this.toast.show('error', 'Unable to save case.');
            }
        });
    }
    onActiveTabChange(value) {
        if (typeof value === 'string') {
            this.activeTab.set(value);
        }
    }
    updateStatus(status) {
        if (!this.caseId) {
            return;
        }
        this.data.updateStatus(this.caseId, status, null).subscribe({
            next: () => {
                this.toast.show('success', `Case status updated to ${status}.`);
                this.loadCase(this.caseId);
            },
            error: () => this.toast.show('error', 'Unable to update case status.')
        });
    }
    addComment() {
        if (!this.caseId || this.commentForm.invalid) {
            this.commentForm.markAllAsTouched();
            return;
        }
        const payload = this.commentForm.getRawValue();
        const attachmentIds = this.pendingCommentAttachments().map((item) => item.id);
        this.data.addComment(this.caseId, payload.body ?? '', !!payload.isInternal, attachmentIds).subscribe({
            next: () => {
                this.commentForm.reset({ body: '', isInternal: true });
                this.pendingCommentAttachments.set([]);
                this.selectedMacro.set(null);
                this.toast.show('success', 'Comment added.');
                this.loadCase(this.caseId);
            },
            error: () => this.toast.show('error', 'Unable to add comment.')
        });
    }
    uploadCommentAttachment(event) {
        if (!this.caseId || !event.files?.length) {
            return;
        }
        const file = event.files[0];
        this.commentAttachmentUploading.set(true);
        this.attachments.upload(file, 'SupportCase', this.caseId).subscribe({
            next: (attachment) => {
                this.pendingCommentAttachments.set([...this.pendingCommentAttachments(), attachment]);
                this.commentAttachmentUploading.set(false);
            },
            error: (err) => {
                this.commentAttachmentUploading.set(false);
                const message = typeof err?.error?.message === 'string' && err.error.message.trim().length > 0
                    ? err.error.message
                    : 'Unable to upload attachment.';
                this.toast.show('error', message);
            }
        });
    }
    removePendingAttachment(attachmentId) {
        this.attachments.delete(attachmentId).subscribe({
            next: () => this.pendingCommentAttachments.set(this.pendingCommentAttachments().filter((item) => item.id !== attachmentId)),
            error: () => this.toast.show('error', 'Unable to remove attachment.')
        });
    }
    formatBytes(size) {
        if (size < 1024)
            return `${size} B`;
        if (size < 1024 * 1024)
            return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
    applyMacro(macroKey) {
        if (!macroKey) {
            return;
        }
        const macro = this.macroOptions.find((item) => item.value === macroKey);
        if (!macro) {
            return;
        }
        const current = this.commentForm.controls.body.value ?? '';
        const next = current.trim().length ? `${current.trim()}\n\n${macro.body}` : macro.body;
        this.commentForm.controls.body.setValue(next);
    }
    getSlaState() {
        const row = this.caseRecord();
        if (!row) {
            return 'unknown';
        }
        if (!['New', 'Open', 'Pending Customer', 'Pending Internal'].includes(row.status)) {
            return 'resolved';
        }
        const due = new Date(row.resolutionDueUtc).getTime();
        const now = Date.now();
        if (due < now) {
            return 'breached';
        }
        if (due <= now + 60 * 60 * 1000) {
            return 'at-risk';
        }
        return 'healthy';
    }
    formatDueIn(dueUtc) {
        if (!dueUtc) {
            return '-';
        }
        const ms = new Date(dueUtc).getTime() - Date.now();
        const absoluteMinutes = Math.round(Math.abs(ms) / 60000);
        const hours = Math.floor(absoluteMinutes / 60);
        const minutes = absoluteMinutes % 60;
        const token = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        return ms >= 0 ? `in ${token}` : `${token} overdue`;
    }
    caseHeaderScoreValue() {
        const row = this.caseRecord();
        if (!row) {
            return 0;
        }
        let score = 100;
        const slaState = this.getSlaState();
        if (slaState === 'breached') {
            score -= 40;
        }
        else if (slaState === 'at-risk') {
            score -= 20;
        }
        if (row.status === 'Pending Customer') {
            score -= 8;
        }
        else if (row.status === 'Pending Internal') {
            score -= 12;
        }
        else if (row.status === 'Resolved') {
            score += 5;
        }
        else if (row.status === 'Closed') {
            score += 8;
        }
        const severityPenalty = { S1: 18, S2: 10, S3: 4, S4: 0 };
        const priorityPenalty = { Urgent: 15, High: 8, Medium: 3, Low: 0 };
        score -= severityPenalty[row.severity] ?? 0;
        score -= priorityPenalty[row.priority] ?? 0;
        if (typeof row.csatScore === 'number' && row.csatScore > 0) {
            score += (row.csatScore - 3) * 4;
        }
        return Math.max(0, Math.min(100, Math.round(score)));
    }
    caseHeaderScoreColor() {
        const score = this.caseHeaderScoreValue();
        if (score >= 80)
            return '#22c55e';
        if (score >= 60)
            return '#3b82f6';
        if (score >= 40)
            return '#f59e0b';
        if (score >= 20)
            return '#f97316';
        return '#ef4444';
    }
    caseHeaderProgressSummary() {
        const row = this.caseRecord();
        if (!row) {
            return 'Case not yet created';
        }
        const openStates = ['New', 'Open', 'Pending Customer', 'Pending Internal'];
        if (openStates.includes(row.status)) {
            return 'Active support cycle';
        }
        if (row.status === 'Resolved') {
            return 'Resolution recorded';
        }
        if (row.status === 'Closed') {
            return 'Case closed';
        }
        return 'Status recorded';
    }
    caseHeaderScoreMessage() {
        const row = this.caseRecord();
        if (!row) {
            return 'Overall case score will appear after the support case is created.';
        }
        return 'Overall case score is derived from SLA state, case status, priority, severity, and CSAT when available.';
    }
    loadCase(id) {
        this.loading.set(true);
        this.data.getCase(id).subscribe({
            next: (res) => {
                this.caseRecord.set(res.case);
                this.comments.set(res.comments ?? []);
                this.escalations.set(res.escalations ?? []);
                this.form.patchValue({
                    subject: res.case.subject,
                    description: res.case.description ?? '',
                    priority: res.case.priority,
                    severity: res.case.severity,
                    category: res.case.category,
                    subcategory: res.case.subcategory ?? '',
                    source: res.case.source,
                    queueId: res.case.queueId ?? null,
                    closureReason: res.case.closureReason ?? null,
                    csatScore: res.case.csatScore ?? null,
                    csatFeedback: res.case.csatFeedback ?? ''
                });
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load case.');
            }
        });
    }
    loadQueues() {
        this.data.listQueues().subscribe({
            next: (queues) => this.queues.set(queues ?? []),
            error: () => this.queues.set([])
        });
    }
    static ɵfac = function HelpDeskCaseDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpDeskCaseDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpDeskCaseDetailPage, selectors: [["app-helpdesk-case-detail-page"]], decls: 118, vars: 37, consts: [[1, "page-background", "helpdesk-case-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "glass-card", "hero-card"], [1, "hero-copy"], [1, "hero-title"], [1, "hero-subtitle"], ["class", "case-header-progress", 4, "ngIf"], [1, "hero-actions"], ["pButton", "", "type", "button", "label", "Back", "routerLink", "/app/helpdesk/cases", 1, "crm-button", "crm-button--ghost"], ["pButton", "", "type", "button", "label", "Save", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [1, "glass-card", "workspace-card"], [3, "valueChange", "value"], ["value", "overview"], ["value", "conversation", 3, "disabled"], ["value", "timeline", 3, "disabled"], ["value", "linked", 3, "disabled"], [1, "form-grid", 3, "formGroup"], [1, "form-field"], ["for", "hd-subject"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "hd-subject", "formControlName", "subject", "placeholder", "Enter subject"], ["for", "hd-category"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-briefcase"], ["pInputText", "", "id", "hd-category", "formControlName", "category", "placeholder", "Enter category"], ["for", "hd-subcategory"], ["pInputText", "", "id", "hd-subcategory", "formControlName", "subcategory", "placeholder", "Enter subcategory"], ["for", "hd-source"], ["id", "hd-source", "optionLabel", "label", "optionValue", "value", "formControlName", "source", "placeholder", "Select source", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "hd-priority"], ["id", "hd-priority", "optionLabel", "label", "optionValue", "value", "formControlName", "priority", "placeholder", "Select priority", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "hd-severity"], ["id", "hd-severity", "optionLabel", "label", "optionValue", "value", "formControlName", "severity", "placeholder", "Select severity", "appendTo", "body", 1, "w-full", 3, "options"], ["for", "hd-queueId"], ["id", "hd-queueId", "optionLabel", "label", "optionValue", "value", "formControlName", "queueId", "placeholder", "Select queue", "appendTo", "body", 1, "w-full", 3, "options", "showClear"], ["for", "hd-closureReason"], ["id", "hd-closureReason", "optionLabel", "label", "optionValue", "value", "formControlName", "closureReason", "placeholder", "Select reason", "appendTo", "body", 1, "w-full", 3, "options", "showClear"], ["for", "hd-csatScore"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-star"], ["id", "hd-csatScore", "formControlName", "csatScore", 3, "min", "max"], [1, "form-field", "full-row"], ["for", "hd-csatFeedback"], ["pTextarea", "", "id", "hd-csatFeedback", "rows", "3", "formControlName", "csatFeedback", "placeholder", "Optional feedback from customer"], ["for", "hd-description"], ["pTextarea", "", "id", "hd-description", "rows", "5", "formControlName", "description", "placeholder", "Enter description"], ["class", "sla-cockpit", 4, "ngIf"], ["class", "status-actions", 4, "ngIf"], ["value", "conversation"], [1, "comment-list"], ["class", "comment-item", 4, "ngFor", "ngForOf"], [1, "comment-form", 3, "formGroup"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Insert canned response", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["pTextarea", "", "rows", "3", "formControlName", "body", "placeholder", "Add internal note or customer-facing update..."], ["mode", "basic", "chooseLabel", "Attach file", "chooseStyleClass", "crm-button crm-button--ghost crm-button--sm", 3, "uploadHandler", "customUpload", "auto", "multiple", "disabled"], ["class", "pending-attachment-list", 4, "ngIf"], [1, "comment-actions"], [1, "checkbox-field"], ["formControlName", "isInternal", 3, "binary"], ["pButton", "", "type", "button", "label", "Add Comment", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["value", "timeline"], [1, "timeline-list"], ["class", "timeline-item", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["value", "linked"], [1, "linked-grid"], [1, "glass-card"], [1, "case-header-progress"], [1, "case-header-progress__dial"], ["valueColor", "var(--case-header-score-color)", "rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#1e293b", "styleClass", "case-header-progress__knob", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max"], [1, "case-header-progress__content"], [1, "case-header-progress__eyebrow"], [1, "case-header-progress__meta"], [1, "case-header-progress__status"], [1, "case-header-progress__step"], [1, "case-header-progress__sla"], [1, "case-header-progress__copy"], [1, "sla-cockpit"], [1, "sla-card", "glass-card", "no-hover"], [1, "sla-head"], [1, "sla-chip"], [1, "sla-meta"], [1, "status-actions"], ["pButton", "", "type", "button", "class", "crm-button crm-button--pill crm-button--sm status-pill", 3, "active", "label", "disabled", "click", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--pill", "crm-button--sm", "status-pill", 3, "click", "label", "disabled"], [1, "comment-item"], ["class", "comment-attachment-list", 4, "ngIf"], [1, "comment-attachment-list"], [4, "ngFor", "ngForOf"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "pi", "pi-paperclip"], [1, "pending-attachment-list"], ["pButton", "", "type", "button", "icon", "pi pi-times", "title", "Remove attachment", 1, "action-btn", "p-button-text", "p-button-rounded", "p-button-sm", "p-button-danger", 3, "click"], [1, "timeline-item"]], template: function HelpDeskCaseDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "h1", 7);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 8);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, HelpDeskCaseDetailPage_div_12_Template, 16, 22, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 10);
            i0.ɵɵelement(14, "button", 11);
            i0.ɵɵelementStart(15, "button", 12);
            i0.ɵɵlistener("click", function HelpDeskCaseDetailPage_Template_button_click_15_listener() { return ctx.save(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "section", 13)(17, "p-tabs", 14);
            i0.ɵɵlistener("valueChange", function HelpDeskCaseDetailPage_Template_p_tabs_valueChange_17_listener($event) { return ctx.onActiveTabChange($event); });
            i0.ɵɵelementStart(18, "p-tablist")(19, "p-tab", 15);
            i0.ɵɵtext(20, "Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p-tab", 16);
            i0.ɵɵtext(22, "Conversation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p-tab", 17);
            i0.ɵɵtext(24, "Timeline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "p-tab", 18);
            i0.ɵɵtext(26, "Linked Records");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "p-tabpanels")(28, "p-tabpanel", 15)(29, "form", 19)(30, "div", 20)(31, "label", 21);
            i0.ɵɵtext(32, "Subject");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p-inputgroup")(34, "p-inputgroup-addon", 22);
            i0.ɵɵelement(35, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 20)(38, "label", 25);
            i0.ɵɵtext(39, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "p-inputgroup")(41, "p-inputgroup-addon", 26);
            i0.ɵɵelement(42, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "input", 28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 20)(45, "label", 29);
            i0.ɵɵtext(46, "Subcategory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "p-inputgroup")(48, "p-inputgroup-addon", 26);
            i0.ɵɵelement(49, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(50, "input", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 20)(52, "label", 31);
            i0.ɵɵtext(53, "Source");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "p-select", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 20)(56, "label", 33);
            i0.ɵɵtext(57, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(58, "p-select", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 20)(60, "label", 35);
            i0.ɵɵtext(61, "Severity");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(62, "p-select", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 20)(64, "label", 37);
            i0.ɵɵtext(65, "Queue");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "p-select", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 20)(68, "label", 39);
            i0.ɵɵtext(69, "Closure reason");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(70, "p-select", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "div", 20)(72, "label", 41);
            i0.ɵɵtext(73, "CSAT score (1-5)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "p-inputgroup")(75, "p-inputgroup-addon", 42);
            i0.ɵɵelement(76, "i", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(77, "p-inputNumber", 44);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(78, "div", 45)(79, "label", 46);
            i0.ɵɵtext(80, "CSAT feedback");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "textarea", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "div", 45)(83, "label", 48);
            i0.ɵɵtext(84, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(85, "textarea", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(86, HelpDeskCaseDetailPage_div_86_Template, 14, 14, "div", 50)(87, HelpDeskCaseDetailPage_div_87_Template, 4, 1, "div", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "p-tabpanel", 52)(89, "div", 53);
            i0.ɵɵtemplate(90, HelpDeskCaseDetailPage_article_90_Template, 10, 7, "article", 54);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "form", 55)(92, "p-select", 56);
            i0.ɵɵlistener("ngModelChange", function HelpDeskCaseDetailPage_Template_p_select_ngModelChange_92_listener($event) { ctx.selectedMacro.set($event); return ctx.applyMacro($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(93, "textarea", 57);
            i0.ɵɵelementStart(94, "p-fileUpload", 58);
            i0.ɵɵlistener("uploadHandler", function HelpDeskCaseDetailPage_Template_p_fileUpload_uploadHandler_94_listener($event) { return ctx.uploadCommentAttachment($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(95, HelpDeskCaseDetailPage_ul_95_Template, 2, 1, "ul", 59);
            i0.ɵɵelementStart(96, "div", 60)(97, "label", 61);
            i0.ɵɵelement(98, "p-checkbox", 62);
            i0.ɵɵelementStart(99, "span");
            i0.ɵɵtext(100, "Internal comment");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "button", 63);
            i0.ɵɵlistener("click", function HelpDeskCaseDetailPage_Template_button_click_101_listener() { return ctx.addComment(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(102, "p-tabpanel", 64)(103, "div", 65);
            i0.ɵɵtemplate(104, HelpDeskCaseDetailPage_article_104_Template, 8, 6, "article", 66)(105, HelpDeskCaseDetailPage_p_105_Template, 2, 0, "p", 67);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(106, "p-tabpanel", 68)(107, "div", 69)(108, "article", 70)(109, "h3");
            i0.ɵɵtext(110, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "p");
            i0.ɵɵtext(112);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(113, "article", 70)(114, "h3");
            i0.ɵɵtext(115, "Contact");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "p");
            i0.ɵɵtext(117);
            i0.ɵɵelementEnd()()()()()()()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_34_0;
            let tmp_35_0;
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.isNewCase() ? "New Support Case" : ((tmp_0_0 = ctx.caseRecord()) == null ? null : tmp_0_0.caseNumber) || "Case Workspace");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.isNewCase() ? "Capture customer issue details and set SLA context." : "Manage status, conversation, and escalation timeline.", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.caseRecord());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.saving() || !ctx.canManage());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.activeTab());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.isNewCase());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isNewCase());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isNewCase());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("options", ctx.sourceOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.priorityOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.severityOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.queueOptions())("showClear", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.closureReasonOptions)("showClear", true);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 1)("max", 5);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.caseRecord());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.caseRecord());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.comments());
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.commentForm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.macroOptions)("ngModel", ctx.selectedMacro())("ngModelOptions", i0.ɵɵpureFunction0(36, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("customUpload", true)("auto", true)("multiple", false)("disabled", !ctx.canManage() || ctx.commentAttachmentUploading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.pendingCommentAttachments().length);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.escalations());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.escalations().length);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(((tmp_34_0 = ctx.caseRecord()) == null ? null : tmp_34_0.accountName) || "-");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(((tmp_35_0 = ctx.caseRecord()) == null ? null : tmp_35_0.contactName) || "-");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.ButtonDirective, InputTextModule, i4.InputText, InputGroupModule, i5.InputGroup, InputGroupAddonModule, i6.InputGroupAddon, TextareaModule, i7.Textarea, SelectModule, i8.Select, TabsModule, i9.Tabs, i9.TabPanels, i9.TabPanel, i9.TabList, i9.Tab, RouterLink, BreadcrumbsComponent, FileUploadModule, i10.FileUpload, CheckboxModule, i11.Checkbox, InputNumberModule, i12.InputNumber, KnobModule, i13.Knob, i1.TitleCasePipe, i1.DatePipe], styles: [".helpdesk-case-page[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .hero-copy {\n    min-width: 0;\n  }\n\n  .case-header-progress {\n    --case-header-score-color: #2563eb;\n    display: flex;\n    align-items: center;\n    gap: 0.9rem;\n    margin-top: 1rem;\n    padding: 0.78rem 0.9rem;\n    border-radius: 18px;\n    border: 1px solid rgba(148, 163, 184, 0.18);\n    background:\n      radial-gradient(circle at 8% 15%, rgba(59, 130, 246, 0.14), transparent 42%),\n      radial-gradient(circle at 90% 18%, rgba(16, 185, 129, 0.11), transparent 36%),\n      linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.54),\n      0 14px 26px rgba(15, 23, 42, 0.08);\n    backdrop-filter: blur(12px) saturate(124%);\n    -webkit-backdrop-filter: blur(12px) saturate(124%);\n    max-width: 38rem;\n  }\n\n  .case-header-progress__dial {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 96px;\n    height: 96px;\n    border-radius: 20px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n    border: 1px solid rgba(148, 163, 184, 0.14);\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.54),\n      0 10px 18px rgba(15, 23, 42, 0.05);\n  }\n\n  -shadowcsshost-no-combinator ::ng-deep .case-header-progress__knob {\n    width: 92px;\n  }\n\n  -shadowcsshost-no-combinator ::ng-deep .case-header-progress__knob .p-knob-text {\n    font-size: 1rem;\n    font-weight: 800;\n    fill: #1e293b;\n  }\n\n  .case-header-progress__content {\n    min-width: 0;\n    display: grid;\n    gap: 0.22rem;\n    align-content: center;\n  }\n\n  .case-header-progress__eyebrow {\n    font-size: 0.7rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: #64748b;\n  }\n\n  .case-header-progress__meta {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n  }\n\n  .case-header-progress__status,\n  .case-header-progress__step,\n  .case-header-progress__sla {\n    display: inline-flex;\n    align-items: center;\n    min-height: 1.8rem;\n    padding: 0.2rem 0.55rem;\n    border-radius: 999px;\n    font-size: 0.76rem;\n    font-weight: 700;\n    border: 1px solid rgba(148, 163, 184, 0.16);\n    background: rgba(255, 255, 255, 0.72);\n    color: #1e293b;\n  }\n\n  .case-header-progress__status {\n    color: #0f766e;\n    background: rgba(204, 251, 241, 0.82);\n    border-color: rgba(45, 212, 191, 0.28);\n  }\n\n  .case-header-progress__sla.healthy {\n    color: #166534;\n    background: rgba(220, 252, 231, 0.82);\n    border-color: rgba(34, 197, 94, 0.28);\n  }\n\n  .case-header-progress__sla.at-risk {\n    color: #92400e;\n    background: rgba(254, 243, 199, 0.88);\n    border-color: rgba(245, 158, 11, 0.28);\n  }\n\n  .case-header-progress__sla.breached {\n    color: #991b1b;\n    background: rgba(254, 226, 226, 0.88);\n    border-color: rgba(239, 68, 68, 0.28);\n  }\n\n  .case-header-progress__copy {\n    margin: 0;\n    color: #475569;\n    font-size: 0.82rem;\n    line-height: 1.5;\n    max-width: 30rem;\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .workspace-card {\n    padding: 1rem;\n  }\n\n  .form-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.35rem 0.45rem 0.45rem;\n    border-radius: 12px;\n    background: rgba(255, 255, 255, 0.35);\n    border: 1px solid transparent;\n    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n    > label {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-inputnumber,\n    > p-datepicker,\n    > input,\n    > textarea {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.5);\n      border-color: rgba(148, 163, 184, 0.16);\n      > label { color: #334155; }\n    }\n\n    &:focus-within {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: rgba(var(--apple-blue), 0.22);\n      box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n      > label { color: #4f46e5; }\n    }\n\n    &.full-row {\n      grid-column: 1 / -1;\n      flex-direction: column;\n      align-items: stretch;\n      > label { text-align: left; min-width: unset; }\n    }\n  }\n\n  .sla-cockpit {\n    margin-top: 0.75rem;\n  }\n\n  .sla-card {\n    padding: 0.75rem;\n  }\n\n  .sla-head {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 0.5rem;\n    margin-bottom: 0.35rem;\n  }\n\n  .sla-meta {\n    display: flex;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    font-size: 0.9rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    border-radius: 999px;\n    padding: 0.2rem 0.65rem;\n    font-size: 0.78rem;\n    font-weight: 700;\n  }\n\n  .sla-chip.healthy {\n    background: rgba(22, 163, 74, 0.14);\n    color: #166534;\n  }\n\n  .sla-chip.at-risk {\n    background: rgba(245, 158, 11, 0.18);\n    color: #92400e;\n  }\n\n  .sla-chip.breached {\n    background: rgba(239, 68, 68, 0.16);\n    color: #991b1b;\n  }\n\n  .status-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n    margin-top: 1rem;\n  }\n\n  .status-pill.active {\n    border-color: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 55%, white);\n    background: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 14%, white);\n    color: var(--crm-primary-700, #1d4ed8);\n  }\n\n  .comment-list,\n  .timeline-list {\n    display: grid;\n    gap: 0.65rem;\n  }\n\n  .comment-item,\n  .timeline-item {\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    border-radius: 0.75rem;\n    padding: 0.75rem;\n    background: rgba(15, 23, 42, 0.08);\n  }\n\n  .comment-item header {\n    display: flex;\n    justify-content: space-between;\n    gap: 0.5rem;\n  }\n\n  .comment-form {\n    margin-top: 0.75rem;\n    display: grid;\n    gap: 0.65rem;\n  }\n\n  .comment-attachment-list,\n  .pending-attachment-list {\n    margin: 0;\n    padding-left: 0;\n    list-style: none;\n    display: grid;\n    gap: 0.35rem;\n  }\n\n  .comment-attachment-list a,\n  .pending-attachment-list li {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    color: inherit;\n    text-decoration: none;\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    border-radius: 0.55rem;\n    padding: 0.35rem 0.55rem;\n    background: rgba(15, 23, 42, 0.08);\n  }\n\n  .pending-attachment-list li {\n    justify-content: space-between;\n  }\n\n  .comment-actions {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .checkbox-field {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n  }\n\n  .linked-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  @media (max-width: 960px) {\n    .hero-card {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .case-header-progress {\n      max-width: 100%;\n    }\n\n    .form-grid,\n    .linked-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .case-header-progress {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .case-header-progress__dial {\n      align-self: flex-start;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDeskCaseDetailPage, [{
        type: Component,
        args: [{ selector: 'app-helpdesk-case-detail-page', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputGroupModule, InputGroupAddonModule, TextareaModule, SelectModule, TabsModule, RouterLink, BreadcrumbsComponent, FileUploadModule, CheckboxModule, InputNumberModule, KnobModule], template: "<section class=\"page-background helpdesk-case-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card hero-card\">\n    <div class=\"hero-copy\">\n      <h1 class=\"hero-title\">{{ isNewCase() ? 'New Support Case' : (caseRecord()?.caseNumber || 'Case Workspace') }}</h1>\n      <p class=\"hero-subtitle\">\n        {{ isNewCase() ? 'Capture customer issue details and set SLA context.' : 'Manage status, conversation, and escalation timeline.' }}\n      </p>\n      <div class=\"case-header-progress\" *ngIf=\"caseRecord() as currentCase\">\n        <div class=\"case-header-progress__dial\">\n          <p-knob\n            [ngModel]=\"caseHeaderScoreValue()\"\n            [readonly]=\"true\"\n            [valueTemplate]=\"'{value}%'\"\n            [size]=\"92\"\n            [strokeWidth]=\"9\"\n            [showValue]=\"true\"\n            [min]=\"0\"\n            [max]=\"100\"\n            valueColor=\"var(--case-header-score-color)\"\n            rangeColor=\"rgba(148, 163, 184, 0.18)\"\n            textColor=\"#1e293b\"\n            styleClass=\"case-header-progress__knob\"\n          ></p-knob>\n        </div>\n        <div class=\"case-header-progress__content\" [style.--case-header-score-color]=\"caseHeaderScoreColor()\">\n          <span class=\"case-header-progress__eyebrow\">Overall case score</span>\n          <div class=\"case-header-progress__meta\">\n            <span class=\"case-header-progress__status\">{{ currentCase.status }}</span>\n            <span class=\"case-header-progress__step\">{{ caseHeaderProgressSummary() }}</span>\n            <span class=\"case-header-progress__sla\" [class.breached]=\"getSlaState() === 'breached'\" [class.at-risk]=\"getSlaState() === 'at-risk'\" [class.healthy]=\"getSlaState() === 'healthy'\">\n              SLA {{ getSlaState() | titlecase }}\n            </span>\n          </div>\n          <p class=\"case-header-progress__copy\">{{ caseHeaderScoreMessage() }}</p>\n        </div>\n      </div>\n    </div>\n    <div class=\"hero-actions\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Back\" routerLink=\"/app/helpdesk/cases\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Save\" [disabled]=\"saving() || !canManage()\" (click)=\"save()\"></button>\n    </div>\n  </section>\n\n  <section class=\"glass-card workspace-card\">\n    <p-tabs [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n      <p-tablist>\n        <p-tab value=\"overview\">Overview</p-tab>\n        <p-tab value=\"conversation\" [disabled]=\"isNewCase()\">Conversation</p-tab>\n        <p-tab value=\"timeline\" [disabled]=\"isNewCase()\">Timeline</p-tab>\n        <p-tab value=\"linked\" [disabled]=\"isNewCase()\">Linked Records</p-tab>\n      </p-tablist>\n\n      <p-tabpanels>\n        <p-tabpanel value=\"overview\">\n          <form class=\"form-grid\" [formGroup]=\"form\">\n            <div class=\"form-field\">\n              <label for=\"hd-subject\">Subject</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-tag\"></i></p-inputgroup-addon>\n                <input pInputText id=\"hd-subject\" formControlName=\"subject\" placeholder=\"Enter subject\" />\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-category\">Category</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\"><i class=\"pi pi-briefcase\"></i></p-inputgroup-addon>\n                <input pInputText id=\"hd-category\" formControlName=\"category\" placeholder=\"Enter category\" />\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-subcategory\">Subcategory</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\"><i class=\"pi pi-briefcase\"></i></p-inputgroup-addon>\n                <input pInputText id=\"hd-subcategory\" formControlName=\"subcategory\" placeholder=\"Enter subcategory\" />\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-source\">Source</label>\n              <p-select id=\"hd-source\" [options]=\"sourceOptions\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"source\" placeholder=\"Select source\" class=\"w-full\" appendTo=\"body\"></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-priority\">Priority</label>\n              <p-select id=\"hd-priority\" [options]=\"priorityOptions\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"priority\" placeholder=\"Select priority\" class=\"w-full\" appendTo=\"body\"></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-severity\">Severity</label>\n              <p-select id=\"hd-severity\" [options]=\"severityOptions\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"severity\" placeholder=\"Select severity\" class=\"w-full\" appendTo=\"body\"></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-queueId\">Queue</label>\n              <p-select id=\"hd-queueId\" [options]=\"queueOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"queueId\" [showClear]=\"true\" placeholder=\"Select queue\" class=\"w-full\" appendTo=\"body\"></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-closureReason\">Closure reason</label>\n              <p-select id=\"hd-closureReason\" [options]=\"closureReasonOptions\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"closureReason\" [showClear]=\"true\" placeholder=\"Select reason\" class=\"w-full\" appendTo=\"body\"></p-select>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"hd-csatScore\">CSAT score (1-5)</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--info\"><i class=\"pi pi-star\"></i></p-inputgroup-addon>\n                <p-inputNumber id=\"hd-csatScore\" formControlName=\"csatScore\" [min]=\"1\" [max]=\"5\"></p-inputNumber>\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field full-row\">\n              <label for=\"hd-csatFeedback\">CSAT feedback</label>\n              <textarea pTextarea id=\"hd-csatFeedback\" rows=\"3\" formControlName=\"csatFeedback\" placeholder=\"Optional feedback from customer\"></textarea>\n            </div>\n            <div class=\"form-field full-row\">\n              <label for=\"hd-description\">Description</label>\n              <textarea pTextarea id=\"hd-description\" rows=\"5\" formControlName=\"description\" placeholder=\"Enter description\"></textarea>\n            </div>\n          </form>\n\n          <div class=\"sla-cockpit\" *ngIf=\"caseRecord() as currentCase\">\n            <article class=\"sla-card glass-card no-hover\">\n              <div class=\"sla-head\">\n                <strong>SLA status</strong>\n                <span class=\"sla-chip\" [class.breached]=\"getSlaState() === 'breached'\" [class.at-risk]=\"getSlaState() === 'at-risk'\" [class.healthy]=\"getSlaState() === 'healthy'\">\n                  {{ getSlaState() | titlecase }}\n                </span>\n              </div>\n              <div class=\"sla-meta\">\n                <span>Resolution due: {{ currentCase.resolutionDueUtc | date: 'medium' }}</span>\n                <span>{{ formatDueIn(currentCase.resolutionDueUtc) }}</span>\n              </div>\n            </article>\n          </div>\n\n          <div class=\"status-actions\" *ngIf=\"caseRecord()\">\n            <span>Quick status:</span>\n            <button\n              pButton\n              type=\"button\"\n              class=\"crm-button crm-button--pill crm-button--sm status-pill\"\n              [class.active]=\"caseRecord()?.status === status.value\"\n              *ngFor=\"let status of statusOptions\"\n              [label]=\"status.label\"\n              [disabled]=\"!canManage()\"\n              (click)=\"updateStatus(status.value)\">\n            </button>\n          </div>\n        </p-tabpanel>\n\n        <p-tabpanel value=\"conversation\">\n          <div class=\"comment-list\">\n            <article class=\"comment-item\" *ngFor=\"let row of comments()\">\n              <header>\n                <strong>{{ row.authorUserName }}</strong>\n                <span>{{ row.createdAtUtc | date: 'medium' }}</span>\n              </header>\n              <p>{{ row.body }}</p>\n              <ul class=\"comment-attachment-list\" *ngIf=\"row.attachments.length\">\n                <li *ngFor=\"let attachment of row.attachments\">\n                  <a [href]=\"attachment.downloadUrl\" target=\"_blank\" rel=\"noopener\">\n                    <i class=\"pi pi-paperclip\"></i>\n                    <span>{{ attachment.fileName }}</span>\n                    <small>{{ formatBytes(attachment.size) }}</small>\n                  </a>\n                </li>\n              </ul>\n            </article>\n          </div>\n\n          <form class=\"comment-form\" [formGroup]=\"commentForm\">\n            <p-select\n              [options]=\"macroOptions\"\n              [ngModel]=\"selectedMacro()\"\n              (ngModelChange)=\"selectedMacro.set($event); applyMacro($event)\"\n              [ngModelOptions]=\"{ standalone: true }\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              placeholder=\"Insert canned response\">\n            </p-select>\n            <textarea pTextarea rows=\"3\" formControlName=\"body\" placeholder=\"Add internal note or customer-facing update...\"></textarea>\n            <p-fileUpload\n              mode=\"basic\"\n              chooseLabel=\"Attach file\"\n              chooseStyleClass=\"crm-button crm-button--ghost crm-button--sm\"\n              [customUpload]=\"true\"\n              [auto]=\"true\"\n              [multiple]=\"false\"\n              [disabled]=\"!canManage() || commentAttachmentUploading()\"\n              (uploadHandler)=\"uploadCommentAttachment($event)\">\n            </p-fileUpload>\n            <ul class=\"pending-attachment-list\" *ngIf=\"pendingCommentAttachments().length\">\n              <li *ngFor=\"let attachment of pendingCommentAttachments()\">\n                <span>\n                  <i class=\"pi pi-paperclip\"></i>\n                  {{ attachment.fileName }} ({{ formatBytes(attachment.size) }})\n                </span>\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"action-btn p-button-text p-button-rounded p-button-sm p-button-danger\"\n                  icon=\"pi pi-times\"\n                  title=\"Remove attachment\"\n                  (click)=\"removePendingAttachment(attachment.id)\">\n                </button>\n              </li>\n            </ul>\n            <div class=\"comment-actions\">\n              <label class=\"checkbox-field\">\n                <p-checkbox formControlName=\"isInternal\" [binary]=\"true\"></p-checkbox>\n                <span>Internal comment</span>\n              </label>\n              <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Add Comment\" [disabled]=\"!canManage()\" (click)=\"addComment()\"></button>\n            </div>\n          </form>\n        </p-tabpanel>\n\n        <p-tabpanel value=\"timeline\">\n          <div class=\"timeline-list\">\n            <article class=\"timeline-item\" *ngFor=\"let row of escalations()\">\n              <strong>{{ row.type }}</strong>\n              <span>{{ row.occurredUtc | date: 'medium' }}</span>\n              <p>{{ row.notes || 'System-generated SLA event.' }}</p>\n            </article>\n            <p *ngIf=\"!escalations().length\">No escalation events yet.</p>\n          </div>\n        </p-tabpanel>\n\n        <p-tabpanel value=\"linked\">\n          <div class=\"linked-grid\">\n            <article class=\"glass-card\">\n              <h3>Account</h3>\n              <p>{{ caseRecord()?.accountName || '-' }}</p>\n            </article>\n            <article class=\"glass-card\">\n              <h3>Contact</h3>\n              <p>{{ caseRecord()?.contactName || '-' }}</p>\n            </article>\n          </div>\n        </p-tabpanel>\n      </p-tabpanels>\n    </p-tabs>\n  </section>\n</section>\n", styles: [".helpdesk-case-page {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .hero-copy {\n    min-width: 0;\n  }\n\n  .case-header-progress {\n    --case-header-score-color: #2563eb;\n    display: flex;\n    align-items: center;\n    gap: 0.9rem;\n    margin-top: 1rem;\n    padding: 0.78rem 0.9rem;\n    border-radius: 18px;\n    border: 1px solid rgba(148, 163, 184, 0.18);\n    background:\n      radial-gradient(circle at 8% 15%, rgba(59, 130, 246, 0.14), transparent 42%),\n      radial-gradient(circle at 90% 18%, rgba(16, 185, 129, 0.11), transparent 36%),\n      linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.54),\n      0 14px 26px rgba(15, 23, 42, 0.08);\n    backdrop-filter: blur(12px) saturate(124%);\n    -webkit-backdrop-filter: blur(12px) saturate(124%);\n    max-width: 38rem;\n  }\n\n  .case-header-progress__dial {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 96px;\n    height: 96px;\n    border-radius: 20px;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n    border: 1px solid rgba(148, 163, 184, 0.14);\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.54),\n      0 10px 18px rgba(15, 23, 42, 0.05);\n  }\n\n  :host ::ng-deep .case-header-progress__knob {\n    width: 92px;\n  }\n\n  :host ::ng-deep .case-header-progress__knob .p-knob-text {\n    font-size: 1rem;\n    font-weight: 800;\n    fill: #1e293b;\n  }\n\n  .case-header-progress__content {\n    min-width: 0;\n    display: grid;\n    gap: 0.22rem;\n    align-content: center;\n  }\n\n  .case-header-progress__eyebrow {\n    font-size: 0.7rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: #64748b;\n  }\n\n  .case-header-progress__meta {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n  }\n\n  .case-header-progress__status,\n  .case-header-progress__step,\n  .case-header-progress__sla {\n    display: inline-flex;\n    align-items: center;\n    min-height: 1.8rem;\n    padding: 0.2rem 0.55rem;\n    border-radius: 999px;\n    font-size: 0.76rem;\n    font-weight: 700;\n    border: 1px solid rgba(148, 163, 184, 0.16);\n    background: rgba(255, 255, 255, 0.72);\n    color: #1e293b;\n  }\n\n  .case-header-progress__status {\n    color: #0f766e;\n    background: rgba(204, 251, 241, 0.82);\n    border-color: rgba(45, 212, 191, 0.28);\n  }\n\n  .case-header-progress__sla.healthy {\n    color: #166534;\n    background: rgba(220, 252, 231, 0.82);\n    border-color: rgba(34, 197, 94, 0.28);\n  }\n\n  .case-header-progress__sla.at-risk {\n    color: #92400e;\n    background: rgba(254, 243, 199, 0.88);\n    border-color: rgba(245, 158, 11, 0.28);\n  }\n\n  .case-header-progress__sla.breached {\n    color: #991b1b;\n    background: rgba(254, 226, 226, 0.88);\n    border-color: rgba(239, 68, 68, 0.28);\n  }\n\n  .case-header-progress__copy {\n    margin: 0;\n    color: #475569;\n    font-size: 0.82rem;\n    line-height: 1.5;\n    max-width: 30rem;\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .workspace-card {\n    padding: 1rem;\n  }\n\n  .form-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.35rem 0.45rem 0.45rem;\n    border-radius: 12px;\n    background: rgba(255, 255, 255, 0.35);\n    border: 1px solid transparent;\n    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n    > label {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-inputnumber,\n    > p-datepicker,\n    > input,\n    > textarea {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.5);\n      border-color: rgba(148, 163, 184, 0.16);\n      > label { color: #334155; }\n    }\n\n    &:focus-within {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: rgba(var(--apple-blue), 0.22);\n      box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n      > label { color: #4f46e5; }\n    }\n\n    &.full-row {\n      grid-column: 1 / -1;\n      flex-direction: column;\n      align-items: stretch;\n      > label { text-align: left; min-width: unset; }\n    }\n  }\n\n  .sla-cockpit {\n    margin-top: 0.75rem;\n  }\n\n  .sla-card {\n    padding: 0.75rem;\n  }\n\n  .sla-head {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 0.5rem;\n    margin-bottom: 0.35rem;\n  }\n\n  .sla-meta {\n    display: flex;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    font-size: 0.9rem;\n    color: var(--crm-text-muted, #64748b);\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    border-radius: 999px;\n    padding: 0.2rem 0.65rem;\n    font-size: 0.78rem;\n    font-weight: 700;\n  }\n\n  .sla-chip.healthy {\n    background: rgba(22, 163, 74, 0.14);\n    color: #166534;\n  }\n\n  .sla-chip.at-risk {\n    background: rgba(245, 158, 11, 0.18);\n    color: #92400e;\n  }\n\n  .sla-chip.breached {\n    background: rgba(239, 68, 68, 0.16);\n    color: #991b1b;\n  }\n\n  .status-actions {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex-wrap: wrap;\n    margin-top: 1rem;\n  }\n\n  .status-pill.active {\n    border-color: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 55%, white);\n    background: color-mix(in srgb, var(--crm-primary-500, #3b82f6) 14%, white);\n    color: var(--crm-primary-700, #1d4ed8);\n  }\n\n  .comment-list,\n  .timeline-list {\n    display: grid;\n    gap: 0.65rem;\n  }\n\n  .comment-item,\n  .timeline-item {\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    border-radius: 0.75rem;\n    padding: 0.75rem;\n    background: rgba(15, 23, 42, 0.08);\n  }\n\n  .comment-item header {\n    display: flex;\n    justify-content: space-between;\n    gap: 0.5rem;\n  }\n\n  .comment-form {\n    margin-top: 0.75rem;\n    display: grid;\n    gap: 0.65rem;\n  }\n\n  .comment-attachment-list,\n  .pending-attachment-list {\n    margin: 0;\n    padding-left: 0;\n    list-style: none;\n    display: grid;\n    gap: 0.35rem;\n  }\n\n  .comment-attachment-list a,\n  .pending-attachment-list li {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    color: inherit;\n    text-decoration: none;\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    border-radius: 0.55rem;\n    padding: 0.35rem 0.55rem;\n    background: rgba(15, 23, 42, 0.08);\n  }\n\n  .pending-attachment-list li {\n    justify-content: space-between;\n  }\n\n  .comment-actions {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .checkbox-field {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n  }\n\n  .linked-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 0.75rem;\n  }\n\n  @media (max-width: 960px) {\n    .hero-card {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .case-header-progress {\n      max-width: 100%;\n    }\n\n    .form-grid,\n    .linked-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .case-header-progress {\n      flex-direction: column;\n      align-items: stretch;\n    }\n\n    .case-header-progress__dial {\n      align-self: flex-start;\n    }\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpDeskCaseDetailPage, { className: "HelpDeskCaseDetailPage", filePath: "src/app/crm/features/helpdesk/pages/helpdesk-case-detail.page.ts", lineNumber: 33 }); })();
