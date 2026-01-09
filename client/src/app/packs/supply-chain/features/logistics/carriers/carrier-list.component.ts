import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

type CarrierStatus = 'Active' | 'Onboarding' | 'Suspended';

interface Carrier {
  id: string;
  name: string;
  modes: string[];
  coverage: string[];
  primaryRegion: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  avgTransitDays: number;
  onTimeRate: number;
  status: CarrierStatus;
  notes?: string;
}

@Component({
  selector: 'app-carrier-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    TextareaModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    InputNumberModule,
    BreadcrumbsComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss']
})
export class CarrierListComponent implements OnInit {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  carriers: Carrier[] = [];
  filteredCarriers: Carrier[] = [];
  loading = false;

  searchText = '';
  selectedMode: string | null = null;
  selectedStatus: CarrierStatus | null = null;

  showDialog = false;
  editMode = false;
  carrierForm: Carrier;

  readonly modeOptions = [
    { label: 'All Modes', value: null },
    { label: 'Air', value: 'Air' },
    { label: 'Ocean', value: 'Ocean' },
    { label: 'Road', value: 'Road' },
    { label: 'Rail', value: 'Rail' },
    { label: 'Intermodal', value: 'Intermodal' }
  ];

  readonly statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Onboarding', value: 'Onboarding' },
    { label: 'Suspended', value: 'Suspended' }
  ];

  readonly regionOptions = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa'];

  constructor() {
    this.carrierForm = this.getEmptyCarrier();
  }

  ngOnInit(): void {
    this.loadCarriers();
  }

  loadCarriers(): void {
    this.loading = true;

    setTimeout(() => {
      this.carriers = [
        {
          id: 'CAR-001',
          name: 'Global Freight Group',
          modes: ['Air', 'Ocean'],
          coverage: ['North America', 'Europe', 'Asia-Pacific'],
          primaryRegion: 'North America',
          contactName: 'Emily Carter',
          contactEmail: 'emily.carter@gfg.com',
          phone: '+1 555 201 7744',
          avgTransitDays: 7,
          onTimeRate: 95,
          status: 'Active',
          notes: 'Preferred for high-value electronics. TSA compliant.'
        },
        {
          id: 'CAR-002',
          name: 'Sunrise Logistics',
          modes: ['Road'],
          coverage: ['North America'],
          primaryRegion: 'North America',
          contactName: 'Mark Chen',
          contactEmail: 'mark.chen@sunriselogistics.com',
          phone: '+1 555 889 1122',
          avgTransitDays: 4,
          onTimeRate: 88,
          status: 'Onboarding',
          notes: 'Focus on Midwest lanes. Awaiting insurance certificates.'
        },
        {
          id: 'CAR-003',
          name: 'BlueOcean Shipping',
          modes: ['Ocean'],
          coverage: ['Asia-Pacific', 'Europe'],
          primaryRegion: 'Asia-Pacific',
          contactName: 'Hiro Tanaka',
          contactEmail: 'hiro.tanaka@blueocean.jp',
          phone: '+81 3-1234-5678',
          avgTransitDays: 18,
          onTimeRate: 91,
          status: 'Active',
          notes: 'Excellent track record on Trans-Pacific lanes.'
        },
        {
          id: 'CAR-004',
          name: 'RailConnect',
          modes: ['Rail', 'Intermodal'],
          coverage: ['Europe', 'Asia-Pacific'],
          primaryRegion: 'Europe',
          contactName: 'Sven Jorgensen',
          contactEmail: 'sven.jorgensen@railconnect.eu',
          phone: '+45 55 441 2233',
          avgTransitDays: 9,
          onTimeRate: 82,
          status: 'Suspended',
          notes: 'Under review for repeated customs documentation errors.'
        }
      ];

      this.filteredCarriers = [...this.carriers];
      this.loading = false;
    }, 400);
  }

  onSearch(): void {
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedMode = null;
    this.selectedStatus = null;
    this.applyFilters();
  }

  applyFilters(): void {
    const query = this.searchText.trim().toLowerCase();

    this.filteredCarriers = this.carriers.filter(carrier => {
      const matchesSearch =
        !query ||
        carrier.name.toLowerCase().includes(query) ||
        carrier.modes.join(',').toLowerCase().includes(query) ||
        carrier.coverage.join(',').toLowerCase().includes(query) ||
        carrier.primaryRegion.toLowerCase().includes(query);

      const matchesMode = !this.selectedMode || carrier.modes.includes(this.selectedMode);
      const matchesStatus = !this.selectedStatus || carrier.status === this.selectedStatus;

      return matchesSearch && matchesMode && matchesStatus;
    });
  }

  openCreateDialog(): void {
    this.editMode = false;
    this.carrierForm = this.getEmptyCarrier();
    this.showDialog = true;
  }

  openEditDialog(carrier: Carrier): void {
    this.editMode = true;
    this.carrierForm = { ...carrier, modes: [...carrier.modes], coverage: [...carrier.coverage] };
    this.showDialog = true;
  }

  saveCarrier(): void {
    if (!this.validateForm()) {
      return;
    }

    if (this.editMode) {
      const index = this.carriers.findIndex(c => c.id === this.carrierForm.id);
      if (index !== -1) {
        this.carriers[index] = { ...this.carrierForm };
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Carrier updated successfully.' });
      }
    } else {
      this.carrierForm.id = `CAR-${(this.carriers.length + 1).toString().padStart(3, '0')}`;
      this.carriers.push({ ...this.carrierForm });
      this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Carrier added successfully.' });
    }

    this.filteredCarriers = [...this.carriers];
    this.applyFilters();
    this.closeDialog();
  }

  deleteCarrier(carrier: Carrier): void {
    this.confirmationService.confirm({
      message: `Remove ${carrier.name} from the directory?`,
      header: 'Delete Carrier',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancel',
      accept: () => {
        this.carriers = this.carriers.filter(c => c.id !== carrier.id);
        this.filteredCarriers = [...this.carriers];
        this.applyFilters();
        this.messageService.add({ severity: 'success', summary: 'Removed', detail: `${carrier.name} deleted.` });
      }
    });
  }

  toggleMode(mode: string, checked: boolean): void {
    if (checked) {
      if (!this.carrierForm.modes.includes(mode)) {
        this.carrierForm.modes.push(mode);
      }
    } else {
      this.carrierForm.modes = this.carrierForm.modes.filter(m => m !== mode);
    }
  }

  toggleCoverage(region: string, checked: boolean): void {
    if (checked) {
      if (!this.carrierForm.coverage.includes(region)) {
        this.carrierForm.coverage.push(region);
      }
    } else {
      this.carrierForm.coverage = this.carrierForm.coverage.filter(r => r !== region);
    }
  }

  closeDialog(): void {
    this.showDialog = false;
    this.carrierForm = this.getEmptyCarrier();
  }

  statusSeverity(status: CarrierStatus): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Onboarding':
        return 'warn';
      default:
        return 'danger';
    }
  }

  private getEmptyCarrier(): Carrier {
    return {
      id: '',
      name: '',
      modes: [],
      coverage: [],
      primaryRegion: this.regionOptions.length ? this.regionOptions[0] : '',
      contactName: '',
      contactEmail: '',
      phone: '',
      avgTransitDays: 5,
      onTimeRate: 90,
      status: 'Active',
      notes: ''
    };
  }

  private validateForm(): boolean {
    if (!this.carrierForm.name.trim()) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Carrier name is required.' });
      return false;
    }

    if (!this.carrierForm.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.carrierForm.contactEmail)) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Valid contact email is required.' });
      return false;
    }

    if (!this.carrierForm.modes.length) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Select at least one transportation mode.' });
      return false;
    }

    if (!this.carrierForm.coverage.length) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'Select at least one coverage region.' });
      return false;
    }

    return true;
  }
}
