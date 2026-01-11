import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { LeadAssignmentRule, LeadAssignmentRuleType, UpsertLeadAssignmentRuleRequest } from '../models/lead-assignment.model';
import { LeadAssignmentService } from '../services/lead-assignment.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { UserListItem } from '../models/user-admin.model';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-lead-assignment-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    SelectModule,
    TableModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  templateUrl: './lead-assignment.page.html',
  styleUrl: './lead-assignment.page.scss'
})
export class LeadAssignmentPage implements OnInit {
  protected readonly rules = signal<LeadAssignmentRule[]>([]);
  protected readonly loading = signal(true);
  protected readonly editingId = signal<string | null>(null);
  protected readonly canManageLeads = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.leadsManage)
  );

  protected readonly typeOptions: SelectOption<LeadAssignmentRuleType>[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Round robin', value: 'RoundRobin' },
    { label: 'Territory', value: 'Territory' }
  ];

  protected readonly ownerOptions = signal<SelectOption<string>[]>([]);

  protected readonly form = signal<UpsertLeadAssignmentRuleRequest>({
    name: '',
    type: 'RoundRobin',
    isActive: true,
    territory: null,
    assignedUserId: null
  });
  private pendingEditId: string | null = null;

  protected readonly canSave = computed(() => {
    const value = this.form();
    if (!value.name.trim()) return false;
    if (value.type === 'Territory' && (!value.territory || !value.assignedUserId)) return false;
    return true;
  });

  private readonly assignmentService = inject(LeadAssignmentService);
  private readonly userAdminData = inject(UserAdminDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit() {
    this.loadRules();
    this.loadOwners();
    this.route.paramMap.subscribe((params) => {
      this.pendingEditId = params.get('id');
      if (this.pendingEditId && this.rules().length) {
        const rule = this.rules().find((item) => item.id === this.pendingEditId);
        if (rule) {
          this.startEdit(rule);
        }
      }
    });
  }

  protected startEdit(rule: LeadAssignmentRule) {
    this.editingId.set(rule.id);
    this.form.set({
      name: rule.name,
      type: rule.type,
      isActive: rule.isActive,
      territory: rule.territory ?? null,
      assignedUserId: rule.assignedUserId ?? null
    });
  }

  protected onEdit(rule: LeadAssignmentRule) {
    this.router.navigate(['/app/settings/lead-assignment', rule.id, 'edit']);
  }

  protected resetForm() {
    this.editingId.set(null);
    this.form.set({
      name: '',
      type: 'RoundRobin',
      isActive: true,
      territory: null,
      assignedUserId: null
    });
    this.router.navigate(['/app/settings/lead-assignment']);
  }

  protected saveRule() {
    if (!this.canSave()) return;
    const payload = this.form();
    const editId = this.editingId();
    if (editId) {
      this.assignmentService.update(editId, payload).subscribe({
        next: () => {
          this.loadRules();
        }
      });
      return;
    }

    this.assignmentService.create(payload).subscribe({
      next: () => {
        this.loadRules();
        this.resetForm();
      }
    });
  }

  protected deleteRule(rule: LeadAssignmentRule) {
    const confirmed = confirm(`Delete assignment rule "${rule.name}"?`);
    if (!confirmed) return;
    this.assignmentService.delete(rule.id).subscribe(() => this.loadRules());
  }

  protected getActiveRulesCount(): number {
    return this.rules().filter(r => r.isActive).length;
  }

  protected getTerritoryRulesCount(): number {
    return this.rules().filter(r => r.type === 'Territory').length;
  }

  protected getRoundRobinCount(): number {
    return this.rules().filter(r => r.type === 'RoundRobin').length;
  }

  protected getRuleTypeClass(type: LeadAssignmentRuleType): string {
    switch (type) {
      case 'Manual': return 'manual';
      case 'RoundRobin': return 'roundrobin';
      case 'Territory': return 'territory';
      default: return 'manual';
    }
  }

  protected getTypeIcon(type: LeadAssignmentRuleType): string {
    switch (type) {
      case 'Manual': return 'pi pi-hand-stop';
      case 'RoundRobin': return 'pi pi-sync';
      case 'Territory': return 'pi pi-map-marker';
      default: return 'pi pi-cog';
    }
  }

  private loadRules() {
    this.loading.set(true);
    this.assignmentService.getRules().subscribe({
      next: (data) => {
        this.rules.set(data);
        this.loading.set(false);
        if (this.pendingEditId) {
          const rule = data.find((item) => item.id === this.pendingEditId);
          if (rule) {
            this.startEdit(rule);
          }
        }
      },
      error: () => this.loading.set(false)
    });
  }

  private loadOwners() {
    this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
      next: (res) => {
        this.ownerOptions.set(res.items.map((user: UserListItem) => ({ label: user.fullName, value: user.id })));
      }
    });
  }
}
