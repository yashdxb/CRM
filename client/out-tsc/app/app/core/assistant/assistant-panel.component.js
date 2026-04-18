import { NgFor, NgIf } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { AssistantService } from './assistant.service';
import { AssistantChatService } from './assistant-chat.service';
import { AuthService } from '../auth/auth.service';
import { CrmEventsService } from '../realtime/crm-events.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/cdk/drag-drop";
function AssistantPanelComponent_aside_0_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("user", message_r3.role === "user");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(message_r3.role === "user" ? "You" : "Assistant");
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", ctx_r1.formatAssistantMessage(message_r3.displayContent ?? message_r3.content), i0.ɵɵsanitizeHtml);
} }
function AssistantPanelComponent_aside_0_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 13);
    i0.ɵɵtext(2, "Assistant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.assistantError());
} }
function AssistantPanelComponent_aside_0_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 13);
    i0.ɵɵtext(2, "Assistant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.assistantInfo());
} }
function AssistantPanelComponent_aside_0_section_23_article_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 28)(1, "div", 29)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 30)(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "button", 31);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_section_23_article_3_Template_button_click_11_listener() { const action_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openAssistantAction(action_r5)); });
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r5.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r5.ownerScope);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r5.dueWindow);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.assistantActionLabel(action_r5), " ");
} }
function AssistantPanelComponent_aside_0_section_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 25)(1, "div", 26);
    i0.ɵɵtext(2, "Suggested actions");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, AssistantPanelComponent_aside_0_section_23_article_3_Template, 13, 5, "article", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.assistantActions());
} }
function AssistantPanelComponent_aside_0_section_28_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 32)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 33);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_section_28_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.undoAssistantAction()); });
    i0.ɵɵtext(4, "Undo");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.assistantUndoMessage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.assistantUndoBusy);
} }
function AssistantPanelComponent_aside_0_div_29_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 35)(2, "h4");
    i0.ɵɵtext(3, "Review Assistant Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "This action is medium/high risk and needs review before execution.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "textarea", 36);
    i0.ɵɵlistener("ngModelChange", function AssistantPanelComponent_aside_0_div_29_Template_textarea_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.assistantReviewNote = $event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 37)(8, "button", 33);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_div_29_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.cancelAssistantReview()); });
    i0.ɵɵtext(9, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 33);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_div_29_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitAssistantReview(false)); });
    i0.ɵɵtext(11, "Reject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 33);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_div_29_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitAssistantReview(true)); });
    i0.ɵɵtext(13, "Approve & Execute");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting)("ngModel", ctx_r1.assistantReviewNote);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantReviewSubmitting);
} }
function AssistantPanelComponent_aside_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "div", 2)(2, "div", 3)(3, "span", 4);
    i0.ɵɵelement(4, "i", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3");
    i0.ɵɵtext(7, "AI Assistant");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 6)(9, "button", 7);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadHistory()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 8);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleAssistantCollapsed()); });
    i0.ɵɵelement(12, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 8);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.hideAssistant()); });
    i0.ɵɵelement(14, "i", 10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 11)(16, "div", 12)(17, "span", 13);
    i0.ɵɵtext(18, "Assistant");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "div", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, AssistantPanelComponent_aside_0_div_20_Template, 4, 4, "div", 15)(21, AssistantPanelComponent_aside_0_div_21_Template, 5, 1, "div", 16)(22, AssistantPanelComponent_aside_0_div_22_Template, 5, 1, "div", 16)(23, AssistantPanelComponent_aside_0_section_23_Template, 4, 1, "section", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 18)(25, "input", 19);
    i0.ɵɵlistener("ngModelChange", function AssistantPanelComponent_aside_0_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.assistantInput.set($event)); })("keydown", function AssistantPanelComponent_aside_0_Template_input_keydown_25_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onAssistantInputKeydown($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 20);
    i0.ɵɵlistener("click", function AssistantPanelComponent_aside_0_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sendAssistantMessage()); });
    i0.ɵɵelement(27, "i", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(28, AssistantPanelComponent_aside_0_section_28_Template, 5, 2, "section", 22)(29, AssistantPanelComponent_aside_0_div_29_Template, 14, 5, "div", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("collapsed", ctx_r1.assistantCollapsed());
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.historyLoading());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.historyLoaded() ? "History loaded" : ctx_r1.historyLoading() ? "Loading\u2026" : "View history", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("pi-minus", !ctx_r1.assistantCollapsed())("pi-plus", ctx_r1.assistantCollapsed());
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("innerHTML", ctx_r1.formatAssistantMessage(ctx_r1.assistantGreeting()), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.assistantMessages());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantError());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantInfo());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantActions().length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.assistantSending())("ngModel", ctx_r1.assistantInput());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.assistantSending());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.assistantUndoVisible);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.assistantReviewDialogOpen);
} }
export class AssistantPanelComponent {
    platformId = inject(PLATFORM_ID);
    destroyRef = inject(DestroyRef);
    assistantService = inject(AssistantService);
    assistantChatService = inject(AssistantChatService);
    authService = inject(AuthService);
    crmEventsService = inject(CrmEventsService);
    router = inject(Router);
    activeConversationId = null;
    activeConversationMessageId = null;
    emptyAssistantInsights = {
        scope: 'Self',
        kpis: [],
        actions: [],
        generatedAtUtc: new Date().toISOString()
    };
    assistantVisible = this.assistantService.isVisible;
    assistantCollapsed = this.assistantService.isCollapsed;
    assistantMessages = signal([], ...(ngDevMode ? [{ debugName: "assistantMessages" }] : []));
    assistantInput = signal('', ...(ngDevMode ? [{ debugName: "assistantInput" }] : []));
    assistantSending = signal(false, ...(ngDevMode ? [{ debugName: "assistantSending" }] : []));
    assistantError = signal(null, ...(ngDevMode ? [{ debugName: "assistantError" }] : []));
    assistantInfo = signal(null, ...(ngDevMode ? [{ debugName: "assistantInfo" }] : []));
    historyLoaded = signal(false, ...(ngDevMode ? [{ debugName: "historyLoaded" }] : []));
    historyLoading = signal(false, ...(ngDevMode ? [{ debugName: "historyLoading" }] : []));
    assistantInsights = signal(this.emptyAssistantInsights, ...(ngDevMode ? [{ debugName: "assistantInsights" }] : []));
    assistantActions = computed(() => this.assistantInsights().actions ?? [], ...(ngDevMode ? [{ debugName: "assistantActions" }] : []));
    assistantReviewDialogOpen = false;
    assistantReviewNote = '';
    assistantReviewSubmitting = false;
    pendingAssistantAction = null;
    assistantUndoVisible = false;
    assistantUndoBusy = false;
    assistantUndoMessage = '';
    assistantUndoTimerId = null;
    assistantUndoActivityId = null;
    assistantUndoActionType = null;
    assistantGreeting = computed(() => this.buildAssistantGreeting(), ...(ngDevMode ? [{ debugName: "assistantGreeting" }] : []));
    toggleAssistantCollapsed() {
        this.assistantService.toggleCollapsed();
    }
    hideAssistant() {
        this.assistantService.setVisible(false);
    }
    sendAssistantMessage() {
        const message = this.assistantInput().trim();
        if (!message || this.assistantSending()) {
            return;
        }
        const userMessage = {
            id: this.buildLocalId('user'),
            role: 'user',
            content: message,
            createdAtUtc: new Date().toISOString()
        };
        this.assistantMessages.update(messages => [...messages, userMessage]);
        this.assistantSending.set(true);
        this.assistantError.set(null);
        this.assistantInfo.set(null);
        this.assistantInput.set('');
        const streamEnabled = this.crmEventsService.isFeatureEnabled('realtime.assistantStreaming');
        const conversationId = streamEnabled ? this.buildLocalId('conversation') : undefined;
        if (conversationId) {
            const assistantMessage = {
                id: this.buildLocalId('assistant'),
                role: 'assistant',
                content: '',
                displayContent: '',
                isTyping: true,
                createdAtUtc: new Date().toISOString()
            };
            this.assistantMessages.update(messages => [...messages, assistantMessage]);
            this.activeConversationId = conversationId;
            this.activeConversationMessageId = assistantMessage.id;
        }
        this.assistantChatService.sendMessage(message, { stream: streamEnabled, conversationId }).subscribe({
            next: response => {
                if (streamEnabled && response.streamed) {
                    return;
                }
                const reply = response.reply ?? '';
                const existingMessageId = this.activeConversationMessageId;
                const assistantMessage = existingMessageId
                    ? {
                        id: existingMessageId,
                        role: 'assistant',
                        content: reply,
                        displayContent: '',
                        isTyping: true,
                        createdAtUtc: new Date().toISOString()
                    }
                    : {
                        id: this.buildLocalId('assistant'),
                        role: 'assistant',
                        content: reply,
                        displayContent: '',
                        isTyping: true,
                        createdAtUtc: new Date().toISOString()
                    };
                if (existingMessageId) {
                    this.updateMessage(existingMessageId, assistantMessage);
                }
                else {
                    this.assistantMessages.update(messages => [...messages, assistantMessage]);
                }
                this.activeConversationId = null;
                this.activeConversationMessageId = null;
                this.assistantSending.set(false);
                this.runTypewriter(assistantMessage.id, reply);
                this.refreshInsights();
            },
            error: err => {
                this.activeConversationId = null;
                this.activeConversationMessageId = null;
                const fallback = typeof err?.error?.error === 'string'
                    ? err.error.error
                    : 'Assistant is unavailable right now. Please try again.';
                this.assistantError.set(fallback);
                this.assistantSending.set(false);
            }
        });
    }
    loadHistory() {
        if (this.historyLoaded() || this.historyLoading()) {
            return;
        }
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.historyLoading.set(true);
        this.assistantChatService.getHistory().subscribe({
            next: messages => {
                this.assistantMessages.set((messages ?? []).map((message) => ({
                    ...message
                })));
                this.historyLoaded.set(true);
                this.historyLoading.set(false);
                this.refreshInsights();
            },
            error: () => {
                this.assistantError.set('Unable to load assistant history.');
                this.historyLoading.set(false);
            }
        });
    }
    onAssistantInputKeydown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.sendAssistantMessage();
        }
    }
    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.refreshInsights();
        }
        this.crmEventsService.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => this.handleRealtimeAssistantEvent(event));
    }
    assistantActionLabel(action) {
        return (action.riskTier ?? '').toLowerCase() === 'low' ? 'Execute' : 'Review';
    }
    openAssistantAction(action) {
        const risk = (action.riskTier ?? '').toLowerCase();
        this.assistantError.set(null);
        this.assistantInfo.set(null);
        if (risk === 'medium' || risk === 'high') {
            this.pendingAssistantAction = action;
            this.assistantReviewNote = '';
            this.assistantReviewDialogOpen = true;
            return;
        }
        this.assistantChatService.executeAction(action)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: result => {
                this.assistantInfo.set(result.message || 'Action executed.');
                if (result.createdActivityId && risk === 'low') {
                    this.showAssistantUndo(action, result.createdActivityId);
                }
                this.refreshInsights();
                this.navigateAssistantAction(action);
            },
            error: () => {
                this.assistantError.set('Unable to execute assistant action.');
            }
        });
    }
    submitAssistantReview(approved) {
        const action = this.pendingAssistantAction;
        if (!action || this.assistantReviewSubmitting) {
            return;
        }
        this.assistantReviewSubmitting = true;
        this.assistantChatService.reviewAction(action, approved, this.assistantReviewNote)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: result => {
                this.assistantReviewSubmitting = false;
                this.assistantReviewDialogOpen = false;
                this.pendingAssistantAction = null;
                this.assistantReviewNote = '';
                this.assistantInfo.set(result.message || (approved ? 'Action approved.' : 'Action rejected.'));
                this.refreshInsights();
                if (approved) {
                    this.navigateAssistantAction(action);
                }
            },
            error: () => {
                this.assistantReviewSubmitting = false;
                this.assistantError.set('Unable to submit review decision.');
            }
        });
    }
    cancelAssistantReview() {
        this.assistantReviewDialogOpen = false;
        this.pendingAssistantAction = null;
        this.assistantReviewNote = '';
    }
    undoAssistantAction() {
        if (!this.assistantUndoActivityId || this.assistantUndoBusy) {
            return;
        }
        this.assistantUndoBusy = true;
        this.assistantChatService.undoAction(this.assistantUndoActivityId, this.assistantUndoActionType ?? undefined)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: result => {
                this.assistantUndoBusy = false;
                this.assistantUndoVisible = false;
                this.assistantUndoMessage = '';
                this.assistantUndoActivityId = null;
                this.assistantUndoActionType = null;
                if (this.assistantUndoTimerId !== null) {
                    window.clearTimeout(this.assistantUndoTimerId);
                    this.assistantUndoTimerId = null;
                }
                this.assistantInfo.set(result.message || 'Action undone.');
                this.refreshInsights();
            },
            error: () => {
                this.assistantUndoBusy = false;
                this.assistantError.set('Unable to undo action.');
            }
        });
    }
    formatAssistantMessage(content) {
        if (!content) {
            return '';
        }
        let normalized = content.replace(/\r\n/g, '\n');
        normalized = normalized
            // Split inline numbered bullets into their own lines.
            .replace(/(\S)\s+(\d+[.)])\s*/g, '$1\n$2 ')
            // Split inline unordered bullets into their own lines.
            .replace(/(\S)\s+([-*•])\s*/g, '$1\n$2 ')
            // Normalize any marker that already starts a line.
            .replace(/(\n|^)(\d+[.)])\s*/g, '$1$2 ')
            .replace(/(\n|^)([-*•])\s*/g, '$1$2 ');
        normalized = normalized.trim();
        const lines = normalized.split('\n');
        const blocks = [];
        const paragraphLines = [];
        const flushParagraph = () => {
            if (!paragraphLines.length) {
                return;
            }
            blocks.push({ type: 'p', text: paragraphLines.join(' ') });
            paragraphLines.length = 0;
        };
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) {
                flushParagraph();
                continue;
            }
            const orderedMatch = trimmed.match(/^\d+[.)]\s*(.+)$/);
            const unorderedMatch = trimmed.match(/^[-*•]\s*(.+)$/);
            const listType = orderedMatch ? 'ol' : unorderedMatch ? 'ul' : null;
            const listItem = orderedMatch?.[1] ?? unorderedMatch?.[1];
            if (listType && listItem) {
                flushParagraph();
                const last = blocks[blocks.length - 1];
                if (last && last.type === listType) {
                    last.items.push(listItem);
                }
                else {
                    blocks.push({ type: listType, items: [listItem] });
                }
            }
            else {
                paragraphLines.push(trimmed);
            }
        }
        flushParagraph();
        return blocks
            .map((block) => {
            if (block.type === 'ol' || block.type === 'ul') {
                const items = block.items.map((item) => `<li>${this.formatInline(item)}</li>`).join('');
                const tag = block.type;
                return `<${tag} class=\"assistant-list\">${items}</${tag}>`;
            }
            const paragraph = block;
            return `<p>${this.formatInline(paragraph.text)}</p>`;
        })
            .join('');
    }
    formatInline(text) {
        const escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return escaped
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>');
    }
    buildAssistantGreeting() {
        const hours = new Date().getHours();
        const timeGreeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
        const fullName = this.authService.currentUser()?.fullName ?? '';
        const firstName = fullName.trim().split(' ')[0] || 'there';
        return `Hi ${firstName}, ${timeGreeting}. How can I help you today? I can help with leads, accounts, opportunities, or activities. I’ll summarize and suggest next steps.`;
    }
    refreshInsights() {
        this.assistantChatService.getInsights()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: insights => {
                this.assistantInsights.set(insights ?? this.emptyAssistantInsights);
            },
            error: () => {
                this.assistantInsights.set(this.emptyAssistantInsights);
            }
        });
    }
    runTypewriter(messageId, fullText) {
        if (!isPlatformBrowser(this.platformId)) {
            this.updateMessage(messageId, { displayContent: fullText, isTyping: false });
            return;
        }
        const text = fullText ?? '';
        if (!text) {
            this.updateMessage(messageId, { displayContent: '', isTyping: false });
            return;
        }
        let index = 0;
        const step = () => {
            index = Math.min(index + 2, text.length);
            const snippet = text.slice(0, index);
            this.updateMessage(messageId, { displayContent: snippet });
            if (index >= text.length) {
                clearInterval(timerId);
                this.updateMessage(messageId, { isTyping: false });
            }
        };
        const timerId = window.setInterval(step, 24);
        step();
    }
    updateMessage(id, patch) {
        this.assistantMessages.update(messages => messages.map(message => (message.id === id ? { ...message, ...patch } : message)));
    }
    buildLocalId(prefix) {
        return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }
    handleRealtimeAssistantEvent(event) {
        if (!this.crmEventsService.isFeatureEnabled('realtime.assistantStreaming')) {
            return;
        }
        if (!event?.eventType || !event.payload) {
            return;
        }
        const conversationId = String(event.payload['conversationId'] ?? '');
        if (!conversationId || !this.activeConversationId || conversationId !== this.activeConversationId || !this.activeConversationMessageId) {
            return;
        }
        if (event.eventType === 'assistant.chat.token') {
            const token = String(event.payload['token'] ?? '');
            if (!token) {
                return;
            }
            const messageId = this.activeConversationMessageId;
            const current = this.assistantMessages().find((message) => message.id === messageId);
            const next = `${current?.displayContent ?? ''}${token}`;
            this.updateMessage(messageId, { displayContent: next, content: next, isTyping: true });
            return;
        }
        if (event.eventType === 'assistant.chat.completed') {
            const messageId = this.activeConversationMessageId;
            const content = String(event.payload['content'] ?? '');
            const current = this.assistantMessages().find((message) => message.id === messageId);
            const resolved = content || current?.displayContent || current?.content || '';
            this.updateMessage(messageId, { displayContent: resolved, content: resolved, isTyping: false });
            this.assistantSending.set(false);
            this.activeConversationId = null;
            this.activeConversationMessageId = null;
            this.refreshInsights();
            return;
        }
        if (event.eventType === 'assistant.chat.failed') {
            const messageId = this.activeConversationMessageId;
            this.updateMessage(messageId, { isTyping: false });
            const error = String(event.payload['error'] ?? 'Assistant is unavailable right now. Please try again.');
            this.assistantError.set(error);
            this.assistantSending.set(false);
            this.activeConversationId = null;
            this.activeConversationMessageId = null;
        }
    }
    navigateAssistantAction(action) {
        const entityType = (action.entityType ?? '').toLowerCase();
        if (entityType === 'lead') {
            this.router.navigate(['/app/leads']);
            return;
        }
        if (entityType === 'opportunity') {
            this.router.navigate(['/app/deals']);
            return;
        }
        if (entityType === 'activity') {
            this.router.navigate(['/app/activities']);
            return;
        }
        if (entityType === 'approval') {
            this.router.navigate(['/app/workflows']);
            return;
        }
        this.router.navigate(['/app/dashboard']);
    }
    showAssistantUndo(action, createdActivityId) {
        this.assistantUndoVisible = true;
        this.assistantUndoBusy = false;
        this.assistantUndoActivityId = createdActivityId;
        this.assistantUndoActionType = action.actionType;
        this.assistantUndoMessage = `${action.title} executed.`;
        if (this.assistantUndoTimerId !== null) {
            window.clearTimeout(this.assistantUndoTimerId);
        }
        this.assistantUndoTimerId = window.setTimeout(() => {
            this.assistantUndoVisible = false;
            this.assistantUndoActivityId = null;
            this.assistantUndoActionType = null;
            this.assistantUndoMessage = '';
            this.assistantUndoTimerId = null;
        }, 60_000);
    }
    static ɵfac = function AssistantPanelComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssistantPanelComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssistantPanelComponent, selectors: [["app-assistant-panel"]], decls: 1, vars: 1, consts: [["class", "assistant-panel glass-card", "cdkDrag", "", 3, "collapsed", 4, "ngIf"], ["cdkDrag", "", 1, "assistant-panel", "glass-card"], ["cdkDragHandle", "", 1, "assistant-header"], [1, "assistant-title"], [1, "assistant-icon"], [1, "pi", "pi-bolt"], [1, "assistant-controls"], ["type", "button", 1, "assistant-history", 3, "click", "disabled"], ["type", "button", 1, "assistant-control", 3, "click"], [1, "pi"], [1, "pi", "pi-times"], [1, "assistant-body"], [1, "assistant-message"], [1, "assistant-role"], [1, "assistant-content", 3, "innerHTML"], ["class", "assistant-message", 3, "user", 4, "ngFor", "ngForOf"], ["class", "assistant-message", 4, "ngIf"], ["class", "assistant-actions", 4, "ngIf"], [1, "assistant-input"], ["type", "text", "placeholder", "Ask AI Assistant\u2026", 3, "ngModelChange", "keydown", "disabled", "ngModel"], ["type", "button", 1, "assistant-send", 3, "click", "disabled"], [1, "pi", "pi-send"], ["class", "assistant-undo-strip", 4, "ngIf"], ["class", "assistant-review-backdrop", 4, "ngIf"], [1, "assistant-content"], [1, "assistant-actions"], [1, "assistant-actions-title"], ["class", "assistant-action-item", 4, "ngFor", "ngForOf"], [1, "assistant-action-item"], [1, "assistant-action-content"], [1, "assistant-action-meta"], ["type", "button", 1, "assistant-action-btn", 3, "click"], [1, "assistant-undo-strip"], ["type", "button", 3, "click", "disabled"], [1, "assistant-review-backdrop"], [1, "assistant-review-dialog"], ["rows", "4", "placeholder", "Add review note (optional)", 3, "ngModelChange", "disabled", "ngModel"], [1, "assistant-review-actions"]], template: function AssistantPanelComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AssistantPanelComponent_aside_0_Template, 30, 18, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.assistantVisible());
        } }, dependencies: [NgIf, NgFor, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, DragDropModule, i2.CdkDrag, i2.CdkDragHandle], styles: ["@use '../../../styles/design-tokens' as *;\n\n.assistant-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  right: clamp(16px, 3vw, 32px);\n  top: 120px;\n  width: min(360px, 86vw);\n  height: clamp(520px, 70vh, 720px);\n  min-height: 480px;\n  max-height: 80vh;\n  padding: $space-5;\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n  z-index: 20;\n  box-shadow: 0 26px 72px rgba(6, 12, 28, 0.6);\n  animation: _ngcontent-%COMP%_float-in 0.4s ease-out;\n  background: linear-gradient(160deg, rgba(10, 14, 32, 0.95), rgba(24, 18, 46, 0.92));\n  border: 1px solid rgba(130, 170, 255, 0.22);\n  backdrop-filter: blur(20px);\n  overflow: hidden;\n  resize: both;\n  color: rgba(234, 242, 255, 0.92);\n}\n\n.assistant-panel.glass-card[_ngcontent-%COMP%] {\n  background: linear-gradient(160deg, rgba(10, 14, 32, 0.95), rgba(24, 18, 46, 0.92)) !important;\n  border-color: rgba(130, 170, 255, 0.22) !important;\n  padding: $space-5;\n  margin-bottom: 0;\n}\n\n.assistant-panel[_ngcontent-%COMP%]   .assistant-header[_ngcontent-%COMP%] {\n  cursor: move;\n}\n\n.assistant-panel[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(circle at top left, rgba(72, 120, 255, 0.2), transparent 58%),\n    radial-gradient(circle at bottom right, rgba(10, 180, 180, 0.14), transparent 60%);\n  opacity: 0.9;\n  pointer-events: none;\n}\n\n.assistant-panel[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: 8px;\n  border-radius: calc(#{$radius-2xl} - 6px);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  pointer-events: none;\n}\n\n.assistant-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  position: relative;\n  z-index: 1;\n}\n\n.assistant-controls[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.assistant-history[_ngcontent-%COMP%] {\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  background: rgba(20, 28, 54, 0.6);\n  color: rgba(226, 236, 255, 0.9);\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    border-color: rgba(130, 170, 255, 0.45);\n    color: #f8fbff;\n  }\n\n  &:disabled {\n    opacity: 0.6;\n    cursor: default;\n  }\n}\n\n.assistant-control[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  background: rgba(20, 28, 54, 0.72);\n  color: rgba(220, 232, 255, 0.7);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    color: #f8fbff;\n    border-color: rgba(130, 170, 255, 0.45);\n  }\n}\n\n.assistant-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n\n  h3 {\n    margin: 0;\n    font-size: 1.1rem;\n    color: #eef5ff;\n  }\n}\n\n.assistant-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n  background: rgba(84, 126, 255, 0.18);\n  color: #b5caff;\n  animation: _ngcontent-%COMP%_bolt-breathe 2.6s ease-in-out infinite;\n  box-shadow: 0 0 0 rgba($primary, 0.3);\n\n  i {\n    font-size: 1.2rem;\n  }\n}\n\n.assistant-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-xl;\n  background: rgba(14, 20, 44, 0.72);\n  border: 1px solid rgba(130, 170, 255, 0.22);\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(210, 226, 255, 0.45) rgba(20, 28, 54, 0.35);\n  position: relative;\n  z-index: 1;\n}\n\n.assistant-body[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n\n.assistant-body[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(20, 28, 54, 0.25);\n  border-radius: 999px;\n}\n\n.assistant-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(210, 226, 255, 0.5);\n  border-radius: 999px;\n}\n\n.assistant-body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(230, 240, 255, 0.7);\n}\n\n.assistant-message[_ngcontent-%COMP%] {\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(22, 30, 58, 0.78);\n  border: 1px solid rgba(130, 170, 255, 0.22);\n\n  &.user {\n    background: rgba(64, 108, 255, 0.26);\n    border-color: rgba(96, 140, 255, 0.4);\n    align-self: flex-end;\n  }\n\n  .assistant-content {\n    color: rgba(231, 238, 250, 0.9);\n    font-size: $font-size-sm;\n    line-height: 1.5;\n\n    p {\n      margin: 0 0 8px;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n\n    strong {\n      color: #f4f7ff;\n      font-weight: 600;\n    }\n\n    code {\n      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;\n      font-size: 0.82em;\n      background: rgba(10, 18, 36, 0.6);\n      border-radius: 6px;\n      padding: 2px 6px;\n      color: #e4ecff;\n    }\n  }\n}\n\n.assistant-list[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  padding-left: 20px;\n  display: grid;\n  gap: 6px;\n\n  li {\n    line-height: 1.45;\n  }\n}\n\nol.assistant-list[_ngcontent-%COMP%] {\n  list-style-type: decimal;\n}\n\nul.assistant-list[_ngcontent-%COMP%] {\n  list-style-type: disc;\n}\n\n.assistant-role[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: rgba(231, 238, 250, 0.92);\n  margin-bottom: 4px;\n}\n\n.assistant-panel.collapsed[_ngcontent-%COMP%]   .assistant-body[_ngcontent-%COMP%], \n.assistant-panel.collapsed[_ngcontent-%COMP%]   .assistant-input[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.assistant-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2;\n  border-radius: $radius-xl;\n  background: rgba(16, 22, 48, 0.82);\n  border: 1px solid rgba(130, 170, 255, 0.24);\n  position: relative;\n  z-index: 1;\n\n  input {\n    flex: 1;\n    border: none;\n    background: transparent;\n    font-size: $font-size-sm;\n    color: rgba(240, 246, 255, 0.92);\n    outline: none;\n\n    &::placeholder {\n      color: rgba(210, 223, 245, 0.55);\n    }\n  }\n}\n\n.assistant-send[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 14px;\n  border: none;\n  background: rgba(80, 122, 255, 0.32);\n  color: #e3ecff;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba($primary, 0.18);\n  }\n}\n\n.assistant-actions[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-2;\n  margin-top: $space-2;\n}\n\n.assistant-actions-title[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  color: rgba(211, 226, 255, 0.9);\n  text-transform: uppercase;\n}\n\n.assistant-action-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  align-items: flex-start;\n  justify-content: space-between;\n  border: 1px solid rgba(130, 170, 255, 0.2);\n  background: rgba(18, 26, 52, 0.72);\n  border-radius: $radius-md;\n  padding: $space-2;\n}\n\n.assistant-action-content[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 4px;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: rgba(234, 242, 255, 0.95);\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-xs;\n    color: rgba(210, 224, 249, 0.85);\n  }\n}\n\n.assistant-action-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  font-size: 0.7rem;\n  color: rgba(194, 210, 237, 0.78);\n}\n\n.assistant-action-btn[_ngcontent-%COMP%] {\n  border: 1px solid rgba(130, 170, 255, 0.35);\n  background: rgba(70, 112, 240, 0.28);\n  color: rgba(232, 241, 255, 0.95);\n  border-radius: 10px;\n  padding: 6px 10px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.assistant-undo-strip[_ngcontent-%COMP%] {\n  margin-top: -2px;\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  border-radius: $radius-lg;\n  background: rgba(16, 22, 48, 0.82);\n  padding: $space-2 $space-3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  font-size: $font-size-xs;\n\n  button {\n    border: 1px solid rgba(130, 170, 255, 0.35);\n    background: rgba(70, 112, 240, 0.25);\n    color: rgba(232, 241, 255, 0.95);\n    border-radius: 8px;\n    padding: 4px 8px;\n    font-size: $font-size-xs;\n    cursor: pointer;\n  }\n}\n\n.assistant-review-backdrop[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(6, 10, 22, 0.72);\n  display: grid;\n  place-items: center;\n  z-index: 5;\n}\n\n.assistant-review-dialog[_ngcontent-%COMP%] {\n  width: min(320px, 88vw);\n  border: 1px solid rgba(130, 170, 255, 0.3);\n  border-radius: $radius-xl;\n  background: rgba(14, 20, 44, 0.98);\n  padding: $space-3;\n  display: grid;\n  gap: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: 0.9rem;\n    color: #eef5ff;\n  }\n\n  p {\n    margin: 0;\n    color: rgba(216, 229, 250, 0.88);\n    font-size: $font-size-xs;\n    line-height: 1.4;\n  }\n\n  textarea {\n    width: 100%;\n    border: 1px solid rgba(130, 170, 255, 0.3);\n    border-radius: 10px;\n    background: rgba(12, 18, 38, 0.9);\n    color: rgba(238, 246, 255, 0.94);\n    padding: $space-2;\n    resize: vertical;\n    min-height: 72px;\n  }\n}\n\n.assistant-review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-2;\n\n  button {\n    border: 1px solid rgba(130, 170, 255, 0.35);\n    background: rgba(70, 112, 240, 0.25);\n    color: rgba(232, 241, 255, 0.95);\n    border-radius: 8px;\n    padding: 6px 10px;\n    font-size: $font-size-xs;\n    cursor: pointer;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_bolt-breathe {\n  0% {\n    transform: scale(1);\n    box-shadow: 0 0 0 rgba($primary, 0.35);\n  }\n  50% {\n    transform: scale(1.06);\n    box-shadow: 0 0 20px rgba($primary, 0.35);\n  }\n  100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 rgba($primary, 0.35);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_float-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 1200px) {\n  .assistant-panel[_ngcontent-%COMP%] {\n    top: 96px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssistantPanelComponent, [{
        type: Component,
        args: [{ selector: 'app-assistant-panel', standalone: true, imports: [NgIf, NgFor, FormsModule, DragDropModule], template: "<aside\n  class=\"assistant-panel glass-card\"\n  *ngIf=\"assistantVisible()\"\n  [class.collapsed]=\"assistantCollapsed()\"\n  cdkDrag\n>\n  <div class=\"assistant-header\" cdkDragHandle>\n    <div class=\"assistant-title\">\n      <span class=\"assistant-icon\">\n        <i class=\"pi pi-bolt\"></i>\n      </span>\n      <div>\n        <h3>AI Assistant</h3>\n      </div>\n    </div>\n    <div class=\"assistant-controls\">\n      <button\n        type=\"button\"\n        class=\"assistant-history\"\n        [disabled]=\"historyLoading()\"\n        (click)=\"loadHistory()\"\n      >\n        {{ historyLoaded() ? 'History loaded' : historyLoading() ? 'Loading\u2026' : 'View history' }}\n      </button>\n      <button type=\"button\" class=\"assistant-control\" (click)=\"toggleAssistantCollapsed()\">\n        <i class=\"pi\" [class.pi-minus]=\"!assistantCollapsed()\" [class.pi-plus]=\"assistantCollapsed()\"></i>\n      </button>\n      <button type=\"button\" class=\"assistant-control\" (click)=\"hideAssistant()\">\n        <i class=\"pi pi-times\"></i>\n      </button>\n    </div>\n  </div>\n  <div class=\"assistant-body\">\n        <div class=\"assistant-message\">\n          <span class=\"assistant-role\">Assistant</span>\n          <div class=\"assistant-content\" [innerHTML]=\"formatAssistantMessage(assistantGreeting())\"></div>\n        </div>\n        <div\n          class=\"assistant-message\"\n          *ngFor=\"let message of assistantMessages()\"\n          [class.user]=\"message.role === 'user'\"\n        >\n          <span class=\"assistant-role\">{{ message.role === 'user' ? 'You' : 'Assistant' }}</span>\n          <div class=\"assistant-content\" [innerHTML]=\"formatAssistantMessage(message.displayContent ?? message.content)\"></div>\n        </div>\n        <div class=\"assistant-message\" *ngIf=\"assistantError()\">\n          <span class=\"assistant-role\">Assistant</span>\n          <div class=\"assistant-content\">{{ assistantError() }}</div>\n        </div>\n        <div class=\"assistant-message\" *ngIf=\"assistantInfo()\">\n          <span class=\"assistant-role\">Assistant</span>\n          <div class=\"assistant-content\">{{ assistantInfo() }}</div>\n        </div>\n\n        <section class=\"assistant-actions\" *ngIf=\"assistantActions().length\">\n          <div class=\"assistant-actions-title\">Suggested actions</div>\n          <article class=\"assistant-action-item\" *ngFor=\"let action of assistantActions()\">\n            <div class=\"assistant-action-content\">\n              <h4>{{ action.title }}</h4>\n              <p>{{ action.description }}</p>\n              <div class=\"assistant-action-meta\">\n                <span>{{ action.ownerScope }}</span>\n                <span>{{ action.dueWindow }}</span>\n              </div>\n            </div>\n            <button type=\"button\" class=\"assistant-action-btn\" (click)=\"openAssistantAction(action)\">\n              {{ assistantActionLabel(action) }}\n            </button>\n          </article>\n        </section>\n      </div>\n  <div class=\"assistant-input\">\n    <input\n      type=\"text\"\n      placeholder=\"Ask AI Assistant\u2026\"\n      [disabled]=\"assistantSending()\"\n      [ngModel]=\"assistantInput()\"\n      (ngModelChange)=\"assistantInput.set($event)\"\n      (keydown)=\"onAssistantInputKeydown($event)\"\n    />\n    <button type=\"button\" class=\"assistant-send\" [disabled]=\"assistantSending()\" (click)=\"sendAssistantMessage()\">\n      <i class=\"pi pi-send\"></i>\n    </button>\n  </div>\n\n  <section class=\"assistant-undo-strip\" *ngIf=\"assistantUndoVisible\">\n    <span>{{ assistantUndoMessage }}</span>\n    <button type=\"button\" [disabled]=\"assistantUndoBusy\" (click)=\"undoAssistantAction()\">Undo</button>\n  </section>\n\n  <div class=\"assistant-review-backdrop\" *ngIf=\"assistantReviewDialogOpen\">\n    <div class=\"assistant-review-dialog\">\n      <h4>Review Assistant Action</h4>\n      <p>This action is medium/high risk and needs review before execution.</p>\n      <textarea\n        rows=\"4\"\n        [disabled]=\"assistantReviewSubmitting\"\n        placeholder=\"Add review note (optional)\"\n        [ngModel]=\"assistantReviewNote\"\n        (ngModelChange)=\"assistantReviewNote = $event\"\n      ></textarea>\n      <div class=\"assistant-review-actions\">\n        <button type=\"button\" [disabled]=\"assistantReviewSubmitting\" (click)=\"cancelAssistantReview()\">Cancel</button>\n        <button type=\"button\" [disabled]=\"assistantReviewSubmitting\" (click)=\"submitAssistantReview(false)\">Reject</button>\n        <button type=\"button\" [disabled]=\"assistantReviewSubmitting\" (click)=\"submitAssistantReview(true)\">Approve & Execute</button>\n      </div>\n    </div>\n  </div>\n</aside>\n", styles: ["@use '../../../styles/design-tokens' as *;\n\n.assistant-panel {\n  position: fixed;\n  right: clamp(16px, 3vw, 32px);\n  top: 120px;\n  width: min(360px, 86vw);\n  height: clamp(520px, 70vh, 720px);\n  min-height: 480px;\n  max-height: 80vh;\n  padding: $space-5;\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n  z-index: 20;\n  box-shadow: 0 26px 72px rgba(6, 12, 28, 0.6);\n  animation: float-in 0.4s ease-out;\n  background: linear-gradient(160deg, rgba(10, 14, 32, 0.95), rgba(24, 18, 46, 0.92));\n  border: 1px solid rgba(130, 170, 255, 0.22);\n  backdrop-filter: blur(20px);\n  overflow: hidden;\n  resize: both;\n  color: rgba(234, 242, 255, 0.92);\n}\n\n.assistant-panel.glass-card {\n  background: linear-gradient(160deg, rgba(10, 14, 32, 0.95), rgba(24, 18, 46, 0.92)) !important;\n  border-color: rgba(130, 170, 255, 0.22) !important;\n  padding: $space-5;\n  margin-bottom: 0;\n}\n\n.assistant-panel .assistant-header {\n  cursor: move;\n}\n\n.assistant-panel::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(circle at top left, rgba(72, 120, 255, 0.2), transparent 58%),\n    radial-gradient(circle at bottom right, rgba(10, 180, 180, 0.14), transparent 60%);\n  opacity: 0.9;\n  pointer-events: none;\n}\n\n.assistant-panel::after {\n  content: '';\n  position: absolute;\n  inset: 8px;\n  border-radius: calc(#{$radius-2xl} - 6px);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  pointer-events: none;\n}\n\n.assistant-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  position: relative;\n  z-index: 1;\n}\n\n.assistant-controls {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.assistant-history {\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  background: rgba(20, 28, 54, 0.6);\n  color: rgba(226, 236, 255, 0.9);\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    border-color: rgba(130, 170, 255, 0.45);\n    color: #f8fbff;\n  }\n\n  &:disabled {\n    opacity: 0.6;\n    cursor: default;\n  }\n}\n\n.assistant-control {\n  width: 28px;\n  height: 28px;\n  border-radius: 10px;\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  background: rgba(20, 28, 54, 0.72);\n  color: rgba(220, 232, 255, 0.7);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    color: #f8fbff;\n    border-color: rgba(130, 170, 255, 0.45);\n  }\n}\n\n.assistant-title {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n\n  h3 {\n    margin: 0;\n    font-size: 1.1rem;\n    color: #eef5ff;\n  }\n}\n\n.assistant-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n  background: rgba(84, 126, 255, 0.18);\n  color: #b5caff;\n  animation: bolt-breathe 2.6s ease-in-out infinite;\n  box-shadow: 0 0 0 rgba($primary, 0.3);\n\n  i {\n    font-size: 1.2rem;\n  }\n}\n\n.assistant-body {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-xl;\n  background: rgba(14, 20, 44, 0.72);\n  border: 1px solid rgba(130, 170, 255, 0.22);\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(210, 226, 255, 0.45) rgba(20, 28, 54, 0.35);\n  position: relative;\n  z-index: 1;\n}\n\n.assistant-body::-webkit-scrollbar {\n  width: 8px;\n}\n\n.assistant-body::-webkit-scrollbar-track {\n  background: rgba(20, 28, 54, 0.25);\n  border-radius: 999px;\n}\n\n.assistant-body::-webkit-scrollbar-thumb {\n  background: rgba(210, 226, 255, 0.5);\n  border-radius: 999px;\n}\n\n.assistant-body::-webkit-scrollbar-thumb:hover {\n  background: rgba(230, 240, 255, 0.7);\n}\n\n.assistant-message {\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(22, 30, 58, 0.78);\n  border: 1px solid rgba(130, 170, 255, 0.22);\n\n  &.user {\n    background: rgba(64, 108, 255, 0.26);\n    border-color: rgba(96, 140, 255, 0.4);\n    align-self: flex-end;\n  }\n\n  .assistant-content {\n    color: rgba(231, 238, 250, 0.9);\n    font-size: $font-size-sm;\n    line-height: 1.5;\n\n    p {\n      margin: 0 0 8px;\n    }\n\n    p:last-child {\n      margin-bottom: 0;\n    }\n\n    strong {\n      color: #f4f7ff;\n      font-weight: 600;\n    }\n\n    code {\n      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;\n      font-size: 0.82em;\n      background: rgba(10, 18, 36, 0.6);\n      border-radius: 6px;\n      padding: 2px 6px;\n      color: #e4ecff;\n    }\n  }\n}\n\n.assistant-list {\n  margin: 6px 0 0;\n  padding-left: 20px;\n  display: grid;\n  gap: 6px;\n\n  li {\n    line-height: 1.45;\n  }\n}\n\nol.assistant-list {\n  list-style-type: decimal;\n}\n\nul.assistant-list {\n  list-style-type: disc;\n}\n\n.assistant-role {\n  display: block;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: rgba(231, 238, 250, 0.92);\n  margin-bottom: 4px;\n}\n\n.assistant-panel.collapsed .assistant-body,\n.assistant-panel.collapsed .assistant-input {\n  display: none;\n}\n\n.assistant-input {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2;\n  border-radius: $radius-xl;\n  background: rgba(16, 22, 48, 0.82);\n  border: 1px solid rgba(130, 170, 255, 0.24);\n  position: relative;\n  z-index: 1;\n\n  input {\n    flex: 1;\n    border: none;\n    background: transparent;\n    font-size: $font-size-sm;\n    color: rgba(240, 246, 255, 0.92);\n    outline: none;\n\n    &::placeholder {\n      color: rgba(210, 223, 245, 0.55);\n    }\n  }\n}\n\n.assistant-send {\n  width: 38px;\n  height: 38px;\n  border-radius: 14px;\n  border: none;\n  background: rgba(80, 122, 255, 0.32);\n  color: #e3ecff;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba($primary, 0.18);\n  }\n}\n\n.assistant-actions {\n  display: grid;\n  gap: $space-2;\n  margin-top: $space-2;\n}\n\n.assistant-actions-title {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  color: rgba(211, 226, 255, 0.9);\n  text-transform: uppercase;\n}\n\n.assistant-action-item {\n  display: flex;\n  gap: $space-2;\n  align-items: flex-start;\n  justify-content: space-between;\n  border: 1px solid rgba(130, 170, 255, 0.2);\n  background: rgba(18, 26, 52, 0.72);\n  border-radius: $radius-md;\n  padding: $space-2;\n}\n\n.assistant-action-content {\n  display: grid;\n  gap: 4px;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: rgba(234, 242, 255, 0.95);\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-xs;\n    color: rgba(210, 224, 249, 0.85);\n  }\n}\n\n.assistant-action-meta {\n  display: flex;\n  gap: $space-2;\n  font-size: 0.7rem;\n  color: rgba(194, 210, 237, 0.78);\n}\n\n.assistant-action-btn {\n  border: 1px solid rgba(130, 170, 255, 0.35);\n  background: rgba(70, 112, 240, 0.28);\n  color: rgba(232, 241, 255, 0.95);\n  border-radius: 10px;\n  padding: 6px 10px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.assistant-undo-strip {\n  margin-top: -2px;\n  border: 1px solid rgba(130, 170, 255, 0.25);\n  border-radius: $radius-lg;\n  background: rgba(16, 22, 48, 0.82);\n  padding: $space-2 $space-3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n  font-size: $font-size-xs;\n\n  button {\n    border: 1px solid rgba(130, 170, 255, 0.35);\n    background: rgba(70, 112, 240, 0.25);\n    color: rgba(232, 241, 255, 0.95);\n    border-radius: 8px;\n    padding: 4px 8px;\n    font-size: $font-size-xs;\n    cursor: pointer;\n  }\n}\n\n.assistant-review-backdrop {\n  position: absolute;\n  inset: 0;\n  background: rgba(6, 10, 22, 0.72);\n  display: grid;\n  place-items: center;\n  z-index: 5;\n}\n\n.assistant-review-dialog {\n  width: min(320px, 88vw);\n  border: 1px solid rgba(130, 170, 255, 0.3);\n  border-radius: $radius-xl;\n  background: rgba(14, 20, 44, 0.98);\n  padding: $space-3;\n  display: grid;\n  gap: $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: 0.9rem;\n    color: #eef5ff;\n  }\n\n  p {\n    margin: 0;\n    color: rgba(216, 229, 250, 0.88);\n    font-size: $font-size-xs;\n    line-height: 1.4;\n  }\n\n  textarea {\n    width: 100%;\n    border: 1px solid rgba(130, 170, 255, 0.3);\n    border-radius: 10px;\n    background: rgba(12, 18, 38, 0.9);\n    color: rgba(238, 246, 255, 0.94);\n    padding: $space-2;\n    resize: vertical;\n    min-height: 72px;\n  }\n}\n\n.assistant-review-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-2;\n\n  button {\n    border: 1px solid rgba(130, 170, 255, 0.35);\n    background: rgba(70, 112, 240, 0.25);\n    color: rgba(232, 241, 255, 0.95);\n    border-radius: 8px;\n    padding: 6px 10px;\n    font-size: $font-size-xs;\n    cursor: pointer;\n  }\n}\n\n@keyframes bolt-breathe {\n  0% {\n    transform: scale(1);\n    box-shadow: 0 0 0 rgba($primary, 0.35);\n  }\n  50% {\n    transform: scale(1.06);\n    box-shadow: 0 0 20px rgba($primary, 0.35);\n  }\n  100% {\n    transform: scale(1);\n    box-shadow: 0 0 0 rgba($primary, 0.35);\n  }\n}\n\n@keyframes float-in {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@media (max-width: 1200px) {\n  .assistant-panel {\n    top: 96px;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssistantPanelComponent, { className: "AssistantPanelComponent", filePath: "src/app/core/assistant/assistant-panel.component.ts", lineNumber: 26 }); })();
