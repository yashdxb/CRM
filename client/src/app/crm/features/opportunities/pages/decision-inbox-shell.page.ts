import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

interface DecisionNavItem {
  label: string;
  path: string;
  icon: string;
  visible: boolean;
}

@Component({
  selector: 'app-decision-inbox-shell-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="decision-shell-nav">
      <div class="decision-shell-nav__inner">
        <a
          *ngFor="let item of visibleNavItems()"
          [routerLink]="item.path"
          routerLinkActive="is-active"
          class="decision-shell-nav__item"
        >
          <i class="pi" [class]="item.icon"></i>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [`
    :host {
      display: block;
    }

    .decision-shell-nav {
      margin-bottom: 0.85rem;
    }

    .decision-shell-nav__inner {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      padding: 0.55rem;
      border-radius: 16px;
      border: 1px solid rgba(148, 163, 184, 0.18);
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.78)),
        radial-gradient(circle at 12% 0%, rgba(59, 130, 246, 0.08), transparent 50%);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.7),
        0 8px 20px rgba(15, 23, 42, 0.05);
    }

    .decision-shell-nav__item {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.5rem 0.8rem;
      border-radius: 12px;
      border: 1px solid rgba(203, 213, 225, 0.65);
      background: rgba(255, 255, 255, 0.75);
      color: #334155;
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease, color 140ms ease;
    }

    .decision-shell-nav__item .pi {
      font-size: 0.82rem;
      color: #64748b;
    }

    .decision-shell-nav__item:hover {
      border-color: rgba(96, 165, 250, 0.35);
      background: rgba(255, 255, 255, 0.92);
      color: #0f172a;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
    }

    .decision-shell-nav__item.is-active {
      border-color: rgba(59, 130, 246, 0.34);
      background:
        linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(14, 165, 233, 0.06)),
        rgba(255, 255, 255, 0.92);
      color: #0f172a;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.85),
        0 8px 18px rgba(59, 130, 246, 0.10);
    }

    .decision-shell-nav__item.is-active .pi {
      color: #2563eb;
    }

    @media (max-width: 768px) {
      .decision-shell-nav__inner {
        gap: 0.45rem;
        padding: 0.45rem;
      }

      .decision-shell-nav__item {
        padding: 0.45rem 0.65rem;
        font-size: 0.8rem;
      }
    }
  `]
})
export class DecisionInboxShellPage {
  private readonly tokenContext = readTokenContext();

  protected readonly visibleNavItems = computed<DecisionNavItem[]>(() => {
    const payload = this.tokenContext?.payload ?? null;
    const canApprove = tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesApprovalsApprove)
      || tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesApprovalsOverride);
    const canAdmin = tokenHasPermission(payload, PERMISSION_KEYS.administrationView);

    const items: DecisionNavItem[] = [
      { label: 'Pending Action', path: '/app/decisions/pending-action', icon: 'pi-inbox', visible: true },
      { label: 'Policies & SLA', path: '/app/decisions/policies', icon: 'pi-shield', visible: canAdmin || canApprove },
      { label: 'Decision History', path: '/app/decisions/audit', icon: 'pi-history', visible: canApprove || canAdmin }
    ];

    return items.filter(i => i.visible);
  });
}
