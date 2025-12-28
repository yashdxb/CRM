import { Component, inject, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, computed } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommandPaletteService, CommandItem } from './command-palette.service';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
      ])
    ])
  ],
  template: `
    <div class="command-palette-backdrop" *ngIf="commandService.isOpen()" [@fadeIn] (click)="commandService.close()">
      <div class="command-palette" [@slideUp] (click)="$event.stopPropagation()">
        <div class="command-palette__header">
          <i class="pi pi-search"></i>
          <input
            #searchInput
            type="text"
            class="command-palette__input"
            placeholder="Search commands, navigate, or create..."
            [ngModel]="commandService.searchQuery()"
            (ngModelChange)="commandService.setSearchQuery($event)"
            (keydown)="onKeydown($event)"
            autofocus
          />
          <kbd class="command-palette__kbd">ESC</kbd>
        </div>
        
        <div class="command-palette__results">
          <div class="command-palette__group" *ngIf="recentCommands().length > 0 && !commandService.searchQuery()">
            <div class="command-palette__group-label">Recent</div>
            <button
              *ngFor="let cmd of recentCommands(); let i = index"
              class="command-palette__item"
              [ngClass]="{ 'command-palette__item--selected': commandService.selectedIndex() === i }"
              (click)="commandService.executeCommand(cmd)"
              (mouseenter)="onHover(i)"
            >
              <i class="pi" [ngClass]="cmd.icon || 'pi-arrow-right'"></i>
              <div class="command-palette__item-content">
                <span class="command-palette__item-label">{{ cmd.label }}</span>
                <span *ngIf="cmd.description" class="command-palette__item-desc">{{ cmd.description }}</span>
              </div>
              <kbd *ngIf="cmd.shortcut" class="command-palette__shortcut">{{ cmd.shortcut }}</kbd>
            </button>
          </div>

          <div class="command-palette__group" *ngIf="navigationCommands().length > 0">
            <div class="command-palette__group-label">{{ commandService.searchQuery() ? 'Results' : 'Navigation' }}</div>
            <button
              *ngFor="let cmd of navigationCommands(); let i = index"
              class="command-palette__item"
              [ngClass]="{ 'command-palette__item--selected': commandService.selectedIndex() === recentOffset() + i }"
              (click)="commandService.executeCommand(cmd)"
              (mouseenter)="onHover(recentOffset() + i)"
            >
              <i class="pi" [ngClass]="cmd.icon || 'pi-arrow-right'"></i>
              <div class="command-palette__item-content">
                <span class="command-palette__item-label">{{ cmd.label }}</span>
                <span *ngIf="cmd.description" class="command-palette__item-desc">{{ cmd.description }}</span>
              </div>
              <kbd *ngIf="cmd.shortcut" class="command-palette__shortcut">{{ cmd.shortcut }}</kbd>
            </button>
          </div>

          <div class="command-palette__group" *ngIf="actionCommands().length > 0 && !commandService.searchQuery()">
            <div class="command-palette__group-label">Actions</div>
            <button
              *ngFor="let cmd of actionCommands(); let i = index"
              class="command-palette__item"
              [ngClass]="{ 'command-palette__item--selected': commandService.selectedIndex() === navOffset() + i }"
              (click)="commandService.executeCommand(cmd)"
              (mouseenter)="onHover(navOffset() + i)"
            >
              <i class="pi" [ngClass]="cmd.icon || 'pi-bolt'"></i>
              <div class="command-palette__item-content">
                <span class="command-palette__item-label">{{ cmd.label }}</span>
                <span *ngIf="cmd.description" class="command-palette__item-desc">{{ cmd.description }}</span>
              </div>
              <kbd *ngIf="cmd.shortcut" class="command-palette__shortcut">{{ cmd.shortcut }}</kbd>
            </button>
          </div>

          <div class="command-palette__empty" *ngIf="commandService.filteredCommands().length === 0">
            <i class="pi pi-search"></i>
            <p>No commands found for "{{ commandService.searchQuery() }}"</p>
          </div>
        </div>

        <div class="command-palette__footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .command-palette-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
    }

    .command-palette {
      width: 100%;
      max-width: 580px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    .command-palette__header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid #e2e8f0;
    }

    .command-palette__header .pi-search {
      color: #94a3b8;
      font-size: 1.1rem;
    }

    .command-palette__input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      font-family: inherit;
      color: #0f172a;
      background: transparent;
    }

    .command-palette__input::placeholder {
      color: #94a3b8;
    }

    .command-palette__kbd {
      padding: 4px 8px;
      border-radius: 6px;
      background: #f1f5f9;
      color: #64748b;
      font-size: 0.7rem;
      font-family: inherit;
      font-weight: 600;
      border: 1px solid #e2e8f0;
    }

    .command-palette__results {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px;
    }

    .command-palette__group {
      margin-bottom: 8px;
    }

    .command-palette__group-label {
      padding: 8px 12px 6px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
    }

    .command-palette__item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 12px;
      border: none;
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-family: inherit;
      transition: background 0.1s ease;
    }

    .command-palette__item:hover,
    .command-palette__item--selected {
      background: #f1f5f9;
    }

    .command-palette__item--selected {
      background: rgba(99, 102, 241, 0.1);
    }

    .command-palette__item .pi {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #f8fafc;
      color: #64748b;
      font-size: 0.9rem;
    }

    .command-palette__item--selected .pi {
      background: rgba(99, 102, 241, 0.15);
      color: #4f46e5;
    }

    .command-palette__item-content {
      flex: 1;
      min-width: 0;
    }

    .command-palette__item-label {
      display: block;
      font-weight: 500;
      color: #0f172a;
      font-size: 0.9rem;
    }

    .command-palette__item-desc {
      display: block;
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 1px;
    }

    .command-palette__shortcut {
      padding: 3px 6px;
      border-radius: 5px;
      background: #f8fafc;
      color: #64748b;
      font-size: 0.7rem;
      font-family: inherit;
      font-weight: 600;
      border: 1px solid #e2e8f0;
      white-space: nowrap;
    }

    .command-palette__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 32px;
      color: #94a3b8;
    }

    .command-palette__empty .pi {
      font-size: 1.5rem;
    }

    .command-palette__empty p {
      margin: 0;
      font-size: 0.9rem;
    }

    .command-palette__footer {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      border-top: 1px solid #e2e8f0;
      background: #f8fafc;
    }

    .command-palette__footer span {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: #64748b;
    }

    .command-palette__footer kbd {
      padding: 2px 5px;
      border-radius: 4px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      font-size: 0.7rem;
      font-family: inherit;
    }
  `]
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  protected readonly commandService = inject(CommandPaletteService);
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // Pre-computed signals to avoid creating new arrays in the template
  protected readonly recentCommands = computed(() => {
    if (this.commandService.searchQuery()) return [];
    return this.commandService.filteredCommands().filter(c => c.category === 'recent');
  });

  protected readonly navigationCommands = computed(() => {
    const query = this.commandService.searchQuery();
    if (query) {
      return this.commandService.filteredCommands();
    }
    return this.commandService.filteredCommands().filter(c => c.category === 'navigation');
  });

  protected readonly actionCommands = computed(() => {
    if (this.commandService.searchQuery()) return [];
    return this.commandService.filteredCommands().filter(c => c.category === 'action');
  });

  protected readonly recentOffset = computed(() => this.recentCommands().length);
  protected readonly navOffset = computed(() => this.recentOffset() + this.navigationCommands().length);

  private keydownHandler = (e: KeyboardEvent) => {
    // ⌘K or Ctrl+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.commandService.toggle();
    }
  };

  ngOnInit(): void {
    document.addEventListener('keydown', this.keydownHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.commandService.selectNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.commandService.selectPrevious();
        break;
      case 'Enter':
        event.preventDefault();
        this.commandService.executeSelected();
        break;
      case 'Escape':
        this.commandService.close();
        break;
    }
  }

  onHover(index: number): void {
    // Optional: update selected index on hover
  }
}
