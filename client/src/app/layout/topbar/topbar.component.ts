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
  templateUrl: "./topbar.component.html",
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  protected readonly commandPaletteService = inject(CommandPaletteService);

  readonly toggleSidebar = output<void>();
  readonly openQuickAdd = output<void>();
}
