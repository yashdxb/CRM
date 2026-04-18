import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, inject, HostListener, ElementRef, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MailboxService } from '../services/mailbox.service';
import { CrmEmailLinkService } from '../services/crm-email-link.service';
import { UiStateService } from '../../../../core/ui-state/ui-state.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/api";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/select";
import * as i5 from "primeng/tooltip";
const _c0 = () => [1, 2, 3, 4, 5];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.email;
function EmailsPage_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("(", ctx_r0.unreadInFolder(), " unread)");
} }
function EmailsPage_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); ctx_r0.searchTerm = ""; return i0.ɵɵresetView(ctx_r0.onSearch()); });
    i0.ɵɵelement(1, "i", 19);
    i0.ɵɵelementEnd();
} }
function EmailsPage_Conditional_31_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "div", 33);
    i0.ɵɵelementStart(2, "div", 34);
    i0.ɵɵelement(3, "div", 35)(4, "div", 36)(5, "div", 37);
    i0.ɵɵelementEnd()();
} }
function EmailsPage_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵrepeaterCreate(1, EmailsPage_Conditional_31_For_2_Template, 6, 0, "div", 32, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function EmailsPage_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 38);
    i0.ɵɵelement(2, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No emails");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Your ", ((tmp_1_0 = ctx_r0.currentFolderData()) == null ? null : tmp_1_0.name) || "folder", " is empty");
} }
function EmailsPage_Conditional_33_For_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 44);
} if (rf & 2) {
    const email_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", email_r4.from.avatarUrl, i0.ɵɵsanitizeUrl)("alt", email_r4.from.name || email_r4.from.email);
} }
function EmailsPage_Conditional_33_For_1_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const email_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.mailbox.getInitials(email_r4.from.name || email_r4.from.email), " ");
} }
function EmailsPage_Conditional_33_For_1_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 50);
} }
function EmailsPage_Conditional_33_For_1_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 51);
} }
function EmailsPage_Conditional_33_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_33_For_1_Template_div_click_0_listener() { const email_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectEmail(email_r4)); });
    i0.ɵɵelementStart(1, "button", 42);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_33_For_1_Template_button_click_1_listener($event) { const email_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleStar($event, email_r4)); });
    i0.ɵɵelement(2, "i", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 43);
    i0.ɵɵconditionalCreate(4, EmailsPage_Conditional_33_For_1_Conditional_4_Template, 1, 2, "img", 44)(5, EmailsPage_Conditional_33_For_1_Conditional_5_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 45)(7, "div", 46)(8, "span", 47);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 48);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 49);
    i0.ɵɵconditionalCreate(13, EmailsPage_Conditional_33_For_1_Conditional_13_Template, 1, 0, "i", 50);
    i0.ɵɵconditionalCreate(14, EmailsPage_Conditional_33_For_1_Conditional_14_Template, 1, 0, "i", 51);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 52);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 53)(19, "button", 54);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_33_For_1_Template_button_click_19_listener($event) { const email_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.archiveEmail($event, email_r4)); });
    i0.ɵɵelement(20, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 55);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_33_For_1_Template_button_click_21_listener($event) { const email_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteEmail($event, email_r4)); });
    i0.ɵɵelement(22, "i", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 57);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_33_For_1_Template_button_click_23_listener($event) { const email_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markAsRead($event, email_r4)); });
    i0.ɵɵelement(24, "i", 7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const email_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", email_r4.id === ctx_r0.mailbox.selectedEmailId())("unread", !email_r4.isRead)("starred", email_r4.isStarred)("high-priority", email_r4.priority === "high");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", email_r4.isStarred ? "pi-star-fill" : "pi-star");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(email_r4.from.avatarUrl ? 4 : 5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(email_r4.from.name || email_r4.from.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mailbox.formatEmailDate(email_r4.receivedAtUtc));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(email_r4.priority === "high" ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(email_r4.hasAttachments ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", email_r4.subject, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(email_r4.snippet);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("pTooltip", email_r4.isRead ? "Mark unread" : "Mark read");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", email_r4.isRead ? "pi-envelope" : "pi-envelope-open");
} }
function EmailsPage_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, EmailsPage_Conditional_33_For_1_Template, 25, 18, "div", 40, _forTrack0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r0.emails());
} }
function EmailsPage_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵlistener("mousedown", function EmailsPage_Conditional_34_Template_div_mousedown_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.startResize($event)); });
    i0.ɵɵelement(1, "div", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("pane-divider--horizontal", ctx_r0.readingPanePosition === "bottom");
} }
function EmailsPage_Conditional_35_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Select an email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Choose an email from the list to read it here");
    i0.ɵɵelementEnd()();
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 50);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 44);
} if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", (tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.from == null ? null : tmp_3_0.from.avatarUrl, i0.ɵɵsanitizeUrl)("alt", (tmp_4_0 = ctx_r0.selectedEmail()) == null ? null : tmp_4_0.from == null ? null : tmp_4_0.from.name);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.mailbox.getInitials(((tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.from == null ? null : tmp_3_0.from.name) || ((tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.from == null ? null : tmp_3_0.from.email) || ""), " ");
} }
function EmailsPage_Conditional_35_Conditional_2_For_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const recipient_r7 = ctx.$implicit;
    const ɵ$index_257_r8 = ctx.$index;
    const ɵ$count_257_r9 = ctx.$count;
    i0.ɵɵtextInterpolate2(" ", recipient_r7.name || recipient_r7.email, "", ɵ$index_257_r8 === ɵ$count_257_r9 - 1 ? "" : ", ", " ");
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_52_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const recipient_r10 = ctx.$implicit;
    const ɵ$index_265_r11 = ctx.$index;
    const ɵ$count_265_r12 = ctx.$count;
    i0.ɵɵtextInterpolate2(" ", recipient_r10.name || recipient_r10.email, "", ɵ$index_265_r11 === ɵ$count_265_r12 - 1 ? "" : ", ", " ");
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89)(1, "span", 90);
    i0.ɵɵtext(2, "Cc:");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, EmailsPage_Conditional_35_Conditional_2_Conditional_52_For_4_Template, 1, 2, null, null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater((tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.cc);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_53_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 98);
    i0.ɵɵelement(1, "i", 99);
    i0.ɵɵelementStart(2, "div", 100)(3, "span", 101);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 102);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "a", 103);
    i0.ɵɵelement(8, "i", 104);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const attachment_r13 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(attachment_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.mailbox.formatFileSize(attachment_r13.size));
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", ctx_r0.mailbox.getAttachmentUrl(ctx_r0.selectedEmail(), attachment_r13.id), i0.ɵɵsanitizeUrl);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91)(1, "div", 95);
    i0.ɵɵelement(2, "i", 96);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 97);
    i0.ɵɵrepeaterCreate(6, EmailsPage_Conditional_35_Conditional_2_Conditional_53_For_7_Template, 9, 3, "div", 98, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r0.selectedEmail().attachments.length, " Attachment(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater((tmp_4_0 = ctx_r0.selectedEmail()) == null ? null : tmp_4_0.attachments);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 92)(1, "iframe", 105);
    i0.ɵɵlistener("load", function EmailsPage_Conditional_35_Conditional_2_Conditional_54_Template_iframe_load_1_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.onEmailFrameLoad($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("srcdoc", ctx_r0.renderedEmailBody(), i0.ɵɵsanitizeHtml);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 93);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate((tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.textBody);
} }
function EmailsPage_Conditional_35_Conditional_2_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵtext(1, "No email body available yet. Try refresh if this message was just synced.");
    i0.ɵɵelementEnd();
} }
function EmailsPage_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 63)(1, "div", 64)(2, "div", 65)(3, "button", 66);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.replyToSelected(false)); });
    i0.ɵɵelement(4, "i", 67);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Reply");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 68);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.replyToSelected(true)); });
    i0.ɵɵelement(8, "i", 67);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Reply All");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 69);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.forwardSelected()); });
    i0.ɵɵelement(12, "i", 70);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Forward");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 71)(16, "button", 72);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openLinkDialog()); });
    i0.ɵɵelement(17, "i", 73);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Link");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "button", 74);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.archiveSelected()); });
    i0.ɵɵelement(21, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 75);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markSpamSelected()); });
    i0.ɵɵelement(23, "i", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 77);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteSelected()); });
    i0.ɵɵelement(25, "i", 56);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(26, "div", 78)(27, "div", 79)(28, "h2", 80);
    i0.ɵɵconditionalCreate(29, EmailsPage_Conditional_35_Conditional_2_Conditional_29_Template, 1, 0, "i", 50);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 81)(32, "div", 82);
    i0.ɵɵconditionalCreate(33, EmailsPage_Conditional_35_Conditional_2_Conditional_33_Template, 1, 2, "img", 44)(34, EmailsPage_Conditional_35_Conditional_2_Conditional_34_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 83)(36, "div", 84)(37, "span", 47);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 85);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_35_Conditional_2_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleStarSelected()); });
    i0.ɵɵelement(40, "i", 7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "span", 86);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "span", 87);
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 88)(47, "div", 89)(48, "span", 90);
    i0.ɵɵtext(49, "To:");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(50, EmailsPage_Conditional_35_Conditional_2_For_51_Template, 1, 2, null, null, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(52, EmailsPage_Conditional_35_Conditional_2_Conditional_52_Template, 5, 0, "div", 89);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(53, EmailsPage_Conditional_35_Conditional_2_Conditional_53_Template, 8, 1, "div", 91);
    i0.ɵɵconditionalCreate(54, EmailsPage_Conditional_35_Conditional_2_Conditional_54_Template, 2, 1, "div", 92)(55, EmailsPage_Conditional_35_Conditional_2_Conditional_55_Template, 2, 1, "div", 93)(56, EmailsPage_Conditional_35_Conditional_2_Conditional_56_Template, 2, 0, "div", 94);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_12_0;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(29);
    i0.ɵɵconditional(((tmp_2_0 = ctx_r0.selectedEmail()) == null ? null : tmp_2_0.priority) === "high" ? 29 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_3_0 = ctx_r0.selectedEmail()) == null ? null : tmp_3_0.subject, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(((tmp_4_0 = ctx_r0.selectedEmail()) == null ? null : tmp_4_0.from == null ? null : tmp_4_0.from.avatarUrl) ? 33 : 34);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(((tmp_5_0 = ctx_r0.selectedEmail()) == null ? null : tmp_5_0.from == null ? null : tmp_5_0.from.name) || ((tmp_5_0 = ctx_r0.selectedEmail()) == null ? null : tmp_5_0.from == null ? null : tmp_5_0.from.email));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ((tmp_6_0 = ctx_r0.selectedEmail()) == null ? null : tmp_6_0.isStarred) ? "pi-star-fill" : "pi-star");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_7_0 = ctx_r0.selectedEmail()) == null ? null : tmp_7_0.from == null ? null : tmp_7_0.from.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(45, 10, (tmp_8_0 = ctx_r0.selectedEmail()) == null ? null : tmp_8_0.receivedAtUtc, "medium"));
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater((tmp_9_0 = ctx_r0.selectedEmail()) == null ? null : tmp_9_0.to);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(((tmp_10_0 = ctx_r0.selectedEmail()) == null ? null : tmp_10_0.cc) && ctx_r0.selectedEmail().cc.length > 0 ? 52 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(((tmp_11_0 = ctx_r0.selectedEmail()) == null ? null : tmp_11_0.hasAttachments) && ((tmp_11_0 = ctx_r0.selectedEmail()) == null ? null : tmp_11_0.attachments) ? 53 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.renderedEmailBody() ? 54 : ((tmp_12_0 = ctx_r0.selectedEmail()) == null ? null : tmp_12_0.textBody) ? 55 : 56);
} }
function EmailsPage_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 60);
    i0.ɵɵconditionalCreate(1, EmailsPage_Conditional_35_Conditional_1_Template, 6, 0, "div", 61)(2, EmailsPage_Conditional_35_Conditional_2_Template, 57, 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("reading-pane-empty", !ctx_r0.selectedEmail());
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.selectedEmail() ? 1 : 2);
} }
function EmailsPage_Conditional_36_ng_template_17_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 121);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r16.subtitle);
} }
function EmailsPage_Conditional_36_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 119)(1, "span", 120);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, EmailsPage_Conditional_36_ng_template_17_Conditional_3_Template, 2, 1, "small", 121);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r16.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r16.subtitle ? 3 : -1);
} }
function EmailsPage_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_36_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeLinkDialog()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "div", 107)(2, "div", 108)(3, "h3");
    i0.ɵɵelement(4, "i", 73);
    i0.ɵɵtext(5, " Link to CRM Record");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 109);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_36_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeLinkDialog()); });
    i0.ɵɵelement(7, "i", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 110)(9, "div", 111)(10, "label");
    i0.ɵɵtext(11, "Entity Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p-select", 112);
    i0.ɵɵtwoWayListener("ngModelChange", function EmailsPage_Conditional_36_Template_p_select_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.linkEntityType, $event) || (ctx_r0.linkEntityType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function EmailsPage_Conditional_36_Template_p_select_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onLinkEntityTypeChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 111)(14, "label");
    i0.ɵɵtext(15, "Record Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p-select", 113);
    i0.ɵɵtwoWayListener("ngModelChange", function EmailsPage_Conditional_36_Template_p_select_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.linkEntityId, $event) || (ctx_r0.linkEntityId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(17, EmailsPage_Conditional_36_ng_template_17_Template, 4, 2, "ng-template", 114);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 111)(19, "label");
    i0.ɵɵtext(20, "Note (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 115);
    i0.ɵɵtwoWayListener("ngModelChange", function EmailsPage_Conditional_36_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.linkNote, $event) || (ctx_r0.linkNote = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 116)(23, "button", 117);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_36_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeLinkDialog()); });
    i0.ɵɵtext(24, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 118);
    i0.ɵɵlistener("click", function EmailsPage_Conditional_36_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.linkEmailToCrm()); });
    i0.ɵɵelement(26, "i", 73);
    i0.ɵɵtext(27, " Link Email ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("options", ctx_r0.linkEntityTypeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.linkEntityType);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r0.linkRecordOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.linkEntityId);
    i0.ɵɵproperty("filter", true)("loading", ctx_r0.linkRecordLoading)("disabled", !ctx_r0.linkEntityType);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.linkNote);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r0.linkEntityType || !ctx_r0.linkEntityId);
} }
export class EmailsPage {
    mailbox = inject(MailboxService);
    crmLinkService = inject(CrmEmailLinkService);
    toastService = inject(AppToastService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    elementRef = inject(ElementRef);
    uiState = inject(UiStateService);
    sanitizer = inject(DomSanitizer);
    mailCompose = inject(MailComposeService);
    routeSub;
    // State
    folders = this.mailbox.folders;
    emails = this.mailbox.emails;
    selectedEmail = this.mailbox.selectedEmail;
    loading = this.mailbox.loading;
    currentFolder = this.mailbox.currentFolder;
    stats = this.mailbox.stats;
    searchTerm = '';
    readingPanePosition = 'right';
    // CRM Link state
    showLinkDialog = false;
    linkEntityType = '';
    linkEntityId = '';
    linkRecordOptions = [];
    linkRecordLoading = false;
    linkNote = '';
    linkEntityTypeOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Customer', value: 'Account' },
        { label: 'Opportunity', value: 'Opportunity' }
    ];
    // Resize state
    isResizing = false;
    resizeStartX = 0;
    resizeStartY = 0;
    initialPaneSize = 0;
    // Computed
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.emailsManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    currentFolderData = computed(() => {
        return this.folders().find(f => f.type === this.currentFolder()) || null;
    }, ...(ngDevMode ? [{ debugName: "currentFolderData" }] : []));
    unreadInFolder = computed(() => {
        return this.emails().filter(e => !e.isRead).length;
    }, ...(ngDevMode ? [{ debugName: "unreadInFolder" }] : []));
    // Keyboard shortcut handling
    handleKeyboard(event) {
        const target = event.target;
        if (!target) {
            return;
        }
        const tagName = target.tagName;
        const typingInEditor = tagName === 'INPUT' ||
            tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            !!target.closest('.ql-editor, .p-editor-container, [contenteditable=\"true\"], [role=\"textbox\"]');
        if (typingInEditor) {
            return;
        }
        const email = this.selectedEmail();
        switch (event.key) {
            case 'n':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.openCompose();
                }
                break;
            case 'r':
                if (email && (event.ctrlKey || event.metaKey)) {
                    event.preventDefault();
                    this.replyToSelected(event.shiftKey);
                }
                break;
            case 'Delete':
            case 'Backspace':
                if (email && !event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    this.deleteSelected();
                }
                break;
            case 'e':
                if (email) {
                    event.preventDefault();
                    this.archiveSelected();
                }
                break;
            case 's':
                if (email && !event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    this.toggleStarSelected();
                }
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                this.navigateEmails(event.key === 'ArrowUp' ? -1 : 1);
                break;
        }
    }
    ngOnInit() {
        // Subscribe to route data changes to switch folders
        this.routeSub = this.route.data.subscribe(data => {
            const folder = data['folder'];
            if (folder && folder !== this.currentFolder()) {
                this.mailbox.selectFolder(folder);
            }
        });
        this.mailbox.loadStats();
        this.mailbox.loadEmails();
        // Load saved layout preferences
        this.uiState.get('mailbox-layout').subscribe(prefs => {
            if (prefs) {
                this.readingPanePosition = prefs.readingPanePosition;
                const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
                if (container) {
                    if (prefs.listPaneWidth) {
                        container.style.setProperty('--list-pane-width', `${prefs.listPaneWidth}px`);
                    }
                    if (prefs.listPaneHeight) {
                        container.style.setProperty('--list-pane-height', `${prefs.listPaneHeight}px`);
                    }
                }
            }
        });
    }
    ngOnDestroy() {
        this.routeSub?.unsubscribe();
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // FOLDER ACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    selectFolder(folder) {
        // Navigate to the folder route instead of just changing state
        this.router.navigate(['/app/mailbox', folder.type]);
        this.searchTerm = '';
    }
    getFolderRoute(folder) {
        return ['/app/mailbox', folder.type];
    }
    getFolderIcon(folder) {
        return folder.icon || 'pi-folder';
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // EMAIL LIST ACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    selectEmail(email) {
        this.mailbox.selectEmail(email.id);
    }
    renderedEmailBody() {
        const html = this.selectedEmail()?.htmlBody?.trim();
        if (!html) {
            return null;
        }
        return this.normalizeEmailHtml(html);
    }
    onEmailFrameLoad(event) {
        const frame = event.target;
        const doc = frame?.contentDocument;
        if (!frame || !doc) {
            return;
        }
        const body = doc.body;
        const html = doc.documentElement;
        const height = Math.max(body?.scrollHeight ?? 0, body?.offsetHeight ?? 0, html?.scrollHeight ?? 0, html?.offsetHeight ?? 0, 480);
        frame.style.height = `${Math.ceil(height)}px`;
    }
    toggleStar(event, email) {
        event.stopPropagation();
        this.mailbox.toggleStar(email.id);
    }
    markAsRead(event, email) {
        event.stopPropagation();
        this.mailbox.markAsRead(email.id, !email.isRead);
    }
    deleteEmail(event, email) {
        event.stopPropagation();
        this.mailbox.deleteEmail(email.id);
        this.toastService.show('success', 'Email moved to Trash');
    }
    archiveEmail(event, email) {
        event.stopPropagation();
        this.mailbox.archiveEmail(email.id);
        this.toastService.show('success', 'Email archived');
    }
    onSearch() {
        this.mailbox.searchEmails({
            folderType: this.currentFolder(),
            search: this.searchTerm
        }).subscribe(response => {
            this.mailbox.emails.set(response.items);
        });
    }
    refreshEmails() {
        this.mailbox.refreshFromProvider();
        this.toastService.show('success', 'Mailbox refreshed');
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // READING PANE ACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    replyToSelected(replyAll = false) {
        const email = this.selectedEmail();
        if (email) {
            this.mailCompose.open({
                mode: replyAll ? 'replyAll' : 'reply',
                replyToEmail: email
            });
        }
    }
    forwardSelected() {
        const email = this.selectedEmail();
        if (email) {
            this.mailCompose.open({
                mode: 'forward',
                replyToEmail: email
            });
        }
    }
    deleteSelected() {
        const email = this.selectedEmail();
        if (email) {
            this.mailbox.deleteEmail(email.id);
            this.toastService.show('success', 'Email moved to Trash');
        }
    }
    archiveSelected() {
        const email = this.selectedEmail();
        if (email) {
            this.mailbox.archiveEmail(email.id);
            this.toastService.show('success', 'Email archived');
        }
    }
    toggleStarSelected() {
        const email = this.selectedEmail();
        if (email) {
            this.mailbox.toggleStar(email.id);
        }
    }
    markSpamSelected() {
        const email = this.selectedEmail();
        if (email) {
            this.mailbox.markAsSpam(email.id);
            this.toastService.show('success', 'Email marked as spam');
        }
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // COMPOSE ACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    openCompose() {
        this.mailCompose.open();
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // CRM LINK ACTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    openLinkDialog() {
        this.linkEntityType = '';
        this.linkEntityId = '';
        this.linkRecordOptions = [];
        this.linkNote = '';
        this.showLinkDialog = true;
    }
    closeLinkDialog() {
        this.showLinkDialog = false;
    }
    onLinkEntityTypeChange(entityType) {
        this.linkEntityType = entityType;
        this.linkEntityId = '';
        this.linkRecordOptions = [];
        if (!entityType) {
            return;
        }
        this.linkRecordLoading = true;
        this.crmLinkService.getRecordOptions(entityType).subscribe({
            next: (options) => {
                this.linkRecordOptions = options;
                this.linkRecordLoading = false;
            },
            error: () => {
                this.linkRecordLoading = false;
                this.toastService.show('error', 'Failed to load CRM records');
            }
        });
    }
    linkEmailToCrm() {
        const email = this.selectedEmail();
        if (!email || !this.linkEntityType || !this.linkEntityId)
            return;
        this.crmLinkService.linkEmail({
            connectionId: email.connectionId,
            externalMessageId: email.externalId,
            conversationId: email.conversationId,
            subject: email.subject,
            fromEmail: email.from.email,
            fromName: email.from.name,
            receivedAtUtc: email.receivedAtUtc,
            relatedEntityType: this.linkEntityType,
            relatedEntityId: this.linkEntityId,
            note: this.linkNote || undefined
        }).subscribe({
            next: () => {
                this.toastService.show('success', 'Email linked to CRM record');
                this.closeLinkDialog();
            },
            error: () => {
                this.toastService.show('error', 'Failed to link email');
            }
        });
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════════
    navigateEmails(direction) {
        const emailList = this.emails();
        const currentId = this.mailbox.selectedEmailId();
        const currentIndex = emailList.findIndex(e => e.id === currentId);
        const newIndex = Math.max(0, Math.min(emailList.length - 1, currentIndex + direction));
        if (emailList[newIndex]) {
            this.selectEmail(emailList[newIndex]);
        }
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // UI STATE
    // ═══════════════════════════════════════════════════════════════════════════
    setReadingPanePosition(position) {
        this.readingPanePosition = position;
        if (position === 'off') {
            this.mailbox.selectedEmailId.set(null);
        }
        // Persist reading pane position preference
        const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
        const listPane = container?.querySelector('.email-list-pane');
        const prefs = {
            listPaneWidth: listPane?.offsetWidth || 380,
            listPaneHeight: listPane?.offsetHeight || 300,
            readingPanePosition: position
        };
        this.uiState.set('mailbox-layout', prefs).subscribe();
    }
    closeReadingPane() {
        this.mailbox.selectedEmailId.set(null);
    }
    // ═══════════════════════════════════════════════════════════════════════════
    // PANE RESIZE
    // ═══════════════════════════════════════════════════════════════════════════
    startResize(event) {
        event.preventDefault();
        this.isResizing = true;
        this.resizeStartX = event.clientX;
        this.resizeStartY = event.clientY;
        const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
        if (container) {
            container.classList.add('resizing');
            if (this.readingPanePosition === 'bottom') {
                const listPane = container.querySelector('.email-list-pane');
                this.initialPaneSize = listPane?.offsetHeight || container.offsetHeight * 0.5;
            }
            else {
                const listPane = container.querySelector('.email-list-pane');
                this.initialPaneSize = listPane?.offsetWidth || 380;
            }
        }
        // Add global listeners for drag
        document.addEventListener('mousemove', this.onResize);
        document.addEventListener('mouseup', this.stopResize);
    }
    onResize = (event) => {
        if (!this.isResizing)
            return;
        const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
        if (!container)
            return;
        if (this.readingPanePosition === 'bottom') {
            // Vertical resize
            const delta = event.clientY - this.resizeStartY;
            const newHeight = Math.max(150, Math.min(this.initialPaneSize + delta, container.offsetHeight - 150));
            container.style.setProperty('--list-pane-height', `${newHeight}px`);
        }
        else {
            // Horizontal resize
            const delta = event.clientX - this.resizeStartX;
            const newWidth = Math.max(280, Math.min(this.initialPaneSize + delta, container.offsetWidth - 300));
            container.style.setProperty('--list-pane-width', `${newWidth}px`);
        }
    };
    stopResize = () => {
        this.isResizing = false;
        const container = this.elementRef.nativeElement.querySelector('.mailbox-container');
        if (container) {
            container.classList.remove('resizing');
            // Save layout preferences to server
            const listPane = container.querySelector('.email-list-pane');
            const prefs = {
                listPaneWidth: listPane?.offsetWidth || 380,
                listPaneHeight: listPane?.offsetHeight || 300,
                readingPanePosition: this.readingPanePosition
            };
            this.uiState.set('mailbox-layout', prefs).subscribe();
        }
        document.removeEventListener('mousemove', this.onResize);
        document.removeEventListener('mouseup', this.stopResize);
    };
    // ═══════════════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════════════
    getInitials(email) {
        return this.mailbox.getInitials(email.from.name, email.from.email);
    }
    formatDate(dateStr) {
        return this.mailbox.formatEmailDate(dateStr);
    }
    formatFullDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }
    formatFileSize(bytes) {
        return this.mailbox.formatFileSize(bytes);
    }
    getPriorityIcon(email) {
        return email.priority === 'high' ? 'pi-exclamation-circle' : '';
    }
    trackByEmail(index, email) {
        return email.id;
    }
    trackByFolder(index, folder) {
        return folder.id;
    }
    normalizeEmailHtml(html) {
        const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, html) ?? html;
        const parser = new DOMParser();
        const sourceDoc = parser.parseFromString(sanitized, 'text/html');
        sourceDoc.querySelectorAll('script, base').forEach(node => node.remove());
        sourceDoc.querySelectorAll('*').forEach(node => {
            for (const attr of [...node.attributes]) {
                if (attr.name.toLowerCase().startsWith('on')) {
                    node.removeAttribute(attr.name);
                }
            }
        });
        const bodyContent = sourceDoc.body?.innerHTML?.trim() || sanitized;
        const headContent = sourceDoc.head?.innerHTML?.trim() ?? '';
        return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${headContent}
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
      }

      body {
        color: #334155;
        font-family: "Segoe UI", Inter, Arial, sans-serif;
        line-height: 1.6;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      table {
        max-width: 100%;
      }

      a {
        color: #2563eb;
      }
    </style>
  </head>
  <body>
    ${bodyContent}
  </body>
</html>`;
    }
    static ɵfac = function EmailsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailsPage, selectors: [["app-emails-page"]], hostBindings: function EmailsPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function EmailsPage_keydown_HostBindingHandler($event) { return ctx.handleKeyboard($event); }, i0.ɵɵresolveDocument);
        } }, decls: 37, vars: 23, consts: [[1, "mailbox-container"], [1, "email-list-pane"], [1, "list-header"], [1, "header-left"], [1, "compose-btn", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "folder-title"], [1, "pi", 3, "ngClass"], [1, "email-count"], [1, "unread-count"], [1, "header-actions"], ["pTooltip", "Refresh", 1, "action-btn", 3, "click"], [1, "pi", "pi-refresh"], [1, "view-toggle"], ["pTooltip", "Reading pane right", 1, "view-btn", 3, "click"], [1, "pi", "pi-window-maximize"], ["pTooltip", "Reading pane bottom", 1, "view-btn", 3, "click"], [1, "pi", "pi-minus"], ["pTooltip", "Reading pane off", 1, "view-btn", 3, "click"], [1, "pi", "pi-times"], [1, "search-bar"], [1, "p-inputgroup", "search-input"], [1, "p-inputgroup-addon"], [1, "pi", "pi-search"], ["type", "text", "pInputText", "", "placeholder", "Search emails...", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "p-inputgroup-addon", "clear-btn"], [1, "email-list"], [1, "skeleton-list"], [1, "empty-state"], [1, "pane-divider", 3, "pane-divider--horizontal"], [1, "reading-pane", 3, "reading-pane-empty"], [1, "p-inputgroup-addon", "clear-btn", 3, "click"], [1, "skeleton-email"], [1, "skeleton-avatar"], [1, "skeleton-content"], [1, "skeleton-line", "skeleton-name"], [1, "skeleton-line", "skeleton-subject"], [1, "skeleton-line", "skeleton-snippet"], [1, "empty-icon"], [1, "pi", "pi-inbox"], [1, "email-item", 3, "selected", "unread", "starred", "high-priority"], [1, "email-item", 3, "click"], [1, "star-btn", 3, "click"], [1, "email-avatar"], [3, "src", "alt"], [1, "email-content"], [1, "email-header"], [1, "sender-name"], [1, "email-date"], [1, "email-subject"], [1, "pi", "pi-exclamation-circle", "priority-icon"], [1, "pi", "pi-paperclip", "attachment-icon"], [1, "email-snippet"], [1, "email-actions"], ["pTooltip", "Archive", 1, "quick-action", 3, "click"], ["pTooltip", "Delete", 1, "quick-action", 3, "click"], [1, "pi", "pi-trash"], [1, "quick-action", 3, "click", "pTooltip"], [1, "pane-divider", 3, "mousedown"], [1, "divider-handle"], [1, "reading-pane"], [1, "empty-reading"], [1, "pi", "pi-envelope"], [1, "reading-header"], [1, "reading-toolbar"], [1, "toolbar-left"], ["pTooltip", "Reply", 1, "toolbar-btn", 3, "click"], [1, "pi", "pi-reply"], ["pTooltip", "Reply All", 1, "toolbar-btn", 3, "click"], ["pTooltip", "Forward", 1, "toolbar-btn", 3, "click"], [1, "pi", "pi-arrow-right"], [1, "toolbar-right"], ["pTooltip", "Link to CRM Record", 1, "toolbar-btn", "crm-link-btn", 3, "click"], [1, "pi", "pi-link"], ["pTooltip", "Archive", 1, "toolbar-btn", 3, "click"], ["pTooltip", "Mark as Spam", 1, "toolbar-btn", 3, "click"], [1, "pi", "pi-ban"], ["pTooltip", "Delete", 1, "toolbar-btn", "delete", 3, "click"], [1, "reading-content"], [1, "email-detail-header"], [1, "email-subject-title"], [1, "sender-section"], [1, "sender-avatar"], [1, "sender-info"], [1, "sender-name-line"], [1, "star-btn-header", 3, "click"], [1, "sender-email"], [1, "email-datetime"], [1, "recipients-section"], [1, "recipient-line"], [1, "label"], [1, "attachments-section"], [1, "email-body", "email-body--html"], [1, "email-body", "email-body--plain"], [1, "email-body", "email-body--empty"], [1, "attachments-header"], [1, "pi", "pi-paperclip"], [1, "attachment-list"], [1, "attachment-item"], [1, "pi", "pi-file"], [1, "attachment-info"], [1, "attachment-name"], [1, "attachment-size"], ["target", "_blank", "pTooltip", "Download", 1, "download-btn", 3, "href"], [1, "pi", "pi-download"], ["sandbox", "allow-popups allow-popups-to-escape-sandbox", "title", "Email content", 1, "email-body-frame", 3, "load"], [1, "crm-link-overlay", 3, "click"], [1, "crm-link-dialog"], [1, "crm-link-dialog-header"], [1, "close-btn", 3, "click"], [1, "crm-link-dialog-body"], [1, "link-field"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Select type", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "options", "ngModel"], ["optionLabel", "label", "optionValue", "id", "placeholder", "Select a record", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "options", "ngModel", "filter", "loading", "disabled"], ["pTemplate", "item"], ["pInputText", "", "placeholder", "Add a note...", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "crm-link-dialog-footer"], [1, "toolbar-btn", 3, "click"], [1, "toolbar-btn", "crm-link-btn", 3, "click", "disabled"], [1, "entity-record-option"], [1, "entity-record-option__label"], [1, "entity-record-option__subtitle"]], template: function EmailsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "header", 2)(3, "div", 3)(4, "button", 4);
            i0.ɵɵlistener("click", function EmailsPage_Template_button_click_4_listener() { return ctx.openCompose(); });
            i0.ɵɵelement(5, "i", 5);
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "Compose");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "h2", 6);
            i0.ɵɵelement(9, "i", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12);
            i0.ɵɵconditionalCreate(13, EmailsPage_Conditional_13_Template, 2, 1, "span", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10)(15, "button", 11);
            i0.ɵɵlistener("click", function EmailsPage_Template_button_click_15_listener() { return ctx.refreshEmails(); });
            i0.ɵɵelement(16, "i", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 13)(18, "button", 14);
            i0.ɵɵlistener("click", function EmailsPage_Template_button_click_18_listener() { return ctx.readingPanePosition = "right"; });
            i0.ɵɵelement(19, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 16);
            i0.ɵɵlistener("click", function EmailsPage_Template_button_click_20_listener() { return ctx.readingPanePosition = "bottom"; });
            i0.ɵɵelement(21, "i", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 18);
            i0.ɵɵlistener("click", function EmailsPage_Template_button_click_22_listener() { return ctx.readingPanePosition = "off"; });
            i0.ɵɵelement(23, "i", 19);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(24, "div", 20)(25, "div", 21)(26, "span", 22);
            i0.ɵɵelement(27, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "input", 24);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailsPage_Template_input_ngModelChange_28_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("keyup.enter", function EmailsPage_Template_input_keyup_enter_28_listener() { return ctx.onSearch(); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(29, EmailsPage_Conditional_29_Template, 2, 0, "button", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 26);
            i0.ɵɵconditionalCreate(31, EmailsPage_Conditional_31_Template, 3, 1, "div", 27)(32, EmailsPage_Conditional_32_Template, 7, 1, "div", 28)(33, EmailsPage_Conditional_33_Template, 2, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(34, EmailsPage_Conditional_34_Template, 2, 2, "div", 29);
            i0.ɵɵconditionalCreate(35, EmailsPage_Conditional_35_Template, 3, 3, "section", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(36, EmailsPage_Conditional_36_Template, 28, 9);
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_4_0;
            i0.ɵɵclassProp("reading-pane-off", ctx.readingPanePosition === "off")("reading-pane-bottom", ctx.readingPanePosition === "bottom");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngClass", ((tmp_3_0 = ctx.currentFolderData()) == null ? null : tmp_3_0.icon) || "pi-inbox");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ((tmp_4_0 = ctx.currentFolderData()) == null ? null : tmp_4_0.name) || "Inbox", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.emails().length, " emails ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.unreadInFolder() > 0 ? 13 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("spinning", ctx.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.readingPanePosition === "right");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.readingPanePosition === "bottom");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.readingPanePosition === "off");
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.searchTerm ? 29 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 31 : ctx.emails().length === 0 ? 32 : 33);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.readingPanePosition !== "off" ? 34 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.readingPanePosition !== "off" ? 35 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showLinkDialog && ctx.selectedEmail() ? 36 : -1);
        } }, dependencies: [NgClass,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.PrimeTemplate, InputTextModule, i3.InputText, SelectModule, i4.Select, TooltipModule, i5.Tooltip, SkeletonModule,
            BadgeModule,
            DividerModule,
            AvatarModule,
            MenuModule,
            ConfirmDialogModule,
            DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   MY[_ngcontent-%COMP%]   MAILBOX[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   OUTLOOK-LIKE[_ngcontent-%COMP%]   2-PANE[_ngcontent-%COMP%]   EMAIL[_ngcontent-%COMP%]   CLIENT\n//[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   UI[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Email[_ngcontent-%COMP%]   List[_ngcontent-%COMP%]    + Reading[_ngcontent-%COMP%]   Pane\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   MAIN[_ngcontent-%COMP%]   CONTAINER[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   2-PANE[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   LAYOUT[_ngcontent-%COMP%]   (with resizable divider)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.mailbox-container[_ngcontent-%COMP%] {\n  --list-pane-width: 380px;\n  --divider-width: 4px;\n  \n  display: grid;\n  grid-template-columns: var(--list-pane-width) var(--divider-width) 1fr;\n  grid-template-rows: 1fr;\n  height: calc(100vh - 60px);\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);\n  overflow: hidden;\n  position: relative;\n\n  // Prevent text selection while resizing\n  &.resizing {\n    user-select: none;\n    cursor: col-resize;\n\n    .email-list-pane,\n    .reading-pane {\n      pointer-events: none;\n    }\n  }\n\n  // Reading pane off - full width list\n  &.reading-pane-off {\n    grid-template-columns: 1fr;\n\n    .reading-pane,\n    .pane-divider {\n      display: none;\n    }\n  }\n\n  // Reading pane bottom - stack vertically\n  &.reading-pane-bottom {\n    --list-pane-height: 50%;\n    \n    grid-template-columns: 1fr;\n    grid-template-rows: var(--list-pane-height) var(--divider-width) 1fr;\n\n    .email-list-pane {\n      grid-row: 1;\n      grid-column: 1;\n    }\n\n    .pane-divider {\n      grid-row: 2;\n      grid-column: 1;\n    }\n\n    .reading-pane {\n      grid-row: 3;\n      grid-column: 1;\n      border-left: none;\n      border-top: none;\n    }\n  }\n\n  @media (max-width: 1200px) {\n    --list-pane-width: 340px;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n\n    .reading-pane,\n    .pane-divider {\n      display: none;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESIZABLE[_ngcontent-%COMP%]   DIVIDER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.pane-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.08) 100%);\n  cursor: col-resize;\n  position: relative;\n  z-index: 10;\n  transition: background 150ms;\n\n  .divider-handle {\n    opacity: 0;\n  }\n\n  &:hover,\n  &:active {\n    background: rgba(102, 126, 234, 0.15);\n\n    .divider-handle {\n      opacity: 1;\n      background: rgba(102, 126, 234, 0.6);\n      height: 60px;\n    }\n  }\n\n  &--horizontal {\n    cursor: row-resize;\n\n    .divider-handle {\n      width: 60px;\n      height: 3px;\n    }\n\n    &:hover .divider-handle,\n    &:active .divider-handle {\n      width: 80px;\n    }\n  }\n}\n\n.divider-handle[_ngcontent-%COMP%] {\n  width: 3px;\n  height: 40px;\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 2px;\n  transition: all 150ms;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMAIL[_ngcontent-%COMP%]   LIST[_ngcontent-%COMP%]   PANE[_ngcontent-%COMP%]   (Left)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.email-list-pane[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  overflow: hidden;\n}\n\n.list-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n\n  .header-left {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n\n  .compose-btn {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    background: $primary-gradient;\n    border: none;\n    border-radius: $radius-lg;\n    color: white;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 250ms;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n\n    i {\n      font-size: 0.9rem;\n    }\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  }\n\n  .folder-title {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n\n    i {\n      color: $primary;\n      font-size: 1.1rem;\n    }\n  }\n\n  .email-count {\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    .unread-count {\n      color: $primary;\n      font-weight: 600;\n    }\n  }\n\n  .header-actions {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $gray-500;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-700;\n  }\n\n  .spinning {\n    animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-md;\n  padding: 2px;\n}\n\n.view-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    color: $gray-600;\n  }\n\n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  }\n}\n\n.search-bar[_ngcontent-%COMP%] {\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: $gray-50;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  border-radius: $radius-lg !important;\n  overflow: hidden;\n\n  .p-inputgroup-addon {\n    background: white;\n    border: 1px solid $gray-200;\n    border-right: none;\n    color: $gray-400;\n    padding: $space-2 $space-3;\n\n    &:last-child {\n      border-left: none;\n      border-right: 1px solid $gray-200;\n    }\n  }\n\n  input {\n    border: 1px solid $gray-200;\n    border-left: none;\n    border-right: none;\n    font-size: $font-size-sm;\n\n    &:focus {\n      box-shadow: none;\n      border-color: $gray-200;\n    }\n\n    &::placeholder {\n      color: $gray-400;\n    }\n  }\n\n  .clear-btn {\n    cursor: pointer;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $gray-600;\n    }\n  }\n}\n\n.email-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: $gray-300;\n    border-radius: 3px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Skeleton[_ngcontent-%COMP%]   loading\n.skeleton-list[_ngcontent-%COMP%] {\n  padding: $space-2;\n}\n\n.skeleton-email[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  padding: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  animation: _ngcontent-%COMP%_skeleton-pulse 1.5s ease-in-out infinite;\n}\n\n.skeleton-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: linear-gradient(90deg, $gray-200 25%, $gray-100 50%, $gray-200 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_skeleton-shimmer 1.5s infinite;\n}\n\n.skeleton-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.skeleton-line[_ngcontent-%COMP%] {\n  height: 12px;\n  border-radius: 4px;\n  background: linear-gradient(90deg, $gray-200 25%, $gray-100 50%, $gray-200 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_skeleton-shimmer 1.5s infinite;\n  margin-bottom: 8px;\n\n  &.skeleton-name { width: 40%; }\n  &.skeleton-subject { width: 80%; }\n  &.skeleton-snippet { width: 60%; }\n}\n\n@keyframes _ngcontent-%COMP%_skeleton-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.6; }\n}\n\n@keyframes _ngcontent-%COMP%_skeleton-shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n//[_ngcontent-%COMP%]   Empty[_ngcontent-%COMP%]   state\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: $space-8;\n  text-align: center;\n\n  .empty-icon {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: 2rem;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n//[_ngcontent-%COMP%]   Email[_ngcontent-%COMP%]   item\n.email-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n  transition: all 150ms;\n  position: relative;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.04);\n\n    .email-actions {\n      opacity: 1;\n    }\n  }\n\n  &.selected {\n    background: rgba(102, 126, 234, 0.08);\n    border-left: 3px solid $primary;\n    padding-left: calc($space-4 - 3px);\n  }\n\n  &.unread {\n    background: rgba(102, 126, 234, 0.03);\n\n    .sender-name {\n      font-weight: 700;\n    }\n\n    .email-subject {\n      font-weight: 600;\n      color: $gray-900;\n    }\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 4px;\n      top: 50%;\n      transform: translateY(-50%);\n      width: 6px;\n      height: 6px;\n      background: $primary;\n      border-radius: 50%;\n    }\n  }\n\n  &.starred .star-btn i {\n    color: #fbbf24;\n  }\n\n  &.high-priority {\n    border-left: 3px solid #ef4444;\n    padding-left: calc($space-4 - 3px);\n  }\n}\n\n.star-btn[_ngcontent-%COMP%] {\n  padding: $space-1;\n  background: transparent;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  transition: all 150ms;\n  flex-shrink: 0;\n\n  &:hover {\n    color: #fbbf24;\n    transform: scale(1.1);\n  }\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.email-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n  }\n}\n\n.email-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.email-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2px;\n}\n\n.sender-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-800;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.email-date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: $gray-400;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.email-subject[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-700;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-bottom: 2px;\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n\n  .priority-icon {\n    color: #ef4444;\n    font-size: 12px;\n  }\n\n  .attachment-icon {\n    color: $gray-400;\n    font-size: 12px;\n  }\n}\n\n.email-snippet[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n.email-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  opacity: 0;\n  transition: opacity 150ms;\n\n  .quick-action {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n    background: white;\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    color: $gray-500;\n    cursor: pointer;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $gray-700;\n      border-color: $gray-300;\n    }\n\n    i {\n      font-size: 12px;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   READING[_ngcontent-%COMP%]   PANE[_ngcontent-%COMP%]   (Right)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.reading-pane[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: #fafbfc;\n  overflow: hidden;\n\n  &.reading-pane-empty {\n    align-items: center;\n    justify-content: center;\n  }\n}\n\n.empty-reading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: $space-8;\n  color: $gray-400;\n\n  i {\n    font-size: 4rem;\n    margin-bottom: $space-4;\n    opacity: 0.5;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-500;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-400;\n  }\n}\n\n.reading-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  background: white;\n}\n\n.reading-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  gap: $space-4;\n\n  .toolbar-left,\n  .toolbar-right {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n}\n\n.toolbar-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: transparent;\n  border: 1px solid $gray-200;\n  border-radius: $radius-md;\n  color: $gray-600;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 150ms;\n\n  i {\n    font-size: 0.9rem;\n  }\n\n  span {\n    @media (max-width: 1400px) {\n      display: none;\n    }\n  }\n\n  &:hover {\n    background: $gray-50;\n    border-color: $gray-300;\n    color: $gray-800;\n  }\n\n  &.delete:hover {\n    background: rgba(239, 68, 68, 0.1);\n    border-color: #ef4444;\n    color: #ef4444;\n  }\n}\n\n.reading-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: $space-5;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: $gray-300;\n    border-radius: 3px;\n  }\n}\n\n.email-detail-header[_ngcontent-%COMP%] {\n  margin-bottom: $space-5;\n}\n\n.email-subject-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-900;\n  line-height: 1.3;\n\n  .priority-icon {\n    color: #ef4444;\n  }\n}\n\n.sender-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.sender-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n  }\n}\n\n.sender-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.sender-name-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.sender-info[_ngcontent-%COMP%]   .sender-name[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.star-btn-header[_ngcontent-%COMP%] {\n  padding: $space-1;\n  background: transparent;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    color: #fbbf24;\n  }\n\n  .pi-star-fill {\n    color: #fbbf24;\n  }\n}\n\n.sender-email[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.email-datetime[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.recipients-section[_ngcontent-%COMP%] {\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n}\n\n.recipient-line[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  color: $gray-600;\n\n  & + & {\n    margin-top: $space-1;\n  }\n\n  .label {\n    color: $gray-400;\n    font-weight: 500;\n    flex-shrink: 0;\n  }\n}\n\n.attachments-section[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n  border: 1px solid $gray-200;\n}\n\n.attachments-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: $space-3;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n\n  i {\n    color: $gray-500;\n  }\n}\n\n.attachment-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.attachment-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: white;\n  border: 1px solid $gray-200;\n  border-radius: $radius-md;\n  max-width: 200px;\n\n  > i {\n    color: $gray-400;\n  }\n\n  .attachment-info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .attachment-name {\n    display: block;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: $gray-700;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .attachment-size {\n    font-size: 11px;\n    color: $gray-400;\n  }\n\n  .download-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    background: transparent;\n    border: none;\n    border-radius: $radius-sm;\n    color: $gray-400;\n    cursor: pointer;\n    text-decoration: none;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $primary;\n    }\n  }\n}\n\n.email-body[_ngcontent-%COMP%] {\n  margin-top: $space-5;\n  padding: $space-5;\n  background: white;\n  border-radius: $radius-lg;\n  border: 1px solid $gray-200;\n  font-size: $font-size-base;\n  line-height: 1.7;\n  color: $gray-700;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n\n  // Reset HTML email styles\n  img {\n    max-width: 100%;\n    height: auto;\n  }\n\n  a {\n    color: $primary;\n    text-decoration: none;\n\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n\n  p {\n    margin: 0 0 $space-3;\n  }\n\n  ul, ol {\n    margin: 0 0 $space-3;\n    padding-left: $space-5;\n  }\n\n  blockquote {\n    margin: $space-3 0;\n    padding-left: $space-4;\n    border-left: 3px solid $gray-300;\n    color: $gray-600;\n    font-style: italic;\n  }\n\n  table {\n    width: auto;\n    max-width: 100%;\n    border-collapse: collapse;\n    display: block;\n    overflow-x: auto;\n  }\n\n  td,\n  th {\n    padding: 0.45rem 0.65rem;\n    border: 1px solid $gray-200;\n    vertical-align: top;\n  }\n\n  hr {\n    border: 0;\n    border-top: 1px solid $gray-200;\n    margin: $space-4 0;\n  }\n\n  &.email-body--html {\n    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);\n    padding: $space-3;\n  }\n\n  &.email-body--plain {\n    white-space: pre-wrap;\n    font-family: Inter, \"Segoe UI\", Roboto, Arial, sans-serif;\n  }\n\n  &.email-body--empty {\n    color: $gray-500;\n  }\n}\n\n.email-body-frame[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 480px;\n  border: 0;\n  border-radius: $radius-md;\n  background: #fff;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in[_ngcontent-%COMP%] {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-left {\n  from { opacity: 0; transform: translateX(-20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CRM[_ngcontent-%COMP%]   LINK[_ngcontent-%COMP%]   DIALOG\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.crm-link-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.3);\n  z-index: 100;\n}\n\n.crm-link-dialog[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 101;\n  width: 420px;\n  max-width: 90vw;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow-hover;\n  animation: fade-in 200ms ease-out;\n\n  .crm-link-dialog-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-4;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n    h3 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n      display: flex;\n      align-items: center;\n      gap: $space-2;\n\n      i { color: $primary; }\n    }\n\n    .close-btn {\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      color: $gray-400;\n      padding: $space-1;\n      border-radius: $radius-sm;\n      transition: all 150ms;\n\n      &:hover { background: $gray-100; color: $gray-600; }\n    }\n  }\n\n  .crm-link-dialog-body {\n    padding: $space-4;\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n\n    .link-field {\n      display: flex;\n      flex-direction: column;\n      gap: $space-1;\n\n      label {\n        font-size: $font-size-sm;\n        font-weight: 600;\n        color: $gray-600;\n      }\n    }\n\n    .entity-record-option {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n    }\n\n    .entity-record-option__label {\n      color: $gray-900;\n      font-weight: 600;\n    }\n\n    .entity-record-option__subtitle {\n      color: $gray-500;\n      font-size: $font-size-xs;\n    }\n  }\n\n  .crm-link-dialog-footer {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: $space-2;\n    padding: $space-3 $space-4;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n.crm-link-btn[_ngcontent-%COMP%] {\n  color: $primary !important;\n  font-weight: 600;\n\n  i { color: $primary; }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailsPage, [{
        type: Component,
        args: [{ selector: 'app-emails-page', standalone: true, imports: [
                    NgClass,
                    DatePipe,
                    FormsModule,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    TooltipModule,
                    SkeletonModule,
                    BadgeModule,
                    DividerModule,
                    AvatarModule,
                    MenuModule,
                    ConfirmDialogModule
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     MY MAILBOX - OUTLOOK-LIKE 2-PANE EMAIL CLIENT\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"mailbox-container\" \n     [class.reading-pane-off]=\"readingPanePosition === 'off'\"\n     [class.reading-pane-bottom]=\"readingPanePosition === 'bottom'\">\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       EMAIL LIST PANE (Left)\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"email-list-pane\">\n    <header class=\"list-header\">\n      <div class=\"header-left\">\n        <button class=\"compose-btn\" (click)=\"openCompose()\" [disabled]=\"!canManage()\">\n          <i class=\"pi pi-plus\"></i>\n          <span>Compose</span>\n        </button>\n        <h2 class=\"folder-title\">\n          <i class=\"pi\" [ngClass]=\"currentFolderData()?.icon || 'pi-inbox'\"></i>\n          {{ currentFolderData()?.name || 'Inbox' }}\n        </h2>\n        <span class=\"email-count\">\n          {{ emails().length }} emails\n          @if (unreadInFolder() > 0) {\n            <span class=\"unread-count\">({{ unreadInFolder() }} unread)</span>\n          }\n        </span>\n      </div>\n      <div class=\"header-actions\">\n        <button class=\"action-btn\" (click)=\"refreshEmails()\" pTooltip=\"Refresh\">\n          <i class=\"pi pi-refresh\" [class.spinning]=\"loading()\"></i>\n        </button>\n        <div class=\"view-toggle\">\n          <button \n            class=\"view-btn\" \n            [class.active]=\"readingPanePosition === 'right'\"\n            (click)=\"readingPanePosition = 'right'\"\n            pTooltip=\"Reading pane right\"\n          >\n            <i class=\"pi pi-window-maximize\"></i>\n          </button>\n          <button \n            class=\"view-btn\" \n            [class.active]=\"readingPanePosition === 'bottom'\"\n            (click)=\"readingPanePosition = 'bottom'\"\n            pTooltip=\"Reading pane bottom\"\n          >\n            <i class=\"pi pi-minus\"></i>\n          </button>\n          <button \n            class=\"view-btn\" \n            [class.active]=\"readingPanePosition === 'off'\"\n            (click)=\"readingPanePosition = 'off'\"\n            pTooltip=\"Reading pane off\"\n          >\n            <i class=\"pi pi-times\"></i>\n          </button>\n        </div>\n      </div>\n    </header>\n\n    <div class=\"search-bar\">\n      <div class=\"p-inputgroup search-input\">\n        <span class=\"p-inputgroup-addon\">\n          <i class=\"pi pi-search\"></i>\n        </span>\n        <input\n          type=\"text\"\n          pInputText\n          [(ngModel)]=\"searchTerm\"\n          placeholder=\"Search emails...\"\n          (keyup.enter)=\"onSearch()\"\n        />\n        @if (searchTerm) {\n          <button class=\"p-inputgroup-addon clear-btn\" (click)=\"searchTerm = ''; onSearch()\">\n            <i class=\"pi pi-times\"></i>\n          </button>\n        }\n      </div>\n    </div>\n\n    <div class=\"email-list\">\n      @if (loading()) {\n        <div class=\"skeleton-list\">\n          @for (i of [1, 2, 3, 4, 5]; track i) {\n            <div class=\"skeleton-email\">\n              <div class=\"skeleton-avatar\"></div>\n              <div class=\"skeleton-content\">\n                <div class=\"skeleton-line skeleton-name\"></div>\n                <div class=\"skeleton-line skeleton-subject\"></div>\n                <div class=\"skeleton-line skeleton-snippet\"></div>\n              </div>\n            </div>\n          }\n        </div>\n      } @else if (emails().length === 0) {\n        <div class=\"empty-state\">\n          <div class=\"empty-icon\">\n            <i class=\"pi pi-inbox\"></i>\n          </div>\n          <h3>No emails</h3>\n          <p>Your {{ currentFolderData()?.name || 'folder' }} is empty</p>\n        </div>\n      } @else {\n        @for (email of emails(); track email.id) {\n          <div \n            class=\"email-item\"\n            [class.selected]=\"email.id === mailbox.selectedEmailId()\"\n            [class.unread]=\"!email.isRead\"\n            [class.starred]=\"email.isStarred\"\n            [class.high-priority]=\"email.priority === 'high'\"\n            (click)=\"selectEmail(email)\"\n          >\n            <button class=\"star-btn\" (click)=\"toggleStar($event, email)\">\n              <i class=\"pi\" [ngClass]=\"email.isStarred ? 'pi-star-fill' : 'pi-star'\"></i>\n            </button>\n\n            <div class=\"email-avatar\">\n              @if (email.from.avatarUrl) {\n                <img [src]=\"email.from.avatarUrl\" [alt]=\"email.from.name || email.from.email\" />\n              } @else {\n                {{ mailbox.getInitials(email.from.name || email.from.email) }}\n              }\n            </div>\n\n            <div class=\"email-content\">\n              <div class=\"email-header\">\n                <span class=\"sender-name\">{{ email.from.name || email.from.email }}</span>\n                <span class=\"email-date\">{{ mailbox.formatEmailDate(email.receivedAtUtc) }}</span>\n              </div>\n              <div class=\"email-subject\">\n                @if (email.priority === 'high') {\n                  <i class=\"pi pi-exclamation-circle priority-icon\"></i>\n                }\n                @if (email.hasAttachments) {\n                  <i class=\"pi pi-paperclip attachment-icon\"></i>\n                }\n                {{ email.subject }}\n              </div>\n              <div class=\"email-snippet\">{{ email.snippet }}</div>\n            </div>\n\n            <div class=\"email-actions\">\n              <button class=\"quick-action\" (click)=\"archiveEmail($event, email)\" pTooltip=\"Archive\">\n                <i class=\"pi pi-inbox\"></i>\n              </button>\n              <button class=\"quick-action\" (click)=\"deleteEmail($event, email)\" pTooltip=\"Delete\">\n                <i class=\"pi pi-trash\"></i>\n              </button>\n              <button class=\"quick-action\" (click)=\"markAsRead($event, email)\" [pTooltip]=\"email.isRead ? 'Mark unread' : 'Mark read'\">\n                <i class=\"pi\" [ngClass]=\"email.isRead ? 'pi-envelope' : 'pi-envelope-open'\"></i>\n              </button>\n            </div>\n          </div>\n        }\n      }\n    </div>\n  </section>\n\n  <!-- Resizable Divider -->\n  @if (readingPanePosition !== 'off') {\n    <div \n      class=\"pane-divider\" \n      [class.pane-divider--horizontal]=\"readingPanePosition === 'bottom'\"\n      (mousedown)=\"startResize($event)\"\n    >\n      <div class=\"divider-handle\"></div>\n    </div>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       READING PANE (Right/Bottom)\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (readingPanePosition !== 'off') {\n    <section class=\"reading-pane\" [class.reading-pane-empty]=\"!selectedEmail()\">\n      @if (!selectedEmail()) {\n        <div class=\"empty-reading\">\n          <i class=\"pi pi-envelope\"></i>\n          <h3>Select an email</h3>\n          <p>Choose an email from the list to read it here</p>\n        </div>\n      } @else {\n        <header class=\"reading-header\">\n          <div class=\"reading-toolbar\">\n            <div class=\"toolbar-left\">\n              <button class=\"toolbar-btn\" (click)=\"replyToSelected(false)\" pTooltip=\"Reply\">\n                <i class=\"pi pi-reply\"></i>\n                <span>Reply</span>\n              </button>\n              <button class=\"toolbar-btn\" (click)=\"replyToSelected(true)\" pTooltip=\"Reply All\">\n                <i class=\"pi pi-reply\"></i>\n                <span>Reply All</span>\n              </button>\n              <button class=\"toolbar-btn\" (click)=\"forwardSelected()\" pTooltip=\"Forward\">\n                <i class=\"pi pi-arrow-right\"></i>\n                <span>Forward</span>\n              </button>\n            </div>\n            <div class=\"toolbar-right\">\n              <button class=\"toolbar-btn crm-link-btn\" (click)=\"openLinkDialog()\" pTooltip=\"Link to CRM Record\">\n                <i class=\"pi pi-link\"></i>\n                <span>Link</span>\n              </button>\n              <button class=\"toolbar-btn\" (click)=\"archiveSelected()\" pTooltip=\"Archive\">\n                <i class=\"pi pi-inbox\"></i>\n              </button>\n              <button class=\"toolbar-btn\" (click)=\"markSpamSelected()\" pTooltip=\"Mark as Spam\">\n                <i class=\"pi pi-ban\"></i>\n              </button>\n              <button class=\"toolbar-btn delete\" (click)=\"deleteSelected()\" pTooltip=\"Delete\">\n                <i class=\"pi pi-trash\"></i>\n              </button>\n            </div>\n          </div>\n        </header>\n\n        <div class=\"reading-content\">\n          <div class=\"email-detail-header\">\n            <h2 class=\"email-subject-title\">\n              @if (selectedEmail()?.priority === 'high') {\n                <i class=\"pi pi-exclamation-circle priority-icon\"></i>\n              }\n              {{ selectedEmail()?.subject }}\n            </h2>\n\n            <div class=\"sender-section\">\n              <div class=\"sender-avatar\">\n                @if (selectedEmail()?.from?.avatarUrl) {\n                  <img [src]=\"selectedEmail()?.from?.avatarUrl\" [alt]=\"selectedEmail()?.from?.name\" />\n                } @else {\n                  {{ mailbox.getInitials(selectedEmail()?.from?.name || selectedEmail()?.from?.email || '') }}\n                }\n              </div>\n              <div class=\"sender-info\">\n                <div class=\"sender-name-line\">\n                  <span class=\"sender-name\">{{ selectedEmail()?.from?.name || selectedEmail()?.from?.email }}</span>\n                  <button class=\"star-btn-header\" (click)=\"toggleStarSelected()\">\n                    <i class=\"pi\" [ngClass]=\"selectedEmail()?.isStarred ? 'pi-star-fill' : 'pi-star'\"></i>\n                  </button>\n                </div>\n                <span class=\"sender-email\">{{ selectedEmail()?.from?.email }}</span>\n              </div>\n              <span class=\"email-datetime\">{{ selectedEmail()?.receivedAtUtc | date:'medium' }}</span>\n            </div>\n\n            <div class=\"recipients-section\">\n              <div class=\"recipient-line\">\n                <span class=\"label\">To:</span>\n                @for (recipient of selectedEmail()?.to; track recipient.email; let isLast = $last) {\n                  {{ recipient.name || recipient.email }}{{ isLast ? '' : ', ' }}\n                }\n              </div>\n              @if (selectedEmail()?.cc && selectedEmail()!.cc!.length > 0) {\n                <div class=\"recipient-line\">\n                  <span class=\"label\">Cc:</span>\n                  @for (recipient of selectedEmail()?.cc; track recipient.email; let isLast = $last) {\n                    {{ recipient.name || recipient.email }}{{ isLast ? '' : ', ' }}\n                  }\n                </div>\n              }\n            </div>\n          </div>\n\n          @if (selectedEmail()?.hasAttachments && selectedEmail()?.attachments) {\n            <div class=\"attachments-section\">\n              <div class=\"attachments-header\">\n                <i class=\"pi pi-paperclip\"></i>\n                <span>{{ selectedEmail()!.attachments!.length }} Attachment(s)</span>\n              </div>\n              <div class=\"attachment-list\">\n                @for (attachment of selectedEmail()?.attachments; track attachment.id) {\n                  <div class=\"attachment-item\">\n                    <i class=\"pi pi-file\"></i>\n                    <div class=\"attachment-info\">\n                      <span class=\"attachment-name\">{{ attachment.name }}</span>\n                      <span class=\"attachment-size\">{{ mailbox.formatFileSize(attachment.size) }}</span>\n                    </div>\n                    <a class=\"download-btn\" [href]=\"mailbox.getAttachmentUrl(selectedEmail()!, attachment.id)\" target=\"_blank\" pTooltip=\"Download\">\n                      <i class=\"pi pi-download\"></i>\n                    </a>\n                  </div>\n                }\n              </div>\n            </div>\n          }\n\n          @if (renderedEmailBody()) {\n            <div class=\"email-body email-body--html\">\n              <iframe\n                class=\"email-body-frame\"\n                sandbox=\"allow-popups allow-popups-to-escape-sandbox\"\n                [attr.srcdoc]=\"renderedEmailBody()\"\n                (load)=\"onEmailFrameLoad($event)\"\n                title=\"Email content\"\n              ></iframe>\n            </div>\n          } @else if (selectedEmail()?.textBody) {\n            <div class=\"email-body email-body--plain\">{{ selectedEmail()?.textBody }}</div>\n          } @else {\n            <div class=\"email-body email-body--empty\">No email body available yet. Try refresh if this message was just synced.</div>\n          }\n        </div>\n      }\n    </section>\n  }\n</div>\n\n<!-- CRM Link Dialog -->\n@if (showLinkDialog && selectedEmail()) {\n  <div class=\"crm-link-overlay\" (click)=\"closeLinkDialog()\"></div>\n  <div class=\"crm-link-dialog\">\n    <div class=\"crm-link-dialog-header\">\n      <h3><i class=\"pi pi-link\"></i> Link to CRM Record</h3>\n      <button class=\"close-btn\" (click)=\"closeLinkDialog()\"><i class=\"pi pi-times\"></i></button>\n    </div>\n    <div class=\"crm-link-dialog-body\">\n      <div class=\"link-field\">\n        <label>Entity Type</label>\n        <p-select\n          [options]=\"linkEntityTypeOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [(ngModel)]=\"linkEntityType\"\n          (ngModelChange)=\"onLinkEntityTypeChange($event)\"\n          placeholder=\"Select type\"\n          class=\"w-full\"\n          appendTo=\"body\"\n        ></p-select>\n      </div>\n      <div class=\"link-field\">\n        <label>Record Name</label>\n        <p-select\n          [options]=\"linkRecordOptions\"\n          optionLabel=\"label\"\n          optionValue=\"id\"\n          [(ngModel)]=\"linkEntityId\"\n          placeholder=\"Select a record\"\n          class=\"w-full\"\n          appendTo=\"body\"\n          [filter]=\"true\"\n          [loading]=\"linkRecordLoading\"\n          [disabled]=\"!linkEntityType\"\n        >\n          <ng-template pTemplate=\"item\" let-item>\n            <div class=\"entity-record-option\">\n              <span class=\"entity-record-option__label\">{{ item.label }}</span>\n              @if (item.subtitle) {\n                <small class=\"entity-record-option__subtitle\">{{ item.subtitle }}</small>\n              }\n            </div>\n          </ng-template>\n        </p-select>\n      </div>\n      <div class=\"link-field\">\n        <label>Note (optional)</label>\n        <input pInputText [(ngModel)]=\"linkNote\" placeholder=\"Add a note...\" class=\"w-full\" />\n      </div>\n    </div>\n    <div class=\"crm-link-dialog-footer\">\n      <button class=\"toolbar-btn\" (click)=\"closeLinkDialog()\">Cancel</button>\n      <button class=\"toolbar-btn crm-link-btn\" (click)=\"linkEmailToCrm()\" [disabled]=\"!linkEntityType || !linkEntityId\">\n        <i class=\"pi pi-link\"></i> Link Email\n      </button>\n    </div>\n  </div>\n}\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// MY MAILBOX - OUTLOOK-LIKE 2-PANE EMAIL CLIENT\n// Premium Glass UI - Email List + Reading Pane\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// MAIN CONTAINER - 2-PANE GRID LAYOUT (with resizable divider)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.mailbox-container {\n  --list-pane-width: 380px;\n  --divider-width: 4px;\n  \n  display: grid;\n  grid-template-columns: var(--list-pane-width) var(--divider-width) 1fr;\n  grid-template-rows: 1fr;\n  height: calc(100vh - 60px);\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);\n  overflow: hidden;\n  position: relative;\n\n  // Prevent text selection while resizing\n  &.resizing {\n    user-select: none;\n    cursor: col-resize;\n\n    .email-list-pane,\n    .reading-pane {\n      pointer-events: none;\n    }\n  }\n\n  // Reading pane off - full width list\n  &.reading-pane-off {\n    grid-template-columns: 1fr;\n\n    .reading-pane,\n    .pane-divider {\n      display: none;\n    }\n  }\n\n  // Reading pane bottom - stack vertically\n  &.reading-pane-bottom {\n    --list-pane-height: 50%;\n    \n    grid-template-columns: 1fr;\n    grid-template-rows: var(--list-pane-height) var(--divider-width) 1fr;\n\n    .email-list-pane {\n      grid-row: 1;\n      grid-column: 1;\n    }\n\n    .pane-divider {\n      grid-row: 2;\n      grid-column: 1;\n    }\n\n    .reading-pane {\n      grid-row: 3;\n      grid-column: 1;\n      border-left: none;\n      border-top: none;\n    }\n  }\n\n  @media (max-width: 1200px) {\n    --list-pane-width: 340px;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n\n    .reading-pane,\n    .pane-divider {\n      display: none;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESIZABLE DIVIDER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.pane-divider {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.08) 100%);\n  cursor: col-resize;\n  position: relative;\n  z-index: 10;\n  transition: background 150ms;\n\n  .divider-handle {\n    opacity: 0;\n  }\n\n  &:hover,\n  &:active {\n    background: rgba(102, 126, 234, 0.15);\n\n    .divider-handle {\n      opacity: 1;\n      background: rgba(102, 126, 234, 0.6);\n      height: 60px;\n    }\n  }\n\n  &--horizontal {\n    cursor: row-resize;\n\n    .divider-handle {\n      width: 60px;\n      height: 3px;\n    }\n\n    &:hover .divider-handle,\n    &:active .divider-handle {\n      width: 80px;\n    }\n  }\n}\n\n.divider-handle {\n  width: 3px;\n  height: 40px;\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 2px;\n  transition: all 150ms;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMAIL LIST PANE (Left)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.email-list-pane {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  overflow: hidden;\n}\n\n.list-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);\n\n  .header-left {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n\n  .compose-btn {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    background: $primary-gradient;\n    border: none;\n    border-radius: $radius-lg;\n    color: white;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 250ms;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n\n    i {\n      font-size: 0.9rem;\n    }\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n  }\n\n  .folder-title {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n\n    i {\n      color: $primary;\n      font-size: 1.1rem;\n    }\n  }\n\n  .email-count {\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    .unread-count {\n      color: $primary;\n      font-weight: 600;\n    }\n  }\n\n  .header-actions {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n}\n\n.action-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $gray-500;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-700;\n  }\n\n  .spinning {\n    animation: spin 1s linear infinite;\n  }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n.view-toggle {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-md;\n  padding: 2px;\n}\n\n.view-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    color: $gray-600;\n  }\n\n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  }\n}\n\n.search-bar {\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  background: $gray-50;\n}\n\n.search-input {\n  border-radius: $radius-lg !important;\n  overflow: hidden;\n\n  .p-inputgroup-addon {\n    background: white;\n    border: 1px solid $gray-200;\n    border-right: none;\n    color: $gray-400;\n    padding: $space-2 $space-3;\n\n    &:last-child {\n      border-left: none;\n      border-right: 1px solid $gray-200;\n    }\n  }\n\n  input {\n    border: 1px solid $gray-200;\n    border-left: none;\n    border-right: none;\n    font-size: $font-size-sm;\n\n    &:focus {\n      box-shadow: none;\n      border-color: $gray-200;\n    }\n\n    &::placeholder {\n      color: $gray-400;\n    }\n  }\n\n  .clear-btn {\n    cursor: pointer;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $gray-600;\n    }\n  }\n}\n\n.email-list {\n  flex: 1;\n  overflow-y: auto;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: $gray-300;\n    border-radius: 3px;\n  }\n}\n\n// Skeleton loading\n.skeleton-list {\n  padding: $space-2;\n}\n\n.skeleton-email {\n  display: flex;\n  gap: $space-3;\n  padding: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  animation: skeleton-pulse 1.5s ease-in-out infinite;\n}\n\n.skeleton-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: linear-gradient(90deg, $gray-200 25%, $gray-100 50%, $gray-200 75%);\n  background-size: 200% 100%;\n  animation: skeleton-shimmer 1.5s infinite;\n}\n\n.skeleton-content {\n  flex: 1;\n}\n\n.skeleton-line {\n  height: 12px;\n  border-radius: 4px;\n  background: linear-gradient(90deg, $gray-200 25%, $gray-100 50%, $gray-200 75%);\n  background-size: 200% 100%;\n  animation: skeleton-shimmer 1.5s infinite;\n  margin-bottom: 8px;\n\n  &.skeleton-name { width: 40%; }\n  &.skeleton-subject { width: 80%; }\n  &.skeleton-snippet { width: 60%; }\n}\n\n@keyframes skeleton-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.6; }\n}\n\n@keyframes skeleton-shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n// Empty state\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: $space-8;\n  text-align: center;\n\n  .empty-icon {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: 2rem;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n// Email item\n.email-item {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n  transition: all 150ms;\n  position: relative;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.04);\n\n    .email-actions {\n      opacity: 1;\n    }\n  }\n\n  &.selected {\n    background: rgba(102, 126, 234, 0.08);\n    border-left: 3px solid $primary;\n    padding-left: calc($space-4 - 3px);\n  }\n\n  &.unread {\n    background: rgba(102, 126, 234, 0.03);\n\n    .sender-name {\n      font-weight: 700;\n    }\n\n    .email-subject {\n      font-weight: 600;\n      color: $gray-900;\n    }\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 4px;\n      top: 50%;\n      transform: translateY(-50%);\n      width: 6px;\n      height: 6px;\n      background: $primary;\n      border-radius: 50%;\n    }\n  }\n\n  &.starred .star-btn i {\n    color: #fbbf24;\n  }\n\n  &.high-priority {\n    border-left: 3px solid #ef4444;\n    padding-left: calc($space-4 - 3px);\n  }\n}\n\n.star-btn {\n  padding: $space-1;\n  background: transparent;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  transition: all 150ms;\n  flex-shrink: 0;\n\n  &:hover {\n    color: #fbbf24;\n    transform: scale(1.1);\n  }\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.email-avatar {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n  }\n}\n\n.email-content {\n  flex: 1;\n  min-width: 0;\n}\n\n.email-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 2px;\n}\n\n.sender-name {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-800;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.email-date {\n  font-size: 11px;\n  color: $gray-400;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.email-subject {\n  font-size: $font-size-sm;\n  color: $gray-700;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-bottom: 2px;\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n\n  .priority-icon {\n    color: #ef4444;\n    font-size: 12px;\n  }\n\n  .attachment-icon {\n    color: $gray-400;\n    font-size: 12px;\n  }\n}\n\n.email-snippet {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n\n.email-actions {\n  display: flex;\n  gap: 2px;\n  opacity: 0;\n  transition: opacity 150ms;\n\n  .quick-action {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n    background: white;\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    color: $gray-500;\n    cursor: pointer;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $gray-700;\n      border-color: $gray-300;\n    }\n\n    i {\n      font-size: 12px;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// READING PANE (Right)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.reading-pane {\n  display: flex;\n  flex-direction: column;\n  background: #fafbfc;\n  overflow: hidden;\n\n  &.reading-pane-empty {\n    align-items: center;\n    justify-content: center;\n  }\n}\n\n.empty-reading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: $space-8;\n  color: $gray-400;\n\n  i {\n    font-size: 4rem;\n    margin-bottom: $space-4;\n    opacity: 0.5;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-500;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-400;\n  }\n}\n\n.reading-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n  background: white;\n}\n\n.reading-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  gap: $space-4;\n\n  .toolbar-left,\n  .toolbar-right {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n}\n\n.toolbar-btn {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: transparent;\n  border: 1px solid $gray-200;\n  border-radius: $radius-md;\n  color: $gray-600;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 150ms;\n\n  i {\n    font-size: 0.9rem;\n  }\n\n  span {\n    @media (max-width: 1400px) {\n      display: none;\n    }\n  }\n\n  &:hover {\n    background: $gray-50;\n    border-color: $gray-300;\n    color: $gray-800;\n  }\n\n  &.delete:hover {\n    background: rgba(239, 68, 68, 0.1);\n    border-color: #ef4444;\n    color: #ef4444;\n  }\n}\n\n.reading-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: $space-5;\n\n  &::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: $gray-300;\n    border-radius: 3px;\n  }\n}\n\n.email-detail-header {\n  margin-bottom: $space-5;\n}\n\n.email-subject-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-900;\n  line-height: 1.3;\n\n  .priority-icon {\n    color: #ef4444;\n  }\n}\n\n.sender-section {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.sender-avatar {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    object-fit: cover;\n  }\n}\n\n.sender-info {\n  flex: 1;\n  min-width: 0;\n}\n\n.sender-name-line {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.sender-info .sender-name {\n  font-size: $font-size-base;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.star-btn-header {\n  padding: $space-1;\n  background: transparent;\n  border: none;\n  color: $gray-300;\n  cursor: pointer;\n  transition: all 150ms;\n\n  &:hover {\n    color: #fbbf24;\n  }\n\n  .pi-star-fill {\n    color: #fbbf24;\n  }\n}\n\n.sender-email {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.email-datetime {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.recipients-section {\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n}\n\n.recipient-line {\n  display: flex;\n  gap: $space-2;\n  color: $gray-600;\n\n  & + & {\n    margin-top: $space-1;\n  }\n\n  .label {\n    color: $gray-400;\n    font-weight: 500;\n    flex-shrink: 0;\n  }\n}\n\n.attachments-section {\n  margin-top: $space-4;\n  padding: $space-3;\n  background: $gray-50;\n  border-radius: $radius-lg;\n  border: 1px solid $gray-200;\n}\n\n.attachments-header {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin-bottom: $space-3;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n\n  i {\n    color: $gray-500;\n  }\n}\n\n.attachment-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n}\n\n.attachment-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: white;\n  border: 1px solid $gray-200;\n  border-radius: $radius-md;\n  max-width: 200px;\n\n  > i {\n    color: $gray-400;\n  }\n\n  .attachment-info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .attachment-name {\n    display: block;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: $gray-700;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .attachment-size {\n    font-size: 11px;\n    color: $gray-400;\n  }\n\n  .download-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    background: transparent;\n    border: none;\n    border-radius: $radius-sm;\n    color: $gray-400;\n    cursor: pointer;\n    text-decoration: none;\n    transition: all 150ms;\n\n    &:hover {\n      background: $gray-100;\n      color: $primary;\n    }\n  }\n}\n\n.email-body {\n  margin-top: $space-5;\n  padding: $space-5;\n  background: white;\n  border-radius: $radius-lg;\n  border: 1px solid $gray-200;\n  font-size: $font-size-base;\n  line-height: 1.7;\n  color: $gray-700;\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);\n\n  // Reset HTML email styles\n  img {\n    max-width: 100%;\n    height: auto;\n  }\n\n  a {\n    color: $primary;\n    text-decoration: none;\n\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n\n  p {\n    margin: 0 0 $space-3;\n  }\n\n  ul, ol {\n    margin: 0 0 $space-3;\n    padding-left: $space-5;\n  }\n\n  blockquote {\n    margin: $space-3 0;\n    padding-left: $space-4;\n    border-left: 3px solid $gray-300;\n    color: $gray-600;\n    font-style: italic;\n  }\n\n  table {\n    width: auto;\n    max-width: 100%;\n    border-collapse: collapse;\n    display: block;\n    overflow-x: auto;\n  }\n\n  td,\n  th {\n    padding: 0.45rem 0.65rem;\n    border: 1px solid $gray-200;\n    vertical-align: top;\n  }\n\n  hr {\n    border: 0;\n    border-top: 1px solid $gray-200;\n    margin: $space-4 0;\n  }\n\n  &.email-body--html {\n    background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);\n    padding: $space-3;\n  }\n\n  &.email-body--plain {\n    white-space: pre-wrap;\n    font-family: Inter, \"Segoe UI\", Roboto, Arial, sans-serif;\n  }\n\n  &.email-body--empty {\n    color: $gray-500;\n  }\n}\n\n.email-body-frame {\n  display: block;\n  width: 100%;\n  min-height: 480px;\n  border: 0;\n  border-radius: $radius-md;\n  background: #fff;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes slide-in-left {\n  from { opacity: 0; transform: translateX(-20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CRM LINK DIALOG\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.crm-link-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.3);\n  z-index: 100;\n}\n\n.crm-link-dialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 101;\n  width: 420px;\n  max-width: 90vw;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow-hover;\n  animation: fade-in 200ms ease-out;\n\n  .crm-link-dialog-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-4;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n    h3 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n      display: flex;\n      align-items: center;\n      gap: $space-2;\n\n      i { color: $primary; }\n    }\n\n    .close-btn {\n      background: transparent;\n      border: none;\n      cursor: pointer;\n      color: $gray-400;\n      padding: $space-1;\n      border-radius: $radius-sm;\n      transition: all 150ms;\n\n      &:hover { background: $gray-100; color: $gray-600; }\n    }\n  }\n\n  .crm-link-dialog-body {\n    padding: $space-4;\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n\n    .link-field {\n      display: flex;\n      flex-direction: column;\n      gap: $space-1;\n\n      label {\n        font-size: $font-size-sm;\n        font-weight: 600;\n        color: $gray-600;\n      }\n    }\n\n    .entity-record-option {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n    }\n\n    .entity-record-option__label {\n      color: $gray-900;\n      font-weight: 600;\n    }\n\n    .entity-record-option__subtitle {\n      color: $gray-500;\n      font-size: $font-size-xs;\n    }\n  }\n\n  .crm-link-dialog-footer {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: $space-2;\n    padding: $space-3 $space-4;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n.crm-link-btn {\n  color: $primary !important;\n  font-weight: 600;\n\n  i { color: $primary; }\n}\n"] }]
    }], null, { handleKeyboard: [{
            type: HostListener,
            args: ['document:keydown', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailsPage, { className: "EmailsPage", filePath: "src/app/crm/features/emails/pages/emails.page.ts", lineNumber: 54 }); })();
