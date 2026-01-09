import { Component, inject, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommandPaletteService } from '../../core/command-palette';
import { NotificationCenterComponent } from '../../core/notifications';
import { UserMenuComponent } from '../../core/user-menu';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
    NotificationCenterComponent,
    UserMenuComponent
  ],
  template: `
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
        <button pButton type="button" icon="pi pi-bars" class="p-button-text p-button-rounded topbar__toggle" (click)="toggleSidebar.emit()"></button>
        <button pButton label="New" icon="pi pi-plus" class="p-button-rounded p-button-sm p-button-primary" (click)="openQuickAdd.emit()"></button>
        <app-user-menu></app-user-menu>
      </div>
    </header>
  `,
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  protected readonly commandPaletteService = inject(CommandPaletteService);

  readonly toggleSidebar = output<void>();
  readonly openQuickAdd = output<void>();
}
