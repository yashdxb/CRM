import { Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { DashboardDataService } from '../../dashboard/services/dashboard-data.service';
import { DASHBOARD_CARD_CATALOG, DASHBOARD_CHART_CATALOG } from '../../dashboard/dashboard-catalog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/cdk/drag-drop";
import * as i3 from "primeng/button";
import * as i4 from "primeng/select";
import * as i5 from "primeng/checkbox";
import * as i6 from "primeng/inputtext";
function DashboardPacksPage_div_45_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25)(1, "p-select", 26);
    i0.ɵɵlistener("ngModelChange", function DashboardPacksPage_div_45_Template_p_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onLevelChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "input", 27);
    i0.ɵɵlistener("ngModelChange", function DashboardPacksPage_div_45_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.levelPackName.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 28);
    i0.ɵɵlistener("click", function DashboardPacksPage_div_45_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.savePack()); });
    i0.ɵɵtext(4, " Save Role-Level Pack ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.availableLevels())("ngModel", ctx_r2.selectedLevel())("disabled", ctx_r2.loadingRoles());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.levelPackName())("disabled", !ctx_r2.selectedLevel());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.savingPack() || !ctx_r2.selectedLevel());
} }
function DashboardPacksPage_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25)(1, "p-select", 29);
    i0.ɵɵlistener("ngModelChange", function DashboardPacksPage_ng_template_46_Template_p_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCustomPackChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "input", 30);
    i0.ɵɵlistener("ngModelChange", function DashboardPacksPage_ng_template_46_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.customPackName.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 31);
    i0.ɵɵlistener("click", function DashboardPacksPage_ng_template_46_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.createNewCustomPack()); });
    i0.ɵɵtext(4, " New ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 28);
    i0.ɵɵlistener("click", function DashboardPacksPage_ng_template_46_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.savePack()); });
    i0.ɵɵtext(6, " Save Custom Pack ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r2.customPackOptions())("ngModel", ctx_r2.selectedCustomPackId())("disabled", ctx_r2.loadingTemplates());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.customPackName());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r2.savingPack());
} }
function DashboardPacksPage_div_48_tr_23_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r7.order);
} }
function DashboardPacksPage_div_48_tr_23_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function DashboardPacksPage_div_48_tr_23_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 45)(1, "td", 36)(2, "button", 46);
    i0.ɵɵelement(3, "i", 47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 37)(5, "p-checkbox", 48);
    i0.ɵɵlistener("ngModelChange", function DashboardPacksPage_div_48_tr_23_Template_p_checkbox_ngModelChange_5_listener($event) { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleItem(row_r7.id, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 38);
    i0.ɵɵtemplate(7, DashboardPacksPage_div_48_tr_23_span_7_Template, 2, 1, "span", 49)(8, DashboardPacksPage_div_48_tr_23_ng_template_8_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 39)(11, "span", 50);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "div", 51)(15, "div", 52);
    i0.ɵɵelement(16, "i", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 54);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "td", 40);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 41)(22, "span", 55);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "td", 42)(25, "button", 56);
    i0.ɵɵlistener("click", function DashboardPacksPage_div_48_tr_23_Template_button_click_25_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.moveItem(row_r7.id, -1)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 57);
    i0.ɵɵlistener("click", function DashboardPacksPage_div_48_tr_23_Template_button_click_26_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.moveItem(row_r7.id, 1)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const noOrder_r8 = i0.ɵɵreference(9);
    i0.ɵɵclassProp("row-disabled", !row_r7.checked);
    i0.ɵɵproperty("cdkDragDisabled", !row_r7.checked);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !row_r7.checked);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("binary", true)("ngModel", row_r7.checked);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r7.order)("ngIfElse", noOrder_r8);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("type-pill--chart", row_r7.type === "chart");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r7.type === "kpi" ? "KPI" : "Chart", " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap(row_r7.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r7.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r7.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r7.suggestedUsage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !row_r7.checked || !row_r7.canMoveUp);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !row_r7.checked || !row_r7.canMoveDown);
} }
function DashboardPacksPage_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 32)(1, "div", 33);
    i0.ɵɵtext(2, "Cards and widgets table (display order)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 34)(4, "table", 35)(5, "thead")(6, "tr");
    i0.ɵɵelement(7, "th", 36);
    i0.ɵɵelementStart(8, "th", 37);
    i0.ɵɵtext(9, "Include");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 38);
    i0.ɵɵtext(11, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 39);
    i0.ɵɵtext(13, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 40);
    i0.ɵɵtext(17, "Id");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 41);
    i0.ɵɵtext(19, "Suggested Usage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 42);
    i0.ɵɵtext(21, "Move");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody", 43);
    i0.ɵɵlistener("cdkDropListDropped", function DashboardPacksPage_div_48_Template_tbody_cdkDropListDropped_22_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onRowDrop($event)); });
    i0.ɵɵtemplate(23, DashboardPacksPage_div_48_tr_23_Template, 27, 18, "tr", 44);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("ngForOf", ctx_r2.tableRows());
} }
function DashboardPacksPage_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1, "Loading pack...");
    i0.ɵɵelementEnd();
} }
const LEVEL_TEMPLATE_PREFIX = 'role-level-default:';
export class DashboardPacksPage {
    route = inject(ActivatedRoute);
    rolesService = inject(UserAdminDataService);
    dashboardData = inject(DashboardDataService);
    toastService = inject(AppToastService);
    requestedMode = this.route.snapshot.queryParamMap.get('mode') === 'custom' ? 'custom' : 'role-level';
    requestedLevel = (() => {
        const raw = Number(this.route.snapshot.queryParamMap.get('level'));
        return Number.isFinite(raw) && raw > 0 ? raw : null;
    })();
    canManageDefaults = computed(() => {
        const payload = readTokenContext()?.payload ?? null;
        return tokenHasPermission(payload, PERMISSION_KEYS.administrationManage);
    }, ...(ngDevMode ? [{ debugName: "canManageDefaults" }] : []));
    mode = signal('role-level', ...(ngDevMode ? [{ debugName: "mode" }] : []));
    loadingRoles = signal(true, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    loadingPack = signal(false, ...(ngDevMode ? [{ debugName: "loadingPack" }] : []));
    savingPack = signal(false, ...(ngDevMode ? [{ debugName: "savingPack" }] : []));
    loadingTemplates = signal(false, ...(ngDevMode ? [{ debugName: "loadingTemplates" }] : []));
    securityLevels = signal([], ...(ngDevMode ? [{ debugName: "securityLevels" }] : []));
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    templates = signal([], ...(ngDevMode ? [{ debugName: "templates" }] : []));
    selectedLevel = signal(null, ...(ngDevMode ? [{ debugName: "selectedLevel" }] : []));
    levelPackName = signal('', ...(ngDevMode ? [{ debugName: "levelPackName" }] : []));
    selectedCustomPackId = signal(null, ...(ngDevMode ? [{ debugName: "selectedCustomPackId" }] : []));
    customPackName = signal('', ...(ngDevMode ? [{ debugName: "customPackName" }] : []));
    selectedItems = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedItems" }] : []));
    itemOrder = signal([], ...(ngDevMode ? [{ debugName: "itemOrder" }] : []));
    cardCatalog = DASHBOARD_CARD_CATALOG;
    chartCatalog = DASHBOARD_CHART_CATALOG;
    allItems = [
        ...DASHBOARD_CARD_CATALOG.map(item => ({ ...item, type: 'kpi' })),
        ...DASHBOARD_CHART_CATALOG.map(item => ({ ...item, type: 'chart' }))
    ];
    cardIdSet = new Set(this.cardCatalog.map(item => item.id));
    availableLevels = computed(() => {
        const levels = this.roles()
            .map(role => role.hierarchyLevel ?? null)
            .filter((level) => typeof level === 'number' && level > 0);
        const unique = Array.from(new Set(levels)).sort((a, b) => a - b);
        return unique.map(level => ({ label: `H${level}`, value: level }));
    }, ...(ngDevMode ? [{ debugName: "availableLevels" }] : []));
    customPackOptions = computed(() => this.templates()
        .filter(template => !this.isRoleLevelTemplate(template))
        .map(template => ({
        label: template.isDefault ? `${template.name} (Default)` : template.name,
        value: template.id
    })), ...(ngDevMode ? [{ debugName: "customPackOptions" }] : []));
    activePackName = computed(() => this.mode() === 'role-level' ? this.levelPackName() : this.customPackName(), ...(ngDevMode ? [{ debugName: "activePackName" }] : []));
    levelLabel = computed(() => this.mode() === 'role-level'
        ? (this.selectedLevel() ? `H${this.selectedLevel()}` : 'No level selected')
        : (this.selectedCustomPackId() ? 'Custom Pack' : 'New Custom Pack'), ...(ngDevMode ? [{ debugName: "levelLabel" }] : []));
    selectedKpiCount = computed(() => this.cardCatalog.filter(card => this.selectedItems().has(card.id)).length, ...(ngDevMode ? [{ debugName: "selectedKpiCount" }] : []));
    selectedChartCount = computed(() => this.chartCatalog.filter(chart => this.selectedItems().has(chart.id)).length, ...(ngDevMode ? [{ debugName: "selectedChartCount" }] : []));
    roleProfiles = computed(() => {
        const rankById = new Map(this.securityLevels().map(level => [level.id, level.rank]));
        return this.roles().map(role => ({
            name: role.name,
            hierarchyLevel: role.hierarchyLevel ?? null,
            securityLevelName: role.securityLevelName ?? null,
            securityRank: role.securityLevelId ? (rankById.get(role.securityLevelId) ?? 0) : 0,
            permissions: new Set([
                ...(role.permissions ?? []),
                ...(role.inheritedPermissions ?? []),
                ...(role.basePermissions ?? [])
            ])
        }));
    }, ...(ngDevMode ? [{ debugName: "roleProfiles" }] : []));
    tableRows = computed(() => {
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
                orderIndex,
                suggestedUsage: this.resolveSuggestedUsage(item)
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
            if (aIncluded)
                return -1;
            if (bIncluded)
                return 1;
            const aCatalog = catalogIndexById.get(a.id) ?? Number.MAX_SAFE_INTEGER;
            const bCatalog = catalogIndexById.get(b.id) ?? Number.MAX_SAFE_INTEGER;
            return aCatalog - bCatalog;
        });
    }, ...(ngDevMode ? [{ debugName: "tableRows" }] : []));
    constructor() {
        this.mode.set(this.requestedMode);
        this.loadRoles();
        this.loadSecurityLevels();
        this.loadTemplates();
    }
    setMode(mode) {
        this.mode.set(mode);
        if (mode === 'role-level') {
            const level = this.selectedLevel() ?? this.availableLevels()[0]?.value ?? null;
            this.onLevelChange(level);
            return;
        }
        const selectedId = this.selectedCustomPackId() ?? this.customPackOptions()[0]?.value ?? null;
        this.onCustomPackChange(selectedId);
    }
    onLevelChange(level) {
        this.selectedLevel.set(level);
        if (!level) {
            this.levelPackName.set('');
            this.clearSelection();
            return;
        }
        this.levelPackName.set(this.resolveRoleLevelPackName(level));
        this.loadDefaultLayout(level);
    }
    onCustomPackChange(templateId) {
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
    createNewCustomPack() {
        this.selectedCustomPackId.set(null);
        this.customPackName.set('');
        this.clearSelection();
    }
    toggleItem(itemId, checked) {
        const next = new Set(this.selectedItems());
        let order = this.buildOrder();
        if (checked) {
            next.add(itemId);
            if (!order.includes(itemId)) {
                order = [...order, itemId];
            }
        }
        else {
            next.delete(itemId);
            order = order.filter(id => id !== itemId);
        }
        this.selectedItems.set(next);
        this.itemOrder.set(order);
    }
    moveItem(itemId, direction) {
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
    onRowDrop(event) {
        const rows = this.tableRows();
        const checkedRows = rows.filter(r => r.checked);
        // Only allow reordering within checked rows
        if (event.previousIndex >= checkedRows.length || event.currentIndex >= checkedRows.length) {
            return;
        }
        const order = [...this.buildOrder()];
        moveItemInArray(order, event.previousIndex, event.currentIndex);
        this.itemOrder.set(order);
    }
    savePack() {
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
    saveRoleLevelPack(cardOrder, hiddenCards) {
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
            packName,
            cardOrder,
            sizes: {},
            dimensions: {},
            hiddenCards
        }).subscribe({
            next: () => {
                this.refreshTemplates();
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
    saveCustomPack(cardOrder, hiddenCards) {
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
            isDefault: null
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
    loadRoles() {
        this.loadingRoles.set(true);
        this.rolesService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles ?? []);
                this.loadingRoles.set(false);
                if (this.mode() === 'role-level') {
                    const preferredLevel = this.requestedLevel && this.availableLevels().some((option) => option.value === this.requestedLevel)
                        ? this.requestedLevel
                        : null;
                    const level = this.selectedLevel() ?? preferredLevel ?? this.availableLevels()[0]?.value ?? null;
                    this.onLevelChange(level);
                }
            },
            error: () => {
                this.loadingRoles.set(false);
                this.roles.set([]);
            }
        });
    }
    loadTemplates() {
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
                }
                else {
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
    loadSecurityLevels() {
        this.rolesService.getSecurityLevels().subscribe({
            next: (levels) => this.securityLevels.set(levels ?? []),
            error: () => this.securityLevels.set([])
        });
    }
    refreshTemplates(selectId) {
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
    resolveRoleLevelPackName(level) {
        const marker = `${LEVEL_TEMPLATE_PREFIX}${level}`;
        const matched = this.templates().find(template => (template.description ?? '').toLowerCase() === marker);
        return matched?.name?.trim() || `H${level} Pack`;
    }
    isRoleLevelTemplate(template) {
        return (template.description ?? '').toLowerCase().startsWith(LEVEL_TEMPLATE_PREFIX);
    }
    loadDefaultLayout(level) {
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
    applyPackState(cardOrder, hiddenCards) {
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
    buildCardOrder(order, selected) {
        const orderedCards = order.filter(id => selected.has(id) && this.cardIdSet.has(id));
        const missingCards = this.cardCatalog
            .map(card => card.id)
            .filter(id => selected.has(id) && !orderedCards.includes(id));
        return [...orderedCards, ...missingCards];
    }
    buildOrder() {
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
    clearSelection() {
        this.selectedItems.set(new Set());
        this.itemOrder.set([]);
    }
    resolveSuggestedUsage(item) {
        const rule = this.buildSuggestionRule(item);
        const matches = this.roleProfiles()
            .filter((role) => this.roleMatchesRule(role, rule))
            .sort((a, b) => this.roleScore(b, rule) - this.roleScore(a, rule));
        if (matches.length === 0) {
            return `${rule.usageLabel}. Review role permissions for this KPI.`;
        }
        const topRoles = matches.slice(0, 2).map((role) => this.formatRoleLabel(role)).join(', ');
        return `${rule.usageLabel}. Suggested role(s): ${topRoles}.`;
    }
    buildSuggestionRule(item) {
        const text = `${item.id} ${item.label}`.toLowerCase();
        const requiredAll = [PERMISSION_KEYS.dashboardView];
        const requiredAny = [];
        if (this.hasAnyToken(text, ['pipeline', 'forecast', 'revenue', 'risk', 'deal', 'scenario'])) {
            requiredAny.push(PERMISSION_KEYS.opportunitiesView);
        }
        if (this.hasAnyToken(text, ['lead', 'truth', 'conversion'])) {
            requiredAny.push(PERMISSION_KEYS.leadsView);
        }
        if (this.hasAnyToken(text, ['account', 'customer', 'growth', 'expansion'])) {
            requiredAny.push(PERMISSION_KEYS.customersView);
        }
        if (this.hasAnyToken(text, ['task', 'activity', 'timeline', 'execution'])) {
            requiredAny.push(PERMISSION_KEYS.activitiesView);
        }
        const isOversight = this.hasAnyToken(text, ['risk', 'manager', 'health', 'top performers', 'revenue', 'growth']);
        const usageLabel = item.type === 'chart'
            ? `${item.label} analytics`
            : `${item.label} operations`;
        return {
            usageLabel,
            requiredAll,
            requiredAny: requiredAny.length ? Array.from(new Set(requiredAny)) : undefined,
            preferredMinLevel: this.hasAnyToken(text, ['my ', 'task', 'execution', 'timeline']) ? 2 : undefined,
            preferredMaxLevel: isOversight ? 2 : undefined,
            minSecurityRank: isOversight ? this.resolveManagerSecurityRank() : undefined
        };
    }
    hasAnyToken(value, tokens) {
        return tokens.some(token => value.includes(token));
    }
    resolveManagerSecurityRank() {
        const ranks = this.securityLevels()
            .map(level => level.rank)
            .filter(rank => Number.isFinite(rank))
            .sort((a, b) => a - b);
        if (ranks.length === 0) {
            return 0;
        }
        const index = Math.max(0, Math.floor((ranks.length - 1) * 0.5));
        return ranks[index];
    }
    roleMatchesRule(role, rule) {
        if (rule.requiredAll && rule.requiredAll.some(permission => !role.permissions.has(permission))) {
            return false;
        }
        if (rule.requiredAny && !rule.requiredAny.some(permission => role.permissions.has(permission))) {
            return false;
        }
        if (typeof rule.minSecurityRank === 'number' && role.securityRank > 0 && role.securityRank < rule.minSecurityRank) {
            return false;
        }
        return true;
    }
    roleScore(role, rule) {
        let score = 0;
        const selectedLevel = this.selectedLevel();
        if (selectedLevel && role.hierarchyLevel === selectedLevel) {
            score += 4;
        }
        if (typeof role.hierarchyLevel === 'number') {
            const minLevel = rule.preferredMinLevel ?? role.hierarchyLevel;
            const maxLevel = rule.preferredMaxLevel ?? role.hierarchyLevel;
            if (role.hierarchyLevel >= minLevel && role.hierarchyLevel <= maxLevel) {
                score += 3;
            }
        }
        if (typeof rule.minSecurityRank === 'number') {
            score += role.securityRank >= rule.minSecurityRank ? 2 : 0;
        }
        else {
            score += role.securityRank > 0 ? 1 : 0;
        }
        return score;
    }
    formatRoleLabel(role) {
        const level = role.hierarchyLevel ? `H${role.hierarchyLevel}` : 'H?';
        if (role.securityLevelName) {
            return `${role.name} (${level}, ${role.securityLevelName})`;
        }
        return `${role.name} (${level})`;
    }
    static ɵfac = function DashboardPacksPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPacksPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPacksPage, selectors: [["app-dashboard-packs-page"]], decls: 51, vars: 11, consts: [["customPackMeta", ""], ["loadingState", ""], ["noOrder", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-hero"], [1, "hero-content"], [1, "hero-eyebrow"], [1, "pi", "pi-th-large"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "summary-strip"], [1, "summary-pill"], [1, "pill-label"], [1, "glass-card", "pack-card"], [1, "pack-header"], [1, "pack-title"], [1, "pack-actions"], ["pButton", "", "type", "button", 1, "mode-btn", 3, "click"], ["class", "pack-meta-row", 4, "ngIf", "ngIfElse"], ["class", "pack-body", 4, "ngIf", "ngIfElse"], [1, "pack-meta-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select H1/H2/H3", "styleClass", "level-select", 3, "ngModelChange", "options", "ngModel", "disabled"], ["type", "text", "pInputText", "", "placeholder", "Role-level pack name", 1, "pack-name-input", 3, "ngModelChange", "ngModel", "disabled"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click", "disabled"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select custom pack", "styleClass", "level-select", 3, "ngModelChange", "options", "ngModel", "disabled"], ["type", "text", "pInputText", "", "placeholder", "Custom pack name", 1, "pack-name-input", 3, "ngModelChange", "ngModel"], ["pButton", "", "type", "button", 1, "btn-outline", 3, "click"], [1, "pack-body"], [1, "pack-subtitle"], [1, "kpi-table-wrap"], ["aria-label", "Dashboard cards and widgets order table", 1, "kpi-table"], [1, "col-drag"], [1, "col-toggle"], [1, "col-order"], [1, "col-type"], [1, "col-id"], [1, "col-suggested"], [1, "col-move"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["cdkDrag", "", 3, "row-disabled", "cdkDragDisabled", 4, "ngFor", "ngForOf"], ["cdkDrag", "", 3, "cdkDragDisabled"], ["type", "button", "cdkDragHandle", "", "aria-label", "Drag to reorder", 1, "drag-handle", 3, "disabled"], [1, "pi", "pi-bars"], [3, "ngModelChange", "binary", "ngModel"], ["class", "order-badge", 4, "ngIf", "ngIfElse"], [1, "type-pill"], [1, "row-meta"], [1, "card-icon"], [1, "pi"], [1, "card-title"], [1, "suggested-usage"], ["pButton", "", "type", "button", "icon", "pi pi-angle-up", "title", "Move up", 1, "action-btn", "p-button-text", "p-button-rounded", "p-button-sm", "p-button-secondary", 3, "click", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-angle-down", "title", "Move down", 1, "action-btn", "p-button-text", "p-button-rounded", "p-button-sm", "p-button-secondary", 3, "click", "disabled"], [1, "order-badge"], [1, "order-empty"], [1, "loading-state"]], template: function DashboardPacksPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 3);
            i0.ɵɵelement(1, "div", 4)(2, "div", 5)(3, "div", 6)(4, "app-breadcrumbs");
            i0.ɵɵelementStart(5, "header", 7)(6, "div", 8)(7, "span", 9);
            i0.ɵɵelement(8, "i", 10);
            i0.ɵɵtext(9, " Dashboard packs ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "h1", 11)(11, "span", 12);
            i0.ɵɵtext(12, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span", 13);
            i0.ɵɵtext(14, "+ Custom Dashboard Packs");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "p", 14);
            i0.ɵɵtext(16, " Manage role-level defaults and custom packs with one liquid-glass table for KPI cards and chart widgets. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 15)(18, "div", 16)(19, "span", 17);
            i0.ɵɵtext(20, "Mode");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "strong");
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 16)(24, "span", 17);
            i0.ɵɵtext(25, "KPI Cards");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "strong");
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 16)(29, "span", 17);
            i0.ɵɵtext(30, "Chart Widgets");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "strong");
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "div", 18)(34, "div", 19)(35, "div", 20)(36, "h2");
            i0.ɵɵtext(37, "Dashboard pack designer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p");
            i0.ɵɵtext(39, "Define pack name, include/exclude cards, and control display order.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 21)(41, "button", 22);
            i0.ɵɵlistener("click", function DashboardPacksPage_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.setMode("role-level")); });
            i0.ɵɵtext(42, " Role Level ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "button", 22);
            i0.ɵɵlistener("click", function DashboardPacksPage_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.setMode("custom")); });
            i0.ɵɵtext(44, " Custom Pack ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(45, DashboardPacksPage_div_45_Template, 5, 6, "div", 23)(46, DashboardPacksPage_ng_template_46_Template, 7, 5, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(48, DashboardPacksPage_div_48_Template, 24, 1, "div", 24)(49, DashboardPacksPage_ng_template_49_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const customPackMeta_r9 = i0.ɵɵreference(47);
            const loadingState_r10 = i0.ɵɵreference(50);
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.mode() === "role-level" ? "Role Level" : "Custom Pack");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectedKpiCount());
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectedChartCount());
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("is-active", ctx.mode() === "role-level");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("is-active", ctx.mode() === "custom");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.mode() === "role-level")("ngIfElse", customPackMeta_r9);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.loadingPack())("ngIfElse", loadingState_r10);
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, DragDropModule, i2.CdkDropList, i2.CdkDrag, i2.CdkDragHandle, ButtonModule, i3.ButtonDirective, SelectModule, i4.Select, CheckboxModule, i5.Checkbox, InputTextModule, i6.InputText, BreadcrumbsComponent], styles: ["//   Host   block   styling   to   ensure   component   takes   full   width\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n\n//[_ngcontent-%COMP%]   Page[_ngcontent-%COMP%]   Background[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   override[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   fixed[_ngcontent-%COMP%]   positioning[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   _components.scss\n.page-background[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  padding: 2.5rem 2.5rem 4rem;\n  pointer-events: auto !important;\n  z-index: 1;\n  overflow: hidden !important;\n}\n\n.page-background[_ngcontent-%COMP%]   .animated-orb[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n\n.page-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  margin-bottom: 1.2rem;\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  max-width: 760px;\n}\n\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: rgba(148, 163, 184, 0.9);\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.summary-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(120px, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 1rem;\n}\n\n.summary-pill[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n  padding: 0.55rem 0.7rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.65);\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n    line-height: 1.2;\n  }\n}\n\n.pill-label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 18px;\n  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  padding: 1.25rem;\n}\n\n.pack-card[_ngcontent-%COMP%] {\n  backdrop-filter: blur(18px);\n}\n\n.pack-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  margin-bottom: 1rem;\n}\n\n.pack-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n  font-size: 1.22rem;\n  color: #0f172a;\n}\n\n.pack-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.pack-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.mode-btn[_ngcontent-%COMP%] {\n  border-radius: 10px !important;\n  border: 1px solid rgba(148, 163, 184, 0.26) !important;\n  background: rgba(255, 255, 255, 0.72) !important;\n  color: #475569 !important;\n  font-weight: 600;\n  padding: 0.45rem 0.75rem !important;\n  box-shadow: none !important;\n}\n\n.mode-btn.is-active[_ngcontent-%COMP%] {\n  border-color: rgba(59, 130, 246, 0.45) !important;\n  background: linear-gradient(135deg, rgba(219, 234, 254, 0.92), rgba(191, 219, 254, 0.8)) !important;\n  color: #1d4ed8 !important;\n}\n\n.pack-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.9rem;\n}\n\n.level-select[_ngcontent-%COMP%] {\n  min-width: 170px;\n}\n\n.pack-name-input[_ngcontent-%COMP%] {\n  min-width: 260px;\n}\n\n.pack-subtitle[_ngcontent-%COMP%] {\n  margin: 0.9rem 0 0.55rem;\n  font-weight: 600;\n  font-size: 0.8rem;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: rgba(15, 23, 42, 0.86);\n}\n\n.kpi-table-wrap[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  overflow: hidden;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(240, 247, 255, 0.56));\n  backdrop-filter: blur(14px) saturate(108%);\n  -webkit-backdrop-filter: blur(14px) saturate(108%);\n}\n\n.kpi-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n\n  th,\n  td {\n    padding: 0.62rem 0.7rem;\n    border-bottom: 1px solid rgba(226, 232, 240, 0.8);\n    font-size: 0.8rem;\n    line-height: 1.4;\n    font-weight: 500;\n    color: #1e293b;\n    font-family: inherit;\n  }\n\n  th {\n    background: linear-gradient(180deg, rgba(248, 251, 255, 0.95) 0%, rgba(237, 245, 255, 0.88) 100%);\n    text-align: left;\n    font-size: 0.72rem;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: #3b82f6;\n    font-weight: 700;\n  }\n\n  tbody tr {\n    transition: background 0.15s ease, box-shadow 0.15s ease;\n  }\n\n  tbody tr:nth-child(even) {\n    background: rgba(248, 251, 255, 0.62);\n  }\n\n  tbody tr:nth-child(odd) {\n    background: rgba(255, 255, 255, 0.54);\n  }\n\n  tbody tr:hover {\n    background: linear-gradient(120deg, rgba(219, 234, 254, 0.64), rgba(236, 253, 245, 0.46));\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), inset 0 -1px 0 rgba(148, 163, 184, 0.18);\n  }\n\n  tr:last-child td {\n    border-bottom: 0;\n  }\n\n  .row-disabled {\n    opacity: 0.62;\n  }\n}\n\n.col-toggle[_ngcontent-%COMP%], \n.col-order[_ngcontent-%COMP%], \n.col-type[_ngcontent-%COMP%], \n.col-move[_ngcontent-%COMP%] {\n  width: 96px;\n}\n\n.col-drag[_ngcontent-%COMP%] {\n  width: 48px;\n  text-align: center;\n}\n\n.drag-handle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: 6px;\n  color: #94a3b8;\n  cursor: grab;\n  transition: all 150ms ease;\n\n  &:hover:not(:disabled) {\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.4);\n    background: rgba(219, 234, 254, 0.62);\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n\n  &:active:not(:disabled) {\n    cursor: grabbing;\n  }\n}\n\n//[_ngcontent-%COMP%]   CDK[_ngcontent-%COMP%]   Drag-drop[_ngcontent-%COMP%]   styles\n.cdk-drag-preview[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.95);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(15, 23, 42, 0.1);\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.3);\n  display: table-row;\n\n  td {\n    display: table-cell;\n    padding: 0.65rem 0.85rem;\n    vertical-align: middle;\n  }\n}\n\n.cdk-drag-placeholder[_ngcontent-%COMP%] {\n  background: rgba(219, 234, 254, 0.5);\n  border: 2px dashed rgba(59, 130, 246, 0.4);\n  border-radius: 6px;\n}\n\n.cdk-drag-animating[_ngcontent-%COMP%] {\n  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.kpi-table[_ngcontent-%COMP%]   tbody.cdk-drop-list-dragging[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:not(.cdk-drag-placeholder) {\n  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.col-id[_ngcontent-%COMP%] {\n  width: 200px;\n  color: #64748b;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;\n  font-size: 0.74rem;\n}\n\n.col-suggested[_ngcontent-%COMP%] {\n  min-width: 300px;\n  color: #334155;\n}\n\n.suggested-usage[_ngcontent-%COMP%] {\n  display: block;\n  white-space: normal;\n  line-height: 1.35;\n  color: #334155;\n}\n\n.order-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.65rem;\n  height: 1.65rem;\n  padding: 0 0.3rem;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.12);\n  color: #1d4ed8;\n  font-size: 0.74rem;\n  font-weight: 700;\n}\n\n.order-empty[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n\n.type-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 56px;\n  border-radius: 999px;\n  padding: 0.2rem 0.45rem;\n  background: rgba(14, 165, 233, 0.14);\n  color: #0369a1;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.type-pill--chart[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #047857;\n}\n\n.row-meta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 9px;\n  background: rgba(59, 130, 246, 0.12);\n  display: grid;\n  place-items: center;\n  color: #2563eb;\n  font-size: 0.85rem;\n}\n\n.card-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.col-move[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n[_nghost-%COMP%]     .col-move .action-btn.p-button {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border-radius: 8px;\n}\n\n[_nghost-%COMP%]     .col-move .action-btn.p-button.p-button-text {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  color: #64748b;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .col-move .action-btn.p-button.p-button-text:hover:not(:disabled) {\n  color: #1d4ed8;\n  border-color: rgba(59, 130, 246, 0.4);\n  background: rgba(219, 234, 254, 0.62);\n}\n\n\n\n[_nghost-%COMP%]     .kpi-table .p-checkbox .p-checkbox-box {\n  border-color: rgba(125, 141, 163, 0.6);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n[_nghost-%COMP%]     .kpi-table .p-checkbox.p-checkbox-checked .p-checkbox-box, \n[_nghost-%COMP%]     .kpi-table .p-checkbox.p-checkbox-checked:not(.p-disabled):hover .p-checkbox-box, \n[_nghost-%COMP%]     .kpi-table .p-checkbox.p-checkbox-checked:not(.p-disabled).p-focus .p-checkbox-box {\n  background: #1d9bf0;\n  border-color: #1d9bf0;\n}\n\n[_nghost-%COMP%]     .kpi-table .p-checkbox:not(.p-disabled):hover .p-checkbox-box, \n[_nghost-%COMP%]     .kpi-table .p-checkbox:not(.p-disabled).p-focus .p-checkbox-box {\n  border-color: #1d9bf0;\n}\n\n[_nghost-%COMP%]     .kpi-table .p-checkbox.p-checkbox-checked .p-checkbox-icon {\n  color: #ffffff;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 2rem;\n  text-align: center;\n  color: rgba(100, 116, 139, 0.9);\n}\n\n@media (max-width: 900px) {\n  .page-background[_ngcontent-%COMP%] {\n    padding: 1.2rem;\n  }\n\n  .summary-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .pack-meta-row[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .level-select[_ngcontent-%COMP%], \n   .pack-name-input[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .kpi-table-wrap[_ngcontent-%COMP%] {\n    overflow-x: auto;\n  }\n\n  .kpi-table[_ngcontent-%COMP%] {\n    min-width: 1080px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPacksPage, [{
        type: Component,
        args: [{ selector: 'app-dashboard-packs-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    FormsModule,
                    DragDropModule,
                    ButtonModule,
                    SelectModule,
                    CheckboxModule,
                    InputTextModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <header class=\"page-hero\">\n    <div class=\"hero-content\">\n      <span class=\"hero-eyebrow\">\n        <i class=\"pi pi-th-large\"></i>\n        Dashboard packs\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Role</span>\n        <span class=\"title-light\">+ Custom Dashboard Packs</span>\n      </h1>\n      <p class=\"hero-subtitle\">\n        Manage role-level defaults and custom packs with one liquid-glass table for KPI cards and chart widgets.\n      </p>\n    </div>\n  </header>\n\n  <div class=\"summary-strip\">\n    <div class=\"summary-pill\">\n      <span class=\"pill-label\">Mode</span>\n      <strong>{{ mode() === 'role-level' ? 'Role Level' : 'Custom Pack' }}</strong>\n    </div>\n    <div class=\"summary-pill\">\n      <span class=\"pill-label\">KPI Cards</span>\n      <strong>{{ selectedKpiCount() }}</strong>\n    </div>\n    <div class=\"summary-pill\">\n      <span class=\"pill-label\">Chart Widgets</span>\n      <strong>{{ selectedChartCount() }}</strong>\n    </div>\n  </div>\n\n  <div class=\"glass-card pack-card\">\n    <div class=\"pack-header\">\n      <div class=\"pack-title\">\n        <h2>Dashboard pack designer</h2>\n        <p>Define pack name, include/exclude cards, and control display order.</p>\n      </div>\n      <div class=\"pack-actions\">\n        <button\n          pButton\n          type=\"button\"\n          class=\"mode-btn\"\n          [class.is-active]=\"mode() === 'role-level'\"\n          (click)=\"setMode('role-level')\"\n        >\n          Role Level\n        </button>\n        <button\n          pButton\n          type=\"button\"\n          class=\"mode-btn\"\n          [class.is-active]=\"mode() === 'custom'\"\n          (click)=\"setMode('custom')\"\n        >\n          Custom Pack\n        </button>\n      </div>\n    </div>\n\n    <div class=\"pack-meta-row\" *ngIf=\"mode() === 'role-level'; else customPackMeta\">\n      <p-select\n        appendTo=\"body\"\n        [options]=\"availableLevels()\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [ngModel]=\"selectedLevel()\"\n        (ngModelChange)=\"onLevelChange($event)\"\n        [disabled]=\"loadingRoles()\"\n        placeholder=\"Select H1/H2/H3\"\n        styleClass=\"level-select\"\n      ></p-select>\n\n      <input\n        type=\"text\"\n        pInputText\n        class=\"pack-name-input\"\n        [ngModel]=\"levelPackName()\"\n        (ngModelChange)=\"levelPackName.set($event)\"\n        [disabled]=\"!selectedLevel()\"\n        placeholder=\"Role-level pack name\"\n      />\n\n      <button\n        pButton\n        type=\"button\"\n        class=\"btn-gradient\"\n        [disabled]=\"savingPack() || !selectedLevel()\"\n        (click)=\"savePack()\"\n      >\n        Save Role-Level Pack\n      </button>\n    </div>\n\n    <ng-template #customPackMeta>\n      <div class=\"pack-meta-row\">\n        <p-select\n          appendTo=\"body\"\n          [options]=\"customPackOptions()\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [ngModel]=\"selectedCustomPackId()\"\n          (ngModelChange)=\"onCustomPackChange($event)\"\n          [disabled]=\"loadingTemplates()\"\n          placeholder=\"Select custom pack\"\n          styleClass=\"level-select\"\n        ></p-select>\n\n        <input\n          type=\"text\"\n          pInputText\n          class=\"pack-name-input\"\n          [ngModel]=\"customPackName()\"\n          (ngModelChange)=\"customPackName.set($event)\"\n          placeholder=\"Custom pack name\"\n        />\n\n        <button pButton type=\"button\" class=\"btn-outline\" (click)=\"createNewCustomPack()\">\n          New\n        </button>\n\n        <button pButton type=\"button\" class=\"btn-gradient\" [disabled]=\"savingPack()\" (click)=\"savePack()\">\n          Save Custom Pack\n        </button>\n      </div>\n    </ng-template>\n\n    <div class=\"pack-body\" *ngIf=\"!loadingPack(); else loadingState\">\n      <div class=\"pack-subtitle\">Cards and widgets table (display order)</div>\n      <div class=\"kpi-table-wrap\">\n        <table class=\"kpi-table\" aria-label=\"Dashboard cards and widgets order table\">\n          <thead>\n            <tr>\n              <th class=\"col-drag\"></th>\n              <th class=\"col-toggle\">Include</th>\n              <th class=\"col-order\">Order</th>\n              <th class=\"col-type\">Type</th>\n              <th>Name</th>\n              <th class=\"col-id\">Id</th>\n              <th class=\"col-suggested\">Suggested Usage</th>\n              <th class=\"col-move\">Move</th>\n            </tr>\n          </thead>\n          <tbody cdkDropList (cdkDropListDropped)=\"onRowDrop($event)\">\n            <tr *ngFor=\"let row of tableRows()\" [class.row-disabled]=\"!row.checked\" cdkDrag [cdkDragDisabled]=\"!row.checked\">\n              <td class=\"col-drag\">\n                <button\n                  type=\"button\"\n                  class=\"drag-handle\"\n                  cdkDragHandle\n                  [disabled]=\"!row.checked\"\n                  aria-label=\"Drag to reorder\"\n                >\n                  <i class=\"pi pi-bars\"></i>\n                </button>\n              </td>\n              <td class=\"col-toggle\">\n                <p-checkbox\n                  [binary]=\"true\"\n                  [ngModel]=\"row.checked\"\n                  (ngModelChange)=\"toggleItem(row.id, $event)\"\n                ></p-checkbox>\n              </td>\n              <td class=\"col-order\">\n                <span class=\"order-badge\" *ngIf=\"row.order; else noOrder\">{{ row.order }}</span>\n                <ng-template #noOrder>\n                  <span class=\"order-empty\">-</span>\n                </ng-template>\n              </td>\n              <td class=\"col-type\">\n                <span class=\"type-pill\" [class.type-pill--chart]=\"row.type === 'chart'\">\n                  {{ row.type === 'kpi' ? 'KPI' : 'Chart' }}\n                </span>\n              </td>\n              <td>\n                <div class=\"row-meta\">\n                  <div class=\"card-icon\"><i class=\"pi\" [class]=\"row.icon\"></i></div>\n                  <span class=\"card-title\">{{ row.label }}</span>\n                </div>\n              </td>\n              <td class=\"col-id\">{{ row.id }}</td>\n              <td class=\"col-suggested\">\n                <span class=\"suggested-usage\">{{ row.suggestedUsage }}</span>\n              </td>\n              <td class=\"col-move\">\n                <button\n                  pButton\n                  type=\"button\"\n                  icon=\"pi pi-angle-up\"\n                  class=\"action-btn p-button-text p-button-rounded p-button-sm p-button-secondary\"\n                  [disabled]=\"!row.checked || !row.canMoveUp\"\n                  (click)=\"moveItem(row.id, -1)\"\n                  title=\"Move up\"\n                ></button>\n                <button\n                  pButton\n                  type=\"button\"\n                  icon=\"pi pi-angle-down\"\n                  class=\"action-btn p-button-text p-button-rounded p-button-sm p-button-secondary\"\n                  [disabled]=\"!row.checked || !row.canMoveDown\"\n                  (click)=\"moveItem(row.id, 1)\"\n                  title=\"Move down\"\n                ></button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <ng-template #loadingState>\n      <div class=\"loading-state\">Loading pack...</div>\n    </ng-template>\n  </div>\n</section>\n", styles: ["// Host block styling to ensure component takes full width\n:host {\n  display: block;\n  width: 100%;\n}\n\n// Page Background - override global fixed positioning from _components.scss\n.page-background {\n  position: relative !important;\n  inset: unset !important;\n  padding: 2.5rem 2.5rem 4rem;\n  pointer-events: auto !important;\n  z-index: 1;\n  overflow: hidden !important;\n}\n\n.page-background .animated-orb {\n  pointer-events: none;\n}\n\n.page-hero {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  margin-bottom: 1.2rem;\n}\n\n.hero-content {\n  max-width: 760px;\n}\n\n.hero-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: rgba(148, 163, 184, 0.9);\n}\n\n.hero-subtitle {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.summary-strip {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(120px, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 1rem;\n}\n\n.summary-pill {\n  display: grid;\n  gap: 0.15rem;\n  padding: 0.55rem 0.7rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.65);\n\n  strong {\n    font-size: 1rem;\n    color: #0f172a;\n    line-height: 1.2;\n  }\n}\n\n.pill-label {\n  font-size: 0.68rem;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.7);\n  border-radius: 18px;\n  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  padding: 1.25rem;\n}\n\n.pack-card {\n  backdrop-filter: blur(18px);\n}\n\n.pack-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  margin-bottom: 1rem;\n}\n\n.pack-title h2 {\n  margin: 0 0 0.25rem;\n  font-size: 1.22rem;\n  color: #0f172a;\n}\n\n.pack-title p {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.pack-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.mode-btn {\n  border-radius: 10px !important;\n  border: 1px solid rgba(148, 163, 184, 0.26) !important;\n  background: rgba(255, 255, 255, 0.72) !important;\n  color: #475569 !important;\n  font-weight: 600;\n  padding: 0.45rem 0.75rem !important;\n  box-shadow: none !important;\n}\n\n.mode-btn.is-active {\n  border-color: rgba(59, 130, 246, 0.45) !important;\n  background: linear-gradient(135deg, rgba(219, 234, 254, 0.92), rgba(191, 219, 254, 0.8)) !important;\n  color: #1d4ed8 !important;\n}\n\n.pack-meta-row {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.9rem;\n}\n\n.level-select {\n  min-width: 170px;\n}\n\n.pack-name-input {\n  min-width: 260px;\n}\n\n.pack-subtitle {\n  margin: 0.9rem 0 0.55rem;\n  font-weight: 600;\n  font-size: 0.8rem;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: rgba(15, 23, 42, 0.86);\n}\n\n.kpi-table-wrap {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 14px;\n  overflow: hidden;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(240, 247, 255, 0.56));\n  backdrop-filter: blur(14px) saturate(108%);\n  -webkit-backdrop-filter: blur(14px) saturate(108%);\n}\n\n.kpi-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n\n  th,\n  td {\n    padding: 0.62rem 0.7rem;\n    border-bottom: 1px solid rgba(226, 232, 240, 0.8);\n    font-size: 0.8rem;\n    line-height: 1.4;\n    font-weight: 500;\n    color: #1e293b;\n    font-family: inherit;\n  }\n\n  th {\n    background: linear-gradient(180deg, rgba(248, 251, 255, 0.95) 0%, rgba(237, 245, 255, 0.88) 100%);\n    text-align: left;\n    font-size: 0.72rem;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: #3b82f6;\n    font-weight: 700;\n  }\n\n  tbody tr {\n    transition: background 0.15s ease, box-shadow 0.15s ease;\n  }\n\n  tbody tr:nth-child(even) {\n    background: rgba(248, 251, 255, 0.62);\n  }\n\n  tbody tr:nth-child(odd) {\n    background: rgba(255, 255, 255, 0.54);\n  }\n\n  tbody tr:hover {\n    background: linear-gradient(120deg, rgba(219, 234, 254, 0.64), rgba(236, 253, 245, 0.46));\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72), inset 0 -1px 0 rgba(148, 163, 184, 0.18);\n  }\n\n  tr:last-child td {\n    border-bottom: 0;\n  }\n\n  .row-disabled {\n    opacity: 0.62;\n  }\n}\n\n.col-toggle,\n.col-order,\n.col-type,\n.col-move {\n  width: 96px;\n}\n\n.col-drag {\n  width: 48px;\n  text-align: center;\n}\n\n.drag-handle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: 6px;\n  color: #94a3b8;\n  cursor: grab;\n  transition: all 150ms ease;\n\n  &:hover:not(:disabled) {\n    color: #1d4ed8;\n    border-color: rgba(59, 130, 246, 0.4);\n    background: rgba(219, 234, 254, 0.62);\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n\n  &:active:not(:disabled) {\n    cursor: grabbing;\n  }\n}\n\n// CDK Drag-drop styles\n.cdk-drag-preview {\n  background: rgba(255, 255, 255, 0.95);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(15, 23, 42, 0.1);\n  border-radius: 8px;\n  border: 1px solid rgba(59, 130, 246, 0.3);\n  display: table-row;\n\n  td {\n    display: table-cell;\n    padding: 0.65rem 0.85rem;\n    vertical-align: middle;\n  }\n}\n\n.cdk-drag-placeholder {\n  background: rgba(219, 234, 254, 0.5);\n  border: 2px dashed rgba(59, 130, 246, 0.4);\n  border-radius: 6px;\n}\n\n.cdk-drag-animating {\n  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.kpi-table tbody.cdk-drop-list-dragging tr:not(.cdk-drag-placeholder) {\n  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);\n}\n\n.col-id {\n  width: 200px;\n  color: #64748b;\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;\n  font-size: 0.74rem;\n}\n\n.col-suggested {\n  min-width: 300px;\n  color: #334155;\n}\n\n.suggested-usage {\n  display: block;\n  white-space: normal;\n  line-height: 1.35;\n  color: #334155;\n}\n\n.order-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.65rem;\n  height: 1.65rem;\n  padding: 0 0.3rem;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.12);\n  color: #1d4ed8;\n  font-size: 0.74rem;\n  font-weight: 700;\n}\n\n.order-empty {\n  color: #94a3b8;\n}\n\n.type-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 56px;\n  border-radius: 999px;\n  padding: 0.2rem 0.45rem;\n  background: rgba(14, 165, 233, 0.14);\n  color: #0369a1;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.type-pill--chart {\n  background: rgba(16, 185, 129, 0.15);\n  color: #047857;\n}\n\n.row-meta {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n}\n\n.card-icon {\n  width: 28px;\n  height: 28px;\n  border-radius: 9px;\n  background: rgba(59, 130, 246, 0.12);\n  display: grid;\n  place-items: center;\n  color: #2563eb;\n  font-size: 0.85rem;\n}\n\n.card-title {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.col-move {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n:host ::ng-deep .col-move .action-btn.p-button {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border-radius: 8px;\n}\n\n:host ::ng-deep .col-move .action-btn.p-button.p-button-text {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  color: #64748b;\n  box-shadow: none;\n}\n\n:host ::ng-deep .col-move .action-btn.p-button.p-button-text:hover:not(:disabled) {\n  color: #1d4ed8;\n  border-color: rgba(59, 130, 246, 0.4);\n  background: rgba(219, 234, 254, 0.62);\n}\n\n/* Normalize checkbox color for CRM (replace green with system blue accent). */\n:host ::ng-deep .kpi-table .p-checkbox .p-checkbox-box {\n  border-color: rgba(125, 141, 163, 0.6);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n:host ::ng-deep .kpi-table .p-checkbox.p-checkbox-checked .p-checkbox-box,\n:host ::ng-deep .kpi-table .p-checkbox.p-checkbox-checked:not(.p-disabled):hover .p-checkbox-box,\n:host ::ng-deep .kpi-table .p-checkbox.p-checkbox-checked:not(.p-disabled).p-focus .p-checkbox-box {\n  background: #1d9bf0;\n  border-color: #1d9bf0;\n}\n\n:host ::ng-deep .kpi-table .p-checkbox:not(.p-disabled):hover .p-checkbox-box,\n:host ::ng-deep .kpi-table .p-checkbox:not(.p-disabled).p-focus .p-checkbox-box {\n  border-color: #1d9bf0;\n}\n\n:host ::ng-deep .kpi-table .p-checkbox.p-checkbox-checked .p-checkbox-icon {\n  color: #ffffff;\n}\n\n.loading-state {\n  padding: 2rem;\n  text-align: center;\n  color: rgba(100, 116, 139, 0.9);\n}\n\n@media (max-width: 900px) {\n  .page-background {\n    padding: 1.2rem;\n  }\n\n  .summary-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .pack-meta-row {\n    width: 100%;\n  }\n\n  .level-select,\n  .pack-name-input {\n    width: 100%;\n  }\n\n  .kpi-table-wrap {\n    overflow-x: auto;\n  }\n\n  .kpi-table {\n    min-width: 1080px;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPacksPage, { className: "DashboardPacksPage", filePath: "src/app/crm/features/settings/pages/dashboard-packs.page.ts", lineNumber: 73 }); })();
