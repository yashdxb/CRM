import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PresenceService } from './core/realtime/presence.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly presenceService = inject(PresenceService);

  constructor() {
    this.presenceService.connect();
  }
}
