import { Component, computed, inject, signal, OnInit, HostListener, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { environment } from '../../environments/environment';
import { readTokenContext, tokenHasPermission } from '../core/auth/token.utils';
import { PERMISSION_KEYS } from '../core/auth/permission.constants';
import { NotificationCenterComponent, NotificationContainerComponent, NotificationService } from '../core/notifications';
import { CommandPaletteComponent, CommandPaletteService, QuickAddType } from '../core/command-palette';
import { KeyboardShortcutsModalComponent, KeyboardShortcutsService } from '../core/keyboard-shortcuts';
import { UserMenuComponent } from '../core/user-menu';
import { ThemeService } from '../core/theme/theme.service';
import { filter } from 'rxjs/operators';
import { LeadDataService, SaveLeadRequest } from '../features/leads/services/lead-data.service';
import { ContactDataService } from '../features/contacts/services/contact-data.service';
import { CustomerDataService } from '../features/customers/services/customer-data.service';
import { OpportunityDataService } from '../features/opportunities/services/opportunity-data.service';
import { ActivityDataService } from '../features/activities/services/activity-data.service';
import { UpsertActivityRequest } from '../features/activities/models/activity.model';
import { AppToastComponent } from '../shared/app-toast.component';

interface Option<T = string> {
  label: string;
  value: T;
}

interface NavLink {
  label: string;
  icon: string;
  path: string;
  badge?: string;
  disabled?: boolean;
  permission?: string;
  children?: NavLink[];
}

const NAV_LINKS: NavLink[] = [
  { label: 'Dashboard', icon: 'pi-chart-bar', path: '/app/dashboard', permission: PERMISSION_KEYS.dashboardView },
  { 
    label: 'Customers', 
    icon: 'pi-building', 
    path: '/app/customers', 
    permission: PERMISSION_KEYS.customersView,
    children: [
      { label: 'All Customers', icon: 'pi-list', path: '/app/customers', permission: PERMISSION_KEYS.customersView },
      { label: 'Add Customer', icon: 'pi-plus', path: '/app/customers/new', permission: PERMISSION_KEYS.customersManage }
    ]
  },
  { 
    label: 'Leads', 
    icon: 'pi-bullseye', 
    path: '/app/leads', 
    permission: PERMISSION_KEYS.leadsView,
    children: [
      { label: 'All Leads', icon: 'pi-list', path: '/app/leads', permission: PERMISSION_KEYS.leadsView },
      { label: 'Add Lead', icon: 'pi-plus', path: '/app/leads/new', permission: PERMISSION_KEYS.leadsManage },
      { label: 'Pipeline', icon: 'pi-sitemap', path: '/app/leads/pipeline', permission: PERMISSION_KEYS.leadsView },
      { label: 'Import Leads', icon: 'pi-upload', path: '/app/leads/import', permission: PERMISSION_KEYS.leadsManage }
    ]
  },
  { 
    label: 'Opportunities', 
    icon: 'pi-chart-line', 
    path: '/app/opportunities', 
    permission: PERMISSION_KEYS.opportunitiesView,
    children: [
      { label: 'All Opportunities', icon: 'pi-list', path: '/app/opportunities', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Add Opportunity', icon: 'pi-plus', path: '/app/opportunities/new', permission: PERMISSION_KEYS.opportunitiesManage }
    ]
  },
  { 
    label: 'Activities', 
    icon: 'pi-calendar', 
    path: '/app/activities', 
    permission: PERMISSION_KEYS.activitiesView,
    children: [
      { label: 'All Activities', icon: 'pi-list', path: '/app/activities', permission: PERMISSION_KEYS.activitiesView },
      { label: 'Calendar', icon: 'pi-calendar-plus', path: '/app/activities/calendar', permission: PERMISSION_KEYS.activitiesView },
      { label: 'Tasks', icon: 'pi-check-square', path: '/app/activities/tasks', permission: PERMISSION_KEYS.activitiesView }
    ]
  },
  { 
    label: 'Contacts', 
    icon: 'pi-id-card', 
    path: '/app/contacts', 
    permission: PERMISSION_KEYS.contactsView,
    children: [
      { label: 'All Contacts', icon: 'pi-list', path: '/app/contacts', permission: PERMISSION_KEYS.contactsView },
      { label: 'Add Contact', icon: 'pi-plus', path: '/app/contacts/new', permission: PERMISSION_KEYS.contactsManage }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi-cog',
    path: '/app/settings',
    permission: PERMISSION_KEYS.administrationView,
    children: [
      { label: 'Users', icon: 'pi-users', path: '/app/settings/users', permission: PERMISSION_KEYS.administrationView },
      { label: 'Notifications', icon: 'pi-bell', path: '/app/settings/notifications', permission: PERMISSION_KEYS.administrationView },
      { label: 'Roles', icon: 'pi-shield', path: '/app/settings/roles', permission: PERMISSION_KEYS.administrationView },
      { label: 'Invite', icon: 'pi-user-plus', path: '/app/settings/invite', permission: PERMISSION_KEYS.administrationManage },
      { label: 'Workspace', icon: 'pi-sliders-h', path: '/app/settings/workspace', permission: PERMISSION_KEYS.administrationManage },
      { label: 'Lead assignment', icon: 'pi-sitemap', path: '/app/settings/lead-assignment', permission: PERMISSION_KEYS.leadsManage },
      { label: 'Tenants', icon: 'pi-building', path: '/app/settings/tenants', permission: PERMISSION_KEYS.tenantsView }
    ]
  }
];

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    TooltipModule,
    DialogModule,
    SelectModule,
    DatePickerModule,
    NotificationContainerComponent,
    NotificationCenterComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    UserMenuComponent,
    AppToastComponent
  ],
  template: `
    <div class="shell" [ngClass]="{ 'shell--collapsed': collapsed }">
      <aside class="sidebar">
        <div class="sidebar__header">
          <div class="brand">
            <div class="brand__mark">CRM</div>
            <div class="brand__env" [ngClass]="{ 'brand__env--prod': environment.production }">{{ environment.envLabel }}</div>
          </div>
          <button pButton type="button" icon="pi pi-bars" class="brand__toggle p-button-text p-button-sm" (click)="toggleNav()"></button>
        </div>
        <div class="sidebar__summary">
          <div class="summary__badge">
            <i class="pi pi-bolt"></i>
            <span>Workspace</span>
          </div>
          <p class="summary__hint">Compact, quick-jump rail.</p>
        </div>

        <nav class="nav" role="navigation" aria-label="Main navigation">
          <p class="nav__title">Navigate</p>
          <div class="nav__group" *ngFor="let link of visibleNavLinks(); let linkIndex = index">
            <a
              class="nav__item"
              [ngClass]="{ 'nav__item--active': isParentActive(link) }"
              [routerLink]="link.children?.length ? null : link.path"
              (click)="handleNavClick($event, link)"
              (keydown)="handleKeydown($event, link, linkIndex)"
              [attr.aria-disabled]="link.disabled || null"
              [attr.aria-expanded]="link.children?.length ? isMenuExpanded(link.label) : null"
              [attr.aria-haspopup]="link.children?.length ? 'menu' : null"
              [class.nav__item--disabled]="link.disabled"
              [pTooltip]="collapsed ? link.label : ''"
              tooltipPosition="right"
              tabindex="0"
              role="menuitem"
            >
              <span class="nav__pill" aria-hidden="true"></span>
              <i class="pi" [ngClass]="link.icon"></i>
              <div class="nav__text">
                <span class="nav__label">{{ link.label }}</span>
              </div>
              <span *ngIf="link.badge" class="nav__badge">{{ link.badge }}</span>
              <i *ngIf="link.children?.length" class="pi nav__chevron" [ngClass]="isMenuExpanded(link.label) ? 'pi-chevron-up' : 'pi-chevron-right'" aria-hidden="true"></i>
            </a>

            <div
              class="nav__children"
              *ngIf="link.children?.length"
              [ngClass]="{ 'nav__children--open': isMenuExpanded(link.label) }"
              role="menu"
              [attr.aria-label]="link.label + ' submenu'"
            >
              <a
                *ngFor="let child of link.children; let i = index"
                class="nav__child"
                [routerLink]="child.path"
                routerLinkActive="nav__child--active"
                [routerLinkActiveOptions]="{ exact: true }"
                [attr.aria-disabled]="child.disabled || null"
                [class.nav__child--disabled]="child.disabled"
                (keydown)="handleChildKeydown($event, link, i)"
                tabindex="0"
                role="menuitem"
              >
                <span class="dot" aria-hidden="true"></span>
                <div class="nav__text">
                  <span class="nav__label">{{ child.label }}</span>
                </div>
              </a>
            </div>
          </div>
        </nav>

        <div class="sidebar__footer">
          <div class="sidebar__footer-meta">
            <span>Quick tools</span>
            <small>⌘K for command palette</small>
          </div>
          <div class="sidebar__footer-actions">
            <button
              pButton
              type="button"
              class="sidebar__theme-toggle p-button-text"
              (click)="themeService.toggleDarkMode()"
              [pTooltip]="themeService.themeLabel()"
              tooltipPosition="right"
            >
              <i class="pi" [ngClass]="themeService.themeIcon()"></i>
            </button>
            <button
              pButton
              type="button"
              class="sidebar__shortcuts p-button-text"
              (click)="shortcutsService.openHelpModal()"
              pTooltip="Keyboard shortcuts (?)"
              tooltipPosition="right"
            >
              <i class="pi pi-key"></i>
            </button>
          </div>
        </div>
      </aside>

      <div class="body">
        <header class="topbar">
          <div class="topbar__left">
            <div class="topbar__title">Dynamics CRM</div>
            <p class="topbar__subtitle">Customer + Activity workspace</p>
          </div>
          <div class="topbar__actions">
            <button
              pButton
              type="button"
              class="topbar__command-palette p-button-text"
              (click)="commandPaletteService.open()"
              pTooltip="Search or jump to... (⌘K)"
            >
              <i class="pi pi-search"></i>
              <span>Search...</span>
              <kbd>⌘K</kbd>
            </button>
            <app-notification-center></app-notification-center>
            <button pButton type="button" icon="pi pi-bars" class="p-button-text p-button-rounded topbar__toggle" (click)="toggleNav()"></button>
            <button pButton label="New" icon="pi pi-plus" class="p-button-rounded p-button-sm p-button-primary" (click)="openQuickAdd()"></button>
            <app-user-menu></app-user-menu>
          </div>
        </header>

        <main class="content">
          <router-outlet />
        </main>

        <app-toast />
      </div>
    </div>

    <!-- Global overlays -->
    <app-notification-container></app-notification-container>
    <app-command-palette></app-command-palette>
    <app-keyboard-shortcuts-modal></app-keyboard-shortcuts-modal>

    <p-dialog
      header="Quick add"
      [(visible)]="quickAddVisible"
      [modal]="true"
      [style]="{ width: '520px' }"
      [draggable]="false"
      [resizable]="false"
      styleClass="quick-add-dialog"
    >
      <div class="quick-add">
        <div class="quick-add__type">
          <label>Record type</label>
          <p-select
            [options]="quickAddTypes"
            optionLabel="label"
            optionValue="value"
            [(ngModel)]="quickAddType"
          ></p-select>
        </div>

        <div *ngIf="quickAddType === 'lead'" class="quick-add__grid">
          <div class="field">
            <label>Name</label>
            <input pInputText [(ngModel)]="quickAddLeadName" placeholder="Lead name" />
          </div>
          <div class="field">
            <label>Company</label>
            <input pInputText [(ngModel)]="quickAddLeadCompany" placeholder="Company" />
          </div>
          <div class="field">
            <label>Email</label>
            <input pInputText [(ngModel)]="quickAddLeadEmail" placeholder="name@company.com" />
          </div>
          <div class="field">
            <label>Phone</label>
            <input pInputText [(ngModel)]="quickAddLeadPhone" placeholder="+1 555 000 0000" />
          </div>
        </div>

        <div *ngIf="quickAddType === 'contact'" class="quick-add__grid">
          <div class="field">
            <label>Name</label>
            <input pInputText [(ngModel)]="quickAddContactName" placeholder="Contact name" />
          </div>
          <div class="field">
            <label>Account</label>
            <p-select
              [options]="accountOptions()"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddContactAccountId"
              placeholder="Select account"
            ></p-select>
          </div>
          <div class="field">
            <label>Email</label>
            <input pInputText [(ngModel)]="quickAddContactEmail" placeholder="name@company.com" />
          </div>
          <div class="field">
            <label>Phone</label>
            <input pInputText [(ngModel)]="quickAddContactPhone" placeholder="+1 555 000 0000" />
          </div>
        </div>

        <div *ngIf="quickAddType === 'activity'" class="quick-add__grid">
          <div class="field">
            <label>Subject</label>
            <input pInputText [(ngModel)]="quickAddActivitySubject" placeholder="Follow up call" />
          </div>
          <div class="field">
            <label>Type</label>
            <p-select
              [options]="activityTypeOptions"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddActivityType"
            ></p-select>
          </div>
          <div class="field">
            <label>Priority</label>
            <p-select
              [options]="activityPriorityOptions"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddActivityPriority"
            ></p-select>
          </div>
          <div class="field">
            <label>Due date</label>
            <p-datePicker [(ngModel)]="quickAddActivityDueDate"></p-datePicker>
          </div>
          <div class="field">
            <label>Related to</label>
          <p-select
            [options]="activityRelationOptions"
            optionLabel="label"
            optionValue="value"
            [(ngModel)]="quickAddActivityRelationType"
            (ngModelChange)="onQuickAddRelationTypeChange($event)"
          ></p-select>
        </div>
          <div class="field" *ngIf="quickAddActivityRelationType === 'Account'">
            <label>Account</label>
            <p-select
              [options]="accountOptions()"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddActivityRelationId"
              placeholder="Select account"
            ></p-select>
          </div>
          <div class="field" *ngIf="quickAddActivityRelationType === 'Contact'">
            <label>Contact</label>
            <p-select
              [options]="contactOptions()"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddActivityRelationId"
              placeholder="Select contact"
            ></p-select>
          </div>
          <div class="field" *ngIf="quickAddActivityRelationType === 'Opportunity'">
            <label>Opportunity</label>
            <p-select
              [options]="opportunityOptions()"
              optionLabel="label"
              optionValue="value"
              [(ngModel)]="quickAddActivityRelationId"
              placeholder="Select opportunity"
            ></p-select>
          </div>
        </div>
      </div>
      <ng-template pTemplate="footer">
        <button pButton type="button" class="crm-button crm-button--ghost" label="Cancel" (click)="quickAddVisible = false"></button>
        <button
          pButton
          type="button"
          class="crm-button crm-button--primary"
          label="Create"
          [disabled]="quickAddSaving() || !canSubmitQuickAdd()"
          (click)="submitQuickAdd()"
        ></button>
      </ng-template>
    </p-dialog>
  `,
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit {
  private readonly STORAGE_KEY = 'crm_nav_expanded_menus';
  
  protected readonly environment = environment;
  protected readonly navLinks: NavLink[] = NAV_LINKS;
  protected readonly themeService = inject(ThemeService);
  protected readonly commandPaletteService = inject(CommandPaletteService);
  protected readonly shortcutsService = inject(KeyboardShortcutsService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  collapsed = false;
  
  // Track multiple expanded menus (Set stored in signal)
  private expandedMenus = signal<Set<string>>(new Set());

  private readonly navVersion = signal(0);
  private readonly leadData = inject(LeadDataService);
  private readonly contactData = inject(ContactDataService);
  private readonly customerData = inject(CustomerDataService);
  private readonly opportunityData = inject(OpportunityDataService);
  private readonly activityData = inject(ActivityDataService);
  private readonly quickAddEffect = effect(() => {
    const request = this.commandPaletteService.quickAddRequest();
    if (request) {
      this.openQuickAdd(request);
      this.commandPaletteService.clearQuickAddRequest();
    }
  });

  protected quickAddVisible = false;
  protected quickAddType: 'lead' | 'contact' | 'activity' = 'lead';
  protected readonly quickAddTypes: Option<'lead' | 'contact' | 'activity'>[] = [
    { label: 'Lead', value: 'lead' },
    { label: 'Contact', value: 'contact' },
    { label: 'Activity', value: 'activity' }
  ];
  protected quickAddLeadName = '';
  protected quickAddLeadCompany = '';
  protected quickAddLeadEmail = '';
  protected quickAddLeadPhone = '';
  protected quickAddContactName = '';
  protected quickAddContactEmail = '';
  protected quickAddContactPhone = '';
  protected quickAddContactAccountId: string | null = null;
  protected quickAddActivitySubject = '';
  protected quickAddActivityType: UpsertActivityRequest['type'] = 'Task';
  protected quickAddActivityPriority: UpsertActivityRequest['priority'] = 'Normal';
  protected quickAddActivityDueDate?: string | Date;
  protected quickAddActivityRelationType: UpsertActivityRequest['relatedEntityType'] = 'Account';
  protected quickAddActivityRelationId: string | null = null;
  protected readonly quickAddSaving = signal(false);
  protected readonly accountOptions = signal<Option<string>[]>([]);
  protected readonly contactOptions = signal<Option<string>[]>([]);
  protected readonly opportunityOptions = signal<Option<string>[]>([]);
  protected readonly activityTypeOptions: Option<UpsertActivityRequest['type']>[] = [
    { label: 'Task', value: 'Task' },
    { label: 'Call', value: 'Call' },
    { label: 'Email', value: 'Email' },
    { label: 'Meeting', value: 'Meeting' }
  ];
  protected readonly activityPriorityOptions: Option<NonNullable<UpsertActivityRequest['priority']>>[] = [
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
    { label: 'Low', value: 'Low' }
  ];
  protected readonly activityRelationOptions: Option<NonNullable<UpsertActivityRequest['relatedEntityType']>>[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Opportunity', value: 'Opportunity' }
  ];

  ngOnInit() {
    // Load persisted expanded state from localStorage
    this.loadExpandedState();
    
    // Auto-expand submenu based on current route on init and navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.autoExpandActiveMenu();
    });
    
    // Initial expansion based on current route
    this.autoExpandActiveMenu();

  }

  @HostListener('window:crm-quick-add', ['$event'])
  handleQuickAddEvent(event: Event) {
    const type = (event as CustomEvent<QuickAddType>)?.detail;
    if (type) {
      this.openQuickAdd(type);
    }
  }

  /**
   * Load expanded menu state from localStorage
   */
  private loadExpandedState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const menus = JSON.parse(stored) as string[];
        this.expandedMenus.set(new Set(menus));
      }
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Persist expanded menu state to localStorage
   */
  private saveExpandedState() {
    try {
      const menus = Array.from(this.expandedMenus());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(menus));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Auto-expand menu containing the active route
   */
  private autoExpandActiveMenu() {
    const currentUrl = this.router.url.split('?')[0];
    
    for (const link of this.navLinks) {
      if (link.children?.length) {
        const isChildActive = link.children.some(child => 
          currentUrl === child.path || currentUrl.startsWith(child.path + '/')
        );
        if (isChildActive && !this.expandedMenus().has(link.label)) {
          this.expandedMenus.update(menus => {
            const newMenus = new Set(menus);
            newMenus.add(link.label);
            return newMenus;
          });
          this.saveExpandedState();
        }
      }
    }
  }

  /**
   * Check if a menu is expanded
   */
  isMenuExpanded(label: string): boolean {
    return this.expandedMenus().has(label);
  }

  /**
   * Handle nav item click
   */
  handleNavClick(event: Event, link: NavLink) {
    if (link.children?.length) {
      event.preventDefault();
      this.toggleSubmenu(link.label);
    }
  }

  /**
   * Keyboard navigation for parent items
   */
  handleKeydown(event: KeyboardEvent, link: NavLink, index: number) {
    const links = this.visibleNavLinks();
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (link.children?.length) {
          event.preventDefault();
          this.toggleSubmenu(link.label);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (link.children?.length && this.isMenuExpanded(link.label)) {
          // Focus first child
          this.focusChild(link.label, 0);
        } else if (index < links.length - 1) {
          // Focus next parent
          this.focusParent(index + 1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (index > 0) {
          // Check if previous item has expanded children
          const prevLink = links[index - 1];
          if (prevLink.children?.length && this.isMenuExpanded(prevLink.label)) {
            // Focus last child of previous menu
            this.focusChild(prevLink.label, prevLink.children.length - 1);
          } else {
            this.focusParent(index - 1);
          }
        }
        break;
      case 'ArrowRight':
        if (link.children?.length && !this.isMenuExpanded(link.label)) {
          event.preventDefault();
          this.toggleSubmenu(link.label);
        }
        break;
      case 'ArrowLeft':
        if (link.children?.length && this.isMenuExpanded(link.label)) {
          event.preventDefault();
          this.toggleSubmenu(link.label);
        }
        break;
    }
  }

  /**
   * Keyboard navigation for child items
   */
  handleChildKeydown(event: KeyboardEvent, parent: NavLink, childIndex: number) {
    const children = parent.children || [];
    const parentIndex = this.visibleNavLinks().findIndex(l => l.label === parent.label);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (childIndex < children.length - 1) {
          this.focusChild(parent.label, childIndex + 1);
        } else {
          // Move to next parent
          const links = this.visibleNavLinks();
          if (parentIndex < links.length - 1) {
            this.focusParent(parentIndex + 1);
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (childIndex > 0) {
          this.focusChild(parent.label, childIndex - 1);
        } else {
          // Move to parent
          this.focusParent(parentIndex);
        }
        break;
      case 'ArrowLeft':
      case 'Escape':
        event.preventDefault();
        this.toggleSubmenu(parent.label);
        this.focusParent(parentIndex);
        break;
    }
  }

  private focusParent(index: number) {
    const items = document.querySelectorAll('.nav__group > .nav__item');
    (items[index] as HTMLElement)?.focus();
  }

  private focusChild(parentLabel: string, childIndex: number) {
    const parentIndex = this.visibleNavLinks().findIndex(l => l.label === parentLabel);
    const groups = document.querySelectorAll('.nav__group');
    const submenu = groups[parentIndex]?.querySelector('.nav__submenu');
    const children = submenu?.querySelectorAll('.nav__item--child');
    (children?.[childIndex] as HTMLElement)?.focus();
  }

  protected readonly visibleNavLinks = computed(() => {
    this.navVersion();
    const context = readTokenContext();

    const hasPermission = (link: NavLink) => {
      if (!link.permission || !context) {
        return true;
      }
      return tokenHasPermission(context.payload, link.permission);
    };

    return this.navLinks.reduce<NavLink[]>((acc, link) => {
      const children = link.children?.filter((child) => hasPermission(child)) ?? [];
      if (!hasPermission(link) && children.length === 0) {
        return acc;
      }
      acc.push({ ...link, children });
      return acc;
    }, []);
  });

  /**
   * Toggle submenu expansion (allows multiple open)
   */
  toggleSubmenu(label: string) {
    this.expandedMenus.update(menus => {
      const newMenus = new Set(menus);
      if (newMenus.has(label)) {
        newMenus.delete(label);
      } else {
        newMenus.add(label);
      }
      return newMenus;
    });
    this.saveExpandedState();
  }

  /**
   * Determines if a parent nav item should show as active
   */
  isParentActive(link: NavLink): boolean {
    const currentUrl = this.router.url.split('?')[0];
    
    // If has children, check if any child is active
    if (link.children?.length) {
      return link.children.some(child => 
        currentUrl === child.path || currentUrl.startsWith(child.path + '/')
      );
    }
    
    // No children, check direct match
    return currentUrl === link.path || currentUrl.startsWith(link.path + '/');
  }

  /**
   * Determines if a child nav item should be shown as active.
   * When multiple children share the same path as parent, only the first one is active.
   */
  isChildActive(parent: NavLink, child: NavLink, index: number): boolean {
    const currentUrl = this.router.url.split('?')[0]; // Remove query params
    
    // If child has a unique path different from parent, check exact match
    if (child.path !== parent.path) {
      return currentUrl === child.path;
    }
    
    // If child path equals parent path, only first child gets active state
    if (currentUrl === child.path || currentUrl.startsWith(child.path + '/')) {
      return index === 0;
    }
    
    return false;
  }

  toggleNav() {
    this.collapsed = !this.collapsed;
    // Persist sidebar collapsed state
    try {
      localStorage.setItem('crm_sidebar_collapsed', String(this.collapsed));
    } catch {}
  }

  refreshNav() {
    this.navVersion.update((version) => version + 1);
  }

  protected openQuickAdd(type?: QuickAddType) {
    this.quickAddVisible = true;
    this.resetQuickAddForm(type);
    this.loadQuickAddLookups();
  }

  protected submitQuickAdd() {
    if (this.quickAddSaving()) {
      return;
    }

    this.quickAddSaving.set(true);
    if (this.quickAddType === 'lead') {
      const { firstName, lastName } = this.splitName(this.quickAddLeadName);
      const payload: SaveLeadRequest = {
        firstName,
        lastName,
        companyName: this.quickAddLeadCompany || undefined,
        email: this.quickAddLeadEmail || undefined,
        phone: this.quickAddLeadPhone || undefined,
        status: 'New'
      };
      this.leadData.create(payload).subscribe({
        next: () => this.finishQuickAdd('Lead created', payload.firstName),
        error: () => this.failQuickAdd('Lead')
      });
      return;
    }

    if (this.quickAddType === 'contact') {
      const { firstName, lastName } = this.splitName(this.quickAddContactName);
      this.contactData.create({
        firstName,
        lastName,
        email: this.quickAddContactEmail || undefined,
        phone: this.quickAddContactPhone || undefined,
        accountId: this.quickAddContactAccountId || undefined
      }).subscribe({
        next: () => this.finishQuickAdd('Contact created', `${firstName} ${lastName}`.trim()),
        error: () => this.failQuickAdd('Contact')
      });
      return;
    }

    const dueDate =
      this.quickAddActivityDueDate instanceof Date
        ? this.quickAddActivityDueDate.toISOString()
        : this.quickAddActivityDueDate;
    const activityPayload: UpsertActivityRequest = {
      subject: this.quickAddActivitySubject,
      type: this.quickAddActivityType,
      priority: this.quickAddActivityPriority,
      dueDateUtc: dueDate,
      relatedEntityType: this.quickAddActivityRelationType,
      relatedEntityId: this.quickAddActivityRelationId || undefined
    };
    this.activityData.create(activityPayload).subscribe({
      next: () => this.finishQuickAdd('Activity created', activityPayload.subject),
      error: () => this.failQuickAdd('Activity')
    });
  }

  protected onQuickAddRelationTypeChange(_value?: UpsertActivityRequest['relatedEntityType']) {
    this.quickAddActivityRelationId = null;
  }

  protected canSubmitQuickAdd() {
    if (this.quickAddType === 'lead') {
      return !!this.quickAddLeadName.trim();
    }
    if (this.quickAddType === 'contact') {
      return !!this.quickAddContactName.trim();
    }
    return !!this.quickAddActivitySubject.trim();
  }

  private finishQuickAdd(title: string, name?: string) {
    this.quickAddSaving.set(false);
    this.quickAddVisible = false;
    this.notificationService.success(title, name ? `${name} saved successfully.` : 'Saved successfully.');
  }

  private failQuickAdd(label: string) {
    this.quickAddSaving.set(false);
    this.notificationService.error(`${label} not saved`, 'Please try again.');
  }

  private resetQuickAddForm(type?: QuickAddType) {
    this.quickAddType = type ?? 'lead';
    this.quickAddLeadName = '';
    this.quickAddLeadCompany = '';
    this.quickAddLeadEmail = '';
    this.quickAddLeadPhone = '';
    this.quickAddContactName = '';
    this.quickAddContactEmail = '';
    this.quickAddContactPhone = '';
    this.quickAddContactAccountId = null;
    this.quickAddActivitySubject = '';
    this.quickAddActivityType = 'Task';
    this.quickAddActivityPriority = 'Normal';
    this.quickAddActivityDueDate = undefined;
    this.quickAddActivityRelationType = 'Account';
    this.quickAddActivityRelationId = null;
  }

  private splitName(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { firstName: 'Unknown', lastName: '' };
    }
    const parts = trimmed.split(/\s+/);
    const firstName = parts.shift() ?? '';
    const lastName = parts.join(' ');
    return { firstName, lastName };
  }

  private loadQuickAddLookups() {
    if (!this.accountOptions().length) {
      this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.accountOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
    if (!this.contactOptions().length) {
      this.contactData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.contactOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
    if (!this.opportunityOptions().length) {
      this.opportunityData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
        this.opportunityOptions.set(res.items.map((item) => ({ label: item.name, value: item.id })));
      });
    }
  }
}
