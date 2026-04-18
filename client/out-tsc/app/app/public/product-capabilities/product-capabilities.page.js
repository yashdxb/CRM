import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
function ProductCapabilitiesPage_article_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵclassMap("capability-stat capability-stat--" + stat_r1.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r1.label);
} }
function ProductCapabilitiesPage_article_71_li_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const bullet_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(bullet_r2);
} }
function ProductCapabilitiesPage_article_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "span", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul");
    i0.ɵɵtemplate(8, ProductCapabilitiesPage_article_71_li_8_Template, 2, 1, "li", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const capability_r3 = ctx.$implicit;
    i0.ɵɵclassMap("capability-card capability-card--" + capability_r3.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(capability_r3.eyebrow);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(capability_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(capability_r3.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", capability_r3.bullets);
} }
function ProductCapabilitiesPage_article_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const proof_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(proof_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(proof_r4.copy);
} }
function ProductCapabilitiesPage_article_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "span", 47);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 48)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const moment_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(moment_r5.step);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(moment_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(moment_r5.copy);
} }
export class ProductCapabilitiesPage {
    heroStats = [
        { value: 'Lead to close', label: 'Structured revenue workflows', tone: 'blue' },
        { value: 'One workspace', label: 'Sales, marketing, support, reporting', tone: 'mint' },
        { value: 'Decision ready', label: 'Evidence-aware pipeline management', tone: 'amber' },
        { value: 'Enterprise fit', label: 'Permissions, tenants, realtime', tone: 'violet' }
    ];
    capabilities = [
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
    proofStrips = [
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
    demoMoments = [
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
    static ɵfac = function ProductCapabilitiesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductCapabilitiesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductCapabilitiesPage, selectors: [["app-product-capabilities-page"]], decls: 110, vars: 4, consts: [[1, "capability-page"], ["aria-hidden", "true", 1, "capability-page__bg"], [1, "capability-page__orb", "capability-page__orb--one"], [1, "capability-page__orb", "capability-page__orb--two"], [1, "capability-page__mesh"], [1, "capability-topbar"], [1, "capability-shell", "capability-topbar__inner"], ["routerLink", "/landing", 1, "capability-topbar__brand"], ["src", "/assets/branding/logo-v2-light.png", "alt", "North Edge System"], [1, "capability-topbar__nav"], ["href", "#capabilities"], ["href", "#proof"], ["href", "#demo"], [1, "capability-topbar__actions"], ["routerLink", "/landing", 1, "capability-btn", "capability-btn--ghost"], ["routerLink", "/landing", "fragment", "hero", 1, "capability-btn", "capability-btn--primary"], [1, "capability-hero", "capability-shell"], [1, "capability-hero__copy"], [1, "capability-hero__eyebrow"], [1, "capability-hero__lede"], [1, "capability-hero__cta"], ["href", "#capabilities", 1, "capability-btn", "capability-btn--ghost"], [1, "capability-hero__proof"], [3, "class", 4, "ngFor", "ngForOf"], [1, "capability-hero__visual"], [1, "hero-panel", "hero-panel--main"], [1, "hero-panel__label"], [1, "hero-panel", "hero-panel--stack"], ["id", "capabilities", 1, "capability-grid-section", "capability-shell"], [1, "section-head"], [1, "section-head__eyebrow"], [1, "capability-grid"], ["id", "proof", 1, "proof-section", "capability-shell"], [1, "section-head", "section-head--compact"], [1, "proof-strip"], [4, "ngFor", "ngForOf"], [1, "message-section", "capability-shell"], [1, "message-panel"], [1, "message-panel__eyebrow"], ["id", "demo", 1, "demo-section", "capability-shell"], [1, "demo-timeline"], [1, "closing-section", "capability-shell"], [1, "closing-panel"], [1, "closing-panel__eyebrow"], [1, "closing-panel__actions"], ["routerLink", "/login", 1, "capability-btn", "capability-btn--ghost"], [1, "capability-card__eyebrow"], [1, "demo-timeline__step"], [1, "demo-timeline__body"]], template: function ProductCapabilitiesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1);
            i0.ɵɵelement(2, "span", 2)(3, "span", 3)(4, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "header", 5)(6, "div", 6)(7, "a", 7);
            i0.ɵɵelement(8, "img", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "nav", 9)(10, "a", 10);
            i0.ɵɵtext(11, "Platform");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "a", 11);
            i0.ɵɵtext(13, "Why North Edge");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "a", 12);
            i0.ɵɵtext(15, "Demo Flow");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 13)(17, "a", 14);
            i0.ɵɵtext(18, "Back to Landing");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "a", 15);
            i0.ɵɵtext(20, "Book a Demo");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(21, "section", 16)(22, "div", 17)(23, "span", 18);
            i0.ɵɵtext(24, "Customer-Facing Platform Overview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "h1");
            i0.ɵɵtext(26, " A CRM built for ");
            i0.ɵɵelementStart(27, "span");
            i0.ɵɵtext(28, "execution, governance, and revenue confidence");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "p", 19);
            i0.ɵɵtext(30, " North Edge CRM brings lead execution, deal governance, marketing impact, reporting, and operational control into one platform designed for teams that need defensible decisions, not just more activity logs. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 20)(32, "a", 15);
            i0.ɵɵtext(33, "Book a Demo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "a", 21);
            i0.ɵɵtext(35, "Explore Capabilities");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 22);
            i0.ɵɵtemplate(37, ProductCapabilitiesPage_article_37_Template, 5, 4, "article", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 24)(39, "div", 25)(40, "span", 26);
            i0.ɵɵtext(41, "North Edge CRM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "h2");
            i0.ɵɵtext(43, "Revenue operating model");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "p");
            i0.ɵɵtext(45, "Sales, marketing, support, and management teams work from one coordinated system instead of fragmented tools and disconnected decisions.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 27)(47, "article")(48, "span");
            i0.ɵɵtext(49, "Lead quality");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "strong");
            i0.ɵɵtext(51, "Evidence-aware qualification");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "article")(53, "span");
            i0.ɵɵtext(54, "Deal control");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "strong");
            i0.ɵɵtext(56, "Approval and proposal workflow");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "article")(58, "span");
            i0.ɵɵtext(59, "Management layer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "strong");
            i0.ɵɵtext(61, "Dashboard health, reporting, and policy controls");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(62, "section", 28)(63, "div", 29)(64, "span", 30);
            i0.ɵɵtext(65, "What Customers Actually Get");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "h2");
            i0.ɵɵtext(67, "Platform capabilities already present in the product");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "p");
            i0.ɵɵtext(69, " This view translates the implemented product surface into customer-facing language while staying grounded in the real system already built. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div", 31);
            i0.ɵɵtemplate(71, ProductCapabilitiesPage_article_71_Template, 9, 6, "article", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "section", 32)(73, "div", 33)(74, "span", 30);
            i0.ɵɵtext(75, "Why North Edge Feels Different");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "h2");
            i0.ɵɵtext(77, "Built for teams that need business confidence, not just database completeness");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(78, "div", 34);
            i0.ɵɵtemplate(79, ProductCapabilitiesPage_article_79_Template, 5, 2, "article", 35);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(80, "section", 36)(81, "div", 37)(82, "span", 38);
            i0.ɵɵtext(83, "Positioning Summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "h2");
            i0.ɵɵtext(85, "North Edge CRM is strongest where CRM, governance, and operational decision-making meet.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "p");
            i0.ɵɵtext(87, " This is not just a pipeline tracker. The implemented product already supports lead qualification, deal control, reporting, campaign attribution, support operations, and enterprise settings in one operating model. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(88, "section", 39)(89, "div", 33)(90, "span", 30);
            i0.ɵɵtext(91, "How To Demo It");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "h2");
            i0.ɵɵtext(93, "A simple storyline for customer conversations");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(94, "div", 40);
            i0.ɵɵtemplate(95, ProductCapabilitiesPage_article_95_Template, 8, 3, "article", 35);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(96, "section", 41)(97, "div", 42)(98, "div")(99, "span", 43);
            i0.ɵɵtext(100, "Customer-Facing Message");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "h2");
            i0.ɵɵtext(102, "One platform for teams that need clarity before they act.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "p");
            i0.ɵɵtext(104, " If your team needs disciplined lead qualification, governed deal movement, real reporting, and shared operational context across the customer lifecycle, North Edge CRM already has the right foundation in place. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(105, "div", 44)(106, "a", 15);
            i0.ɵɵtext(107, "Book a Demo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "a", 45);
            i0.ɵɵtext(109, "Sign In");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(37);
            i0.ɵɵproperty("ngForOf", ctx.heroStats);
            i0.ɵɵadvance(34);
            i0.ɵɵproperty("ngForOf", ctx.capabilities);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.proofStrips);
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("ngForOf", ctx.demoMoments);
        } }, dependencies: [CommonModule, i1.NgForOf, RouterModule, i2.RouterLink, ButtonModule], styles: ["[_nghost-%COMP%] {\n  display: block;\n  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;\n  color: #e2e8f0;\n}\n\n.capability-page[_ngcontent-%COMP%] {\n  --bg: linear-gradient(180deg, #07111f 0%, #0f1d33 28%, #f5f7fb 28%, #f8fafc 100%);\n  --shell-max: 1380px;\n  --gutter: clamp(1rem, 3vw, 2.75rem);\n  --radius-xl: 28px;\n  --radius-lg: 22px;\n  --border-soft: rgba(148, 163, 184, 0.22);\n  --navy: #0f172a;\n  --slate-700: #334155;\n  --slate-500: #64748b;\n  --slate-300: #cbd5e1;\n  --slate-200: #e2e8f0;\n  --slate-100: #f1f5f9;\n  --white: #ffffff;\n  --blue: #2563eb;\n  --cyan: #0891b2;\n  --amber: #d97706;\n  --emerald: #059669;\n  --violet: #7c3aed;\n  --rose: #e11d48;\n  background: var(--bg);\n  min-height: 100vh;\n  position: relative;\n  overflow: hidden;\n}\n\n.capability-shell[_ngcontent-%COMP%] {\n  width: min(var(--shell-max), calc(100% - (var(--gutter) * 2)));\n  margin-inline: auto;\n  position: relative;\n  z-index: 1;\n}\n\n.capability-page__bg[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n.capability-page__orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 999px;\n  filter: blur(70px);\n  opacity: 0.42;\n}\n\n.capability-page__orb--one[_ngcontent-%COMP%] {\n  width: 420px;\n  height: 420px;\n  right: -120px;\n  top: 90px;\n  background: radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(124, 58, 237, 0.24) 58%, transparent 74%);\n}\n\n.capability-page__orb--two[_ngcontent-%COMP%] {\n  width: 360px;\n  height: 360px;\n  left: -90px;\n  top: 420px;\n  background: radial-gradient(circle, rgba(8, 145, 178, 0.34) 0%, rgba(16, 185, 129, 0.16) 58%, transparent 74%);\n}\n\n.capability-page__mesh[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);\n  background-size: 48px 48px;\n  mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.85), transparent 62%);\n}\n\n.capability-topbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  padding: 1rem 0;\n  backdrop-filter: blur(18px);\n  background: rgba(7, 17, 31, 0.72);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.capability-topbar__inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n\n.capability-topbar__brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 42px;\n  width: auto;\n  display: block;\n}\n\n.capability-topbar__nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.85rem;\n  margin-left: auto;\n\n  a {\n    color: rgba(255, 255, 255, 0.72);\n    text-decoration: none;\n    font-weight: 600;\n    font-size: 0.94rem;\n    padding: 0.55rem 0.9rem;\n    border-radius: 999px;\n    transition: background 180ms ease, color 180ms ease;\n\n    &:hover {\n      color: #fff;\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n}\n\n.capability-topbar__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.7rem;\n}\n\n.capability-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  min-height: 46px;\n  padding: 0.8rem 1.2rem;\n  border-radius: 999px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n  }\n}\n\n.capability-btn--primary[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);\n  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.26);\n}\n\n.capability-btn--ghost[_ngcontent-%COMP%] {\n  color: #dbe7ff;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n}\n\n.capability-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);\n  gap: clamp(2rem, 4vw, 4rem);\n  padding-top: clamp(4.5rem, 7vw, 6rem);\n  padding-bottom: clamp(4rem, 6vw, 5rem);\n  align-items: center;\n}\n\n.capability-hero__eyebrow[_ngcontent-%COMP%], \n.section-head__eyebrow[_ngcontent-%COMP%], \n.message-panel__eyebrow[_ngcontent-%COMP%], \n.closing-panel__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.45rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.09);\n  border: 1px solid rgba(255, 255, 255, 0.13);\n  color: #8be9ff;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.capability-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 1rem 0 1rem;\n  font-size: clamp(3rem, 6vw, 5rem);\n  line-height: 0.98;\n  letter-spacing: -0.05em;\n  color: #f8fbff;\n\n  span {\n    display: block;\n    background: linear-gradient(135deg, #67e8f9 0%, #60a5fa 38%, #a78bfa 100%);\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;\n  }\n}\n\n.capability-hero__lede[_ngcontent-%COMP%] {\n  max-width: 48rem;\n  margin: 0 0 1.5rem;\n  color: rgba(226, 232, 240, 0.92);\n  font-size: 1.1rem;\n  line-height: 1.7;\n}\n\n.capability-hero__cta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  margin-bottom: 1.75rem;\n}\n\n.capability-hero__proof[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.capability-stat[_ngcontent-%COMP%] {\n  padding: 1rem 1.1rem;\n  border-radius: 20px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(255, 255, 255, 0.07);\n  backdrop-filter: blur(14px);\n\n  strong {\n    display: block;\n    font-size: 1rem;\n    color: #fff;\n    margin-bottom: 0.35rem;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.84);\n    font-size: 0.92rem;\n    line-height: 1.45;\n  }\n}\n\n.capability-stat--blue[_ngcontent-%COMP%] { box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.2); }\n.capability-stat--mint[_ngcontent-%COMP%] { box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.18); }\n.capability-stat--amber[_ngcontent-%COMP%] { box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.18); }\n.capability-stat--violet[_ngcontent-%COMP%] { box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.18); }\n\n.capability-hero__visual[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.1rem;\n}\n\n.hero-panel[_ngcontent-%COMP%] {\n  border-radius: var(--radius-xl);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 30px 70px rgba(15, 23, 42, 0.24);\n}\n\n.hero-panel--main[_ngcontent-%COMP%] {\n  padding: 1.8rem;\n\n  .hero-panel__label {\n    display: inline-flex;\n    padding: 0.4rem 0.75rem;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.12);\n    color: #dbeafe;\n    font-size: 0.78rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  h2 {\n    margin: 1rem 0 0.75rem;\n    font-size: 2rem;\n    line-height: 1.05;\n    color: #fff;\n  }\n\n  p {\n    margin: 0;\n    color: rgba(226, 232, 240, 0.85);\n    line-height: 1.65;\n  }\n}\n\n.hero-panel--stack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.9rem;\n  padding: 1rem;\n\n  article {\n    padding: 1rem 1.1rem;\n    border-radius: 20px;\n    background: rgba(15, 23, 42, 0.34);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n  }\n\n  span {\n    display: block;\n    color: #7dd3fc;\n    font-size: 0.8rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    margin-bottom: 0.35rem;\n  }\n\n  strong {\n    color: #eff6ff;\n    font-size: 1rem;\n    line-height: 1.4;\n  }\n}\n\n.capability-grid-section[_ngcontent-%COMP%], \n.proof-section[_ngcontent-%COMP%], \n.message-section[_ngcontent-%COMP%], \n.demo-section[_ngcontent-%COMP%], \n.closing-section[_ngcontent-%COMP%] {\n  padding-bottom: 4.5rem;\n}\n\n.section-head[_ngcontent-%COMP%] {\n  max-width: 56rem;\n  margin-bottom: 1.8rem;\n\n  h2 {\n    margin: 1rem 0 0.7rem;\n    font-size: clamp(2rem, 3.2vw, 3rem);\n    line-height: 1.05;\n    letter-spacing: -0.04em;\n    color: var(--navy);\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    font-size: 1.02rem;\n    line-height: 1.7;\n  }\n}\n\n.section-head--compact[_ngcontent-%COMP%] {\n  max-width: 48rem;\n}\n\n.capability-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1.2rem;\n}\n\n.capability-card[_ngcontent-%COMP%] {\n  padding: 1.4rem;\n  border-radius: var(--radius-lg);\n  background: var(--white);\n  border: 1px solid var(--slate-200);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n\n  h3 {\n    margin: 0.65rem 0 0.7rem;\n    color: var(--navy);\n    font-size: 1.35rem;\n    line-height: 1.2;\n    letter-spacing: -0.03em;\n  }\n\n  p {\n    margin: 0 0 1rem;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  li {\n    color: var(--slate-700);\n    line-height: 1.45;\n    padding-left: 1.15rem;\n    position: relative;\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 0.55rem;\n      width: 8px;\n      height: 8px;\n      border-radius: 999px;\n      background: currentColor;\n      opacity: 0.55;\n    }\n  }\n}\n\n.capability-card__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.38rem 0.72rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.capability-card--blue[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #dbeafe; color: var(--blue); }\n.capability-card--cyan[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #cffafe; color: var(--cyan); }\n.capability-card--amber[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #fef3c7; color: var(--amber); }\n.capability-card--violet[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #ede9fe; color: var(--violet); }\n.capability-card--emerald[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #dcfce7; color: var(--emerald); }\n.capability-card--slate[_ngcontent-%COMP%]   .capability-card__eyebrow[_ngcontent-%COMP%] { background: #e2e8f0; color: var(--slate-700); }\n\n.proof-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1.1rem;\n\n  article {\n    padding: 1.4rem;\n    border-radius: var(--radius-lg);\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));\n    border: 1px solid var(--slate-200);\n    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);\n  }\n\n  h3 {\n    margin: 0 0 0.55rem;\n    color: var(--navy);\n    font-size: 1.15rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n}\n\n.message-panel[_ngcontent-%COMP%], \n.closing-panel[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n  padding: 2rem;\n  border-radius: 30px;\n  background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #7c3aed 100%);\n  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);\n}\n\n.message-panel[_ngcontent-%COMP%] {\n  color: #eff6ff;\n\n  h2 {\n    margin: 0.9rem 0 0.75rem;\n    font-size: clamp(1.8rem, 3vw, 2.8rem);\n    line-height: 1.08;\n    letter-spacing: -0.04em;\n  }\n\n  p {\n    max-width: 56rem;\n    margin: 0;\n    color: rgba(226, 232, 240, 0.92);\n    line-height: 1.7;\n    font-size: 1rem;\n  }\n}\n\n.demo-timeline[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n\n  article {\n    display: grid;\n    grid-template-columns: 80px minmax(0, 1fr);\n    gap: 1rem;\n    padding: 1.25rem 1.35rem;\n    border-radius: var(--radius-lg);\n    background: var(--white);\n    border: 1px solid var(--slate-200);\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);\n  }\n}\n\n.demo-timeline__step[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  border-radius: 18px;\n  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);\n  color: #fff;\n  font-weight: 900;\n  font-size: 1rem;\n  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);\n}\n\n.demo-timeline__body[_ngcontent-%COMP%] {\n  h3 {\n    margin: 0 0 0.4rem;\n    color: var(--navy);\n    font-size: 1.22rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n}\n\n.closing-panel[_ngcontent-%COMP%] {\n  color: #f8fbff;\n\n  h2 {\n    margin: 0.9rem 0 0.75rem;\n    font-size: clamp(1.9rem, 3.2vw, 3rem);\n    line-height: 1.08;\n    letter-spacing: -0.04em;\n  }\n\n  p {\n    margin: 0;\n    max-width: 52rem;\n    line-height: 1.7;\n    color: rgba(226, 232, 240, 0.9);\n  }\n}\n\n.closing-panel__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n}\n\n@media (max-width: 1180px) {\n  .capability-hero[_ngcontent-%COMP%], \n   .capability-grid[_ngcontent-%COMP%], \n   .proof-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .message-panel[_ngcontent-%COMP%], \n   .closing-panel[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n\n@media (max-width: 900px) {\n  .capability-topbar__nav[_ngcontent-%COMP%], \n   .capability-topbar__actions[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .capability-hero__proof[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .capability-hero[_ngcontent-%COMP%] {\n    padding-top: 3.5rem;\n  }\n\n  .capability-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2.45rem;\n  }\n\n  .capability-card[_ngcontent-%COMP%], \n   .proof-strip[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .demo-timeline[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    padding: 1.1rem;\n  }\n\n  .message-panel[_ngcontent-%COMP%], \n   .closing-panel[_ngcontent-%COMP%] {\n    padding: 1.4rem;\n    border-radius: 24px;\n  }\n\n  .demo-timeline[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductCapabilitiesPage, [{
        type: Component,
        args: [{ selector: 'app-product-capabilities-page', standalone: true, imports: [CommonModule, RouterModule, ButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<main class=\"capability-page\">\n  <div class=\"capability-page__bg\" aria-hidden=\"true\">\n    <span class=\"capability-page__orb capability-page__orb--one\"></span>\n    <span class=\"capability-page__orb capability-page__orb--two\"></span>\n    <span class=\"capability-page__mesh\"></span>\n  </div>\n\n  <header class=\"capability-topbar\">\n    <div class=\"capability-shell capability-topbar__inner\">\n      <a class=\"capability-topbar__brand\" routerLink=\"/landing\">\n        <img src=\"/assets/branding/logo-v2-light.png\" alt=\"North Edge System\" />\n      </a>\n      <nav class=\"capability-topbar__nav\">\n        <a href=\"#capabilities\">Platform</a>\n        <a href=\"#proof\">Why North Edge</a>\n        <a href=\"#demo\">Demo Flow</a>\n      </nav>\n      <div class=\"capability-topbar__actions\">\n        <a class=\"capability-btn capability-btn--ghost\" routerLink=\"/landing\">Back to Landing</a>\n        <a class=\"capability-btn capability-btn--primary\" routerLink=\"/landing\" fragment=\"hero\">Book a Demo</a>\n      </div>\n    </div>\n  </header>\n\n  <section class=\"capability-hero capability-shell\">\n    <div class=\"capability-hero__copy\">\n      <span class=\"capability-hero__eyebrow\">Customer-Facing Platform Overview</span>\n      <h1>\n        A CRM built for\n        <span>execution, governance, and revenue confidence</span>\n      </h1>\n      <p class=\"capability-hero__lede\">\n        North Edge CRM brings lead execution, deal governance, marketing impact, reporting, and operational control into one platform designed for teams that need defensible decisions, not just more activity logs.\n      </p>\n\n      <div class=\"capability-hero__cta\">\n        <a class=\"capability-btn capability-btn--primary\" routerLink=\"/landing\" fragment=\"hero\">Book a Demo</a>\n        <a class=\"capability-btn capability-btn--ghost\" href=\"#capabilities\">Explore Capabilities</a>\n      </div>\n\n      <div class=\"capability-hero__proof\">\n        <article *ngFor=\"let stat of heroStats\" [class]=\"'capability-stat capability-stat--' + stat.tone\">\n          <strong>{{ stat.value }}</strong>\n          <span>{{ stat.label }}</span>\n        </article>\n      </div>\n    </div>\n\n    <div class=\"capability-hero__visual\">\n      <div class=\"hero-panel hero-panel--main\">\n        <span class=\"hero-panel__label\">North Edge CRM</span>\n        <h2>Revenue operating model</h2>\n        <p>Sales, marketing, support, and management teams work from one coordinated system instead of fragmented tools and disconnected decisions.</p>\n      </div>\n      <div class=\"hero-panel hero-panel--stack\">\n        <article>\n          <span>Lead quality</span>\n          <strong>Evidence-aware qualification</strong>\n        </article>\n        <article>\n          <span>Deal control</span>\n          <strong>Approval and proposal workflow</strong>\n        </article>\n        <article>\n          <span>Management layer</span>\n          <strong>Dashboard health, reporting, and policy controls</strong>\n        </article>\n      </div>\n    </div>\n  </section>\n\n  <section id=\"capabilities\" class=\"capability-grid-section capability-shell\">\n    <div class=\"section-head\">\n      <span class=\"section-head__eyebrow\">What Customers Actually Get</span>\n      <h2>Platform capabilities already present in the product</h2>\n      <p>\n        This view translates the implemented product surface into customer-facing language while staying grounded in the real system already built.\n      </p>\n    </div>\n\n    <div class=\"capability-grid\">\n      <article *ngFor=\"let capability of capabilities\" [class]=\"'capability-card capability-card--' + capability.tone\">\n        <span class=\"capability-card__eyebrow\">{{ capability.eyebrow }}</span>\n        <h3>{{ capability.title }}</h3>\n        <p>{{ capability.summary }}</p>\n        <ul>\n          <li *ngFor=\"let bullet of capability.bullets\">{{ bullet }}</li>\n        </ul>\n      </article>\n    </div>\n  </section>\n\n  <section id=\"proof\" class=\"proof-section capability-shell\">\n    <div class=\"section-head section-head--compact\">\n      <span class=\"section-head__eyebrow\">Why North Edge Feels Different</span>\n      <h2>Built for teams that need business confidence, not just database completeness</h2>\n    </div>\n\n    <div class=\"proof-strip\">\n      <article *ngFor=\"let proof of proofStrips\">\n        <h3>{{ proof.title }}</h3>\n        <p>{{ proof.copy }}</p>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"message-section capability-shell\">\n    <div class=\"message-panel\">\n      <span class=\"message-panel__eyebrow\">Positioning Summary</span>\n      <h2>North Edge CRM is strongest where CRM, governance, and operational decision-making meet.</h2>\n      <p>\n        This is not just a pipeline tracker. The implemented product already supports lead qualification, deal control, reporting, campaign attribution, support operations, and enterprise settings in one operating model.\n      </p>\n    </div>\n  </section>\n\n  <section id=\"demo\" class=\"demo-section capability-shell\">\n    <div class=\"section-head section-head--compact\">\n      <span class=\"section-head__eyebrow\">How To Demo It</span>\n      <h2>A simple storyline for customer conversations</h2>\n    </div>\n\n    <div class=\"demo-timeline\">\n      <article *ngFor=\"let moment of demoMoments\">\n        <span class=\"demo-timeline__step\">{{ moment.step }}</span>\n        <div class=\"demo-timeline__body\">\n          <h3>{{ moment.title }}</h3>\n          <p>{{ moment.copy }}</p>\n        </div>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"closing-section capability-shell\">\n    <div class=\"closing-panel\">\n      <div>\n        <span class=\"closing-panel__eyebrow\">Customer-Facing Message</span>\n        <h2>One platform for teams that need clarity before they act.</h2>\n        <p>\n          If your team needs disciplined lead qualification, governed deal movement, real reporting, and shared operational context across the customer lifecycle, North Edge CRM already has the right foundation in place.\n        </p>\n      </div>\n      <div class=\"closing-panel__actions\">\n        <a class=\"capability-btn capability-btn--primary\" routerLink=\"/landing\" fragment=\"hero\">Book a Demo</a>\n        <a class=\"capability-btn capability-btn--ghost\" routerLink=\"/login\">Sign In</a>\n      </div>\n    </div>\n  </section>\n</main>\n", styles: [":host {\n  display: block;\n  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;\n  color: #e2e8f0;\n}\n\n.capability-page {\n  --bg: linear-gradient(180deg, #07111f 0%, #0f1d33 28%, #f5f7fb 28%, #f8fafc 100%);\n  --shell-max: 1380px;\n  --gutter: clamp(1rem, 3vw, 2.75rem);\n  --radius-xl: 28px;\n  --radius-lg: 22px;\n  --border-soft: rgba(148, 163, 184, 0.22);\n  --navy: #0f172a;\n  --slate-700: #334155;\n  --slate-500: #64748b;\n  --slate-300: #cbd5e1;\n  --slate-200: #e2e8f0;\n  --slate-100: #f1f5f9;\n  --white: #ffffff;\n  --blue: #2563eb;\n  --cyan: #0891b2;\n  --amber: #d97706;\n  --emerald: #059669;\n  --violet: #7c3aed;\n  --rose: #e11d48;\n  background: var(--bg);\n  min-height: 100vh;\n  position: relative;\n  overflow: hidden;\n}\n\n.capability-shell {\n  width: min(var(--shell-max), calc(100% - (var(--gutter) * 2)));\n  margin-inline: auto;\n  position: relative;\n  z-index: 1;\n}\n\n.capability-page__bg {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n.capability-page__orb {\n  position: absolute;\n  border-radius: 999px;\n  filter: blur(70px);\n  opacity: 0.42;\n}\n\n.capability-page__orb--one {\n  width: 420px;\n  height: 420px;\n  right: -120px;\n  top: 90px;\n  background: radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(124, 58, 237, 0.24) 58%, transparent 74%);\n}\n\n.capability-page__orb--two {\n  width: 360px;\n  height: 360px;\n  left: -90px;\n  top: 420px;\n  background: radial-gradient(circle, rgba(8, 145, 178, 0.34) 0%, rgba(16, 185, 129, 0.16) 58%, transparent 74%);\n}\n\n.capability-page__mesh {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);\n  background-size: 48px 48px;\n  mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.85), transparent 62%);\n}\n\n.capability-topbar {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  padding: 1rem 0;\n  backdrop-filter: blur(18px);\n  background: rgba(7, 17, 31, 0.72);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.capability-topbar__inner {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n\n.capability-topbar__brand img {\n  height: 42px;\n  width: auto;\n  display: block;\n}\n\n.capability-topbar__nav {\n  display: flex;\n  gap: 0.85rem;\n  margin-left: auto;\n\n  a {\n    color: rgba(255, 255, 255, 0.72);\n    text-decoration: none;\n    font-weight: 600;\n    font-size: 0.94rem;\n    padding: 0.55rem 0.9rem;\n    border-radius: 999px;\n    transition: background 180ms ease, color 180ms ease;\n\n    &:hover {\n      color: #fff;\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n}\n\n.capability-topbar__actions {\n  display: flex;\n  gap: 0.7rem;\n}\n\n.capability-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  min-height: 46px;\n  padding: 0.8rem 1.2rem;\n  border-radius: 999px;\n  font-weight: 700;\n  text-decoration: none;\n  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n  }\n}\n\n.capability-btn--primary {\n  color: #fff;\n  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);\n  box-shadow: 0 18px 36px rgba(37, 99, 235, 0.26);\n}\n\n.capability-btn--ghost {\n  color: #dbe7ff;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n}\n\n.capability-hero {\n  display: grid;\n  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);\n  gap: clamp(2rem, 4vw, 4rem);\n  padding-top: clamp(4.5rem, 7vw, 6rem);\n  padding-bottom: clamp(4rem, 6vw, 5rem);\n  align-items: center;\n}\n\n.capability-hero__eyebrow,\n.section-head__eyebrow,\n.message-panel__eyebrow,\n.closing-panel__eyebrow {\n  display: inline-flex;\n  padding: 0.45rem 0.8rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.09);\n  border: 1px solid rgba(255, 255, 255, 0.13);\n  color: #8be9ff;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.capability-hero h1 {\n  margin: 1rem 0 1rem;\n  font-size: clamp(3rem, 6vw, 5rem);\n  line-height: 0.98;\n  letter-spacing: -0.05em;\n  color: #f8fbff;\n\n  span {\n    display: block;\n    background: linear-gradient(135deg, #67e8f9 0%, #60a5fa 38%, #a78bfa 100%);\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;\n  }\n}\n\n.capability-hero__lede {\n  max-width: 48rem;\n  margin: 0 0 1.5rem;\n  color: rgba(226, 232, 240, 0.92);\n  font-size: 1.1rem;\n  line-height: 1.7;\n}\n\n.capability-hero__cta {\n  display: flex;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n  margin-bottom: 1.75rem;\n}\n\n.capability-hero__proof {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.capability-stat {\n  padding: 1rem 1.1rem;\n  border-radius: 20px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(255, 255, 255, 0.07);\n  backdrop-filter: blur(14px);\n\n  strong {\n    display: block;\n    font-size: 1rem;\n    color: #fff;\n    margin-bottom: 0.35rem;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.84);\n    font-size: 0.92rem;\n    line-height: 1.45;\n  }\n}\n\n.capability-stat--blue { box-shadow: inset 0 0 0 1px rgba(96, 165, 250, 0.2); }\n.capability-stat--mint { box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.18); }\n.capability-stat--amber { box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.18); }\n.capability-stat--violet { box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.18); }\n\n.capability-hero__visual {\n  display: grid;\n  gap: 1.1rem;\n}\n\n.hero-panel {\n  border-radius: var(--radius-xl);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 30px 70px rgba(15, 23, 42, 0.24);\n}\n\n.hero-panel--main {\n  padding: 1.8rem;\n\n  .hero-panel__label {\n    display: inline-flex;\n    padding: 0.4rem 0.75rem;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.12);\n    color: #dbeafe;\n    font-size: 0.78rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  h2 {\n    margin: 1rem 0 0.75rem;\n    font-size: 2rem;\n    line-height: 1.05;\n    color: #fff;\n  }\n\n  p {\n    margin: 0;\n    color: rgba(226, 232, 240, 0.85);\n    line-height: 1.65;\n  }\n}\n\n.hero-panel--stack {\n  display: grid;\n  gap: 0.9rem;\n  padding: 1rem;\n\n  article {\n    padding: 1rem 1.1rem;\n    border-radius: 20px;\n    background: rgba(15, 23, 42, 0.34);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n  }\n\n  span {\n    display: block;\n    color: #7dd3fc;\n    font-size: 0.8rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    margin-bottom: 0.35rem;\n  }\n\n  strong {\n    color: #eff6ff;\n    font-size: 1rem;\n    line-height: 1.4;\n  }\n}\n\n.capability-grid-section,\n.proof-section,\n.message-section,\n.demo-section,\n.closing-section {\n  padding-bottom: 4.5rem;\n}\n\n.section-head {\n  max-width: 56rem;\n  margin-bottom: 1.8rem;\n\n  h2 {\n    margin: 1rem 0 0.7rem;\n    font-size: clamp(2rem, 3.2vw, 3rem);\n    line-height: 1.05;\n    letter-spacing: -0.04em;\n    color: var(--navy);\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    font-size: 1.02rem;\n    line-height: 1.7;\n  }\n}\n\n.section-head--compact {\n  max-width: 48rem;\n}\n\n.capability-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1.2rem;\n}\n\n.capability-card {\n  padding: 1.4rem;\n  border-radius: var(--radius-lg);\n  background: var(--white);\n  border: 1px solid var(--slate-200);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n\n  h3 {\n    margin: 0.65rem 0 0.7rem;\n    color: var(--navy);\n    font-size: 1.35rem;\n    line-height: 1.2;\n    letter-spacing: -0.03em;\n  }\n\n  p {\n    margin: 0 0 1rem;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: grid;\n    gap: 0.6rem;\n  }\n\n  li {\n    color: var(--slate-700);\n    line-height: 1.45;\n    padding-left: 1.15rem;\n    position: relative;\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 0.55rem;\n      width: 8px;\n      height: 8px;\n      border-radius: 999px;\n      background: currentColor;\n      opacity: 0.55;\n    }\n  }\n}\n\n.capability-card__eyebrow {\n  display: inline-flex;\n  padding: 0.38rem 0.72rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.capability-card--blue .capability-card__eyebrow { background: #dbeafe; color: var(--blue); }\n.capability-card--cyan .capability-card__eyebrow { background: #cffafe; color: var(--cyan); }\n.capability-card--amber .capability-card__eyebrow { background: #fef3c7; color: var(--amber); }\n.capability-card--violet .capability-card__eyebrow { background: #ede9fe; color: var(--violet); }\n.capability-card--emerald .capability-card__eyebrow { background: #dcfce7; color: var(--emerald); }\n.capability-card--slate .capability-card__eyebrow { background: #e2e8f0; color: var(--slate-700); }\n\n.proof-strip {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1.1rem;\n\n  article {\n    padding: 1.4rem;\n    border-radius: var(--radius-lg);\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96));\n    border: 1px solid var(--slate-200);\n    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.06);\n  }\n\n  h3 {\n    margin: 0 0 0.55rem;\n    color: var(--navy);\n    font-size: 1.15rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n}\n\n.message-panel,\n.closing-panel {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n  padding: 2rem;\n  border-radius: 30px;\n  background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #7c3aed 100%);\n  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);\n}\n\n.message-panel {\n  color: #eff6ff;\n\n  h2 {\n    margin: 0.9rem 0 0.75rem;\n    font-size: clamp(1.8rem, 3vw, 2.8rem);\n    line-height: 1.08;\n    letter-spacing: -0.04em;\n  }\n\n  p {\n    max-width: 56rem;\n    margin: 0;\n    color: rgba(226, 232, 240, 0.92);\n    line-height: 1.7;\n    font-size: 1rem;\n  }\n}\n\n.demo-timeline {\n  display: grid;\n  gap: 1rem;\n\n  article {\n    display: grid;\n    grid-template-columns: 80px minmax(0, 1fr);\n    gap: 1rem;\n    padding: 1.25rem 1.35rem;\n    border-radius: var(--radius-lg);\n    background: var(--white);\n    border: 1px solid var(--slate-200);\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.06);\n  }\n}\n\n.demo-timeline__step {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  border-radius: 18px;\n  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);\n  color: #fff;\n  font-weight: 900;\n  font-size: 1rem;\n  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);\n}\n\n.demo-timeline__body {\n  h3 {\n    margin: 0 0 0.4rem;\n    color: var(--navy);\n    font-size: 1.22rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--slate-500);\n    line-height: 1.65;\n  }\n}\n\n.closing-panel {\n  color: #f8fbff;\n\n  h2 {\n    margin: 0.9rem 0 0.75rem;\n    font-size: clamp(1.9rem, 3.2vw, 3rem);\n    line-height: 1.08;\n    letter-spacing: -0.04em;\n  }\n\n  p {\n    margin: 0;\n    max-width: 52rem;\n    line-height: 1.7;\n    color: rgba(226, 232, 240, 0.9);\n  }\n}\n\n.closing-panel__actions {\n  display: flex;\n  gap: 0.8rem;\n  flex-wrap: wrap;\n}\n\n@media (max-width: 1180px) {\n  .capability-hero,\n  .capability-grid,\n  .proof-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .message-panel,\n  .closing-panel {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n\n@media (max-width: 900px) {\n  .capability-topbar__nav,\n  .capability-topbar__actions {\n    display: none;\n  }\n\n  .capability-hero__proof {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 640px) {\n  .capability-hero {\n    padding-top: 3.5rem;\n  }\n\n  .capability-hero h1 {\n    font-size: 2.45rem;\n  }\n\n  .capability-card,\n  .proof-strip article,\n  .demo-timeline article {\n    padding: 1.1rem;\n  }\n\n  .message-panel,\n  .closing-panel {\n    padding: 1.4rem;\n    border-radius: 24px;\n  }\n\n  .demo-timeline article {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductCapabilitiesPage, { className: "ProductCapabilitiesPage", filePath: "src/app/public/product-capabilities/product-capabilities.page.ts", lineNumber: 39 }); })();
