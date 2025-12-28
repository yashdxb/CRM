import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { LeadAssignmentRule, LeadAssignmentRuleType, UpsertLeadAssignmentRuleRequest } from '../models/lead-assignment.model';
import { LeadAssignmentService } from '../services/lead-assignment.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { UserListItem } from '../models/user-admin.model';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-lead-assignment-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ButtonModule, InputTextModule, SelectModule, BreadcrumbsComponent],
  templateUrl: './lead-assignment.page.html',
  styleUrl: './lead-assignment.page.scss'
})
export class LeadAssignmentPage implements OnInit {
  protected readonly rules = signal<LeadAssignmentRule[]>([]);
  protected readonly loading = signal(true);
  protected readonly editingId = signal<string | null>(null);

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

  protected readonly canSave = computed(() => {
    const value = this.form();
    if (!value.name.trim()) return false;
    if (value.type === 'Territory' && (!value.territory || !value.assignedUserId)) return false;
    return true;
  });

  private readonly assignmentService = inject(LeadAssignmentService);
  private readonly userAdminData = inject(UserAdminDataService);

  ngOnInit() {
    this.loadRules();
    this.loadOwners();
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

  protected resetForm() {
    this.editingId.set(null);
    this.form.set({
      name: '',
      type: 'RoundRobin',
      isActive: true,
      territory: null,
      assignedUserId: null
    });
  }

  protected saveRule() {
    if (!this.canSave()) return;
    const payload = this.form();
    const editId = this.editingId();
    if (editId) {
      this.assignmentService.update(editId, payload).subscribe({
        next: () => {
          this.loadRules();
          this.resetForm();
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

  private loadRules() {
    this.loading.set(true);
    this.assignmentService.getRules().subscribe({
      next: (data) => {
        this.rules.set(data);
        this.loading.set(false);
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
