import { AfterViewInit, Component, ElementRef, inject, OnDestroy, output } from '@angular/core';
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
  templateUrl: "./sidebar.component.html",
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  private static readonly NAV_ICON_PALETTE = [
    '#3b82f6',
    '#22c55e',
    '#f59e0b',
    '#a855f7',
    '#06b6d4',
    '#ef4444',
    '#f97316',
    '#6366f1'
  ];

  protected readonly nav = inject(NavigationService);
  protected readonly themeService = inject(ThemeService);
  protected readonly shortcutsService = inject(KeyboardShortcutsService);
  protected readonly environment = environment;
  private readonly host = inject(ElementRef<HTMLElement>);
  private resizeObserver?: ResizeObserver;

  readonly toggleSidebar = output<void>();

  ngAfterViewInit() {
    const sidebar = this.sidebarElement();
    if (!sidebar) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.syncShellSidebarWidth());
      this.resizeObserver.observe(sidebar);
    }

    requestAnimationFrame(() => this.syncShellSidebarWidth());
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  protected resolveIconColor(link: NavLink): string {
    if (link.iconColor) {
      return link.iconColor;
    }

    const key = `${link.label}|${link.path}|${link.icon}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }

    return SidebarComponent.NAV_ICON_PALETTE[hash % SidebarComponent.NAV_ICON_PALETTE.length];
  }

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

  private syncShellSidebarWidth() {
    const sidebar = this.sidebarElement();
    const shell = this.host.nativeElement.closest('.shell') as HTMLElement | null;
    if (!sidebar || !shell) {
      return;
    }

    const width = Math.ceil(sidebar.getBoundingClientRect().width);
    shell.style.setProperty('--shell-sidebar-width', `${width}px`);
  }

  private sidebarElement(): HTMLElement | null {
    return this.host.nativeElement.querySelector('.sidebar');
  }
}
