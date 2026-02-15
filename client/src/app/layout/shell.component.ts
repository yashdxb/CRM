import { Component, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { NotificationContainerComponent } from '../core/notifications';
import { CommandPaletteComponent, CommandPaletteService, QuickAddType } from '../core/command-palette';
import { KeyboardShortcutsModalComponent } from '../core/keyboard-shortcuts';
import { AppToastComponent } from '../shared/app-toast.component';
import { AssistantPanelComponent } from '../core/assistant/assistant-panel.component';
import { NavigationService } from './navigation';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { QuickAddModalComponent } from './quick-add/quick-add-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingOverlayService } from '../core/loading/loading-overlay.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NgIf,
    NotificationContainerComponent,
    CommandPaletteComponent,
    KeyboardShortcutsModalComponent,
    AppToastComponent,
    AssistantPanelComponent,
    SidebarComponent,
    TopbarComponent,
    QuickAddModalComponent,
    ProgressSpinnerModule
  ],
  templateUrl: "./shell.component.html",
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  protected readonly nav = inject(NavigationService);
  protected readonly loadingOverlay = inject(LoadingOverlayService);
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
