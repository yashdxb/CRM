import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { EmailComposeDialogComponent } from '../components/email-compose-dialog.component';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/tag";
export class EmailComposePage {
    router = inject(Router);
    mailCompose = inject(MailComposeService);
    composeContext = this.mailCompose.context;
    composeMode = computed(() => this.composeContext()?.mode ?? 'new', ...(ngDevMode ? [{ debugName: "composeMode" }] : []));
    replyToEmail = computed(() => this.composeContext()?.replyToEmail ?? undefined, ...(ngDevMode ? [{ debugName: "replyToEmail" }] : []));
    goBack() {
        const returnUrl = this.composeContext()?.returnUrl ?? '/app/mailbox/inbox';
        this.mailCompose.close();
        void this.router.navigateByUrl(returnUrl);
    }
    static ɵfac = function EmailComposePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailComposePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailComposePage, selectors: [["app-email-compose-page"]], decls: 16, vars: 10, consts: [[1, "compose-page"], [1, "page-header"], [1, "page-copy"], [1, "eyebrow"], [1, "title-row"], ["severity", "info", "value", "Workspace Composer"], ["pButton", "", "type", "button", 1, "p-button-text", "back-button", 3, "click"], [1, "pi", "pi-arrow-left"], [3, "visibleChange", "visible", "embedded", "mode", "replyToEmail", "defaultToEmail", "defaultToName", "defaultSubject", "defaultRelatedEntityType", "defaultRelatedEntityId", "showRelatedEntity"]], template: function EmailComposePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "Mailbox");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4)(6, "h1");
            i0.ɵɵtext(7, "Compose Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "p-tag", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, "Create, reply, or forward email inside CRM without leaving the mailbox workspace.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "button", 6);
            i0.ɵɵlistener("click", function EmailComposePage_Template_button_click_11_listener() { return ctx.goBack(); });
            i0.ɵɵelement(12, "i", 7);
            i0.ɵɵelementStart(13, "span");
            i0.ɵɵtext(14, "Back");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "app-email-compose-dialog", 8);
            i0.ɵɵlistener("visibleChange", function EmailComposePage_Template_app_email_compose_dialog_visibleChange_15_listener($event) { return !$event ? ctx.goBack() : null; });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_4_0;
            let tmp_5_0;
            let tmp_6_0;
            let tmp_7_0;
            let tmp_8_0;
            let tmp_9_0;
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("visible", true)("embedded", true)("mode", ctx.composeMode())("replyToEmail", ctx.replyToEmail())("defaultToEmail", ((tmp_4_0 = ctx.composeContext()) == null ? null : tmp_4_0.toEmail) ?? "")("defaultToName", ((tmp_5_0 = ctx.composeContext()) == null ? null : tmp_5_0.toName) ?? "")("defaultSubject", ((tmp_6_0 = ctx.composeContext()) == null ? null : tmp_6_0.subject) ?? "")("defaultRelatedEntityType", (tmp_7_0 = ctx.composeContext()) == null ? null : tmp_7_0.relatedEntityType)("defaultRelatedEntityId", (tmp_8_0 = ctx.composeContext()) == null ? null : tmp_8_0.relatedEntityId)("showRelatedEntity", ((tmp_9_0 = ctx.composeContext()) == null ? null : tmp_9_0.showRelatedEntity) ?? true);
        } }, dependencies: [CommonModule, ButtonModule, i1.ButtonDirective, TagModule, i2.Tag, EmailComposeDialogComponent], styles: [".compose-page[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n      padding: 1.25rem;\n      max-width: 1180px;\n      margin: 0 auto;\n    }\n\n    .page-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 1rem;\n      padding: 1.25rem 1.5rem;\n      background: #fff;\n      border: 1px solid #e5e7eb;\n      border-radius: 16px;\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n    }\n\n    .page-copy[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n    }\n\n    .eyebrow[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #2563eb;\n    }\n\n    .title-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    h1[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 1.75rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    p[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #64748b;\n      max-width: 58rem;\n    }\n\n    .back-button[_ngcontent-%COMP%] {\n      color: #334155;\n      white-space: nowrap;\n    }\n\n    @media (max-width: 960px) {\n      .compose-page[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .page-header[_ngcontent-%COMP%] {\n        flex-direction: column;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailComposePage, [{
        type: Component,
        args: [{ selector: 'app-email-compose-page', standalone: true, imports: [CommonModule, ButtonModule, TagModule, EmailComposeDialogComponent], template: `
    <div class="compose-page">
      <header class="page-header">
        <div class="page-copy">
          <span class="eyebrow">Mailbox</span>
          <div class="title-row">
            <h1>Compose Email</h1>
            <p-tag severity="info" value="Workspace Composer"></p-tag>
          </div>
          <p>Create, reply, or forward email inside CRM without leaving the mailbox workspace.</p>
        </div>
        <button pButton type="button" class="p-button-text back-button" (click)="goBack()">
          <i class="pi pi-arrow-left"></i>
          <span>Back</span>
        </button>
      </header>

      <app-email-compose-dialog
        [visible]="true"
        [embedded]="true"
        [mode]="composeMode()"
        [replyToEmail]="replyToEmail()"
        [defaultToEmail]="composeContext()?.toEmail ?? ''"
        [defaultToName]="composeContext()?.toName ?? ''"
        [defaultSubject]="composeContext()?.subject ?? ''"
        [defaultRelatedEntityType]="composeContext()?.relatedEntityType"
        [defaultRelatedEntityId]="composeContext()?.relatedEntityId"
        [showRelatedEntity]="composeContext()?.showRelatedEntity ?? true"
        (visibleChange)="!$event ? goBack() : null"
      ></app-email-compose-dialog>
    </div>
  `, styles: ["\n    .compose-page {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n      padding: 1.25rem;\n      max-width: 1180px;\n      margin: 0 auto;\n    }\n\n    .page-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 1rem;\n      padding: 1.25rem 1.5rem;\n      background: #fff;\n      border: 1px solid #e5e7eb;\n      border-radius: 16px;\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);\n    }\n\n    .page-copy {\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n    }\n\n    .eyebrow {\n      font-size: 0.78rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #2563eb;\n    }\n\n    .title-row {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    h1 {\n      margin: 0;\n      font-size: 1.75rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    p {\n      margin: 0;\n      color: #64748b;\n      max-width: 58rem;\n    }\n\n    .back-button {\n      color: #334155;\n      white-space: nowrap;\n    }\n\n    @media (max-width: 960px) {\n      .compose-page {\n        padding: 1rem;\n      }\n\n      .page-header {\n        flex-direction: column;\n      }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailComposePage, { className: "EmailComposePage", filePath: "src/app/crm/features/emails/pages/email-compose.page.ts", lineNumber: 117 }); })();
