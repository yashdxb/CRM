import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

type HeroStat = {
  value: string;
  label: string;
  tone: 'blue' | 'mint' | 'amber' | 'violet';
};

type CapabilityCard = {
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  tone: 'blue' | 'cyan' | 'amber' | 'violet' | 'emerald' | 'slate';
};

type ProofStrip = {
  title: string;
  copy: string;
};

type DemoMoment = {
  step: string;
  title: string;
  copy: string;
};

@Component({
  selector: 'app-product-capabilities-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './product-capabilities.page.html',
  styleUrls: ['./product-capabilities.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCapabilitiesPage {
  readonly heroStats: HeroStat[] = [
    { value: 'Lead to close', label: 'Structured revenue workflows', tone: 'blue' },
    { value: 'One workspace', label: 'Sales, marketing, support, reporting', tone: 'mint' },
    { value: 'Decision ready', label: 'Evidence-aware pipeline management', tone: 'amber' },
    { value: 'Enterprise fit', label: 'Permissions, tenants, realtime', tone: 'violet' }
  ];

  readonly capabilities: CapabilityCard[] = [
    {
      eyebrow: 'Lead Execution',
      title: 'Qualify leads with evidence, not just enthusiasm',
      summary: 'North Edge CRM gives teams a structured lead path with qualification signals, nurture handling, duplicate prevention, owner assignment, and conversion flow.',
      bullets: [
        'Lead lifecycle from intake to conversion',
        'Qualification workflow with evidence prompts',
        'Nurture, recycle, and cadence touch tracking',
        'Duplicate checks, AI scoring, and conversation summaries'
      ],
      tone: 'blue'
    },
    {
      eyebrow: 'Deal Governance',
      title: 'Move complex deals with visible control',
      summary: 'Deals are managed with stage progression, owner control, review threads, approvals, quotes, proposals, and health scoring in the same operational surface.',
      bullets: [
        'Stage, owner, audit, and review thread visibility',
        'Approval routing with SLA and escalation context',
        'Quotes, proposal generation, and proposal sending',
        'Deal health scoring and team collaboration'
      ],
      tone: 'cyan'
    },
    {
      eyebrow: 'Decision Inbox',
      title: 'Turn approvals into a managed business process',
      summary: 'Approvals are surfaced as a true inbox with pending action, aging, priority, risk, policy reason, and business-impact context.',
      bullets: [
        'Pending approval queue for managers and approvers',
        'SLA awareness and escalation support',
        'Business-impact context beside each request',
        'Decision history and policy-driven handling'
      ],
      tone: 'amber'
    },
    {
      eyebrow: 'Campaign Impact',
      title: 'Connect campaigns to pipeline and revenue',
      summary: 'Campaigns are not isolated activity logs. The platform ties campaigns to influenced opportunities, pipeline amount, revenue, attribution, and email execution.',
      bullets: [
        'Campaign performance with influenced pipeline and won revenue',
        'Attribution views and explainability',
        'Campaign recommendations and health scoring',
        'Campaign email drafting, sending, scheduling, and tracking'
      ],
      tone: 'violet'
    },
    {
      eyebrow: 'Reporting',
      title: 'Start with analytics that already speak the business language',
      summary: 'The report workspace comes with pipeline, forecast, lead quality, campaign ROI, support, and team performance reporting patterns already present.',
      bullets: [
        'Pipeline, forecast, and win/loss reporting',
        'Lead conversion, lead quality, and aging views',
        'Campaign ROI and email engagement reporting',
        'Embedded report workspace and report designer path'
      ],
      tone: 'emerald'
    },
    {
      eyebrow: 'Operational Platform',
      title: 'Support the whole operating model, not only sales reps',
      summary: 'North Edge CRM already spans dashboards, support cases, role-based settings, qualification policy, assignment rules, and workflow controls.',
      bullets: [
        'Role-based dashboards with configurable layouts',
        'Help desk queues, SLA policies, and case operations',
        'Lead assignment, qualification thresholds, and automation settings',
        'Permission-aware admin controls for enterprise teams'
      ],
      tone: 'slate'
    }
  ];

  readonly proofStrips: ProofStrip[] = [
    {
      title: 'Evidence-aware qualification',
      copy: 'The product tracks qualification confidence, truth coverage, and evidence quality so teams can see whether a forecast is supported.'
    },
    {
      title: 'Realtime operational visibility',
      copy: 'SignalR-backed events, notifications, and live updates support a more responsive operating rhythm across the CRM.'
    },
    {
      title: 'Governed enterprise controls',
      copy: 'Tenant-aware request handling, module-level permissions, and workflow lifecycle management make the platform easier to deploy into serious organizations.'
    }
  ];

  readonly demoMoments: DemoMoment[] = [
    {
      step: '01',
      title: 'Start with a lead the team can actually evaluate',
      copy: 'Show intake, duplicate prevention, qualification evidence, AI scoring, and the move into nurture or conversion-ready status.'
    },
    {
      step: '02',
      title: 'Move into a governed deal workflow',
      copy: 'Show a deal with health, approvals, quote operations, proposal actions, and decision-inbox visibility for management.'
    },
    {
      step: '03',
      title: 'Close the loop with analytics and accountability',
      copy: 'Show dashboard health, report workspace, campaign impact, and the management layer that makes the operating model visible.'
    }
  ];
}
