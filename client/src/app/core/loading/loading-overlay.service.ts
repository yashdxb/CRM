import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingOverlayService {
  private readonly activeRequests = signal(0);
  private readonly visibleSignal = signal(false);
  private visibleSinceMs = 0;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  readonly visible = computed(() => this.visibleSignal());

  start(): void {
    this.activeRequests.update((count) => count + 1);
    this.scheduleShow();
  }

  stop(): void {
    this.activeRequests.update((count) => Math.max(0, count - 1));
    if (this.activeRequests() > 0) {
      return;
    }
    this.scheduleHide();
  }

  private scheduleShow(): void {
    if (this.visibleSignal()) {
      return;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.showTimer) {
      return;
    }

    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      if (this.activeRequests() > 0) {
        this.visibleSinceMs = Date.now();
        this.visibleSignal.set(true);
      }
    }, 120);
  }

  private scheduleHide(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    if (!this.visibleSignal()) {
      return;
    }
    if (this.hideTimer) {
      return;
    }

    const minVisibleMs = 260;
    const elapsed = Date.now() - this.visibleSinceMs;
    const delay = Math.max(0, minVisibleMs - elapsed);
    this.hideTimer = setTimeout(() => {
      this.hideTimer = null;
      if (this.activeRequests() === 0) {
        this.visibleSignal.set(false);
      }
    }, delay);
  }
}

