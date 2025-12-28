import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, NgFor, ButtonModule],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage {
  highlights = [
    { label: 'AI-first', value: 'Next best actions + predictive scoring' },
    { label: 'Zero data entry', value: 'Voice-to-CRM + auto enrichment' },
    { label: 'Fast rollout', value: '15-minute setup with smart defaults' }
  ];

  stats = [
    { value: '3.2x', label: 'Pipeline velocity' },
    { value: '42%', label: 'Data entry reduction' },
    { value: '15 min', label: 'Time-to-setup' }
  ];
}
