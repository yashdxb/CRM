import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../environments/environment';
import { NavigationService, NavLink } from '../navigation';
import { ThemeService } from '../../core/theme/theme.service';
import { KeyboardShortcutsService } from '../../core/keyboard-shortcuts';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgIf,
    NgClass,
    ButtonModule,
    TooltipModule
  ],
  template: `
    <aside class="sidebar">
      <div class="sidebar__header">
        <div class="brand">
          <div class="brand__mark">CRM</div>
          <div class="brand__env" [ngClass]="{ 'brand__env--prod': environment.production }">{{ environment.envLabel }}</div>
        </div>
        <button pButton type="button" icon="pi pi-bars" class="brand__toggle p-button-text p-button-sm" (click)="toggleSidebar.emit()"></button>
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
        <div class="nav__group" *ngFor="let link of nav.visibleNavLinks(); let linkIndex = index">
          <a
            class="nav__item"
            [ngClass]="{ 'nav__item--active': nav.isParentActive(link) }"
            [routerLink]="link.children?.length ? null : link.path"
            (click)="handleNavClick($event, link)"
            (keydown)="handleKeydown($event, link, linkIndex)"
            [attr.aria-disabled]="link.disabled || null"
            [attr.aria-expanded]="link.children?.length ? nav.isMenuExpanded(link.label) : null"
            [attr.aria-haspopup]="link.children?.length ? 'menu' : null"
            [class.nav__item--disabled]="link.disabled"
            [pTooltip]="nav.collapsed() ? link.label : ''"
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
            <i *ngIf="link.children?.length" class="pi nav__chevron" [ngClass]="nav.isMenuExpanded(link.label) ? 'pi-chevron-up' : 'pi-chevron-right'" aria-hidden="true"></i>
          </a>

          <div
            class="nav__children"
            *ngIf="link.children?.length"
            [ngClass]="{ 'nav__children--open': nav.isMenuExpanded(link.label) }"
            role="menu"
            [attr.aria-label]="link.label + ' submenu'"
          >
            <div *ngFor="let child of link.children; let i = index" class="nav__child-group">
              <a
                class="nav__child"
                [routerLink]="child.children?.length ? null : child.path"
                routerLinkActive="nav__child--active"
                [routerLinkActiveOptions]="{ exact: true }"
                [ngClass]="{ 'nav__child--active': nav.isChildActive(link, child) }"
                [attr.aria-disabled]="child.disabled || null"
                [attr.aria-expanded]="child.children?.length ? nav.isChildExpanded(link.label, child.label) : null"
                [class.nav__child--disabled]="child.disabled"
                (click)="handleChildClick($event, link, child)"
                (keydown)="handleChildKeydown($event, link, child, i)"
                tabindex="0"
                role="menuitem"
              >
                <span class="dot" aria-hidden="true"></span>
                <i class="pi nav__icon" [ngClass]="child.icon"></i>
                <div class="nav__text">
                  <span class="nav__label">{{ child.label }}</span>
                </div>
                <i
                  *ngIf="child.children?.length"
                  class="pi nav__chevron nav__chevron--child"
                  [ngClass]="nav.isChildExpanded(link.label, child.label) ? 'pi-chevron-up' : 'pi-chevron-right'"
                  aria-hidden="true">
                </i>
              </a>

              <div
                class="nav__grandchildren"
                *ngIf="child.children?.length"
                [ngClass]="{ 'nav__grandchildren--open': nav.isChildExpanded(link.label, child.label) }"
                role="menu"
                [attr.aria-label]="child.label + ' submenu'"
              >
                <a
                  *ngFor="let grandChild of child.children"
                  class="nav__grandchild"
                  [routerLink]="grandChild.path"
                  routerLinkActive="nav__grandchild--active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  [attr.aria-disabled]="grandChild.disabled || null"
                  [class.nav__grandchild--disabled]="grandChild.disabled"
                  tabindex="0"
                  role="menuitem"
                >
                  <span class="dot" aria-hidden="true"></span>
                  <i class="pi nav__icon" [ngClass]="grandChild.icon"></i>
                  <div class="nav__text">
                    <span class="nav__label">{{ grandChild.label }}</span>
                  </div>
                </a>
              </div>
            </div>
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
  `,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  protected readonly nav = inject(NavigationService);
  protected readonly themeService = inject(ThemeService);
  protected readonly shortcutsService = inject(KeyboardShortcutsService);
  protected readonly environment = environment;

  readonly toggleSidebar = output<void>();

  handleNavClick(event: Event, link: NavLink) {
    if (link.children?.length) {
      event.preventDefault();
      this.nav.toggleSubmenu(link.label);
    }
  }

  handleChildClick(event: Event, parent: NavLink, child: NavLink) {
    if (child.children?.length) {
      event.preventDefault();
      event.stopPropagation();
      this.nav.toggleChildMenu(parent.label, child.label);
    }
  }

  handleKeydown(event: KeyboardEvent, link: NavLink, index: number) {
    const links = this.nav.visibleNavLinks();

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (link.children?.length) {
          event.preventDefault();
          this.nav.toggleSubmenu(link.label);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (link.children?.length && this.nav.isMenuExpanded(link.label)) {
          this.focusChild(link.label, 0);
        } else if (index < links.length - 1) {
          this.focusParent(index + 1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (index > 0) {
          const prevLink = links[index - 1];
          if (prevLink.children?.length && this.nav.isMenuExpanded(prevLink.label)) {
            this.focusChild(prevLink.label, prevLink.children.length - 1);
          } else {
            this.focusParent(index - 1);
          }
        }
        break;
      case 'ArrowRight':
        if (link.children?.length && !this.nav.isMenuExpanded(link.label)) {
          event.preventDefault();
          this.nav.toggleSubmenu(link.label);
        }
        break;
      case 'ArrowLeft':
        if (link.children?.length && this.nav.isMenuExpanded(link.label)) {
          event.preventDefault();
          this.nav.toggleSubmenu(link.label);
        }
        break;
    }
  }

  handleChildKeydown(event: KeyboardEvent, parent: NavLink, child: NavLink, childIndex: number) {
    const children = parent.children || [];
    const parentIndex = this.nav.visibleNavLinks().findIndex(l => l.label === parent.label);

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (child.children?.length) {
          event.preventDefault();
          this.nav.toggleChildMenu(parent.label, child.label);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (childIndex < children.length - 1) {
          this.focusChild(parent.label, childIndex + 1);
        } else {
          const links = this.nav.visibleNavLinks();
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
          this.focusParent(parentIndex);
        }
        break;
      case 'ArrowLeft':
      case 'Escape':
        event.preventDefault();
        if (child.children?.length && this.nav.isChildExpanded(parent.label, child.label)) {
          this.nav.toggleChildMenu(parent.label, child.label);
        } else {
          this.nav.toggleSubmenu(parent.label);
          this.focusParent(parentIndex);
        }
        break;
      case 'ArrowRight':
        if (child.children?.length && !this.nav.isChildExpanded(parent.label, child.label)) {
          event.preventDefault();
          this.nav.toggleChildMenu(parent.label, child.label);
        }
        break;
    }
  }

  private focusParent(index: number) {
    const items = document.querySelectorAll('.nav__group > .nav__item');
    (items[index] as HTMLElement)?.focus();
  }

  private focusChild(parentLabel: string, childIndex: number) {
    const parentIndex = this.nav.visibleNavLinks().findIndex(l => l.label === parentLabel);
    const groups = document.querySelectorAll('.nav__group');
    const submenu = groups[parentIndex]?.querySelector('.nav__submenu');
    const children = submenu?.querySelectorAll('.nav__item--child');
    (children?.[childIndex] as HTMLElement)?.focus();
  }
}
