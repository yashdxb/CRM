import { Injectable, signal, computed, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category: 'navigation' | 'action' | 'recent' | 'search';
  keywords?: string[];
  action: () => void;
  shortcut?: string;
}

export type QuickAddType = 'lead' | 'contact' | 'activity';

@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  private readonly router = inject(Router);

  private readonly _isOpen = signal(false);
  private readonly _searchQuery = signal('');
  private readonly _recentItems = signal<CommandItem[]>([]);
  private readonly _selectedIndex = signal(0);
  private readonly _quickAddRequest = signal<QuickAddType | null>(null);

  readonly isOpen = this._isOpen.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();
  readonly selectedIndex = this._selectedIndex.asReadonly();
  readonly quickAddRequest = this._quickAddRequest.asReadonly();

  private readonly baseCommands: CommandItem[] = [
    // Navigation
    { id: 'nav-dashboard', label: 'Go to Dashboard', icon: 'pi-chart-bar', category: 'navigation', keywords: ['home', 'overview'], action: () => this.navigate('/app/dashboard'), shortcut: 'G D' },
    { id: 'nav-customers', label: 'Go to Customers', icon: 'pi-building', category: 'navigation', keywords: ['accounts', 'clients'], action: () => this.navigate('/app/customers'), shortcut: 'G C' },
    { id: 'nav-leads', label: 'Go to Leads', icon: 'pi-bullseye', category: 'navigation', keywords: ['prospects', 'pipeline'], action: () => this.navigate('/app/leads'), shortcut: 'G L' },
    { id: 'nav-opportunities', label: 'Go to Opportunities', icon: 'pi-chart-line', category: 'navigation', keywords: ['deals', 'sales'], action: () => this.navigate('/app/opportunities'), shortcut: 'G O' },
    { id: 'nav-activities', label: 'Go to Activities', icon: 'pi-calendar', category: 'navigation', keywords: ['tasks', 'events'], action: () => this.navigate('/app/activities'), shortcut: 'G A' },
    { id: 'nav-settings', label: 'Go to Settings', icon: 'pi-cog', category: 'navigation', keywords: ['config', 'admin'], action: () => this.navigate('/app/settings'), shortcut: 'G S' },
    
    // Actions
    { id: 'action-new-customer', label: 'Create New Customer', description: 'Add a new customer record', icon: 'pi-user-plus', category: 'action', keywords: ['add', 'create', 'customer'], action: () => this.createCustomer(), shortcut: 'N C' },
    { id: 'action-new-lead', label: 'Create New Lead', description: 'Start tracking a new lead', icon: 'pi-plus', category: 'action', keywords: ['add', 'create', 'lead'], action: () => this.requestQuickAdd('lead'), shortcut: 'N L' },
    { id: 'action-new-contact', label: 'Create New Contact', description: 'Add a new contact record', icon: 'pi-id-card', category: 'action', keywords: ['add', 'create', 'contact'], action: () => this.requestQuickAdd('contact'), shortcut: 'N T' },
    { id: 'action-new-activity', label: 'Create New Activity', description: 'Schedule a task or meeting', icon: 'pi-calendar-plus', category: 'action', keywords: ['task', 'meeting', 'call'], action: () => this.requestQuickAdd('activity'), shortcut: 'N A' },
    { id: 'action-toggle-theme', label: 'Toggle Dark Mode', description: 'Switch between light and dark theme', icon: 'pi-moon', category: 'action', keywords: ['theme', 'dark', 'light'], action: () => this.toggleTheme() },
    { id: 'action-logout', label: 'Sign Out', description: 'Log out of your account', icon: 'pi-sign-out', category: 'action', keywords: ['logout', 'exit'], action: () => this.logout() },
  ];

  readonly filteredCommands = computed(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const recent = this._recentItems();

    if (!query) {
      // Show recent items first, then all commands
      const recentIds = new Set(recent.map(r => r.id));
      const nonRecent = this.baseCommands.filter(c => !recentIds.has(c.id));
      return [...recent.slice(0, 3), ...nonRecent];
    }

    return this.baseCommands.filter(cmd => {
      const searchText = [cmd.label, cmd.description, ...(cmd.keywords || [])].join(' ').toLowerCase();
      return searchText.includes(query);
    });
  });

  open(): void {
    this._isOpen.set(true);
    this._searchQuery.set('');
    this._selectedIndex.set(0);
  }

  close(): void {
    this._isOpen.set(false);
    this._searchQuery.set('');
  }

  toggle(): void {
    if (this._isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
    this._selectedIndex.set(0);
  }

  selectNext(): void {
    const max = this.filteredCommands().length - 1;
    this._selectedIndex.update(i => Math.min(i + 1, max));
  }

  selectPrevious(): void {
    this._selectedIndex.update(i => Math.max(i - 1, 0));
  }

  executeSelected(): void {
    const commands = this.filteredCommands();
    const index = this._selectedIndex();
    if (commands[index]) {
      this.executeCommand(commands[index]);
    }
  }

  executeCommand(command: CommandItem): void {
    // Add to recent
    this._recentItems.update(items => {
      const filtered = items.filter(i => i.id !== command.id);
      return [{ ...command, category: 'recent' as const }, ...filtered].slice(0, 5);
    });

    command.action();
    this.deferQuickAddFallback();
    this.close();
  }

  private navigate(path: string): void {
    this.router.navigate([path]);
  }

  private createCustomer(): void {
    this.router.navigate(['/app/customers'], { queryParams: { action: 'create' } });
  }

  requestQuickAdd(type: QuickAddType): void {
    this._quickAddRequest.set(type);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('crm-quick-add', { detail: type }));
    }
  }

  clearQuickAddRequest(): void {
    this._quickAddRequest.set(null);
  }

  private deferQuickAddFallback(): void {
    if (typeof window === 'undefined') {
      return;
    }
    setTimeout(() => {
      const request = this._quickAddRequest();
      if (!request) {
        return;
      }
      window.dispatchEvent(new CustomEvent('crm-quick-add', { detail: request }));
      this._quickAddRequest.set(null);
    }, 0);
  }

  private toggleTheme(): void {
    // Will be connected to ThemeService
    document.documentElement.classList.toggle('dark-theme');
  }

  private logout(): void {
    this.router.navigate(['/landing']);
  }
}
