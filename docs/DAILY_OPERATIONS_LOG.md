# Daily Operations Log

Purpose: Capture day-to-day operational issues, resolutions, and verification. This log is the working record; only confirmed outcomes should be summarized back into `docs/PROJECT_MASTER.md`.

---

## Template (Copy per day)

**Date:** YYYY-MM-DD  
**Environment:** (Dev / Staging / Prod)  
**Owner:**  

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| | | | | |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| | | | | | |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| | | | |

### Summary for Project Master (If Verified)
- 

---

**Date:** 2026-01-31  
**Environment:** Prod (Azure App Service + Foundry)  
**Owner:** Yasser / Eng

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| 09:45 | Auth / Login | Prod login needed multiple clicks to succeed | High | Product |
| 10:15 | Foundry | Clean up unused model deployments | Low | Eng |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| Login takes multiple clicks | App Service Free tier cold starts (Always On unavailable) | Upgraded plan to B1 and enabled Always On | Azure App Service `crm-enterprise-api-dev-01122345` | Eng | Reduced cold starts for first-login |
| Unused deployments | Legacy deployments left from fine-tune iteration | Deleted `crm-assistant-ft` + `text-embedding-3-small` deployments | Azure OpenAI `crm-ai-project-resource` | Eng | Only `gpt-4.1-mini` remains |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Monitor prod login click-through | Eng | 2026-02-01 | Confirm one-click login stability |

### Summary for Project Master (If Verified)
- App Service plan upgraded to B1 and Always On enabled to address login cold start.
- Foundry deployments cleaned; only gpt-4.1-mini retained.

---

**Date:** 2026-01-24  
**Environment:**  
**Owner:**  

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| | Planning | Approved execution plan for Sales Rep flow + architecture seams | Low | Product/Eng |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| N/A | N/A | Strategy decision only | docs/PROJECT_MASTER.md | N/A | MVP build order + seam rules recorded |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Implement MVP build order (Leads → Conversion → Opportunities → Activities → Manager guardrails) | | | Start with Leads module |
| Add service seams and domain events as work begins | | | No microservice split yet |

### Summary for Project Master (If Verified)
- Sales Rep MVP flow is the near-term build order. Add microservice-ready seams during implementation without extracting services.

---

## Log

**Date:** 2026-02-17  
**Environment:** Dev (Landing + Public Demo Request Flow)  
**Owner:** Yasser / Eng

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| 09:10 | Landing UX | Book Demo behavior inconsistent (button placement, modal behavior, styling regressions after IftaLabel) | Medium | Product |
| 10:05 | Demo Scheduling Rules | Need strict scheduling policy by Toronto business hours while keeping UTC canonical handling | High | Product |
| 10:45 | Lead Capture | Ensure Schedule Demo request reaches `contact@northedgesystem.com` and show thank-you confirmation | High | Product |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| Book Demo UI inconsistency | Mixed button styles and modal implementations; partial PrimeNG adoption | Standardized CTA placement/style; moved to PrimeNG `p-dialog` modal with `dismissableMask=false`; controls moved to PrimeNG + IftaLabel; adjusted field height/width for readability | `client/src/app/public/landing/landing.page.html`, `client/src/app/public/landing/landing.page.scss`, `client/src/app/public/landing/landing.page.ts` | Eng | Playwright screenshots captured before/after (`output/playwright/landing-dialog-current.png`, `output/playwright/landing-dialog-fixed.png`) |
| Scheduling policy ambiguity | Client-side checks were timezone-fragile and not canonical | Added canonical `preferredDateTimeUtc` payload; server validates Toronto rules from UTC (next Toronto day + 09:00-17:00 Toronto); client supports editable timezone and converts to UTC before submit | `client/src/app/public/landing/models/crm-landing.models.ts`, `client/src/app/public/landing/landing.page.ts`, `server/src/CRM.Enterprise.Api/Contracts/Auth/BookDemoRequest.cs`, `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs` | Eng | Client build + server build + Playwright smoke pass |
| Demo request delivery/confirmation | Destination not explicitly locked and post-submit feedback weak | Delivery target fixed to `contact@northedgesystem.com`; success dialog added with thank-you note | `server/src/CRM.Enterprise.Api/Controllers/AuthController.cs`, `client/src/app/public/landing/landing.page.html`, `client/src/app/public/landing/landing.page.ts` | Eng | Successful submission flow shows thank-you confirmation |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Add targeted Playwright spec for landing demo scheduling rules | Eng | 2026-02-18 | Include timezone-switch cases + Toronto boundary checks |
| Verify production app settings for demo mail transport path | Eng | 2026-02-18 | Confirm ACS/queue route and delivery health |

### Summary for Project Master (If Verified)
- Public landing Book Demo flow is standardized on PrimeNG modal + controls, with improved IftaLabel layout.
- Scheduling now uses UTC canonical payload and backend Toronto-window enforcement.
- Demo requests route to `contact@northedgesystem.com` and show explicit post-submit confirmation.

**Date:** 2026-02-03  
**Environment:** Dev (Azure App Service + Azure SQL)  
**Owner:** Yasser / Eng

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| 09:30 | Notifications | SLA + idle alerts toggle not saving; email flood | High | Product |
| 10:40 | Auth / Invite | Accept invite password change appears stuck until focusing inputs | Medium | Product |
| 11:20 | Data hygiene | Playwright-created records showing in Leads/Tasks/KPIs/audit log | Medium | Product |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| SLA + idle toggle not saving | Toggle bound via getter/setter; update API not reliably invoked | Switched to explicit `(ngModelChange)` handler for alerts toggle | `client/src/app/crm/features/settings/pages/notifications.page.html` | Eng | Toggle now saves and persists |
| Invite activation loading stuck | UI state updates outside Angular zone on accept-invite flow | Wrapped updates in `NgZone` + forced change detection | `client/src/app/public/auth/accept-invite.page.ts` | Eng | Success dialog renders without extra click |
| Playwright data in dev | E2E created real records in Azure dev | Added seed test; cleaned data directly in Azure SQL | `client/e2e/lead-lifecycle.spec.ts`, Azure SQL (`crm.*`) | Eng | Leads/activities/opps/accounts/contacts/audit events removed |
| KPI cards showing tasks | Tasks KPI uses `crm.Activities` | Cleared `crm.Activities` for default tenant | Azure SQL (`crm.Activities`, `identity.Tenants`) | Eng | Tasks KPI drops after refresh |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Consider tagging E2E data for easier cleanup | Eng | 2026-02-04 | Add marker field or consistent prefix |

### Summary for Project Master (If Verified)
- Notifications alert toggle now persists; invite activation UI fixed; Azure dev data cleaned after Playwright seeding.

**Date:** 2026-02-02  
**Environment:** Dev  
**Owner:** Yasser / Eng

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| 14:10 | Leads / AI Scoring | Refresh score button failing because OpenAI key not configured | Medium | Product |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| Lead refresh score | OpenAI scoring client required API key; no Azure OpenAI fallback | Added Azure OpenAI scoring service + DI selection with OpenAI fallback + rule-based fallback | `server/src/CRM.Enterprise.Infrastructure/Leads/*LeadScoring*`, `server/src/CRM.Enterprise.Infrastructure/DependencyInjection.cs`, `server/src/CRM.Enterprise.Api/appsettings.Development.json` | Eng | Refresh score now works with Azure OpenAI when configured; falls back to rules-based if not configured |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Populate Azure OpenAI deployment settings in non-dev environments | Eng | 2026-02-03 | Add endpoint + deployment + api key in secure config |

### Summary for Project Master (If Verified)
- Lead score refresh now supports Azure OpenAI with OpenAI fallback and rules-based fallback for reliability.

**Date:** 2026-01-30  
**Environment:** Dev (Azure AI Foundry / OpenAI)  
**Owner:** Yasser / Eng

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| 20:16 | Foundry / Fine-tune | Needed agent IDs and fine-tune guidance for CRM assistant | Medium | Product |
| 20:17 | Foundry / Fine-tune | o4-mini fine-tune rejected (requires reinforcement) | Medium | Eng |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| Agent IDs needed | No documented agent list | Retrieved agent list via Azure OpenAI endpoint | Azure OpenAI | Eng | Agent ID `asst_LQWvrfLaeN3KL8nzNyA6JwZH` |
| o4-mini fine-tune failed | Model requires reinforcement fine-tuning, not supervised JSONL | Switched to supervised fine-tune on gpt-4o | Azure OpenAI | Eng | Job started successfully |
| Training dataset creation | No dataset existed | Built JSONL dataset and expanded to 110 examples | `docs/ai/training/north-edge-crm-o4-mini-train.jsonl` | Eng | Uploaded to Azure OpenAI files |
| Fine-tune kickoff | Needed supervised FT job | Started fine-tune with gpt-4o | Azure OpenAI | Eng | Job ID `ftjob-c24a70b97e6e4a4bbcf8c64ba8a14ebd` |
| Deployment | Fine-tune completed | Deployed fine-tuned model as `crm-assistant-ft` and updated assistant model | Azure OpenAI | Eng | Assistant now uses fine-tuned deployment |
| App config | Agent wiring required in API | Set FoundryAgent Endpoint + AgentId in dev config (API key remains env/secret) | `server/src/CRM.Enterprise.Api/appsettings.Development.json` | Eng | Endpoint + AgentId populated |
| App Service config | Azure app settings needed for prod/dev API | Set FoundryAgent__Endpoint, FoundryAgent__AgentId, FoundryAgent__ApiVersion, FoundryAgent__ApiKey | Azure App Service `crm-enterprise-api-dev-01122345` | Eng | Values applied (masked in CLI output) |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| Verify assistant responses in CRM UI | Eng | 2026-01-31 | Validate output quality vs baseline |

### Summary for Project Master (If Verified)
- Foundry fine-tune pipeline documented; supervised fine-tune started on gpt-4o due to o4-mini reinforcement requirement.
 - Fine-tuned model deployed and assistant updated to use the new deployment.

**Date:** 2026-01-24  
**Environment:**  
**Owner:**  

### Issues Reported
| Time | Area | Summary | Severity | Reporter |
|------|------|---------|----------|----------|
| | | | | |

### Root Cause & Fixes
| Issue | Root Cause | Fix Applied | Files / Systems | Verified By | Verification Notes |
|-------|-----------|-------------|-----------------|-------------|--------------------|
| | | | | | |

### Follow-ups / Open Items
| Item | Owner | Due Date | Notes |
|------|-------|----------|-------|
| | | | |

### Summary for Project Master (If Verified)
- 
