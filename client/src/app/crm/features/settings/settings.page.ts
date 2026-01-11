import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CardModule, BreadcrumbsComponent],
  templateUrl: "./settings.page.html"
})
export class SettingsPage {}
