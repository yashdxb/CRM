import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { RoleSummary } from '../models/user-admin.model';
import { DashboardDataService } from '../../dashboard/services/dashboard-data.service';
import { DASHBOARD_CARD_CATALOG, DASHBOARD_CHART_CATALOG } from '../../dashboard/dashboard-catalog';

type PackMode = 'role-level' | 'custom';

interface DashboardItemOption {
  id: string;
  label: string;
  icon: string;
  type: 'kpi' | 'chart';
}

interface PackTemplateOption {
  id: string;
  name: string;
  description?: string | null;
  isDefault: boolean;
  cardOrder: string[];
  hiddenCards?: string[];
}

const LEVEL_TEMPLATE_PREFIX = 'role-level-default:';

@Component({
  selector: 'app-dashboard-packs-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ButtonModule,
    SelectModule,
    CheckboxModule,
    InputTextModule,
    BreadcrumbsComponent
  ],
  templateUrl: './dashboard-packs.page.html',
  styleUrl: './dashboard-packs.page.scss'
})
export class DashboardPacksPage {
  private readonly rolesService = inject(UserAdminDataService);
  private readonly dashboardData = inject(DashboardDataService);
  private readonly toastService = inject(AppToastService);

  protected readonly canManageDefaults = computed(() => {
    const payload = readTokenContext()?.payload ?? null;
    return tokenHasPermission(payload, PERMISSION_KEYS.administrationManage);
  });

  protected readonly mode = signal<PackMode>('role-level');
  protected readonly loadingRoles = signal(true);
  protected readonly loadingPack = signal(false);
  protected readonly savingPack = signal(false);
  protected readonly loadingTemplates = signal(false);

  protected readonly roles = signal<RoleSummary[]>([]);
  private readonly templates = signal<PackTemplateOption[]>([]);

  protected readonly selectedLevel = signal<number | null>(null);
  protected readonly levelPackName = signal('');

  protected readonly selectedCustomPackId = signal<string | null>(null);
  protected readonly customPackName = signal('');

  protected readonly selectedItems = signal<Set<string>>(new Set());
  protected readonly itemOrder = signal<string[]>([]);

  protected readonly cardCatalog = DASHBOARD_CARD_CATALOG;
  protected readonly chartCatalog = DASHBOARD_CHART_CATALOG;
  protected readonly allItems: DashboardItemOption[] = [
    ...DASHBOARD_CARD_CATALOG.map(item => ({ ...item, type: 'kpi' as const })),
    ...DASHBOARD_CHART_CATALOG.map(item => ({ ...item, type: 'chart' as const }))
  ];

  private readonly cardIdSet = new Set(this.cardCatalog.map(item => item.id));

  protected readonly availableLevels = computed(() => {
    const levels = this.roles()
      .map(role => role.hierarchyLevel ?? null)
      .filter((level): level is number => typeof level === 'number' && level > 0);
    const unique = Array.from(new Set(levels)).sort((a, b) => a - b);
    return unique.map(level => ({ label: `H${level}`, value: level }));
  });

  protected readonly customPackOptions = computed(() =>
    this.templates()
      .filter(template => !this.isRoleLevelTemplate(template))
      .map(template => ({
        label: template.isDefault ? `${template.name} (Default)` : template.name,
        value: template.id
      }))
  );

  protected readonly activePackName = computed(() =>
    this.mode() === 'role-level' ? this.levelPackName() : this.customPackName()
  );

  protected readonly levelLabel = computed(() =>
    this.mode() === 'role-level'
      ? (this.selectedLevel() ? `H${this.selectedLevel()}` : 'No level selected')
      : (this.selectedCustomPackId() ? 'Custom Pack' : 'New Custom Pack')
  );

  protected readonly selectedKpiCount = computed(() =>
    this.cardCatalog.filter(card => this.selectedItems().has(card.id)).length
  );

  protected readonly selectedChartCount = computed(() =>
    this.chartCatalog.filter(chart => this.selectedItems().has(chart.id)).length
  );

  protected readonly tableRows = computed(() => {
    const selected = this.selectedItems();
    const order = this.buildOrder();
    const catalogIndexById = new Map(this.allItems.map((item, index) => [item.id, index]));

    const rows = this.allItems.map(item => {
      const orderIndex = order.indexOf(item.id);
      return {
        ...item,
        checked: selected.has(item.id),
        order: orderIndex >= 0 ? orderIndex + 1 : null,
        canMoveUp: orderIndex > 0,
        canMoveDown: orderIndex >= 0 && orderIndex < order.length - 1,
        orderIndex
      };
    });

    // Always render table by active display order.
    // Included rows are shown first in 1..N order, followed by excluded rows in stable catalog order.
    return rows.sort((a, b) => {
      const aIncluded = a.orderIndex >= 0;
      const bIncluded = b.orderIndex >= 0;

      if (aIncluded && bIncluded) {
        return a.orderIndex - b.orderIndex;
      }
      if (aIncluded) return -1;
      if (bIncluded) return 1;

      const aCatalog = catalogIndexById.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const bCatalog = catalogIndexById.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      return aCatalog - bCatalog;
    });
  });

  constructor() {
    this.loadRoles();
    this.loadTemplates();
  }

  protected setMode(mode: PackMode) {
    this.mode.set(mode);
    if (mode === 'role-level') {
      const level = this.selectedLevel() ?? this.availableLevels()[0]?.value ?? null;
      this.onLevelChange(level);
      return;
    }

    const selectedId = this.selectedCustomPackId() ?? this.customPackOptions()[0]?.value ?? null;
    this.onCustomPackChange(selectedId);
  }

  protected onLevelChange(level: number | null) {
    this.selectedLevel.set(level);
    if (!level) {
      this.levelPackName.set('');
      this.clearSelection();
      return;
    }

    this.levelPackName.set(this.resolveRoleLevelPackName(level));
    this.loadDefaultLayout(level);
  }

  protected onCustomPackChange(templateId: string | null) {
    this.selectedCustomPackId.set(templateId);

    if (!templateId) {
      this.customPackName.set('');
      this.clearSelection();
      return;
    }

    const selectedTemplate = this.templates().find(item => item.id === templateId);
    if (!selectedTemplate) {
      this.customPackName.set('');
      this.clearSelection();
      return;
    }

    this.customPackName.set(selectedTemplate.name);
    this.applyPackState(selectedTemplate.cardOrder ?? [], selectedTemplate.hiddenCards ?? []);
  }

  protected createNewCustomPack() {
    this.selectedCustomPackId.set(null);
    this.customPackName.set('');
    this.clearSelection();
  }

  protected toggleItem(itemId: string, checked: boolean) {
    const next = new Set(this.selectedItems());
    let order = this.buildOrder();

    if (checked) {
      next.add(itemId);
      if (!order.includes(itemId)) {
        order = [...order, itemId];
      }
    } else {
      next.delete(itemId);
      order = order.filter(id => id !== itemId);
    }

    this.selectedItems.set(next);
    this.itemOrder.set(order);
  }

  protected moveItem(itemId: string, direction: -1 | 1) {
    const order = this.buildOrder();
    const currentIndex = order.indexOf(itemId);
    if (currentIndex < 0) {
      return;
    }

    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= order.length) {
      return;
    }

    const next = [...order];
    const swap = next[currentIndex];
    next[currentIndex] = next[targetIndex];
    next[targetIndex] = swap;
    this.itemOrder.set(next);
  }

  protected savePack() {
    if (!this.canManageDefaults()) {
      this.toastService.show('error', 'You do not have permission to update dashboard packs.', 3000);
      return;
    }

    const order = this.buildOrder();
    if (order.length === 0) {
      this.toastService.show('error', 'Select at least one KPI card or chart widget.', 3000);
      return;
    }

    const selected = this.selectedItems();
    const hiddenCards = this.allItems
      .map(item => item.id)
      .filter(id => !selected.has(id));
    const cardOrder = this.buildCardOrder(order, selected);

    if (this.mode() === 'role-level') {
      this.saveRoleLevelPack(cardOrder, hiddenCards);
      return;
    }

    this.saveCustomPack(cardOrder, hiddenCards);
  }

  private saveRoleLevelPack(cardOrder: string[], hiddenCards: string[]) {
    const level = this.selectedLevel();
    if (!level) {
      this.toastService.show('error', 'Select a hierarchy level.', 3000);
      return;
    }

    const packName = this.levelPackName().trim() || `H${level} Pack`;
    this.levelPackName.set(packName);
    this.savingPack.set(true);

    this.dashboardData.saveDefaultLayout({
      roleLevel: level,
      cardOrder,
      sizes: {},
      dimensions: {},
      hiddenCards
    }).subscribe({
      next: () => {
        this.persistRoleLevelPackName(level, packName, cardOrder, hiddenCards);
        this.savingPack.set(false);
        this.toastService.show('success', `Default H${level} pack saved as "${packName}".`, 3000);
      },
      error: (error) => {
        this.savingPack.set(false);
        const message = typeof error?.error === 'string' && error.error.trim().length > 0
          ? error.error
          : 'Unable to save role-level default pack.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  private saveCustomPack(cardOrder: string[], hiddenCards: string[]) {
    const name = this.customPackName().trim();
    if (!name) {
      this.toastService.show('error', 'Enter a custom pack name.', 3000);
      return;
    }

    this.savingPack.set(true);
    const payload = {
      name,
      description: 'custom-pack',
      cardOrder,
      sizes: {},
      dimensions: {},
      hiddenCards,
      isDefault: null as boolean | null
    };

    const existingId = this.selectedCustomPackId();
    const request = existingId
      ? this.dashboardData.updateTemplate(existingId, payload)
      : this.dashboardData.createTemplate(payload);

    request.subscribe({
      next: (template) => {
        this.savingPack.set(false);
        this.customPackName.set(template.name);
        this.selectedCustomPackId.set(template.id);
        this.refreshTemplates(template.id);
        this.toastService.show('success', `Custom pack "${template.name}" saved.`, 3000);
      },
      error: (error) => {
        this.savingPack.set(false);
        const message = typeof error?.error === 'string' && error.error.trim().length > 0
          ? error.error
          : 'Unable to save custom pack.';
        this.toastService.show('error', message, 3500);
      }
    });
  }

  private loadRoles() {
    this.loadingRoles.set(true);
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles ?? []);
        this.loadingRoles.set(false);

        if (this.mode() === 'role-level') {
          const level = this.selectedLevel() ?? this.availableLevels()[0]?.value ?? null;
          this.onLevelChange(level);
        }
      },
      error: () => {
        this.loadingRoles.set(false);
        this.roles.set([]);
      }
    });
  }

  private loadTemplates() {
    this.loadingTemplates.set(true);
    this.dashboardData.getTemplates().subscribe({
      next: (templates) => {
        this.templates.set((templates ?? []).map(template => ({
          id: template.id,
          name: template.name,
          description: template.description ?? null,
          isDefault: template.isDefault,
          cardOrder: template.cardOrder ?? [],
          hiddenCards: template.hiddenCards ?? []
        })));
        this.loadingTemplates.set(false);

        if (this.mode() === 'role-level') {
          const level = this.selectedLevel();
          if (level) {
            this.levelPackName.set(this.resolveRoleLevelPackName(level));
          }
        } else {
          const selected = this.selectedCustomPackId() ?? this.customPackOptions()[0]?.value ?? null;
          this.onCustomPackChange(selected);
        }
      },
      error: () => {
        this.templates.set([]);
        this.loadingTemplates.set(false);
      }
    });
  }

  private refreshTemplates(selectId?: string | null) {
    this.dashboardData.getTemplates().subscribe({
      next: (templates) => {
        this.templates.set((templates ?? []).map(template => ({
          id: template.id,
          name: template.name,
          description: template.description ?? null,
          isDefault: template.isDefault,
          cardOrder: template.cardOrder ?? [],
          hiddenCards: template.hiddenCards ?? []
        })));

        if (this.mode() === 'custom') {
          const target = selectId ?? this.selectedCustomPackId();
          this.onCustomPackChange(target ?? null);
        }

        if (this.mode() === 'role-level') {
          const level = this.selectedLevel();
          if (level) {
            this.levelPackName.set(this.resolveRoleLevelPackName(level));
          }
        }
      }
    });
  }

  private resolveRoleLevelPackName(level: number): string {
    const marker = `${LEVEL_TEMPLATE_PREFIX}${level}`;
    const matched = this.templates().find(template => (template.description ?? '').toLowerCase() === marker);
    return matched?.name?.trim() || `H${level} Pack`;
  }

  private isRoleLevelTemplate(template: Pick<PackTemplateOption, 'description'>): boolean {
    return (template.description ?? '').toLowerCase().startsWith(LEVEL_TEMPLATE_PREFIX);
  }

  private persistRoleLevelPackName(level: number, name: string, cardOrder: string[], hiddenCards: string[]) {
    const marker = `${LEVEL_TEMPLATE_PREFIX}${level}`;
    const existing = this.templates().find(template => (template.description ?? '').toLowerCase() === marker);

    const payload = {
      name,
      description: marker,
      cardOrder,
      sizes: {},
      dimensions: {},
      hiddenCards,
      isDefault: null as boolean | null
    };

    const request = existing
      ? this.dashboardData.updateTemplate(existing.id, payload)
      : this.dashboardData.createTemplate(payload);

    request.subscribe({
      next: () => {
        this.refreshTemplates();
      },
      error: () => {
        this.toastService.show('error', 'Role-level pack saved, but name metadata could not be updated.', 3500);
      }
    });
  }

  private loadDefaultLayout(level: number) {
    this.loadingPack.set(true);
    this.dashboardData.getDefaultLayoutForLevel(level).subscribe({
      next: (response) => {
        this.applyPackState(response.cardOrder ?? [], response.hiddenCards ?? []);
        this.loadingPack.set(false);
      },
      error: () => {
        this.clearSelection();
        this.loadingPack.set(false);
      }
    });
  }

  private applyPackState(cardOrder: string[], hiddenCards: string[]) {
    const hidden = new Set(hiddenCards ?? []);
    const selectedIds = this.allItems
      .map(item => item.id)
      .filter(id => !hidden.has(id));
    const selected = new Set(selectedIds);

    const ordered = [
      ...cardOrder.filter(id => selected.has(id)),
      ...selectedIds.filter(id => !cardOrder.includes(id))
    ];

    this.selectedItems.set(selected);
    this.itemOrder.set(ordered);
  }

  private buildCardOrder(order: string[], selected: Set<string>): string[] {
    const orderedCards = order.filter(id => selected.has(id) && this.cardIdSet.has(id));
    const missingCards = this.cardCatalog
      .map(card => card.id)
      .filter(id => selected.has(id) && !orderedCards.includes(id));
    return [...orderedCards, ...missingCards];
  }

  private buildOrder(): string[] {
    const selected = this.selectedItems();
    const current = this.itemOrder();
    if (current.length === 0) {
      return this.allItems.map(item => item.id).filter(id => selected.has(id));
    }

    const inOrder = current.filter(id => selected.has(id));
    const missing = this.allItems
      .map(item => item.id)
      .filter(id => selected.has(id) && !inOrder.includes(id));

    return [...inOrder, ...missing];
  }

  private clearSelection() {
    this.selectedItems.set(new Set());
    this.itemOrder.set([]);
  }
}
