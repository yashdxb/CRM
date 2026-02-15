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
  templateUrl: "./sidebar.component.html",
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
