import { Component, inject, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommandPaletteService } from '../../core/command-palette';
import { AssistantService } from '../../core/assistant/assistant.service';
import { NotificationCenterComponent } from '../../core/notifications';
import { UserMenuComponent } from '../../core/user-menu';
import { NavigationService } from '../navigation';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
    NgClass,
    NotificationCenterComponent,
    UserMenuComponent
  ],
  templateUrl: "./topbar.component.html",
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  protected readonly commandPaletteService = inject(CommandPaletteService);
  protected readonly assistantService = inject(AssistantService);
  protected readonly nav = inject(NavigationService);

  readonly toggleSidebar = output<void>();
  readonly openQuickAdd = output<void>();

  protected toggleAssistant(): void {
    if (this.assistantService.isVisible()) {
      this.assistantService.toggleCollapsed();
    } else {
      this.assistantService.restoreFromTopbar();
    }
  }
}
