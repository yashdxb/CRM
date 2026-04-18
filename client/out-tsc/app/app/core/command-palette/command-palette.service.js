import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export class CommandPaletteService {
    router = inject(Router);
    _isOpen = signal(false, ...(ngDevMode ? [{ debugName: "_isOpen" }] : []));
    _searchQuery = signal('', ...(ngDevMode ? [{ debugName: "_searchQuery" }] : []));
    _recentItems = signal([], ...(ngDevMode ? [{ debugName: "_recentItems" }] : []));
    _selectedIndex = signal(0, ...(ngDevMode ? [{ debugName: "_selectedIndex" }] : []));
    _quickAddRequest = signal(null, ...(ngDevMode ? [{ debugName: "_quickAddRequest" }] : []));
    isOpen = this._isOpen.asReadonly();
    searchQuery = this._searchQuery.asReadonly();
    selectedIndex = this._selectedIndex.asReadonly();
    quickAddRequest = this._quickAddRequest.asReadonly();
    baseCommands = [
        // Navigation
        { id: 'nav-dashboard', label: 'Go to Dashboard', icon: 'pi-chart-bar', category: 'navigation', keywords: ['home', 'overview'], action: () => this.navigate('/app/dashboard'), shortcut: 'G D' },
        { id: 'nav-customers', label: 'Go to Customers', icon: 'pi-building', category: 'navigation', keywords: ['accounts', 'clients'], action: () => this.navigate('/app/customers'), shortcut: 'G C' },
        { id: 'nav-leads', label: 'Go to Leads', icon: 'pi-bullseye', category: 'navigation', keywords: ['prospects', 'pipeline'], action: () => this.navigate('/app/leads'), shortcut: 'G L' },
        { id: 'nav-opportunities', label: 'Go to Deals', icon: 'pi-chart-line', category: 'navigation', keywords: ['deals', 'sales', 'opportunities'], action: () => this.navigate('/app/deals'), shortcut: 'G O' },
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
    filteredCommands = computed(() => {
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
    }, ...(ngDevMode ? [{ debugName: "filteredCommands" }] : []));
    open() {
        this._isOpen.set(true);
        this._searchQuery.set('');
        this._selectedIndex.set(0);
    }
    close() {
        this._isOpen.set(false);
        this._searchQuery.set('');
    }
    toggle() {
        if (this._isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    setSearchQuery(query) {
        this._searchQuery.set(query);
        this._selectedIndex.set(0);
    }
    selectNext() {
        const max = this.filteredCommands().length - 1;
        this._selectedIndex.update(i => Math.min(i + 1, max));
    }
    selectPrevious() {
        this._selectedIndex.update(i => Math.max(i - 1, 0));
    }
    executeSelected() {
        const commands = this.filteredCommands();
        const index = this._selectedIndex();
        if (commands[index]) {
            this.executeCommand(commands[index]);
        }
    }
    executeCommand(command) {
        // Add to recent
        this._recentItems.update(items => {
            const filtered = items.filter(i => i.id !== command.id);
            return [{ ...command, category: 'recent' }, ...filtered].slice(0, 5);
        });
        command.action();
        this.deferQuickAddFallback();
        this.close();
    }
    navigate(path) {
        this.router.navigate([path]);
    }
    createCustomer() {
        this.router.navigate(['/app/customers'], { queryParams: { action: 'create' } });
    }
    requestQuickAdd(type) {
        this._quickAddRequest.set(type);
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('crm-quick-add', { detail: type }));
        }
    }
    clearQuickAddRequest() {
        this._quickAddRequest.set(null);
    }
    deferQuickAddFallback() {
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
    toggleTheme() {
        // Will be connected to ThemeService
        document.documentElement.classList.toggle('dark-theme');
    }
    logout() {
        this.router.navigate(['/landing']);
    }
    static ɵfac = function CommandPaletteService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommandPaletteService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommandPaletteService, factory: CommandPaletteService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommandPaletteService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
