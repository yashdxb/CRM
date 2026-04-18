import { Component, computed, DestroyRef, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationContainerComponent } from '../core/notifications';
import { CommandPaletteComponent, CommandPaletteService } from '../core/command-palette';
import { KeyboardShortcutsModalComponent } from '../core/keyboard-shortcuts';
import { AppToastComponent } from '../shared/app-toast.component';
import { AssistantPanelComponent } from '../core/assistant/assistant-panel.component';
import { NavigationService } from './navigation';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { QuickAddModalComponent } from './quick-add/quick-add-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoadingOverlayService } from '../core/loading/loading-overlay.service';
import { PresenceService } from '../core/realtime/presence.service';
import { CrmEventsService } from '../core/realtime/crm-events.service';
import { readUserId } from '../core/auth/token.utils';
import { UserAdminDataService } from '../crm/features/settings/services/user-admin-data.service';
import { DirectChatService } from '../core/chat/direct-chat.service';
import { NotificationService } from '../core/notifications';
import { firstValueFrom } from 'rxjs';
import { AttachmentDataService } from '../shared/services/attachment-data.service';
import { environment } from '../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/progressspinner";
import * as i3 from "primeng/tooltip";
import * as i4 from "primeng/multiselect";
const _c0 = ["quickAddModal"];
const _c1 = ["chatAttachmentInput"];
const _c2 = ["presenceTrigger"];
const _c3 = ["presencePopup"];
const _c4 = (a0, a1) => ({ "shell--collapsed": a0, "shell--topbar-hidden": a1 });
const _c5 = () => ({ width: "20px", height: "20px" });
const _c6 = () => ({ width: "86px", height: "86px" });
const _forTrack0 = ($index, $item) => $item.userId;
const _forTrack1 = ($index, $item) => $item.threadId;
const _forTrack2 = ($index, $item) => $item.id;
const _forTrack3 = ($index, $item) => $item.attachmentId;
function ShellComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.nav.toggleTopbar()); });
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "p-progressSpinner", 38);
    i0.ɵɵelementStart(2, "div", 39)(3, "strong");
    i0.ɵɵtext(4, "Loading data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Refreshing your workspace");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(2, _c5));
} }
function ShellComponent_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.chatUnreadTotal());
} }
function ShellComponent_Conditional_40_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1, "Loading user directory\u2026");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_40_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 49);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_40_Conditional_13_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.retryUserLookup()); });
    i0.ɵɵtext(3, "Retry");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.userLookupError());
} }
function ShellComponent_Conditional_40_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1, "No users are online right now.");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 52);
} if (rf & 2) {
    const person_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", person_r7.profilePictureUrl, i0.ɵɵsanitizeUrl)("alt", person_r7.displayName);
} }
function ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const person_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", person_r7.initials, " ");
} }
function ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const person_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(person_r7.email);
} }
function ShellComponent_Conditional_40_Conditional_15_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 50)(1, "span", 51);
    i0.ɵɵconditionalCreate(2, ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_2_Template, 1, 2, "img", 52)(3, ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 53)(5, "strong", 54);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ShellComponent_Conditional_40_Conditional_15_For_2_Conditional_7_Template, 2, 1, "span", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 56);
    i0.ɵɵtext(9, "Online");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 57);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_40_Conditional_15_For_2_Template_button_click_10_listener() { const person_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.engageChat(person_r7)); });
    i0.ɵɵtext(11, " Chat ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const person_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(person_r7.profilePictureUrl ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(person_r7.displayName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(person_r7.email ? 7 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canChatWith(person_r7));
} }
function ShellComponent_Conditional_40_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 48);
    i0.ɵɵrepeaterCreate(1, ShellComponent_Conditional_40_Conditional_15_For_2_Template, 12, 4, "li", 50, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.onlinePeople());
} }
function ShellComponent_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 40, 2);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_40_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r4); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 41)(3, "span", 42);
    i0.ɵɵtext(4, "Online Users");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 44);
    i0.ɵɵelement(8, "span", 45);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 46);
    i0.ɵɵconditionalCreate(12, ShellComponent_Conditional_40_Conditional_12_Template, 2, 0, "p", 47)(13, ShellComponent_Conditional_40_Conditional_13_Template, 4, 1)(14, ShellComponent_Conditional_40_Conditional_14_Template, 2, 0, "p", 47)(15, ShellComponent_Conditional_40_Conditional_15_Template, 3, 0, "ul", 48);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.onlineCount());
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-state", ctx_r2.presenceConnectionState());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.presenceStatusLabel());
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("max-height", ctx_r2.presencePopupBodyMaxHeight(), "px");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.userLookupLoading() ? 12 : ctx_r2.userLookupError() ? 13 : !ctx_r2.onlinePeople().length ? 14 : 15);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Syncing\u2026");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 63);
    i0.ɵɵtext(1, "No conversations yet.");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "time");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const thread_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.formatChatTime(thread_r10.lastMessageAtUtc));
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const thread_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(thread_r10.unreadCount);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 84);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Template_button_click_0_listener() { const thread_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.selectChatThread(thread_r10.threadId)); });
    i0.ɵɵelementStart(1, "div", 85)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Conditional_4_Template, 2, 1, "time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 86)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Conditional_8_Template, 2, 1, "em");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const thread_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("is-active", thread_r10.threadId === ctx_r2.activeChatThreadId());
    i0.ɵɵattribute("data-thread-id", thread_r10.threadId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(thread_r10.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(thread_r10.lastMessageAtUtc ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(thread_r10.subtitle);
    i0.ɵɵadvance();
    i0.ɵɵconditional(thread_r10.unreadCount > 0 ? 8 : -1);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, ShellComponent_Conditional_46_Conditional_0_Conditional_8_For_1_Template, 9, 7, "button", 83, _forTrack1);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵrepeater(ctx_r2.chatThreadViews());
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 52);
} if (rf & 2) {
    const activeUser_r11 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", activeUser_r11.profilePictureUrl, i0.ɵɵsanitizeUrl)("alt", activeUser_r11.displayName);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const activeUser_r11 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", activeUser_r11.initials, " ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.activeChatParticipants()[0].displayName, " +", ctx_r2.activeChatParticipants().length - 1, " ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const activeUser_r11 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", activeUser_r11.displayName, " ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_22_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Adding\u2026 ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_22_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Add selected ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-multiSelect", 87);
    i0.ɵɵlistener("ngModelChange", function ShellComponent_Conditional_46_Conditional_0_Conditional_22_Template_p_multiSelect_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setSelectedParticipantsToAdd($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 88);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Conditional_22_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.addParticipantsToActiveChat()); });
    i0.ɵɵconditionalCreate(2, ShellComponent_Conditional_46_Conditional_0_Conditional_22_Conditional_2_Template, 1, 0)(3, ShellComponent_Conditional_46_Conditional_0_Conditional_22_Conditional_3_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("options", ctx_r2.participantAddOptions())("ngModel", ctx_r2.selectedParticipantsToAdd())("filter", true)("showClear", true)("maxSelectedLabels", 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.selectedParticipantsToAdd().length || ctx_r2.chatAddingParticipants());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.chatAddingParticipants() ? 2 : 3);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 63);
    i0.ɵɵtext(1, "Loading conversation\u2026");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 63);
    i0.ɵɵtext(1, "No messages yet. Say hello \uD83D\uDC4B");
    i0.ɵɵelementEnd();
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 52);
} if (rf & 2) {
    const message_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", message_r13.senderDisplayName);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const message_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.buildAvatarInitials(message_r13.senderDisplayName), " ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 95);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const attachment_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", attachment_r14.downloadUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", attachment_r14.fileName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatAttachmentSize(attachment_r14.size));
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 94);
    i0.ɵɵrepeaterCreate(1, ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_9_For_2_Template, 5, 3, "li", null, _forTrack3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(message_r13.attachments);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 90)(1, "span", 91);
    i0.ɵɵconditionalCreate(2, ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_2_Template, 1, 2, "img", 52)(3, ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 92)(5, "p")(6, "strong", 93);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Conditional_9_Template, 3, 0, "ul", 94);
    i0.ɵɵelementStart(10, "time");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_18_0;
    const message_r13 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("direct-chat-message--mine", message_r13.senderUserId === ctx_r2.currentUserId);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_18_0 = ctx_r2.getUserProfilePicture(message_r13.senderUserId)) ? 2 : 3, tmp_18_0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", message_r13.senderDisplayName, ":");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", message_r13.content);
    i0.ɵɵadvance();
    i0.ɵɵconditional(message_r13.attachments.length ? 9 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatChatTime(message_r13.sentAtUtc));
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, ShellComponent_Conditional_46_Conditional_0_Conditional_34_For_1_Template, 12, 7, "article", 89, _forTrack2);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵrepeater(ctx_r2.currentChatMessages());
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.chatError());
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r2.activeTypingUsers().join(", "), " ", ctx_r2.activeTypingUsers().length === 1 ? "is" : "are", " typing... ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Uploading\u2026 ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sending\u2026 ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Send ");
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_49_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 96)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "em");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 97);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Conditional_49_For_2_Template_button_click_5_listener() { const item_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.removePendingChatAttachment(item_r16.id)); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r16.file.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatAttachmentSize(item_r16.size));
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵrepeaterCreate(1, ShellComponent_Conditional_46_Conditional_0_Conditional_49_For_2_Template, 7, 2, "span", 96, _forTrack2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.pendingChatAttachments());
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_50_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 97);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Conditional_50_For_2_Template_button_click_0_listener() { const emoji_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.insertEmoji(emoji_r18)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const emoji_r18 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(emoji_r18);
} }
function ShellComponent_Conditional_46_Conditional_0_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82);
    i0.ɵɵrepeaterCreate(1, ShellComponent_Conditional_46_Conditional_0_Conditional_50_For_2_Template, 2, 1, "button", 98, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(3, "span", 99);
    i0.ɵɵtext(4, "Type shortcuts like :smile: :heart: :thumbsup:");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.quickEmojis);
} }
function ShellComponent_Conditional_46_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 59)(1, "aside", 60)(2, "header", 61)(3, "strong");
    i0.ɵɵtext(4, "Conversations");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, ShellComponent_Conditional_46_Conditional_0_Conditional_5_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 62);
    i0.ɵɵconditionalCreate(7, ShellComponent_Conditional_46_Conditional_0_Conditional_7_Template, 2, 0, "p", 63)(8, ShellComponent_Conditional_46_Conditional_0_Conditional_8_Template, 2, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 64)(10, "header", 65)(11, "div", 66)(12, "span", 67);
    i0.ɵɵconditionalCreate(13, ShellComponent_Conditional_46_Conditional_0_Conditional_13_Template, 1, 2, "img", 52)(14, ShellComponent_Conditional_46_Conditional_0_Conditional_14_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 68)(16, "strong");
    i0.ɵɵconditionalCreate(17, ShellComponent_Conditional_46_Conditional_0_Conditional_17_Template, 1, 2)(18, ShellComponent_Conditional_46_Conditional_0_Conditional_18_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 69);
    i0.ɵɵconditionalCreate(22, ShellComponent_Conditional_46_Conditional_0_Conditional_22_Template, 4, 7);
    i0.ɵɵelementStart(23, "button", 70);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleChatMaximize()); });
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 70);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.clearActiveChat()); });
    i0.ɵɵtext(26, "Clear");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 70);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.archiveActiveChat()); });
    i0.ɵɵtext(28, "Archive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 71);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeChatPanel()); });
    i0.ɵɵtext(30, "\u2715");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 72);
    i0.ɵɵconditionalCreate(32, ShellComponent_Conditional_46_Conditional_0_Conditional_32_Template, 2, 0, "p", 63)(33, ShellComponent_Conditional_46_Conditional_0_Conditional_33_Template, 2, 0, "p", 63)(34, ShellComponent_Conditional_46_Conditional_0_Conditional_34_Template, 2, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(35, ShellComponent_Conditional_46_Conditional_0_Conditional_35_Template, 2, 1, "p", 73);
    i0.ɵɵelementStart(36, "footer", 74);
    i0.ɵɵconditionalCreate(37, ShellComponent_Conditional_46_Conditional_0_Conditional_37_Template, 2, 2, "p", 75);
    i0.ɵɵelementStart(38, "button", 76);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleEmojiPicker()); });
    i0.ɵɵtext(39, "\uD83D\uDE0A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "label", 77);
    i0.ɵɵtext(41, " \uD83D\uDCCE ");
    i0.ɵɵelementStart(42, "input", 78, 3);
    i0.ɵɵlistener("change", function ShellComponent_Conditional_46_Conditional_0_Template_input_change_42_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onChatAttachmentSelected($event.target.files ?? null)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "input", 79);
    i0.ɵɵlistener("input", function ShellComponent_Conditional_46_Conditional_0_Template_input_input_44_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onChatInput(($event.target.value ?? "").toString())); })("keydown.enter", function ShellComponent_Conditional_46_Conditional_0_Template_input_keydown_enter_44_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.sendChatMessage()); })("focus", function ShellComponent_Conditional_46_Conditional_0_Template_input_focus_44_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.emojiPickerVisible.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 80);
    i0.ɵɵlistener("click", function ShellComponent_Conditional_46_Conditional_0_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.sendChatMessage()); });
    i0.ɵɵconditionalCreate(46, ShellComponent_Conditional_46_Conditional_0_Conditional_46_Template, 1, 0)(47, ShellComponent_Conditional_46_Conditional_0_Conditional_47_Template, 1, 0)(48, ShellComponent_Conditional_46_Conditional_0_Conditional_48_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(49, ShellComponent_Conditional_46_Conditional_0_Conditional_49_Template, 3, 0, "div", 81);
    i0.ɵɵconditionalCreate(50, ShellComponent_Conditional_46_Conditional_0_Conditional_50_Template, 5, 0, "div", 82);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("direct-chat-panel--maximized", ctx_r2.chatMaximized());
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.chatThreadLoading() ? 5 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r2.chatThreadViews().length ? 7 : 8);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx.profilePictureUrl ? 13 : 14);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r2.activeChatParticipants().length > 1 ? 17 : 18);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.activeChatParticipants().length, " participant(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.availableParticipantsToAdd().length ? 22 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.chatMaximized() ? "Restore" : "Maximize", " ");
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r2.chatLoading() ? 32 : !ctx_r2.currentChatMessages().length ? 33 : 34);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.chatError() ? 35 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.activeTypingUsers().length ? 37 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r2.chatDraft());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.chatDraft().trim() && !ctx_r2.pendingChatAttachments().length || ctx_r2.chatSaving() || ctx_r2.chatAttachmentUploading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.chatAttachmentUploading() ? 46 : ctx_r2.chatSaving() ? 47 : 48);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.pendingChatAttachments().length ? 49 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.emojiPickerVisible() ? 50 : -1);
} }
function ShellComponent_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ShellComponent_Conditional_46_Conditional_0_Template, 51, 17, "section", 58);
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_3_0 = ctx_r2.activeChatUser()) ? 0 : -1, tmp_3_0);
} }
function ShellComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "p-progressSpinner", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(2, _c6));
} }
const EMOJI_SHORTCUTS = {
    ':smile:': '😄',
    ':laugh:': '😂',
    ':thumbsup:': '👍',
    ':heart:': '❤️',
    ':fire:': '🔥',
    ':party:': '🎉',
    ':ok:': '👌',
    ':sad:': '😢'
};
const QUICK_EMOJIS = ['😀', '😂', '😍', '👍', '🔥', '🎉', '👏', '😎', '❤️', '🚀'];
export class ShellComponent {
    destroyRef = inject(DestroyRef);
    nav = inject(NavigationService);
    loadingOverlay = inject(LoadingOverlayService);
    commandPaletteService = inject(CommandPaletteService);
    presenceService = inject(PresenceService);
    crmEventsService = inject(CrmEventsService);
    userAdminData = inject(UserAdminDataService);
    directChatService = inject(DirectChatService);
    notificationService = inject(NotificationService);
    attachmentDataService = inject(AttachmentDataService);
    router = inject(Router);
    currentUserId = readUserId();
    onlineUsers = toSignal(this.presenceService.onlineUsers$, { initialValue: new Set() });
    presenceConnectionState = toSignal(this.presenceService.connectionState$, {
        initialValue: 'disconnected'
    });
    onlineCount = computed(() => this.onlineUsers().size, ...(ngDevMode ? [{ debugName: "onlineCount" }] : []));
    onlineUsersPopupVisible = signal(false, ...(ngDevMode ? [{ debugName: "onlineUsersPopupVisible" }] : []));
    userLookupLoading = signal(false, ...(ngDevMode ? [{ debugName: "userLookupLoading" }] : []));
    userLookupLoaded = signal(false, ...(ngDevMode ? [{ debugName: "userLookupLoaded" }] : []));
    userLookupError = signal(null, ...(ngDevMode ? [{ debugName: "userLookupError" }] : []));
    userLookupById = signal(new Map(), ...(ngDevMode ? [{ debugName: "userLookupById" }] : []));
    onlinePeople = computed(() => {
        const lookup = this.userLookupById();
        return [...this.onlineUsers()]
            .map((userId) => {
            const user = lookup.get(userId);
            const displayName = user?.fullName?.trim() || `User ${userId.slice(0, 8)}`;
            return {
                userId,
                displayName,
                email: user?.email ?? null,
                initials: this.buildInitials(displayName),
                profilePictureUrl: user?.profilePictureUrl ?? null
            };
        })
            .sort((first, second) => first.displayName.localeCompare(second.displayName));
    }, ...(ngDevMode ? [{ debugName: "onlinePeople" }] : []));
    activeChatUser = signal(null, ...(ngDevMode ? [{ debugName: "activeChatUser" }] : []));
    activeChatThreadId = signal(null, ...(ngDevMode ? [{ debugName: "activeChatThreadId" }] : []));
    activeChatParticipants = signal([], ...(ngDevMode ? [{ debugName: "activeChatParticipants" }] : []));
    chatPanelVisible = signal(false, ...(ngDevMode ? [{ debugName: "chatPanelVisible" }] : []));
    chatDraft = signal('', ...(ngDevMode ? [{ debugName: "chatDraft" }] : []));
    chatSaving = signal(false, ...(ngDevMode ? [{ debugName: "chatSaving" }] : []));
    chatMaximized = signal(false, ...(ngDevMode ? [{ debugName: "chatMaximized" }] : []));
    chatAttachmentUploading = signal(false, ...(ngDevMode ? [{ debugName: "chatAttachmentUploading" }] : []));
    chatLoading = signal(false, ...(ngDevMode ? [{ debugName: "chatLoading" }] : []));
    chatError = signal(null, ...(ngDevMode ? [{ debugName: "chatError" }] : []));
    chatUnreadByThread = signal(new Map(), ...(ngDevMode ? [{ debugName: "chatUnreadByThread" }] : []));
    chatUnreadTotal = computed(() => [...this.chatUnreadByThread().values()].reduce((total, count) => total + count, 0), ...(ngDevMode ? [{ debugName: "chatUnreadTotal" }] : []));
    selectedParticipantsToAdd = signal([], ...(ngDevMode ? [{ debugName: "selectedParticipantsToAdd" }] : []));
    chatAddingParticipants = signal(false, ...(ngDevMode ? [{ debugName: "chatAddingParticipants" }] : []));
    emojiPickerVisible = signal(false, ...(ngDevMode ? [{ debugName: "emojiPickerVisible" }] : []));
    quickEmojis = QUICK_EMOJIS;
    chatMessages = signal([], ...(ngDevMode ? [{ debugName: "chatMessages" }] : []));
    pendingChatAttachments = signal([], ...(ngDevMode ? [{ debugName: "pendingChatAttachments" }] : []));
    chatThreads = signal([], ...(ngDevMode ? [{ debugName: "chatThreads" }] : []));
    chatThreadLoading = signal(false, ...(ngDevMode ? [{ debugName: "chatThreadLoading" }] : []));
    typingUsersByThread = signal(new Map(), ...(ngDevMode ? [{ debugName: "typingUsersByThread" }] : []));
    activeTypingUsers = computed(() => {
        const threadId = this.activeChatThreadId();
        if (!threadId) {
            return [];
        }
        const users = this.typingUsersByThread().get(threadId);
        return users ? [...users.values()] : [];
    }, ...(ngDevMode ? [{ debugName: "activeTypingUsers" }] : []));
    availableParticipantsToAdd = computed(() => {
        const currentIds = new Set(this.activeChatParticipants().map((participant) => participant.userId));
        return this.onlinePeople().filter((person) => person.userId !== this.currentUserId &&
            !currentIds.has(person.userId));
    }, ...(ngDevMode ? [{ debugName: "availableParticipantsToAdd" }] : []));
    participantAddOptions = computed(() => this.availableParticipantsToAdd().map((person) => ({
        label: person.email ? `${person.displayName} (${person.email})` : person.displayName,
        value: person.userId
    })), ...(ngDevMode ? [{ debugName: "participantAddOptions" }] : []));
    currentChatMessages = computed(() => {
        const threadId = this.activeChatThreadId();
        if (!threadId) {
            return [];
        }
        return this.chatMessages()
            .filter((message) => message.threadId === threadId)
            .sort((first, second) => {
            const byTime = new Date(first.sentAtUtc).getTime() - new Date(second.sentAtUtc).getTime();
            return byTime !== 0 ? byTime : first.id.localeCompare(second.id);
        });
    }, ...(ngDevMode ? [{ debugName: "currentChatMessages" }] : []));
    chatThreadViews = computed(() => {
        const threads = this.chatThreads();
        const unread = this.chatUnreadByThread();
        const allMessages = this.chatMessages();
        const currentUserId = this.currentUserId?.toLowerCase() ?? '';
        return threads
            .map((thread) => {
            const otherParticipants = thread.participants.filter((participant) => participant.userId.toLowerCase() !== currentUserId);
            const participantNames = otherParticipants.map((participant) => participant.displayName).filter(Boolean);
            const title = thread.title?.trim()
                || participantNames.slice(0, 2).join(', ')
                || 'Direct chat';
            const threadMessages = allMessages
                .filter((message) => message.threadId === thread.threadId)
                .sort((a, b) => new Date(b.sentAtUtc).getTime() - new Date(a.sentAtUtc).getTime());
            const latest = threadMessages[0];
            const subtitle = latest?.content?.trim()
                ? this.truncateMessage(latest.content, 48)
                : (otherParticipants[0]?.email ?? 'No messages yet');
            const lastMessageAtUtc = latest?.sentAtUtc ?? thread.lastMessageAtUtc ?? null;
            return {
                threadId: thread.threadId,
                title,
                subtitle,
                lastMessageAtUtc,
                unreadCount: unread.get(thread.threadId) ?? 0
            };
        })
            .sort((a, b) => {
            const aRawTime = a.lastMessageAtUtc ? new Date(a.lastMessageAtUtc).getTime() : Number.NaN;
            const bRawTime = b.lastMessageAtUtc ? new Date(b.lastMessageAtUtc).getTime() : Number.NaN;
            const aTime = Number.isFinite(aRawTime) ? aRawTime : Number.MAX_SAFE_INTEGER;
            const bTime = Number.isFinite(bRawTime) ? bRawTime : Number.MAX_SAFE_INTEGER;
            const byTime = aTime - bTime;
            return byTime !== 0 ? byTime : a.threadId.localeCompare(b.threadId);
        });
    }, ...(ngDevMode ? [{ debugName: "chatThreadViews" }] : []));
    presencePopupBodyMaxHeight = computed(() => {
        const desiredHeight = 84 + this.onlineCount() * 56;
        return Math.min(360, Math.max(140, desiredHeight));
    }, ...(ngDevMode ? [{ debugName: "presencePopupBodyMaxHeight" }] : []));
    presenceStatusLabel = computed(() => {
        const state = this.presenceConnectionState();
        if (state === 'connected') {
            return 'Live';
        }
        if (state === 'reconnecting' || state === 'connecting') {
            return 'Syncing';
        }
        return 'Offline';
    }, ...(ngDevMode ? [{ debugName: "presenceStatusLabel" }] : []));
    footerPresenceTooltip = computed(() => {
        const count = this.onlineCount();
        const state = this.presenceConnectionState();
        if (state === 'connected') {
            return `${count} user${count === 1 ? '' : 's'} online`;
        }
        if (state === 'reconnecting' || state === 'connecting') {
            return `Presence ${state}… showing latest count (${count})`;
        }
        return `Presence offline. Last known count: ${count}`;
    }, ...(ngDevMode ? [{ debugName: "footerPresenceTooltip" }] : []));
    quickAddModal;
    chatAttachmentInput;
    presenceTrigger;
    presencePopup;
    quickAddVisible = signal(false, ...(ngDevMode ? [{ debugName: "quickAddVisible" }] : []));
    quickAddType = signal('lead', ...(ngDevMode ? [{ debugName: "quickAddType" }] : []));
    typingIdleTimer = null;
    typingExpiryTimers = new Map();
    lastTypingThreadId = null;
    typingAnnounced = false;
    lastNewConversationSoundAt = 0;
    quickAddEffect = effect(() => {
        const request = this.commandPaletteService.quickAddRequest();
        if (request) {
            this.openQuickAdd(request);
            this.commandPaletteService.clearQuickAddRequest();
        }
    }, ...(ngDevMode ? [{ debugName: "quickAddEffect" }] : []));
    constructor() {
        this.syncSidebarForViewport();
        this.crmEventsService.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => this.handleRealtimeEvent(event));
    }
    handleQuickAddEvent(event) {
        const type = event?.detail;
        if (type) {
            this.openQuickAdd(type);
        }
    }
    onWindowResize() {
        this.syncSidebarForViewport();
    }
    onDocumentClick(event) {
        if (!this.onlineUsersPopupVisible()) {
            return;
        }
        const targetNode = event.target;
        const triggerElement = this.presenceTrigger?.nativeElement;
        const popupElement = this.presencePopup?.nativeElement;
        if (!targetNode) {
            this.onlineUsersPopupVisible.set(false);
            return;
        }
        const clickedInsideTrigger = !!triggerElement && triggerElement.contains(targetNode);
        const clickedInsidePopup = !!popupElement && popupElement.contains(targetNode);
        if (!clickedInsideTrigger && !clickedInsidePopup) {
            this.onlineUsersPopupVisible.set(false);
        }
    }
    onEscape() {
        this.onlineUsersPopupVisible.set(false);
    }
    openQuickAdd(type) {
        const resolved = type ?? this.inferQuickAddType();
        this.quickAddModal?.open(resolved);
        this.quickAddType.set(resolved);
        this.quickAddVisible.set(true);
    }
    inferQuickAddType() {
        const url = this.router.url;
        if (url.startsWith('/app/contacts'))
            return 'contact';
        if (url.startsWith('/app/activities'))
            return 'activity';
        return 'lead';
    }
    onQuickAddCreated() {
        this.nav.refreshNav();
    }
    toggleOnlineUsersPopup(event) {
        event.stopPropagation();
        const willOpen = !this.onlineUsersPopupVisible();
        this.onlineUsersPopupVisible.set(willOpen);
        if (willOpen) {
            this.ensureUserLookupLoaded();
        }
    }
    retryUserLookup() {
        this.userLookupLoaded.set(false);
        this.userLookupError.set(null);
        this.ensureUserLookupLoaded();
    }
    canChatWith(person) {
        if (!person.userId) {
            return false;
        }
        if (!this.currentUserId) {
            return true;
        }
        return person.userId !== this.currentUserId;
    }
    engageChat(person) {
        if (!this.canChatWith(person)) {
            return;
        }
        this.activeChatUser.set(person);
        this.activeChatThreadId.set(null);
        this.activeChatParticipants.set([person]);
        this.chatPanelVisible.set(true);
        this.onlineUsersPopupVisible.set(false);
        this.chatDraft.set('');
        this.chatLoading.set(true);
        this.chatError.set(null);
        this.directChatService.openThread([person.userId])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (thread) => {
                this.activeChatThreadId.set(thread.threadId);
                this.activeChatParticipants.set(this.mapThreadParticipants(thread));
                this.chatThreads.update((items) => this.upsertThread(items, thread));
                this.loadThreadMessages(thread.threadId);
                this.refreshChatThreads(thread.threadId);
            },
            error: () => {
                this.chatLoading.set(false);
                this.chatError.set('Unable to open chat right now. Please verify API/auth connectivity and try again.');
            }
        });
    }
    closeChatPanel() {
        this.stopSelfTyping();
        this.chatPanelVisible.set(false);
        this.chatMaximized.set(false);
        this.emojiPickerVisible.set(false);
        this.pendingChatAttachments.set([]);
        this.chatLoading.set(false);
        this.chatError.set(null);
    }
    openChatInbox() {
        const unreadThreadId = this.pickMostRecentUnreadThreadId();
        this.chatPanelVisible.set(true);
        if (this.activeChatThreadId() && !unreadThreadId) {
            return;
        }
        this.refreshChatThreads(unreadThreadId ?? undefined);
    }
    selectChatThread(threadId) {
        if (!threadId || this.activeChatThreadId() === threadId) {
            return;
        }
        this.openThreadById(threadId);
    }
    async sendChatMessage() {
        const threadId = this.activeChatThreadId();
        const message = this.applyEmojiShortcuts(this.chatDraft().trim());
        const pendingAttachments = this.pendingChatAttachments();
        if (!threadId || this.chatSaving() || (!message && pendingAttachments.length === 0)) {
            return;
        }
        this.stopSelfTyping(threadId);
        this.chatSaving.set(true);
        this.chatError.set(null);
        try {
            let attachmentIds = [];
            if (pendingAttachments.length > 0) {
                this.chatAttachmentUploading.set(true);
                const uploaded = await Promise.all(pendingAttachments.map((item) => firstValueFrom(this.attachmentDataService.upload(item.file, 'DirectChatThread', threadId))));
                attachmentIds = uploaded.map((item) => item.id);
            }
            const sentMessage = await firstValueFrom(this.directChatService.sendMessage(threadId, message, attachmentIds));
            this.chatDraft.set('');
            this.emojiPickerVisible.set(false);
            this.pendingChatAttachments.set([]);
            if (this.chatAttachmentInput?.nativeElement) {
                this.chatAttachmentInput.nativeElement.value = '';
            }
            const mapped = this.mapMessageItem(sentMessage);
            this.chatMessages.update((messages) => {
                if (messages.some((item) => item.id === mapped.id)) {
                    return messages;
                }
                return [...messages, mapped];
            });
            this.markThreadAsRead(threadId);
            this.refreshChatThreads(threadId);
        }
        catch {
            this.chatError.set('Unable to send message. Please retry.');
        }
        finally {
            this.chatAttachmentUploading.set(false);
            this.chatSaving.set(false);
        }
    }
    clearActiveChat() {
        const threadId = this.activeChatThreadId();
        if (!threadId) {
            return;
        }
        this.directChatService.clearThread(threadId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.chatMessages.update((items) => items.filter((message) => message.threadId !== threadId));
            },
            error: () => {
                this.chatError.set('Unable to clear this chat.');
            }
        });
    }
    archiveActiveChat() {
        const threadId = this.activeChatThreadId();
        if (!threadId) {
            return;
        }
        this.directChatService.archiveThread(threadId, true)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.chatThreads.update((items) => items.filter((thread) => thread.threadId !== threadId));
                this.closeChatPanel();
            },
            error: () => {
                this.chatError.set('Unable to archive this chat.');
            }
        });
    }
    async addParticipantsToActiveChat() {
        const threadId = this.activeChatThreadId();
        const selected = [...new Set(this.selectedParticipantsToAdd().filter(Boolean))];
        if (!threadId || selected.length === 0 || this.chatAddingParticipants()) {
            return;
        }
        this.chatAddingParticipants.set(true);
        this.chatError.set(null);
        const results = await Promise.allSettled(selected.map(async (userId) => {
            await firstValueFrom(this.directChatService.addParticipant(threadId, userId));
            return userId;
        }));
        const addedUserIds = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value);
        const failedCount = results.length - addedUserIds.length;
        if (addedUserIds.length > 0) {
            const onlineById = new Map(this.onlinePeople().map((person) => [person.userId, person]));
            this.activeChatParticipants.update((participants) => {
                const next = [...participants];
                for (const userId of addedUserIds) {
                    const person = onlineById.get(userId);
                    if (!person || next.some((existing) => existing.userId === userId)) {
                        continue;
                    }
                    next.push(person);
                }
                return next;
            });
            this.refreshChatThreads(threadId);
        }
        if (failedCount > 0) {
            this.chatError.set(addedUserIds.length > 0
                ? `Added ${addedUserIds.length} participant(s). ${failedCount} could not be added.`
                : 'Unable to add selected participants.');
        }
        else {
            this.chatError.set(null);
        }
        this.selectedParticipantsToAdd.set([]);
        this.chatAddingParticipants.set(false);
    }
    insertEmoji(emoji) {
        this.chatDraft.update((value) => `${value}${emoji}`);
    }
    toggleEmojiPicker() {
        this.emojiPickerVisible.update((value) => !value);
    }
    onChatInput(value) {
        this.chatDraft.set(value);
        const threadId = this.activeChatThreadId();
        if (!threadId) {
            return;
        }
        if (!value.trim()) {
            this.stopSelfTyping(threadId);
            return;
        }
        this.startSelfTyping(threadId);
        if (this.typingIdleTimer) {
            clearTimeout(this.typingIdleTimer);
        }
        this.typingIdleTimer = setTimeout(() => this.stopSelfTyping(threadId), 1500);
    }
    toggleChatMaximize() {
        this.chatMaximized.update((value) => !value);
    }
    onChatAttachmentSelected(fileList) {
        if (!fileList || !fileList.length) {
            return;
        }
        const existing = this.pendingChatAttachments();
        const currentSize = existing.reduce((sum, item) => sum + item.size, 0);
        const files = Array.from(fileList);
        const maxTotalBytes = 20 * 1024 * 1024;
        const next = [...existing];
        let accumulatedSize = currentSize;
        for (const file of files) {
            if (!file || !file.name) {
                continue;
            }
            const duplicate = next.some((item) => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified);
            if (duplicate) {
                continue;
            }
            if (accumulatedSize + file.size > maxTotalBytes) {
                this.chatError.set('Total attachment size must be under 20 MB.');
                break;
            }
            next.push({
                id: crypto.randomUUID(),
                file,
                size: file.size
            });
            accumulatedSize += file.size;
        }
        this.pendingChatAttachments.set(next);
        if (this.chatAttachmentInput?.nativeElement) {
            this.chatAttachmentInput.nativeElement.value = '';
        }
    }
    removePendingChatAttachment(id) {
        this.pendingChatAttachments.update((current) => current.filter((item) => item.id !== id));
    }
    formatAttachmentSize(bytes) {
        if (!Number.isFinite(bytes) || bytes <= 0) {
            return '0 B';
        }
        const units = ['B', 'KB', 'MB', 'GB'];
        let value = bytes;
        let index = 0;
        while (value >= 1024 && index < units.length - 1) {
            value /= 1024;
            index += 1;
        }
        return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
    }
    setSelectedParticipantsToAdd(values) {
        this.selectedParticipantsToAdd.set([...(values ?? []).filter(Boolean)]);
    }
    formatChatTime(value) {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return '';
        }
        return parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    ensureUserLookupLoaded() {
        if (this.userLookupLoading() || this.userLookupLoaded()) {
            return;
        }
        this.userLookupLoading.set(true);
        this.userLookupError.set(null);
        this.userAdminData.lookupActive(undefined, 500)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (users) => {
                const map = new Map();
                for (const user of users) {
                    if (user.id) {
                        map.set(user.id, user);
                    }
                }
                this.userLookupById.set(map);
                this.userLookupLoaded.set(true);
                this.userLookupLoading.set(false);
            },
            error: () => {
                this.userLookupLoading.set(false);
                this.userLookupError.set('Unable to load user directory right now.');
            }
        });
    }
    buildInitials(name) {
        const parts = name.split(' ').filter(Boolean).slice(0, 2);
        if (!parts.length) {
            return 'U';
        }
        return parts.map((part) => part[0]?.toUpperCase() ?? '').join('');
    }
    handleRealtimeEvent(event) {
        const payload = event.payload ?? null;
        if (!payload) {
            return;
        }
        if (event.eventType === 'chat.direct.typing') {
            this.handleTypingRealtimeEvent(payload);
            return;
        }
        if (event.eventType !== 'chat.direct.message') {
            return;
        }
        const senderUserId = this.asString(payload['senderUserId']);
        const recipientUserId = this.asString(payload['recipientUserId']) ?? '';
        const threadId = this.asString(payload['threadId']);
        const content = this.asString(payload['content']);
        if (!senderUserId || !threadId || !content) {
            return;
        }
        const messageId = this.asString(payload['messageId']) ?? crypto.randomUUID();
        const senderDisplayName = this.asString(payload['senderDisplayName']) ?? 'User';
        const sentAtUtc = this.asString(payload['sentAtUtc']) ?? new Date().toISOString();
        const incoming = {
            id: messageId,
            threadId,
            senderUserId,
            senderDisplayName,
            recipientUserId,
            content,
            sentAtUtc,
            attachments: this.normalizeRealtimeAttachments(payload['attachments'])
        };
        const threadKnownBeforeEvent = this.chatThreads().some((item) => item.threadId === threadId);
        this.chatMessages.update((messages) => {
            if (messages.some((message) => message.id === incoming.id)) {
                return messages;
            }
            return [...messages, incoming];
        });
        this.removeTypingUser(threadId, senderUserId);
        this.refreshChatThreads(threadId);
        if (!this.currentUserId || senderUserId === this.currentUserId) {
            return;
        }
        const isActiveThread = this.chatPanelVisible() &&
            this.activeChatThreadId() === threadId;
        if (isActiveThread) {
            this.markThreadAsRead(threadId);
            return;
        }
        this.incrementThreadUnread(threadId);
        const action = {
            label: threadKnownBeforeEvent ? 'Reply' : 'Open chat',
            callback: () => this.openThreadById(threadId, senderUserId, senderDisplayName)
        };
        if (threadKnownBeforeEvent) {
            this.notificationService.info(`New message from ${senderDisplayName}`, this.truncateMessage(content), action);
            return;
        }
        this.notificationService.show({
            type: 'warning',
            title: `New conversation from ${senderDisplayName}`,
            message: this.truncateMessage(content),
            action,
            duration: 9000,
            dismissible: true
        });
        this.playNewConversationSound();
    }
    asString(value) {
        return typeof value === 'string' && value.trim() ? value : null;
    }
    loadThreadMessages(threadId) {
        this.chatLoading.set(true);
        this.chatError.set(null);
        this.directChatService.getMessages(threadId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (messages) => {
                this.chatMessages.update((current) => {
                    const withoutThread = current.filter((message) => message.threadId !== threadId);
                    const mapped = messages.map((message) => this.mapMessageItem(message));
                    return [...withoutThread, ...mapped];
                });
                this.chatLoading.set(false);
                if (this.activeChatThreadId() === threadId && this.chatPanelVisible()) {
                    this.markThreadAsRead(threadId);
                }
            },
            error: () => {
                this.chatLoading.set(false);
                this.chatError.set('Unable to load chat history.');
            }
        });
    }
    mapMessageItem(item) {
        return {
            id: item.messageId,
            threadId: item.threadId,
            senderUserId: item.senderUserId,
            senderDisplayName: item.senderDisplayName,
            recipientUserId: '',
            content: item.content,
            sentAtUtc: item.sentAtUtc,
            attachments: (item.attachments ?? []).map((attachment) => this.mapAttachmentItem(attachment))
        };
    }
    mapAttachmentItem(item) {
        const baseUrl = (environment.apiUrl ?? '').replace(/\/+$/, '');
        const path = item.downloadUrl?.trim() ?? '';
        const downloadUrl = path.startsWith('http')
            ? path
            : `${baseUrl}/${path.replace(/^\/+/, '')}`;
        return {
            attachmentId: item.attachmentId,
            fileName: item.fileName,
            contentType: item.contentType,
            size: item.size,
            downloadUrl
        };
    }
    normalizeRealtimeAttachments(raw) {
        if (!Array.isArray(raw)) {
            return [];
        }
        const baseUrl = (environment.apiUrl ?? '').replace(/\/+$/, '');
        const attachments = [];
        for (const item of raw) {
            if (!item || typeof item !== 'object') {
                continue;
            }
            const record = item;
            const attachmentId = this.asString(record['attachmentId']);
            const fileName = this.asString(record['fileName']);
            const contentType = this.asString(record['contentType']) ?? 'application/octet-stream';
            const sizeRaw = record['size'];
            const size = typeof sizeRaw === 'number' ? sizeRaw : Number(sizeRaw ?? 0);
            if (!attachmentId || !fileName) {
                continue;
            }
            attachments.push({
                attachmentId,
                fileName,
                contentType,
                size: Number.isFinite(size) ? size : 0,
                downloadUrl: `${baseUrl}/api/attachments/${attachmentId}/download`
            });
        }
        return attachments;
    }
    mapThreadParticipants(thread) {
        const lookup = this.userLookupById();
        return thread.participants.map((participant) => ({
            userId: participant.userId,
            displayName: participant.displayName,
            email: participant.email,
            initials: this.buildInitials(participant.displayName),
            profilePictureUrl: lookup.get(participant.userId)?.profilePictureUrl ?? null
        }));
    }
    incrementThreadUnread(threadId) {
        this.chatUnreadByThread.update((current) => {
            const next = new Map(current);
            next.set(threadId, (next.get(threadId) ?? 0) + 1);
            return next;
        });
    }
    markThreadAsRead(threadId) {
        this.chatUnreadByThread.update((current) => {
            if (!current.has(threadId)) {
                return current;
            }
            const next = new Map(current);
            next.delete(threadId);
            return next;
        });
    }
    pickMostRecentUnreadThreadId() {
        const unreadIds = [...this.chatUnreadByThread().keys()];
        if (unreadIds.length === 0) {
            return null;
        }
        const messages = this.chatMessages();
        unreadIds.sort((first, second) => {
            const firstLast = messages
                .filter((message) => message.threadId === first)
                .map((message) => new Date(message.sentAtUtc).getTime())
                .sort((a, b) => b - a)[0] ?? 0;
            const secondLast = messages
                .filter((message) => message.threadId === second)
                .map((message) => new Date(message.sentAtUtc).getTime())
                .sort((a, b) => b - a)[0] ?? 0;
            return secondLast - firstLast;
        });
        return unreadIds[0] ?? null;
    }
    openThreadById(threadId, senderUserId, senderDisplayName) {
        this.chatPanelVisible.set(true);
        this.chatLoading.set(true);
        this.chatError.set(null);
        this.directChatService.listThreads()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (threads) => {
                this.chatThreads.set(threads);
                const thread = threads.find((item) => item.threadId === threadId);
                if (thread) {
                    this.activeChatThreadId.set(thread.threadId);
                    const participants = this.mapThreadParticipants(thread);
                    this.activeChatParticipants.set(participants);
                    const focusUser = participants.find((person) => person.userId !== this.currentUserId) ?? participants[0] ?? null;
                    if (focusUser) {
                        this.activeChatUser.set(focusUser);
                    }
                    this.loadThreadMessages(thread.threadId);
                    this.markThreadAsRead(thread.threadId);
                    return;
                }
                if (senderUserId) {
                    this.fallbackOpenOneToOne(senderUserId, senderDisplayName);
                    return;
                }
                this.chatLoading.set(false);
                this.chatError.set('Unable to open this conversation.');
            },
            error: () => {
                if (senderUserId) {
                    this.fallbackOpenOneToOne(senderUserId, senderDisplayName);
                    return;
                }
                this.chatLoading.set(false);
                this.chatError.set('Unable to open this conversation.');
            }
        });
    }
    refreshChatThreads(preferredThreadId) {
        this.chatThreadLoading.set(true);
        this.directChatService.listThreads()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (threads) => {
                this.chatThreadLoading.set(false);
                this.chatThreads.set(threads);
                if (preferredThreadId && !this.activeChatThreadId() && this.chatPanelVisible()) {
                    const preferred = threads.find((thread) => thread.threadId === preferredThreadId);
                    if (preferred) {
                        this.openThreadById(preferredThreadId);
                        return;
                    }
                    const recentForThread = this.chatMessages()
                        .filter((message) => message.threadId === preferredThreadId)
                        .sort((first, second) => new Date(second.sentAtUtc).getTime() - new Date(first.sentAtUtc).getTime())[0] ?? null;
                    if (recentForThread?.senderUserId && recentForThread.senderUserId !== this.currentUserId) {
                        this.fallbackOpenOneToOne(recentForThread.senderUserId, recentForThread.senderDisplayName);
                        return;
                    }
                }
                if (!this.activeChatThreadId() && threads.length > 0 && this.chatPanelVisible()) {
                    this.openThreadById(threads[0].threadId);
                }
            },
            error: () => {
                this.chatThreadLoading.set(false);
            }
        });
    }
    fallbackOpenOneToOne(senderUserId, senderDisplayName) {
        this.directChatService.openThread([senderUserId])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (thread) => {
                this.activeChatThreadId.set(thread.threadId);
                const participants = this.mapThreadParticipants(thread);
                this.activeChatParticipants.set(participants);
                this.chatThreads.update((items) => this.upsertThread(items, thread));
                const focusUser = participants.find((person) => person.userId === senderUserId)
                    ?? participants.find((person) => person.userId !== this.currentUserId)
                    ?? (senderDisplayName ? {
                        userId: senderUserId,
                        displayName: senderDisplayName,
                        email: null,
                        initials: this.buildInitials(senderDisplayName),
                        profilePictureUrl: this.userLookupById().get(senderUserId)?.profilePictureUrl ?? null
                    } : null);
                if (focusUser) {
                    this.activeChatUser.set(focusUser);
                }
                this.loadThreadMessages(thread.threadId);
                this.markThreadAsRead(thread.threadId);
            },
            error: () => {
                this.chatLoading.set(false);
                this.chatError.set('Unable to open this conversation.');
            }
        });
    }
    truncateMessage(message, maxLength = 120) {
        if (message.length <= maxLength) {
            return message;
        }
        return `${message.slice(0, maxLength - 1)}…`;
    }
    buildAvatarInitials(displayName) {
        return this.buildInitials(displayName || 'User');
    }
    getUserProfilePicture(userId) {
        return this.userLookupById().get(userId)?.profilePictureUrl ?? null;
    }
    startSelfTyping(threadId) {
        if (this.lastTypingThreadId && this.lastTypingThreadId !== threadId && this.typingAnnounced) {
            this.sendTypingStatus(this.lastTypingThreadId, false);
            this.typingAnnounced = false;
        }
        if (!this.typingAnnounced || this.lastTypingThreadId !== threadId) {
            this.sendTypingStatus(threadId, true);
            this.typingAnnounced = true;
            this.lastTypingThreadId = threadId;
        }
    }
    stopSelfTyping(threadId) {
        if (this.typingIdleTimer) {
            clearTimeout(this.typingIdleTimer);
            this.typingIdleTimer = null;
        }
        const targetThreadId = threadId ?? this.lastTypingThreadId;
        if (!targetThreadId || !this.typingAnnounced) {
            if (!threadId) {
                this.lastTypingThreadId = null;
            }
            return;
        }
        this.sendTypingStatus(targetThreadId, false);
        this.typingAnnounced = false;
        if (!threadId || threadId === this.lastTypingThreadId) {
            this.lastTypingThreadId = null;
        }
    }
    sendTypingStatus(threadId, isTyping) {
        this.directChatService.sendTyping(threadId, isTyping)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({ error: () => void 0 });
    }
    handleTypingRealtimeEvent(payload) {
        const threadId = this.asString(payload['threadId']);
        const senderUserId = this.asString(payload['senderUserId']);
        const senderDisplayName = this.asString(payload['senderDisplayName']) ?? 'User';
        const isTyping = Boolean(payload['isTyping']);
        if (!threadId || !senderUserId || senderUserId === this.currentUserId) {
            return;
        }
        if (!isTyping) {
            this.removeTypingUser(threadId, senderUserId);
            return;
        }
        this.typingUsersByThread.update((current) => {
            const next = new Map(current);
            const users = new Map(next.get(threadId) ?? []);
            users.set(senderUserId, senderDisplayName);
            next.set(threadId, users);
            return next;
        });
        const timerKey = `${threadId}:${senderUserId}`;
        const previousTimer = this.typingExpiryTimers.get(timerKey);
        if (previousTimer) {
            clearTimeout(previousTimer);
        }
        this.typingExpiryTimers.set(timerKey, setTimeout(() => {
            this.removeTypingUser(threadId, senderUserId);
            this.typingExpiryTimers.delete(timerKey);
        }, 3500));
    }
    removeTypingUser(threadId, userId) {
        this.typingUsersByThread.update((current) => {
            const users = current.get(threadId);
            if (!users || !users.has(userId)) {
                return current;
            }
            const next = new Map(current);
            const updatedUsers = new Map(users);
            updatedUsers.delete(userId);
            if (updatedUsers.size === 0) {
                next.delete(threadId);
            }
            else {
                next.set(threadId, updatedUsers);
            }
            return next;
        });
    }
    playNewConversationSound() {
        if (typeof window === 'undefined') {
            return;
        }
        const now = Date.now();
        if (now - this.lastNewConversationSoundAt < 2500) {
            return;
        }
        this.lastNewConversationSoundAt = now;
        const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextCtor) {
            return;
        }
        try {
            const context = new AudioContextCtor();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.value = 740;
            gainNode.gain.setValueAtTime(0.0001, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.05, context.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.22);
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            oscillator.start();
            oscillator.stop(context.currentTime + 0.24);
            oscillator.onended = () => {
                void context.close();
            };
        }
        catch {
            // Ignore browser audio-policy failures (e.g., autoplay restrictions).
        }
    }
    upsertThread(current, candidate) {
        const next = [...current];
        const index = next.findIndex((item) => item.threadId === candidate.threadId);
        if (index >= 0) {
            next[index] = candidate;
            return next;
        }
        return [...next, candidate];
    }
    applyEmojiShortcuts(value) {
        let result = value;
        for (const [shortcut, emoji] of Object.entries(EMOJI_SHORTCUTS)) {
            result = result.replaceAll(shortcut, emoji);
        }
        return result;
    }
    syncSidebarForViewport() {
        if (typeof window === 'undefined') {
            return;
        }
        this.nav.applyResponsiveSidebarState(window.innerWidth <= 840);
    }
    static ɵfac = function ShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ShellComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ShellComponent, selectors: [["app-shell"]], viewQuery: function ShellComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.quickAddModal = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.chatAttachmentInput = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.presenceTrigger = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.presencePopup = _t.first);
        } }, hostBindings: function ShellComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("crm-quick-add", function ShellComponent_crm_quick_add_HostBindingHandler($event) { return ctx.handleQuickAddEvent($event); }, i0.ɵɵresolveWindow)("resize", function ShellComponent_resize_HostBindingHandler() { return ctx.onWindowResize(); }, i0.ɵɵresolveWindow)("click", function ShellComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function ShellComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, i0.ɵɵresolveDocument);
        } }, decls: 53, vars: 23, consts: [["presenceTrigger", ""], ["quickAddModal", ""], ["presencePopup", ""], ["chatAttachmentInput", ""], [1, "shell", 3, "ngClass"], [3, "toggleSidebar"], [1, "body"], ["aria-hidden", "true", 1, "shell-page-background"], [1, "shell-animated-orb", "orb-1"], [1, "shell-animated-orb", "orb-2"], [1, "shell-animated-orb", "orb-3"], [1, "shell-grid-pattern"], [3, "toggleSidebar", "openQuickAdd"], ["title", "Show topbar", 1, "show-topbar-btn"], ["aria-hidden", "true", 1, "app-topbar-activity-strip"], ["role", "status", "aria-live", "polite", "aria-atomic", "true", 1, "global-loading-indicator"], [1, "content"], [1, "app-footer"], [1, "footer-left"], [1, "footer-brand"], [1, "footer-divider"], [1, "footer-meta"], [1, "footer-right"], ["type", "button", 1, "footer-presence", 3, "click", "pTooltip"], ["aria-hidden", "true", 1, "footer-presence-dot"], [1, "footer-presence-label"], [1, "footer-presence-count"], ["type", "button", 1, "footer-chat", 3, "click"], ["aria-hidden", "true", 1, "pi", "pi-comments"], [1, "footer-chat-label"], [1, "footer-chat-badge"], [1, "online-presence-popup"], [1, "footer-chip"], ["href", "mailto:support@northedgesystem.com", 1, "footer-link"], [3, "close", "created", "visible"], ["class", "global-loading-overlay", 4, "ngIf"], ["title", "Show topbar", 1, "show-topbar-btn", 3, "click"], [1, "pi", "pi-chevron-down"], ["styleClass", "global-loading-indicator__spinner", "strokeWidth", "7", "animationDuration", ".8s"], [1, "global-loading-indicator__copy"], [1, "online-presence-popup", 3, "click"], [1, "online-presence-header"], [1, "online-presence-header__title"], [1, "online-presence-header__count"], [1, "online-presence-status"], ["aria-hidden", "true", 1, "online-presence-status__dot"], [1, "online-presence-scroll"], [1, "online-presence-empty"], [1, "online-presence-list"], ["type", "button", 1, "online-presence-retry", 3, "click"], [1, "online-presence-item"], ["aria-hidden", "true", 1, "online-presence-avatar"], [3, "src", "alt"], [1, "online-presence-meta"], [1, "online-presence-name"], [1, "online-presence-email"], [1, "online-presence-badge"], ["type", "button", 1, "online-presence-chat-btn", 3, "click", "disabled"], ["role", "dialog", "aria-label", "Direct chat", 1, "direct-chat-panel", 3, "direct-chat-panel--maximized"], ["role", "dialog", "aria-label", "Direct chat", 1, "direct-chat-panel"], [1, "direct-chat-threads"], [1, "direct-chat-threads__header"], [1, "direct-chat-threads__list"], [1, "direct-chat-empty"], [1, "direct-chat-main"], [1, "direct-chat-header"], [1, "direct-chat-header__meta"], ["aria-hidden", "true", 1, "direct-chat-header__avatar"], [1, "direct-chat-header__text"], [1, "direct-chat-header__actions"], ["type", "button", 1, "direct-chat-mini-btn", 3, "click"], ["type", "button", 1, "direct-chat-close", 3, "click"], [1, "direct-chat-messages"], [1, "direct-chat-error"], [1, "direct-chat-compose"], [1, "direct-chat-typing"], ["type", "button", 1, "direct-chat-emoji-btn", 3, "click"], [1, "direct-chat-attach-btn"], ["type", "file", "multiple", "", 3, "change"], ["type", "text", "placeholder", "Type a message...", 3, "input", "keydown.enter", "focus", "value"], ["type", "button", 3, "click", "disabled"], [1, "direct-chat-attachments-pending"], [1, "direct-chat-emoji-picker"], ["type", "button", 1, "direct-chat-thread-item", 3, "is-active"], ["type", "button", 1, "direct-chat-thread-item", 3, "click"], [1, "direct-chat-thread-item__top"], [1, "direct-chat-thread-item__bottom"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Add participants", "display", "chip", "appendTo", "body", 1, "direct-chat-add-select", 3, "ngModelChange", "options", "ngModel", "filter", "showClear", "maxSelectedLabels"], ["type", "button", 1, "direct-chat-mini-btn", 3, "click", "disabled"], [1, "direct-chat-message", 3, "direct-chat-message--mine"], [1, "direct-chat-message"], ["aria-hidden", "true", 1, "direct-chat-message__avatar"], [1, "direct-chat-message__content"], [1, "direct-chat-message__sender"], [1, "direct-chat-message__attachments"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "direct-chat-attachments-pending__chip"], ["type", "button", 3, "click"], ["type", "button"], [1, "direct-chat-emoji-hint"], [1, "global-loading-overlay"], ["styleClass", "global-loading-spinner", "strokeWidth", "6", "animationDuration", ".8s"]], template: function ShellComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "app-sidebar", 5);
            i0.ɵɵlistener("toggleSidebar", function ShellComponent_Template_app_sidebar_toggleSidebar_1_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.nav.toggleSidebar()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "div", 6)(3, "div", 7);
            i0.ɵɵelement(4, "div", 8)(5, "div", 9)(6, "div", 10)(7, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "app-topbar", 12);
            i0.ɵɵlistener("toggleSidebar", function ShellComponent_Template_app_topbar_toggleSidebar_8_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.nav.toggleSidebar()); })("openQuickAdd", function ShellComponent_Template_app_topbar_openQuickAdd_8_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openQuickAdd()); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(9, ShellComponent_Conditional_9_Template, 2, 0, "button", 13);
            i0.ɵɵelement(10, "div", 14);
            i0.ɵɵconditionalCreate(11, ShellComponent_Conditional_11_Template, 7, 3, "div", 15);
            i0.ɵɵelementStart(12, "main", 16);
            i0.ɵɵelement(13, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "app-assistant-panel");
            i0.ɵɵelementStart(15, "footer", 17)(16, "div", 18)(17, "span", 19);
            i0.ɵɵtext(18, "CRM Enterprise");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span", 20);
            i0.ɵɵtext(20, "\u2022");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span", 21);
            i0.ɵɵtext(22, "Internal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span", 20);
            i0.ɵɵtext(24, "\u2022");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 21);
            i0.ɵɵtext(26, "v2.0");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 22)(28, "button", 23, 0);
            i0.ɵɵlistener("click", function ShellComponent_Template_button_click_28_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleOnlineUsersPopup($event)); });
            i0.ɵɵelement(30, "span", 24);
            i0.ɵɵelementStart(31, "span", 25);
            i0.ɵɵtext(32, "Online");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "strong", 26);
            i0.ɵɵtext(34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "button", 27);
            i0.ɵɵlistener("click", function ShellComponent_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openChatInbox()); });
            i0.ɵɵelement(36, "i", 28);
            i0.ɵɵelementStart(37, "span", 29);
            i0.ɵɵtext(38, "Chat");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(39, ShellComponent_Conditional_39_Template, 2, 1, "strong", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(40, ShellComponent_Conditional_40_Template, 16, 6, "div", 31);
            i0.ɵɵelementStart(41, "span", 32);
            i0.ɵɵtext(42, "ENV: DEV");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "a", 33);
            i0.ɵɵtext(44, "Support");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(45, "app-toast");
            i0.ɵɵconditionalCreate(46, ShellComponent_Conditional_46_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(47, "app-notification-container")(48, "app-command-palette")(49, "app-keyboard-shortcuts-modal");
            i0.ɵɵelementStart(50, "app-quick-add-modal", 34, 1);
            i0.ɵɵlistener("close", function ShellComponent_Template_app_quick_add_modal_close_50_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.quickAddVisible.set(false)); })("created", function ShellComponent_Template_app_quick_add_modal_created_50_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onQuickAddCreated()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(52, ShellComponent_div_52_Template, 2, 3, "div", 35);
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(20, _c4, ctx.nav.collapsed(), ctx.nav.topbarHidden()));
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.nav.topbarHidden() ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("is-active", ctx.loadingOverlay.activityVisible());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loadingOverlay.activityVisible() ? 11 : -1);
            i0.ɵɵadvance(17);
            i0.ɵɵclassProp("is-connected", ctx.presenceConnectionState() === "connected")("is-reconnecting", ctx.presenceConnectionState() === "reconnecting")("is-connecting", ctx.presenceConnectionState() === "connecting");
            i0.ɵɵproperty("pTooltip", ctx.footerPresenceTooltip());
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.onlineCount());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("has-unread", ctx.chatUnreadTotal() > 0);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.chatUnreadTotal() > 0 ? 39 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.onlineUsersPopupVisible() ? 40 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.chatPanelVisible() ? 46 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("visible", ctx.quickAddVisible());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.loadingOverlay.visible());
        } }, dependencies: [RouterOutlet,
            NgClass,
            NgIf,
            FormsModule, i1.NgControlStatus, i1.NgModel, NotificationContainerComponent,
            CommandPaletteComponent,
            KeyboardShortcutsModalComponent,
            AppToastComponent,
            AssistantPanelComponent,
            SidebarComponent,
            TopbarComponent,
            QuickAddModalComponent,
            ProgressSpinnerModule, i2.ProgressSpinner, TooltipModule, i3.Tooltip, MultiSelectModule, i4.MultiSelect], styles: [".shell[_ngcontent-%COMP%] {\n  --shell-sidebar-width: 256px;\n  --shell-topbar-height: 38px;\n  --shell-topbar-strip-height: 3px;\n  --shell-footer-safe-height: 26px;\n  --shell-floating-gap: 0px;\n  display: grid;\n  grid-template-columns: var(--shell-sidebar-width) 1fr;\n  width: 100%;\n  max-width: 100%;\n  min-height: 100dvh;\n  max-height: 100dvh;\n  align-items: stretch;\n  background: radial-gradient(circle at 18% 20%, rgba(91, 224, 200, 0.24), transparent 32%),\n    radial-gradient(circle at 82% 12%, rgba(124, 210, 255, 0.24), transparent 28%),\n    radial-gradient(circle at 50% 80%, rgba(155, 139, 255, 0.14), transparent 36%),\n    var(--surface-base);\n  color: var(--text-strong);\n  transition: grid-template-columns 0.2s ease;\n  overflow: hidden;\n}\n\n.shell[_ngcontent-%COMP%]    > app-sidebar[_ngcontent-%COMP%] {\n  display: block;\n  align-self: start;\n}\n\n@media (min-width: 841px) {\n  .shell[_ngcontent-%COMP%]    > app-sidebar[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 0;\n    height: 100dvh;\n    min-height: 100dvh;\n  }\n}\n\n@media (min-width: 841px) and (max-width: 1280px) {\n  .shell[_ngcontent-%COMP%]:not(.shell--collapsed) {\n    --shell-sidebar-width: min(360px, 32vw);\n  }\n}\n\n.shell--collapsed[_ngcontent-%COMP%] {\n  --shell-sidebar-width: 88px;\n  grid-template-columns: var(--shell-sidebar-width) 1fr;\n}\n\n.show-topbar-btn[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 4px;\n  right: 12px;\n  z-index: 40;\n  width: 32px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(15, 23, 42, 0.85);\n  border: 1px solid rgba(186, 220, 255, 0.25);\n  border-radius: 0 0 6px 6px;\n  color: rgba(255, 255, 255, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(12px);\n  \n  .pi {\n    font-size: 0.7rem;\n  }\n  \n  &:hover {\n    background: rgba(15, 23, 42, 0.95);\n    color: #ffffff;\n    border-color: rgba(186, 220, 255, 0.4);\n  }\n}\n\n.body[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100dvh;\n  max-height: 100dvh;\n  overflow: hidden;\n  // Fallback baseline for CRM pages/forms that do not render an explicit .page-background layer.\n  background:\n    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n  background-size: 60px 60px, 60px 60px, auto;\n  background-position: 0 0, 0 0, 0 0;\n}\n\n.shell-page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0 0 0 var(--shell-sidebar-width);\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n  transition: opacity 180ms ease;\n}\n\n.shell-animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(100px);\n  opacity: 0.7;\n  animation: orb-float 25s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.9));\n    top: -150px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: linear-gradient(135deg, rgba(34, 211, 238, 0.9), rgba(56, 189, 248, 0.85));\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 350px;\n    height: 350px;\n    background: linear-gradient(135deg, rgba(244, 114, 182, 0.82), rgba(168, 85, 247, 0.8));\n    bottom: -80px;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n.shell-grid-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);\n  background-size: 60px 60px;\n  opacity: 0.5;\n}\n\n//[_ngcontent-%COMP%]   If[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   page[_ngcontent-%COMP%]   renders[_ngcontent-%COMP%]   its[_ngcontent-%COMP%]   own[_ngcontent-%COMP%]   background[_ngcontent-%COMP%]   layer[_ngcontent-%COMP%]   (e.g., Activity Workspace)[_ngcontent-%COMP%], suppress[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   shell[_ngcontent-%COMP%]   fallback\n//[_ngcontent-%COMP%]   so[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   visuals[_ngcontent-%COMP%]   don't[_ngcontent-%COMP%]   stack.\n@supports[_ngcontent-%COMP%]   selector(.body:has(.content .page-background))[_ngcontent-%COMP%] {\n  .body:has(.content .page-background) .shell-page-background {\n    opacity: 0;\n  }\n}\n\n.content[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  min-width: 0;\n  padding: var(--md-space-6) var(--md-space-7) var(--md-space-8);\n  backdrop-filter: blur(4px);\n  overflow-x: clip;\n  overflow-y: auto;\n  position: relative;\n  z-index: 1;\n}\n\n.app-topbar-activity-strip[_ngcontent-%COMP%] {\n  position: relative;\n  height: var(--shell-topbar-strip-height);\n  z-index: 2;\n  pointer-events: none;\n  opacity: 0;\n  transform: scaleX(0.985);\n  transform-origin: center;\n  transition:\n    opacity 140ms ease,\n    transform 180ms ease;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 0, 102, 0.95) 0%,\n      rgba(255, 140, 0, 0.95) 16%,\n      rgba(255, 230, 0, 0.95) 32%,\n      rgba(51, 255, 51, 0.95) 48%,\n      rgba(0, 217, 255, 0.95) 64%,\n      rgba(64, 128, 255, 0.95) 80%,\n      rgba(180, 70, 255, 0.95) 92%,\n      rgba(255, 0, 102, 0.95) 100%\n    );\n  background-size: 220% 100%;\n  border-top: 1px solid rgba(255, 255, 255, 0.16);\n  box-shadow:\n    0 0 0 rgba(56, 189, 248, 0),\n    0 2px 14px rgba(14, 165, 233, 0),\n    0 4px 18px rgba(167, 139, 250, 0);\n}\n\n.app-topbar-activity-strip::before[_ngcontent-%COMP%] {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.55) 10%,\n      rgba(255, 255, 255, 0.10) 18%,\n      transparent 28%\n    );\n  background-size: 180% 100%;\n  mix-blend-mode: screen;\n  opacity: 0;\n}\n\n.app-topbar-activity-strip.is-active[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scaleX(1);\n  animation:\n    topbar-rgb-strip-flow 1.25s linear infinite,\n    topbar-rgb-strip-pulse 900ms ease-in-out infinite;\n  box-shadow:\n    0 0 12px rgba(56, 189, 248, 0.24),\n    0 2px 14px rgba(14, 165, 233, 0.22),\n    0 4px 18px rgba(167, 139, 250, 0.20);\n}\n\n.app-topbar-activity-strip.is-active::before[_ngcontent-%COMP%] {\n  opacity: 1;\n  animation: topbar-rgb-strip-sheen 1.25s linear infinite;\n}\n\n.global-loading-indicator[_ngcontent-%COMP%] {\n  position: fixed;\n  top: calc(var(--shell-topbar-height) + 18px);\n  right: 22px;\n  z-index: 120;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 220px;\n  padding: 10px 14px;\n  border-radius: 16px;\n  border: 1px solid rgba(125, 211, 252, 0.34);\n  background:\n    linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.78)),\n    linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(244, 114, 182, 0.16));\n  box-shadow:\n    0 18px 44px rgba(15, 23, 42, 0.26),\n    0 0 0 1px rgba(255, 255, 255, 0.03) inset;\n  backdrop-filter: blur(14px);\n  pointer-events: none;\n  animation: loading-indicator-float 180ms ease-out;\n}\n\n.global-loading-indicator__copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n\n  strong {\n    color: #e2e8f0;\n    font-size: 0.9rem;\n    font-weight: 700;\n    letter-spacing: 0.01em;\n  }\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.75rem;\n    line-height: 1.3;\n  }\n}\n\n[_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .global-loading-indicator__spinner.p-progressspinner[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  color: #38bdf8;\n  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));\n}\n\n[_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .global-loading-indicator__spinner[_ngcontent-%COMP%]   .p-progressspinner-circle[_ngcontent-%COMP%] {\n  stroke-linecap: round;\n}\n\n.app-footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 26;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 0;\n  padding: 3px 12px;\n  border-radius: 0;\n  border: none;\n  border-top: 1px solid rgba(186, 220, 255, 0.16);\n  color: rgba(226, 232, 240, 0.88);\n  font-size: 0.68rem;\n  background:\n    linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.86), rgba(17, 24, 39, 0.82) 45%, rgba(30, 41, 59, 0.78));\n  backdrop-filter: blur(14px) saturate(135%);\n  box-shadow:\n    0 -4px 16px rgba(2, 6, 23, 0.22),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n\n.app-footer::before[_ngcontent-%COMP%] {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  pointer-events: none;\n  background: radial-gradient(circle at 15% 20%, rgba(96, 165, 250, 0.10), transparent 42%),\n    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.09), transparent 46%);\n  opacity: 0.75;\n}\n\n.app-footer[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.footer-left,\n.footer-right[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n  flex-wrap: wrap;\n}\n\n.footer-right[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: visible;\n}\n\n.footer-brand[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #f8fafc;\n  font-size: 0.68rem;\n}\n\n.footer-divider[_ngcontent-%COMP%] {\n  opacity: 0.28;\n  color: #cbd5e1;\n}\n\n.footer-meta[_ngcontent-%COMP%] {\n  color: rgba(203, 213, 225, 0.88);\n}\n\n.footer-chip[_ngcontent-%COMP%] {\n  padding: 0 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(56, 189, 248, 0.3);\n  color: #bfdbfe;\n  background: linear-gradient(135deg, rgba(14, 116, 144, 0.30), rgba(30, 64, 175, 0.26));\n  font-weight: 700;\n  letter-spacing: 0.015em;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);\n}\n\n.footer-link[_ngcontent-%COMP%] {\n  color: #93c5fd;\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.footer-link:hover[_ngcontent-%COMP%] {\n  color: #dbeafe;\n  text-decoration: underline;\n}\n\n.footer-presence[_ngcontent-%COMP%] {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 1px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.45);\n  color: rgba(226, 232, 240, 0.92);\n  cursor: pointer;\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.footer-presence:hover[_ngcontent-%COMP%] {\n  transform: translateY(-1px);\n  border-color: rgba(125, 211, 252, 0.45);\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.14);\n}\n\n.footer-presence:focus-visible[_ngcontent-%COMP%] {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.28);\n}\n\n.footer-presence-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: rgba(148, 163, 184, 0.9);\n  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);\n}\n\n.footer-presence-label[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  font-weight: 600;\n}\n\n.footer-presence-count[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n\n.footer-presence.is-connected[_ngcontent-%COMP%]   .footer-presence-dot[_ngcontent-%COMP%] {\n  background: #22c55e;\n  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2), 0 0 10px rgba(34, 197, 94, 0.35);\n}\n\n.footer-presence.is-reconnecting[_ngcontent-%COMP%]   .footer-presence-dot,\n.footer-presence.is-connecting[_ngcontent-%COMP%]   .footer-presence-dot[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2), 0 0 8px rgba(245, 158, 11, 0.32);\n}\n\n.footer-chat[_ngcontent-%COMP%] {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 1px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.45);\n  color: rgba(226, 232, 240, 0.92);\n  cursor: pointer;\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.footer-chat:hover[_ngcontent-%COMP%] {\n  transform: translateY(-1px);\n  border-color: rgba(125, 211, 252, 0.45);\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.14);\n}\n\n.footer-chat:focus-visible[_ngcontent-%COMP%] {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.28);\n}\n\n.footer-chat.has-unread[_ngcontent-%COMP%] {\n  border-color: rgba(251, 113, 133, 0.48);\n  box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.15);\n}\n\n.footer-chat-label[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  font-weight: 600;\n}\n\n.footer-chat-badge[_ngcontent-%COMP%] {\n  min-width: 1.1rem;\n  height: 1.1rem;\n  padding: 0 0.28rem;\n  border-radius: 999px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.68rem;\n  font-weight: 800;\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #f97316);\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;\n}\n\n.online-presence-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 8px;\n}\n\n.online-presence-header__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n\n.online-presence-header__count[_ngcontent-%COMP%] {\n  min-width: 28px;\n  text-align: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #dbeafe;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  background: rgba(30, 64, 175, 0.28);\n}\n\n.online-presence-popup[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 10px);\n  width: min(340px, 90vw);\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.92), rgba(30, 41, 59, 0.9));\n  box-shadow:\n    0 16px 32px rgba(2, 6, 23, 0.35),\n    inset 0 1px 0 rgba(255, 255, 255, 0.07);\n  z-index: 60;\n}\n\n.online-presence-scroll[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  padding-right: 2px;\n}\n\n.online-presence-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(226, 232, 240, 0.92);\n  background: rgba(15, 23, 42, 0.35);\n  width: fit-content;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.online-presence-status__dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(148, 163, 184, 0.9);\n}\n\n.online-presence-status[data-state='connected'][_ngcontent-%COMP%]   .online-presence-status__dot[_ngcontent-%COMP%] {\n  background: #22c55e;\n  box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);\n}\n\n.online-presence-status[data-state='reconnecting'][_ngcontent-%COMP%]   .online-presence-status__dot,\n.online-presence-status[data-state='connecting'][_ngcontent-%COMP%]   .online-presence-status__dot[_ngcontent-%COMP%] {\n  background: #f59e0b;\n  box-shadow: 0 0 8px rgba(245, 158, 11, 0.32);\n}\n\n.online-presence-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.online-presence-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(15, 23, 42, 0.28);\n}\n\n.online-presence-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.76rem;\n  font-weight: 700;\n  color: #f8fafc;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(14, 165, 233, 0.86));\n  overflow: hidden;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n}\n\n.online-presence-meta[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.online-presence-name[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: #f8fafc;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.online-presence-email[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: rgba(203, 213, 225, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.online-presence-badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #bbf7d0;\n  border: 1px solid rgba(34, 197, 94, 0.35);\n  background: rgba(34, 197, 94, 0.16);\n}\n\n.online-presence-chat-btn[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 999px;\n  background: rgba(30, 64, 175, 0.25);\n  color: #dbeafe;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  cursor: pointer;\n  transition: border-color 150ms ease, background-color 150ms ease;\n}\n\n.online-presence-chat-btn:hover:not(:disabled)[_ngcontent-%COMP%] {\n  border-color: rgba(125, 211, 252, 0.5);\n  background: rgba(30, 64, 175, 0.36);\n}\n\n.online-presence-chat-btn:disabled[_ngcontent-%COMP%] {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.online-presence-empty[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  font-size: 0.84rem;\n  color: rgba(203, 213, 225, 0.9);\n}\n\n.online-presence-retry[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 8px;\n  background: rgba(30, 64, 175, 0.25);\n  color: #dbeafe;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  cursor: pointer;\n}\n\n.online-presence-retry:hover[_ngcontent-%COMP%] {\n  border-color: rgba(125, 211, 252, 0.5);\n  background: rgba(30, 64, 175, 0.35);\n}\n\n.direct-chat-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 14px;\n  bottom: 48px;\n  width: min(700px, 96vw);\n  max-height: min(520px, 68vh);\n  display: flex;\n  flex-direction: row;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.92), rgba(30, 41, 59, 0.9));\n  box-shadow: 0 20px 34px rgba(2, 6, 23, 0.35);\n  z-index: 70;\n  overflow: hidden;\n}\n\n.direct-chat-panel--maximized[_ngcontent-%COMP%] {\n  right: 12px;\n  left: 12px;\n  top: calc(var(--shell-topbar-height) + 6px);\n  bottom: calc(var(--shell-footer-safe-height) + 10px);\n  width: auto;\n  max-height: none;\n}\n\n.direct-chat-threads[_ngcontent-%COMP%] {\n  width: 260px;\n  min-width: 220px;\n  border-right: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(2, 6, 23, 0.3);\n  display: flex;\n  flex-direction: column;\n}\n\n.direct-chat-threads__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n\n  strong {\n    font-size: 0.8rem;\n    color: #e2e8f0;\n  }\n\n  span {\n    font-size: 0.72rem;\n    color: rgba(148, 163, 184, 0.95);\n  }\n}\n\n.direct-chat-threads__list[_ngcontent-%COMP%] {\n  padding: 6px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.direct-chat-thread-item[_ngcontent-%COMP%] {\n  appearance: none;\n  width: 100%;\n  text-align: left;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.35);\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  color: #cbd5e1;\n  cursor: pointer;\n}\n\n.direct-chat-thread-item.is-active[_ngcontent-%COMP%] {\n  border-color: rgba(56, 189, 248, 0.5);\n  background: rgba(30, 64, 175, 0.28);\n  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25) inset;\n}\n\n.direct-chat-thread-item__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n\n  strong {\n    font-size: 0.78rem;\n    color: #f8fafc;\n    max-width: 140px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  time {\n    font-size: 0.66rem;\n    color: rgba(148, 163, 184, 0.95);\n  }\n}\n\n.direct-chat-thread-item__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n\n  span {\n    font-size: 0.7rem;\n    color: rgba(203, 213, 225, 0.9);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  em {\n    min-width: 1rem;\n    height: 1rem;\n    padding: 0 0.2rem;\n    border-radius: 999px;\n    font-style: normal;\n    font-size: 0.65rem;\n    font-weight: 700;\n    color: #fff;\n    background: linear-gradient(135deg, #ef4444, #f97316);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n}\n\n.direct-chat-main[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.direct-chat-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.direct-chat-header__actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.direct-chat-add-select[_ngcontent-%COMP%] {\n  min-width: 170px;\n  max-width: 220px;\n}\n\n::ng-deep[_ngcontent-%COMP%]   .direct-chat-add-select.p-multiselect[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(15, 23, 42, 0.44);\n  min-height: 30px;\n  color: #dbeafe;\n  font-size: 0.72rem;\n\n  .p-multiselect-label {\n    padding: 4px 8px;\n    color: #dbeafe;\n  }\n\n  .p-multiselect-chip {\n    background: rgba(30, 64, 175, 0.35);\n    color: #dbeafe;\n    border: 1px solid rgba(125, 211, 252, 0.35);\n  }\n\n  .p-multiselect-dropdown {\n    color: #dbeafe;\n  }\n}\n\n.direct-chat-mini-btn[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 8px;\n  background: rgba(30, 64, 175, 0.24);\n  color: #dbeafe;\n  font-size: 0.68rem;\n  font-weight: 700;\n  padding: 4px 6px;\n  cursor: pointer;\n}\n\n.direct-chat-mini-btn:disabled[_ngcontent-%COMP%] {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.direct-chat-header__meta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n\n.direct-chat-header__avatar[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #f8fafc;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(14, 165, 233, 0.86));\n  overflow: hidden;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n}\n\n.direct-chat-header__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  strong {\n    color: #f8fafc;\n    font-size: 0.86rem;\n  }\n\n  span {\n    color: rgba(203, 213, 225, 0.9);\n    font-size: 0.72rem;\n  }\n}\n\n.direct-chat-close[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(15, 23, 42, 0.4);\n  color: #e2e8f0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.direct-chat-messages[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 120px;\n  padding: 10px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.direct-chat-empty[_ngcontent-%COMP%] {\n  margin: auto 0;\n  color: rgba(203, 213, 225, 0.9);\n  font-size: 0.82rem;\n  text-align: center;\n}\n\n.direct-chat-message[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  max-width: 86%;\n  border-radius: 12px;\n  padding: 8px 10px;\n  background: rgba(30, 41, 59, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 8px;\n\n  .direct-chat-message__avatar {\n    width: 22px;\n    height: 22px;\n    border-radius: 999px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(59, 130, 246, 0.45);\n    border: 1px solid rgba(125, 211, 252, 0.35);\n    color: #dbeafe;\n    font-size: 0.62rem;\n    font-weight: 700;\n    flex: 0 0 auto;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: 999px;\n    }\n  }\n\n  .direct-chat-message__content {\n    min-width: 0;\n  }\n\n  .direct-chat-message__attachments {\n    list-style: none;\n    margin: 6px 0 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n\n    li {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      font-size: 0.72rem;\n    }\n\n    a {\n      color: #bfdbfe;\n      text-decoration: underline;\n    }\n\n    span {\n      color: rgba(203, 213, 225, 0.82);\n    }\n  }\n\n  p {\n    margin: 0;\n    color: #f8fafc;\n    font-size: 0.82rem;\n    white-space: pre-wrap;\n    word-break: break-word;\n  }\n\n  .direct-chat-message__sender {\n    color: #93c5fd;\n    font-weight: 700;\n    margin-right: 4px;\n  }\n\n  time {\n    display: block;\n    margin-top: 4px;\n    color: rgba(203, 213, 225, 0.78);\n    font-size: 0.68rem;\n  }\n}\n\n.direct-chat-message--mine[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  background: rgba(30, 64, 175, 0.6);\n  border-color: rgba(125, 211, 252, 0.3);\n  flex-direction: row-reverse;\n\n  .direct-chat-message__sender {\n    color: #dbeafe;\n  }\n\n  .direct-chat-message__avatar {\n    background: rgba(30, 64, 175, 0.7);\n    color: #eff6ff;\n    border-color: rgba(191, 219, 254, 0.55);\n  }\n}\n\n.direct-chat-error[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0 10px;\n  color: #fca5a5;\n  font-size: 0.72rem;\n}\n\n.direct-chat-compose[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px;\n  border-top: 1px solid rgba(148, 163, 184, 0.22);\n  flex-wrap: wrap;\n\n  input {\n    flex: 1 1 auto;\n    min-width: 0;\n    border-radius: 10px;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(15, 23, 42, 0.5);\n    color: #f8fafc;\n    padding: 7px 10px;\n    font-size: 0.82rem;\n  }\n\n  button {\n    appearance: none;\n    border: 1px solid rgba(125, 211, 252, 0.36);\n    border-radius: 10px;\n    background: rgba(30, 64, 175, 0.34);\n    color: #dbeafe;\n    font-weight: 700;\n    font-size: 0.78rem;\n    padding: 7px 10px;\n    cursor: pointer;\n  }\n\n  button:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.direct-chat-typing[_ngcontent-%COMP%] {\n  flex: 1 0 100%;\n  margin: 0 0 2px;\n  font-size: 0.72rem;\n  color: rgba(186, 230, 253, 0.95);\n}\n\n.direct-chat-emoji-btn[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.52);\n  color: #f8fafc;\n  font-size: 0.9rem;\n  width: 36px;\n  height: 34px;\n  cursor: pointer;\n}\n\n.direct-chat-attach-btn[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.52);\n  color: #f8fafc;\n  font-size: 0.9rem;\n  width: 36px;\n  height: 34px;\n  cursor: pointer;\n\n  input[type='file'] {\n    position: absolute;\n    inset: 0;\n    opacity: 0;\n    cursor: pointer;\n  }\n}\n\n.direct-chat-attachments-pending[_ngcontent-%COMP%] {\n  flex: 1 0 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 2px;\n}\n\n.direct-chat-attachments-pending__chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(125, 211, 252, 0.36);\n  background: rgba(30, 64, 175, 0.28);\n  color: #dbeafe;\n  padding: 3px 8px;\n  max-width: 100%;\n\n  strong {\n    font-size: 0.7rem;\n    font-weight: 700;\n    max-width: 180px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  em {\n    font-style: normal;\n    font-size: 0.66rem;\n    color: rgba(191, 219, 254, 0.9);\n  }\n\n  button {\n    appearance: none;\n    border: none;\n    background: transparent;\n    color: #e2e8f0;\n    font-size: 0.72rem;\n    cursor: pointer;\n    padding: 0;\n    line-height: 1;\n  }\n}\n\n.direct-chat-emoji-picker[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 54px;\n  left: 10px;\n  right: 10px;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 6px;\n  padding: 8px;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(15, 23, 42, 0.94);\n  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.35);\n\n  button {\n    appearance: none;\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n    background: rgba(30, 64, 175, 0.2);\n    color: #fff;\n    height: 32px;\n    cursor: pointer;\n  }\n}\n\n.direct-chat-emoji-hint[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  font-size: 0.66rem;\n  color: rgba(191, 219, 254, 0.9);\n}\n\n@media (max-width: 768px) {\n  .shell[_ngcontent-%COMP%] {\n    --shell-floating-gap: 6px;\n  }\n\n  .app-footer[_ngcontent-%COMP%] {\n    padding: 4px 8px calc(4px + env(safe-area-inset-bottom));\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 4px;\n    border-radius: 10px;\n    border: 1px solid rgba(186, 220, 255, 0.14);\n  }\n\n  .online-presence-popup[_ngcontent-%COMP%] {\n    left: 0;\n    right: auto;\n    width: min(320px, calc(100vw - 40px));\n  }\n\n  .direct-chat-panel[_ngcontent-%COMP%] {\n    right: 8px;\n    left: 8px;\n    width: auto;\n    bottom: 76px;\n    max-height: 62vh;\n    flex-direction: column;\n  }\n\n  .direct-chat-panel--maximized[_ngcontent-%COMP%] {\n    top: 10px;\n    bottom: 72px;\n  }\n\n  .direct-chat-threads[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n    max-height: 150px;\n    border-right: none;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  }\n}\n\n@media (max-width: 1024px) {\n  .shell[_ngcontent-%COMP%] {\n    grid-template-columns: 220px 1fr;\n  }\n}\n\n@media (max-width: 840px) {\n  .shell[_ngcontent-%COMP%] {\n    --shell-sidebar-width: 0px;\n    --shell-topbar-height: 106px;\n    --shell-topbar-strip-height: 4px;\n    --shell-footer-safe-height: 56px;\n    --shell-floating-gap: 6px;\n    grid-template-columns: 1fr;\n    position: relative;\n    width: 100%;\n    max-width: 100vw;\n  }\n\n  //[_ngcontent-%COMP%]   Scrim[_ngcontent-%COMP%]   to[_ngcontent-%COMP%]   emphasize[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   open[_ngcontent-%COMP%]   sidebar[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   mobile.\n[_ngcontent-%COMP%]   .shell::after[_ngcontent-%COMP%] {\n    content: '';\n    position: fixed;\n    inset: 0;\n    background: rgba(15, 23, 42, 0.35);\n    opacity: 0;\n    pointer-events: none;\n    transition: opacity 0.25s ease;\n    z-index: 18;\n  }\n\n  .shell:not(.shell--collapsed)::after[_ngcontent-%COMP%] {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .body[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 100%;\n    min-height: 100dvh;\n    max-height: 100dvh;\n  }\n\n  .shell-page-background[_ngcontent-%COMP%] {\n    inset: 0;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    padding: var(--md-space-4);\n  }\n\n  .app-topbar-activity-strip[_ngcontent-%COMP%] {\n    height: var(--shell-topbar-strip-height);\n  }\n\n  .global-loading-indicator[_ngcontent-%COMP%] {\n    top: calc(var(--shell-topbar-height) + 10px);\n    right: 12px;\n    left: 12px;\n    min-width: 0;\n    border-radius: 14px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .app-topbar-activity-strip.is-active,\n[_ngcontent-%COMP%]   .app-topbar-activity-strip.is-active::before[_ngcontent-%COMP%] {\n    animation: none;\n  }\n\n  .shell-animated-orb[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n\n.global-loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 2200;\n  display: grid;\n  place-items: center;\n  background: transparent;\n  animation: overlay-fade-in 140ms ease-out;\n}\n\n[_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .global-loading-spinner.p-progressspinner[_ngcontent-%COMP%] {\n  color: rgb(255, 0, 0);\n  filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.55));\n  animation: spinner-rainbow 2.4s linear infinite;\n}\n\n[_nghost-%COMP%]   ::ng-deep[_ngcontent-%COMP%]   .global-loading-spinner[_ngcontent-%COMP%]   .p-progressspinner-circle[_ngcontent-%COMP%] {\n  stroke-linecap: round;\n}\n\n@keyframes _ngcontent-%COMP%_overlay-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_loading-indicator-float {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_spinner-rainbow {\n  0% {\n    color: rgb(255, 0, 0);\n    filter: drop-shadow(0 0 9px rgba(255, 0, 0, 0.6));\n  }\n  33% {\n    color: rgb(0, 255, 0);\n    filter: drop-shadow(0 0 9px rgba(0, 255, 0, 0.6));\n  }\n  66% {\n    color: rgb(0, 102, 255);\n    filter: drop-shadow(0 0 9px rgba(0, 102, 255, 0.6));\n  }\n  100% {\n    color: rgb(255, 0, 0);\n    filter: drop-shadow(0 0 9px rgba(255, 0, 0, 0.6));\n  }\n}\n\n@keyframes _ngcontent-%COMP%_topbar-rgb-strip-flow {\n  from {\n    background-position: 0% 50%;\n  }\n  to {\n    background-position: 220% 50%;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_topbar-rgb-strip-sheen {\n  from {\n    background-position: 180% 50%;\n  }\n  to {\n    background-position: -20% 50%;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_topbar-rgb-strip-pulse {\n  0%, 100% {\n    filter: saturate(1) brightness(1);\n  }\n  50% {\n    filter: saturate(1.15) brightness(1.06);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ShellComponent, [{
        type: Component,
        args: [{ selector: 'app-shell', standalone: true, imports: [
                    RouterOutlet,
                    NgClass,
                    NgIf,
                    FormsModule,
                    NotificationContainerComponent,
                    CommandPaletteComponent,
                    KeyboardShortcutsModalComponent,
                    AppToastComponent,
                    AssistantPanelComponent,
                    SidebarComponent,
                    TopbarComponent,
                    QuickAddModalComponent,
                    ProgressSpinnerModule,
                    TooltipModule,
                    MultiSelectModule
                ], template: "\n    <div class=\"shell\" [ngClass]=\"{ 'shell--collapsed': nav.collapsed(), 'shell--topbar-hidden': nav.topbarHidden() }\">\n      <app-sidebar (toggleSidebar)=\"nav.toggleSidebar()\" />\n\n      <div class=\"body\">\n        <div class=\"shell-page-background\" aria-hidden=\"true\">\n          <div class=\"shell-animated-orb orb-1\"></div>\n          <div class=\"shell-animated-orb orb-2\"></div>\n          <div class=\"shell-animated-orb orb-3\"></div>\n          <div class=\"shell-grid-pattern\"></div>\n        </div>\n        <app-topbar \n          (toggleSidebar)=\"nav.toggleSidebar()\" \n          (openQuickAdd)=\"openQuickAdd()\" \n        />\n        \n        <!-- Show topbar button when hidden -->\n        @if (nav.topbarHidden()) {\n          <button \n            class=\"show-topbar-btn\" \n            (click)=\"nav.toggleTopbar()\" \n            title=\"Show topbar\"\n          >\n            <i class=\"pi pi-chevron-down\"></i>\n          </button>\n        }\n        \n        <div\n          class=\"app-topbar-activity-strip\"\n          [class.is-active]=\"loadingOverlay.activityVisible()\"\n          aria-hidden=\"true\"\n        ></div>\n\n        @if (loadingOverlay.activityVisible()) {\n          <div class=\"global-loading-indicator\" role=\"status\" aria-live=\"polite\" aria-atomic=\"true\">\n            <p-progressSpinner\n              styleClass=\"global-loading-indicator__spinner\"\n              strokeWidth=\"7\"\n              animationDuration=\".8s\"\n              [style]=\"{ width: '20px', height: '20px' }\"\n            ></p-progressSpinner>\n            <div class=\"global-loading-indicator__copy\">\n              <strong>Loading data</strong>\n              <span>Refreshing your workspace</span>\n            </div>\n          </div>\n        }\n\n        <main class=\"content\">\n          <router-outlet />\n        </main>\n\n        <app-assistant-panel />\n\n        <footer class=\"app-footer\">\n          <div class=\"footer-left\">\n            <span class=\"footer-brand\">CRM Enterprise</span>\n            <span class=\"footer-divider\">\u2022</span>\n            <span class=\"footer-meta\">Internal</span>\n            <span class=\"footer-divider\">\u2022</span>\n            <span class=\"footer-meta\">v2.0</span>\n          </div>\n          <div class=\"footer-right\">\n            <button\n              #presenceTrigger\n              type=\"button\"\n              class=\"footer-presence\"\n              [class.is-connected]=\"presenceConnectionState() === 'connected'\"\n              [class.is-reconnecting]=\"presenceConnectionState() === 'reconnecting'\"\n              [class.is-connecting]=\"presenceConnectionState() === 'connecting'\"\n              [pTooltip]=\"footerPresenceTooltip()\"\n              (click)=\"toggleOnlineUsersPopup($event)\"\n            >\n              <span class=\"footer-presence-dot\" aria-hidden=\"true\"></span>\n              <span class=\"footer-presence-label\">Online</span>\n              <strong class=\"footer-presence-count\">{{ onlineCount() }}</strong>\n            </button>\n            <button\n              type=\"button\"\n              class=\"footer-chat\"\n              [class.has-unread]=\"chatUnreadTotal() > 0\"\n              (click)=\"openChatInbox()\"\n            >\n              <i class=\"pi pi-comments\" aria-hidden=\"true\"></i>\n              <span class=\"footer-chat-label\">Chat</span>\n              @if (chatUnreadTotal() > 0) {\n                <strong class=\"footer-chat-badge\">{{ chatUnreadTotal() }}</strong>\n              }\n            </button>\n\n            @if (onlineUsersPopupVisible()) {\n              <div #presencePopup class=\"online-presence-popup\" (click)=\"$event.stopPropagation()\">\n                <div class=\"online-presence-header\">\n                  <span class=\"online-presence-header__title\">Online Users</span>\n                  <span class=\"online-presence-header__count\">{{ onlineCount() }}</span>\n                </div>\n\n                <div class=\"online-presence-status\" [attr.data-state]=\"presenceConnectionState()\">\n                  <span class=\"online-presence-status__dot\" aria-hidden=\"true\"></span>\n                  <span>{{ presenceStatusLabel() }}</span>\n                </div>\n\n                <div class=\"online-presence-scroll\" [style.max-height.px]=\"presencePopupBodyMaxHeight()\">\n                  @if (userLookupLoading()) {\n                    <p class=\"online-presence-empty\">Loading user directory\u2026</p>\n                  } @else if (userLookupError()) {\n                    <p class=\"online-presence-empty\">{{ userLookupError() }}</p>\n                    <button type=\"button\" class=\"online-presence-retry\" (click)=\"retryUserLookup()\">Retry</button>\n                  } @else if (!onlinePeople().length) {\n                    <p class=\"online-presence-empty\">No users are online right now.</p>\n                  } @else {\n                    <ul class=\"online-presence-list\">\n                      @for (person of onlinePeople(); track person.userId) {\n                        <li class=\"online-presence-item\">\n                          <span class=\"online-presence-avatar\" aria-hidden=\"true\">\n                            @if (person.profilePictureUrl) {\n                              <img [src]=\"person.profilePictureUrl\" [alt]=\"person.displayName\" />\n                            } @else {\n                              {{ person.initials }}\n                            }\n                          </span>\n                          <div class=\"online-presence-meta\">\n                            <strong class=\"online-presence-name\">{{ person.displayName }}</strong>\n                            @if (person.email) {\n                              <span class=\"online-presence-email\">{{ person.email }}</span>\n                            }\n                          </div>\n                          <span class=\"online-presence-badge\">Online</span>\n                          <button\n                            type=\"button\"\n                            class=\"online-presence-chat-btn\"\n                            [disabled]=\"!canChatWith(person)\"\n                            (click)=\"engageChat(person)\"\n                          >\n                            Chat\n                          </button>\n                        </li>\n                      }\n                    </ul>\n                  }\n                </div>\n              </div>\n            }\n            <span class=\"footer-chip\">ENV: DEV</span>\n            <a class=\"footer-link\" href=\"mailto:support@northedgesystem.com\">Support</a>\n          </div>\n        </footer>\n\n        <app-toast />\n\n        @if (chatPanelVisible()) {\n          @if (activeChatUser(); as activeUser) {\n            <section class=\"direct-chat-panel\" [class.direct-chat-panel--maximized]=\"chatMaximized()\" role=\"dialog\" aria-label=\"Direct chat\">\n              <aside class=\"direct-chat-threads\">\n                <header class=\"direct-chat-threads__header\">\n                  <strong>Conversations</strong>\n                  @if (chatThreadLoading()) {\n                    <span>Syncing\u2026</span>\n                  }\n                </header>\n                <div class=\"direct-chat-threads__list\">\n                  @if (!chatThreadViews().length) {\n                    <p class=\"direct-chat-empty\">No conversations yet.</p>\n                  } @else {\n                    @for (thread of chatThreadViews(); track thread.threadId) {\n                      <button\n                        type=\"button\"\n                        class=\"direct-chat-thread-item\"\n                        [attr.data-thread-id]=\"thread.threadId\"\n                        [class.is-active]=\"thread.threadId === activeChatThreadId()\"\n                        (click)=\"selectChatThread(thread.threadId)\"\n                      >\n                        <div class=\"direct-chat-thread-item__top\">\n                          <strong>{{ thread.title }}</strong>\n                          @if (thread.lastMessageAtUtc) {\n                            <time>{{ formatChatTime(thread.lastMessageAtUtc) }}</time>\n                          }\n                        </div>\n                        <div class=\"direct-chat-thread-item__bottom\">\n                          <span>{{ thread.subtitle }}</span>\n                          @if (thread.unreadCount > 0) {\n                            <em>{{ thread.unreadCount }}</em>\n                          }\n                        </div>\n                      </button>\n                    }\n                  }\n                </div>\n              </aside>\n\n              <div class=\"direct-chat-main\">\n                <header class=\"direct-chat-header\">\n                  <div class=\"direct-chat-header__meta\">\n                    <span class=\"direct-chat-header__avatar\" aria-hidden=\"true\">\n                      @if (activeUser.profilePictureUrl) {\n                        <img [src]=\"activeUser.profilePictureUrl\" [alt]=\"activeUser.displayName\" />\n                      } @else {\n                        {{ activeUser.initials }}\n                      }\n                    </span>\n                    <div class=\"direct-chat-header__text\">\n                      <strong>\n                        @if (activeChatParticipants().length > 1) {\n                          {{ activeChatParticipants()[0].displayName }} +{{ activeChatParticipants().length - 1 }}\n                        } @else {\n                          {{ activeUser.displayName }}\n                        }\n                      </strong>\n                      <span>{{ activeChatParticipants().length }} participant(s)</span>\n                    </div>\n                  </div>\n                  <div class=\"direct-chat-header__actions\">\n                    @if (availableParticipantsToAdd().length) {\n                      <p-multiSelect\n                        class=\"direct-chat-add-select\"\n                        [options]=\"participantAddOptions()\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        [ngModel]=\"selectedParticipantsToAdd()\"\n                        (ngModelChange)=\"setSelectedParticipantsToAdd($event)\"\n                        placeholder=\"Add participants\"\n                        [filter]=\"true\"\n                        [showClear]=\"true\"\n                        display=\"chip\"\n                        appendTo=\"body\"\n                        [maxSelectedLabels]=\"2\"\n                      />\n                      <button\n                        type=\"button\"\n                        class=\"direct-chat-mini-btn\"\n                        [disabled]=\"!selectedParticipantsToAdd().length || chatAddingParticipants()\"\n                        (click)=\"addParticipantsToActiveChat()\"\n                      >\n                        @if (chatAddingParticipants()) {\n                          Adding\u2026\n                        } @else {\n                          Add selected\n                        }\n                      </button>\n                    }\n                    <button type=\"button\" class=\"direct-chat-mini-btn\" (click)=\"toggleChatMaximize()\">\n                      {{ chatMaximized() ? 'Restore' : 'Maximize' }}\n                    </button>\n                    <button type=\"button\" class=\"direct-chat-mini-btn\" (click)=\"clearActiveChat()\">Clear</button>\n                    <button type=\"button\" class=\"direct-chat-mini-btn\" (click)=\"archiveActiveChat()\">Archive</button>\n                    <button type=\"button\" class=\"direct-chat-close\" (click)=\"closeChatPanel()\">\u2715</button>\n                  </div>\n                </header>\n\n                <div class=\"direct-chat-messages\">\n                  @if (chatLoading()) {\n                    <p class=\"direct-chat-empty\">Loading conversation\u2026</p>\n                  } @else if (!currentChatMessages().length) {\n                    <p class=\"direct-chat-empty\">No messages yet. Say hello \uD83D\uDC4B</p>\n                  } @else {\n                    @for (message of currentChatMessages(); track message.id) {\n                      <article\n                        class=\"direct-chat-message\"\n                        [class.direct-chat-message--mine]=\"message.senderUserId === currentUserId\"\n                      >\n                        <span class=\"direct-chat-message__avatar\" aria-hidden=\"true\">\n                          @if (getUserProfilePicture(message.senderUserId); as picUrl) {\n                            <img [src]=\"picUrl\" [alt]=\"message.senderDisplayName\" />\n                          } @else {\n                            {{ buildAvatarInitials(message.senderDisplayName) }}\n                          }\n                        </span>\n                        <div class=\"direct-chat-message__content\">\n                          <p><strong class=\"direct-chat-message__sender\">{{ message.senderDisplayName }}:</strong> {{ message.content }}</p>\n                          @if (message.attachments.length) {\n                            <ul class=\"direct-chat-message__attachments\">\n                              @for (attachment of message.attachments; track attachment.attachmentId) {\n                                <li>\n                                  <a [href]=\"attachment.downloadUrl\" target=\"_blank\" rel=\"noopener noreferrer\">\n                                    {{ attachment.fileName }}\n                                  </a>\n                                  <span>{{ formatAttachmentSize(attachment.size) }}</span>\n                                </li>\n                              }\n                            </ul>\n                          }\n                          <time>{{ formatChatTime(message.sentAtUtc) }}</time>\n                        </div>\n                      </article>\n                    }\n                  }\n                </div>\n\n                @if (chatError()) {\n                  <p class=\"direct-chat-error\">{{ chatError() }}</p>\n                }\n\n                <footer class=\"direct-chat-compose\">\n                  @if (activeTypingUsers().length) {\n                    <p class=\"direct-chat-typing\">\n                      {{ activeTypingUsers().join(', ') }} {{ activeTypingUsers().length === 1 ? 'is' : 'are' }} typing...\n                    </p>\n                  }\n                  <button type=\"button\" class=\"direct-chat-emoji-btn\" (click)=\"toggleEmojiPicker()\">\uD83D\uDE0A</button>\n                  <label class=\"direct-chat-attach-btn\">\n                    \uD83D\uDCCE\n                    <input\n                      #chatAttachmentInput\n                      type=\"file\"\n                      multiple\n                      (change)=\"onChatAttachmentSelected($any($event.target).files ?? null)\"\n                    />\n                  </label>\n                  <input\n                    type=\"text\"\n                    [value]=\"chatDraft()\"\n                    (input)=\"onChatInput(($any($event.target).value ?? '').toString())\"\n                    (keydown.enter)=\"sendChatMessage()\"\n                    (focus)=\"emojiPickerVisible.set(false)\"\n                    placeholder=\"Type a message...\"\n                  />\n                  <button\n                    type=\"button\"\n                    (click)=\"sendChatMessage()\"\n                    [disabled]=\"(!chatDraft().trim() && !pendingChatAttachments().length) || chatSaving() || chatAttachmentUploading()\"\n                  >\n                    @if (chatAttachmentUploading()) {\n                      Uploading\u2026\n                    } @else if (chatSaving()) {\n                      Sending\u2026\n                    } @else {\n                      Send\n                    }\n                  </button>\n\n                  @if (pendingChatAttachments().length) {\n                    <div class=\"direct-chat-attachments-pending\">\n                      @for (item of pendingChatAttachments(); track item.id) {\n                        <span class=\"direct-chat-attachments-pending__chip\">\n                          <strong>{{ item.file.name }}</strong>\n                          <em>{{ formatAttachmentSize(item.size) }}</em>\n                          <button type=\"button\" (click)=\"removePendingChatAttachment(item.id)\">\u2715</button>\n                        </span>\n                      }\n                    </div>\n                  }\n\n                  @if (emojiPickerVisible()) {\n                    <div class=\"direct-chat-emoji-picker\">\n                      @for (emoji of quickEmojis; track emoji) {\n                        <button type=\"button\" (click)=\"insertEmoji(emoji)\">{{ emoji }}</button>\n                      }\n                      <span class=\"direct-chat-emoji-hint\">Type shortcuts like :smile: :heart: :thumbsup:</span>\n                    </div>\n                  }\n                </footer>\n              </div>\n            </section>\n          }\n        }\n      </div>\n    </div>\n\n    <!-- Global overlays -->\n    <app-notification-container></app-notification-container>\n    <app-command-palette></app-command-palette>\n    <app-keyboard-shortcuts-modal></app-keyboard-shortcuts-modal>\n\n    <app-quick-add-modal\n      #quickAddModal\n      [visible]=\"quickAddVisible()\"\n      (close)=\"quickAddVisible.set(false)\"\n      (created)=\"onQuickAddCreated()\"\n    />\n\n    <div class=\"global-loading-overlay\" *ngIf=\"loadingOverlay.visible()\">\n      <p-progressSpinner\n        styleClass=\"global-loading-spinner\"\n        strokeWidth=\"6\"\n        animationDuration=\".8s\"\n        [style]=\"{ width: '86px', height: '86px' }\"\n      ></p-progressSpinner>\n    </div>\n  \n", styles: [".shell {\n  --shell-sidebar-width: 256px;\n  --shell-topbar-height: 38px;\n  --shell-topbar-strip-height: 3px;\n  --shell-footer-safe-height: 26px;\n  --shell-floating-gap: 0px;\n  display: grid;\n  grid-template-columns: var(--shell-sidebar-width) 1fr;\n  width: 100%;\n  max-width: 100%;\n  min-height: 100dvh;\n  max-height: 100dvh;\n  align-items: stretch;\n  background: radial-gradient(circle at 18% 20%, rgba(91, 224, 200, 0.24), transparent 32%),\n    radial-gradient(circle at 82% 12%, rgba(124, 210, 255, 0.24), transparent 28%),\n    radial-gradient(circle at 50% 80%, rgba(155, 139, 255, 0.14), transparent 36%),\n    var(--surface-base);\n  color: var(--text-strong);\n  transition: grid-template-columns 0.2s ease;\n  overflow: hidden;\n}\n\n.shell > app-sidebar {\n  display: block;\n  align-self: start;\n}\n\n@media (min-width: 841px) {\n  .shell > app-sidebar {\n    position: sticky;\n    top: 0;\n    height: 100dvh;\n    min-height: 100dvh;\n  }\n}\n\n@media (min-width: 841px) and (max-width: 1280px) {\n  .shell:not(.shell--collapsed) {\n    --shell-sidebar-width: min(360px, 32vw);\n  }\n}\n\n.shell--collapsed {\n  --shell-sidebar-width: 88px;\n  grid-template-columns: var(--shell-sidebar-width) 1fr;\n}\n\n.show-topbar-btn {\n  position: fixed;\n  top: 4px;\n  right: 12px;\n  z-index: 40;\n  width: 32px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(15, 23, 42, 0.85);\n  border: 1px solid rgba(186, 220, 255, 0.25);\n  border-radius: 0 0 6px 6px;\n  color: rgba(255, 255, 255, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  backdrop-filter: blur(12px);\n  \n  .pi {\n    font-size: 0.7rem;\n  }\n  \n  &:hover {\n    background: rgba(15, 23, 42, 0.95);\n    color: #ffffff;\n    border-color: rgba(186, 220, 255, 0.4);\n  }\n}\n\n.body {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100dvh;\n  max-height: 100dvh;\n  overflow: hidden;\n  // Fallback baseline for CRM pages/forms that do not render an explicit .page-background layer.\n  background:\n    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n  background-size: 60px 60px, 60px 60px, auto;\n  background-position: 0 0, 0 0, 0 0;\n}\n\n.shell-page-background {\n  position: fixed;\n  inset: 0 0 0 var(--shell-sidebar-width);\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #e8e4f4 0%, #dde8f8 50%, #e4f0f8 100%);\n  transition: opacity 180ms ease;\n}\n\n.shell-animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(100px);\n  opacity: 0.7;\n  animation: orb-float 25s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.9));\n    top: -150px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: linear-gradient(135deg, rgba(34, 211, 238, 0.9), rgba(56, 189, 248, 0.85));\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 350px;\n    height: 350px;\n    background: linear-gradient(135deg, rgba(244, 114, 182, 0.82), rgba(168, 85, 247, 0.8));\n    bottom: -80px;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n.shell-grid-pattern {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px);\n  background-size: 60px 60px;\n  opacity: 0.5;\n}\n\n// If a page renders its own background layer (e.g., Activity Workspace), suppress the shell fallback\n// so the visuals don't stack.\n@supports selector(.body:has(.content .page-background)) {\n  .body:has(.content .page-background) .shell-page-background {\n    opacity: 0;\n  }\n}\n\n.content {\n  flex: 1 1 auto;\n  min-height: 0;\n  min-width: 0;\n  padding: var(--md-space-6) var(--md-space-7) var(--md-space-8);\n  backdrop-filter: blur(4px);\n  overflow-x: clip;\n  overflow-y: auto;\n  position: relative;\n  z-index: 1;\n}\n\n.app-topbar-activity-strip {\n  position: relative;\n  height: var(--shell-topbar-strip-height);\n  z-index: 2;\n  pointer-events: none;\n  opacity: 0;\n  transform: scaleX(0.985);\n  transform-origin: center;\n  transition:\n    opacity 140ms ease,\n    transform 180ms ease;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 0, 102, 0.95) 0%,\n      rgba(255, 140, 0, 0.95) 16%,\n      rgba(255, 230, 0, 0.95) 32%,\n      rgba(51, 255, 51, 0.95) 48%,\n      rgba(0, 217, 255, 0.95) 64%,\n      rgba(64, 128, 255, 0.95) 80%,\n      rgba(180, 70, 255, 0.95) 92%,\n      rgba(255, 0, 102, 0.95) 100%\n    );\n  background-size: 220% 100%;\n  border-top: 1px solid rgba(255, 255, 255, 0.16);\n  box-shadow:\n    0 0 0 rgba(56, 189, 248, 0),\n    0 2px 14px rgba(14, 165, 233, 0),\n    0 4px 18px rgba(167, 139, 250, 0);\n}\n\n.app-topbar-activity-strip::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.55) 10%,\n      rgba(255, 255, 255, 0.10) 18%,\n      transparent 28%\n    );\n  background-size: 180% 100%;\n  mix-blend-mode: screen;\n  opacity: 0;\n}\n\n.app-topbar-activity-strip.is-active {\n  opacity: 1;\n  transform: scaleX(1);\n  animation:\n    topbar-rgb-strip-flow 1.25s linear infinite,\n    topbar-rgb-strip-pulse 900ms ease-in-out infinite;\n  box-shadow:\n    0 0 12px rgba(56, 189, 248, 0.24),\n    0 2px 14px rgba(14, 165, 233, 0.22),\n    0 4px 18px rgba(167, 139, 250, 0.20);\n}\n\n.app-topbar-activity-strip.is-active::before {\n  opacity: 1;\n  animation: topbar-rgb-strip-sheen 1.25s linear infinite;\n}\n\n.global-loading-indicator {\n  position: fixed;\n  top: calc(var(--shell-topbar-height) + 18px);\n  right: 22px;\n  z-index: 120;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  min-width: 220px;\n  padding: 10px 14px;\n  border-radius: 16px;\n  border: 1px solid rgba(125, 211, 252, 0.34);\n  background:\n    linear-gradient(145deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.78)),\n    linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(244, 114, 182, 0.16));\n  box-shadow:\n    0 18px 44px rgba(15, 23, 42, 0.26),\n    0 0 0 1px rgba(255, 255, 255, 0.03) inset;\n  backdrop-filter: blur(14px);\n  pointer-events: none;\n  animation: loading-indicator-float 180ms ease-out;\n}\n\n.global-loading-indicator__copy {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n\n  strong {\n    color: #e2e8f0;\n    font-size: 0.9rem;\n    font-weight: 700;\n    letter-spacing: 0.01em;\n  }\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.75rem;\n    line-height: 1.3;\n  }\n}\n\n:host ::ng-deep .global-loading-indicator__spinner.p-progressspinner {\n  flex: 0 0 auto;\n  color: #38bdf8;\n  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));\n}\n\n:host ::ng-deep .global-loading-indicator__spinner .p-progressspinner-circle {\n  stroke-linecap: round;\n}\n\n.app-footer {\n  position: relative;\n  z-index: 26;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 0;\n  padding: 3px 12px;\n  border-radius: 0;\n  border: none;\n  border-top: 1px solid rgba(186, 220, 255, 0.16);\n  color: rgba(226, 232, 240, 0.88);\n  font-size: 0.68rem;\n  background:\n    linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.86), rgba(17, 24, 39, 0.82) 45%, rgba(30, 41, 59, 0.78));\n  backdrop-filter: blur(14px) saturate(135%);\n  box-shadow:\n    0 -4px 16px rgba(2, 6, 23, 0.22),\n    inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n\n.app-footer::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  pointer-events: none;\n  background: radial-gradient(circle at 15% 20%, rgba(96, 165, 250, 0.10), transparent 42%),\n    radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.09), transparent 46%);\n  opacity: 0.75;\n}\n\n.app-footer > * {\n  position: relative;\n  z-index: 1;\n}\n\n.footer-left,\n.footer-right {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 0;\n  flex-wrap: wrap;\n}\n\n.footer-right {\n  position: relative;\n  overflow: visible;\n}\n\n.footer-brand {\n  font-weight: 700;\n  color: #f8fafc;\n  font-size: 0.68rem;\n}\n\n.footer-divider {\n  opacity: 0.28;\n  color: #cbd5e1;\n}\n\n.footer-meta {\n  color: rgba(203, 213, 225, 0.88);\n}\n\n.footer-chip {\n  padding: 0 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(56, 189, 248, 0.3);\n  color: #bfdbfe;\n  background: linear-gradient(135deg, rgba(14, 116, 144, 0.30), rgba(30, 64, 175, 0.26));\n  font-weight: 700;\n  letter-spacing: 0.015em;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);\n}\n\n.footer-link {\n  color: #93c5fd;\n  text-decoration: none;\n  font-weight: 600;\n}\n\n.footer-link:hover {\n  color: #dbeafe;\n  text-decoration: underline;\n}\n\n.footer-presence {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 1px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.45);\n  color: rgba(226, 232, 240, 0.92);\n  cursor: pointer;\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.footer-presence:hover {\n  transform: translateY(-1px);\n  border-color: rgba(125, 211, 252, 0.45);\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.14);\n}\n\n.footer-presence:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.28);\n}\n\n.footer-presence-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: rgba(148, 163, 184, 0.9);\n  box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);\n}\n\n.footer-presence-label {\n  font-size: 0.66rem;\n  font-weight: 600;\n}\n\n.footer-presence-count {\n  font-size: 0.68rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n\n.footer-presence.is-connected .footer-presence-dot {\n  background: #22c55e;\n  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2), 0 0 10px rgba(34, 197, 94, 0.35);\n}\n\n.footer-presence.is-reconnecting .footer-presence-dot,\n.footer-presence.is-connecting .footer-presence-dot {\n  background: #f59e0b;\n  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2), 0 0 8px rgba(245, 158, 11, 0.32);\n}\n\n.footer-chat {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 1px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.45);\n  color: rgba(226, 232, 240, 0.92);\n  cursor: pointer;\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.footer-chat:hover {\n  transform: translateY(-1px);\n  border-color: rgba(125, 211, 252, 0.45);\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.14);\n}\n\n.footer-chat:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.28);\n}\n\n.footer-chat.has-unread {\n  border-color: rgba(251, 113, 133, 0.48);\n  box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.15);\n}\n\n.footer-chat-label {\n  font-size: 0.66rem;\n  font-weight: 600;\n}\n\n.footer-chat-badge {\n  min-width: 1.1rem;\n  height: 1.1rem;\n  padding: 0 0.28rem;\n  border-radius: 999px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.68rem;\n  font-weight: 800;\n  color: #fff;\n  background: linear-gradient(135deg, #ef4444, #f97316);\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;\n}\n\n.online-presence-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 8px;\n}\n\n.online-presence-header__title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #f8fafc;\n}\n\n.online-presence-header__count {\n  min-width: 28px;\n  text-align: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #dbeafe;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  background: rgba(30, 64, 175, 0.28);\n}\n\n.online-presence-popup {\n  position: absolute;\n  right: 0;\n  bottom: calc(100% + 10px);\n  width: min(340px, 90vw);\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.92), rgba(30, 41, 59, 0.9));\n  box-shadow:\n    0 16px 32px rgba(2, 6, 23, 0.35),\n    inset 0 1px 0 rgba(255, 255, 255, 0.07);\n  z-index: 60;\n}\n\n.online-presence-scroll {\n  overflow-y: auto;\n  padding-right: 2px;\n}\n\n.online-presence-status {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(226, 232, 240, 0.92);\n  background: rgba(15, 23, 42, 0.35);\n  width: fit-content;\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.online-presence-status__dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: rgba(148, 163, 184, 0.9);\n}\n\n.online-presence-status[data-state='connected'] .online-presence-status__dot {\n  background: #22c55e;\n  box-shadow: 0 0 10px rgba(34, 197, 94, 0.35);\n}\n\n.online-presence-status[data-state='reconnecting'] .online-presence-status__dot,\n.online-presence-status[data-state='connecting'] .online-presence-status__dot {\n  background: #f59e0b;\n  box-shadow: 0 0 8px rgba(245, 158, 11, 0.32);\n}\n\n.online-presence-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.online-presence-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 12px;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(15, 23, 42, 0.28);\n}\n\n.online-presence-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.76rem;\n  font-weight: 700;\n  color: #f8fafc;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(14, 165, 233, 0.86));\n  overflow: hidden;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n}\n\n.online-presence-meta {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.online-presence-name {\n  font-size: 0.88rem;\n  color: #f8fafc;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.online-presence-email {\n  font-size: 0.74rem;\n  color: rgba(203, 213, 225, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.online-presence-badge {\n  margin-left: auto;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #bbf7d0;\n  border: 1px solid rgba(34, 197, 94, 0.35);\n  background: rgba(34, 197, 94, 0.16);\n}\n\n.online-presence-chat-btn {\n  appearance: none;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 999px;\n  background: rgba(30, 64, 175, 0.25);\n  color: #dbeafe;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  cursor: pointer;\n  transition: border-color 150ms ease, background-color 150ms ease;\n}\n\n.online-presence-chat-btn:hover:not(:disabled) {\n  border-color: rgba(125, 211, 252, 0.5);\n  background: rgba(30, 64, 175, 0.36);\n}\n\n.online-presence-chat-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.online-presence-empty {\n  margin: 4px 0;\n  font-size: 0.84rem;\n  color: rgba(203, 213, 225, 0.9);\n}\n\n.online-presence-retry {\n  align-self: flex-start;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 8px;\n  background: rgba(30, 64, 175, 0.25);\n  color: #dbeafe;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  cursor: pointer;\n}\n\n.online-presence-retry:hover {\n  border-color: rgba(125, 211, 252, 0.5);\n  background: rgba(30, 64, 175, 0.35);\n}\n\n.direct-chat-panel {\n  position: fixed;\n  right: 14px;\n  bottom: 48px;\n  width: min(700px, 96vw);\n  max-height: min(520px, 68vh);\n  display: flex;\n  flex-direction: row;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05)),\n    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.92), rgba(30, 41, 59, 0.9));\n  box-shadow: 0 20px 34px rgba(2, 6, 23, 0.35);\n  z-index: 70;\n  overflow: hidden;\n}\n\n.direct-chat-panel--maximized {\n  right: 12px;\n  left: 12px;\n  top: calc(var(--shell-topbar-height) + 6px);\n  bottom: calc(var(--shell-footer-safe-height) + 10px);\n  width: auto;\n  max-height: none;\n}\n\n.direct-chat-threads {\n  width: 260px;\n  min-width: 220px;\n  border-right: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(2, 6, 23, 0.3);\n  display: flex;\n  flex-direction: column;\n}\n\n.direct-chat-threads__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n\n  strong {\n    font-size: 0.8rem;\n    color: #e2e8f0;\n  }\n\n  span {\n    font-size: 0.72rem;\n    color: rgba(148, 163, 184, 0.95);\n  }\n}\n\n.direct-chat-threads__list {\n  padding: 6px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.direct-chat-thread-item {\n  appearance: none;\n  width: 100%;\n  text-align: left;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.35);\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  color: #cbd5e1;\n  cursor: pointer;\n}\n\n.direct-chat-thread-item.is-active {\n  border-color: rgba(56, 189, 248, 0.5);\n  background: rgba(30, 64, 175, 0.28);\n  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25) inset;\n}\n\n.direct-chat-thread-item__top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n\n  strong {\n    font-size: 0.78rem;\n    color: #f8fafc;\n    max-width: 140px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  time {\n    font-size: 0.66rem;\n    color: rgba(148, 163, 184, 0.95);\n  }\n}\n\n.direct-chat-thread-item__bottom {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n\n  span {\n    font-size: 0.7rem;\n    color: rgba(203, 213, 225, 0.9);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  em {\n    min-width: 1rem;\n    height: 1rem;\n    padding: 0 0.2rem;\n    border-radius: 999px;\n    font-style: normal;\n    font-size: 0.65rem;\n    font-weight: 700;\n    color: #fff;\n    background: linear-gradient(135deg, #ef4444, #f97316);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n}\n\n.direct-chat-main {\n  flex: 1 1 auto;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.direct-chat-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.direct-chat-header__actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.direct-chat-add-select {\n  min-width: 170px;\n  max-width: 220px;\n}\n\n::ng-deep .direct-chat-add-select.p-multiselect {\n  border-radius: 8px;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(15, 23, 42, 0.44);\n  min-height: 30px;\n  color: #dbeafe;\n  font-size: 0.72rem;\n\n  .p-multiselect-label {\n    padding: 4px 8px;\n    color: #dbeafe;\n  }\n\n  .p-multiselect-chip {\n    background: rgba(30, 64, 175, 0.35);\n    color: #dbeafe;\n    border: 1px solid rgba(125, 211, 252, 0.35);\n  }\n\n  .p-multiselect-dropdown {\n    color: #dbeafe;\n  }\n}\n\n.direct-chat-mini-btn {\n  appearance: none;\n  border: 1px solid rgba(125, 211, 252, 0.35);\n  border-radius: 8px;\n  background: rgba(30, 64, 175, 0.24);\n  color: #dbeafe;\n  font-size: 0.68rem;\n  font-weight: 700;\n  padding: 4px 6px;\n  cursor: pointer;\n}\n\n.direct-chat-mini-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n\n.direct-chat-header__meta {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n\n.direct-chat-header__avatar {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #f8fafc;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(14, 165, 233, 0.86));\n  overflow: hidden;\n  flex-shrink: 0;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 50%;\n  }\n}\n\n.direct-chat-header__text {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  strong {\n    color: #f8fafc;\n    font-size: 0.86rem;\n  }\n\n  span {\n    color: rgba(203, 213, 225, 0.9);\n    font-size: 0.72rem;\n  }\n}\n\n.direct-chat-close {\n  appearance: none;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(15, 23, 42, 0.4);\n  color: #e2e8f0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.direct-chat-messages {\n  flex: 1 1 auto;\n  min-height: 120px;\n  padding: 10px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.direct-chat-empty {\n  margin: auto 0;\n  color: rgba(203, 213, 225, 0.9);\n  font-size: 0.82rem;\n  text-align: center;\n}\n\n.direct-chat-message {\n  align-self: flex-start;\n  max-width: 86%;\n  border-radius: 12px;\n  padding: 8px 10px;\n  background: rgba(30, 41, 59, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  display: inline-flex;\n  align-items: flex-end;\n  gap: 8px;\n\n  .direct-chat-message__avatar {\n    width: 22px;\n    height: 22px;\n    border-radius: 999px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(59, 130, 246, 0.45);\n    border: 1px solid rgba(125, 211, 252, 0.35);\n    color: #dbeafe;\n    font-size: 0.62rem;\n    font-weight: 700;\n    flex: 0 0 auto;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: 999px;\n    }\n  }\n\n  .direct-chat-message__content {\n    min-width: 0;\n  }\n\n  .direct-chat-message__attachments {\n    list-style: none;\n    margin: 6px 0 0;\n    padding: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n\n    li {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      font-size: 0.72rem;\n    }\n\n    a {\n      color: #bfdbfe;\n      text-decoration: underline;\n    }\n\n    span {\n      color: rgba(203, 213, 225, 0.82);\n    }\n  }\n\n  p {\n    margin: 0;\n    color: #f8fafc;\n    font-size: 0.82rem;\n    white-space: pre-wrap;\n    word-break: break-word;\n  }\n\n  .direct-chat-message__sender {\n    color: #93c5fd;\n    font-weight: 700;\n    margin-right: 4px;\n  }\n\n  time {\n    display: block;\n    margin-top: 4px;\n    color: rgba(203, 213, 225, 0.78);\n    font-size: 0.68rem;\n  }\n}\n\n.direct-chat-message--mine {\n  align-self: flex-end;\n  background: rgba(30, 64, 175, 0.6);\n  border-color: rgba(125, 211, 252, 0.3);\n  flex-direction: row-reverse;\n\n  .direct-chat-message__sender {\n    color: #dbeafe;\n  }\n\n  .direct-chat-message__avatar {\n    background: rgba(30, 64, 175, 0.7);\n    color: #eff6ff;\n    border-color: rgba(191, 219, 254, 0.55);\n  }\n}\n\n.direct-chat-error {\n  margin: 0;\n  padding: 0 10px;\n  color: #fca5a5;\n  font-size: 0.72rem;\n}\n\n.direct-chat-compose {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px;\n  border-top: 1px solid rgba(148, 163, 184, 0.22);\n  flex-wrap: wrap;\n\n  input {\n    flex: 1 1 auto;\n    min-width: 0;\n    border-radius: 10px;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(15, 23, 42, 0.5);\n    color: #f8fafc;\n    padding: 7px 10px;\n    font-size: 0.82rem;\n  }\n\n  button {\n    appearance: none;\n    border: 1px solid rgba(125, 211, 252, 0.36);\n    border-radius: 10px;\n    background: rgba(30, 64, 175, 0.34);\n    color: #dbeafe;\n    font-weight: 700;\n    font-size: 0.78rem;\n    padding: 7px 10px;\n    cursor: pointer;\n  }\n\n  button:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.direct-chat-typing {\n  flex: 1 0 100%;\n  margin: 0 0 2px;\n  font-size: 0.72rem;\n  color: rgba(186, 230, 253, 0.95);\n}\n\n.direct-chat-emoji-btn {\n  appearance: none;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.52);\n  color: #f8fafc;\n  font-size: 0.9rem;\n  width: 36px;\n  height: 34px;\n  cursor: pointer;\n}\n\n.direct-chat-attach-btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.52);\n  color: #f8fafc;\n  font-size: 0.9rem;\n  width: 36px;\n  height: 34px;\n  cursor: pointer;\n\n  input[type='file'] {\n    position: absolute;\n    inset: 0;\n    opacity: 0;\n    cursor: pointer;\n  }\n}\n\n.direct-chat-attachments-pending {\n  flex: 1 0 100%;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 2px;\n}\n\n.direct-chat-attachments-pending__chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(125, 211, 252, 0.36);\n  background: rgba(30, 64, 175, 0.28);\n  color: #dbeafe;\n  padding: 3px 8px;\n  max-width: 100%;\n\n  strong {\n    font-size: 0.7rem;\n    font-weight: 700;\n    max-width: 180px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  em {\n    font-style: normal;\n    font-size: 0.66rem;\n    color: rgba(191, 219, 254, 0.9);\n  }\n\n  button {\n    appearance: none;\n    border: none;\n    background: transparent;\n    color: #e2e8f0;\n    font-size: 0.72rem;\n    cursor: pointer;\n    padding: 0;\n    line-height: 1;\n  }\n}\n\n.direct-chat-emoji-picker {\n  position: absolute;\n  bottom: 54px;\n  left: 10px;\n  right: 10px;\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: 6px;\n  padding: 8px;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(15, 23, 42, 0.94);\n  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.35);\n\n  button {\n    appearance: none;\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n    background: rgba(30, 64, 175, 0.2);\n    color: #fff;\n    height: 32px;\n    cursor: pointer;\n  }\n}\n\n.direct-chat-emoji-hint {\n  grid-column: 1 / -1;\n  font-size: 0.66rem;\n  color: rgba(191, 219, 254, 0.9);\n}\n\n@media (max-width: 768px) {\n  .shell {\n    --shell-floating-gap: 6px;\n  }\n\n  .app-footer {\n    padding: 4px 8px calc(4px + env(safe-area-inset-bottom));\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 4px;\n    border-radius: 10px;\n    border: 1px solid rgba(186, 220, 255, 0.14);\n  }\n\n  .online-presence-popup {\n    left: 0;\n    right: auto;\n    width: min(320px, calc(100vw - 40px));\n  }\n\n  .direct-chat-panel {\n    right: 8px;\n    left: 8px;\n    width: auto;\n    bottom: 76px;\n    max-height: 62vh;\n    flex-direction: column;\n  }\n\n  .direct-chat-panel--maximized {\n    top: 10px;\n    bottom: 72px;\n  }\n\n  .direct-chat-threads {\n    width: 100%;\n    min-width: 0;\n    max-height: 150px;\n    border-right: none;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  }\n}\n\n@media (max-width: 1024px) {\n  .shell {\n    grid-template-columns: 220px 1fr;\n  }\n}\n\n@media (max-width: 840px) {\n  .shell {\n    --shell-sidebar-width: 0px;\n    --shell-topbar-height: 106px;\n    --shell-topbar-strip-height: 4px;\n    --shell-footer-safe-height: 56px;\n    --shell-floating-gap: 6px;\n    grid-template-columns: 1fr;\n    position: relative;\n    width: 100%;\n    max-width: 100vw;\n  }\n\n  // Scrim to emphasize the open sidebar on mobile.\n  .shell::after {\n    content: '';\n    position: fixed;\n    inset: 0;\n    background: rgba(15, 23, 42, 0.35);\n    opacity: 0;\n    pointer-events: none;\n    transition: opacity 0.25s ease;\n    z-index: 18;\n  }\n\n  .shell:not(.shell--collapsed)::after {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .body {\n    width: 100%;\n    max-width: 100%;\n    min-height: 100dvh;\n    max-height: 100dvh;\n  }\n\n  .shell-page-background {\n    inset: 0;\n  }\n\n  .content {\n    padding: var(--md-space-4);\n  }\n\n  .app-topbar-activity-strip {\n    height: var(--shell-topbar-strip-height);\n  }\n\n  .global-loading-indicator {\n    top: calc(var(--shell-topbar-height) + 10px);\n    right: 12px;\n    left: 12px;\n    min-width: 0;\n    border-radius: 14px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .app-topbar-activity-strip.is-active,\n  .app-topbar-activity-strip.is-active::before {\n    animation: none;\n  }\n\n  .shell-animated-orb {\n    animation: none;\n  }\n}\n\n.global-loading-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 2200;\n  display: grid;\n  place-items: center;\n  background: transparent;\n  animation: overlay-fade-in 140ms ease-out;\n}\n\n:host ::ng-deep .global-loading-spinner.p-progressspinner {\n  color: rgb(255, 0, 0);\n  filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.55));\n  animation: spinner-rainbow 2.4s linear infinite;\n}\n\n:host ::ng-deep .global-loading-spinner .p-progressspinner-circle {\n  stroke-linecap: round;\n}\n\n@keyframes overlay-fade-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes loading-indicator-float {\n  from {\n    opacity: 0;\n    transform: translateY(-6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes spinner-rainbow {\n  0% {\n    color: rgb(255, 0, 0);\n    filter: drop-shadow(0 0 9px rgba(255, 0, 0, 0.6));\n  }\n  33% {\n    color: rgb(0, 255, 0);\n    filter: drop-shadow(0 0 9px rgba(0, 255, 0, 0.6));\n  }\n  66% {\n    color: rgb(0, 102, 255);\n    filter: drop-shadow(0 0 9px rgba(0, 102, 255, 0.6));\n  }\n  100% {\n    color: rgb(255, 0, 0);\n    filter: drop-shadow(0 0 9px rgba(255, 0, 0, 0.6));\n  }\n}\n\n@keyframes topbar-rgb-strip-flow {\n  from {\n    background-position: 0% 50%;\n  }\n  to {\n    background-position: 220% 50%;\n  }\n}\n\n@keyframes topbar-rgb-strip-sheen {\n  from {\n    background-position: 180% 50%;\n  }\n  to {\n    background-position: -20% 50%;\n  }\n}\n\n@keyframes topbar-rgb-strip-pulse {\n  0%, 100% {\n    filter: saturate(1) brightness(1);\n  }\n  50% {\n    filter: saturate(1.15) brightness(1.06);\n  }\n}\n"] }]
    }], () => [], { quickAddModal: [{
            type: ViewChild,
            args: ['quickAddModal']
        }], chatAttachmentInput: [{
            type: ViewChild,
            args: ['chatAttachmentInput']
        }], presenceTrigger: [{
            type: ViewChild,
            args: ['presenceTrigger']
        }], presencePopup: [{
            type: ViewChild,
            args: ['presencePopup']
        }], handleQuickAddEvent: [{
            type: HostListener,
            args: ['window:crm-quick-add', ['$event']]
        }], onWindowResize: [{
            type: HostListener,
            args: ['window:resize']
        }], onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src/app/layout/shell.component.ts", lineNumber: 107 }); })();
