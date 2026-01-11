import { Component, inject, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, computed } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommandPaletteService, CommandItem } from './command-palette.service';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, ButtonModule, InputTextModule],
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
  templateUrl: "./command-palette.component.html",
  styleUrls: ["./command-palette.component.scss"]
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
