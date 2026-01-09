import { Component, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { NotificationContainerComponent } from '../core/notifications';
import { CommandPaletteComponent, CommandPaletteService, QuickAddType } from '../core/command-palette';
import { KeyboardShortcutsModalComponent } from '../core/keyboard-shortcuts';
import { AppToastComponent } from '../shared/app-toast.component';
import { NavigationService } from './navigation';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { QuickAddModalComponent } from './quick-add/quick-add-modal.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NotificationContainerComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    AppToastComponent,
    SidebarComponent,
    TopbarComponent,
    QuickAddModalComponent
  ],
  template: `
    <div class="shell" [ngClass]="{ 'shell--collapsed': nav.collapsed() }">
      <app-sidebar (toggleSidebar)="nav.toggleSidebar()" />

      <div class="body">
        <app-topbar 
          (toggleSidebar)="nav.toggleSidebar()" 
          (openQuickAdd)="openQuickAdd()" 
        />

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

    <app-quick-add-modal
      #quickAddModal
      [visible]="quickAddVisible()"
      [initialType]="quickAddType()"
      (close)="quickAddVisible.set(false)"
      (created)="onQuickAddCreated()"
    />
  `,
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  protected readonly nav = inject(NavigationService);
  private readonly commandPaletteService = inject(CommandPaletteService);

  @ViewChild('quickAddModal') quickAddModal!: QuickAddModalComponent;

  protected readonly quickAddVisible = signal(false);
  protected readonly quickAddType = signal<QuickAddType>('lead');

  private readonly quickAddEffect = effect(() => {
    const request = this.commandPaletteService.quickAddRequest();
    if (request) {
      this.openQuickAdd(request);
      this.commandPaletteService.clearQuickAddRequest();
    }
  });

  @HostListener('window:crm-quick-add', ['$event'])
  handleQuickAddEvent(event: Event) {
    const type = (event as CustomEvent<QuickAddType>)?.detail;
    if (type) {
      this.openQuickAdd(type);
    }
  }

  protected openQuickAdd(type?: QuickAddType) {
    this.quickAddType.set(type ?? 'lead');
    this.quickAddVisible.set(true);
    // Allow modal to render, then call open() to load lookups
    setTimeout(() => this.quickAddModal?.open(type), 0);
  }

  protected onQuickAddCreated() {
    this.nav.refreshNav();
  }
}
