import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class DirectChatService {
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    openThread(participantUserIds) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/open`, {
            participantUserIds
        });
    }
    listThreads() {
        return this.http.get(`${this.baseUrl}/api/chat/threads`);
    }
    getMessages(threadId, take = 200) {
        return this.http.get(`${this.baseUrl}/api/chat/threads/${threadId}/messages`, {
            params: { take: String(take) }
        });
    }
    sendMessage(threadId, message, attachmentIds = []) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/${threadId}/messages`, { message, attachmentIds });
    }
    archiveThread(threadId, archived) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/${threadId}/archive`, { archived });
    }
    clearThread(threadId) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/${threadId}/clear`, {});
    }
    addParticipant(threadId, userId) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/${threadId}/participants`, { userId });
    }
    sendTyping(threadId, isTyping) {
        return this.http.post(`${this.baseUrl}/api/chat/threads/${threadId}/typing`, { isTyping });
    }
    static ɵfac = function DirectChatService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DirectChatService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DirectChatService, factory: DirectChatService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DirectChatService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
