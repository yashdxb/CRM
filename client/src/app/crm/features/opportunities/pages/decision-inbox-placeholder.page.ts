import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-decision-inbox-placeholder-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  template: `
    <section class="decision-placeholder">
      <div class="decision-placeholder__card">
        <div class="decision-placeholder__badge">{{ title() }}</div>
        <h1>{{ heading() }}</h1>
        <p>{{ description() }}</p>
        <div class="decision-placeholder__actions">
          <a pButton class="placeholder-btn" routerLink="/app/decisions/inbox">
            <i class="pi pi-arrow-left"></i>
            <span>Back to Inbox</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .decision-placeholder {
      padding: 0.35rem 0 0;
    }
    .decision-placeholder__card {
      border-radius: 18px;
      border: 1px solid rgba(148, 163, 184, 0.16);
      background:
        linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.86)),
        radial-gradient(circle at 10% 0%, rgba(59,130,246,0.08), transparent 55%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 14px 36px rgba(15,23,42,0.05);
      padding: 1.1rem 1.15rem;
      color: #0f172a;
    }
    .decision-placeholder__badge {
      display: inline-flex;
      align-items: center;
      padding: 0.3rem 0.55rem;
      border-radius: 999px;
      border: 1px solid rgba(96,165,250,0.22);
      background: rgba(239, 246, 255, 0.85);
      color: #1d4ed8;
      font-weight: 700;
      font-size: 0.75rem;
      margin-bottom: 0.6rem;
    }
    h1 {
      margin: 0 0 0.35rem;
      font-size: 1.15rem;
      line-height: 1.2;
    }
    p {
      margin: 0;
      color: #475569;
      max-width: 60ch;
      line-height: 1.45;
    }
    .decision-placeholder__actions {
      margin-top: 0.9rem;
    }
    :host ::ng-deep .placeholder-btn.p-button {
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.26);
      background: rgba(255,255,255,0.8);
      color: #334155;
    }
  `]
})
export class DecisionInboxPlaceholderPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = computed(() => this.route.snapshot.data['title'] ?? 'Decision Inbox');
  protected readonly heading = computed(() => this.route.snapshot.data['heading'] ?? 'Coming next');
  protected readonly description = computed(
    () =>
      this.route.snapshot.data['description'] ??
      'This child view is reserved for the Decision Inbox platform rollout.'
  );
}

