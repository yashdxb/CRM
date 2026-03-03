import { Component, computed, DestroyRef, ElementRef, inject, signal, HostListener, effect, ViewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
import { TooltipModule } from 'primeng/tooltip';
import { LoadingOverlayService } from '../core/loading/loading-overlay.service';
import { PresenceConnectionState, PresenceService } from '../core/realtime/presence.service';
import { UserLookupItem } from '../crm/features/settings/models/user-admin.model';
import { UserAdminDataService } from '../crm/features/settings/services/user-admin-data.service';

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
    ProgressSpinnerModule,
    TooltipModule
  ],
  templateUrl: "./shell.component.html",
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly nav = inject(NavigationService);
  protected readonly loadingOverlay = inject(LoadingOverlayService);
  private readonly commandPaletteService = inject(CommandPaletteService);
  private readonly presenceService = inject(PresenceService);
  private readonly userAdminData = inject(UserAdminDataService);

  protected readonly onlineUsers = toSignal(this.presenceService.onlineUsers$, { initialValue: new Set<string>() });
  protected readonly presenceConnectionState = toSignal(this.presenceService.connectionState$, {
    initialValue: 'disconnected' as PresenceConnectionState
  });
  protected readonly onlineCount = computed(() => this.onlineUsers().size);
  protected readonly onlineUsersPopupVisible = signal(false);
  protected readonly userLookupLoading = signal(false);
  protected readonly userLookupLoaded = signal(false);
  protected readonly userLookupError = signal<string | null>(null);
  protected readonly userLookupById = signal<Map<string, UserLookupItem>>(new Map());
  protected readonly onlinePeople = computed(() => {
    const lookup = this.userLookupById();
    return [...this.onlineUsers()]
      .map((userId) => {
        const user = lookup.get(userId);
        const displayName = user?.fullName?.trim() || `User ${userId.slice(0, 8)}`;
        return {
          userId,
          displayName,
          email: user?.email ?? null,
          initials: this.buildInitials(displayName)
        };
      })
      .sort((first, second) => first.displayName.localeCompare(second.displayName));
  });
  protected readonly presencePopupBodyMaxHeight = computed(() => {
    const desiredHeight = 84 + this.onlineCount() * 56;
    return Math.min(360, Math.max(140, desiredHeight));
  });
  protected readonly presenceStatusLabel = computed(() => {
    const state = this.presenceConnectionState();
    if (state === 'connected') {
      return 'Live';
    }
    if (state === 'reconnecting' || state === 'connecting') {
      return 'Syncing';
    }
    return 'Offline';
  });
  protected readonly footerPresenceTooltip = computed(() => {
    const count = this.onlineCount();
    const state = this.presenceConnectionState();

    if (state === 'connected') {
      return `${count} user${count === 1 ? '' : 's'} online`;
    }

    if (state === 'reconnecting' || state === 'connecting') {
      return `Presence ${state}… showing latest count (${count})`;
    }

    return `Presence offline. Last known count: ${count}`;
  });

  @ViewChild('quickAddModal') quickAddModal!: QuickAddModalComponent;
  @ViewChild('presenceTrigger') presenceTrigger?: ElementRef<HTMLElement>;
  @ViewChild('presencePopup') presencePopup?: ElementRef<HTMLElement>;

  protected readonly quickAddVisible = signal(false);
  protected readonly quickAddType = signal<QuickAddType>('lead');

  private readonly quickAddEffect = effect(() => {
    const request = this.commandPaletteService.quickAddRequest();
    if (request) {
      this.openQuickAdd(request);
      this.commandPaletteService.clearQuickAddRequest();
    }
  });

  constructor() {
    this.syncSidebarForViewport();
  }

  @HostListener('window:crm-quick-add', ['$event'])
  handleQuickAddEvent(event: Event) {
    const type = (event as CustomEvent<QuickAddType>)?.detail;
    if (type) {
      this.openQuickAdd(type);
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.syncSidebarForViewport();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.onlineUsersPopupVisible()) {
      return;
    }

    const targetNode = event.target as Node | null;
    const triggerElement = this.presenceTrigger?.nativeElement;
    const popupElement = this.presencePopup?.nativeElement;

    if (!targetNode) {
      this.onlineUsersPopupVisible.set(false);
      return;
    }

    const clickedInsideTrigger = !!triggerElement && triggerElement.contains(targetNode);
    const clickedInsidePopup = !!popupElement && popupElement.contains(targetNode);

    if (!clickedInsideTrigger && !clickedInsidePopup) {
      this.onlineUsersPopupVisible.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.onlineUsersPopupVisible.set(false);
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

  protected toggleOnlineUsersPopup(event: MouseEvent): void {
    event.stopPropagation();
    const willOpen = !this.onlineUsersPopupVisible();
    this.onlineUsersPopupVisible.set(willOpen);

    if (willOpen) {
      this.ensureUserLookupLoaded();
    }
  }

  protected retryUserLookup(): void {
    this.userLookupLoaded.set(false);
    this.userLookupError.set(null);
    this.ensureUserLookupLoaded();
  }

  private ensureUserLookupLoaded(): void {
    if (this.userLookupLoading() || this.userLookupLoaded()) {
      return;
    }

    this.userLookupLoading.set(true);
    this.userLookupError.set(null);

    this.userAdminData.lookupActive(undefined, 500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (users) => {
          const map = new Map<string, UserLookupItem>();
          for (const user of users) {
            if (user.id) {
              map.set(user.id, user);
            }
          }
          this.userLookupById.set(map);
          this.userLookupLoaded.set(true);
          this.userLookupLoading.set(false);
        },
        error: () => {
          this.userLookupLoading.set(false);
          this.userLookupError.set('Unable to load user directory right now.');
        }
      });
  }

  private buildInitials(name: string): string {
    const parts = name.split(' ').filter(Boolean).slice(0, 2);
    if (!parts.length) {
      return 'U';
    }
    return parts.map((part) => part[0]?.toUpperCase() ?? '').join('');
  }

  private syncSidebarForViewport() {
    if (typeof window === 'undefined') {
      return;
    }

    this.nav.applyResponsiveSidebarState(window.innerWidth <= 840);
  }
}
