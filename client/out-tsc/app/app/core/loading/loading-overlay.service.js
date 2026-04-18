import { Injectable, computed, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingOverlayService {
    activeRequests = signal(0, ...(ngDevMode ? [{ debugName: "activeRequests" }] : []));
    blockingRequests = signal(0, ...(ngDevMode ? [{ debugName: "blockingRequests" }] : []));
    activitySignal = signal(false, ...(ngDevMode ? [{ debugName: "activitySignal" }] : []));
    overlaySignal = signal(false, ...(ngDevMode ? [{ debugName: "overlaySignal" }] : []));
    activityVisibleSinceMs = 0;
    overlayVisibleSinceMs = 0;
    activityShowTimer = null;
    activityHideTimer = null;
    overlayShowTimer = null;
    overlayHideTimer = null;
    activityVisible = computed(() => this.activitySignal(), ...(ngDevMode ? [{ debugName: "activityVisible" }] : []));
    visible = computed(() => this.overlaySignal(), ...(ngDevMode ? [{ debugName: "visible" }] : []));
    start(blocking = false) {
        this.activeRequests.update((count) => count + 1);
        if (blocking) {
            this.blockingRequests.update((count) => count + 1);
            this.scheduleOverlayShow();
        }
        this.scheduleActivityShow();
    }
    stop(blocking = false) {
        this.activeRequests.update((count) => Math.max(0, count - 1));
        if (blocking) {
            this.blockingRequests.update((count) => Math.max(0, count - 1));
            if (this.blockingRequests() === 0) {
                this.scheduleOverlayHide();
            }
        }
        if (this.activeRequests() === 0) {
            this.scheduleActivityHide();
        }
    }
    scheduleActivityShow() {
        if (this.activitySignal()) {
            return;
        }
        if (this.activityHideTimer) {
            clearTimeout(this.activityHideTimer);
            this.activityHideTimer = null;
        }
        if (this.activityShowTimer) {
            return;
        }
        this.activityShowTimer = setTimeout(() => {
            this.activityShowTimer = null;
            if (this.activeRequests() > 0) {
                this.activityVisibleSinceMs = Date.now();
                this.activitySignal.set(true);
            }
        }, 120);
    }
    scheduleActivityHide() {
        if (this.activityShowTimer) {
            clearTimeout(this.activityShowTimer);
            this.activityShowTimer = null;
        }
        if (!this.activitySignal()) {
            return;
        }
        if (this.activityHideTimer) {
            return;
        }
        const minVisibleMs = 260;
        const elapsed = Date.now() - this.activityVisibleSinceMs;
        const delay = Math.max(0, minVisibleMs - elapsed);
        this.activityHideTimer = setTimeout(() => {
            this.activityHideTimer = null;
            if (this.activeRequests() === 0) {
                this.activitySignal.set(false);
            }
        }, delay);
    }
    scheduleOverlayShow() {
        if (this.overlaySignal()) {
            return;
        }
        if (this.overlayHideTimer) {
            clearTimeout(this.overlayHideTimer);
            this.overlayHideTimer = null;
        }
        if (this.overlayShowTimer) {
            return;
        }
        this.overlayShowTimer = setTimeout(() => {
            this.overlayShowTimer = null;
            if (this.blockingRequests() > 0) {
                this.overlayVisibleSinceMs = Date.now();
                this.overlaySignal.set(true);
            }
        }, 180);
    }
    scheduleOverlayHide() {
        if (this.overlayShowTimer) {
            clearTimeout(this.overlayShowTimer);
            this.overlayShowTimer = null;
        }
        if (!this.overlaySignal()) {
            return;
        }
        if (this.overlayHideTimer) {
            return;
        }
        const minVisibleMs = 260;
        const elapsed = Date.now() - this.overlayVisibleSinceMs;
        const delay = Math.max(0, minVisibleMs - elapsed);
        this.overlayHideTimer = setTimeout(() => {
            this.overlayHideTimer = null;
            if (this.blockingRequests() === 0) {
                this.overlaySignal.set(false);
            }
        }, delay);
    }
    static ɵfac = function LoadingOverlayService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingOverlayService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoadingOverlayService, factory: LoadingOverlayService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingOverlayService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
