import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CardModule],
  template: `
    <p-card header="Settings (coming soon)">
      <p>Settings and customization will live here in a future drop.</p>
    </p-card>
  `
})
export class SettingsPage {}
