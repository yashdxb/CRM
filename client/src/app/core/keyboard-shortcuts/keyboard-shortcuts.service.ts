import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface KeyboardShortcut {
  keys: string;
  description: string;
  category: 'navigation' | 'actions' | 'general';
  action: () => void;
}

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutsService {
  private readonly router = inject(Router);
  private readonly _isHelpModalOpen = signal(false);
  private pendingKeys: string[] = [];
  private keyTimeout: ReturnType<typeof setTimeout> | null = null;

  readonly isHelpModalOpen = this._isHelpModalOpen.asReadonly();

  readonly shortcuts: KeyboardShortcut[] = [
    // Navigation (G + key)
    { keys: 'g d', description: 'Go to Dashboard', category: 'navigation', action: () => this.navigate('/app/dashboard') },
    { keys: 'g c', description: 'Go to Customers', category: 'navigation', action: () => this.navigate('/app/customers') },
    { keys: 'g l', description: 'Go to Leads', category: 'navigation', action: () => this.navigate('/app/leads') },
    { keys: 'g o', description: 'Go to Opportunities', category: 'navigation', action: () => this.navigate('/app/opportunities') },
    { keys: 'g a', description: 'Go to Activities', category: 'navigation', action: () => this.navigate('/app/activities') },
    { keys: 'g s', description: 'Go to Settings', category: 'navigation', action: () => this.navigate('/app/settings') },

    // Actions (N + key for new)
    { keys: 'n c', description: 'New Customer', category: 'actions', action: () => this.newEntity('customers') },
    { keys: 'n l', description: 'New Lead', category: 'actions', action: () => this.newEntity('leads') },
    { keys: 'n a', description: 'New Activity', category: 'actions', action: () => this.newEntity('activities') },

    // General
    { keys: '?', description: 'Show keyboard shortcuts', category: 'general', action: () => this.toggleHelpModal() },
    { keys: 'Escape', description: 'Close modal / Cancel', category: 'general', action: () => this.closeHelpModal() },
  ];

  constructor() {
    this.initKeyboardListener();
  }

  private initKeyboardListener(): void {
    document.addEventListener('keydown', (event) => this.handleKeydown(event));
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Ignore if user is typing in an input
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    // Handle ? for help
    if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      this.toggleHelpModal();
      return;
    }

    // Handle Escape
    if (event.key === 'Escape') {
      this.closeHelpModal();
      this.pendingKeys = [];
      return;
    }

    // Handle multi-key shortcuts (g d, n c, etc.)
    const key = event.key.toLowerCase();
    
    if (['g', 'n'].includes(key) && this.pendingKeys.length === 0) {
      this.pendingKeys.push(key);
      // Set timeout to clear pending keys
      this.keyTimeout = setTimeout(() => {
        this.pendingKeys = [];
      }, 1000);
      return;
    }

    if (this.pendingKeys.length > 0) {
      if (this.keyTimeout) {
        clearTimeout(this.keyTimeout);
        this.keyTimeout = null;
      }
      
      this.pendingKeys.push(key);
      const combo = this.pendingKeys.join(' ');
      
      const shortcut = this.shortcuts.find(s => s.keys === combo);
      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
      
      this.pendingKeys = [];
    }
  }

  toggleHelpModal(): void {
    this._isHelpModalOpen.update(v => !v);
  }

  openHelpModal(): void {
    this._isHelpModalOpen.set(true);
  }

  closeHelpModal(): void {
    this._isHelpModalOpen.set(false);
  }

  private navigate(path: string): void {
    this.router.navigate([path]);
  }

  private newEntity(type: string): void {
    this.router.navigate([`/app/${type}`], { queryParams: { action: 'create' } });
  }

  getShortcutsByCategory(category: KeyboardShortcut['category']): KeyboardShortcut[] {
    return this.shortcuts.filter(s => s.category === category);
  }
}
