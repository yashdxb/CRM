import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingOverlayService {
  private readonly activeRequests = signal(0);
  private readonly blockingRequests = signal(0);
  private readonly activitySignal = signal(false);
  private readonly overlaySignal = signal(false);
  private activityVisibleSinceMs = 0;
  private overlayVisibleSinceMs = 0;
  private activityShowTimer: ReturnType<typeof setTimeout> | null = null;
  private activityHideTimer: ReturnType<typeof setTimeout> | null = null;
  private overlayShowTimer: ReturnType<typeof setTimeout> | null = null;
  private overlayHideTimer: ReturnType<typeof setTimeout> | null = null;

  readonly activityVisible = computed(() => this.activitySignal());
  readonly visible = computed(() => this.overlaySignal());

  start(blocking = false): void {
    this.activeRequests.update((count) => count + 1);
    if (blocking) {
      this.blockingRequests.update((count) => count + 1);
      this.scheduleOverlayShow();
    }
    this.scheduleActivityShow();
  }

  stop(blocking = false): void {
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

  private scheduleActivityShow(): void {
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

  private scheduleActivityHide(): void {
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

  private scheduleOverlayShow(): void {
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

  private scheduleOverlayHide(): void {
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
}
