import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SKIP_LOADING_OVERLAY } from '../loading/loading-overlay.context';
import * as i0 from "@angular/core";
export class AssistantChatService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    skipOverlayContext = new HttpContext().set(SKIP_LOADING_OVERLAY, true);
    getHistory(take = 50) {
        return this.http.get(`${this.baseUrl}/api/assistant/history`, {
            params: { take },
            context: this.skipOverlayContext
        });
    }
    sendMessage(message, options) {
        return this.http.post(`${this.baseUrl}/api/assistant/chat`, {
            message,
            stream: options?.stream === true,
            conversationId: options?.conversationId ?? null
        }, {
            context: this.skipOverlayContext
        });
    }
    getInsights() {
        return this.http.get(`${this.baseUrl}/api/assistant/insights`, {
            context: this.skipOverlayContext
        });
    }
    executeAction(action, note) {
        return this.http.post(`${this.baseUrl}/api/assistant/actions/execute`, {
            actionId: action.id,
            actionType: action.actionType,
            riskTier: action.riskTier,
            entityType: action.entityType ?? null,
            entityId: action.entityId ?? null,
            note: note ?? null
        }, {
            context: this.skipOverlayContext
        });
    }
    reviewAction(action, approved, reviewNote) {
        return this.http.post(`${this.baseUrl}/api/assistant/actions/review`, {
            actionId: action.id,
            actionType: action.actionType,
            riskTier: action.riskTier,
            entityType: action.entityType ?? null,
            entityId: action.entityId ?? null,
            approved,
            reviewNote: reviewNote ?? null
        }, {
            context: this.skipOverlayContext
        });
    }
    undoAction(createdActivityId, actionType) {
        return this.http.post(`${this.baseUrl}/api/assistant/actions/undo`, {
            createdActivityId,
            actionType: actionType ?? null
        }, {
            context: this.skipOverlayContext
        });
    }
    static ɵfac = function AssistantChatService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssistantChatService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AssistantChatService, factory: AssistantChatService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssistantChatService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
