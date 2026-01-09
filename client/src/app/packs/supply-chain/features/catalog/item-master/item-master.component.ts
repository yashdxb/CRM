import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ItemMasterDataService } from '../../../catalog/services/item-master-data.service';
import { ItemMaster } from '../../../catalog/models/item-master.model';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-item-master',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, BreadcrumbsComponent],
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {
  private itemMasterService = inject(ItemMasterDataService);
  @ViewChild('dt') dataTable?: Table;
  items: ItemMaster[] = [];
  loading = true;
  searchValue = '';

  ngOnInit(): void {
    this.loading = true;
    this.itemMasterService.getAll().subscribe({
      next: items => {
        this.items = items;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
