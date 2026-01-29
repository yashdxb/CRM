import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  private readonly visible = signal<boolean>(this.readBoolean('crm_assistant_visible', true));
  private readonly collapsed = signal<boolean>(this.readBoolean('crm_assistant_collapsed', false));

  readonly isVisible = this.visible.asReadonly();
  readonly isCollapsed = this.collapsed.asReadonly();

  setVisible(value: boolean): void {
    this.visible.set(value);
    if (value) {
      this.collapsed.set(false);
    }
    this.persist();
  }

  toggleCollapsed(): void {
    const next = !this.collapsed();
    this.collapsed.set(next);
    this.visible.set(!next);
    this.persist();
  }

  restoreFromTopbar(): void {
    this.collapsed.set(false);
    this.visible.set(true);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem('crm_assistant_visible', JSON.stringify(this.visible()));
      localStorage.setItem('crm_assistant_collapsed', JSON.stringify(this.collapsed()));
    } catch {
      // Ignore storage errors
    }
  }

  private readBoolean(key: string, fallback: boolean): boolean {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw) === true;
    } catch {
      return fallback;
    }
  }
}
