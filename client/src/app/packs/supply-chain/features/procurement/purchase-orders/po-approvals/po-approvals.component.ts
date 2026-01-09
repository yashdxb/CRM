import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbsComponent } from '../../../../../../core/breadcrumbs';
import { PoApproval, PoApprovalStatus } from '../../../../models/po.model';

@Component({
  selector: 'app-po-approvals',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, AvatarModule, ChipModule, BreadcrumbsComponent],
  templateUrl: './po-approvals.component.html',
  styleUrls: ['./po-approvals.component.scss']
})
export class PoApprovalsComponent {
  readonly approvals: PoApproval[] = [
    {
      poNumber: 'PO-2025-112',
      requestor: 'Allison Drake',
      department: 'Operations',
      amount: '$1.2M',
      status: 'Pending',
      submittedOn: 'Mar 1, 2025 · 09:12',
      dueBy: 'Mar 3, 2025',
      approvers: ['Rafael Kim', 'Finance Panel'],
      currentApprover: 'Rafael Kim',
      notes: 'Urgent replenishment aligned to Q2 build plan.'
    },
    {
      poNumber: 'PO-2025-108',
      requestor: 'Priya Nair',
      department: 'Sourcing',
      amount: '$540K',
      status: 'Escalated',
      submittedOn: 'Feb 27, 2025 · 16:40',
      dueBy: 'Mar 2, 2025',
      approvers: ['Samuel Ortiz', 'VP Procurement'],
      currentApprover: 'VP Procurement',
      notes: 'Service-level exception requires VP sign-off.'
    },
    {
      poNumber: 'PO-2025-099',
      requestor: 'Rafael Kim',
      department: 'Manufacturing',
      amount: '$3.8M',
      status: 'Approved',
      submittedOn: 'Feb 20, 2025 · 13:05',
      dueBy: 'Feb 21, 2025',
      approvers: ['Finance Panel', 'CFO'],
      currentApprover: 'CFO',
      notes: 'Approved with freight consolidation savings.'
    }
  ];

  statusSeverity(status: PoApprovalStatus): 'info' | 'warn' | 'success' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Escalated':
        return 'warn';
      default:
        return 'info';
    }
  }
}
