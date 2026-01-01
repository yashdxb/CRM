import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CardModule, BreadcrumbsComponent],
  template: `
    <app-breadcrumbs></app-breadcrumbs>
    <p-card header="Settings (coming soon)">
      <p>Settings and customization will live here in a future drop.</p>
    </p-card>
  `
})
export class SettingsPage {}
