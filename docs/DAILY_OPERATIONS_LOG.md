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
